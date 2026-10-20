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
const previousPassive=O.passive;
O.passive=s=>{previousPassive(s);if(s.status!=='alive')return;
 const t=s.flags?.auditLearning;if(!t||t.phase==='completed'||t.phase==='rejected')return;
 if(t.phase==='applied'&&s.age>=t.appliedAt+1){
  const admission=Math.max(.18,Math.min(.85,.34+s.knowledge/270+(s.strata-3)*.025));
  if(O.chance(s,admission)){t.phase='enrolled';t.startedAt=s.age;t.finishAt=s.age+t.duration;O.journal(s,'Admission confirmed',`You gain a place in ${t.name}. It will take time to complete, with attendance and assessment still ahead.`,'education');}
  else {t.phase='rejected';s.flags.auditEducationChoice=null;s.flags.auditEducationWaitUntil=s.age+1;O.journal(s,'An application is unsuccessful',`You are not admitted to ${t.name} this year. It is disappointing, but this does not erase the qualifications you already hold.`,'education');}
 }
 if(t.phase==='enrolled'&&s.age>=t.finishAt){const passing=Math.max(.23,Math.min(.86,.38+s.knowledge/230+(s.strata-3)*.014));t.phase='completed';t.passed=O.chance(s,passing);
  if(t.passed){let n=O.educationNumber(s.education);let level=t.route==='academic'?Math.max(n,2):Math.max(n,3);s.education=O.EDU[level];O.adjust(s,{knowledge:5,confidence:3});O.journal(s,'The qualification is completed',`After ${t.duration} years of study, you complete ${t.name}. It took sustained work; the result is not an automatic guarantee of a job.`,'education');}
  else O.journal(s,'Training ends without a qualification',`You finish your time on ${t.name} without the intended qualification. What you learned and the people you met may still matter later.`,'education');
 }
};
// Plain-language research disclosure, never claiming full validation.
const olderContext=O.contextForDecision;
O.contextForDecision=(s,ev)=>{
 const p=E[s.country.code];if(p&&ev?.id?.startsWith('evidence-school-'))return {text:`${p.education.join(' and ')} are real pathways. Admission chances in this story are fictional model assumptions.`,source:'National/UNESCO education overview',url:p.source};
 if(p&&ev?.id?.startsWith('evidence-work-'))return {text:'The listed job openings, salaries and application success are fictional examples. National GDP per capita is not a wage table.',source:'ILOSTAT — labour-market datasets',url:'https://ilostat.ilo.org/data/'};
 return olderContext?.(s,ev)||null;
};
})(window.OL);