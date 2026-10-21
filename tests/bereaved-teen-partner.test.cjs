const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
test('a deceased teenage partner keeps their historical age without becoming a living adult-age violation',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218}),p=O.createContact(s,'Partner',17);p.knownSince=13;p.relationshipStage='dating';p.alive=false;p.diedAt=17;
 for(const age of [18,20,50,95]){s.age=age;assert(!O.consistencyIssues(s).some(x=>x.code==='family.partner-age'));assert.equal(p.age,17);}
 p.alive=true;assert(O.consistencyIssues(s).some(x=>x.code==='family.partner-age'),'a living minor partner must still fail adult age-gap validation');
 p.alive=false;p.relationshipStage='married';assert(O.consistencyIssues(s).some(x=>x.code==='family.partner-age'),'invalid historical minor marriage must still fail');
 p.relationshipStage='dating';p.knownSince=20;assert(O.consistencyIssues(s).some(x=>x.code==='family.partner-age'),'invalid adult-start history must still fail');
});
test('ET seed2294337375 completes without altering its deceased school relationship',()=>{
 const O=loadEngine(),peer=O.simulateParallelLife({country:'ET',seed:2294337375});assert.equal(peer.timeline.at(-1).status,'finished');assert(peer.death.age>=20);assert(peer.validation.states>0);
});
