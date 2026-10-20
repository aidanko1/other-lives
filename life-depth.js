/* Other Lives v5.5: original contextual life threads and cautious education/work choices.
   Institutional labels are illustrative, and only the named systems below are used.
   No country/culture is assumed homogeneous. Fictional outcomes are not measured rates. */
(function(O){
'use strict';
O.VERSION='5.5.0';
// Generic jobs also obey minimum credential requirements. Profession-specific licensing
// and protected titles are not simulated in enough detail for direct random offers.
for(const j of O.JOBS){
 const min={Doctor:6,Nurse:4,Teacher:4,Engineer:4,Accountant:4,'Senior executive':4};
 if(Object.prototype.hasOwnProperty.call(min,j.title))j.edu=Math.max(j.edu,min[j.title]);
}
const originalGetJob=O.getJob;
O.getJob=function(s,education){const out=originalGetJob(s,education);if(out?.title==='Business owner'&&!s.flags?.ownsBusiness){return O.JOBS.find(j=>j.title==='Retail worker')||out;}return out;};

const SCHOOL={
GH:['BECE, senior high school and WASSCE routes','technical or vocational education'],NG:['junior and senior secondary school, WAEC/NECO examinations','technical college or apprenticeship'],KE:['secondary-school qualifications and subsequent college pathways','TVET colleges'],UG:['O-Level and A-Level examinations','technical or vocational institutes'],TZ:['secondary-school examinations','VETA and practical training'],RW:['lower and upper secondary education','TVET training'],ET:['secondary education and national school-leaving assessment','technical and vocational training'],ZA:['National Senior Certificate (matric)','TVET college programmes'],ZW:['O-Level and A-Level school routes','polytechnic or vocational study'],ZM:['school certificate pathways','skills or trade training'],SN:['secondary qualification routes','vocational institutes'],CI:['secondary examination routes','technical or vocational institutes'],
HK:['HKDSE, associate-degree and undergraduate admission routes','IVE or other vocational training'],CN:['senior secondary study and gaokao pathways','higher vocational colleges'],TW:['general senior high and university entrance pathways','technical and vocational colleges'],JP:['upper secondary school and university entrance exams','specialised professional training colleges'],KR:['CSAT (Suneung) and undergraduate routes','vocational high schools and technical colleges'],SG:['O-Level and A-Level or polytechnic pathways','ITE and polytechnic programmes'],MY:['SPM and post-secondary entry','technical and vocational training'],TH:['upper-secondary qualifications','vocational certificate and diploma routes'],VN:['upper-secondary school and university entry','vocational colleges'],PH:['Senior High School pathways','TESDA-accredited skills training'],ID:['senior secondary SMA programmes','SMK vocational secondary programmes'],
IN:['Class 10 and 12 board examination routes','ITI, polytechnic and apprenticeship routes'],PK:['SSC and HSSC examinations','technical and vocational training'],BD:['SSC and HSC examinations','polytechnic diploma and vocational training'],LK:['GCE O-Level and A-Level pathways','technical colleges'],NP:['Secondary Education Examination and Grade 12 routes','CTEVT training'],
GB:['GCSE and A-level, college or university pathways','apprenticeship or T Level routes (nation-dependent)'],IE:['Leaving Certificate and further education','apprenticeships'],FR:['baccalauréat pathways','CAP or vocational lycée training'],DE:['Abitur and higher education routes','dual vocational training (Ausbildung)'],AT:['Matura routes','dual apprenticeships'],CH:['cantonal upper-secondary routes','dual vocational education'],NL:['VMBO/HAVO/VWO pathways','MBO vocational education'],BE:['regional secondary qualifications','technical and vocational secondary pathways'],ES:['Bachillerato and EBAU-style access routes','Formación Profesional (FP)'],PT:['secondary qualifications','professional and technical courses'],IT:['Esame di Stato and university access','technical and professional institutes'],PL:['matura and university options','technical schools and trade education'],CZ:['maturita examinations','vocational secondary schools'],FI:['matriculation exam and higher education','vocational education and training'],SE:['gymnasieskola study programmes','vocational upper-secondary programmes'],NO:['general university-admissions certification','vocational programme and apprenticeship'],DK:['gymnasium programmes','vocational education and training'],GR:['Panhellenic examinations','vocational upper-secondary institutes'],
US:['high-school graduation, community college and university','career and technical education or apprenticeships'],CA:['provincial secondary diploma and college/university options','trades apprenticeship programmes'],AU:['senior secondary certificate and ATAR pathways','TAFE and apprenticeship routes'],NZ:['NCEA and tertiary study options','polytechnic and trades training'],BR:['ensino médio and ENEM routes','technical education programmes'],MX:['educación media superior','CONALEP/technical training routes'],AR:['secundaria and tertiary admission','technical secondary or vocational programmes'],CL:['enseñanza media and university admission','technical-professional training'],CO:['bachillerato and higher education','SENA training'],PE:['educación secundaria','institutos tecnológicos'],
TR:['LGS and YKS-related school and university routes','vocational high school'],IR:['secondary-school diploma and Konkur routes','technical or vocational training'],AE:['secondary qualifications and university pathways','technical and vocational study'],SA:['secondary graduation and university entrance routes','technical colleges'],IL:['Bagrut matriculation and higher education','vocational and technical programmes'],EG:['Thanaweya Amma and tertiary routes','technical secondary education'],MA:['baccalauréat pathways','vocational training institutes'],TN:['baccalauréat examinations','vocational education'],DZ:['baccalauréat','vocational training centres']
};
const REGION_SCHOOL={
'West Africa':['secondary schooling and locally available certificates','trade or technical learning'], 'Central Africa':['secondary school routes where accessible','technical or vocational learning'], 'East Africa':['secondary school and further-study options','technical and vocational training'], 'North Africa':['secondary school-leaving qualifications','vocational programmes'], 'Southern Africa':['secondary education and tertiary pathways','practical trade training'], 'South Asia':['secondary school-leaving examinations','technical or vocational programmes'], 'East Asia':['upper-secondary qualifications','specialised skills training'], 'Southeast Asia':['upper-secondary or tertiary admission routes','technical and vocational programmes'], 'Central Asia':['secondary school and college routes','vocational and technical education'], 'Middle East':['secondary school and tertiary routes','vocational training'], 'Western Europe':['upper-secondary qualifications and tertiary education','apprenticeship or vocational education'], 'Northern Europe':['upper-secondary qualification routes','technical/vocational study'], 'Eastern Europe':['secondary qualification and tertiary routes','technical or vocational programmes'], 'Southern Europe':['secondary schooling and university routes','professional training'], 'North America':['secondary school and post-secondary pathways','community or technical training'], 'Central America':['upper-secondary schooling','vocational learning'], 'South America':['secondary schooling and tertiary admission','technical programmes'], 'Caribbean':['secondary school and post-secondary routes','technical training'], 'Oceania':['senior secondary and tertiary admission','vocational and apprenticeships'], 'Pacific Islands':['available secondary education and regional further-study options','practical/vocational learning']
};
const JOBS={
'West Africa':['market-stall assistant','mobile phone repair trainee','community health aide','transport dispatcher','food trader','school support worker'],
'Central Africa':['retail assistant','small-enterprise bookkeeper','motorcycle mechanic trainee','food supply assistant','construction apprentice'],
'East Africa':['agricultural cooperative assistant','retail clerk','transport coordinator','community care worker','mobile-money agent'],
'North Africa':['small-business assistant','hospitality receptionist','technical workshop trainee','retail worker','administration clerk'],
'Southern Africa':['retail assistant','hospitality worker','care aide','technical trades apprentice','logistics clerk'],
'South Asia':['shop assistant','tailoring trainee','school administrator','electrician apprentice','food service worker','office support'],
'East Asia':['retail worker','logistics clerk','hospitality attendant','office assistant','electronics technician trainee','care assistant'],
'Southeast Asia':['market vendor','tourism assistant','warehouse clerk','retail associate','food service worker','technical apprentice'],
'Central Asia':['transport coordinator','retail clerk','administration assistant','construction apprentice'],
'Middle East':['retail clerk','hospitality worker','logistics assistant','office administrator','trades apprentice'],
'Eastern Europe':['warehouse clerk','factory technician trainee','retail worker','healthcare assistant','office administrator'],
'Southern Europe':['hospitality worker','electrician apprentice','retail worker','transport assistant','office administrator'],
'Northern Europe':['care assistant','retail associate','warehouse worker','IT support trainee','apprentice tradesperson'],
'Western Europe':['care assistant','retail associate','office administrator','electrician apprentice','hospitality worker'],
'North America':['retail associate','care aide','administrative assistant','IT support trainee','hospitality worker','apprentice tradesperson'],
'South America':['retail clerk','food service worker','repair technician trainee','community aide','transport worker'],
'Central America':['retail assistant','hospitality worker','agricultural supply clerk','mechanical trades apprentice'],
'Caribbean':['hospitality worker','retail clerk','community services assistant','small business assistant','fisheries support worker'],
'Oceania':['retail worker','care aide','trades apprentice','hospitality worker','administration assistant'],
'Pacific Islands':['community services assistant','fisheries support worker','retail assistant','small tourism worker']
};
const COUNTRY_JOBS={GH:['trotro station assistant','market stall worker','mobile-money kiosk trainee'],HK:['cha chaan teng worker','MTR station assistant','retail apprentice'],GB:['NHS healthcare assistant','café worker','apprentice electrician'],JP:['convenience store clerk','rail station attendant','elder-care assistant'],IN:['railway service assistant','small-scale retail clerk','electrical apprentice'],BD:['garment production trainee','retail clerk','rickshaw workshop apprentice'],NG:['retail trader','mobile-money agent','repair apprentice'],ET:['coffee cooperative assistant','retail worker','transport services aide'],US:['community college library aide','retail associate','care aide'],BR:['neighbourhood shop worker','service apprentice','public-transport clerk']};
const SOURCE_SCHOOL={GH:'https://www.ges.gov.gh/',GB:'https://www.gov.uk/browse/education',HK:'https://www.edb.gov.hk/',IN:'https://www.education.gov.in/',NG:'https://education.gov.ng/',JP:'https://www.mext.go.jp/en/',US:'https://nces.ed.gov/',BD:'https://moedu.gov.bd/',SG:'https://www.moe.gov.sg/',AU:'https://www.education.gov.au/'};
const profile=code=>O.CULTURAL_SNAPSHOT?.[code]||{};
const pathway=s=>SCHOOL[s.country.code]||REGION_SCHOOL[s.country.region]||['local secondary qualifications','vocational training'];
const hasEducation=s=>s.school||s.education!==O.EDU[0];
const hasSupport=s=>s.strata>=4;
function relevantSkill(s){let words=((s.interests||[]).join(' ')+' '+(s.flags?.personalThread||'')).toLowerCase();if(/music|sport|football|drawing|art/.test(words))return 'creative or community skills';if(/technology|comput|science/.test(words))return 'technical skills';if(/history|book|learn/.test(words))return 'reading and research';return 'practical skills';}
function jobRequirements(job){
 const label=job.toLowerCase();
 if(/engineer|registered nurse|doctor|dentist|lawyer|accountant|pharmacist|architect/.test(label))return {rank:4,name:'a university qualification'};
 if(/electric|mechanic|technician|apprentice|repair|ICT|computer|coding|technical/.test(label))return {rank:2,name:'secondary-school study or relevant practical training'};
 if(/civil service|civil servant|clerk|administrat|station assistant|library|healthcare assistant|care aide/.test(label))return {rank:1,name:'basic literacy, schooling and an interview'};
 return {rank:0,name:'entry-level skills and a vacancy'};
}
function skillMatch(s,job){
 const words=(`${(s.interests||[]).join(' ')} ${s.flags.personalThread||''}`).toLowerCase(),name=job.toLowerCase();
 return (/technolog|computer|science|repair/.test(words)&&/technician|repair|computer|technical|electric/.test(name))||
 (/sport|football|health|animals/.test(words)&&/healthcare|care aide|transport/.test(name))||
 (/book|read|history|learn/.test(words)&&/library|clerk|school|administrat/.test(name))||
 (/drawing|art|music/.test(words)&&/craft|shop|retail|market/.test(name));
}
const educationNeeded=job=>{
  if(/doctor|nurse|engineer|accountant|qualified teacher|finance executive|software developer|lawyer|pharmacist/i.test(job))return 4;
  if(/technician|civil servant|administrator|IT support|healthcare assistant|clinic aide|rail station attendant/i.test(job))return 2;
  return 0;
};
const roleSector=job=>/health|clinic|care|nurs/i.test(job)?'Care':/repair|mechanic|technical|electric|IT |computer|software/i.test(job)?'Technical':/office|finance|administrator|civil servant/i.test(job)?'Office':/farm|fish|agricultur/i.test(job)?'Agriculture':'Services';
function employmentChoices(s){
 const region=JOBS[s.country.region]||JOBS['Western Europe'], local=COUNTRY_JOBS[s.country.code]||[];
 const all=[...new Set([...local,...region])].filter(Boolean);
 const seed=(s.seed||1)+s.age*71+(s.flags?.careerAttempts||0)*113;
 return [0,2,4].map(d=>all[(seed+d)%all.length]);
}
function salaryEstimate(s,job,idx){
 const base=s.country.ppp||9000;
 const tier=/apprentice|trainee/i.test(job)?.32:/assistant|clerk|worker/i.test(job)?.48:/civil servant|technician|IT /i.test(job)?.84:.57;
 return Math.round(base*tier*(.90+idx*.09));
}
function qualified(s,job){
 const min=educationNeeded(job);
 return O.educationNumber(s.education)>=min;
}
function add(e){if(!O.EVENTS.some(x=>x.id===e.id))O.EVENTS.push(e)}
for(const c of O.COUNTRIES){
 const code=c.code;
 add({id:'local-pathway-'+code,min:14,max:21,category:`${c.name} · Education`,scene:'school',weight:48,
 when:s=>s.country.code===code&&!s.flags.localPathwayDecision&&s.age>=14,
 title:s=>`Choosing what comes after school in ${s.country.name}`,
 description:s=>`People around you describe routes including ${pathway(s)[0]} and ${pathway(s)[1]}. ${s.school?'Your school attendance and exam preparation affect what you can apply for.':'Years outside formal school limit entry to some programmes, but alternative study may still exist.'} ${s.strata<=2?'Your household is worried about fees, travel and lost income.':'Family support helps, but does not guarantee a place.'}`,
 options:s=>[
 {label:`Explore ${pathway(s)[0]}`,detail:s.school?'You can enquire about exams, admission and affordable places.':'Prior formal schooling may be needed; enquire about alternative entry routes.',apply:st=>{st.flags.localPathwayDecision=true;st.flags.educationTrack={route:'academic',name:pathway(st)[0],started:st.age,status:'enquiring',due:null,progress:0};O.adjust(st,{knowledge:3,stress:2});return `You start preparing for ${pathway(st)[0]}. No admission or qualification has yet been awarded.`}},
 {label:`Explore ${pathway(s)[1]}`,detail:'Consider practical courses, apprenticeships and placements, subject to local access.',apply:st=>{st.flags.localPathwayDecision=true;st.flags.educationTrack={route:'vocational',name:pathway(st)[1],started:st.age,status:'enquiring',due:null,progress:0};O.adjust(st,{knowledge:3,confidence:2});return `You enquire about ${pathway(st)[1]}. A place, qualifications and fees are not guaranteed.`}},
 {label:'Work or help at home for now',detail:'Support household needs; returning to study later may still be possible.',apply:st=>{st.flags.localPathwayDecision=true;st.flags.educationTrack={route:'work',name:'informal or entry-level work',started:st.age,due:null,progress:0};O.adjust(st,{relationships:2,stress:3});return 'You decide to prioritise household responsibilities and search for suitable paid work. No job is guaranteed.'}}
 ]});
 add({id:'local-career-'+code,min:18,max:58,category:`${c.name} · Work`,scene:'shop',weight:37,
 when:s=>s.country.code===code&&s.age>=18&&(!s.job||s.age>24)&&s.age<58,
 title:s=>s.job?'A chance to change jobs':'Choose from available job offers',
 description:s=>`Several employers in ${s.country.name} are willing to consider you. These fictional offers depend on your education, interests and work history. Earnings are modelled in international purchasing-power terms—not verified national salaries.`,
 options:s=>{
 const offers=employmentChoices(s);
 const list=offers.map((job,i)=>{
   const pay=salaryEstimate(s,job,i),need=educationNeeded(job),allowed=qualified(s,job);
   return {label:job[0].toUpperCase()+job.slice(1),
    detail:`Estimated annual earnings ${O.money(pay)} · ${roleSector(job)} sector · ${allowed?'Offer available':'Requires higher qualifications'}. Actual contract benefits vary.`,
    disabled:!allowed,
    apply:st=>{st.flags.careerAttempts=(st.flags.careerAttempts||0)+1;st.job=job;st.income=pay;st.unemployedYears=0;st.flags.workMemory={job,age:st.age,pay};O.adjust(st,{confidence:4,stress:2});return `You accept work as a ${job} in ${st.country.name}, with estimated annual earnings of ${O.money(pay)}. Travel and workplace responsibilities become part of your routine.`}
   };
 });
 return [...list,{label:s.job?'Stay in your current position':'Wait for a different offer',detail:'Keep searching; income or career progression may be delayed.',apply:st=>{st.flags.careerAttempts=(st.flags.careerAttempts||0)+1;O.adjust(st,{knowledge:1,stress:2});return st.job?`You keep your current role for now.`:'You continue searching and asking contacts about available work. No suitable contract is assured.'}}];
 }
 });
}
function payStudyFees(st,cost){const own=Math.min(Math.max(0,st.cash),cost);st.cash-=own;const remainder=cost-own;if(remainder>0&&st.strata>=5)st.familyCash=Math.max(0,(st.familyCash||0)-remainder);}
add({id:'postgraduate-crossroads',min:21,max:29,category:'Education · After graduation',scene:'school',weight:52,
 when:s=>O.educationNumber(s.education)>=4&&!s.flags.postgraduateChoice&&!s.flags.studying&&s.age>=21&&s.age<=29,
 title:s=>'After university graduation',
 description:s=>`You have completed undergraduate education in ${s.country.name}. You could enter the workforce, continue studying or explore a programme abroad. Your savings, family support, grades and available places constrain these options.`,
 options:s=>{
 const localCost=Math.round(s.country.ppp*.12);
 const abroadCost=Math.round(s.country.ppp*1.15);
 const available=Math.max(0,s.cash)+(s.strata>=5?Math.max(0,s.familyCash||0)*.13:0);
 return [
  {label:'Look for a graduate job',detail:'Use your qualifications to seek work. Applying does not guarantee an offer.',apply:st=>{st.flags.postgraduateChoice=true;st.flags.careerAttempts=0;O.adjust(st,{knowledge:1,confidence:1});return 'You begin applying for work related to your education, and await employer decisions.'}},
  {label:'Apply for postgraduate study nearby',detail:`Estimated first-year cost ${O.money(localCost)}. ${available<localCost?'Your current funds are insufficient.':'You may still need admission, funding and suitable grades.'}`,disabled:available<localCost,apply:st=>{st.flags.postgraduateChoice=true;st.flags.educationTrack={route:'postgraduate',name:'postgraduate study',started:st.age,status:'enquiring',due:null,progress:0};payStudyFees(st,localCost);O.adjust(st,{knowledge:3,stress:3});return 'You apply for postgraduate study and set aside money. Admission and eventual completion remain uncertain.'}},
  {label:'Explore a degree abroad',detail:`Estimated savings needed ${O.money(abroadCost)} for initial costs. ${available<abroadCost?'Out of reach financially for now.':'Visa, admission and housing are still uncertain.'}`,disabled:available<abroadCost,apply:st=>{st.flags.postgraduateChoice=true;payStudyFees(st,abroadCost);st.flags.educationTrack={route:'postgraduate',name:'study abroad',started:st.age,status:'enquiring',due:null,progress:0};O.adjust(st,{knowledge:4,stress:5});return 'You begin the lengthy application and relocation process. Finances help but are not a guarantee.'}}
 ];
 }});
O.registerAnnualStage('education-tracks',s=>{
 const earlierQualification=O.educationNumber(s.education);

 return ()=>{
 if(s.status!=='alive')return;
 // Qualifications are durable; progressing through a different route must not erase an earned degree.
 if(O.educationNumber(s.education)<earlierQualification)s.education=O.EDU[earlierQualification];
 const t=s.flags.educationTrack;
 if(!t||t.completed||t.route==='work')return;
 if(t.status==='enquiring'&&s.age>=t.started+1){
  const p=Math.min(.9,Math.max(.12,.22+(s.country.school||40)/175+(s.strata-3)*.022+(s.knowledge/600)-(t.route==='academic'&&!s.school?.13:0)));
  if(O.chance(s,p)){
   t.status='enrolled';t.admittedAt=s.age;t.due=t.route==='academic'?Math.max(s.age+1,O.schoolLeavingAge?.(s)||18):s.age+2;t.progress=0;s.school=true;
   O.journal(s,'A place to learn',`You are accepted onto a ${t.name} route. It will take several years to complete, and continued attendance, money and grades still matter.`,'education');
  }else{
   t.status='not_admitted';t.completed=true;t.passed=false;
   O.journal(s,'An education application does not work out',`The ${t.name} route is not available to you this year. Travel costs, requirements and competition may all be involved. You keep the qualifications you already have.`,'education');
  }
 }
 if(t.status==='enrolled'&&s.age>=t.admittedAt+1&&s.age<=t.due){
   if(s.school)t.progress=(t.progress||0)+1;
   if(s.age===t.admittedAt+1)O.journal(s,'Studying toward a qualification',`You attend ${t.name}. Lessons, assessments, travel and your household responsibilities all require effort.`,'education');
 }
 if(t.status==='enrolled'&&s.age>=t.due){
   t.completed=true;
   const p=Math.min(.9,.28+s.knowledge/220+s.strata*.017+(t.progress||0)*.035);
   t.passed=O.chance(s,p);
   if(t.passed){
     const existing=O.educationNumber(s.education);
     const achieved=t.route==='postgraduate'?5:t.route==='vocational'?3:2;
     if(achieved>existing)s.education=O.EDU[achieved];
     O.adjust(s,{knowledge:6,confidence:4});
     O.journal(s,'Training completed',`You complete ${t.name}. This achievement adds to your education history, but it does not guarantee admission elsewhere or employment.`,'education');
   }else O.journal(s,'Study interrupted',`Your ${t.name} programme ends without the intended qualification. You have gained experience but may need to apply again or follow another route.`,'education');
 }
 };
});
const priorApplyChoice=O.applyChoice;
O.applyChoice=function(s,index){
 const qualificationBefore=O.educationNumber(s.education);
 const result=priorApplyChoice(s,index);
 if(O.educationNumber(s.education)<qualificationBefore)s.education=O.EDU[qualificationBefore];
 return result;
};
const prevStories=O.pickStories;
O.pickStories=function(s,n){let items=prevStories(s,n);if(!n||!items?.length)return items;
 const t=s.flags.educationTrack, job=s.flags.workMemory, food=s.flags.culturalMeal, p=profile(s.country.code), oldFood=food||O.FOOD_EXAMPLES?.[s.country.code]?.[0];
 let special=null;
 if(t&&t.started<s.age&&s.age<=t.started+3&&s.age>=15&&O.chance(s,.39))special={title:'The route you chose',description:`You think again about ${t.name}. Your choice at ${t.started} changed which classmates, teachers or employers you meet, but passing exams and finding suitable work are still uncertain.`,scene:'school',effect:'thread-education'};
 else if(job&&s.age-job.age>=2&&s.age-job.age<=11&&O.chance(s,.25))special={title:'The first days of a job',description:`You still remember your first weeks as a ${job.job}. You notice how the commute, workmates and responsibilities gradually became part of everyday life in ${s.country.name}.`,scene:'shop',effect:'thread-work'};
 else if(oldFood&&s.age>=15&&O.chance(s,.23))special={title:'A meal that takes you back',description:`A familiar ${oldFood} meal brings back the sound of home, the people who used to eat with you and the everyday routines of growing up in ${s.country.name}. You remember the feelings more clearly than the prices.`,scene:'home',effect:'thread-food'};
 else if(s.age>=12&&s.age<=30&&s.flags?.favouriteTeacher&&O.chance(s,.21))special={title:'A teacher you have not forgotten',description:`Something about ${s.flags.favouriteTeacher}'s encouragement comes back to you. You think of what you enjoyed at school and whether you still make room for it.`,scene:'school',effect:'thread-teacher'};
 if(special)items[Math.min(items.length-1,Math.floor(O.rand(s)*items.length))]=special;
 return items;
};
const prevJournalContext=O.contextForJournal;
O.contextForJournal=function(s,e){const former=prevJournalContext?.(s,e);if(former)return former;if(!e)return null;
 const title=String(e.title||'').toLowerCase(),fact=profile(s.country.code),hint=SOURCE_SCHOOL[s.country.code];
 if(hint&&/choos|qualification|stud(y|ies)|pathway|course completed|route you chose/.test(title))return {text:`The school and training labels here are examples of pathways in ${s.country.name}, not a promise of admission or an estimate of individual success. Requirements vary between institutions and years.`,source:'National education information',url:hint};

 return null;
};
O.LIFE_DEPTH={school:code=>SCHOOL[code]||null,jobChoices:employmentChoices,hasCountry:code=>O.COUNTRIES.some(c=>c.code===code),getContext:s=>({school:pathway(s),tradition:profile(s.country.code).name,foods:O.FOOD_EXAMPLES?.[s.country.code]||[],work:employmentChoices(s)})};
})(window.OL);
