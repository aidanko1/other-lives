const assert=require('node:assert/strict'),O=require('./engine.cjs');
function life(age=30){const s=O.create({country:'GB',seed:2218});Object.assign(s,{age,month:0,pending:null,agenda:[],cash:1e7,debt:0,income:35000,job:'Office administrator',school:false,health:85,happiness:65,knowledge:85,relationships:65,stress:20,confidence:55});s.flags.flow={schoolLeavingResolved:true};s.familyCash=1e6;s.familyAssets=2e6;s.familyDebts=0;O.ensureClarity(s);return s;}
const event=id=>O.EVENTS.find(x=>x.id===id);
{
 const s=life(18);s.education=O.EDU[2];s.job='';s.income=0;s.flags.flow={};delete s.flags.jobSearching;s.agenda=O.makeAgenda(s);assert.equal(s.flags.jobSearching,false);assert(!s.agenda.some(x=>x.id==='career-search-results'));assert(s.agenda.some(x=>x.id==='adult-crossroads'));O.advanceMonth(s);assert.equal(s.pending,'adult-crossroads');assert(O.applyChoice(s,0));assert.equal(s.pending,'choose-degree-subject');assert(!s.flags.jobSearching);
}
{
 const s=life(24);s.study={degreeId:'medicine',course:'Medicine',status:'completed',mode:'full-time',duration:6,started:18,graduationAge:24,progress:6};s.job='Hospitality worker';s.income=3600;s.employment={role:s.job,mode:'part-time',hours:20};O.ensureClarity(s);assert.equal(s.job,'');assert.equal(s.income,0);assert(s.flags.flow.graduateDecision);O.advanceMonth(s);assert.equal(s.pending,'graduate-next-step');const options=event(s.pending).options(s);assert.match(options[0].label,/doctor/i);assert.match(options[0].detail,/full-time/);assert(O.applyChoice(s,0));assert.match(s.job,/doctor/i);assert.equal(s.employment.mode,'full-time');assert.equal(s.school,false);assert(O.educationNumber(s.education)>=4);assert.equal(s.study.status,'completed');assert(s.income>3600);assert.equal(s.flags.medicalTraining.independent,false);
 const again=JSON.stringify(s);O.ensureClarity(s);assert.equal(JSON.stringify(s),again,'a repaired graduation must not reopen or erase accepted work');
}
{
 const s=life(35);s.study={degreeId:'medicine',course:'Medicine',status:'completed',mode:'full-time',duration:6,started:18,graduationAge:24,progress:6};s.job='Warehouse assistant';O.ensureClarity(s);assert(s.flags.flow.graduateDecision,'old saves with a medicine degree get a relevant next step');s.flags.searchMode='pay';assert(O.careerOffers(s).some(j=>/doctor/i.test(j.title)));assert(!O.careerOffers(s).some(j=>/farm|hospitality|warehouse/i.test(j.title)));
}
{
 const s=life(30);s.study={degreeId:'humanities',course:'History & Humanities',status:'completed',mode:'full-time'};O.ensureClarity(s);assert(!O.graduateOffers(s).some(j=>/doctor|nurse|engineer/i.test(j.title)));assert(!O.careerOffers(s).some(j=>/doctor|nurse|engineer|software developer/i.test(j.title)));
}
{
 const low=life(),high=life();low.happiness=40;high.happiness=95;O.adjust(low,{happiness:10});O.adjust(high,{happiness:10});assert(low.happiness-40>high.happiness-95);assert(high.happiness<100);
 const s=life(),before=O.factorSnapshot(s);O.adjust(s,{stress:10});assert(s.happiness<before.happiness);assert(s.health<before.health);assert(s.knowledge<before.knowledge);const b=O.factorSnapshot(s);O.adjust(s,{confidence:10});assert(s.happiness>b.happiness);assert(s.relationships>b.relationships);
}
{
 const s=life();s.health=s.happiness=s.knowledge=s.relationships=99;s.routines=['connection','outdoors'];s.focus='Rest';const chance=O.chance;O.chance=()=>false;for(let i=0;i<20;i++){s.age++;O.passive(s);}O.chance=chance;assert(s.happiness<90);assert(s.relationships<95);assert(s.knowledge<95);assert(s.health<98);assert(s.factorTrend);assert(!s.journal.some(e=>/undefined/.test(e.description)));
}
{
 const s=life(),p1=O.createContact(s,'Friend',30,'F'),p2=O.createContact(s,'Friend',30,'F');p1.close=p2.close=90;s.relationships=80;
 const all=O.pickStories(s,100),x=all.find(x=>x.dynamicMoment==='friend-laugh');assert(x);O.fireStory(s,x);assert(!O.momentCandidates(s).some(x=>x.d.id==='friend-laugh'),'same template cannot repeat for another friend in the same period');s.age+=2;assert(!O.momentCandidates(s).some(x=>x.d.id==='friend-laugh'));
 assert.equal(O.memoryText(s,'Your partner tells your friend a story.'),'Your partner tells your friend a story.');
}
{
 const savedChance=O.chance;for(const success of [true,false]){O.chance=()=>success;const ids=new Set();for(const d of O.ROUTES){assert(!ids.has(d.id));ids.add(d.id);const s=life(Math.max(d.min,Math.min(d.max||100,30)));s.pending=null;s.knowledge=90;s.confidence=75;s.education=O.EDU[5];s.postgraduate={level:'phd',subject:'Engineering'};if(d.id==='phd')s.postgraduate.level='master';if(d.id==='equivalency')s.education=O.EDU[1];s.interests=['Music','Dance','Football','Drawing','Acting','Video games','Chess'];for(const n of s.interests)s.experience.hobbies[n]={years:9,level:10};s.flags.familyBusiness=true;s.routes.policies.faithPractice=true;s.routes.destination='CA';s.residency={origin:'IN',arrived:s.age-10,status:d.id==='citizenship'?'Permanent residence':d.id==='residence'?'Temporary residence':'Citizen'};s.health=40;if(d.id!=='medical-care')s.health=90;s.routes.symptoms=true;s.housing={kind:'owned',value:150000,rent:0};s.property=150000;s.people.filter(x=>['Mother','Father'].includes(x.role)).forEach(x=>{x.alive=true;x.age=70;x.retired=true;x.health=80;});const partner=O.createContact(s,'Partner',32,'F');partner.relationshipStage='married';partner.residence='Your household';partner.annualIncome=30000;const child=O.newChild(s);child.age=3;child.residence='Your household';s.flags.flow.graduateDecision=false;
  if(d.id==='kpop')s.country=O.COUNTRIES.find(c=>c.code==='KR');if(['overseas-work','overseas-study','return-home'].includes(d.id)){s.housing={kind:'rented',rent:1000};s.property=0;}if(d.id==='professional-training'){s.job='Trainee accountant';s.flags.completedDegree='business';s.experience.roles[s.job]=3;}if(d.id==='earlier-degree-record'){delete s.study;delete s.flags.completedDegree;}const block=O.routeBlock(s,d);assert.equal(block,null,d.id+': '+block);const result=O.startRoute(s,d.id);assert(result.ok,d.id+': '+result.message);assert(s.routes.active[d.id]);
  let steps=0;while(s.routes.active[d.id]&&steps++<40){const r=s.routes.active[d.id];if(d.id==='professional-training'&&r.stage==='training'){r.progress=r.required;r.stage='assessment';}s.age=Math.max(s.age,r.due);s.pending='life-route-decision';r.status='decision';const ev=event(s.pending),options=ev.options(s);assert(options.length,d.id+' missing options');let i=options.findIndex(o=>!o.disabled);if(d.id==='business'&&r.stage==='operating')i=options.findIndex(o=>/Close before/.test(o.label));if(!success&&steps>2){const leave=options.findIndex(o=>/Leave this route/.test(o.label));if(leave>=0)i=leave;}assert(i>=0,d.id+' no valid exit');assert(O.applyChoice(s,i),d.id+' rejected valid choice');assert(Number.isFinite(s.cash)&&s.cash>=0&&Number.isFinite(s.debt)&&s.debt>=0,d.id+' invalid money');}
  assert(steps<40,d.id+' stalled');assert(s.routes.history.some(x=>x.id===d.id),d.id+' missing outcome');
 }
 assert(ids.size>=35);}
 O.chance=savedChance;
}
console.log('PASS: university-before-career, saved medicine graduate repair, relevant qualified offers, full-time graduation, sustainable factors, auxiliary effects, cross-person cooldowns and all route stage/exit contracts.');
// Eligibility, persistence and accounting at the intersections reported by players.
{
 const s=life();s.journal.push({age:29,title:'A joke that keeps returning',momentId:'friend-laugh'});delete s.flags.templateCooldownMigrated;O.ensureClarity(s);assert.equal(s.flags.momentHistory['template:friend-laugh'],29);
 const before=s.journal.length;O.fireStory(s,{id:'moment-friend-laugh',title:'A joke that keeps returning',description:'You and your friend laugh.',dynamicMoment:'friend-laugh',subjectId:O.createContact(s,'Friend',30,'F').id});assert.equal(s.journal.length,before);
 const pet=event('pet-adoption');s.memories.pet={name:'Milo',kind:'cat',alive:false,age:14};s.pending=pet.id;assert(O.applyChoice(s,0));assert.equal(s.memories.pet.name,'Bella');assert.equal(s.memories.petsHistory[0].name,'Milo');
 s.pending=null;s.study={course:'Medicine',degreeId:'medicine',status:'enrolled',mode:'full-time'};assert(O.routeBlock(s,O.ROUTES.find(d=>d.id==='seafaring')));assert(O.routeBlock(s,O.ROUTES.find(d=>d.id==='business')));
}
{
 const s=life(),route=O.ROUTES.find(d=>d.id==='overseas-work');s.housing={kind:'owned',value:500000,mortgage:{balance:200000,annual:16000}};s.property=500000;s.debt=200000;assert.match(O.routeBlock(s,route),/sell or let/);
 s.housing={kind:'rented',rent:1000,rentalMortgage:true,mortgage:{balance:200000,annual:16000}};O.moveCountry(s,O.COUNTRIES.find(c=>c.code==='CA'),true);assert.equal(s.housing.mortgage.balance,200000);assert.equal(s.debt,200000);assert.equal(s.property,500000);
}
{
 const s=life();s.study={course:'Medicine',degreeId:'medicine',status:'completed',funding:{totalFamily:9000}};O.ensureClarity(s);s.flags.flow.graduateDecision=false;assert(!event('graduate-parent-thanks').when(s),'unrelated old salary must not be celebrated as graduate pay');s.flags.flow.graduateRole='Junior doctor — supervised training';assert(event('graduate-parent-thanks').when(s));
 const before=O.factorSnapshot(s),preview=O.previewFactors(s,{happiness:9,stress:-7});O.adjust(s,{happiness:9,stress:-7});assert.deepEqual(O.factorDelta(before,s),preview);
 const text=O.cleanLogText(s,'Other essentials ¤100¤ · undefined ¤200¤');assert(!text.includes('undefined'));assert(text.includes('unlabelled'));
}
console.log('PASS: legacy memory cooldown migration, distinct pet histories, full-time commitment gates, secured property preservation, real graduate earnings and accurate factor previews.');
