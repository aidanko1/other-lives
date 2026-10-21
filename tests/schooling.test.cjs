const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
const copy=s=>JSON.parse(JSON.stringify(s));
function pupil(O,age=6){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=age;Object.assign(s,{age,month:0,school:true,pending:null,agenda:[],cash:100000,familyCash:1000000,familyAssets:2000000,knowledge:90,health:90,schoolGrades:90,stress:0});s.schoolRecord.wantsSchool=true;return s;}
function controlled(O,fn){const chance=O.chance;O.chance=(_s,p)=>p>=.3;try{return fn();}finally{O.chance=chance;}}
function year(O,s){s.age++;s.month=0;O.passive(s);O.assertConsistent(s);}
test('all129 new births and first snapshots have explicit school assumptions; opportunity queries are pure',()=>{
 const O=loadEngine();for(const country of O.COUNTRIES){const s=O.create({country:country.code,seed:2218}),before=JSON.stringify(s),p=O.schoolOpportunities(s);assert.equal(s.schoolRecord.profile.countryCode,country.code);assert.match(s.schoolRecord.profile.source,/Illustrative/);assert.deepEqual(copy(s.snapshots[0].data.schoolRecord),copy(s.schoolRecord));for(const x of Object.values(p))assert(Number.isFinite(x)&&x>0&&x<1);assert.equal(JSON.stringify(s),before);
 const poor=copy(s),rich=copy(s);Object.assign(poor,{strata:0,urban:false,familyIncome:0,familyCash:0});poor.flags.foodInsecure=true;Object.assign(rich,{strata:7,urban:true,familyIncome:1e6,familyCash:1e6});rich.flags.foodInsecure=false;const a=O.schoolOpportunities(poor),b=O.schoolOpportunities(rich);assert(b.entry>a.entry);assert(b.retention>a.retention);}
});
test('age and an academic choice cannot award completed qualifications',()=>{
 const O=loadEngine(),s=pupil(O,12);O.ensureClarity(s);assert.equal(O.educationNumber(s.education),0);s.age=16;const e=O.EVENTS.find(e=>e.id==='exam-years');controlled(O,()=>e.options(s)[0].apply(s));assert.equal(O.educationNumber(s.education),0);assert.equal(s.schoolRecord.awards.length,0);
});
test('six attended school periods earn primary, twelve plus assessment earn secondary, once only',()=>{
 const O=loadEngine(),s=pupil(O);controlled(O,()=>{for(let i=0;i<5;i++)year(O,s);assert.equal(O.educationNumber(s.education),0);year(O,s);assert.equal(O.educationNumber(s.education),1);assert.equal(s.age,12);for(let i=0;i<6;i++)year(O,s);assert.equal(s.age,18);assert.equal(O.educationNumber(s.education),2);assert.equal(s.schoolRecord.years.filter(y=>y.attended).length,12);assert.equal(s.schoolRecord.awards.length,2);const before=JSON.stringify(s);O.passive(s);assert.equal(JSON.stringify(s),before);});
});
test('interrupted school years do not count; an intended return resumes without inventing past attendance',()=>{
 const O=loadEngine(),s=pupil(O),chance=O.chance;O.chance=()=>false;try{year(O,s);assert.equal(s.school,false);assert.equal(s.schoolRecord.years[0].attended,false);assert.equal(s.schooling,0);}finally{O.chance=chance;}
 controlled(O,()=>{year(O,s);assert.equal(s.school,true);assert.equal(s.schooling,0);year(O,s);assert.equal(s.schooling,1);});assert.equal(O.educationNumber(s.education),0);
 const home=pupil(O,9);home.school=false;home.schoolRecord.wantsSchool=false;const e=O.EVENTS.find(e=>e.id==='school-return');assert(O.eventEligible(home,e));controlled(O,()=>e.options(home)[0].apply(home));assert(home.school);assert(home.schoolRecord.returnConsidered);assert(!e.when(home));assert.equal(home.schooling,0);
});
test('an interrupted local course cannot pass without attendance even with a successful random outcome',()=>{
 const O=loadEngine(),s=pupil(O,17);s.school=false;s.flags.educationTrack={route:'academic',name:'Academic course',status:'enrolled',started:14,admittedAt:15,due:17,progress:0,required:2};controlled(O,()=>O.passive(s));assert.equal(s.flags.educationTrack.passed,false);assert.equal(s.flags.educationTrack.status,'interrupted');assert.equal(O.educationNumber(s.education),0);O.assertConsistent(s);
});
test('a valid late course finishes before the school-leaving choice and is not blocked by age19',()=>{
 const O=loadEngine(),s=pupil(O,18);s.education=O.EDU[1];s.schoolRecord.years=Array.from({length:10},(_,i)=>({age:i+7,attended:true,formal:true}));s.schoolRecord.lastAge=17;s.schooling=10;s.flags.educationTrack={route:'academic',name:'Academic course',status:'enrolled',started:17,admittedAt:18,due:20,progress:0,required:2};
 controlled(O,()=>{year(O,s);assert(!O.schoolLeavingReady(s));assert(!O.makeAgenda(s).some(x=>x.id==='adult-crossroads'));assert.match(O.startJobSearch(s).message,/School-age/);year(O,s);assert.equal(s.flags.educationTrack.passed,true);assert.equal(O.educationNumber(s.education),2);assert(O.schoolLeavingReady(s));s.pending=null;O.advanceMonth(s);assert.equal(s.pending,'adult-crossroads');assert(O.eventEligible(s,O.EVENTS.find(e=>e.id===s.pending)));});
});
test('vocational study remains distinct from secondary eligibility; equivalency adds missing qualifications without erasing it',()=>{
 const O=loadEngine(),s=pupil(O,20);s.school=false;s.flags.flow.schoolLeavingResolved=true;O.awardSchoolQualification(s,3,{source:'field-training',name:'Office skills',credits:1,required:1});assert(!O.hasSecondaryQualification(s));
 const before=JSON.stringify(s);assert.match(O.applyForDegree(s,'computing'),/school qualification/);assert.equal(JSON.stringify(s),before);for(const id of ['flexible-degree','overseas-study','exam-retake'])assert.match(O.routeBlock(s,O.ROUTES.find(d=>d.id===id)),/secondary/i);
 controlled(O,()=>{assert(O.startRoute(s,'equivalency').ok);const r=s.routes.active.equivalency;assert.equal(r.requiredYears,2);year(O,s);assert(!O.openRouteDecision(s,'equivalency'),'cannot assess after only one of two required years');assert(!O.hasSecondaryQualification(s));year(O,s);s.pending=null;assert(O.openRouteDecision(s,'equivalency'));const v=O.decisionView(s);assert(O.applyChoice(s,0,v.token));assert.equal(s.education,O.EDU[3]);for(const level of [1,2])assert(s.schoolRecord.awards.some(a=>a.level===level));});
 assert(O.hasSecondaryQualification(s));const equivalency=O.ROUTES.find(d=>d.id==='equivalency');assert(O.routeBlock(s,equivalency));assert.equal(equivalency.check(s),'You already hold secondary education or higher.');assert.match(O.qualificationLabel(s),/Secondary/);const loaded=O.migrateLife(s);assert.deepEqual(copy(loaded),copy(s));
 controlled(O,()=>{O.applyForDegree(s,'computing');assert.equal(s.study.status,'enrolled');});O.assertConsistent(s);
});
test('school-leaving offers a real prepared recovery route instead of an ineligible university loop',()=>{
 const O=loadEngine(),s=pupil(O,18);s.school=false;s.pending='adult-crossroads';const v=O.decisionView(s);assert.match(v.options[0].label,/equivalency/);assert(O.applyChoice(s,0,v.token));assert(s.routes.active.equivalency);assert.equal(s.routes.active.equivalency.due,20);assert.equal(O.educationNumber(s.education),0);assert(!s.pending);assert(s.flags.flow.schoolLeavingResolved);
});
test('school support conserves quoted funds, protects reserves and persists into later opportunity calculations',()=>{
 const O=loadEngine(),s=pupil(O,13),e=O.EVENTS.find(e=>e.id==='school-costs'),cost=Math.round(s.country.ppp*.03),before=s.cash+s.familyCash+s.familyAssets;
 const option=e.options(s)[0];assert(!option.disabled);option.apply(s);assert.equal(s.cash+s.familyCash+s.familyAssets,before-cost);assert.equal(s.schoolRecord.supportUntil,14);assert.equal(s.debt,0);
 const unsupported=copy(s);unsupported.schoolRecord.supportUntil=-1;assert(O.schoolOpportunities(s).retention>=O.schoolOpportunities(unsupported).retention);
 s.cash=s.familyCash=s.familyAssets=0;assert(e.options(s)[0].disabled);const funds=s.cash+s.familyCash+s.familyAssets;controlled(O,()=>e.options(s)[1].apply(s));assert.equal(s.cash+s.familyCash+s.familyAssets,funds);assert.equal(s.schoolRecord.supportUntil,15);
 e.options(s)[2].apply(s);assert.equal(s.school,false);assert.equal(s.schoolRecord.wantsSchool,false);assert.equal(s.education,O.EDU[0]);
});
test('family-funded equivalency has conserved fees and a deliberate course withdrawal frees later commitments',()=>{
 const O=loadEngine(),s=pupil(O,18),d=O.ROUTES.find(d=>d.id==='equivalency');s.school=false;s.cash=0;s.flags.flow.schoolLeavingResolved=true;
 const total=s.cash+s.familyCash+s.familyAssets,cost=Math.round(s.country.ppp*.03);assert.equal(O.routeCost(s,d),0);assert.match(d.costLabel(s),/family support/);assert(O.startRoute(s,d.id).ok);assert.equal(total-s.cash-s.familyCash-s.familyAssets,cost);assert.equal(s.routes.active.equivalency.spent,cost);assert.equal(s.debt,0);
 const c=pupil(O,18);c.flags.educationTrack={route:'academic',name:'Academic course',started:16,status:'enrolled',admittedAt:17,due:20,progress:1,required:2};assert.match(O.routeBlock(c,d),/Complete or leave/);const before=copy(c),r=O.leaveSchoolCourse(c);assert(r.ok);for(const key of ['age','month','rng','cash','familyCash','familyAssets','education'])assert.equal(c[key],before[key]);assert.equal(c.flags.educationTrack.status,'withdrawn');assert(O.schoolLeavingReady(c));assert(!O.leaveSchoolCourse(c).ok);O.assertConsistent(c);
});
test('school invariants detect invented, duplicate or future attendance and unsupported awards',()=>{
 const O=loadEngine(),s=pupil(O,18);s.schoolRecord.years=[{age:19,attended:true,formal:true},{age:19,attended:true,formal:true}];s.schoolRecord.awards=[{level:2,name:'Secondary',age:18,source:'school-assessment',credits:0,required:12}];const codes=O.consistencyIssues(s).map(x=>x.code);for(const code of ['school.timeline','school.award','school.credits'])assert(codes.includes(code));assert.throws(()=>O.migrateLife({...s,schoolRecord:{version:99}}),/newer schooling/);
});
test('legacy saves retain exact history, choices and seeded continuation without a fabricated school record',()=>{
 const old=loadEngine({skipScripts:['engine/schooling.js']}),O=loadEngine(),settings={country:'GB',seed:2218};let a=old.create(settings);O.create(settings);let b=O.migrateLife(a);assert.equal(JSON.stringify(a),JSON.stringify(b));assert.equal(b.schoolRecord,undefined);
 for(let n=0;n<2000&&a.status==='alive';n++){if(a.pending){const v=old.decisionView(a),w=O.decisionView(b);assert.deepEqual(copy(w),copy(v));const i=v.options.findIndex(x=>!x.disabled);assert(old.applyChoice(a,i,v.token));assert(O.applyChoice(b,i,w.token));}else{old.advanceMonth(a);O.advanceMonth(b);}assert.equal(JSON.stringify(b),JSON.stringify(a),'legacy continuation changed at '+a.age+'/'+a.month);}assert.equal(a.status,'finished');assert.equal(b.status,'finished');
});
