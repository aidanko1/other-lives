const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
test('the declared player/person age ceilings remain valid even if every random mortality draw misses',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218});Object.assign(s,{age:119,month:11,school:false,pending:null,agenda:[],cash:100000});s.flags.flow.schoolLeavingResolved=true;
 s.people=s.people.filter(p=>['Mother','Father'].includes(p.role));s.people[0].age=159;s.people[1].age=160;O.chance=()=>false;O.mortality=()=>false;
 assert.equal(O.consistencyIssues(s).length,0);const result=O.advanceMonth(s);assert(result.finished);assert.equal(s.age,120);assert.equal(s.status,'finished');assert(s.cause);assert(s.people.every(p=>!p.alive&&p.age===160&&p.diedAt===160));assert.equal(O.consistencyIssues(s).length,0);
 const before=JSON.stringify(s);O.advanceMonth(s);O.runAnnual(s);assert.equal(JSON.stringify(s),before,'terminal life or deceased people changed after the ceiling');
});
