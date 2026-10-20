/* Other Lives v5.4 – developmental audit and country-specific everyday narrative.
 * Local food and custom examples are optional contextual possibilities, not ethnic/religious rules.
 * Events with unsupported ages are restricted; the old Life Archive schema is retained.
 */
(function(O){
'use strict';
O.VERSION='5.4.0';
const FOOD = {"GH":["waakye","banku","rice and stew"],"NG":["jollof rice","egusi soup","yam and stew"],"ET":["injera","shiro","bread and tea"],"KE":["ugali","sukuma wiki","chapati"],"UG":["matoke","posho","groundnut stew"],"TZ":["ugali","pilau","beans and rice"],"RW":["ibihaza","beans and plantain","isombe"],"ZA":["pap","chakalaka","samp and beans"],"ZW":["sadza","vegetable relish","peanut stew"],"SN":["ceebu jën","yassa","thiakry"],"CI":["attiéké","alloco","rice and sauce"],"MA":["tagine","couscous","harira"],"TN":["brik","couscous","ojja"],"EG":["koshari","ful medames","baladi bread"],"DZ":["couscous","chorba","flatbread"],"BD":["dal and rice","bhorta","pitha"],"IN":["dal and rice","roti and sabzi","idli"],"PK":["roti and dal","biryani","chana"],"LK":["rice and curry","hoppers","kiribath"],"NP":["dal bhat","momo","sel roti"],"AF":["bolani","rice and stew","mantoo"],"BT":["ema datshi","red rice","momo"],"IR":["tahdig","ghormeh sabzi","ash reshteh"],"TR":["mercimek çorbası","simit","menemen"],"LB":["manakish","tabbouleh","lentil soup"],"JO":["mansaf","maqluba","falafel"],"SA":["kabsa","dates and coffee","jareesh"],"AE":["machboos","luqaimat","harees"],"HK":["congee","wonton noodles","pineapple bun"],"CN":["noodle soup","congee","dumplings"],"TW":["beef noodle soup","lu rou fan","scallion pancake"],"JP":["onigiri","miso soup","rice and grilled fish"],"KR":["kimchi jjigae","bibimbap","gimbap"],"TH":["khao pad","som tam","noodle soup"],"VN":["phở","cơm tấm","bánh mì"],"MY":["nasi lemak","roti canai","laksa"],"SG":["chicken rice","kaya toast","laksa"],"ID":["nasi goreng","gado-gado","soto ayam"],"PH":["adobo","sinigang","pandesal"],"KH":["fish amok","rice porridge","nom banh chok"],"LA":["sticky rice","larb","noodle soup"],"MM":["mohinga","shan noodles","tea-leaf salad"],"GB":["beans on toast","a roast dinner","fish and chips"],"IE":["soda bread","stew","porridge"],"FR":["baguette and cheese","pot-au-feu","crêpes"],"DE":["bread rolls","potato soup","pretzels"],"IT":["pasta al pomodoro","risotto","minestrone"],"ES":["tortilla española","lentil stew","pan con tomate"],"PT":["caldo verde","bacalhau","soup and bread"],"PL":["pierogi","żurek","kasza"],"UA":["borshch","varenyky","buckwheat"],"GR":["spanakopita","fasolada","souvlaki"],"NL":["stamppot","erwtensoep","bread with cheese"],"BE":["stoemp","waffles","soup and bread"],"SE":["meatballs and potatoes","knäckebröd","pea soup"],"NO":["fish soup","open sandwiches","lapskaus"],"FI":["salmon soup","rye bread","porridge"],"DK":["smørrebrød","frikadeller","rye bread"],"US":["sandwiches","macaroni and cheese","chili"],"CA":["poutine","soup and bread","butter tarts"],"MX":["tacos","tamales","pozole"],"GT":["pepian","tamales","black beans and tortillas"],"CR":["gallo pinto","casado","olla de carne"],"BR":["rice and beans","feijoada","pão de queijo"],"AR":["empanadas","milanesa","locro"],"CL":["pastel de choclo","empanadas","porotos granados"],"CO":["arepas","ajiaco","sancocho"],"PE":["lomo saltado","ají de gallina","ceviche"],"BO":["salteñas","sopa de maní","pique macho"],"EC":["encebollado","llapingachos","locro de papa"],"VE":["arepas","pabellón criollo","cachapas"],"CU":["rice and black beans","ropa vieja","yuca con mojo"],"JM":["ackee and saltfish","rice and peas","patty"],"DO":["mangú","la bandera","sancocho"],"AU":["meat pie","barbecued food","savoury toast"],"NZ":["hangi","meat pie","fish and chips"],"FJ":["kokoda","rourou","rice and curry"],"WS":["oka","taro","palusami"],"TO":["lu sipi","taro","ota ika"],"AL":["byrek","tavë kosi","qofte"],"AM":["lavash","harissa","dolma"],"AO":["funge","calulu","muamba de galinha"],"AT":["bread rolls","apple strudel","potato goulash"],"AZ":["plov","qutab","dolma"],"BG":["banitsa","shopska salad","bean soup"],"BJ":["akassa","amiwo","maize porridge"],"BW":["seswaa","bogobe","dikgobe"],"CH":["rösti","birchermüesli","cheese fondue"],"CM":["ndolé","koki","eru"],"CY":["halloumi","souvlaki","kleftiko"],"CZ":["bramboráky","koláče","svíčková"],"EE":["black rye bread","mulgipuder","kama"],"GE":["khachapuri","lobio","khinkali"],"HN":["baleadas","pastelitos","sopa de caracol"],"HR":["štrukli","ćevapi","black risotto"],"HT":["griot","diri ak djon djon","soup joumou"],"HU":["gulyás","lángos","chicken paprikash"],"IL":["sabich","shakshuka","challah"],"IQ":["masgouf","kubba","dolma"],"IS":["skyr","rye bread","plokkfiskur"],"KG":["laghman","beshbarmak","manty"],"KW":["machboos","harees","balaleet"],"KZ":["baursak","beshbarmak","kuyrdak"],"LT":["cepelinai","šaltibarščiai","rye bread"],"LU":["gromperekichelcher","judd mat gaardebounen","quetschentaart"],"LV":["grey peas","rye bread","sklandrausis"],"MD":["plăcintă","mămăligă","zeamă"],"ML":["tô","tigadèguèna","rice with sauce"],"MN":["buuz","khuushuur","tsuivan"],"MT":["pastizzi","ftira","rabbit stew"],"MV":["mas huni","garudhiya","roshi"],"MZ":["matapa","xima","piri-piri chicken"],"NE":["dambou","millet porridge","tuwo"],"NI":["gallo pinto","nacatamales","vigorón"],"OM":["shuwa","majboos","halwa"],"PA":["sancocho","arroz con pollo","hojaldres"],"PY":["chipa","sopa paraguaya","mbeju"],"QA":["machboos","balaleet","thareed"],"RO":["sarmale","mămăligă","ciorbă"],"RS":["sarma","ajvar","proja"],"RU":["blini","pelmeni","shchi"],"SD":["ful medames","kisra","asida"],"SI":["potica","jota","žlikrofi"],"SK":["bryndzové halušky","kapustnica","lokše"],"SV":["pupusas","yuca frita","panes con pollo"],"TJ":["qurutob","osh","sambusa"],"TM":["plov","dograma","manty"],"UY":["chivito","asado","tortas fritas"],"UZ":["plov","samsa","lagman"],"YE":["saltah","mandi","bint al-sahn"],"ZM":["nshima","ifisashi","kapenta"]};
O.FOOD_EXAMPLES=FOOD;
const profiles=O.CULTURAL_SNAPSHOT||{}, particulars=O.COUNTRY_DETAILS||{}, travel=O.TRAVEL_CONTEXT||{};
const forbiddenYoung=/(?:coaching|exam(?:ination)? preparation|university|college admission|career advice|job offer|apprentice(?:ship)?|take out a loan|borrow money|mortgage|invest(?:ment|ing)?|financial planning|tuition fees|pay for tutoring|income tax|contract negotiation|manage.*budget|apply for a job|school qualifications|choose.*career|household budget decision)/i;
const infantWork=/(?:school fees|coaching|competitive exams|entrance exams|business plan|investment|university|career|household budget|school leav(?:ing|er)|vocational|college|mortgage|apprenticeship)/i;
const adulthoodEventIds=['housing-crisis','predatory-loan','unexpected-expense','mortgage-or-rent','invest-money','start-business','migration','wealth-management','wealth-network','wealth-expectations','technology-change','life-circumstances','neighbourhood-change','uncertain-safety'];
for(const e of O.EVENTS){
 if(adulthoodEventIds.includes(e.id))e.min=Math.max(18,e.min);
 if(e.id==='food-insecurity')e.min=Math.max(e.min,18);
 if(e.id==='school-costs')e.min=Math.max(e.min,13);
 if(e.id==='private-tutoring')e.min=Math.max(e.min,9);
 if(e.id==='mentor')e.min=Math.max(e.min,13);
 if(e.id==='named-job-offer')e.min=Math.max(e.min,18);
 if(e.id==='ghana-family-expectations')e.min=Math.max(e.min,15);
}
const ageEvent=O.chooseEvent;
O.chooseEvent=function(s){
 // Filter on the *available options* too. A legacy story can contain adult choices
 // even when its numerical minAge appears valid.
 const unavailable=[];
 for(const e of O.EVENTS){if(s.age>=18||s.age<e.min||s.age>e.max||!e.when(s))continue;
   let opts=[];try{opts=e.options(s)||[];}catch{}
   const text=[e.title(s),e.description(s),...opts.map(o=>o.label+' '+o.detail)].join(' ');
   if((s.age<6&&infantWork.test(text))||(s.age<12&&forbiddenYoung.test(text))){unavailable.push([e,e.weight]);e.weight=0;}
 }
 let result;
 try{result=ageEvent(s)}finally{for(const [e,w] of unavailable)e.weight=w;}
 if(result&&unavailable.some(([e])=>e.id===result.id))return null;
 return result;
};
// The journal is presented conversationally; exact names remain in relationship profiles.
const oldJournal=O.journal;
function clean(s,value){
 let t=String(value??'');
 // Remove *role (name)* labels without altering somebody else who happens
 // to share that name (for example a child named after their mother).
 for(const p of s.people||[]){
   const role=O.parentRole?O.parentRole(p):p.role;
   if(role==='Mother'||role==='Father'){
     const plain=role==='Mother'?'Mom':'Dad';
     for(const prefix of [plain,role,role.toLowerCase(),'Parent','parent']) t=t.split(prefix+' ('+p.name+')').join(plain);
   }else{
     for(const prefix of [role,role.toLowerCase(),'Friend','Sibling','Partner','Child','Mentor','Grandparent'])t=t.split(prefix+' ('+p.name+')').join(p.name);
   }
 }
 return t.replace(/\b(Mom|Dad|Mother|Father|Parent|Friend|Sibling|Partner|Child|Mentor|Grandparent)\s*\(([^()]{2,90})\)/g,(_,r,n)=>r==='Mother'||r==='Mom'?'Mom':r==='Father'||r==='Dad'?'Dad':n);
}
O.journal=function(s,title,desc,type){return oldJournal(s,clean(s,title),clean(s,desc),type)};
const previousEnsure=O.ensureTimeline;
O.ensureTimeline=function(s){const r=previousEnsure(s);if(s&&Array.isArray(s.journal)&&!s.flags.journalAgeCleaned54){for(const e of s.journal){e.title=clean(s,e.title);e.description=clean(s,e.description);}s.flags.journalAgeCleaned54=true;}return r};
const prevCreate=O.create;
O.create=function(opts){const s=prevCreate(opts);O.ensureTimeline(s);return s};
function familyName(s){const mother=(s.people||[]).find(p=>p.alive&&p.role==='Mother');const dad=(s.people||[]).find(p=>p.alive&&p.role==='Father');return mother?'Mom':dad?'Dad':'a caregiver'}
function choice(s,a){return O.pick(s,a)}
function scene(s){const code=s.country.code, p=profiles[code]||{}, d=particulars[code]||[], foods=FOOD[code]||[];
 const family=familyName(s), kids=(s.people||[]).filter(x=>x.role==='Sibling'&&x.alive).length;
 const mode=(s.age+((s.seed>>>5)%7))%7;
 const means=s.strata<=1?'Money is tight and even small errands require planning.':s.strata>=6?'The household can generally afford shortcuts that others cannot.':'The adults weigh time, transport and everyday costs.';
 const neighbourhood=s.urban?'your neighbourhood':'the community around your home';
 const journeys=d[0]||travel[s.country.region]||'the route between nearby homes, shops and services';
 const occupation=d[1]||'the kinds of work available locally';
 const tradition=p.name||'a local occasion';
 const ceremony=p.detail||'neighbours gathering and making plans';
 const dish=foods.length?foods[(s.age+(s.seed%foods.length))%foods.length]:null;
 const adopted=!!s.flags.observesTradition;
 const suffix=`This is one possible household experience in ${s.country.name}; other families have different routines.`;
 if(s.age<=2)return {title:`The people caring for you`,scene:'home',effect:'country-care',description:`${family} plans meals, rest and small errands around looking after you. Outside, people are busy with ${journeys}. ${means} You are too young to make these decisions, but their effects shape your early childhood.`};
 if(s.age<=5){
  if(mode%2===0&&dish)return {title:'A kitchen full of sounds',scene:'home',effect:'country-food',description:`Someone nearby is preparing ${dish}, one of many dishes found in ${s.country.name}. You notice smells, voices and clattering dishes while the grown-ups prepare a meal. ${family} helps you with your own food. ${suffix}`};
  return {title:`A small outing near home`,scene:'park',effect:'country-errand',description:`You accompany ${family} through ${neighbourhood}. The adults organise the trip around ${journeys}; you are more interested in the people and sounds around you. ${means}`};
 }
 if(mode===0){
   const text=adopted?`Your household sometimes joins ${tradition}: ${ceremony.toLowerCase()}.`:`People around you prepare for ${tradition}: ${ceremony.toLowerCase()}, although your family does not usually take part.`;
   return {title:`What the community celebrates`,scene:'city',effect:'country-tradition',description:`${text} ${s.age<12?`You ask ${family} what it means.`:'You think about how different households mark the occasion.'} Celebrations differ across religion, region and family.`};
 }
 if(mode===1&&dish){
   s.flags.culturalMeal=dish;
   return {title:`The taste of an ordinary day`,scene:'home',effect:'country-food',description:`There is ${dish} at a meal or food stall near you, one of several familiar options in ${s.country.name}. ${s.age<12?`${family} chooses what your household can afford.`:'Prices and tastes shape what you eat.'} ${means} ${suffix}`};
 }
 if(mode===2){
   return {title:'Getting to where you need to be',scene:'city',effect:'country-journey',description:`For a school day, errand or appointment, ${journeys} affects the family's plans. ${s.age<12?`${family} decides when it is safe to go.`:s.age<18?'You are gradually trusted to make parts of the journey yourself.':'You weigh how long the journey takes against work and other responsibilities.'} ${means}`};
 }
 if(mode===3){
  const help=s.age<12?`You help ${family} with a small task, while adults handle work and money.`:s.age<18?'You take on more chores, but school and rest still matter.':'You juggle responsibilities alongside your own needs.';
  return {title:'Another day in the household',scene:'home',effect:'country-family',description:`${help} ${kids?`There ${kids===1?'is one sibling':'are '+kids+' siblings'} sharing the space and attention.`:'Different generations have their own routines.'} Around you, livelihoods involving ${occupation} influence when people are at home. ${means}`};
 }
 if(mode===4){
  return {title:`A change in the neighbourhood`,scene:'shop',effect:'country-place',description:`In ${s.country.name}, neighbours discuss ${journeys} and what has changed lately. ${s.age<12?'You listen as adults make plans.':s.age<18?'You start noticing which choices your friends have and which they do not.':'You see how access to services, work and time can change across households.'} ${suffix}`};
 }
 if(mode===5&&s.age>=13&&s.flags.culturalMeal){
  return {title:'A taste that brings back memories',scene:'home',effect:'country-memory',description:`A familiar smell reminds you of ${s.flags.culturalMeal} and a meal from childhood. You find yourself thinking about ${family} and how home has changed since then.`};
 }
 if(dish)return {title:'Eating together',scene:'home',effect:'country-meal',description:`Someone suggests ${dish}, one of many food options found around ${s.country.name}. ${s.age<12?'You look forward to the meal and conversations.':s.age<18?'You talk about friends and the day while people eat.':'The conversation moves between work, family plans and ordinary concerns.'} ${means}`};
 return {title:'Life around you',scene:'park',effect:'country-routine',description:`The rhythm of ${neighbourhood} includes ${journeys} and ${occupation}. ${s.age<12?'You are still learning what the adults around you do.':'You notice how different households and communities make different choices.'} ${suffix}`};
}
const oldStories=O.pickStories;
O.pickStories=function(s,n){
 let entries=oldStories(s,n);
 if(!Array.isArray(entries)||!entries.length||!profiles[s.country.code])return entries;
 if(s.age<12){
  // Filter all generated records, not just major decision cards; prevents a three-year-old discussing coaching or loans.
  entries=entries.map(e=>{
   const t=String(e.title||'')+' '+String(e.description||'');
   if((s.age<6&&infantWork.test(t))||forbiddenYoung.test(t))return scene(s);
   return e;
  });
 }
 // A contextual everyday experience is part of each childhood year, with some adult years as well.
 if(s.age<=19 || O.chance(s,.58)){
   const local=scene(s), i=(s.age+(s.seed%entries.length))%entries.length;
   entries[i]=local;
 }
 return entries.map(e=>({...e,title:clean(s,e.title),description:clean(s,e.description)}));
};
const priorMakeAgenda=O.makeAgenda;
O.makeAgenda=function(s){
 const agenda=priorMakeAgenda(s);
 return agenda.map(a=>{
  if(a.type!=='decision')return a;
  const e=O.EVENTS.find(ev=>ev.id===a.id);
  if(!e||s.age>=18)return a;
  const txt=[e.title(s),e.description(s),...(e.options(s)||[]).map(o=>o.label+' '+o.detail)].join(' ');
  if((s.age<6&&infantWork.test(txt))||(s.age<12&&forbiddenYoung.test(txt))||s.age<e.min){
   const item=scene(s);return {...a,...item,type:'story'};
  }
  return a;
 });
};
O.AGE_AUDIT={version:'5.4',hasCountry:code=>!!profiles[code],foodExamples:code=>(FOOD[code]||[]).slice(),checkAge:(s)=>{
 let errors=[];
 if(s.age<12&&O.spendOffers&&O.spendOffers(s).length)errors.push('child_spending');
 for(const e of O.EVENTS.filter(e=>s.age>=e.min&&s.age<=e.max)){
  if(s.age<6&&infantWork.test(e.title(s)+' '+e.description(s)))errors.push(e.id);
 }
 return errors;
}};
})(window.OL);