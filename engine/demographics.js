
/* OTHER LIVES v3: sourced childhood mortality targets + calibrated illustrative adult curve.
   National indicators are targets, NOT person-level event probabilities.
   Populations/countries without empirical q5 inputs retain explicitly marked proxies. */
(function(O){
'use strict';
O.VERSION='3.0.0';
const sourceUnicef=code=>`https://data.unicef.org/country/${({GH:'gha',NG:'nga',ET:'eth',BD:'bgd',IN:'ind',GB:'gbr',IR:'irn',US:'usa',JP:'jpn',PK:'pak',PL:'pol'})[code]}/`;
// 2024: UNICEF UN-IGME national under-5 q5 and infant q1 per 1,000 live births.
// Reliable estimates of populations, not likelihoods conditional on a particular household's history.
const CHILD={GH:[35.9,28],NG:[115.6,70],ET:[44.5,undefined],BD:[30.5,24],IN:[26.6,23],GB:[4.7,4],IR:[11.3,10],US:[6.5,5],JP:[2.4,2],PK:[56,48],PL:[4.2,undefined]};
// World Bank, 2024 life expectancy at birth (both sexes), precisely named countries.
const LE={GH:65.69,ET:67.60,BD:74.93,IN:72.23,IR:77.85,HK:85.39,NG:54.6,PK:67.8,GB:81.3,US:79.0,JP:84.0,PL:78.0};
O.SOURCE_MODEL={childMortality2024:CHILD,lifeExpectancy2024:LE,sourceUnicef};
O.countryEvidence=(s)=>{const code=s.country.code;const q=CHILD[code];return {under5:q?q[0]:null,infant:q&&q[1]!==undefined?q[1]:null,life:LE[code]??null,under5Source:q?sourceUnicef(code):null,lifeSource:LE[code]?'https://data.worldbank.org/indicator/SP.DYN.LE00.IN':'',quality:q&&LE[code]?'partial_empirical':'illustrative_proxy'};};
function childRisk(c,a){const code=c.code,r=CHILD[code],q5=(r?r[0]/1000:Math.min(.16,Math.max(.002,(87-c.life)*.0027)));
  // When national infant mortality is unavailable, infant share is an assumption.
  const q1=r?.[1]!==undefined?r[1]/1000:q5*.72;
  if(a===1)return q1;
  if(a<=5)return 1-Math.pow((1-q5)/(1-q1),1/4);
  return 0;
}
function adultShape(age){if(age<=14)return .00025;if(age<=40)return .00045 + (age-14)*.000026;return .001126*Math.exp(.095*(age-40));}
function impliedMean(c,m){let alive=1,years=0;for(let a=1;a<=111;a++){years+=alive;const q=a<=5?childRisk(c,a):1-Math.exp(-m*adultShape(a));alive*=1-Math.min(.9999,Math.max(0,q));}return years;}
const rates={};
function adultMultiplier(c){if(rates[c.code]!==undefined)return rates[c.code];const desired=LE[c.code]??c.life;let lo=.02,hi=100;for(let i=0;i<53;i++){const m=(lo+hi)/2;if(impliedMean(c,m)>desired)lo=m;else hi=m;}return rates[c.code]=(lo+hi)/2;}
O.hazardAt=(c,a)=>a<=5?childRisk(c,a):1-Math.exp(-adultMultiplier(c)*adultShape(a));
O.expectedYears=(c)=>impliedMean(c,adultMultiplier(c));
O.mortalityProbability=function(s,age=s.age){if(age<=0)return 0;
 const base=O.hazardAt(s.country,age);
 // Individual variation is a modelled adjustment, NOT sourced stratified mortality tables.
 const classFactor=[1.34,1.18,1.04,.94,.88,.85,.83,.82][s.strata]??1;
 const sexFactor=s.gender==='M'?1.07:.94;
 const healthFactor=1+Math.max(0,40-(s.health??65))*.005;
 let modifier=classFactor*sexFactor*healthFactor;
 if(s.flags?.chronicIllness)modifier*=1.14;
 if(s.flags?.homeless)modifier*=1.09;
 if(s.flags?.unsafeEmployment&&age>=17)modifier*=1.06;
 if(s.flags?.vaccinationMissed&&age<=5)modifier*=1.18;
 const personal=1-Math.pow(1-base,modifier);
 return Math.min(.98,personal);
};
// Constant monthly conditional hazard preserves the annual survival product.
// This is a timing approximation, not an empirical neonatal/month-specific curve.
O.infantMonthlyProbability=s=>1-Math.pow(1-O.mortalityProbability(s,1),1/12);
O.infantMortality=s=>O.chance(s,O.infantMonthlyProbability(s));
O.mortality=function(s){
 if(s.age<=0||s.age===1&&s.mortalityTiming?.version===1&&s.mortalityTiming.infantMonths===12)return false;
 return O.chance(s,O.mortalityProbability(s));
};
// Explain specific fictional death causes and distinguish probabilities from diagnoses.
const oldFinish=O.finish;
O.finish=function(s,reason){
 if(!reason){
 const a=s.age,early=a<=5,conditions=s.flags||{};
 const options=early?['A severe respiratory infection','A serious gastrointestinal infection','Complications of a neonatal or childhood illness']:
 a<16?['An accidental injury','An acute infection','An undiagnosed medical emergency']:
 a<40?['An accidental injury','An acute medical emergency','A severe illness']:
 a<70?['A cardiovascular illness','Cancer','Complications of a serious infection']:
 ['Cardiovascular disease','Cancer','A serious respiratory illness','Complications of age-related frailty'];
 reason=O.pick(s,options);
 if(early&&conditions.vaccinationMissed&&O.chance(s,.28))reason='Complications of a vaccine-preventable infection';
 }
 oldFinish(s,reason);
 const evidence=O.countryEvidence(s);
 s.deathContext=`The stated cause is a plausible fictional narrative, not an individual medical diagnosis. The mortality *frequency* is based on ${evidence.quality==='partial_empirical'?'a calibrated model informed by 2024 national indicators':'an estimated demographic model with limited national data'}. This life is not a personal prediction.`;
 if(s.journal?.[0]?.type==='ending')s.journal[0].description+=` ${s.deathContext}`;
};
// Named relationships, local lore and condition-specific paths. Distinct flavour by place, age and class.
const L={
GH:{school:'BECE and senior high school',transport:'tro-tro',food:'waakye or banku',place:'a market in your area',jobs:['Market assistant','Mobile money agent','Teaching assistant'],adult:'a National Service posting or a local employer',fact:'UNICEF reports 35.9 deaths before age five per 1,000 live births in Ghana in 2024.'},
NG:{school:'WAEC exams and secondary-school plans',transport:'danfo or other shared transport',food:'jollof rice or eba',place:'a busy neighbourhood market',jobs:['Retail clerk','Logistics assistant','Apprentice technician'],adult:'a vocational placement or a small firm',fact:'UNICEF estimated 115.6 under-five deaths per 1,000 live births in Nigeria in 2024.'},
ET:{school:'Grade 8 and secondary-school routes',transport:'shared minibuses and local roads',food:'injera with a family dish',place:'the local market',jobs:['Agricultural assistant','Shop assistant','Trade apprentice'],adult:'a cooperative or small local employer',fact:'UNICEF estimated 44.5 deaths before age five per 1,000 births in Ethiopia in 2024.'},
BD:{school:'SSC and HSC examination routes',transport:'rickshaw or bus',food:'rice, dal and vegetables',place:'a roadside bazaar',jobs:['Shop assistant','Garment production trainee','Mobile phone shop assistant'],adult:'a shop or manufacturing workplace',fact:'UNICEF estimated 30.5 under-five deaths per 1,000 live births in Bangladesh in 2024.'},
IN:{school:'Class 10/12 examinations',transport:'bus or local train',food:'a family thali or street snack',place:'a nearby market',jobs:['Customer support trainee','Skilled trades apprentice','Retail assistant'],adult:'an ITI training place or regional employer',fact:'UNICEF estimated 26.6 under-five deaths per 1,000 live births in India in 2024.'},
GB:{school:'GCSEs and further education choices',transport:'bus or train',food:'a familiar takeaway or homemade meal',place:'the high street',jobs:['Apprentice electrician','Care assistant','Retail worker'],adult:'an apprenticeship provider or employer',fact:'UNICEF estimated 4.7 deaths before age five per 1,000 live births in the UK in 2024.'},
HK:{school:'DSE examinations and post-secondary choices',transport:'the MTR or minibus',food:'a cha chaan teng meal',place:'a wet market or shopping street',jobs:['Retail assistant','Office junior','Hospitality trainee'],adult:'a vocational institution or employer',fact:'Hong Kong recorded life expectancy at birth of about 85.4 years in World Bank 2024 data.'},
IR:{school:'secondary-school examinations and university entrance routes',transport:'bus or metro where available',food:'rice and stew at home',place:'a neighbourhood bazaar',jobs:['Shop assistant','Office trainee','Workshop apprentice'],adult:'a local company or training programme',fact:'UNICEF estimated 11.3 under-five deaths per 1,000 live births in Iran in 2024.'},
PK:{school:'matriculation and intermediate exams',transport:'rickshaw or bus',food:'roti, lentils and a family meal',place:'the local bazaar',jobs:['Shop assistant','Trade apprentice','Office junior'],adult:'a family enterprise or employer',fact:'UNICEF estimated 56 under-five deaths per 1,000 live births in Pakistan in 2024.'},
US:{school:'high school, community college and university routes',transport:'bus, bicycle or car',food:'a meal at home with friends',place:'local shops',jobs:['Retail associate','Medical assistant trainee','Service technician'],adult:'a community-college course or employer',fact:'UNICEF estimated 6.5 deaths before age five per 1,000 births in the US in 2024.'},
JP:{school:'entrance examinations and school-club decisions',transport:'local rail or bicycle',food:'rice and a family dish',place:'a local shopping street',jobs:['Convenience store clerk','Office trainee','Hospitality assistant'],adult:'a local firm or college',fact:'UNICEF estimated 2.4 under-five deaths per 1,000 live births in Japan in 2024.'},
PL:{school:'matura examinations and technical schooling',transport:'bus or tram',food:'a homemade meal',place:'a local shopping street',jobs:['Office junior','Retail assistant','Trade apprentice'],adult:'a local workplace or vocational centre',fact:'UNICEF estimated 4.2 under-five deaths per 1,000 births in Poland in 2024.'}
};
O.LOCAL_STORIES=L;

// Personalise named households, not just journal text. Examples are mixed pools, not statements
// about any person's ethnicity/religion. Never infer those identities from nationality.
const NAMES={
 GH:{male:['Kwame','Kofi','Yaw','Kojo','Kwaku','Samuel','Ibrahim'],female:['Akosua','Ama','Abena','Efua','Adwoa','Mariam','Grace'],last:['Mensah','Osei','Owusu','Boateng','Asante','Addo','Abubakar']},
 NG:{male:['Chinedu','Emeka','Tunde','Babatunde','Sani','Musa','Daniel'],female:['Adaeze','Ngozi','Aisha','Zainab','Yetunde','Chiamaka','Blessing'],last:['Okafor','Adeyemi','Bello','Okonkwo','Ibrahim','Balogun']},
 ET:{male:['Dawit','Abebe','Yonas','Tesfaye','Bereket','Samuel'],female:['Hana','Selam','Mekdes','Rahel','Tigist','Sara'],last:['Bekele','Tadesse','Girma','Tesfaye','Demissie']},
 BD:{male:['Rafiq','Arif','Tanvir','Hasan','Rahim','Imran'],female:['Nusrat','Tasnim','Ayesha','Maliha','Farzana','Ruma'],last:['Hossain','Rahman','Akter','Chowdhury','Islam','Ahmed']},
 IN:{male:['Aarav','Arjun','Rohan','Rahul','Imran','Kabir'],female:['Ananya','Priya','Aditi','Ayesha','Meera','Riya'],last:['Sharma','Singh','Patel','Khan','Gupta','Das']},
 HK:{male:['Ho Ming','Ka Ho','Chun Hei','Wing Ho','Chi Wai','Yat Long'],female:['Wing Yan','Tsz Yan','Ka Yan','Hiu Tung','Man Yi','Sze Wing'],last:['Chan','Wong','Lee','Cheung','Lam','Ng']},
 IR:{male:['Arman','Reza','Amir','Mehdi','Ali','Navid'],female:['Sara','Maryam','Niloofar','Leila','Nazanin','Shirin'],last:['Mohammadi','Hosseini','Rezaei','Karimi','Ahmadi']},
 PK:{male:['Bilal','Hamza','Usman','Ali','Ahmed','Hassan'],female:['Ayesha','Fatima','Zainab','Maryam','Sana','Hira'],last:['Khan','Malik','Ahmed','Butt','Shah']},
 JP:{male:['Haruto','Sota','Yuto','Ren','Kaito','Takumi'],female:['Yui','Hina','Sakura','Rin','Mei','Akari'],last:['Sato','Suzuki','Takahashi','Tanaka','Watanabe','Ito']},
 PL:{male:['Jakub','Mateusz','Piotr','Adam','Michal'],female:['Zofia','Anna','Julia','Maja','Katarzyna'],last:['Kowalski','Nowak','Wisniewski','Wojcik','Zielinski']}
};
const oldName=O.makeName;
O.makeName=function(s,gender='F',surname=''){const names=NAMES[s.country?.code];if(!names)return oldName(s,gender,surname);return O.pick(s,gender==='M'?names.male:names.female)+' '+(surname||O.pick(s,names.last));};
const FAMILY_JOBS={
 GH:{every:['Market trader','Farm worker','Bus driver','Tailor','Retail worker'],high:['Teacher','Accountant','Business owner','Healthcare worker']},
 NG:{every:['Market trader','Farm worker','Driver','Mechanic','Shopkeeper'],high:['Engineer','Doctor','Teacher','Corporate manager']},
 ET:{every:['Farm worker','Retail seller','Transport worker','Skilled tradesperson'],high:['Teacher','Civil servant','Business owner']},
 BD:{every:['Agricultural worker','Garment worker','Small shop owner','Transport worker'],high:['Teacher','Accountant','Business owner']},
 IN:{every:['Skilled tradesperson','Shop worker','Farm worker','Factory worker'],high:['Engineer','Teacher','Business owner','Doctor']},
 HK:{every:['Restaurant worker','Retail assistant','Driver','Security guard'],high:['Banking employee','Engineer','Business owner','Teacher']},
 IR:{every:['Shopkeeper','Office worker','Craft worker','Driver'],high:['Engineer','Doctor','Teacher','Business owner']},
 PK:{every:['Market trader','Farm worker','Driver','Tailor'],high:['Teacher','Accountant','Business owner']},
 GB:{every:['Care assistant','Warehouse operative','Retail worker','Driver'],high:['Solicitor','Software developer','Teacher','Doctor']},
 US:{every:['Healthcare aide','Retail worker','Driver','Construction worker'],high:['Engineer','Accountant','Doctor','Business owner']},
 JP:{every:['Shop worker','Office clerk','Delivery worker','Hospitality worker'],high:['Engineer','Teacher','Corporate manager']},
 PL:{every:['Factory worker','Retail worker','Driver','Tradesperson'],high:['Engineer','Doctor','Business owner','Teacher']}
};
const oldCreate=O.create;
O.create=function(settings){const st=oldCreate(settings);if(st.country?.code==='HK')st.first=st.name.split(' ').slice(0,2).join(' ');return st;};
const oldPerson=O.person;
O.person=function(s,role,age,gender,surname,extra={}){
 const p=oldPerson(s,role,age,gender,surname,extra);const pool=FAMILY_JOBS[s.country?.code];
 if(pool&&['Parent','Mother','Father'].includes(role))p.job=O.pick(s,s.strata>=5?pool.high:pool.every);
 return p;
};

const mother=s=>s.people.find(x=>x.alive&&x.role==='Mother'),father=s=>s.people.find(x=>x.alive&&x.role==='Father');
const parent=s=>{const p=mother(s)||father(s);return p?O.personLabel(p):'a caregiver';};
const school=(s)=>s.school?'The school expects you back tomorrow.':'Your learning happens away from a regular classroom.';
const poverty=(s)=>s.strata<2?'The family has little spare money and cannot assume support will arrive.':s.strata>=6?'Your family can absorb many expenses without changing daily plans.':'The household can cover most essentials, but unexpected bills still matter.';
function put(s,phase,key,title,description,scene='home',change){return {id:`place-${s.country.code}-${phase}-${key}`,title,description,scene,effect:change?'local-effect':null,localEffect:change,type:'story'};}
const oldPick=O.pickStories;
O.pickStories=function(s,n){const base=oldPick(s,n);const d=L[s.country.code];if(!d||n<=0)return base;
 const a=s.age,ph=a<6?'infancy':a<14?'childhood':a<21?'teen':a<39?'young':a<66?'midlife':'elder';
 const contact=parent(s);const companion=s.people.find(x=>x.role==='Friend'&&x.alive);
 const friend=companion?O.personLabel(companion):'a neighbour';const place=s.urban?'your neighbourhood':'the surrounding community';
 const stories={
 infancy:[
 put(s,ph,0,'A visit about childhood health',`${contact} arranges an appointment or asks about routine immunisation. ${s.strata<2?'Travel costs and taking time off work complicate the visit.':'A health worker explains the next steps.'} Not every family has equal access.`, 'clinic'),
 put(s,ph,1,'The household around you',`You are too young to decide much. ${contact} arranges your day around care and paid or unpaid work. ${poverty(s)}`,'home'),
 put(s,ph,2,'People and places',`Family members carry you past ${d.place}. Conversations, sounds and familiar faces make up your first impressions.`, 'city')],
 childhood:[
 put(s,ph,0,'The journey to learn',`Whether heading to class or helping at home, you see classmates or neighbours preparing for ${d.school}. ${school(s)} ${poverty(s)}`,'school'),
 put(s,ph,1,'A familiar local meal',`${contact} shares ${d.food}. During the meal, adults discuss prices and whose earnings will cover the next bill.`, 'home'),
 put(s,ph,2,'A small encouragement',`${friend} says you are talented at ${s.flags.personalThread||'something you enjoy'}. You keep thinking about the compliment as you walk through ${place}.`,'park',{happiness:2,confidence:2}),
 put(s,ph,3,'An ordinary journey',`You travel by ${d.transport} to ${d.place}. The expense and length of the journey depend on where you live.`, 'city')],
 teen:[
 put(s,ph,0,'Examinations and expectations',`People talk about ${d.school}. ${contact} has hopes for your future, but your grades and the money available are not entirely in your control.`, 'school'),
 put(s,ph,1,'Different futures',`You hear that someone your age is training for work while another is continuing school. ${poverty(s)} It becomes harder to imagine everyone's life moving in the same direction.`,'city'),
 put(s,ph,2,'The limits of spare time',`A friend suggests meeting near ${d.place}. ${s.flags.foodInsecure?'Your family has been cutting food expenses, and outings feel harder to justify.':'You weigh the journey, responsibilities and whether you want to go.'}`,'park'),
 put(s,ph,3,'An interest takes shape',`You spend an evening thinking about ${s.flags.personalThread||'a subject that interests you'}. A teacher or relative's casual remark makes the interest feel more real.`,'school',{knowledge:1})],
 young:[
 put(s,ph,0,'A route into working life',`You hear about opportunities through ${d.adult}. ${s.job?`Your experience as a ${s.job} affects which offers seem realistic.`:'Qualifications, contacts and local demand shape which offers seem realistic.'}`,'office'),
 put(s,ph,1,'The cost of living independently',`A trip on ${d.transport} brings up housing, work and family expenses. ${poverty(s)} `,'city',{stress:1}),
 put(s,ph,2,'An unexpected family conversation',`${contact} asks whether you intend to stay nearby. Your work, friendships and financial obligations all shape what you can promise.`,'home'),
 put(s,ph,3,'Shared everyday life',`After an ordinary day you share ${d.food} with someone close. Conversations turn from tomorrow's practical problems to memories from school.`,'home',{happiness:1})],
 midlife:[
 put(s,ph,0,'A neighbourhood remembers',`At ${d.place}, someone asks how your family is doing. You find yourself comparing the opportunities you had with those available to younger people now.`,'city'),
 put(s,ph,1,'The household budget changes',`Prices and transport on ${d.transport} change what the family can spend. ${s.debt>0?'Repayments make you reconsider other plans.':s.strata>4?'Savings provide a buffer.':'You make practical adjustments.'}`,'home'),
 put(s,ph,2,'A path not taken',`A conversation about ${d.school} reminds you of your earlier choices. You wonder whether life would have differed if you had taken another route.`,'park'),
 put(s,ph,3,'Changing responsibilities',`Someone in your wider community needs help with an appointment or errand. Your working hours and family responsibilities determine how much you can offer.`,'home',{relationships:1})],
 elder:[
 put(s,ph,0,'A familiar part of town',`You pass ${d.place} and notice the shops, faces and routines that have changed since your youth.`, 'city'),
 put(s,ph,1,'The next generation',`You hear someone discussing ${d.school}. It sounds familiar but the pressures are not exactly the ones you experienced.`,'home'),
 put(s,ph,2,'Memories at an ordinary meal',`The taste of ${d.food} reminds you of ${contact} and the decisions your household used to make.`, 'home'),
 put(s,ph,3,'Getting around',`Travelling by ${d.transport} feels different as your energy changes. Distance and accessible services matter more than they once did.`,'city')]
 }[ph];
 // Replace around half of anonymous filler entries with unique, age-appropriate local memories.
 const eligible=stories.filter(t=>!s.storyUsed?.[t.id]);
 const count=Math.min(eligible.length,n>=3?2:1);
 for(let i=0;i<count;i++){
  const chosen=O.pick(s,eligible);base[O.int(s,0,base.length-1)]=chosen;
  eligible.splice(eligible.indexOf(chosen),1);if(!s.storyUsed)s.storyUsed={};s.storyUsed[chosen.id]=s.age;
 }
 return base;
};
const oldFire=O.fireStory;
O.fireStory=function(s,event){oldFire(s,event);if(event.localEffect)O.adjust(s,event.localEffect);};
// Make at least some *decisions*, not only text, location-specific.
function option(title,desc,apply){return {label:title,detail:desc,apply};}
for(const [code,data] of Object.entries(L)){
 O.EVENTS.push({id:`local-job-choice-${code}`,min:16,max:45,category:'Local opportunity',scene:'office',weight:26,
 when:s=>s.country.code===code&&!s.flags.studying&&(s.income<=0||s.flags.jobSearching||s.income<s.country.ppp*.3)&&(s.used[`local-job-choice-${code}`]===undefined||s.age-s.used[`local-job-choice-${code}`]>=8),
 title:()=>`A local offer: ${data.jobs[0]}`,
 description:s=>`A ${data.jobs[0].toLowerCase()} position is being considered through ${data.adult}. Whether you can take it depends on skills, travel, interview performance and family commitments. ${poverty(s)} The annual earnings below are simulated purchasing-power estimates, not a quoted real wage.`,
 options:s=>[
 option(`Accept: ${data.jobs[0]}`,`Illustrative pay: ${O.money(Math.round(s.country.ppp*.62))} PPP-equivalent/year; room to grow depends on experience.`,st=>{st.job=data.jobs[0];st.income=Math.round(st.country.ppp*.62*(.8+O.rand(st)*.4));st.flags.jobSearching=false;st.flags.firstLocalJob=st.job;O.adjust(st,{stress:1,confidence:4});return `You accept the ${st.job} position. Travel, colleagues and routines will shape your next few years.`;}),
 option(`Ask about: ${data.jobs[1]}`,`Different duties and training needs; interview is not guaranteed to succeed.`,st=>{if(O.chance(st,.32+st.knowledge/220)){st.job=data.jobs[1];st.income=Math.round(st.country.ppp*.79);st.flags.firstLocalJob=st.job;return `You are hired as a ${st.job}. The work brings a new routine.`;}st.flags.jobSearching=true;return `The employer declines. You continue looking while the original offer expires.`;}),
 option('Decline and keep looking','No income guaranteed while you search.',st=>{st.flags.jobSearching=true;O.adjust(st,{stress:2});return 'You decline the offer, knowing the next opportunity may take time.'})]});
}
const countryFact=O.factForEvent;
O.factForEvent=(s,e)=>{
 const d=L[s.country.code];
 if(d&&e&&(/vaccin|immun|health|childhood/i.test((e.id||'')+' '+e.category))&&s.age<=5){const ev=O.countryEvidence(s);if(ev.under5!==null)return {text:d.fact,source:'UNICEF IGME, 2024 under-five mortality estimate (population-wide; not this character’s vaccine risk)',url:ev.under5Source};}
 const text=(e?.id||'')+' '+(e?.category||'')+' '+(typeof e?.title==='function'?e.title(s):'');
 if(s.age<14){if(s.country.code==='GH'&&/transport|urban|housing|market|commut/i.test(text))return O.COUNTRY_CONTEXT.GH.facts[1];if(s.country.code==='HK'&&/housing|rent|flat|home/i.test(text))return O.COUNTRY_CONTEXT.HK.facts[0];return null;}
 if(['GH','NG','ET','BD','IN'].includes(s.country.code)&&/marriage|partner|family planning|relationship.*future/i.test(text))return O.COUNTRY_CONTEXT[s.country.code]?.facts[0]||null;
 if(['GH','HK','GB'].includes(s.country.code))return countryFact(s,e);
 return null;
};
})(window.OL);

