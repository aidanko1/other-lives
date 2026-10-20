const assert=require('node:assert/strict'),O=require('./engine.cjs');
const s=O.create({country:'GB',seed:12});s.age=30;s.interests=['Art'];s.location.name='Paris';s.memories.pet={kind:'cat',name:'Milo',alive:true};s.people=[
 {id:'mum',role:'Mother',name:'Eleanor Williams',gender:'F',age:59,alive:true},
 {id:'dad',role:'Father',name:'Daniel Williams',gender:'M',age:62,alive:true},
 {id:'sis',role:'Sibling',name:'Sophia Williams',gender:'F',age:24,alive:true},
 {id:'son',role:'Child',name:'Oliver Williams',gender:'M',age:5,alive:true},
 {id:'friend',role:'Friend',name:'Amelia Parker',gender:'F',alive:true},
 {id:'mentor',role:'Mentor',name:'Charlotte Smith',gender:'F',job:'Teacher',alive:true},
 {id:'partner',role:'Partner',name:'Isabella Chen',gender:'F',alive:true}
];
assert.equal(O.cleanLogText(s,'Eleanor Williams helped Daniel Williams.'),'Your mum helped your dad.');
assert.equal(O.cleanLogText(s,"You remembered Eleanor Williams’s advice. Mom called Dad."),"You remembered your mum’s advice. Your mum called your dad.");
assert.equal(O.cleanLogText(s,'Your son Oliver Williams started school.'),'Your son started school.');
assert.equal(O.cleanLogText(s,'Your daughter (Oliver Williams) started school.'),'Your son started school.');
assert.equal(O.cleanLogText(s,'You called Amelia Parker and Sophia Williams.'),'You called your friend and your sister.');
assert.equal(O.cleanLogText(s,'Charlotte Smith helped you. Isabella Chen listened.'),'Your teacher helped you. Your partner listened.');
assert.equal(O.cleanLogText(s,'A quiet evening with Sophia'),'A quiet evening with your sister');
assert.equal(O.cleanLogText(s,'Milo slept while you studied Art in Paris.'),'Milo slept while you studied Art in Paris.');
const people=JSON.stringify(s.people);O.journal(s,'Eleanor Williams visits','Daniel Williams and Amelia Parker make tea.','life');assert.equal(s.journal[0].title,'Your mum visits');assert.equal(s.journal[0].description,'Your dad and your friend make tea.');assert.equal(JSON.stringify(s.people),people,'memory wording must not alter names in the identity records');
const mother=s.people[0];s.age=2;s.school=false;s.pending=null;s.agenda=[];const queued=O.pickStories(s,100).find(x=>x.subjectId===mother.id);assert(queued);assert(!queued.description.includes(mother.name));O.fireStory(s,queued);assert.match(s.journal[0].description,/your mum/i);
O.setCurrency('GBP');assert.match(O.cleanLogText(s,'Eleanor Williams paid ¤100¤.'),/Your mum paid £75/);
s.people.push({id:'other',role:'Friend',name:'Amelia Stone',gender:'F'});assert.equal(O.cleanLogText(s,'Amelia Parker called Amelia Stone.'),'Your friend called your friend.');
console.log('PASS: relationship-led memories, old-save rendering, sentence case, possessives, label deduplication, specific subjects, pet/place preservation and unchanged identity records.');
