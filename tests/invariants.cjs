const assert=require('node:assert/strict');
const finances=['cash','debt','income','investments','property','familyCash','familyAssets','familyDebts'];
const factors=['health','happiness','knowledge','relationships','stress','confidence'];
function validate(O,s,previous){
 assert(['alive','finished'].includes(s.status),'unknown life status');
 assert(Number.isInteger(s.age)&&s.age>=0&&s.age<=130,'invalid age');
 assert(Number.isInteger(s.month)&&s.month>=0&&s.month<=11,'invalid month');
 for(const k of finances)assert(Number.isFinite(s[k])&&s[k]>=0,'invalid '+k+': '+s[k]);
 for(const k of factors)assert(Number.isFinite(s[k])&&s[k]>=0&&s[k]<=100,'invalid factor '+k+': '+s[k]);
 assert.equal(O.lifeIssues(s).length,0,O.lifeIssues(s).join('; '));
 if(O.assertConsistent)O.assertConsistent(s);
 assert.equal(new Set(s.people.map(p=>p.id)).size,s.people.length,'duplicate person ID');
 for(const p of s.people){assert(Number.isInteger(p.age)&&p.age>=0,'invalid person age '+p.id);if(!p.alive&&p.diedAt!==undefined)assert.equal(p.age,p.diedAt,'deceased person continued ageing '+p.id);}
 for(let i=1;i<s.journal.length;i++)assert(s.journal[i].age<=s.journal[i-1].age,'journal time reversed');
 assert(s.journal.every(e=>e.age<=s.age),'future journal entry');
 if(s.pending){const e=O.EVENTS.find(e=>e.id===s.pending);assert(e,'unknown pending '+s.pending);assert(e.options(s).some(o=>!o.disabled),'no enabled choice '+s.pending);}
 if(s.housing.mortgage)assert(s.housing.mortgage.balance<=s.debt+1,'secured liability exceeds debt');
 if(previous){assert(s.age*12+s.month>=previous.age*12+previous.month,'life moved backwards');
  for(const old of previous.people){const p=s.people.find(p=>p.id===old.id);assert(p,'person removed from history '+old.id);assert.equal(p.name,old.name,'identity changed '+old.id);if(!old.alive){assert.equal(p.alive,false,'person resurrected '+old.id);assert.equal(p.age,old.age,'dead person aged '+old.id);}}
 }
 if(s.status==='finished'){assert(s.cause,'missing death cause');assert(s.finishedAt,'missing ending time');}
}
function checkpoint(s){return {age:s.age,month:s.month,people:s.people.map(p=>({id:p.id,name:p.name,age:p.age,alive:p.alive}))};}
module.exports={validate,checkpoint};
