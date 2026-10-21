
(function(O){
const round=(x)=>Math.round(x);
O.clamp=(x,min=0,max=100)=>Math.max(min,Math.min(max,x));
O.rand=(s)=>{s.rng=(Math.imul(1664525,s.rng)+1013904223)>>>0;return s.rng/4294967296};
O.int=(s,a,b)=>Math.floor(O.rand(s)*(b-a+1))+a;
O.chance=(s,p)=>O.rand(s)<O.clamp(p,0,1);
O.pick=(s,arr)=>arr[Math.floor(O.rand(s)*arr.length)];
O.weighted=(s,arr,weight)=>{let sum=arr.reduce((a,x)=>a+Math.max(0,weight(x)),0);let r=O.rand(s)*sum;for(const x of arr){r-=Math.max(0,weight(x));if(r<=0)return x}return arr.at(-1)};
O.money=(n)=>{const neg=n<0?'-':'';return neg+'$'+Math.abs(Math.round(n)).toLocaleString('en-US')};
O.makeName=(s,gender='F',surname='')=>{const pool=O.POOLS[s.country.region]||O.POOLS['Western Europe'];return O.pick(s,gender==='M'?pool.firstM:pool.firstF)+' '+(surname||O.pick(s,pool.last))};
O.person=(s,role,age,gender,surname,extra={})=>({id:'p'+(++s.nextPerson),role,name:O.makeName(s,gender,surname),age,gender,close:O.int(s,42,87),health:O.int(s,65,95),warmth:O.int(s,28,92),trait:O.pick(s,O.TRAITS),job:['Parent','Mother','Father'].includes(role)?O.pick(s,['Farm worker','Retail worker','Office administrator','Care worker','Technician','Teacher','Business owner','Warehouse assistant']):'—',alive:true,...extra});
O.classOf=(p)=>O.CLASS.find(c=>p<c.max)||O.CLASS.at(-1);
O.tier=(s)=>O.classOf(s.percentile).label;
O.netWorth=(s)=>Math.round((s.cash||0)-(s.debt||0)+(s.investments||0)+(s.property||0));
O.countChildren=(s)=>s.people.filter(p=>p.role==='Child'&&p.alive).length;
O.find=(s,role)=>s.people.find(p=>p.role===role&&p.alive);
O.modifyPerson=(s,id,delta)=>{const p=s.people.find(x=>x.id===id&&x.alive);if(p)p.close=O.clamp(p.close+delta)};
O.bond=(s,role,delta)=>s.people.filter(x=>(x.role===role||(role==='Parent'&&['Mother','Father'].includes(x.role)))&&x.alive).forEach(p=>O.modifyPerson(s,p.id,delta));
O.adjust=(s,fx={})=>{for(const [k,v] of Object.entries(fx)){if(['health','happiness','knowledge','relationships','stress','confidence'].includes(k))s[k]=O.clamp((s[k]||0)+v);else s[k]=(s[k]||0)+v} if(s.cash<0){s.debt+=-s.cash;s.cash=0}};
O.journal=(s,title,description,type='life')=>{s.journal.unshift({age:s.age,year:s.birthYear+s.age,title,description,type});};
O.snapshot=(s)=>{if(s.settings?.snapshotPolicy==='none'||s.age%5!==0&&![16,18,22,30,40,50,65].includes(s.age))return;let clone=JSON.parse(JSON.stringify({...s,parallelWorld:undefined,...(s.parallelWorld?{parallelWorldRef:{version:1,id:s.parallelWorld.id}}:{}),snapshots:[]}));s.snapshots.push({age:s.age,data:clone});if(s.snapshots.length>24)s.snapshots.shift()};
O.create=(settings={})=>{
 const seed=Number.isInteger(settings.seed)?settings.seed>>>0:((Math.random()*0xffffffff)>>>0);
 const s={id:'life-'+Date.now()+'-'+Math.floor(Math.random()*1e6),rng:seed>>>0,seed,birthYear:settings.year||2026,age:0,gender:'',country:null,percentile:0,urban:false,people:[],nextPerson:0,status:'alive',settings,health:85,happiness:70,knowledge:12,relationships:60,stress:0,confidence:45,schooling:0,education:O.EDU[0],school: false,schoolGrades:0,job:'',jobTier:0,workYears:0,income:0,annualExpenses:0,unemployedYears:0,personalFreedom:0,cash:0,debt:0,investments:0,property:0,inheritance:0,yearsInCity:0,focus:'Balanced',flags:{},used:{},journal:[],snapshots:[],pending:null,lastOutcome:'',startedAt:new Date().toISOString(),finishedAt:null,cause:null,yearsWorked:0,scene:'home'};
 let countries=O.COUNTRIES;
 if(settings.country&&settings.country!=='random')countries=countries.filter(c=>c.code===settings.country);
 s.country=O.weighted(s,countries,c=>settings.draw==='equal'?1:c.births);
 s.playback=O.birthPlayback(s.country,settings.durationMinutes);
 s.gender=O.chance(s,.505)?'F':'M';
 s.percentile=Number.isInteger(settings.quintile)&&settings.quintile>=1&&settings.quintile<=5?(settings.quintile-1)*20+O.rand(s)*20:settings.classChoice==='top1'?99+O.rand(s):settings.classChoice==='hardship'?O.rand(s)*8:settings.classChoice==='comfortable'?65+O.rand(s)*20:O.rand(s)*100;
 s.urban=O.chance(s,s.country.urban/100);
 const bracket=O.classOf(s.percentile);s.classLabel=bracket.label;
 s.strata=O.CLASS.indexOf(bracket);
 const m=[.18,.42,.8,1.32,2.75,7.5,25,85][s.strata];
 s.familyIncome=round(s.country.ppp*m*(.8+O.rand(s)*.4));
 s.familyAssets=round(s.familyIncome*[.05,.2,.9,2,5,11,23,54][s.strata]);
 s.financialSecurity=O.clamp(round(20+s.strata*9+s.country.infra*.15));
 s.schoolGrades=O.int(s,18,70)+Math.floor(s.strata*2.5);
 s.health=O.clamp(round((s.country.infra+s.country.life)/2*.62+O.int(s,15,43)));
 s.happiness=O.clamp(55+O.int(s,-13,20)+s.strata*2);
 s.knowledge=O.clamp(6+O.int(s,0,16));
 s.relationships=O.int(s,49,86);
 s.confidence=O.clamp(O.int(s,28,60)+s.strata*2);
 const fp=O.int(s,23,41),mp=O.int(s,22,39);const surname=O.pick(s,(O.POOLS[s.country.region]||O.POOLS['Western Europe']).last);
 s.name=O.makeName(s,s.gender,surname);s.first=s.name.split(' ')[0];
 const father=O.person(s,'Father',fp,'M',surname,{close:O.int(s,46,90)});
 const mother=O.person(s,'Mother',mp,'F',surname,{close:O.int(s,52,94)});
 s.people=[father,mother];
 if(O.chance(s,.44)){const g=O.chance(s,.5)?'F':'M';s.people.push(O.person(s,'Sibling',O.int(s,1,7),g,surname,{close:O.int(s,48,89)}))}
 if(O.chance(s,.24)){s.people.push(O.person(s,'Grandparent',O.int(s,54,74),O.chance(s,.5)?'F':'M',surname,{close:O.int(s,45,82)}))}
 if(s.percentile<10&&O.chance(s,.12))s.flags.foodInsecure=true;
 if(s.strata>=6)s.flags.familyBusiness=O.chance(s,.78);
 if(s.country.code==='UA'||s.country.code==='SD'||s.country.code==='MM'||s.country.code==='AF')s.flags.uncertainSafety=true;
 s.schoolAccess=O.chance(s,(s.country.school*.72+s.strata*3)/100);
 s.school=false;s.schemaVersion=2;s.choiceHistory=[];s.propertyLedger={version:1,nextId:0,properties:[],history:[]};s.mortalityTiming={version:1,infantMonths:0};
 if(O.createSchoolRecord)O.createSchoolRecord(s);
 if(O.createStoryFlow)O.createStoryFlow(s);
 s.birthDescription=`You are born ${s.urban?'in an urban community':'in a rural community'} in ${s.country.name}. Your household is ${bracket.label.toLowerCase()}. ${bracket.desc} Your family includes ${s.people.map(p=>p.role.toLowerCase()+' ('+p.name+')').join(', ')}. You have no control over the circumstances of your birth. The life ahead is not predetermined.`;
 O.journal(s,'A beginning',s.birthDescription,'birth');
 if(settings.comparisons===true)s.parallelWorld=O.buildParallelWorld(s);
 O.snapshot(s);return s;
};
O.annualCore=(s)=>{
 const age=s.age,c=s.country;
 s.people.forEach(p=>{
  if(!p.alive)return;
  if(p.age<160)p.age++;
  if(p.age>=160||O.chance(s,O.personDeathRisk?O.personDeathRisk(s,p):Math.min(.25,Math.pow(1.106,p.age-65)*.007))){p.alive=false;p.diedAt=p.age;O.journal(s,`Goodbye to ${p.name}`,`${p.name}, your ${p.role.toLowerCase()}, dies at age ${p.age}. Cause: ${O.personCause?O.personCause(s,p):'a serious illness'}. The family makes arrangements and finds a new daily rhythm.`,'family');O.adjust(s,{happiness:-12,relationships:-3,stress:9});return;}
  if(O.chance(s,.03))p.close=O.clamp(p.close+O.int(s,-5,5));
 });
 const focus={Balanced:[0,0,0,0],Learning:[0,-1,2,0],Health:[2,1,0,0],Relationships:[0,1,0,2],Career:[-1,-1,1,-1],Rest:[1,2,0,0]};
 const f=focus[s.focus]||focus.Balanced;
 O.adjust(s,{health:f[0]-(age>50?Math.max(1,Math.floor((age-45)/14)):0),happiness:f[1]+O.int(s,-1,1),knowledge:f[2],relationships:f[3]-(O.chance(s,.3)?1:0),stress:s.focus==='Rest'?-3:0});
 if(s.stress>65)O.adjust(s,{health:-3,happiness:-2});
 if(age>=6&&age<=18&&s.school){O.schoolProgress?O.schoolProgress(s,O.int(s,1,3)+(s.strata>=4?1:0)):(s.knowledge=O.clamp(s.knowledge+O.int(s,1,3)+(s.strata>=4?1:0))); s.schoolGrades=O.clamp(s.schoolGrades+O.int(s,-4,5))}
 if(s.flags.studying&&age>=s.flags.graduationAge){s.flags.studying=false;s.education=O.EDU[4];O.adjust(s,{knowledge:9,happiness:6});O.journal(s,'A qualification earned','You complete a period of higher education. It may expand your options, although a degree does not guarantee employment.','education')}
 if(age>=18){O.settleAnnualBudget(s);O.recordEmploymentYear(s);}
 if(age>=10&&age<=60){if(O.chance(s,.035)){O.adjust(s,{health:-O.int(s,3,12),stress:4});O.journal(s,'A difficult spell','An ordinary illness or period of stress interrupts your plans. Recovery depends partly on resources and support.','health')}}
 if(age>=18&&s.job&&s.job!=='Retired'&&O.chance(s,.06)){s.income=Math.max(0,round(s.income*(.96+O.rand(s)*.16)))}
 if(age>=12&&s.strata===0&&O.chance(s,.05)){s.flags.foodInsecure=true}
 if(age>=18&&s.flags.foodInsecure&&s.cash>c.ppp*.25&&O.chance(s,.4))s.flags.foodInsecure=false;
 if(age>=20&&s.income<=0&&s.strata>=5&&O.chance(s,.37)&&!s.flags.rejectedSupport){s.cash+=round(s.familyIncome*.09);O.journal(s,'A financial cushion','Your family is able to cover some of your expenses. The same setback might have been harder without this safety net.','economy')}
};
O.mortality=(s)=>{
 const a=s.age,life=s.country.life;
 let hazard=a===1?.005*(100-s.country.infra)/38: a<5?.0018*(100-s.country.infra)/40: a<18?.00045:a<45?.0015:a<55?.003:a<65?.006:a<80?.012*Math.pow(1.095,a-65):.047*Math.pow(1.125,a-80);
 hazard*=Math.pow(1.075,75-life)*(.75+(100-s.health)/95)*[1.48,1.23,1.08,.96,.87,.80,.74,.70][s.strata];
 if(s.flags.chronicIllness)hazard*=1.32;
 if(s.flags.unsafeEmployment)hazard*=1.12;
 if(s.flags.homeless)hazard*=1.25;
 if(a>=105)hazard=.9;
 return O.chance(s,Math.min(.96,hazard));
};
O.finish=(s,reason)=>{if(!reason){const a=s.age;const childhood=a<15;const risk=s.flags?.vaccinationMissed&&a<5;const causes=childhood?(risk?['Complications of a serious infectious illness','Severe respiratory infection','An acute childhood illness']:['Severe respiratory infection','Complications of an acute illness','An accidental injury']):a<45?['A sudden medical emergency','An accidental injury','Complications of an infection','A serious undiagnosed condition']:a<70?['Cardiovascular illness','A serious infection','A chronic medical condition','Cancer']:['Cardiovascular illness','Cancer','Respiratory disease','Complications of frailty'];reason=O.pick(s,causes);s.deathContext=childhood?'Dying so young interrupts a childhood that has barely begun. Local healthcare, vaccination, nutrition and chance all influence population-level survival; this particular cause is a fictional simulation outcome.':a<70?'An earlier death can have many causes. This simulated event does not establish what would happen to a real person with similar circumstances.':'Older age brings increased risks of illness, even when healthcare and financial resources are available.';}s.status='finished';s.pending=null;s.finishedAt=new Date().toISOString();s.cause=reason|| (s.age>70?'Age-related illness':'An unexpected medical event');O.journal(s,'The end of a life',`${s.name} dies at age ${s.age}. Cause recorded: ${s.cause}. ${s.deathContext||''}`,'ending');s.lastOutcome='';};
O.advance=(s)=>{
 if(!s||s.status!=='alive'||s.pending)return false;
 s.age++;
 s.lastOutcome='';
 O.passive(s);
 if(O.mortality(s)){O.finish(s);return true}
 let event=O.chooseEvent(s);
 if(event){s.pending=event.id;s.used[event.id]=s.age;s.scene=event.scene||'home';O.snapshot(s);}
 else {const m=O.pick(s,O.MOODS);O.journal(s,m,`Time passes. ${s.first} is now ${s.age}. The small routines and relationships of ordinary life continue.`,'life');s.scene='home';}
 return true;
};
O.applyChoice=(s,index)=>{
 if(!s.pending||s.status!=='alive')return false;
 const e=O.EVENTS.find(e=>e.id===s.pending);if(!e)return false;
 if(O.eventEligible&&!O.eventEligible(s,e,{resolving:true}))return false;
 const options=e.options(s);if(!Number.isInteger(index)||!options[index]||options[index].disabled)return false;
 const opt=options[index],eventTitle=e.title(s);
 const outcome=opt.apply(s)||'The consequences will unfold over time.';
 s.used[e.id]=s.age;
 if(s.flags.legacyPendingUsage===e.id)delete s.flags.legacyPendingUsage;
 (s.choiceHistory??=[]).push({eventId:e.id,age:s.age,month:s.month,index,label:opt.label});
 O.journal(s,eventTitle,`${opt.label}. ${outcome}`,e.category||'decision');
 s.journal[0].eventId=e.id;
 s.pending=null;s.lastOutcome=outcome;
 return true;
};
O.getJob=(s,level)=>{const eligible=O.JOBS.filter(j=>j.edu<=Math.max(0,level)&&j.tier<=(s.strata>=6?5:4));return O.pick(s,eligible)};
O.hire=(s,job)=>{s.job=job.title;s.jobTier=job.tier;s.income=Math.round(s.country.ppp*job.mult*(.7+O.rand(s)*.55));s.unemployedYears=0;return `${job.title}, earning approximately ${O.money(s.income)} per year in purchasing-power terms.`};
O.createContact=(s,role='Friend',age=s.age,gender)=>{const p=O.person(s,role,age,gender|| (O.chance(s,.5)?'F':'M'));s.people.push(p);return p};
O.newChild=(s)=>{const p=O.person(s,'Child',0,O.chance(s,.5)?'F':'M',s.name.split(' ').at(-1),{close:O.int(s,58,94)});s.people.push(p);return p};
O.stage=(a)=>a<6?'Early childhood':a<13?'Childhood':a<18?'Adolescence':a<30?'Young adulthood':a<50?'Adulthood':a<65?'Midlife':'Later life';
})(window.OL);

