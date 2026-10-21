/* One education/work state machine owns transitions, qualifications and employment hours. */
(function(O){'use strict';
O.schoolLeavingAge=s=>s.country.code==='IT'?19:18;
const studying=s=>['enrolled','funding-review','paused','overseas-route'].includes(s.study?.status),completed=s=>s.study?.status==='completed',esc=O.dynamicsHelpers.esc;
const catalogs={
 medicine:[['Junior doctor — supervised training',2.15],['Clinical research assistant',1.15],['Public-health research assistant',1.08]],
 nursing:[['Nurse',1.48],['Community nursing practitioner',1.4],['Clinical research assistant',1.15]],
 education:[['Teacher',1.42],['Education programme officer',1.2],['Learning support practitioner',1.15]],
 computing:[['Software developer',2.15],['Junior data analyst',1.55],['IT support technician',1.35]],
 engineering:[['Graduate engineer',1.85],['Engineering technician',1.45],['Technical project assistant',1.35]],
 business:[['Graduate business analyst',1.5],['Trainee accountant',1.45],['Operations coordinator',1.25]],
 design:[['Junior designer',1.15],['Design studio assistant',1],['Digital production assistant',1.1]],
 humanities:[['Research assistant',1.12],['Editorial assistant',1.05],['Museum education assistant',1.08]],
 agriculture:[['Agricultural adviser',1.2],['Environmental field technician',1.15],['Agricultural research assistant',1.18]],
 psychology:[['Psychology research assistant',1.15],['Support worker',.95],['Behavioural research assistant',1.12]]
};O.GRADUATE_ROLES=catalogs;
function subject(s){return s.study?.degreeId||s.flags.completedDegree;}
O.graduateOffers=function(s){const id=subject(s),skill=Math.max(1,O.skillLevel(s,s.job||'','work')),knowledge=Math.min(100,s.knowledge),fit=catalogs[id]||[['Graduate programme assistant',1.15],['Research assistant',1.15],['Project coordinator',1.2]];return fit.map(([title,mult],i)=>({title,mode:'full-time',hours:40,tier:3,skill,match:true,degree:id,pay:Math.round(s.country.ppp*mult*(.9+knowledge*.0015)*(s.study?.placement?1.04:1)),registration:id==='medicine'&&i===0?'Supervised entry; independent registration comes later.':null}));};
function repair(s){
 s.flags.flow??={};const f=s.flags.flow;if(s.study?.status==='overseas-route')s.school=true;
 if(s.age<18||studying(s)){if(!s.flags.studentWorkSearch&&!s.job){s.flags.jobSearching=false;s.agenda=(s.agenda||[]).filter(x=>x.id!=='career-search-results');}if(s.pending==='career-search-results'&&!s.flags.studentWorkSearch)s.pending=null;}
 if(completed(s)&&O.educationNumber(s.education)<4)s.education=O.EDU[4];
 if(completed(s)&&f.graduatedId!==subject(s)){
  f.graduatedId=subject(s);f.graduateDecision=true;s.school=false;s.flags.studying=false;s.flags.degreeChoosing=false;s.flags.chooseExistingSubject=false;
  s.flags.educationTrack={route:'completed-degree',completed:true,status:'completed'};
  if(!s.study.legacyRecorded&&s.study.mode==='full-time'&&s.job&&s.job!=='Retired'&&s.employment?.mode==='part-time'){
   const earlier=s.study.studentWork;f.termWork=earlier||{role:s.job,fullPay:s.employment.legacyHours?s.income:s.income*2};f.termWork.fullPay??=s.income*2;
   O.journal(s,'Your student work arrangement ends',`With ${s.study.course} completed, the term-time ${s.job} arrangement ends. You can compare qualified full-time roles or explicitly ask to continue that work. No new career is accepted automatically.`,'work');O.setEmployment(s,{});
  }else if(s.employment?.mode==='part-time'&&s.study.mode!=='part-time'&&!s.job){s.employment={role:'',mode:'unemployed',hours:0};}
  s.flags.jobSearching=false;s.agenda=(s.agenda||[]).filter(x=>!['career-search-results','postgraduate-crossroads','adult-crossroads'].includes(x.id));
 }
 return s;
}
const ensure=O.ensureClarity;O.ensureClarity=s=>{ensure(s);return repair(s);};
const applyDegree=O.applyForDegree;O.applyForDegree=function(s,id){if(s.study?.status==='overseas-route')return 'Your overseas programme is already in progress.';const before={role:s.job,fullPay:s.income,mode:s.employment?.mode};const result=applyDegree(s,id);if(s.study?.status==='enrolled'&&s.study.degreeId===id){s.study.studentWork=before.role?before:null;s.flags.flow??={};s.flags.flow.schoolLeavingResolved=true;s.flags.jobSearching=false;s.flags.studentWorkSearch=false;s.agenda=(s.agenda||[]).filter(x=>x.id!=='career-search-results');}return result;};
const leave=O.EVENTS.find(e=>e.id==='adult-crossroads');leave.max=120;leave.when=s=>(s.schoolRecord?O.schoolLeavingReady(s):s.age===O.schoolLeavingAge(s))&&!studying(s)&&!s.flags.flow?.schoolLeavingResolved;
const leaveOpts=leave.options;leave.options=s=>leaveOpts(s).map(o=>({...o,apply:st=>{st.flags.flow??={};st.flags.flow.schoolLeavingResolved=true;st.flags.jobSearching=false;return o.apply(st);}}));
const oldSearch=O.startJobSearch;O.startJobSearch=function(s,mode='pay'){
 if((s.age<O.schoolLeavingAge(s)||O.initialSchoolCourse?.(s))&&s.school)return {ok:false,message:'School-age work is not a full-time career search.'};
 if((s.schoolRecord?O.schoolLeavingReady(s):s.age===O.schoolLeavingAge(s))&&!studying(s)&&!s.flags.flow?.schoolLeavingResolved&&!s.job)return {ok:false,message:'Choose your school-leaving route before beginning full-time applications.'};
 if(studying(s)&&s.study.mode==='full-time'){s.flags.studentWorkSearch=true;const result=oldSearch(s,mode);if(result.ok)result.message='You apply for part-time student work around your course.';return result;}
 if(s.job==='Retired'){O.setEmployment(s,{});s.flags.jobSearching=false;}
 return oldSearch(s,mode);
};
const oldOffers=O.careerOffers;O.careerOffers=function(s){
 if(studying(s)&&s.study.mode==='full-time'&&!s.flags.studentWorkSearch)return [];
 const id=subject(s);let offers=oldOffers(s);
 if(completed(s)&&catalogs[id]){
  const grad=O.graduateOffers(s).filter(j=>j.title!==s.job&&(s.flags.searchMode==='interest'||j.pay>=s.income*1.05));
  const relevant=offers.filter(j=>O.DEGREES.find(d=>d.id===id)?.jobs.test(j.title));offers=[...grad,...relevant];
 }
 // Professional entry cannot be inferred from an unrelated generic university qualification.
 const allowed=j=>!(/doctor|nurse|teacher|engineer|software developer|accountant/i.test(j.title))||
  (/doctor/i.test(j.title)?completed(s)&&id==='medicine':/nurse/i.test(j.title)?completed(s)&&id==='nursing':/teacher/i.test(j.title)?completed(s)&&id==='education':/software/i.test(j.title)?completed(s)&&id==='computing':/engineer/i.test(j.title)?completed(s)&&id==='engineering':completed(s)&&id==='business');
 return offers.filter(allowed).filter((j,i,a)=>a.findIndex(x=>x.title===j.title)===i).slice(0,3);
};
const graduate={id:'graduate-next-step',min:18,max:120,weight:0,category:'Education · After graduation',scene:'work',when:s=>completed(s)&&!!s.flags.flow?.graduateDecision,title:s=>`${s.study.course} completed: your next step`,description:s=>`Your ${s.study.course} qualification is complete. These full-time entry roles fit that subject${subject(s)==='medicine'?'; the junior doctor route begins under supervision rather than granting independent practice':''}. Relevant roles are presented before unrelated work. Current earnings ${O.money(s.income)} / year. You choose whether to accept an offer, continue studying or take time.`,options:s=>[...O.graduateOffers(s).map(j=>({label:j.title,detail:`${O.money(j.pay)} / year · ${O.money(j.pay/12)} / month · ${O.payComparison(s.income,j.pay)} · full-time, 40 h/week. ${O.DEGREES.find(d=>d.id===subject(s))?.subjects.test(s.interests.join(' '))?'Connects with your interests.':'A qualified route outside your current interests.'} ${j.registration||'Your completed subject and placement are reflected in the offer.'}`,apply:st=>{st.flags.flow.graduateDecision=false;st.flags.flow.graduateRole=j.title;O.routeJob(st,j.title,j.pay);st.flags.jobSearching=false;if(subject(st)==='medicine'&&/Junior doctor/.test(j.title)){st.flags.medicalTraining={started:st.age,independent:false};st.flags.professionalLicences=['Supervised medical practice'];}O.adjust(st,{confidence:3,stress:4});return `You accept ${j.title}, full-time, earning ${O.money(j.pay)} a year. Your university course has ended and your new work experience begins.`;}})),
 ...(s.flags.flow?.termWork?[{label:`Ask to continue ${s.flags.flow.termWork.role} full-time`,detail:`Estimated offer ${O.money(s.flags.flow.termWork.fullPay)} / year. This is a deliberate choice to remain outside your degree field.`,apply:st=>{const j=st.flags.flow.termWork;st.flags.flow.graduateDecision=false;O.routeJob(st,j.role,j.fullPay);return `You choose to continue ${j.role} full-time. Your degree remains available for a later related application.`;}}]:[]),
 {label:'Explore postgraduate study first',detail:'Keep your completed qualification. Compare master’s routes in Spend; no new tuition is charged now.',apply:st=>{st.flags.flow.graduateDecision=false;st.flags.postgraduateChoice=true;return 'You decide to compare further study before committing to a graduate role.';}},
 {label:'Keep time to decide',detail:'No job is accepted. Relevant graduate offers remain available through a later search.',apply:st=>{st.flags.flow.graduateDecision=false;return 'You take time before making the next commitment. Your completed subject will guide later applications.';}}
 ]};O.EVENTS.push(graduate);
const career=O.EVENTS.find(e=>e.id==='career-search-results'),careerWhen=career.when;career.when=s=>!s.flags.flow?.graduateDecision&&(!studying(s)||s.flags.studentWorkSearch||s.study.mode==='part-time')&&careerWhen(s);
const post=O.EVENTS.find(e=>e.id==='postgraduate-crossroads');if(post)post.when=()=>false;
const agenda=O.makeAgenda;O.makeAgenda=function(s){O.ensureClarity(s);const list=agenda(s);if((s.schoolRecord?O.schoolLeavingReady(s):s.age===O.schoolLeavingAge(s))&&!studying(s)&&!s.flags.flow.schoolLeavingResolved){s.flags.jobSearching=false;return [{type:'decision',id:'adult-crossroads',month:1,done:false},...list.filter(x=>x.id!=='career-search-results'&&x.id!=='adult-crossroads')];}return list.filter(x=>x.id!=='career-search-results'||career.when(s));};
O.registerAnnualStage('graduate-transition',s=>{
 return ()=>{repair(s);
 };
});
const advance=O.advanceMonth;O.advanceMonth=function(s){O.ensureClarity(s);if(s.status==='alive'&&!s.pending&&(s.schoolRecord?O.schoolLeavingReady(s):s.age===O.schoolLeavingAge(s))&&!studying(s)&&!s.flags.flow.schoolLeavingResolved&&!s.job){s.flags.jobSearching=false;s.pending='adult-crossroads';return {advanced:true,decision:true,entry:true};}if(s.status==='alive'&&!s.pending&&graduate.when(s)){s.pending=graduate.id;return {advanced:true,decision:true,entry:true};}return advance(s);};
// Foundation experience opens further training; calendar time alone does not qualify a specialist.
O.routeYearHandlers.push((s,phase)=>{if(phase!=='after')return;const m=s.flags.medicalTraining;if(!m||m.foundationComplete||!/doctor/i.test(s.job))return;const years=Object.entries(s.experience.roles).filter(([title])=>/doctor/i.test(title)).reduce((n,[,y])=>n+y,0);if(years>=2){m.foundationComplete=true;m.independent=false;O.journal(s,'Your initial supervised medical training is completed','Two full-time-equivalent years of supervised medical work prepare you to apply for further clinical training. This does not make you a specialist or consultant; senior practice requires further supervised training and assessment.','work');}});
})(window.OL);
