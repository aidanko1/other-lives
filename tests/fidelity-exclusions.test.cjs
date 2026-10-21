const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
test('Next continues across reference reflection ages and stops only at the next real choice',()=>{
 for(const age of [5,15,30,50,70]){
  const O=loadEngine(),s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=age-1;
  Object.assign(s,{age:age-1,month:11,school:false,pending:null,agenda:[],cash:100000});s.flags.flow.schoolLeavingResolved=true;
  O.mortality=()=>false;O.personDeathRisk=()=>0;
  O.EVENTS.push({id:'qa-next-real-choice',min:0,max:120,when:()=>true});O.makeAgenda=()=>[{type:'decision',id:'qa-next-real-choice',month:1,done:false}];
  const stops=[];O.skipToDecision(s,p=>stops.push(p.id));assert.equal(s.status,'alive');assert.equal(s.age,age);assert.equal(s.month,1);assert.equal(s.pending,'qa-next-real-choice');assert.equal(stops.length,0);
  assert.equal(Object.hasOwn(s,'reflections'),false,'reflection prompts/notes are intentionally excluded');
 }
});
