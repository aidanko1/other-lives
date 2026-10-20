/* Other Lives WORLD EXPANSION — 201 country and location catalogue.
 * Country-specific narrative settings; World Bank V2 source-connected context data.
 * Fallback birth/education/money/risk figures are illustrative, not verified.
 */
(function(O){
'use strict';
const transports={"West Africa":"shared transport or local buses","Central Africa":"buses, shared taxis or walking","East Africa":"local buses or shared vehicles","North Africa":"buses, walking or taxis","Southern Africa":"public transport or shared minibus taxis","South Asia":"buses, trains or local shared transport","East Asia":"trains, buses and local services","Southeast Asia":"buses, motorcycles or shared transport","Central Asia":"local buses or shared taxis","Middle East":"buses, taxis or family transport","Eastern Europe":"local buses, trams or trains","Southern Europe":"buses, walking or trains","Northern Europe":"buses, cycling or trains","Western Europe":"buses, cycling or trains","North America":"buses, walking or a car","South America":"buses and local transport","Central America":"buses and local vans","Caribbean":"buses or shared taxis","Oceania":"public transport, walking or a car","Pacific Islands":"walking, boats or local transport"};
const sectors={"West Africa":["market trading","repair workshops","agricultural supply","community services"],"Central Africa":["retail trade","local logistics","construction","agriculture"],"East Africa":["agriculture","transport services","retail","small business"],"North Africa":["tourism","retail","administrative work","services"],"Southern Africa":["retail","transport","care services","manufacturing"],"South Asia":["textile-related work","small-scale retail","public services","technical training"],"East Asia":["retail","services","manufacturing","technology"],"Southeast Asia":["hospitality","commerce","logistics","technical services"],"Central Asia":["trade","transport","public services","food processing"],"Middle East":["trade","retail services","construction","technology"],"Eastern Europe":["services","manufacturing","technical training","retail"],"Southern Europe":["hospitality","tourism","retail","trades"],"Northern Europe":["care services","technology","logistics","public services"],"Western Europe":["services","care","trades","business"],"North America":["retail","services","healthcare","technical training"],"South America":["retail","agricultural supply","transport","commerce"],"Central America":["retail","tourism","agriculture","trade"],"Caribbean":["tourism","retail","fisheries","public services"],"Oceania":["retail","services","trades","education"],"Pacific Islands":["fisheries","public services","retail","community tourism"]};
const specials={"IS":["winter daylight and long distances","seasonal tourism"],"NO":["ferries and travel distances","maritime work"],"FI":["school journeys through long winters","forestry services"],"SE":["commuting and apprenticeships","public services"],"CH":["cantonal language and training differences","vocational apprenticeships"],"BE":["language-region choices for school and work","logistics"],"NL":["cycling and local flood planning","port and service work"],"AT":["vocational schooling and regional travel","tourism services"],"DE":["dual vocational-training routes","manufacturing"],"CZ":["technical schooling and local industry","manufacturing"],"SK":["vocational schooling and commuting","auto-supply work"],"SI":["regional travel and technical schooling","tourism"],"HR":["coastal and inland labour markets","seasonal tourism"],"GR":["island and mainland travel costs","tourism"],"PT":["regional opportunities and migration","tourism"],"ES":["regional language and employment differences","hospitality"],"IT":["regional labour markets and family enterprises","family business"],"BD":["monsoon disruptions and household budgets","textile-related work"],"NP":["mountain travel to schools and clinics","tourism services"],"BT":["mountain routes and education access","public services"],"LK":["commuting and school routes","tourism"],"MV":["inter-island travel for study and care","hospitality"],"PK":["public examination routes and household costs","trades"],"IN":["competitive entrance exams and private coaching options","technical training"],"JP":["school club choices and rail commuting","service work"],"KR":["intense exam preparation and vocational alternatives","technology"],"CN":["rural–urban mobility and school access differences","manufacturing"],"TW":["technical schooling and city–rural opportunities","technology"],"HK":["housing size and long commutes","services"],"MN":["long travel distances and seasonal livelihoods","livestock services"],"PH":["inter-island travel and family responsibilities","hospitality"],"ID":["inter-island transport and public services","commerce"],"MY":["language and school stream choices","retail"],"TH":["seasonal employment and schooling choices","tourism"],"LA":["rural travel and school access","retail"],"KH":["school and transport costs","garment services"],"VN":["competitive schooling and urban migration","manufacturing"],"SG":["education tracking and public transport","technical services"],"TL":["remote services and family support","public sector"],"BN":["public sector and small business routes","services"],"MM":["school disruption and changing travel safety","local services"],"GH":["school fees, work and trotro travel","market services"],"NG":["differences between states and communities","trade"],"ET":["seasonal rainfall and urban migration","agriculture"],"KE":["transport cost and school opportunities","commerce"],"TZ":["distance to schools and healthcare","agriculture"],"UG":["family schooling costs and training","agriculture"],"RW":["hilly journeys and community services","retail"],"CD":["river travel and unequal access to services","trade"],"CI":["cocoa-linked livelihoods and urban commerce","retail"],"SN":["regional languages and market travel","trading"],"ML":["long-distance schooling and safety","livelihood services"],"NE":["water access and seasonal livelihoods","agriculture"],"ZA":["long commutes and uneven opportunity","retail"],"ZW":["income volatility and family support","trade"],"SD":["conflict-related displacement and family safety","local services"],"SS":["displacement and access to essential services","services"],"SO":["dry-season travel and access to school","trade"],"MA":["city and rural education routes","tourism"],"EG":["urban commuting and exam results","services"],"DZ":["training and regional labour markets","commerce"],"TN":["education and graduate jobs","services"],"BR":["urban transport and uneven educational access","retail"],"MX":["school-to-work pathways and mobility","manufacturing"],"AR":["price changes and household savings","retail"],"CL":["transport and further training choices","commerce"],"CO":["regional transport and city work","services"],"PE":["highland/coastal travel and schooling","commerce"],"BO":["highland journeys and regional trade","retail"],"EC":["coast/highland schooling differences","services"],"PY":["rural transport and training access","commerce"],"UY":["school and jobs in smaller towns","services"],"VE":["economic uncertainty and family remittances","retail"],"HT":["school costs and disruptions","trade"],"CU":["migration and household resources","services"],"JM":["training, travel and tourism","hospitality"],"DO":["tourism seasons and urban jobs","services"],"TT":["energy sector and local services","retail"],"GT":["rural school access and language differences","trade"],"HN":["commutes and work opportunities","services"],"SV":["family remittances and schooling","commerce"],"NI":["seasonal agricultural income and studies","agriculture"],"CR":["conservation tourism and technical training","tourism"],"PA":["canal-linked transport/logistics and city work","logistics"],"NZ":["regional travel and school decisions","services"],"AU":["distance to universities and vocational routes","trades"],"PG":["highland and island travel for services","retail"],"FJ":["inter-island transport and study","tourism"],"SB":["school travel across islands","fisheries"],"VU":["storm preparations and local livelihoods","tourism"],"WS":["inter-island families and work","public services"],"TO":["migration ties and household planning","retail"],"KI":["remote atoll travel and access to services","fisheries"],"TV":["very limited local training choices","public services"],"NR":["small-island services and work","public services"],"IR":["university entry and career uncertainty","retail"],"SA":["city commuting and labour market changes","services"],"AE":["expatriate and citizen employment distinctions","retail"],"QA":["labour market and transport choices","services"],"OM":["community services and training","logistics"],"BH":["city services and regional jobs","commerce"],"KW":["public and private work routes","services"],"JO":["university and family financing","retail"],"LB":["economic uncertainty and household budgeting","services"],"IL":["regional travel and school/work transitions","technology"],"PS":["movement restrictions and interrupted opportunities","local services"],"IQ":["public services and family support","commerce"],"SY":["displacement and disrupted education","local services"],"YE":["access to essential services and family safety","agriculture"],"TR":["competitive exams and regional work","services"],"AF":["education access and safety barriers","commerce"],"AZ":["city and regional job differences","services"],"AM":["education and outward migration choices","technology"],"GE":["training and urban work opportunities","tourism"],"KZ":["distance between cities and career options","logistics"],"UZ":["family enterprise and vocational training","trade"],"TJ":["mountain transport and seasonal jobs","commerce"],"KG":["rural travel and trade","services"],"TM":["urban–rural access to education","public services"]};
const PI='https://data.worldbank.org/indicator/';
const IND={population:'SP.POP.TOTL',birthRate:'SP.DYN.CBRT.IN',life:'SP.DYN.LE00.IN',under5:'SH.DYN.MORT',infant:'SP.DYN.IMRT.IN',urban:'SP.URB.TOTL.IN.ZS',vaccination:'SH.IMM.IDPT',gdpPpp:'NY.GDP.PCAP.PP.CD'};
let live={},attempted=false,pending=false,updated=null,worldDataState='waiting';
const srcLink=(key,code)=>PI+IND[key]+'?locations='+encodeURIComponent(code);
function readStored(){try{const x=JSON.parse(localStorage.getItem('ol-wb-facts-v1')||'null');if(x&&x.values&&typeof x.values==='object'){live=x.values;updated=x.updated;worldDataState='cached';return true;}}catch{}return false;}
// V5: historical browser cache disabled; reference data is frozen at the supplied year.
const byISO3=Object.fromEntries(O.COUNTRIES.map(c=>[(O.WORLD_META[c.code]?.iso3||''),c.code]));
function apply(countryMode){
 for(const c of O.COUNTRIES){const d=live[c.code];if(!d)continue;
 const life=d.life?.value;if(Number.isFinite(life)&&life>35&&life<100)c.life=life;
 const urban=d.urban?.value;if(Number.isFinite(urban)&&urban>=0&&urban<=100)c.urban=Math.round(urban);
 const pop=d.population,crude=d.birthRate;
 if(pop?.value>0&&crude?.value>0&&Math.abs(Number(pop.year)-Number(crude.year))<=4)c.births=Math.max(.0000001,pop.value*crude.value/1e9);
 }
}
if(Object.keys(live).length)apply();
O.WB_WORLD={status:()=>worldDataState,indicators:IND,meta:()=>({updated,count:Object.keys(live).length}),get:code=>live[code]||null};
O.worldFactHTML=function(s,esc){
 const code=s.country.code,d=live[code],name=esc(s.country.name),meta=O.WORLD_META[code]||{};
 const out=[`<div class="panel-label">${name} · international indicators</div>`];
 out.push(`<p class="tiny muted">Capital/reference centre: ${esc(meta.capital||'not recorded')}. Different regions and households within this country may have very different circumstances.</p>`);
 const defs=[['life','Life expectancy at birth','years',v=>v.toFixed(1)],['under5','Under-five mortality','deaths per 1,000 live births',v=>v.toFixed(1)],['infant','Infant mortality','deaths per 1,000 live births',v=>v.toFixed(1)],['vaccination','DPT immunization','% ages 12–23 months',v=>v.toFixed(1)],['urban','Urban population','% of population',v=>v.toFixed(1)],['gdpPpp','GDP per capita, PPP','current international $',v=>Math.round(v).toLocaleString()],['population','Population','people',v=>Math.round(v).toLocaleString()],['birthRate','Crude birth rate','births per 1,000 population',v=>v.toFixed(1)]];
 if(d&&Object.keys(d).length){for(const [key,label,units,fmt] of defs){const r=d[key];if(!r||!Number.isFinite(r.value))continue;out.push(`<div class="fact-bubble"><strong>ⓘ ${esc(label)} · ${fmt(r.value)} ${esc(units)}</strong><p class="tiny">World Bank, ${esc(r.year)} · <a target="_blank" rel="noopener noreferrer" href="${srcLink(key,code)}">Indicator source ↗</a></p></div>`);}}
 else out.push(`<div class="fact-bubble"><strong>Official country data not loaded</strong><p>World Bank indicators are retrieved when online and cached on this device. ${worldDataState==='loading'?'Loading official statistics…':'You may be offline, the API may be blocked, or indicators may be unavailable for this location.'} The starting income, mortality and school-access estimates displayed elsewhere are game assumptions.</p><a target="_blank" rel="noopener noreferrer" href="https://data.worldbank.org/country/${encodeURIComponent(code.toLowerCase())}">View country data at the World Bank ↗</a></div>`);
 out.push(`<p class="tiny muted">Sources: World Bank Open Data (most recent available observations, years vary by indicator). Population statistics describe groups, not a guaranteed outcome for this character. School access, household incomes and event choices are currently modelled, not verified national rates.</p>`);
 return out.join('');
};
function saveFacts(){try{localStorage.setItem('ol-wb-facts-v1',JSON.stringify({updated,values:live}));}catch{}}
// Fixed reference data: do not make automatic network requests.
O.refreshWorldData=async function(){ return false; };
// Preserve the original game's evidence for countries with no live World Bank indicator.
const formerEvidence=O.countryEvidence;
O.countryEvidence=function(s){const d=live[s.country.code],before=formerEvidence(s);
 if(!d)return before;
 const u=d.under5?.value??before.under5, i=d.infant?.value??before.infant,l=d.life?.value??before.life;
 return {...before,under5:u,infant:i,life:l,under5Source:d.under5?srcLink('under5',s.country.code):before.under5Source,lifeSource:d.life?srcLink('life',s.country.code):before.lifeSource,quality:(Number.isFinite(u)&&Number.isFinite(l))?'partial_empirical':before.quality};
};
// A country-wide national q5 and life expectancy can anchor an illustrative age curve, but is not a full life table.
const olderHazard=O.hazardAt,olderExpected=O.expectedYears;
const adult=(age)=>age<=14?.00025:age<=40?.00045+(age-14)*.000026:.001126*Math.exp(.095*(age-40));
const cache=new Map();
function params(c){const d=live[c.code];const q5=d?.under5?.value,l=d?.life?.value;
 if(!Number.isFinite(q5)||!Number.isFinite(l)||l<40||l>95)return null;
 const key=c.code+'|'+q5+'|'+l+'|'+(d.infant?.value??'');if(cache.has(key))return cache.get(key);
 const q=Math.max(.001,Math.min(.35,q5/1000)),qi=Math.min(q*.98,Math.max(.0001,(d.infant?.value??q5*.7)/1000));
 function hz(age,m){if(age===1)return qi;if(age<=5)return 1-Math.pow((1-q)/(1-qi),1/4);return 1-Math.exp(-m*adult(age));}
 function expected(m){let years=0,surv=1;for(let age=1;age<113;age++){years+=surv;surv*=1-Math.min(.9999,Math.max(0,hz(age,m)));}return years;}
 let lo=.02,hi=100;for(let i=0;i<42;i++){let mid=(lo+hi)/2;if(expected(mid)>l)lo=mid;else hi=mid;}
 const result={q,qi,m:(lo+hi)/2,expected,hz};cache.set(key,result);return result;
}
O.hazardAt=function(c,a){const x=params(c);return x?x.hz(a,x.m):olderHazard(c,a)};
O.expectedYears=function(c){const x=params(c);return x?x.expected(x.m):olderExpected(c)};
const countryPool=O.COUNTRY_POOLS||{};
const prevMake=O.makeName;
O.makeName=function(s,gender='F',surname=''){
 const rec=countryPool[s.country.code];if(!rec)return prevMake(s,gender,surname);
 return O.pick(s,gender==='M'?rec[0]:rec[1])+' '+(surname||O.pick(s,rec[2]));
};
// Match surname and close-family names to country-level pools rather than inheriting
// an unrelated region-wide surname. Existing saves are never rewritten.
const priorCreate=O.create;
O.create=function(settings){
 const s=priorCreate(settings);const p=countryPool[s.country.code];if(!p)return s;
 const previous=s.name.split(' ').at(-1),family=O.pick(s,p[2]);
 const change=n=>n.endsWith(' '+previous)?n.slice(0,-previous.length)+family:n;
 const originalName=s.name;s.name=change(s.name);s.first=s.name.split(' ')[0];
 for(const person of s.people){person.name=change(person.name);}
 if(s.birthDescription){s.birthDescription=s.birthDescription.replaceAll(previous,family).replaceAll(originalName,s.name);}
 for(const j of s.journal||[]){if(j.age===0){j.description=(j.description||'').replaceAll(previous,family);}}
 for(const snap of s.snapshots||[]){if(snap.age===0&&snap.data){snap.data.name=s.name;snap.data.people=s.people.map(x=>({...x}));}}
 return s;
};
const meta=O.WORLD_META||{};
function person(s){const m=s.people?.filter(p=>p.alive&&['Mother','Father','Sibling','Partner','Friend','Child','Mentor'].includes(p.role))||[];if(!m.length)return 'someone in your family';return O.personLabel(O.pick(s,m));}
function getLocale(s){const m=meta[s.country.code]||{},reg=s.country.region;const spec=specials[s.country.code]||[];return {m,reg,capital:m.capital||s.country.name,trip:m.island?'a boat or inter-island connection':m.landlocked?'overland travel':transports[reg]||'local transport',work:sectors[reg]||['small business','community services'],theme:spec[0]||'different opportunities between the capital and smaller communities',trade:spec[1]||'local services',language:m.languages?.[0]||null};}
function makeStory(s,ageGroup,slot){const d=getLocale(s),c=s.country.name,who=person(s),isLow=s.strata<=2,isWealthy=s.strata>=6,remote=!s.urban;
 const place=s.urban?'the urban area where you live':'your local community';const hometown=d.capital===c?'the capital region':d.capital;
 const monetary=isLow?'Limited household cash makes each change more consequential.':isWealthy?'Your household has enough savings to absorb many disruptions.':'You compare the costs against other family commitments.';
 const text={
 child:[
 ['The journey to school',`${who} discusses the journey to school with you. ${remote?'Long distances and the condition of local roads can affect attendance.':'Travel times and costs can influence school choice.'} In ${c}, access to schools varies by community and household resources. ${monetary}`],
 ['A family conversation about the future',`You hear about work and training opportunities around ${hometown}. ${who} wonders what kinds of skills you might want to learn someday. Your household circumstances shape what feels attainable.`],
 ['Where your family gets by',`Your family discusses ${d.theme}. The adults decide which expenses can wait. ${monetary} You begin noticing how other households make different decisions.`],
 ['A familiar place',`You grow accustomed to ${d.trip} and the sounds of ${place}. ${who} tells you about a time when their own childhood was different.`]],
 teen:[
 ['Two routes through education',`People around you compare school completion, paid work and training in ${c}. ${who} asks what you would like to do, while household money and ${d.theme} complicate the answer.`],
 ['A choice beyond the neighbourhood',`You hear about a course or entry-level job connected with ${d.trade}. It might involve travel toward ${hometown}, but relocation and tuition would affect your family. ${monetary}`],
 ['The everyday cost of ambition',`You compare the cost of ${d.trip} with study materials and activities you enjoy. ${who} says there may be a way forward, although no one can promise it.`],
 ['A local opportunity',`A notice about work in ${d.work[slot%d.work.length]} makes you consider whether you prefer practical training or further study. The information available depends on where you live.`]],
 young:[
 ['A possible livelihood',`An acquaintance mentions ${d.trade} employment in ${c}. You consider your skills, transport, wages and the people who depend on you. ${monetary}`],
 ['The cost of leaving',`You wonder whether moving closer to ${hometown} could change your career. Rent, travel, family responsibilities and local openings are uncertain, particularly as ${d.theme}.`],
 ['A conversation after work',`You talk with ${who} about ${d.theme}. Your choices are personal, but they take place inside an economy and family you did not choose.`],
 ['The local economy changes',`A friend working in ${d.work[slot%d.work.length]} describes a difficult month. You compare their situation with yours, and think about how family support changes the consequences of losing income.`]],
 midlife:[
 ['Decisions with dependants',`${who} asks how your family is coping. Education, healthcare, housing and earning a living compete for attention; ${d.theme} continues to shape what is possible.`],
 ['The changing neighbourhood',`While taking ${d.trip}, you remember earlier years in ${c}. Some faces and jobs have changed, but memories of people who helped you remain.`],
 ['The household balance sheet',`You think about the relationship between assets, debts and reliable income. ${monetary} You also wonder whether younger relatives face the same choices you did.`],
 ['A path you might have taken',`After hearing about ${d.trade}, you remember the choices you faced when you were younger. Success and hardship rarely follow a single decision.`]],
 elder:[
 ['A life alongside others',`You reflect on ${who} and the routines of ${place}. Your life has been shaped as much by people and chance as by personal ambition.`],
 ['The next generation',`Someone tells you about school and work options involving ${d.trade}. You wonder how different the young person's starting circumstances are from your own.`],
 ['A place that has changed',`You revisit a familiar route involving ${d.trip}. You notice how changes in ${c} have affected everyday life, not always in ways people expected.`],
 ['An old family story',`You remember how ${who} once spoke about ${d.theme}. The details feel sharper now that your own priorities have changed.`]]
 };
 const picked=text[ageGroup][slot];return {id:`world-${s.country.code}-${ageGroup}-${slot}`,type:'story',scene:slot===1?'city':slot===2?'home':'park',title:picked[0],description:picked[1],effect:'none'};
}
const priorPick=O.pickStories;
O.pickStories=function(s,n){const base=priorPick(s,n);if(!n)return base;
 const age=s.age,period=age<13?'child':age<19?'teen':age<36?'young':age<65?'midlife':'elder';
 // Country-specific event eligibility: never force a repeated story into the same life stage.
 if(!s.worldEventsSeen)s.worldEventsSeen={};const pool=[0,1,2,3].filter(i=>!s.worldEventsSeen[period+'-'+i]);
 if(!pool.length)return base;
 const chance=O.chance(s,.65);if(!chance)return base;
 const count=Math.min(n>=3?2:1,pool.length);
 for(let j=0;j<count;j++){
 const slot=O.pick(s,pool),idx=pool.indexOf(slot);pool.splice(idx,1);const x=makeStory(s,period,slot);
 base[O.int(s,0,base.length-1)]=x;s.worldEventsSeen[period+'-'+slot]=s.age;
 }
 return base;
};
// Add a realistic locale-aware decision for countries without bespoke decisions. Avoid replacing existing choices.
const separatelyAuthored=new Set(['GH','NG','ET','BD','IN','GB','HK','IR','PK','US','JP','PL']);
for(const c of O.COUNTRIES){if(separatelyAuthored.has(c.code))continue;const code=c.code;
 O.EVENTS.push({id:`world-education-choice-${code}`,min:15,max:23,category:`${c.name} · Education and work`,scene:'school',weight:12,
 when:s=>s.country.code===code&&s.age>=15&&!s.flags.studying&&!s.flags.worldEducationChoice,
 title:s=>`The next step in ${s.country.name}`,
 description:s=>{const d=getLocale(s);return `Your school years are changing. A route to further study competes with possible work in ${d.trade}. ${s.strata<=2?'Household income is tight and your family may need your help.':s.strata>=6?'Your family can finance further study, but expectations and interests still matter.':'Travel, tuition and family obligations all matter.'} These are modelled options, not a list of officially confirmed vacancies.`;},
 options:s=>[
 {label:'Explore further education or training',detail:'Costs time and potentially fees; educational opportunities vary between communities.',apply:st=>{st.flags.worldEducationChoice='training';O.adjust(st,{knowledge:5,stress:1});st.school=true;return 'You investigate study and training possibilities. Finding a place and paying for it are not guaranteed.'}},
 {label:`Seek work in ${(sectors[c.region]||['local services'])[0]}`,detail:'Earn money earlier, but the job search and future advancement remain uncertain.',apply:st=>{st.flags.worldEducationChoice='work';st.flags.jobSearching=true;O.adjust(st,{stress:1,knowledge:1});if(O.chance(st,.4+st.knowledge/300)){st.job='Entry-level '+(sectors[c.region]||['services'])[0]+' worker';st.income=Math.round(st.country.ppp*(.31+.25*O.rand(st)));return `You find entry-level work in ${st.job.replace('Entry-level ','')}. The starting pay is an illustrative game estimate.`}return 'You begin looking for work. An application is not a job offer.'}},
 {label:'Talk with family and wait for a better option',detail:'Preserve flexibility but lose time and possibly income.',apply:st=>{st.flags.worldEducationChoice='wait';O.adjust(st,{relationships:2,stress:2});return 'You discuss the decision with your household. The next step remains uncertain.'}}]
 });
 O.EVENTS.push({id:`world-mobility-choice-${code}`,min:22,max:48,category:`${c.name} · Opportunity`,scene:'city',weight:7,
 when:s=>s.country.code===code&&!s.flags.worldMobilityChoice&&s.age>=22,
 title:s=>`An opportunity away from home`,
 description:s=>{const d=getLocale(s);return `A contact mentions possibilities near ${d.capital}. You consider wages and training, but also housing, travel, responsibilities and your connection to the people around you. Moving is not guaranteed to be beneficial.`;},
 options:s=>[
 {label:'Investigate moving',detail:'Possible new opportunities but upfront costs and uncertainty.',apply:st=>{st.flags.worldMobilityChoice='explore';st.cash=Math.max(0,st.cash-Math.round(st.country.ppp*.04));O.adjust(st,{stress:2,knowledge:2});return 'You gather information about jobs and accommodation. You have not committed to relocating.'}},
 {label:'Stay where your network is',detail:'Preserve family support and local relationships.',apply:st=>{st.flags.worldMobilityChoice='stay';O.adjust(st,{relationships:3,stress:-1});return 'You decide that staying close to your existing network matters more for now.'}},
 {label:'Pursue distance-friendly training or work',detail:'May expand options without an immediate move.',apply:st=>{st.flags.worldMobilityChoice='train';O.adjust(st,{knowledge:3,stress:1});return 'You begin searching for training and work that might not require relocating.'}}]
 });
}
// Country-specific source is now available on first visit if online. Do not request permissions.
// v5 uses bundled country snapshot only; network retrieval disabled.
})(window.OL);