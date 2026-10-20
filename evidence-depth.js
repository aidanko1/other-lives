/* Other Lives v5.6 — 2024 fixed-evidence countries, original life simulation content.
 * Evidence anchors: UNICEF/UN IGME q5 (2024), WB/WPP life expectancy (2024),
 * national education institutions. All transitions, individual risks, job pays and
 * cultural participation are explicitly model assumptions, NOT empirical probabilities.
 * Repository AUDIT_V56.md provides one-to-one sources and limits.
 */
(function(O){
'use strict';
O.VERSION='5.6.0';
const wb='https://data.worldbank.org/indicator/SP.DYN.LE00.IN';
const un=code=>`https://data.unicef.org/country/${code}/`;
const U=(code,q5,life,education,source,food,transport,occupations,tradition)=>({code,q5,life,education,source,food,transport,occupations,tradition,mortalityURL:code==='HK'?null:un(({GB:'gbr',GH:'gha',NG:'nga',ET:'eth',BD:'bgd',IN:'ind',IR:'irn',US:'usa',JP:'jpn',PK:'pak',PL:'pol'})[code]),lifeURL:wb});
const E={
GH:U('GH',35.9,66,['BECE → senior high/WASSCE','Technical/vocational training'], 'https://www.uis.unesco.org/en/data/sdg4-country-profiles', ['waakye','banku','jollof rice'],['shared transport','walking or bicycle','local buses'],['market retail','mobile-phone repair','healthcare support','agri-supply assistant','transport services','teaching support'], 'seasonal community celebrations'),
NG:U('NG',115.6,55,['Junior secondary BECE → senior secondary/WAEC','Technical college or apprenticeship'],'https://neco.gov.ng/exams/bece',['jollof rice','egusi soup','yam and stew'],['bus','shared taxi','walking'],['market trading','transport dispatch','software support','tailoring','logistics','public administration'], 'community celebrations vary by region'),
ET:U('ET',44.5,68,['Upper secondary / school-leaving assessments','Technical and vocational education'], 'https://www.uis.unesco.org/en/data/sdg4-country-profiles',['injera','shiro','bread and tea'],['walking','buses','shared vehicles'],['small-scale trade','agricultural co-operative','clinic assistant','transport services','administrative clerk','repair workshop'], 'community religious and seasonal occasions'),
BD:U('BD',30.5,75,['SSC → HSC','BTEB technical diploma / vocational routes'],'https://btebadmission.gov.bd/',['rice and dal','khichuri','fish curry'],['bus','rickshaw','walking'],['textiles','repair technician','retail clerk','teaching support','logistics','agriculture extension'], 'Pohela Boishakh or other community events'),
IN:U('IN',26.6,72,['Class 10 and 12 board examinations','ITI or polytechnic route'], 'https://www.uis.unesco.org/en/data/sdg4-country-profiles',['rice and dal','roti and vegetable curry','regional street snacks'],['local buses','rail','walking'],['retail','electrical apprenticeship','IT support','community healthcare','teacher assistant','logistics'], 'festivals differ by region, belief and family'),
GB:U('GB',4.7,81,['GCSE → A levels / further education','Apprenticeship or T Level (England)'],'https://www.gov.uk/government/publications/introduction-of-t-levels/introduction-of-t-levels',['sandwich lunch','roast dinner','curry from a local takeaway'],['bus or train','walking','car'],['care work','electrician apprenticeship','hospitality','office support','warehouse logistics','IT support'], 'community celebrations depend on family background'),
IR:U('IR',11.3,78,['Upper-secondary diploma → university entrance','Vocational or technical study'],'https://www.uis.unesco.org/en/data/sdg4-country-profiles',['rice and stew','ash reshteh','flatbread'],['metro or bus','walking','shared taxi'],['trade','technical apprentice','retail','laboratory assistant','office support','transport'], 'Nowruz for participating households'),
US:U('US',6.5,79,['High-school diploma → community college/university','Registered apprenticeship or CTE'],'https://www.apprenticeship.gov/educators/apprenticeship-for-young-people',['school lunch','home-cooked dinner','local diner meal'],['school bus','car','public transit'],['healthcare aide','IT support','retail associate','licensed trades apprentice','office clerk','food services'], 'Thanksgiving or community events depending on household'),
JP:U('JP',2.4,84,['Lower/upper secondary → university exams','Senmon-gakko or kosen route'],'https://www.mext.go.jp/en/policy/education/overview/',['rice and miso soup','onigiri','noodles'],['rail','walking','bicycle'],['service retail','factory quality assistant','eldercare support','office administration','electronics trainee','logistics'], 'New Year or local matsuri in participating communities'),
PK:U('PK',56.0,68,['SSC → HSSC','TVET / apprenticeship'],'https://www.uis.unesco.org/en/data/sdg4-country-profiles',['chapati and dal','biryani','rice and curry'],['bus','rickshaw','walking'],['small trade','technical trades','retail','transport services','IT support','school administration'], 'Eid celebrations or other household occasions'),
PL:U('PL',4.2,78,['General secondary → matura','Technical secondary/branżowa route'],'https://www.uis.unesco.org/en/data/sdg4-country-profiles',['pierogi','soup and bread','regional family cooking'],['bus','rail','walking'],['care services','retail','transport logistics','factory technician','IT support','trade apprentice'], 'family and community holidays vary'),
HK:U('HK',null,85,['HKDSE → JUPAS / E-APP','VTC/IVE higher diploma or vocational programme'],'https://www.eapp.gov.hk/en/',['congee','rice with two dishes','noodles'],['MTR','bus','walking'],['retail','logistics','care assistant','IT support','office clerk','food services'], 'Lunar New Year or other celebrations where observed')
};
E.HK.infantRate2023=1.6;E.HK.infantSource='https://www.dh.gov.hk/english/statistics/statistics_hs/files/2024.pdf';
O.EVIDENCE_DEPTH={countries:E,referenceYear:2024,sourceIndex:'AUDIT_V56.md',quality:'partial — national mortality/life anchors and education pathway labels only'};
// Strict researched-country selection is the DEFAULT. Legacy archives retain their country data
// and are not deleted, but unsupported locations are no longer offered for new births.
const countryBefore=O.COUNTRIES.length;
O.COUNTRIES=O.COUNTRIES.filter(c=>!!E[c.code]);
O.EVIDENCE_DEPTH.previouslyOffered=countryBefore;
const originalEvidence=O.countryEvidence;
O.countryEvidence=s=>{const p=E[s.country.code],former=originalEvidence(s);if(!p)return former;
 return {...former,under5:p.q5,life:p.life,under5Source:p.mortalityURL,lifeSource:p.lifeURL,quality:p.q5!==null?'partial_empirical':'partial_non_q5'};
};
// Establish deterministic national all-household mortality benchmarks using UNICEF q5.
// Unlike a personal death-risk estimate, this is an unconditional population target.
O.evidenceChildSurvival=code=>{const p=E[code];return p?.q5===null||!p?null:1-p.q5/1000;};
const oldHazard=O.hazardAt;
O.hazardAt=(c,age)=>{const p=E[c.code];if(!p)return oldHazard(c,age);
 if(c.code==='HK'&&age===1)return 1.6/1000; // HKSAR Department of Health: 2023 infant mortality, 2024 edition
 if(p.q5===null||age>5)return oldHazard(c,age);
 const q5=p.q5/1000,prior=O.SOURCE_MODEL?.childMortality2024?.[c.code];
 const q1=prior?.[1]!=null?prior[1]/1000:q5*.7;
 return age<=1?q1:1-Math.pow((1-q5)/(1-q1),1/4);
};
const oldCreate=O.create;
O.create=(settings={})=>{
 const safeSettings={...settings};if(safeSettings.country&&safeSettings.country!=='random'&&!E[safeSettings.country])safeSettings.country='random';
 const s=oldCreate(safeSettings);
 s.flags=s.flags||{};
 const p=E[s.country.code];if(p){s.flags.auditBirthProfile={country:s.country.code,year:2024,dataBased:['life_expectancy',...(p.q5===null?[]:['under5'])],modelled:['wages','family_resources','school_transition','cultural_participation']};s.flags.localOrigin=s.urban?'an urban district':'a rural community';s.flags.evidenceMealMemory=O.pick(s,p.food);s.flags.evidenceTravelMemory=O.pick(s,p.transport);}
 return s;
};
// Guard adult responsibilities in pre-teen decision cards, without erasing past archives.
const legacySuperseded=new Set(['ghana-school-path','uk-apprenticeship','nigeria-schooling','india-exam-path','exam-years','adult-crossroads','scholarship','job-offer','named-job-offer']);
const childForbidden=/(mortgage|invest(ment|ing)?|bank loan|graduate school|paid coaching|manage household savings|sign a contract|career planning|entrepreneurial finance|credit card)/i;
for(const e of O.EVENTS){const previousWhen=e.when;
 e.when=s=>{
  if(E[s.country?.code]&&(legacySuperseded.has(e.id)||/^local-(pathway|career|job-choice)-/.test(e.id)||/^world-(education|mobility)-choice-/.test(e.id)))return false;
  if(s.age<12){let heading='';try{heading=String(e.title?.(s)||'')}catch{};if(childForbidden.test(heading))return false;}
  return previousWhen?previousWhen(s):true;
 };
}
const originalJournal=O.journal;
O.journal=(s,title,description,type)=>{
 const clean=t=>String(t??'').replace(/\b(?:Mom|Dad|Mother|Father|Parent|Friend|Partner|Child)\s*\([^)]{1,120}\)/gi,x=>x.split(' ')[0]);
 return originalJournal(s,clean(title),clean(description),type);
};
// New pathway decisions require first applying, then admission, then sustained attendance.
const ages={GH:15,NG:15,ET:15,BD:15,IN:16,GB:16,IR:16,US:17,JP:16,PK:16,PL:16,HK:16};
const waitingPaths={};
for(const p of Object.values(E)){
 const c=O.COUNTRIES.find(x=>x.code===p.code);if(!c)continue;
 const age=ages[p.code];
 const id=`evidence-school-${p.code}`;
 const e={id,min:age,max:age+3,weight:45,category:`${c.name} · Education`,scene:'school',
 when:s=>s.country.code===p.code&&!s.flags.auditEducationChoice&&(!s.flags.auditEducationWaitUntil||s.age>=s.flags.auditEducationWaitUntil)&&s.age>=age&&s.age<=age+3,
 title:s=>'Which education route feels possible?',
 description:s=>`Your schooling is reaching a turning point in ${c.name}. ${p.education.join(' or ')} are among the possible routes, but places, grades, transport and fees depend on your circumstances. Your household's resources shape your options without fully determining your future.`,
 options:s=>[
 {label:`Investigate ${p.education[0]}`,detail:'Ask about the requirements and places. This does not award a qualification.',apply:st=>start(st,'academic',p.education[0],3)},
 {label:`Investigate ${p.education[1]}`,detail:'Explore vocational study and practical training; availability varies locally.',apply:st=>start(st,'vocational',p.education[1],2)},
 {label:'Take time to support the household and reconsider',detail:'Household responsibilities come first for now; later study may remain possible.',apply:st=>{st.flags.auditEducationChoice=null;st.flags.auditEducationWaitUntil=st.age+1;O.adjust(st,{relationships:2,stress:2});return 'You discuss your options with family and postpone a formal application. You do not suddenly obtain a job or a qualification.'}}
 ]};
 function start(st,route,name,duration){st.flags.auditEducationChoice='applied';st.flags.auditLearning={route,name,appliedAt:st.age,phase:'applied',duration};O.adjust(st,{stress:1,knowledge:1});return `You enquire about ${name} and begin an application. Eligibility, transport, fees and places still need to be resolved.`;}
 O.EVENTS.push(e);
 const jobs=p.occupations;
 const stableInt=(seed,age,offset)=>{const key=`${seed}|${p.code}|${age}|${offset}`;let h=2166136261;for(let k=0;k<key.length;k++)h=Math.imul(h^key.charCodeAt(k),16777619);return h>>>0;};
 O.EVENTS.push({id:`evidence-work-${p.code}`,min:18,max:60,weight:31,category:`${c.name} · Employment`,scene:'shop',
 when:s=>s.country.code===p.code&&!s.flags.auditWorkRecently&&s.age>=18&&s.age<=60&&(!s.job||s.unemployedYears>0||s.age%7===0),
 title:s=>'A few possible work opportunities',
 description:s=>`You look at occupations that exist in ${c.name}, rather than receiving a job simply because you have turned eighteen. Your schooling, interests, location and household needs matter. The jobs below are fictional openings; their pay is not a verified national wage.`,
 options:s=>{
  const education=O.educationNumber(s.education),selection=[];
  const interests=(s.interests||[]).join(' ').toLowerCase();
  const suitable=jobs.map((job,idx)=>({job,idx,fit:/(technical|repair|electric|software|it |electronics|factory|logistic)/i.test(job)&&/(craft|technology|science|comput)/i.test(interests)?3:/(care|health|teaching|school)/i.test(job)&&/(community|learning|people)/i.test(interests)?3:/(market|trade|retail|commerce)/i.test(job)&&/(commerce|business|social)/i.test(interests)?3:0})).sort((a,b)=>b.fit-a.fit||((a.idx+stableInt(s.seed,s.age,1))%jobs.length)-((b.idx+stableInt(s.seed,s.age,1))%jobs.length));
  const start=stableInt(s.seed,s.age,1)%jobs.length;
  for(let i=0;i<3;i++){
   const idx=suitable[i].idx,job=jobs[idx],high=/healthcare|IT support|teacher|laboratory|public administration|technician|software/i.test(job);
   const allowed=!high||education>=3;
   const tier=high?1.2:0.75;
   const pay=Math.round((s.country.ppp||8000)*(tier+.06*Math.max(0,education-2)));
   selection.push({label:job[0].toUpperCase()+job.slice(1),detail:`Illustrative annual income: ${O.money(pay)} in purchasing-power terms · ${allowed?'Experience and credentials will matter':'Training or qualifications required'}.`,disabled:!allowed,apply:st=>{st.flags.auditWorkRecently=st.age;st.flags.auditJob={title:job,started:st.age,modelledPay:pay};st.job=job;st.income=pay;st.unemployedYears=0;O.adjust(st,{confidence:3,stress:1});return `You accept a fictional offer in ${job}. The commute, colleagues and regular pay now affect life at home.`}});
  }
  selection.push({label:s.job?'Keep your current work':'Keep searching',detail:'There may be other opportunities in the future.',apply:st=>{st.flags.auditWorkRecently=st.age;O.adjust(st,{stress:1});return 'You decide not to take these opportunities just yet.'}});
  return selection;
 }});
 // Further education begins only after an actual earlier qualification, not on a birthday.
 // This is an APPLICATION, with uncertainty at admission and completion stages.
 O.EVENTS.push({id:`evidence-next-education-${p.code}`,min:18,max:34,weight:28,category:`${c.name} · Further education`,scene:'school',
  when:s=>s.country.code===p.code&&s.age>=18&&s.age<=34&&O.educationNumber(s.education)>=2&&O.educationNumber(s.education)<4&&
   (!s.flags.auditLearning||['completed','rejected'].includes(s.flags.auditLearning.phase))&&
   (!s.flags.auditNextStudyUntil||s.age>=s.flags.auditNextStudyUntil)&&!s.flags.auditHigherCompleted,
  title:()=> 'A possible next qualification',
  description:s=>`You have finished part of your education, but moving on is a separate choice. Entry requirements, time, fees and available institutions differ across ${c.name}. Your interests and finances matter; nothing is guaranteed.`,
  options:s=>{
   const funds=Math.max(0,s.cash||0)+(s.strata>=5?Math.max(0,s.familyCash||0)*.15:0);
   const cost=Math.max(60,Math.round(s.country.ppp*.08));
   const afford=funds>=cost;
   const route=(label,kind,name,length)=>({label,detail:`Illustrative initial expenses: ${O.money(cost)}. ${afford?'You can enquire and apply; admission is uncertain.':'Not enough accessible funds at present.'}`,disabled:!afford,
    apply:st=>{st.flags.auditLearning={route:kind,name,appliedAt:st.age,phase:'applied',duration:length,fee:cost,level:kind==='degree'?4:3};st.flags.auditNextStudyUntil=st.age+1;
     let remaining=cost;let personal=Math.min(Math.max(0,st.cash||0),remaining);st.cash-=personal;remaining-=personal;if(remaining>0)st.familyCash=Math.max(0,(st.familyCash||0)-remaining);
     O.adjust(st,{stress:2,knowledge:1});return `You apply for ${name} and budget for the application process. An offer of admission and graduation are both uncertain.`}});
   const name=s.country.code==='HK'?'a recognised post-secondary programme':s.country.code==='US'?'a college degree programme':s.country.code==='JP'?'a university programme':'a higher-education programme';
   const opts=[route('Apply to a degree programme','degree',name,4),route('Apply to advanced vocational study','advanced-vocational',p.education[1],2),
    {label:'Look for grants or sponsored study',detail:'Search for financial support; winning a grant is uncertain.',apply:st=>{st.flags.auditNextStudyUntil=st.age+1;const eligible=O.chance(st,Math.max(.04,Math.min(.55,.16+st.knowledge/440+(st.strata<=2?.05:0))));if(eligible){st.flags.auditStudyGrant=Math.round(cost*.85);O.adjust(st,{happiness:3,knowledge:1});return 'A limited education grant becomes available. You can reconsider your programme choices in a later year.'}return 'No suitable award is secured this year. You can pursue other options while you search.'}},
    {label:'Work or take more time',detail:'Focus on current responsibilities; later study may still be possible.',apply:st=>{st.flags.auditNextStudyUntil=st.age+2;O.adjust(st,{relationships:1});return 'You defer further study and concentrate on your other responsibilities.'}}
   ];
   if(s.flags.auditStudyGrant>0){for(const x of opts.slice(0,2)){x.disabled=false;x.detail+=` You have a previously awarded model grant of ${O.money(s.flags.auditStudyGrant)}.`;const orig=x.apply;x.apply=st=>{st.cash=(st.cash||0)+st.flags.auditStudyGrant;st.flags.auditStudyGrant=0;return orig(st)}}}
   return opts;
  }
 });
 // Annually recurring small, observable culture, school, family and transport experiences.
 const anchors=p.food.concat(p.transport);
 O.STORIES.push({id:`evidence-everyday-${p.code}`,min:4,max:95,weight:16,category:`${c.name} · Everyday life`,scene:'home',
 when:s=>s.country.code===p.code,
 title:'The details of everyday life',
 body:s=>{
  const meal=s.flags.evidenceMealMemory||p.food[0],transport=s.flags.evidenceTravelMemory||p.transport[0];
  if(s.age<12)return `A familiar ${meal} meal and the journey by ${transport} are part of your day. Your family has its own habits, not all households in ${c.name} eat or travel in the same way.`;
  if(s.age<18)return `Between ${s.school?'lessons':'work at home and local learning'}, household chores and friends, you notice ${meal} being prepared and hear adults discussing the cost of getting around by ${transport}. No one asks you to solve the family's finances.`;
  if(s.age<55)return `You pass a place where someone is preparing ${meal}, a taste you remember from growing up. You think about getting home by ${transport}${s.flags.auditJob?`, and your work in ${s.flags.auditJob.title}`:''}. Family routines have changed, even when the familiar smells have not.`;
  return `A familiar smell of ${meal} brings back an ordinary day from long ago. You remember the journeys by ${transport}, the people who shared meals with you, and ${s.flags.auditLearning?.passed?'the pride of finishing a difficult course':'the opportunities that sometimes passed you by'}.`;
 },effect:()=>{}});
}
// Research-preview original scenes: possibilities grounded in local circumstances,
// not fixed cultural traits. Household participation, location, means and school access
// determine what the character actually experiences.
const COMMUNITY_SCENES={
 GH:{title:'A conversation after school',city:'On a shared minibus journey, you hear older students compare school transport costs and exams.',rural:'On the way back from an errand, someone explains why the next school is much further away.',after:'Years later, a roadside conversation reminds you of the people who helped you stay curious.'},
 NG:{title:'Learning beyond the classroom',city:'A repair workshop near your route attracts your attention. Someone lets you watch for a moment.',rural:'A neighbour shows you how to repair something that would have been costly to replace.',after:'Passing a repair stall reminds you of that early lesson in patience and finding practical solutions.'},
 ET:{title:'Rain and plans for tomorrow',city:'Rain slows buses and errands. You help plan the next day around travel and household priorities.',rural:'You listen as neighbours discuss rainfall and which household tasks cannot wait.',after:'A heavy afternoon shower brings back memories of coordinating small jobs at home.'},
 BD:{title:'A journey interrupted by rain',city:'A sudden shower makes the route home slower, and someone offers you a dry place to wait.',rural:'Rain changes the route to a relative or school. Your family decides which journey can wait.',after:'The sound of rain returns you to an afternoon spent waiting for the road to clear.'},
 IN:{title:'A different route for a classmate',city:'You and a classmate compare very different school journeys, exam subjects and what each family can afford.',rural:'A classmate travels further for lessons; you notice how distance shapes their school day.',after:'You remember a classmate whose daily journey took far more effort than yours.'},
 GB:{title:'A different path after school',city:'A teacher mentions college, sixth form and apprenticeships. Not everyone wants the same path.',rural:'Travel to college or an apprenticeship becomes a family discussion: distance can be an expense.',after:'A passing remark about training takes you back to the teacher who widened your idea of a future.'},
 IR:{title:'A household prepares for a visit',city:'A neighbour brings something for a gathering. Your family discusses whether to join and what it can contribute.',rural:'Relatives discuss a visit and the travel needed. Participating is a family choice, not an obligation.',after:'A familiar greeting reminds you of a gathering that was less about ceremony than the people there.'},
 US:{title:'Different school opportunities',city:'You discover that two nearby schools have different activities and after-school resources.',rural:'A long school-bus journey makes you notice how geography shapes a pupil’s day.',after:'A conversation about school transport recalls the long mornings and people who shared them.'},
 JP:{title:'After-school responsibilities',city:'On the way home, classmates talk about clubs and after-school activities. You weigh your own time and household needs.',rural:'You hear classmates comparing routes and travel time to clubs or activities.',after:'Seeing students head home brings back the decisions you made about how to spend time after class.'},
 PK:{title:'An afternoon of errands',city:'You notice how market errands, transport costs and a busy school day must fit together.',rural:'Your family times an errand around travel and chores, and you learn to plan ahead.',after:'A familiar sound from a market takes you back to ordinary errands and the people who accompanied you.'},
 PL:{title:'School and a change of seasons',city:'A cold commute brings classmates into conversation about exams and technical-school possibilities.',rural:'A longer trip to school makes winter travel and schedule changes matter.',after:'The start of colder weather reminds you of travelling to school and what classmates hoped to do.'},
 HK:{title:'A city journey between classes',city:'On a train or bus ride, you hear students debating subjects, after-school activities and crowded schedules.',rural:'A journey from a less central district takes time; your family talks about commuting and school options.',after:'A busy station reminds you of the daily journeys and conversations that shaped your school years.'}
};
for(const [code,info] of Object.entries(COMMUNITY_SCENES)){
 O.STORIES.push({id:`audit-community-${code}`,min:8,max:17,weight:22,category:`${code} · Community`,scene:'city',
  when:st=>st.country.code===code,
  title:info.title,
  body:st=>`${st.urban?info.city:info.rural} ${st.school?'You think about what this means for your own learning.':'You wonder what opportunities would exist if school were easier to reach.'}`,
  effect:st=>{st.flags.auditCommunityMemory={description:st.urban?info.city:info.rural,at:st.age};O.adjust(st,{knowledge:1})}
 });
 O.STORIES.push({id:`audit-remembers-${code}`,min:23,max:78,weight:9,category:`${code} · Reflection`,scene:'city',
  when:st=>st.country.code===code&&!!st.flags?.auditCommunityMemory,
  title:'A memory from growing up',
  body:st=>`${info.after} You were ${st.flags.auditCommunityMemory.at} then. Now, ${st.job?`your work as a ${st.job} gives the memory a different meaning`:'you are still making choices about where your life will go'}.`,
  effect:st=>O.adjust(st,{happiness:1})
 });
}
const previousPassive=O.passive;
O.passive=s=>{previousPassive(s);if(s.status!=='alive')return;
 const t=s.flags?.auditLearning;if(!t||t.phase==='completed'||t.phase==='rejected')return;
 if(t.phase==='applied'&&s.age>=t.appliedAt+1){
  const admission=Math.max(.18,Math.min(.85,.34+s.knowledge/270+(s.strata-3)*.025));
  if(O.chance(s,admission)){t.phase='enrolled';t.startedAt=s.age;t.finishAt=s.age+t.duration;O.journal(s,'Admission confirmed',`You gain a place in ${t.name}. It will take time to complete, with attendance and assessment still ahead.`,'education');}
  else {t.phase='rejected';s.flags.auditEducationChoice=null;s.flags.auditEducationWaitUntil=s.age+1;O.journal(s,'An application is unsuccessful',`You are not admitted to ${t.name} this year. It is disappointing, but this does not erase the qualifications you already hold.`,'education');}
 }
 if(t.phase==='enrolled'&&s.age>=t.finishAt){const passing=Math.max(.23,Math.min(.86,.38+s.knowledge/230+(s.strata-3)*.014));t.phase='completed';t.passed=O.chance(s,passing);if(t.level>=4&&t.passed)s.flags.auditHigherCompleted=true;
  if(t.passed){let n=O.educationNumber(s.education);let level=t.level?Math.max(n,t.level):t.route==='academic'?Math.max(n,2):Math.max(n,3);s.education=O.EDU[level];O.adjust(s,{knowledge:5,confidence:3});O.journal(s,'The qualification is completed',`After ${t.duration} years of study, you complete ${t.name}. It took sustained work; the result is not an automatic guarantee of a job.`,'education');}
  else O.journal(s,'Training ends without a qualification',`You finish your time on ${t.name} without the intended qualification. What you learned and the people you met may still matter later.`,'education');
 }
};
// Plain-language research disclosure, never claiming full validation.
const olderContext=O.contextForDecision;
O.contextForDecision=(s,ev)=>{
 const p=E[s.country.code];if(p&&ev?.id?.startsWith('evidence-school-'))return {text:`${p.education.join(' and ')} are real pathways. Admission chances in this story are fictional model assumptions.`,source:'National/UNESCO education overview',url:p.source};
 if(p&&ev?.id?.startsWith('evidence-next-education-'))return {text:`${p.education.join(' and ')} are real education pathways, but programme fees, availability and odds of admission are modelled.`,source:'National/UNESCO education overview',url:p.source};
 if(p&&ev?.id?.startsWith('evidence-work-'))return {text:'The listed job openings, salaries and application success are fictional examples. National GDP per capita is not a wage table.',source:'ILOSTAT — labour-market datasets',url:'https://ilostat.ilo.org/data/'};
 return olderContext?.(s,ev)||null;
};
})(window.OL);