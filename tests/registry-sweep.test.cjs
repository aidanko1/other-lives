const assert=require('node:assert/strict'),O=require('./engine.cjs');O.snapshot=()=>{};
let contexts=0,decisions=0;const visited=new Set(),failures=[];
for(const country of O.COUNTRIES)for(const age of [0,2,5,6,13,16,18,25,45,70,95])for(const quintile of [1,5]){
 const s=O.create({country:country.code,seed:112+age,quintile});s.age=age;s.month=0;s.pending=null;s.agenda=[];
 for(const p of s.people){p.age+=age;if(p.age>105){p.alive=false;p.diedAt=p.age;}}
 Object.assign(s,{school:age>=6&&age<18,education:O.EDU[age>=18?2:0],cash:age>=18?country.ppp*2:0,knowledge:age>=13?65:20,health:65});
 s.flags.flow.schoolLeavingResolved=age>=18;O.ensureClarity(s);contexts++;
 for(const e of O.EVENTS){try{
  if(!O.eventEligible(s,e))continue;visited.add(e.id);const rng=s.rng;
  const title=e.title(s),description=e.description(s),options=e.options(s);
  assert.equal(s.rng,rng,'Reading a decision consumed simulation randomness');assert.equal(typeof title,'string');assert.equal(typeof description,'string');
  assert(!/\bundefined\b|\bNaN\b/.test(title+' '+description),'Broken decision text');
  assert(Array.isArray(options)&&options.some(o=>!o.disabled),'No enabled exit');
  for(const o of options){assert.equal(typeof o.label,'string');assert.equal(typeof o.apply,'function');assert(!/\bundefined\b|\bNaN\b/.test(o.label+' '+o.detail),'Broken option text');}
  decisions++;
 }catch(err){failures.push({country:country.code,age,quintile,event:e.id,error:err.message});}}
}
console.log(JSON.stringify({contexts,decisions,eligibleDefinitions:visited.size,failures},null,2));
assert.equal(failures.length,0,'Registry/eligibility failures');assert(visited.size>250,'Insufficient country-event coverage');
console.log('PASS every country, eleven ages, poorest/wealthiest households; registry queries and exits');
