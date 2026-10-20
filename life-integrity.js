/* Cross-system invariants, including repairs for older archived saves. */
(function(O){'use strict';
const originalEnsure=O.ensureClarity;
const researchCourse=s=>Object.values(s.routes?.active||{}).find(r=>r.id==='masters'&&r.stage==='studying'||r.id==='phd'&&r.stage==='research');
const schoolLabel=O.schoolLabel;O.schoolLabel=s=>{const r=researchCourse(s);return r?`${r.id==='masters'?'Master’s':'Doctoral research'} · ${r.subject} · Year ${s.age-r.started+1} · ${r.id==='masters'&&!r.workBefore?'alongside work':'full-time'}`:schoolLabel(s);};
const degreeApplication=O.applyForDegree;O.applyForDegree=function(s,id){if(researchCourse(s))return 'Resolve your current postgraduate commitment before beginning another degree.';if(!s.flags.chooseExistingSubject&&O.educationNumber(s.education)<2)return 'Your school qualification is not yet sufficient. Complete secondary education or an equivalency route before applying.';return degreeApplication(s,id);};
const subjectEvent=O.EVENTS.find(e=>e.id==='choose-degree-subject'),subjectOptions=subjectEvent.options;subjectEvent.options=s=>subjectOptions(s).map(o=>O.DEGREES.some(d=>d.name===o.label)&&!s.flags.chooseExistingSubject&&O.educationNumber(s.education)<2?{...o,disabled:true,detail:o.detail+' Secondary education or equivalency is required first.'}:o);
const jobSearch=O.startJobSearch;O.startJobSearch=(s,mode)=>{const r=researchCourse(s);return r&&(r.id==='phd'||r.workBefore)?{ok:false,message:'Complete or leave the current full-time research/course commitment before a new full-time job search.'}:jobSearch(s,mode);};
O.ensureClarity=function(s){
 originalEnsure(s);
 if(!s.flags.templateCooldownMigrated){
  for(const entry of s.journal||[]){if(entry.momentId){const key='template:'+entry.momentId;s.flags.momentHistory[key]=Math.max(s.flags.momentHistory[key]??-100,entry.age);}}
  s.flags.templateCooldownMigrated=true;
 }
 if(s.pending==='life-route-decision'&&!O.readyRoute(s))s.pending=null;
 return s;
};
const block=O.routeBlock;
O.routeBlock=function(s,d){
 const reason=block(s,d);if(reason)return reason;if(researchCourse(s)&&['overseas-work','military','seafaring','politics','vocation','business','family-enterprise'].includes(d.id))return 'Resolve the current postgraduate commitment first.';
 const activeStudy=['enrolled','funding-review','overseas-route'].includes(s.study?.status)&&s.study.mode==='full-time';
 if(activeStudy&&(d.exclusive==='rare-career'||['seafaring','politics','vocation','business','family-enterprise','masters','phd','faculty'].includes(d.id)))return 'Complete or pause your full-time course before committing to this work route.';
 if(['overseas-work','overseas-study','return-home'].includes(d.id)&&s.housing.kind==='owned')return 'Choose whether to sell or let your current home under Money & property before moving abroad.';
 if(d.id==='kpop'&&s.country.code!=='KR')return 'This agency-training route is currently available while living in South Korea.';
 return null;
};
// A move must not erase a secured liability or a property that is being let.
const move=O.moveCountry;
O.moveCountry=function(s,c,family){const mortgage=s.housing.rentalMortgage?s.housing.mortgage:null;move(s,c,family);if(mortgage){s.housing.mortgage=mortgage;s.housing.rentalMortgage=true;}if(s.memories.pet?.alive){s.memories.pet.residence=family?'Your household':'Previous household';}};
const candidates=O.momentCandidates;
O.momentCandidates=function(s){return candidates(s).filter(({d,p})=>{
 if(d.subject==='pet'&&p.residence==='Previous household')return false;
 if(p!==s&&p.country&&p.country!==s.country.code&&!/call|phone|message|remember|memory|grief|lost|distance/i.test(d.id+' '+d.body))return false;
 if(s.routes?.policies.monthsAway&&s.job==='Merchant seafarer'&&s.month<7&&(/home|school|pet|parent|partner|local/.test(d.id)||d.subject!=='self'))return false;
 return true;
});};
const storyAllowed=O.storyAllowed;
O.storyAllowed=function(s,item){if(item.dynamicMoment){const candidate=O.MOMENT_DEFS.find(d=>d.id===item.dynamicMoment),person=item.subjectId==='self'?s:item.subjectId==='pet'?s.memories.pet:s.people.find(p=>p.id===item.subjectId);if(person?.residence==='Previous household'&&candidate?.subject==='pet')return false;if(person!==s&&person?.country&&person.country!==s.country.code&&!/call|phone|message|remember|memory|grief|lost|distance/i.test(candidate?.id+' '+candidate?.body))return false;}return storyAllowed(s,item);};
// Older generic cards bypassed the persistent routes and left no actual destination or business.
for(const id of ['migration','start-business','recreation']){const event=O.EVENTS.find(e=>e.id===id);if(event)event.when=()=>false;}
const mentor=O.EVENTS.find(e=>e.id==='mentor');if(mentor){mentor.when=s=>s.age>=10&&(s.school||!!s.job)&&!s.people.some(p=>p.alive&&p.role==='Mentor');mentor.title=s=>s.school?'A teacher offers to guide your next project':`Guidance for your work as ${s.job.toLowerCase()}`;mentor.description=s=>s.school?'A teacher has noticed the questions you ask after class. They offer regular time to discuss a project and how you approach it.':`An experienced colleague near ${s.location.name} offers to review a difficult part of your ${s.job.toLowerCase()} work with you. This would take regular time from both of you.`;const options=mentor.options;mentor.options=s=>options(s).map((o,i)=>i?o:{...o,apply:st=>{const result=o.apply(st);const p=st.people.filter(p=>p.role==='Mentor').at(-1);if(p)p.job=st.school?'Teacher':`Experienced ${st.job.toLowerCase()}`;return 'You agree to meet regularly for guidance. The advice becomes part of your learning and a continuing relationship.';}});}
// A funding award is not a completed qualification or automatic university enrolment.
const scholarship=O.EVENTS.find(e=>e.id==='scholarship');if(scholarship){scholarship.min=18;scholarship.when=s=>s.study?.status==='enrolled'&&s.study.funding&&(s.study.grantRate||0)<.5&&s.study.grantTriedAt!==s.age;scholarship.title=s=>`${s.study.course}: a tuition-grant application`;scholarship.description=s=>`A tuition grant could reduce future fees for ${s.study.course}. Your current qualification is unchanged; this is a funding application for the course you already attend.`;scholarship.options=s=>[{label:'Apply for the tuition grant',detail:'A 50% future tuition award if successful; no degree or professional licence is granted by this application.',apply:st=>O.reviewUniversityFunding(st,'grant')},{label:'Keep the existing funding arrangement',detail:'No fee or qualification change.',apply:()=> 'You keep the current arrangement and concentrate on the course.'}];}
const openTraining=st=>{const pending=st.pending;st.pending=null;const result=O.startRoute(st,'vocational-field');st.pending=pending;return result.ok?'You decide to compare specific training fields. Admission, training and a later practical assessment come before a qualification.':result.message;};
for(const id of ['uk-apprenticeship','ghana-school-path']){const e=O.EVENTS.find(e=>e.id===id);if(!e)continue;const when=e.when,options=e.options;e.when=s=>when(s)&&!s.routes.active['vocational-field']&&O.educationNumber(s.education)<3&&!['enrolled','completed'].includes(s.study?.status);e.options=s=>options(s).map((o,i)=>i===(id==='uk-apprenticeship'?0:1)?{label:'Compare practical training fields',detail:'Choose a field, fund training and complete the assessment; no qualification is awarded immediately.',apply:openTraining}:o);}
const oldHousing=O.EVENTS.find(e=>e.id==='hongkong-housing-path');if(oldHousing)oldHousing.when=()=>false;
for(const e of O.EVENTS){if(e.id.startsWith('local-pathway-')){const when=e.when;e.when=s=>O.educationNumber(s.education)<3&&!['enrolled','completed','funding-review'].includes(s.study?.status)&&when(s);}const options=e.options;e.options=s=>options(s).map(o=>s.age<18&&/^(Start looking for paid work|Look for a better-paid role)$/.test(o.label)?{...o,disabled:true,detail:'This full-time search is available after the school-leaving decision. Training remains a separate route.'}:o);}
const clean=O.cleanLogText;O.cleanLogText=(s,text)=>clean(s,String(text??'').replace(/\bundefined(?=\s+[¤£$])/g,'Earlier unlabelled commitment'));
// Archive the previous animal before adopting another; default names vary, chosen names remain free.
const petEvent=O.EVENTS.find(e=>e.id==='pet-adoption');if(petEvent){const when=petEvent.when,options=petEvent.options;petEvent.when=s=>when(s)&&s.age>=(s.flags.petWaitUntil||0)&&(s.flags.petDeclines||0)<3;petEvent.options=s=>options(s).map((o,i)=>({...o,apply:st=>{const previous=st.memories.pet?JSON.parse(JSON.stringify(st.memories.pet)):null;const result=o.apply(st);if(i<2){if(previous)(st.memories.petsHistory??=[]).push(previous);const names=i===0?['Milo','Bella','Cleo','Nala','Toby']:['Luna','Max','Ruby','Oscar','Pip'];const taken=(st.memories.petsHistory||[]).map(p=>p.name);st.memories.pet.name=names.find(n=>!taken.includes(n))||names[0];st.memories.pet.id='pet-'+st.age+'-'+(st.memories.petsHistory?.length||0);st.memories.pet.residence='Your household';st.flags.petDeclines=0;}else{st.flags.petDeclines=(st.flags.petDeclines||0)+1;st.flags.petWaitUntil=st.age+(st.flags.petDeclines===1?6:10);}return result;}}));}
// Breaking up does not silently skip children's care or the pending family plan.
const crisis=O.EVENTS.find(e=>e.id==='relationship-strain-specific');if(crisis){const options=crisis.options;crisis.options=s=>options(s).map((o,i)=>i!==2?o:{...o,label:'Review separation, money and the children’s care',detail:'Open a separate decision about separation and practical care arrangements.',apply:st=>{st.flags.dynamics.lastRelationshipCrisis=st.age;const old=st.pending;st.pending=null;const result=O.startRoute(st,'separation');st.pending=old;return result.ok?'You decide to review separation and the practical arrangements before ending this partnership.':result.message;}});}
const apply=O.applyChoice;O.applyChoice=function(s,i){const was=s.pending;const result=apply(s,i);if(result&&was==='career-search-results'&&s.study?.status==='completed'&&O.DEGREES.find(d=>d.id===s.study.degreeId)?.jobs.test(s.job))s.flags.flow.graduateRole=s.job;return result;};
const searchHTML=O.searchHTML;O.searchHTML=s=>s.job==='Retired'?`<section class="search-actions"><h3>Work after retirement</h3><p>Returning to work is your choice. Compare a real offer before accepting.</p><button class="btn" data-action="search-work" data-mode="pay">Look for work again · Free</button></section>`:searchHTML(s);
O.lifeIssues=function(s){const issues=[];if(s.cash<0||!Number.isFinite(s.cash))issues.push('Invalid savings');if(s.debt<0||!Number.isFinite(s.debt))issues.push('Invalid debt');if(s.study?.status==='completed'&&s.school)issues.push('Completed degree still in school');if(s.study?.status==='enrolled'&&s.study.mode==='full-time'&&s.employment?.mode==='full-time'&&s.job)issues.push('Full-time work during full-time degree');if(s.housing.mortgage?.balance>s.debt+1)issues.push('Mortgage omitted from debt');if(s.people.filter(p=>p.alive&&p.role==='Partner').length>1)issues.push('Conflicting current partnerships');return issues;};
const finances=O.financesHTML;O.financesHTML=s=>finances(s).replace('</strong></div><div class="money-caption">',`</strong><span>Without your home: ${O.money(O.netWorth(s)-(s.housing.kind==='owned'?(s.housing.value||0)-(s.housing.mortgage?.balance||0):0))}</span></div><div class="money-caption">`);
O.VERSION='6.0.0';
})(window.OL);
