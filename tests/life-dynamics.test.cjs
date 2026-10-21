const assert=require('node:assert/strict'),O=require('./engine.cjs');
const copy=s=>JSON.parse(JSON.stringify(s));
function life(code='GB',age=30,seed=42){const s=O.create({country:code,seed});s.age=age;s.pending=null;s.agenda=[];s.job=age>=18?'Retail worker':'';s.income=age>=18?26000:0;s.cash=age>=18?20000:0;s.debt=0;s.flags.debtObserved=0;s.debtLedger=[];s.school=age>=6&&age<18;s.interests=['Programming','History'];O.ensureClarity(s);return s;}
const event=id=>O.EVENTS.find(e=>e.id===id);
assert(O.MOMENT_DEFS.length>=220);assert.equal(new Set(O.MOMENT_DEFS.map(d=>d.id)).size,O.MOMENT_DEFS.length);
for(const d of O.MOMENT_DEFS){assert(d.fx&&Object.keys(d.fx).length,d.id+' lacks consequences');if(d.factKey)assert(O.PRECISE_FACTS[d.factKey],d.id+' lacks explanatory context');}
assert(new Set(Object.values(O.PRECISE_FACTS)).size>=50);
assert.match(O.PRECISE_FACTS.diwali.text,/lamps|lights/);assert.match(O.PRECISE_FACTS.gaokao.text,/entrance/i);assert.match(O.PRECISE_FACTS['class-10'].text,/secondary|examination/i);
for(const age of [0,2,4,7,13,17,18,30,65,90])for(const code of ['IN','CN','HK','GB','KE']){
 const s=life(code,age);const choices=O.momentCandidates(s);assert(choices.length);assert(choices.every(({d})=>age>=d.min&&age<=d.max));const stories=O.pickStories(s,4);assert(stories.every(x=>O.storyAllowed(s,x)));for(const story of stories){const save=copy(s),before=save.journal.length;O.fireStory(save,JSON.parse(JSON.stringify(story)));assert(save.journal.length===before+1);assert(save.journal[0].effects&&Object.keys(save.journal[0].effects).length);const count=save.journal.length;O.fireStory(save,story);assert.equal(save.journal.length,count);}
}
{
 const s=life('IN',15);s.knowledge=70;assert(O.momentCandidates(s).some(x=>x.d.id==='local-class10-strong'));s.knowledge=30;assert(!O.momentCandidates(s).some(x=>x.d.id==='local-class10-strong'));assert(O.momentCandidates(s).some(x=>x.d.id==='local-class10-gap'));
 const p=s.people.find(x=>x.role==='Mother');p.alive=true;const story=O.pickStories(s,50).find(x=>x.subjectId===p.id);assert(story);p.alive=false;const before=s.journal.length;O.fireStory(s,story);assert.equal(s.journal.length,before,'queued moments must recheck a person is alive');
}
{
 const s=life();s.memories.pet={kind:'cat',name:'Milo',age:2,alive:true};const all=O.pickStories(s,100),pet=all.find(x=>x.subjectId==='pet');assert(pet);s.memories.pet.alive=false;const before=s.journal.length;O.fireStory(s,pet);assert.equal(s.journal.length,before);assert(!O.momentCandidates(s).some(x=>x.d.subject==='pet'));
 s.memories.pet.alive=true;assert(O.namePet(s,'  Pepper  ').ok);assert.equal(s.memories.pet.name,'Pepper');assert(!O.namePet(s,' ').ok);O.namePet(s,'<script>');assert(O.petNameHTML(s).includes('&lt;script&gt;'));
}
{
 const s=life('IN',9);s.percentile=30;const h=O.quintileHTML(s);assert.equal((h.match(/class="filled"/g)||[]).length,2);assert.equal((h.match(/class="hollow"/g)||[]).length,3);assert(h.includes('quintile 2 of 5'));assert.match(O.placeLabel(s),/\(City\)|Countryside near|\(Village\)/);const born=JSON.stringify(s.birthPlace);s.urban=!s.urban;O.ensureClarity(s);assert.equal(JSON.stringify(s.birthPlace),born);assert.equal(s.location.urban,s.urban);
}
{
 const s=life();s.debt=500;O.journal(s,'Emergency roof repair','A contractor invoice remains unpaid.','money');assert.equal(s.debtLedger[0].reason,'Emergency roof repair');s.debt+=70;O.journal(s,'Dental bill','A second essential bill.','money');s.debt-=300;O.reconcileDebt(s,'Repayment');assert.equal(s.debtLedger.reduce((n,x)=>n+x.remaining,0),s.debt);assert.match(O.debtHTML(s),/Emergency roof repair|Dental bill/);
 const old=life();old.debt=1000;delete old.flags.debtObserved;O.ensureClarity(old);assert.match(old.debtLedger[0].note,/did not retain/);
}
{
 const s=life('GB',18);s.job='';s.income=0;s.cash=0;s.flags.livingWithFamily=true;s.study=null;s.school=false;O.passive(s);assert.equal(s.debt,0,'school-leaving year at home must not generate personal living-cost debt');
 const out=life('GB',30);out.job='';out.income=0;out.cash=0;out.flags.livingWithFamily=false;O.passive(out);assert(out.debt>0);assert(out.debtLedger.some(x=>x.reason==='Annual budget shortfall'));assert(out.lastBudget.expenses>0);assert(!O.debtHTML(out).includes('undefined'));
}
{
 const s=life();s.routines=[];assert(O.setRoutine(s,'practice').ok);assert(O.setRoutine(s,'study').ok);assert(O.setRoutine(s,'outdoors').ok);assert.equal(s.routines.length,3,'Spend preferences no longer have an arbitrary two-choice cap');const before=s.experience.hobbies.Programming.years;O.passive(s);assert(s.experience.hobbies.Programming.years>before);const once=JSON.stringify(s);O.passive(s);assert.equal(JSON.stringify(s),once,'one year cannot grant routine progress twice');s.age++;O.passive(s);assert(s.experience.hobbies.Programming.years>before+.6);assert(s.routines.includes('practice'));assert(O.skillLevel(s,'Programming')>1);
 const poor=life();poor.cash=0;poor.income=0;poor.routines=[];assert(!O.setRoutine(poor,'therapy').ok);
}
{
 const s=life('IN',18);s.education=O.EDU[2];s.knowledge=85;s.schoolGrades=80;s.cash=500000;s.familyCash=20000;const d=O.DEGREES.find(x=>x.id==='computing');const base=O.degreeChance(s,d);s.experience.hobbies.Programming.years=9;assert(O.degreeChance(s,d)>=base);
 const chance=O.chance;O.chance=()=>true;const funds=s.cash,quote=O.degreeFunding(s,d);O.applyForDegree(s,d.id);O.chance=chance;assert.equal(s.study.course,'Computer Science');assert.match(O.workLabel(s),/part-time/);assert.equal(s.employment.hours,20);assert.equal(s.cash,funds-quote.personal);assert.match(O.schoolLabel(s),/Computer Science.*Year 1/);
 O.passive(s);assert.equal(s.budgetBreakdown.tuition,0,'first tuition payment must not be charged twice');s.age++;O.passive(s);assert(s.budgetBreakdown.tuition+s.budgetBreakdown.parentTuition>0);s.age=s.study.graduationAge;s.study.progress=s.study.duration-1;s.knowledge=90;s.health=85;O.chance=(_s,p)=>p>=.9;O.passive(s);O.chance=chance;assert.equal(s.study.status,'completed');assert.equal(s.flags.completedDegree,'computing');assert.equal(s.school,false);
 const poor=life('IN',18);poor.cash=0;poor.familyCash=0;poor.knowledge=10;assert.match(O.applyForDegree(poor,'medicine'),/not yet sufficient/);assert.equal(poor.debt,0);
}
{
 const s=life('GB',15);s.school=true;const c=event('first-crush-specific'),rng=s.rng;assert(c.when(s));const title=c.title(s);assert.equal(c.title(s),title);assert.equal(s.rng,rng,'reading relationship cards must not consume simulation randomness');const description=c.description(s);assert.match(description,/, 1[3-7],/);s.pending=c.id;assert(O.applyChoice(s,1));const p=s.people.find(p=>p.role==='Friend'&&p.name===description.split(',')[0]);assert(p&&p.age>=13&&p.age<=17);assert(!c.when(s));
 const adult=life('GB',30);assert.match(event('adult-connection-specific').description(adult),/near /);assert(!event('relationship-possibility').when(adult));assert(!event('life-at-22').when(adult));assert(!event('mortgage-or-rent').when(adult));
}
{
 const s=life();s.workYears=10;s.experience.roles[s.job]=10;s.knowledge=70;const p=event('promotion');const high=p.options(s)[0].detail;s.experience.roles[s.job]=0;assert.match(high,/% game chance/);assert.equal(p.when(s),false,'promotion is unavailable without relevant experience');s.flags.searchMode='pay';s.income=1e9;assert.equal(O.careerOffers(s).length,0);assert(!event('career-search-results').when(s));
}
console.log(`PASS: ${O.MOMENT_DEFS.length} conditional moments; age/state/people revalidation, real places, quintile circles, pet names, debt causes, persistent routines, meaningful skills, degree funding/progression, named relationships and career filtering.`);
