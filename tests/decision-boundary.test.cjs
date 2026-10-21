const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function adult(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;Object.assign(s,{age:30,month:0,pending:null,agenda:[],cash:100000,school:false});s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);return s;}
test('reading a bill or relationship decision never changes live state or consumes RNG',()=>{
 const O=loadEngine();for(const id of ['unexpected-expense','adult-connection-specific']){const s=adult(O);s.pending=id;const before=JSON.stringify(s),a=O.decisionView(s),b=O.decisionView(s);assert.equal(JSON.stringify(a),JSON.stringify(b));assert.equal(JSON.stringify(s),before);assert(a.options.length>0);assert(a.options.every(o=>!Object.hasOwn(o,'apply')));}
});
test('a stale UI click cannot resolve a different option after circumstance changes',()=>{
 const O=loadEngine(),s=adult(O);O.EVENTS.push({id:'qa-stale-view',min:18,max:120,when:()=>true,title:()=> 'A guarded choice',description:()=> 'A synthetic decision',options:s=>(s.cash>0?['First','Second']:['Second','First']).map(label=>({label,detail:label,apply:s=>{s.flags.selected=label;return label;}}))});s.pending='qa-stale-view';
 const old=O.decisionView(s);s.cash=0;const before=JSON.stringify(s);assert.equal(O.applyChoice(s,0,old.token),false);assert.equal(JSON.stringify(s),before);
 const current=O.decisionView(s);assert(O.applyChoice(s,0,current.token));assert.equal(s.flags.selected,'Second');
});
test('route decision tokens distinguish the actual prepared route and its stage',()=>{
 const O=loadEngine(),s=adult(O);assert(O.startRoute(s,'will').ok);O.advanceMonth(s);assert.equal(s.pending,'life-route-decision');const old=O.decisionView(s);
 const r=O.readyRoute(s);r.started--;const before=JSON.stringify(s);assert.equal(O.applyChoice(s,0,old.token),false);assert.equal(JSON.stringify(s),before);
 const loaded=O.migrateLife(s);assert.equal(O.decisionView(loaded).token,O.decisionView(s).token);
});
