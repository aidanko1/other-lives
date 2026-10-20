const fs=require('node:fs'), vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const base=path.join(__dirname,'..'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const storage=new Map();let themeChange;const deviceTheme={matches:false,addEventListener(_event,fn){themeChange=fn}};const window={OL:{},matchMedia:()=>deviceTheme,dispatchEvent(){}};
const ctx=vm.createContext({window,OL:window.OL,console,Intl,Date,Math,JSON,Set,Map,Event:class{},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},document:{documentElement:{dataset:{}},querySelector:()=>null},setTimeout,clearTimeout});
for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
 const src=/src="\.\/(.*?)"/.exec(m[1]);let code=src?fs.readFileSync(path.join(base,src[1]),'utf8'):m[2];
 new vm.Script(code,{filename:src?.[1]||'inline'});
 if(code.includes('const $=s=>document.querySelector')||code.includes("'serviceWorker' in navigator")||code.includes('document.documentElement.dataset.theme=matchMedia'))continue;
 vm.runInContext(code,ctx,{filename:src?.[1]||'inline'});
}
const O=window.OL;
function adult(country='GB',seed=23){let s=O.create({country,seed});s.age=30;s.job='Retail worker';s.income=15000;s.cash=20000;s.debt=0;s.education=O.EDU[4];O.ensureClarity(s);return s;}
const bill=O.EVENTS.find(e=>e.id==='unexpected-expense');
{
 const s=adult();s.pending=bill.id;s.used[bill.id]=s.age;const description=bill.description(s),cash=s.cash,opts=bill.options(s);assert.equal(bill.description(s),description);const s2=JSON.parse(JSON.stringify(s));assert.equal(bill.description(s2),description);assert(O.applyChoice(s,0));assert(s.cash<cash);assert.equal(s.debt,0);assert(s.journal[0].money.cash<0);
}
{
 const s=adult();s.income=200000;s.cash=0;s.pending=bill.id;s.used[bill.id]=s.age;assert(bill.options(s)[0].disabled);const initial=JSON.stringify(s);assert.equal(O.applyChoice(s,0),false);assert.equal(JSON.stringify(s),initial);assert(O.applyChoice(s,1));assert(s.debt>0);assert.equal(s.flags.billPlans[0].balance,s.debt);
 s.agenda=[];s.month=0;s.cash=s.debt;const before=s.debt;O.advanceMonth(s);assert(s.debt<before);const paid=s.debt;O.advanceMonth(s);assert(s.debt<paid);
}
{
 const s=adult();assert.equal(O.EVENTS.find(e=>e.id==='local-career-GB').when(s),false);assert(O.startJobSearch(s,'pay').ok);const offers=O.careerOffers(s);assert(offers.length>0);assert(offers.every(j=>j.pay>s.income));assert(offers.every(j=>!['Doctor','Nurse','Teacher'].includes(j.title)));const old=JSON.stringify(offers);assert.equal(JSON.stringify(O.careerOffers(s)),old);assert.equal(O.EVENTS.find(e=>e.id==='career-search-results').when(s),false);s.age++;const ag=O.makeAgenda(s);assert(ag.some(e=>e.id==='career-search-results'));s.pending='career-search-results';assert(O.applyChoice(s,0));assert(!s.flags.jobSearching);assert(s.income>15000);
}
{
 const s=adult();s.people[0].age=82;s.people[0].alive=true;O.ensureClarity(s);assert(s.people[0].retired);assert.match(s.people[0].job,/Retired/);s.people[0].alive=false;s.flags.livingWithFamily=true;assert(!O.householdMembers(s).includes(s.people[0]));assert.match(O.familyHTML(s),/Died at/);
}
{
 const s=adult();const o=O.spendOffers(s).find(o=>o.delta&&Object.keys(o.delta).length);const before=s.happiness;assert(o.effectsHTML.includes('effect-chip'));const result=O.buy(s,o.id);assert(result.ok);assert(s.ledger.length);O.setCurrency('GBP');O.journal(s,'Purchase',`You spend ${O.money(100)}.`,'money');const entry=s.journal[0];assert.match(entry.description,/¤/);O.setCurrency('USD');assert.match(O.cleanLogText(s,entry.description),/US\$100/);O.setCurrency('GBP');assert.match(O.cleanLogText(s,entry.description),/£75/);
}
{
 const k=O.create({country:'KE',seed:17});assert.equal(O.countryEvidence(k).under5,38.8);let survival=1;for(let a=1;a<=5;a++)survival*=1-O.hazardAt(k.country,a);assert(Math.abs(survival-(1-.0388))<1e-9);
}
assert.equal(ctx.document.documentElement.dataset.theme,'light');deviceTheme.matches=true;themeChange();assert.equal(ctx.document.documentElement.dataset.theme,'dark');deviceTheme.matches=false;themeChange();assert.equal(ctx.document.documentElement.dataset.theme,'light');
// Regression cases from the reported playthrough, including legacy queued stories.
for(const age of [0,2,4])for(let seed=1;seed<=15;seed++){
 const s=O.create({country:'CN',seed});s.age=age;const entries=O.pickStories(s,4);
 assert(entries.every(x=>O.storyAllowed(s,x)),`age ${age} unsuitable story`);
 if(age<3)assert(entries.every(x=>!/work and training|journey to school|career|university/i.test(x.title+' '+x.description)));
 const before=s.journal.length;O.fireStory(s,{title:'A family conversation about the future',description:'Work and training opportunities around Beijing. Mom discusses university.',effect:'legacy-bad-story'});assert.equal(s.journal.length,before);
}
{
 const s=adult();s.cash=0;s.income=0;s.debt=50000;
 const mortgage=O.planOffers(s).find(x=>x.id==='mortgage');assert(mortgage.reason);assert(!O.planAction(s,'mortgage').ok);assert.equal(s.debt,50000);assert.equal(s.cash,0);
 s.pending=bill.id;assert(bill.options(s)[1].disabled);assert(!O.applyChoice(s,1));
 const html=O.spendHTML(s);assert.match(html,/available savings/);assert.match(html,/Not available yet/);assert.match(html,/Credit & borrowing/);
}
{
 const s=adult();s.income=100000;s.cash=1000000;s.knowledge=70;s.experience.totalYears=10;
 const option=O.planOffers(s).find(x=>x.id==='mortgage');assert(!option.reason,option.reason);const worth=O.netWorth(s);assert(O.planAction(s,'mortgage').ok);const loan=s.housing.mortgage.balance;
 assert.equal(s.debt,loan);assert(Math.abs(O.netWorth(s)-(worth-s.housing.value*.03))<=2,'deposit and loan must not create wealth');
 const expectedPrincipal=Math.min(loan,s.housing.mortgage.annual-Math.round(loan*.05));O.passive(s);assert.equal(s.housing.mortgage.balance,loan-expectedPrincipal);assert(s.debt>=s.housing.mortgage.balance);
 const investment=O.planOffers(s).find(x=>x.id==='rental-property');if(!investment.reason){O.planAction(s,investment.id);const invested=s.flags.rentalPropertyValue;O.planAction(s,'sell-home');assert.equal(s.property,invested,'selling home must keep investment property');}
}
{
 const s=adult();s.health=90;s.happiness=80;s.stress=0;const healthy=O.earnedIncome(s);s.health=15;assert(O.earnedIncome(s)<healthy*.5);s.health=90;s.happiness=0;assert(O.earnedIncome(s)<healthy);s.health=0;s.pending=null;assert(O.advanceMonth(s).finished);assert.equal(s.status,'finished');
 const isolated=adult();isolated.relationships=0;const close=isolated.people[0].close;O.passive(isolated);assert(isolated.people[0].close<close||!isolated.people[0].alive);assert(isolated.journal.some(x=>x.title==='You have become isolated'));
}
{
 const s=adult();s.interests=['Learning','Community','History'];s.experience.hobbies.Learning={years:2,level:8};O.ensureClarity(s);assert.equal(s.interests.join(','),'History');assert(!s.experience.hobbies.Learning);
 const avatar=O.spriteAvatar;O.spriteAvatar=()=>'';const html=O.profileHTML(s);O.spriteAvatar=avatar;assert.match(html,/IDENTITY RECORD/);assert(!/Health \/ wellbeing|Learning \/ bonds/.test(html));assert.match(html,/History/);
 s.percentile=.5;assert.equal(O.quintile(s),1);s.percentile=80.1;assert.equal(O.quintile(s),5);
 const all=O.pickStories(s,5),item=all[0];O.fireStory(s,item);const count=s.journal.length;O.fireStory(s,item);assert.equal(s.journal.length,count,'same memory must not repeat');
}
{
 const s=adult(),draws=[];const context={fillRect(...args){assert(args.slice(0,4).every(Number.isInteger),'all sprite coordinates must be integer pixels');draws.push(args);},set fillStyle(v){},imageSmoothingEnabled:true};const canvas={getContext:()=>context,setAttribute(){}};O.drawScene(canvas,'home',s);assert.equal(canvas.width,384);assert.equal(canvas.height,128);assert(draws.length>100);
 const appearance=JSON.stringify(s.appearance);O.drawScene(canvas,'clinic',s);assert.equal(JSON.stringify(s.appearance),appearance,'appearance must persist across events');
}
if(process.argv.includes('--fixture')){const s=adult('GB',47);s.age=41;s.month=3;s.pending=null;s.agenda=[];s.school=false;s.job='Office administrator';s.income=26000;s.cash=5500;s.debt=1800;s.flags.livingWithFamily=true;s.memories.pet={kind:'cat',name:'Milo',age:2,alive:true};s.people[0].age=78;s.people[0].alive=true;s.people[0].job='Technician';s.people[0].retired=false;s.people[1].alive=false;s.people[1].diedAt=69;s.people[1].age=69;s.interests=['Technology','Art'];s.experience={totalYears:20,roles:{'Office administrator':12},hobbies:{Art:{years:8,level:22},Technology:{years:10,level:30}},trackedFrom:0};O.ensureClarity(s);O.journal(s,'A quieter evening at home','After work, you spend an hour on an old interest. Milo settles in a patch of sunlight.','life');fs.writeFileSync(path.join(base,'preview','qa-adult.json'),JSON.stringify(s));process.exit(0);}
for(const age of [0,7,30,65]){const s=adult('GB',age+83);s.age=age;assert(O.pickStories(s,2).every(e=>e.title&&e.description));assert(!O.survivalHTML(s).includes('NaN'));}
{const s=adult();s.interests=['Art'];s.flags.searchMode='interest';assert(O.careerOffers(s).some(j=>j.title==='Design studio assistant'));s.flags.searchMode='pay';s.income=100000000;assert.equal(O.careerOffers(s).length,0);}
let lives=0;
for(const c of (process.argv.includes('--quick')?[]:O.COUNTRIES.filter(c=>['GB','HK','GH','NG','KE','IN','BD','JP','US','IR','ET','PL'].includes(c.code)))){console.log('Simulating',c.code);const s=O.create({country:c.code,seed:71});let steps=0;while(s.status==='alive'&&s.age<90&&steps++<3000){if(s.pending){const e=O.EVENTS.find(x=>x.id===s.pending);const options=e.options(s);const i=options.findIndex(x=>!x.disabled);assert(i>=0,`${c.code} ${e.id} has no available option`);assert(O.applyChoice(s,i));}else O.advanceMonth(s);assert(Number.isFinite(s.cash)&&Number.isFinite(s.debt)&&s.cash>=0&&s.debt>=0,c.code+' invalid finances');}assert(steps<3000,c.code+' stalled');lives++;}
console.log(`PASS: bill persistence and affordability, instalments, directed career offers, retirement/household, spending previews, currency, device theme switching, narrative/survival rendering, Kenya mortality anchor; ${lives} country life simulations.`);
