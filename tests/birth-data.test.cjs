const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
const copy=x=>JSON.parse(JSON.stringify(x)),stable=s=>{const t=copy(s);delete t.id;delete t.startedAt;delete t.finishedAt;for(const snap of t.snapshots||[])if(snap.data){delete snap.data.id;delete snap.data.startedAt;delete snap.data.finishedAt;}return t;};
test('frozen birth data converts verified counts to the existing million-birth unit; all other inputs stay unchanged',()=>{
 const O=loadEngine(),old=loadEngine({skipScripts:['engine/birth-data.js']});assert.equal(O.COUNTRIES.length,129);assert.equal(O.BIRTH_DATA.version,'birth-counts-2024-v1');
 for(const code of ['HK','US']){const r=O.BIRTH_DATA.records[code];assert.equal(r.year,2024);assert.match(r.url,/^https:\/\//);assert.equal(O.COUNTRIES.find(c=>c.code===code).births,r.count/1e6);assert(Object.isFrozen(r));}
 assert.equal(O.BIRTH_DATA.records.HK.count,19231+17492);assert.equal(O.BIRTH_DATA.records.US.count,3628934);
 for(const c of O.COUNTRIES){const baseline=old.COUNTRIES.find(b=>b.code===c.code),actual=copy(c);if(['HK','US'].includes(c.code)){assert.equal(actual.birthsEvidence.version,O.BIRTH_DATA.version);delete actual.birthsEvidence;actual.births=baseline.births;}assert.deepEqual(actual,copy(baseline),c.code+' non-birth inputs/fallback must remain unchanged');}
});
test('production birth draws use the sourced weights, equal-country draws stay equal, fixed-country seeds keep their life circumstances',()=>{
 const O=loadEngine(),old=loadEngine({skipScripts:['engine/birth-data.js']}),weighted=O.weighted;let called=0;
 O.weighted=(s,list,weight)=>{if(called++===0){for(const c of list)assert.equal(weight(c),c.births);}return weighted(s,list,weight);};O.create({seed:2218,draw:'birth'});assert(called>0);
 called=0;O.weighted=(s,list,weight)=>{if(called++===0)for(const c of list)assert.equal(weight(c),1);return weighted(s,list,weight);};O.create({seed:2218,draw:'equal'});
 for(const code of ['HK','US','GB']){const fresh=loadEngine(),previous=loadEngine({skipScripts:['engine/birth-data.js']}),a=stable(fresh.create({seed:2218,country:code})),b=stable(previous.create({seed:2218,country:code}));if(a.country.birthsEvidence){delete a.country.birthsEvidence;a.country.births=b.country.births;for(const snap of a.snapshots){delete snap.data.country.birthsEvidence;snap.data.country.births=b.country.births;}}assert.deepEqual(a,b,code+' weighting cannot change a fixed-country life');}
});
test('weighted birthplace distribution is reproducible and agrees with configured probabilities, including rare Hong Kong births',()=>{
 const O=loadEngine(),n=200000,draw=()=>{const rng={rng:2218},counts={};for(let i=0;i<n;i++){const code=O.weighted(rng,O.COUNTRIES,c=>c.births).code;counts[code]=(counts[code]||0)+1;}return {rng:rng.rng,counts};},a=draw(),b=draw();assert.deepEqual(a,b);assert.equal(Object.values(a.counts).reduce((x,y)=>x+y,0),n);
 const total=O.COUNTRIES.reduce((sum,c)=>sum+c.births,0);for(const c of O.COUNTRIES){const p=c.births/total,expected=n*p,tolerance=6*Math.sqrt(n*p*(1-p))+1;assert(Math.abs((a.counts[c.code]||0)-expected)<=tolerance,c.code+' configured draw distribution');}assert(a.counts.HK>0);assert(a.counts.US>0);
});
test('v6.3 saved country inputs/history continue exactly, without retroactive reweighting, regenerated peers or migration side effects',()=>{
 const old=loadEngine({skipScripts:['engine/birth-data.js']}),O=loadEngine();for(const code of ['HK','US']){const s=old.create({country:code,seed:2218});let turns=0;while(s.age<6&&s.status==='alive'&&turns++<150){if(s.pending){const v=old.decisionView(s);assert(old.applyChoice(s,v.options.findIndex(o=>!o.disabled),v.token));}else old.advanceMonth(s);}
  const bytes=JSON.stringify(s),loaded=O.migrateLife(s);assert.equal(JSON.stringify(loaded),bytes);assert.equal(JSON.stringify(s),bytes);assert.equal(loaded.country.birthsEvidence,undefined);
  for(let i=0;i<36&&s.status==='alive';i++){if(s.pending){const v=old.decisionView(s),w=O.decisionView(loaded),index=v.options.findIndex(o=>!o.disabled);assert.equal(w.token,v.token);assert(old.applyChoice(s,index,v.token));assert(O.applyChoice(loaded,index,w.token));}else{old.advanceMonth(s);O.advanceMonth(loaded);}assert.deepEqual(stable(loaded),stable(s));}
 }
});
test('both sourced locations still produce complete asserted seeded lives through the production simulator',()=>{
 const O=loadEngine();for(const country of ['HK','US']){const a=O.simulateParallelLife({country,seed:2218}),b=O.simulateParallelLife({country,seed:2218});assert.deepEqual(a,b);assert.equal(a.country.code,country);assert(a.death.cause);assert(a.validation.states>1);assert(a.validation.decisions>0);assert.equal(a.timeline.at(-1).status,'finished');}
});
