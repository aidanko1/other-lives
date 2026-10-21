const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),O=require('./engine.cjs'),{validate,checkpoint}=require('./invariants.cjs');
const paths=[['dance-career','Dance','Company dancer'],['acting','Acting','Working actor'],['esports','Gaming','Professional esports player'],['kpop','Music','Recording performer'],['board-professional','Chess','Professional board-game player'],['vocation',null,'Religious community worker']];
for(const [id,interest,role]of paths)test('complete natural prepared trajectories: '+id,{timeout:id==='kpop'?360000:180000},()=>{
 const results=[];let started=0,academy=0,professional=0,unsuccessful=0,ended=0;
 for(let index=0;index<(id==='kpop'?192:48);index++){
  const country=id==='kpop'&&index>=48?'KR':['GB','KR','IN'][index%3],seed=10001+index*7919;let s=O.create({country,seed,snapshotPolicy:'none'}),actions=0,routeStarted=false,sawAcademy=false,sawProfessional=false,lastStage=null;const trace=[];validate(O,s);
  while(s.status==='alive'&&actions++<3000){const before=checkpoint(s);
   // These are normal player preferences/transactions; no ages, interests, funds, skills or RNG are injected.
   if(!s.pending){
    if(s.age>=6)s.focus='Rest';if(s.age>=7&&!s.routines.includes('practice')){while(s.routines.length>=2)assert(O.setRoutine(s,s.routines.at(-1)).ok);const result=O.setRoutine(s,'practice');assert(result.ok,result.message);}
    if(id==='vocation'&&s.age>=7&&!s.routes.policies.faithPractice)assert(O.setLifePolicy(s,'faithPractice').ok);
    if(interest&&!s.interests.includes(interest)){const offer=O.planOffers(s).find(o=>o.id==='interest-'+interest);if(offer&&!offer.reason)assert(O.planAction(s,offer.id).ok);}
    if(!sawProfessional&&!s.routes.active[id]){const d=O.ROUTES.find(r=>r.id===id);if(!O.routeBlock(s,d)&&s.cash>=O.routeCost(s,d)){assert(O.startRoute(s,id).ok);if(!routeStarted)started++;routeStarted=true;trace.push([s.age,'start']);}}
   }
   if(s.pending){const view=O.decisionView(s),choices=view.options.map((o,i)=>({...o,i})).filter(o=>!o.disabled);assert(choices.length);let choice;
    if(s.pending==='discover-real-interest')choice=choices.find(o=>o.label===interest);
    if(s.pending==='adult-crossroads')choice=choices.find(o=>/first full-time role/i.test(o.label));
    if(s.pending==='university-funding-review')choice=choices.find(o=>/Confirm|year away/.test(o.label));
    choice??=choices[0];const event=s.pending;assert(O.applyChoice(s,choice.i,view.token));if(event==='life-route-decision')trace.push([s.age,choice.label]);
   }else O.advanceMonth(s);
   validate(O,s,before);const r=s.routes.active[id];if(r?.stage==='academy')sawAcademy=true;if(s.job===role)sawProfessional=true;
   // Real transition checkpoints must survive exact schema2 save/load at every route stage.
   if(r&&r.stage!==lastStage){const serialized=JSON.stringify(s),loaded=O.migrateLife(JSON.parse(serialized));assert.equal(JSON.stringify(loaded),serialized);s=loaded;lastStage=r.stage;}
  }
  assert.equal(s.status,'finished','unfinished '+id+' '+country+' '+seed);validate(O,s);const history=s.routes.history.find(r=>r.id===id);if(history){ended++;if(/unsuccessful/i.test(history.outcome||''))unsuccessful++;}academy+=Number(sawAcademy);professional+=Number(sawProfessional);results.push({country,seed,age:s.age,cause:s.cause,started:routeStarted,academy:sawAcademy,professional:sawProfessional,outcome:history?.outcome||null,trace});
 }
 fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/rare-'+id+'.json',JSON.stringify({id,validated:results.length,started,academy,professional,unsuccessful,ended,results},null,2));
 assert(started>0,'route never reached naturally');assert(ended>0,'no route conclusion before death');assert(professional>0,'no natural professional selection');if(id!=='vocation'){assert(academy>0,'no real academy transition');assert(unsuccessful>0,'selection never failed');}
 console.log('PASS rare complete trajectories',JSON.stringify({id,lives:results.length,started,academy,professional,unsuccessful,ended}));
});
