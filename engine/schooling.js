/* Completed schooling, not age or an application, earns a qualification.
   Version 1 is an illustrative shared model, not national school-calendar data. */
(function(O){'use strict';
 const model=s=>s.schoolRecord?.version===1,clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
 const track=s=>s.flags.educationTrack;
 O.initialSchoolCourse=s=>model(s)&&!track(s)?.completed&&['enrolled','enquiring'].includes(track(s)?.status)&&['academic','vocational'].includes(track(s)?.route);
 O.schoolLeavingReady=s=>!s.flags.flow?.schoolLeavingResolved&&!O.initialSchoolCourse(s)&&(s.age===O.schoolLeavingAge(s)||s.age>O.schoolLeavingAge(s)&&!!s.schoolRecord?.exitDue);
 O.schoolProfile=country=>({countryCode:country.code,startAge:6,primaryYears:6,secondaryYears:country.code==='IT'?7:6,source:'Illustrative existing country profile; shared school periods'});
 O.createSchoolRecord=s=>{s.schoolRecord={version:1,profile:O.schoolProfile(s.country),years:[],awards:[],lastAge:0,wantsSchool:false,supportUntil:-1,exitDue:false};};
 O.hasSecondaryQualification=s=>{
  const n=O.educationNumber(s.education);
  return !model(s)?n>=2:n===2||n>=4||s.schoolRecord.awards.some(a=>a.level===2);
 };
 O.hasPrimaryQualification=s=>O.hasSecondaryQualification(s)||O.educationNumber(s.education)===1||(!model(s)&&O.educationNumber(s.education)>=1)||!!s.schoolRecord?.awards.some(a=>a.level===1);
 O.schoolOpportunities=function(s){
  const score=clamp(s.country.school,0,100),rural=s.urban?0:(100-clamp(s.country.infra,0,100))*.00018;
  const hardship=(s.flags.foodInsecure?.06:0)+(s.familyIncome<s.country.ppp*.3&&s.familyCash<s.country.ppp*.02?.015:0);
  const help=s.schoolRecord?.supportUntil>=s.age?.04:0;
  return {entry:clamp(.35+score/180+s.strata*.02-rural*4-hardship+(s.schoolAccess?0:-.18)+help,.15,.99),
   retention:clamp(.97+score*.0002+s.strata*.001-rural-hardship-(s.health<25?.12:0)+help,.65,.997),
   assessment:clamp(.38+s.knowledge*.004+s.schoolGrades*.002-(s.stress>75?.1:0)-(s.health<25?.1:0),.2,.97)};
 };
 O.awardSchoolQualification=function(s,level,{source,name=O.EDU[level],credits,required}={}){
  if(model(s)){
   if(!Number.isFinite(credits)||!Number.isFinite(required)||credits<required)throw Error('Insufficient completed study for qualification.');
   if(s.schoolRecord.awards.some(a=>a.level===level&&a.name===name))return false;
   s.schoolRecord.awards.push({level,name,age:s.age,source,credits,required});
  }
  if(O.educationNumber(s.education)<level)s.education=O.EDU[level];
  return true;
 };
 function enter(s,tutored=false){
  const r=s.schoolRecord;r.wantsSchool=true;
  if(tutored){const paid=O.payStudyFunding(s,Math.round(s.country.ppp*.01));if(!paid.ok)return paid.message;r.supportUntil=s.age+2;}
  if(s.school){O.adjust(s,{knowledge:tutored?5:2});return tutored?'Your family pays for additional support while your existing school place continues. The qualification still depends on completed study and assessment.':'You continue attending your current school and preparing for its assessments.';}
  if(!O.chance(s,O.schoolOpportunities(s).entry)){O.adjust(s,{stress:2});return 'Your caregivers try to arrange school, but access and practical costs delay attendance. They continue looking for a place.';}
  s.school=true;O.adjust(s,{knowledge:tutored?9:7});return tutored?'Your caregivers arrange school and additional support. Fees and materials are paid from the quoted funds.':'Your caregivers arrange for you to begin school. Attendance and later assessments still determine which qualifications you earn.';
 }
 const entry=O.EVENTS.find(e=>e.id==='school-entry'),oldEntry=entry.options;
 entry.options=s=>!model(s)?oldEntry(s):[
  {label:'Tell your family you want to attend school',detail:'Your family tries to arrange a place and transport. Access is not guaranteed.',apply:st=>enter(st)},
  {label:'Learn with family and community for now',detail:'Keep learning outside school. This does not award a formal qualification.',apply:st=>{st.schoolRecord.wantsSchool=false;st.school=false;O.adjust(st,{knowledge:3,relationships:2});return 'You learn with family and community for now. A later school opportunity or adult equivalency route can still change your path.';}},
  ...(s.strata>=5?[{label:'Ask about additional tutoring',detail:`School support and materials ${O.money(s.country.ppp*.01)}; family reserves remain protected. A place is still uncertain.`,disabled:O.familyFundingQuote(s,s.country.ppp*.01).personal>s.cash,apply:st=>enter(st,true)}]:[])
 ];
 const costs=O.EVENTS.find(e=>e.id==='school-costs'),oldCosts=costs.options;
 costs.options=s=>{
  if(!model(s))return oldCosts(s);
  const cost=Math.round(s.country.ppp*.03),quote=O.familyFundingQuote(s,cost);
  return [{label:'Try to remain in school',detail:`School travel and materials ${O.money(cost)}. Family support ${O.money(quote.family)}; your share ${O.money(quote.personal)}. Household reserves are protected.`,disabled:s.cash<quote.personal,apply:st=>{const paid=O.payStudyFunding(st,cost);if(!paid.ok)return paid.message;st.schoolRecord.supportUntil=st.age+1;O.adjust(st,{knowledge:2,stress:2});return `Your household covers ${O.money(cost)} of school expenses. Attendance can continue, with the support recorded through next year.`;}},
   {label:'Look for educational assistance',detail:'An uncertain application for help with materials and travel. No money is promised or charged before a result.',apply:st=>{if(O.chance(st,.2+st.knowledge/270)){st.schoolRecord.supportUntil=st.age+2;O.adjust(st,{stress:-3});return 'Assistance with school materials and travel is arranged for the next two years. It is practical support, not cash added to your savings.';}O.adjust(st,{stress:2});return 'No assistance is available this time. Your existing qualifications and completed study remain.';}},
   {label:'Take time away from school to help at home',detail:'Pause formal attendance. Keep completed qualifications; later return or equivalency remains possible.',apply:st=>{st.school=false;st.schoolRecord.wantsSchool=false;O.adjust(st,{relationships:3,stress:2});return 'You take time away from formal school to help the household. Earlier attendance is kept, and later school opportunities or adult equivalency remain possible.';}}];
 };
 O.EVENTS.push({id:'school-return',min:8,max:15,weight:22,category:'Education',scene:'school',
  when:s=>model(s)&&!s.school&&!s.schoolRecord.wantsSchool&&!s.schoolRecord.returnConsidered&&!s.study&&!['enrolled','enquiring'].includes(track(s)?.status),
  title:()=> 'Another chance to attend school',description:s=>`Your family hears about a possible school place near ${s.location.name}. Learning at home remains part of your history, but formal attendance could open qualifications. Access, travel and household responsibilities still matter.`,
  options:()=>[{label:'Ask your family to try the school place',detail:'Adults arrange enrolment. Earlier years outside school are not counted as completed school years.',apply:st=>{st.schoolRecord.returnConsidered=true;return enter(st);}},{label:'Keep learning outside school for now',detail:'No formal qualification is awarded. Adult equivalency remains possible.',apply:st=>{st.schoolRecord.returnConsidered=true;return 'You keep learning outside school for now. Your existing experience remains, and later study is still possible.';}}]});
 const exams=O.EVENTS.find(e=>e.id==='exam-years'),oldExamOptions=exams.options,oldExamWhen=exams.when;
 exams.when=s=>oldExamWhen(s)&&(!model(s)||!['enrolled','enquiring'].includes(track(s)?.status)&&!s.routes?.active['vocational-field']);
 exams.options=s=>!model(s)?oldExamOptions(s):[
  {label:'Stay in academic education',detail:'Continue towards the school-leaving assessment. Choosing a route does not award the qualification.',apply:st=>{st.schoolRecord.wantsSchool=true;st.focus='Learning';if(!st.school)return enter(st);O.adjust(st,{knowledge:3,stress:2});return 'You continue preparing for the school-leaving assessment. Your completed attendance and eventual result will determine the qualification.';}},
  {label:'Pursue vocational skills',detail:'Apply for a practical course. Admission, two years of study and a final assessment are required.',apply:st=>{st.flags.educationTrack={route:'vocational',name:'practical vocational training',started:st.age,status:'enquiring',progress:0};return 'You enquire about practical training. You keep any school qualifications already earned; this application awards none.';}},
  {label:'Start contributing to the household',detail:'Leave formal school for now. Keep completed qualifications; later equivalency or training remains possible.',apply:st=>{st.school=false;st.schoolRecord.wantsSchool=false;st.flags.earlyWork=true;O.adjust(st,{relationships:3,stress:3});return 'You leave formal schooling to help the household and explore age-appropriate work. Your completed schooling stays recorded.';}},
  ...(s.strata>=5?[{label:'Use family support for intensive preparation',detail:`Support and materials ${O.money(s.country.ppp*.01)}; no immediate qualification.`,disabled:O.familyFundingQuote(s,s.country.ppp*.01).personal>s.cash,apply:st=>enter(st,true)}]:[])
 ];
 function progressTrack(s,attended){
  const t=track(s);if(!t||t.completed||t.route==='work')return;
  if(t.status==='enquiring'&&s.age>=t.started+1){
   const eligible=t.route==='postgraduate'?O.educationNumber(s.education)>=4:t.route!=='academic'||O.hasPrimaryQualification(s);
   if(eligible&&O.chance(s,clamp(O.schoolOpportunities(s).entry+s.knowledge/600-.15,.12,.94))){
    t.status='enrolled';t.admittedAt=s.age;t.required=2;t.due=Math.max(s.age+2,t.route==='academic'?O.schoolLeavingAge(s):0);t.progress=0;s.school=true;
    O.journal(s,'A place to learn',`You are accepted onto ${t.name}. At least two years of study and a final assessment lie ahead before you can earn the qualification.`,'education');
   }else{t.status='not_admitted';t.completed=true;t.passed=false;O.journal(s,'An education application does not work out',eligible?`A place on ${t.name} is not available this year. You keep your earlier qualifications.`:`Your completed schooling does not yet meet the entry requirements for ${t.name}. Earlier qualifications remain, and equivalency can provide another route.`,'education');}
  }
  if(t.status!=='enrolled'||s.age<=t.admittedAt)return;
  if(attended)t.progress++;
  if(s.age<t.due)return;
  const level=t.route==='postgraduate'?5:t.route==='vocational'?3:2,required=t.required||2;
  const schooling=s.schoolRecord.years.filter(y=>y.attended&&y.formal).length;
  const ready=t.progress>=required&&(level!==2||schooling>=s.schoolRecord.profile.primaryYears+s.schoolRecord.profile.secondaryYears);
  t.completed=true;t.passed=ready&&O.chance(s,O.schoolOpportunities(s).assessment);t.status=t.passed?'completed':'interrupted';s.school=false;
  if(t.passed){O.awardSchoolQualification(s,level,{source:'local-course',name:t.name,credits:t.progress,required});O.adjust(s,{knowledge:6,confidence:4});}
  O.journal(s,t.passed?'Training completed':'Study interrupted',t.passed?`You complete ${t.name}. The qualification is earned after attendance and assessment; work and further admission remain separate.`:`Your ${t.name} course ends without the qualification. ${ready?'The final assessment was not passed.':'Attendance or prior schooling was insufficient.'} Completed learning remains recorded; equivalency or a later course can provide another route.`,'education');
 }
 O.registerAnnualStage('school-opportunities',s=>{
  if(!model(s))return;
  const r=s.schoolRecord,wasSchool=s.school,t=track(s),wasTrack=t?.status==='enrolled',higher=['enrolled','paused','funding-review','overseas-route'].includes(s.study?.status);
  return ()=>{
   if(r.lastAge>=s.age)return;r.lastAge=s.age;
   const schoolAge=s.age>r.profile.startAge&&(s.age<=O.schoolLeavingAge(s)||wasTrack);
   if(!schoolAge||higher)return;
   const attended=wasSchool&&O.chance(s,O.schoolOpportunities(s).retention),formal=!(wasTrack&&t.route!=='academic');
   r.years.push({age:s.age,attended,formal});if(attended)s.schooling=(s.schooling||0)+1;
   if(wasSchool&&!attended){s.school=false;r.wantsSchool=true;O.journal(s,'Schooling is interrupted','Health, household pressure or access interrupts your attendance this year. Completed qualifications are kept. Your family looks for a way to return.','education');}
   const years=r.years.filter(y=>y.attended&&y.formal).length;
   if(years>=r.profile.primaryYears&&!r.awards.some(a=>a.level===1)){
    O.awardSchoolQualification(s,1,{source:'school',credits:years,required:r.profile.primaryYears});O.journal(s,'Primary education completed','Years of lessons and schoolwork lead to the completion of primary education. Secondary school brings new subjects and further assessments.','education');
   }
   const secondary=r.profile.primaryYears+r.profile.secondaryYears;
   if(!wasTrack&&years>=secondary&&!O.hasSecondaryQualification(s)&&!r.secondaryAssessed){
    r.secondaryAssessed=true;const passed=O.chance(s,O.schoolOpportunities(s).assessment);
    if(passed)O.awardSchoolQualification(s,2,{source:'school-assessment',credits:years,required:secondary});
    O.journal(s,passed?'Secondary education completed':'The school-leaving assessment is not passed',passed?'You complete secondary education after attendance and assessment. University and related work applications can now consider this qualification.':'You keep your primary qualification and completed study, but have not earned the secondary certificate. Adult equivalency remains a route back.','education');
   }
   progressTrack(s,attended);
   if(s.age>=O.schoolLeavingAge(s)&&!O.initialSchoolCourse(s)&&!s.flags.flow?.schoolLeavingResolved)r.exitDue=true;
   if(!wasSchool&&!s.school&&r.wantsSchool&&s.age<O.schoolLeavingAge(s)&&!['enrolled','enquiring'].includes(track(s)?.status)&&O.chance(s,O.schoolOpportunities(s).entry*.45)){
    s.school=true;O.journal(s,'Returning to school','Your caregivers arrange a school place after earlier delays. Previous learning is retained; the time outside school is not counted as attendance.','education');
   }
  };
 });
 const equivalency=O.ROUTES.find(d=>d.id==='equivalency'),oldCheck=equivalency.check,oldOptions=equivalency.options;
 const oldCost=equivalency.cost,oldStart=equivalency.start,oldIntro=equivalency.intro;
 const recoveryYears=s=>O.hasPrimaryQualification(s)?1:2;
 const recoveryFunding=s=>O.familyFundingQuote(s,s.country.ppp*.015*recoveryYears(s));
 equivalency.cost=s=>model(s)?recoveryFunding(s).personal:oldCost(s);
 equivalency.costLabel=s=>model(s)?`${O.money(recoveryFunding(s).personal)} from you · ${O.money(recoveryFunding(s).family)} family support`:null;
 equivalency.start=(s,r)=>{oldStart?.(s,r);if(model(s)){const f=recoveryFunding(s);r.requiredYears=recoveryYears(s);r.primaryAtStart=O.hasPrimaryQualification(s);O.commitFamilyGift(s,f);r.funding=f;r.spent+=f.family;O.routeMove(s,r,'preparation',r.requiredYears);}};
 equivalency.intro=s=>!model(s)?oldIntro(s):`Prepare for secondary equivalency over ${recoveryYears(s)} ${recoveryYears(s)===1?'year':'years'}${O.hasPrimaryQualification(s)?'':' with foundation study and a primary assessment first'}. Family support and your own savings fund the quoted fee, with household reserves protected. Assessment outcomes remain uncertain.`;
 equivalency.check=s=>!model(s)?oldCheck(s):O.hasSecondaryQualification(s)?'You already hold secondary education or higher.':null;
 equivalency.options=(s,r)=>!model(s)?oldOptions(s,r):[{label:'Sit the qualification assessment',detail:`${r.requiredYears} ${r.requiredYears===1?'year':'years'} of preparation lead to an uncertain secondary assessment${r.primaryAtStart?'':' after a foundation assessment'}. Vocational certificates are retained; they do not automatically replace secondary education.`,apply:(st,route)=>{
  const credits=st.age-route.started,required=route.requiredYears;
  if(credits<required)throw Error('Equivalency preparation is not complete.');
  const primary=route.primaryAtStart||O.chance(st,O.routeChance(st,.4));
  if(primary&&!O.hasPrimaryQualification(st))O.awardSchoolQualification(st,1,{source:'equivalency',credits,required:1});
  const passed=primary&&O.chance(st,O.routeChance(st,.35));
  if(passed){O.awardSchoolQualification(st,2,{source:'equivalency',credits,required});O.adjust(st,{knowledge:5,confidence:4});}
  const outcome=passed?'You earn secondary education through equivalency. Earlier qualifications are retained; the completed assessment opens the routes that require secondary completion.':primary?'You keep your primary qualification and completed preparation, but do not pass the secondary assessment. A later prepared attempt remains possible.':'The foundation assessment is not passed. Your practice and earlier qualifications remain; another prepared attempt is possible.';O.routeEnd(st,route,outcome);return outcome;
 }}];
 const vocational=O.ROUTES.find(d=>d.id==='vocational-field'),vocOptions=vocational.options;
 vocational.options=(s,r)=>vocOptions(s,r).map(o=>!model(s)||r.stage!=='training'?o:{...o,apply:(st,route)=>{const result=o.apply(st,route);if(O.educationNumber(st.education)>=3&&/You complete/.test(result))O.awardSchoolQualification(st,3,{source:'field-training',name:route.field,credits:st.age-route.started,required:1});return result;}});
 const leave=O.EVENTS.find(e=>e.id==='adult-crossroads'),leaveOptions=leave.options;
 leave.options=s=>leaveOptions(s).map((o,i)=>!model(s)||i!==0||O.hasSecondaryQualification(s)?o:{...o,label:'Prepare a secondary-equivalency route',detail:'Complete missing school qualifications before university applications. Preparation and assessment take time; no qualification is granted now.',disabled:!!O.routeBlock(s,equivalency)||s.cash<O.routeCost(s,equivalency),apply:st=>{st.flags.flow.schoolLeavingResolved=true;st.flags.jobSearching=false;st.school=false;const pending=st.pending;st.pending=null;try{return O.startRoute(st,'equivalency').message;}finally{st.pending=pending;}}});
 const label=O.schoolLabel;O.schoolLabel=s=>{
  if(!model(s)||!s.school||s.study||track(s)?.status==='enrolled')return label(s);
  const years=s.schoolRecord.years.filter(y=>y.attended&&y.formal).length;
  return label({...s,age:s.schoolRecord.profile.startAge+years});
 };
 O.qualificationLabel=s=>model(s)&&O.educationNumber(s.education)===3&&O.hasSecondaryQualification(s)?`${s.education} · ${O.EDU[2]}`:s.education;
 O.leaveSchoolCourse=function(s){
  if(s.status!=='alive'||s.pending||s.age<16||!O.initialSchoolCourse(s))return {ok:false,message:'There is no current school course to leave.'};
  const t=track(s);t.status='withdrawn';t.completed=true;t.passed=false;t.ended=s.age;s.school=false;s.schoolRecord.wantsSchool=false;if(s.age>=O.schoolLeavingAge(s)&&!s.flags.flow?.schoolLeavingResolved)s.schoolRecord.exitDue=true;
  const message=`You leave ${t.name}. Completed study and earlier qualifications remain; no new certificate or fee is added.`;O.journal(s,'Leaving a school course',message,'education');return {ok:true,message};
 };
 const spend=O.spendHTML;O.spendHTML=s=>{
  if(!O.initialSchoolCourse(s)||s.age<16||s.pending)return spend(s);
  const esc=O.dynamicsHelpers.esc,t=track(s);
  return `<section class="course-entry school-course"><h3>Your school course</h3><p>${esc(t.name)} · ${t.status==='enquiring'?'Application pending':`${t.progress||0} of ${t.required||2} years completed; assessment at age ${t.due}`}. Completed qualifications: ${esc(O.qualificationLabel(s))}.</p><button class="btn" data-action="leave-school-course">Leave this school course</button></section>`+spend(s);
 };
})(window.OL);
