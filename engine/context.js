
/* V2.3 factual context pack: source-checked facts, not the probability model. */
(function(O){
O.COUNTRY_CONTEXT={
GH:{topic:'Growing up in Ghana',facts:[{text:'16% of women aged 20–24 in Ghana were married or in a union before their 18th birthday.',source:'UNICEF country profile, 2024 (based on national household data)',url:'https://data.unicef.org/country/gha/'},{text:'56.7% of Ghana’s population lived in urban areas at the 2021 census.',source:'Ghana Statistical Service, 2021 Population and Housing Census',url:'https://census2020.statsghana.gov.gh/presspage.php?Presentation-on-the-General-Report-Volumes-3A-3B-and-3C=&readmorenews=MTY4OTA1MDkwNC4wOTY%3D'}]},
BD:{topic:'Growing up in Bangladesh',facts:[{text:'47.2% of Bangladeshi women aged 20–24 were first married before age 18.',source:'UNICEF Bangladesh, 2025 Multiple Indicator Cluster Survey',url:'https://www.unicef.org/bangladesh/en/data-situation-children-bangladesh'}]},
NG:{topic:'Growing up in Nigeria',facts:[{text:'33.4% of Nigerian women aged 20–24 married before their 18th birthday; the rate was higher in parts of northern Nigeria.',source:'UNICEF Nigeria, citing 2024 DHS (reported December 2025)',url:'https://www.unicef.org/nigeria/press-releases/unicef-and-partners-find-high-economic-returns-investing-adolescent-girls-northern'}]},
IN:{topic:'Growing up in India',facts:[{text:'23% of Indian women aged 20–24 had married or entered a union before age 18.',source:'UNICEF 2024 country profile, using 2019–21 national survey',url:'https://www.unicef.org/media/172896/file/India.pdf.pdf'}]},
ET:{topic:'Growing up in Ethiopia',facts:[{text:'The proportion of Ethiopian young women married before 18 fell from 40% in 2016 to 32% in 2025.',source:'UNICEF Ethiopia, October 2026',url:'https://www.unicef.org/ethiopia/press-releases/ethiopia-advances-efforts-end-child-marriage'}]},
GB:{topic:'Routes into work in England',facts:[{text:'There were 353,500 apprenticeship starts in England in the 2024/25 academic year (learners aged 16 and above).',source:'UK Department for Education, 2024/25 apprenticeships statistics',url:'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships/2024-25'}]},
HK:{topic:'Housing in Hong Kong',facts:[{text:'Hong Kong’s 2021 Population Census specifically measured people living in subdivided units; not every family has the same housing choices.',source:'Hong Kong Census and Statistics Department, 2021 Population Census',url:'https://data.gov.hk/en-data/dataset/hk-censtatd-census21c-b1120113'}]}
};
O.parentRole=p=>p.role==='Parent'?(p.gender==='F'?'Mother':'Father'):p.role;
O.personLabel=p=>{const r=O.parentRole(p);if(r==='Mother')return 'Mom';if(r==='Father')return 'Dad';return p.name};
O.profileLabel=p=>{const r=O.parentRole(p);const k={Mother:'Mom',Father:'Dad',Sibling:'Sibling',Grandparent:'Grandparent',Friend:'Friend',Partner:'Partner',Mentor:'Mentor',Child:'Child'};return `${k[r]||r} — ${p.name}`};
O.logLabel=p=>{const r=O.parentRole(p);if(r==='Mother')return 'Mom';if(r==='Father')return 'Dad';return p.name};
O.factForEvent=(s,e)=>{const rec=O.COUNTRY_CONTEXT[s.country.code];if(!rec||!e)return null;const topic=(e.category||'')+' '+(e.title?.(s)||'');if(s.country.code==='GH'){if(/housing|commut|migration|urban|neighbou?rhood|market|city|travel/i.test(topic))return rec.facts[1];if(/famil|marriage|future|school|education|relative/i.test(topic))return rec.facts[0];return null;}if(s.country.code==='HK')return /hous|living|rent|flat|home/i.test(topic)?rec.facts[0]:null;if(s.country.code==='GB')return /apprentice|job|work|career|train/i.test(topic)?rec.facts[0]:null;return /family|marriage|future|school|educat|relative|girl/i.test(topic)?rec.facts[0]:null;};
O.countryFact=s=>{const rec=O.COUNTRY_CONTEXT[s.country.code];return rec?.facts[(s.age<15&&rec.facts.length>1)?1:0]||null};
const rawCreate=O.create;O.create=function(settings){const s=rawCreate(settings);O.upgradeLife(s);return s};
O.upgradeLife=s=>{
 if(!s.interests)s.interests=['Learning','Community'];
 if(!s.memories)s.memories={};
 if(!s.flags)s.flags={};
 if(s.people)for(const p of s.people){if(p.role==='Parent')p.role=p.gender==='F'?'Mother':'Father';if(!p.residence)p.residence=p.role==='Mother'||p.role==='Father'||p.role==='Sibling'?'Family home':p.role==='Partner'?'Your household':p.role==='Child'?'Your household':'Nearby or elsewhere';if(!Number.isFinite(p.annualIncome))p.annualIncome=(p.role==='Mother'||p.role==='Father')?Math.max(0,Math.round((s.familyIncome||0)*(p.role==='Mother'?.43:.57))):0;}
 if(s.familyDebts===undefined)s.familyDebts=Math.round((s.strata||0)<=1?(s.familyIncome||0)*.16:0);
 if(!s.factSeen)s.factSeen={};
 return s;
};
const rawPassive=O.passive;
O.passive=function(s){
 rawPassive(s);
 O.upgradeLife(s);
 if(s.memories.pet&&s.memories.pet.alive){s.memories.pet.age++;if(s.memories.pet.age>=7&&O.chance(s,.075+Math.max(0,s.memories.pet.age-12)*.07)){let pet=s.memories.pet;pet.alive=false;pet.diedAt=s.age;O.journal(s,`Goodbye, ${pet.name}`,`${pet.name}, your ${pet.kind}, died at ${pet.age}. For days the rooms seem unusually quiet.`,'loss');O.adjust(s,{happiness:-8});}}
 if(s.memories.pet&&!s.memories.pet.alive&&!s.memories.pet.reflected&&s.age>=s.memories.pet.diedAt+1&&O.chance(s,.55)){
  const pet=s.memories.pet;pet.reflected=true;O.journal(s,`A small reminder of ${pet.name}`,`The patch of afternoon sunlight where ${pet.name} used to rest is empty. You stop there longer than you expected. Some losses return in ordinary moments.`,'reflection');
 }
 if(s.memories.teacher&&!s.memories.teacher.remembered&&s.age>=s.memories.teacher.age+3&&O.chance(s,.24)){
  const teacher=s.memories.teacher;teacher.remembered=true;O.journal(s,'A voice you remember',`You think of ${teacher.name}, the teacher who first noticed your interest in ${teacher.subject.toLowerCase()}. Their encouragement still changes how you approach new things.`,'reflection');
 }
 if(s.age<5&&s.flags.vaccinationMissed&&O.chance(s,.06)){O.adjust(s,{health:-9});O.journal(s,'A preventable illness',`A serious infection puts your health at risk. Limited access to routine immunisation can make childhood more dangerous; this fictional outcome is not an estimated national rate.`,'loss');}
};
const rawMortality=O.mortality;
O.mortality=function(s){if(s.age>0&&s.age<5&&s.flags.vaccinationMissed){const modifier=s.strata<=1?1.8:1.35;let ordinary=rawMortality(s);return ordinary||O.chance(s,.0025*modifier*(1+Math.max(0,60-s.country.infra)/80));}return rawMortality(s)};
const rawJournal=O.journal;O.journal=function(s,title,description,type='life'){
 // Preserve the actual person names here; label cleanup occurs in the age/culture module.
 rawJournal(s,title,description,type);
 const entry=s.journal[0];
 if(type==='birth')entry.tone='neutral';else if(['loss','ending'].includes(type)||/died|death|unwell|injur|lost your|rejected|cannot afford|illness|crisis|disrupt|debt|threat|hurt|sick|closed down/i.test(title+' '+description))entry.tone='bad';
 else if(/scholarship|graduate|passed|support|friend|promot|improv|recovered|encourag|gift|earned|accepted|achiev|celebrat/i.test(title+' '+description))entry.tone='good';
 else entry.tone='neutral';
};
O.relevantJobs=s=>{
 const edu=O.educationNumber(s.education);const eligible=O.JOBS.filter(j=>j.edu<=edu&&j.tier<=(s.strata>=6?5:4));
 const interests=s.interests||[];
 const score=j=>({Teacher:interests.includes('History')||interests.includes('Learning')?5:0,Engineer:interests.includes('Technology')?5:0,'Software developer':interests.includes('Technology')?6:0,Nurse:interests.includes('Healthcare')?6:0,Doctor:interests.includes('Healthcare')?6:0,'Farm worker':interests.includes('Agriculture')?5:0,'Skilled tradesperson':interests.includes('Craft')?6:0,'Retail worker':interests.includes('Commerce')?4:0,'Business owner':interests.includes('Commerce')?6:0}[j.title]||0);
 return eligible.map(j=>({j,score:score(j)})).sort((a,b)=>b.score-a.score||a.j.tier-b.j.tier||a.j.title.localeCompare(b.j.title)).slice(0,3).map(x=>x.j);
};
})(window.OL);
