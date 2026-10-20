const assert=require('node:assert/strict'),O=require('./engine.cjs');
const degree=O.DEGREES.find(d=>d.id==='computing'),event=id=>O.EVENTS.find(e=>e.id===id);
function student(){
 const s=O.create({country:'GB',seed:61});s.age=18;s.education=O.EDU[2];s.pending=null;s.agenda=[];s.job='';s.income=0;s.cash=30000;s.debt=0;s.familyCash=100000;s.familyAssets=200000;s.familyDebts=0;s.school=false;s.knowledge=90;s.health=85;s.schoolGrades=90;s.interests=['Programming'];s.flags.livingWithFamily=true;
 for(const p of s.people.filter(p=>['Mother','Father'].includes(p.role))){p.alive=true;p.retired=false;p.health=90;}
 O.ensureClarity(s);return s;
}
function admit(s){const chance=O.chance;O.chance=()=>true;const result=O.applyForDegree(s,degree.id);O.chance=chance;assert.equal(s.study.status,'enrolled',result);return result;}
{
 const s=student(),quote=O.degreeFunding(s,degree),cash=s.cash,wealth=s.familyCash+s.familyAssets;assert.equal(quote.personal,0);const text=admit(s);assert.match(text,/all the tuition/);assert.equal(s.cash,cash);assert.equal(s.familyCash+s.familyAssets,wealth-quote.family);assert.equal(s.debt,0);assert.equal(s.study.funding.history.length,1);assert.equal(s.study.funding.totalFamily,quote.fee);
 const before=s.familyCash;O.livingCost(s,1000);assert.equal(s.familyCash,before,'no second tuition charge at enrolment age');s.age++;O.livingCost(s,1000);assert.equal(s.study.funding.history.length,2);const after=s.familyCash;O.livingCost(s,1000);assert.equal(s.familyCash,after,'renewal is once per year');assert.equal(s.budgetBreakdown.tuition,0);assert.equal(s.study.funding.totalFamily,quote.fee*2);
}
{
 const s=student();s.familyCash=0;s.familyAssets=400000;const f=O.degreeFunding(s,degree),assets=s.familyAssets;assert.equal(f.cashPart,0);assert.equal(f.assetPart,f.fee);admit(s);assert.equal(s.familyCash,0);assert.equal(s.familyAssets,assets-f.fee);assert.equal(s.cash,30000);
 const base=O.parentStudyBudget(s).reserve;s.people.find(p=>p.role==='Mother').retired=true;assert(O.parentStudyBudget(s).reserve>base);s.familyAssets=0;s.familyCash=100;assert.equal(O.degreeFunding(s,degree).family,0,'protect essentials before promising parental help');
}
{
 const s=student();for(const p of s.people)p.alive=false;assert.equal(O.degreeFunding(s,degree).family,0);const before=s.cash;admit(s);assert.equal(s.cash,before-Math.round(degree.fee*s.country.ppp));assert.equal(s.study.funding.totalFamily,0);
}
{
 const s=student();admit(s);s.age=19;s.familyCash=0;s.familyAssets=0;s.cash=0;const debt=s.debt;O.livingCost(s,1000);assert.equal(s.study.status,'funding-review');assert.equal(s.debt,debt,'a missing tuition payment cannot silently become a loan');assert.equal(s.study.funding.history.length,1);assert.match(O.schoolLabel(s),/funding decision/);assert.match(s.journal[0].description,/Tuition|tuition/);assert.equal(event('university-funding-review').options(s)[0].disabled,true);
 const chance=O.chance;O.chance=()=>true;s.pending='university-funding-review';assert(O.applyChoice(s,1));O.chance=chance;assert.equal(s.pending,'university-funding-review');assert.equal(s.study.grantRate,.5);assert.equal(event('university-funding-review').options(s)[1].disabled,true);assert.equal(s.cash,0);
 s.cash=10000;const f=O.degreeFunding(s,degree),before=s.cash;assert(O.applyChoice(s,0));assert.equal(s.pending,null);assert.equal(s.study.status,'enrolled');assert.equal(s.cash,before-f.personal);assert.equal(s.study.funding.history.at(-1).grant,f.grant);const paid=s.cash;O.reviewUniversityFunding(s,'continue');assert.equal(s.cash,paid,'cannot confirm the same annual payment twice');s.age++;s.study.status='funding-review';assert.equal(event('university-funding-review').options(s)[1].disabled,true,'an existing continuing grant must not create a repeated application loop');
}
{
 const s=student();s.job='Retail worker';s.income=24000;O.ensureClarity(s);admit(s);assert.equal(s.employment.mode,'part-time');assert.equal(s.income,12000);s.study.status='funding-review';const due=s.study.graduationAge,progress=s.study.progress;O.reviewUniversityFunding(s,'pause');assert.equal(s.employment.mode,'full-time');assert.equal(s.income,24000);assert.match(O.reviewUniversityFunding(s,'continue'),/year away/);s.age++;O.passive(s);assert.equal(s.study.progress,progress,'no study progress during a year away');assert.equal(s.study.status,'paused');s.cash=20000;O.reviewUniversityFunding(s,'continue');assert.equal(s.study.status,'enrolled');assert.equal(s.study.graduationAge,due+1);assert.equal(s.employment.mode,'part-time');assert.equal(s.income,12000);
}
{
 const s=student();admit(s);s.study.status='funding-review';s.age=19;O.reviewUniversityFunding(s,'part-time');assert.equal(s.study.progressRate,.5);const f=O.degreeFunding(s,degree);assert.equal(f.gross,Math.round(s.country.ppp*degree.fee*.5));O.reviewUniversityFunding(s,'continue');s.age++;const progress=s.study.progress;O.passive(s);assert.equal(s.study.progress,progress+.5);
}
{
 const s=student();admit(s);s.age=s.study.graduationAge;const cash=s.familyCash;O.livingCost(s,1000);assert.equal(s.familyCash,cash,'the graduation boundary does not charge an extra course year');
 const chance=O.chance;O.chance=()=>true;O.passive(s);O.chance=chance;assert.equal(s.study.status,'completed');assert.match(O.universityHTML(s),/Tuition payment history/);assert(!O.universityHTML(s).includes('Next annual tuition'));
}
{
 const s=student();s.cash=0;s.familyIncome=12000;admit(s);const chance=O.chance;O.chance=(_s,p)=>p>=.9;
 for(s.age=19;s.age<=20;s.age++){O.passive(s);assert.equal(s.debt,0,'wealthy parents can fund essential living costs as well as fees');assert(s.study.funding.totalLiving>0);assert(!s.journal.some(e=>String(e.description).includes('undefined')));}
 const before=s.study.funding.history.length;O.passive(s);O.chance=chance;assert.equal(s.study.status,'completed');assert.equal(s.study.funding.history.length,degree.years);assert.equal(before,degree.years);assert.equal(s.study.progress,degree.years);assert.equal(s.debt,0);
}
{
 const s=student();admit(s);s.age=19;s.cash=0;s.familyCash=0;s.familyAssets=0;const chance=O.chance;O.chance=(_s,p)=>p>=.9;O.passive(s);O.chance=chance;assert.equal(s.study.status,'funding-review');assert.equal(s.study.progress,1,'the already funded and completed first year is retained when next-year funding fails');
}
console.log('PASS: full parental tuition, cash/asset conservation, protected reserves, annual renewal, no automatic tuition loans, grants, pause/resume, part-time progression and no extra graduation fee.');
