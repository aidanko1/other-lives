const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
test('ending summary reports recorded qualifications, work, family and pursuits without inventing history',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218});s.age=70;s.education='University degree';s.study={status:'completed',course:'Engineering'};s.experience.roles={'Junior engineer':2.5,'Engineer':20,Retired:9};s.experience.hobbies={Drawing:{years:4},Dance:{years:0}};
 const child=O.createContact(s,'Child',25);child.alive=false;child.diedAt=25;const partner=O.createContact(s,'Partner',71);partner.knownSince=20;partner.relationshipStage='married';
 s.journal.unshift({age:40,tone:'good',title:'An actual achievement',description:'Recorded words',type:'work'});const before=JSON.stringify(s),r=O.lifeRetrospective(s);
 assert.equal(JSON.stringify(s),before);assert.equal(r.education,'University degree · Engineering');assert.equal(r.work.length,2);assert.equal(r.work[0].role,'Engineer');assert.equal(r.work[1].years,2.5);assert.equal(r.children.total,1);assert.equal(r.children.surviving,0);assert.equal(r.partners[0].name,partner.name);assert.equal(r.interests.length,1);assert.equal(r.moment.title,'An actual achievement');assert.equal(Object.hasOwn(r,'marriageYears'),false);assert.equal(Object.hasOwn(r,'grandchildren'),false);
});
test('infant and incomplete legacy endings remain readable and do not invent unknown finances or qualifications',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:0});O.finish(s,'A recorded infant cause');const before=JSON.stringify(s),infant=O.lifeRetrospective(s);assert.equal(infant.age,0);assert.equal(infant.work.length,0);assert.equal(infant.children.total,0);assert.equal(infant.moment,null);assert.equal(JSON.stringify(s),before);
 const legacy={age:60,cause:'Recorded cause',people:[],journal:[]},r=O.lifeRetrospective(legacy);assert.equal(r.education,null);assert.equal(r.netWorth,null);assert.equal(r.workYears,null);assert.equal(r.partners.length,0);assert.equal(r.cause,'Recorded cause');
});
