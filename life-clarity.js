/* Other Lives 5.7: transparent choices and persistent lives.
 * New sprite art and narratives are original. Money uses fixed GAME display scales,
 * not live FX or verified local wages. Mortality limits are exposed in the UI.
 */
(function(O){
'use strict';
O.VERSION='5.7.0';
const hash=value=>{let h=2166136261;for(const c of String(value))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=s=>JSON.parse(JSON.stringify(s));
const rates={GBP:.75,USD:1,HKD:7.8,EUR:.9};
let currency='GBP';try{currency=localStorage.getItem('other-lives-currency')||'GBP'}catch{}
if(!rates[currency])currency='GBP';
O.currency=()=>currency;
O.setCurrency=value=>{if(rates[value]){currency=value;try{localStorage.setItem('other-lives-currency',value)}catch{}}};
const moneyFormats=Object.fromEntries(Object.keys(rates).map(currency=>[currency,new Intl.NumberFormat('en-GB',{style:'currency',currency,maximumFractionDigits:0})]));
O.money=n=>moneyFormats[currency].format((Number(n)||0)*rates[currency]);
O.currencySelector=()=>`<label class="currency-choice">Currency <select aria-label="Display currency" data-change="currency">${Object.keys(rates).map(c=>`<option ${c===currency?'selected':''}>${c}</option>`).join('')}</select></label>`;
// Values in saved stories are canonical base-unit tokens, formatted only for display.
const symbols={GBP:'£',USD:'US$',HKD:'HK$',EUR:'€'};
function canonical(text){let value=String(text??'');const sym=symbols[currency].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return value.replace(new RegExp('(-?)'+sym+'([\\d,]+)','g'),(_m,neg,n)=>`¤${Math.round(Number(n.replace(/,/g,''))/rates[currency])*(neg?-1:1)}¤`);}
const cleanText=O.cleanLogText||((_s,t)=>String(t??''));
O.cleanLogText=(s,t)=>cleanText(s,t).replace(/\$([\d,]+)/g,(_m,n)=>O.money(Number(n.replace(/,/g,'')))).replace(/¤(-?\d+)¤/g,(_m,n)=>O.money(Number(n)));
const priorJournal=O.journal;
O.journal=function(s,title,description,type){priorJournal(s,canonical(title),canonical(description),type);const e=s.journal[0];e.title=canonical(e.title);e.description=canonical(e.description);if(s.activeMoneyChange)e.money=s.activeMoneyChange;};
const amounts=s=>({cash:s.cash||0,debt:s.debt||0,income:s.income||0,investments:s.investments||0,property:s.property||0});
const diff=(before,after)=>Object.fromEntries(Object.keys(before).map(k=>[k,Math.round(after[k]-before[k])]));
function changesHTML(delta){const names={health:'Health',happiness:'Happiness',knowledge:'Learning',relationships:'Bonds',stress:'Stress',confidence:'Confidence'};return Object.entries(delta||{}).filter(([k,n])=>names[k]&&n).map(([k,n])=>`<span class="effect-chip ${(k==='stress'?n<0:n>0)?'positive':'negative'}">${esc(names[k])} ${n>0?'+':''}${n}</span>`).join('');}
O.effectsHTML=changesHTML;
function ensure(s){
 if(!s)return s; s.flags??={};s.people??=[];s.interests??=[];s.memories??={};s.ledger??=[];if(/^(job-offer|named-job-offer|local-career-|local-job-choice-)/.test(s.pending||'')){s.pending='career-search-results';s.flags.jobSearching=true;s.flags.searchMode='pay';s.flags.searchReady=s.age;}
 if(!s.experience){s.experience={totalYears:s.yearsWorked||0,roles:{},hobbies:{},trackedFrom:s.age};if(s.job&&s.job!=='Retired')s.experience.roles[s.job]=s.workYears||0;}
 for(const hobby of s.interests)if(!s.experience.hobbies[hobby])s.experience.hobbies[hobby]={years:0,level:0};
 if(s.flags.livingWithFamily===undefined)s.flags.livingWithFamily=s.age<18;
 for(const p of s.people){
  if(p.alive===false&&p.diedAt===undefined)p.diedAt=p.age;
  if(p.alive&&p.age>=70&&!p.retired&&p.job&&p.job!=='—')retirePerson(s,p,false);
 }
 return s;
}
O.ensureClarity=ensure;
const create=O.create;O.create=function(settings){const s=create(settings);ensure(s);s.flags.livingWithFamily=true;return s};
function retirePerson(s,p,announce){
 p.previousJob=p.job;p.retired=true;p.job='Retired '+p.job.toLowerCase();p.previousIncome=p.annualIncome||0;p.annualIncome=Math.round(p.previousIncome*(s.country.infra>=70?.45:.15));
 if(announce)O.journal(s,`${p.name.split(' ')[0]} retires`,`${p.name}, ${p.age}, steps back from ${p.previousJob.toLowerCase()}. Estimated yearly retirement income: ${O.money(p.annualIncome)}. Family support and daily routines change.`,'family');
}
O.personDeathRisk=(s,p)=>{const base=O.hazardAt?O.hazardAt(s.country,p.age):.001*Math.exp(Math.max(0,p.age-40)*.09);return Math.min(.98,base*(p.gender==='M'?1.07:.94)*(1+Math.max(0,45-(p.health||65))*.008));};
O.personCause=(s,p)=>p.age<5?'complications of an acute childhood illness':p.age<40?'an acute illness or injury':p.age<70?'a serious cardiovascular illness or cancer':'complications of cardiovascular illness or frailty';
O.householdMembers=s=>{return s.people.filter(p=>p.alive&&(
 (['Mother','Father','Parent','Grandparent','Sibling'].includes(p.role)&&s.flags.livingWithFamily&&!p.movedOut)||
 (p.role==='Partner'&&p.residence!=='Separate home')||
 (p.role==='Child'&&!p.movedOut&&p.residence!=='Separate home')
 ));};
O.householdCaption=s=>{const people=O.householdMembers(s);const pet=s.memories?.pet;return `${s.urban?'Urban':'Rural'} ${s.country.name} · ${s.flags.livingWithFamily?'Family home':s.property>0?'Your own home':'Rented home'} · ${people.length?'With '+people.map(p=>p.role==='Mother'?'Mom':p.role==='Father'?'Dad':p.name.split(' ')[0]).join(', '):'Living independently'}${pet?.alive?' and '+pet.name+' the '+pet.kind:''}`;};
O.householdAges=s=>[`You, ${s.age}`,...O.householdMembers(s).map(p=>`${p.name.split(' ')[0]}, ${p.age}`),...(s.memories?.pet?.alive?[`${s.memories.pet.name}, ${s.memories.pet.age}`]:[])].join(' · ');
// A search is an action. Legacy random job-change windows are replaced by this one flow.
for(const e of O.EVENTS)if(/^(job-offer|named-job-offer|local-career-|local-job-choice-|world-.*job)/.test(e.id))e.when=()=>false;
const roleMatch=(s,title)=>{
 const interests=(s.interests.join(' ')+' '+(s.flags.personalThread||'')).toLowerCase();
 return (/technolog|comput|science|programming/.test(interests)&&/software|engineer|technician|electric/.test(title))||(/health|care/.test(interests)&&/nurse|doctor|care/.test(title))||(/learn|history|writing|read/.test(interests)&&/teach|library|office|administrat/.test(title))||(/craft|art|music|drawing|photograph/.test(interests)&&/trade|craft|design|music/.test(title))||(/sport|football/.test(interests)&&/coach|fitness|sport/.test(title))||(/animal|farm|agricultur/.test(interests)&&/farm|animal|agricultur/.test(title));
};
O.startJobSearch=function(s,mode='pay'){
 ensure(s);if(s.age<18||s.job==='Retired')return {ok:false,message:'Paid job searches are available during working adulthood.'};
 if(s.flags.jobSearching)return {ok:false,message:'A search is already in progress.'};
 s.flags.jobSearching=true;s.flags.searchMode=mode;s.flags.searchStarted=s.age;s.flags.searchReady=s.age+1;s.flags.searchSerial=(s.flags.searchSerial||0)+1;
 O.journal(s,'You start looking for work',mode==='interest'?`You ask about work connected with ${s.interests.join(', ')||'your interests'}. Some routes may pay less than your current ${O.money(s.income)} a year.`:`You start looking for ${s.income>0?'a better-paid role':'your first paid role'}. Current yearly earnings: ${O.money(s.income)}. Applications take time; there may be no suitable vacancy.`,'work');
 return {ok:true,message:'Search started. Results can arrive from next year.'};
};
O.careerOffers=function(s){
 const mode=s.flags.searchMode||'pay';const edu=O.educationNumber(s.education);const serial=s.flags.searchSerial||0;
 const licensed=s.flags.professionalLicences||[];
 const qualified=j=>{
  if(/doctor|nurse|teacher/i.test(j.title))return licensed.includes(j.title)||new RegExp(j.title,'i').test(s.education);
  if(/engineer|accountant|software developer/i.test(j.title))return edu>=4;
  if(/business owner/i.test(j.title))return false;
  return j.edu<=edu;
 };
 const jobs=[...(O.JOBS||[]),{title:'Sports centre assistant',tier:1,mult:.68,edu:0},{title:'Design studio assistant',tier:1,mult:.8,edu:2}].filter(j=>qualified(j)&&j.title!==s.job&&j.tier<=4);
 const workYears=s.experience.totalYears;return jobs.map(j=>{
 const pay=Math.round(s.country.ppp*j.mult*(.84+(hash(s.seed+'|'+serial+'|'+j.title)%23)/100)*(1+Math.min(.3,workYears*.012)));
 return {title:j.title,pay,match:!!roleMatch(s,j.title.toLowerCase()),tier:j.tier};
 }).filter(j=>mode==='interest'?j.match:j.pay>s.income).sort((a,b)=>mode==='interest'?(a.tier-b.tier||a.title.localeCompare(b.title)):(a.pay-b.pay||a.title.localeCompare(b.title))).slice(0,3);
};
O.payComparison=(current,offered)=>current>0?`${((offered-current)/current*100)>=0?'+':''}${((offered-current)/current*100).toFixed(1)}% ${offered>=current?'increase':'decrease'}`:'First paid role · no previous earnings';
const careers={id:'career-search-results',min:18,max:120,weight:70,category:'Work · Search results',scene:'office',
 when:s=>!!s.flags.jobSearching&&s.age>=(s.flags.searchReady||s.age)&&s.job!=='Retired'&&!s.flags.studying,
 title:s=>s.flags.searchMode==='interest'?'Work closer to your interests':'Your job search: the available offers',
 description:s=>`Current role: ${s.job||'Not employed'}. Earnings: ${O.money(s.income)} a year (${O.money(s.income/12)} a month). ${s.flags.searchMode==='interest'?'These roles match an interest, but may reduce your earnings.':'Only qualified roles paying more than your current income are listed.'} ${O.careerOffers(s).length?'These are firm in-game salary offers.':'No suitable vacancy was found this time.'}`,
 options:s=>[...O.careerOffers(s).map(j=>({label:j.title,detail:`${O.money(j.pay)} / year · ${O.money(j.pay/12)} / month · ${O.payComparison(s.income,j.pay)}${j.match?' · Matches your interests':''}. Current: ${O.money(s.income)} / year.`,apply:st=>{
 const old=st.job||'No paid role',pay=st.income;O.setEmployment(st,{role:j.title,pay:j.pay,mode:j.mode||'full-time',hours:j.hours??(j.mode==='part-time'?20:40)});st.flags.workMemory={job:j.title,age:st.age,pay:j.pay};st.flags.lastCareerAge=st.age;st.experience.roles[j.title]??=0;O.adjust(st,{confidence:3,stress:2});return `You move from ${old} (${O.money(pay)} a year) to ${j.title} (${O.money(j.pay)} a year; ${O.payComparison(pay,j.pay)}). Your new work experience begins here.`;}})),
 {label:'Keep looking',detail:'Keep your current role and income. Another round of applications may take a year.',apply:st=>{st.flags.searchReady=st.age+1;st.flags.searchSerial=(st.flags.searchSerial||0)+1;return `You keep looking. Current annual earnings remain ${O.money(st.income)}.`;}},
 {label:'Stop the search',detail:'Keep your current role and income; restart from Spend whenever you wish.',apply:st=>{st.flags.jobSearching=false;return 'You stop applying for now. Your current work arrangement continues.';}}]};
O.EVENTS.push(careers);
const agenda=O.makeAgenda;O.makeAgenda=function(s){ensure(s);// Full-time searches begin only after an explicit school-leaving or work decision.

 const list=agenda(s);if(careers.when(s)&&!list.some(x=>x.id===careers.id)){const occupied=new Set(list.map(x=>x.month));const month=[5,6,7,8,9,10,11,4,3,2,1].find(m=>!occupied.has(m));if(month)list.push({type:'decision',id:careers.id,month,done:false});}return list.sort((a,b)=>a.month-b.month);};
// One bill, quoted before choosing. Every repayment option refers to that same bill.
function bill(s){s.flags.billQuotes??={};const key=s.age+'|'+(s.used['unexpected-expense']??s.age);if(!s.flags.billQuotes[key]){const cost=Math.max(40,Math.round(s.country.ppp*(.06+(hash(s.seed+'|'+key)%13)/100)));s.flags.billQuotes[key]={cost,kind:['a leaking roof','an urgent dental treatment','a broken water or heating system'][hash(s.seed+'|bill|'+key)%3]};}return s.flags.billQuotes[key];}
const billEvent=O.EVENTS.find(e=>e.id==='unexpected-expense');
if(billEvent){billEvent.description=s=>{const b=bill(s);return `You need to pay ${O.money(b.cost)} for ${b.kind}. Savings: ${O.money(s.cash)}. Existing debt: ${O.money(s.debt)}. Choose how to cover this one-off bill.`;};billEvent.options=s=>{const b=bill(s),monthly=Math.ceil(b.cost*1.10/12),total=monthly*12;
 return [
 {label:`Pay ${O.money(b.cost)} from savings`,detail:s.cash>=b.cost?`Savings after payment: ${O.money(s.cash-b.cost)}. No new debt. Stress −5.`:`You are ${O.money(b.cost-s.cash)} short. Choose a repayment plan or seek help.`,disabled:s.cash<b.cost,apply:st=>{st.cash-=b.cost;O.adjust(st,{stress:-5});return `You pay ${O.money(b.cost)} for ${b.kind}. Savings left: ${O.money(st.cash)}; debt: ${O.money(st.debt)}.`;}},
 {label:`Repay ${O.money(monthly)} a month for 12 months`,detail:`Total ${O.money(total)}, including ${O.money(total-b.cost)} in financing charges. Savings unchanged. New debt total: ${O.money(s.debt+total)}. Stress +3.`,apply:st=>{st.debt+=total;st.flags.billPlans??=[];st.flags.billPlans.push({balance:total,monthly,monthsLeft:12});O.adjust(st,{stress:3});return `The repair is funded. You owe ${O.money(total)} for this plan, paid in 12 instalments of ${O.money(monthly)}. Total outstanding debt: ${O.money(st.debt)}.`;}},
 {label:'Ask family for help or negotiate',detail:`No payment today. A successful request reduces the bill by 40%; otherwise the full ${O.money(b.cost)} remains due. Unpaid costs become debt.`,apply:st=>{const helped=O.chance(st,st.relationships<25?0:.35+st.relationships/300);const due=Math.round(b.cost*(helped?.6:1));const paid=Math.min(st.cash,due);st.cash-=paid;st.debt+=due-paid;O.bond(st,'Parent',-2);return `${helped?'Support reduces the bill':'No discount or contribution is available'}. You pay ${O.money(paid)} now; ${O.money(due-paid)} is added to debt. Total debt: ${O.money(st.debt)}.`;}}
 ];};}
// Exact previews for spending; probabilistic decisions retain their uncertainty.
const offers=O.spendOffers;O.spendOffers=function(s){return offers(s).map(o=>({...o,effectsHTML:changesHTML(Object.fromEntries(Object.entries(o.delta||{}).map(([k,n])=>[k,O.clamp((s[k]||0)+n)-(s[k]||0)])))}));};
const buy=O.buy;O.buy=function(s,id){ensure(s);const offered=O.spendOffers(s).find(x=>x.id===id),before=amounts(s);const result=buy(s,id);if(result.ok){if(id==='vehicle')s.flags.annualUpkeep=(s.flags.annualUpkeep||0)+Math.round(offered.cost*.08);if(id==='sport'){const interest=s.interests[0]||'A personal hobby';s.experience.hobbies[interest]??={years:0,level:0};s.experience.hobbies[interest].level+=2;}const change=diff(before,amounts(s));s.ledger.unshift({age:s.age,title:offered.title,...change});const e=s.journal[0];e.money=change;e.effects=offered.delta;s.lastOutcome=e.description;}return result;};
const apply=O.applyChoice;O.applyChoice=function(s,index){ensure(s);const before=amounts(s),previous=s.job;const result=apply(s,index);if(result){s.lastOutcome=canonical(s.lastOutcome);const change=diff(before,amounts(s));s.journal[0].money=change;const financial=change.cash+change.investments+change.property-change.debt;if(financial)s.journal[0].tone=financial>0?'good':'bad';s.ledger.unshift({age:s.age,title:s.journal[0].title,...change});if(previous!==s.job&&s.job){s.experience.roles[s.job]??=0;s.workYears=0;}}return result;};
// Population reference milestones use the very same baseline as mortality draws.
O.baselineSurvival=(s,age)=>{let alive=1;for(let a=1;a<=age;a++)alive*=1-O.hazardAt(s.country,a);return alive;};
const originalEvidence=O.countryEvidence;
O.countryEvidence=s=>s.country.code==='KE'?{under5:38.8,infant:null,life:null,under5Source:'https://data.unicef.org/country/ken/',lifeSource:'',quality:'partial_empirical'}:originalEvidence(s);
// Existing calibration derives age hazards internally from SOURCE_MODEL; extend its
// under-five anchor for Kenya, keeping its existing life-expectancy target.
if(O.SOURCE_MODEL?.childMortality2024)O.SOURCE_MODEL.childMortality2024.KE=[38.8,undefined];
const journalContext=O.contextForJournal;
O.contextForJournal=(s,e)=>e?.context||journalContext?.(s,e);
O.registerAnnualStage('family-work-journal',s=>{
 ensure(s);const before=amounts(s),oldWorth=O.netWorth(s),oldAge=s.age;
 for(const p of s.people)if(p.alive&&!p.retired&&p.age>=63&&p.job&&p.job!=='—'&&(p.age>=68||hash(p.id+'|'+p.age)%4===0))retirePerson(s,p,true);

 return ()=>{
 for(const p of s.people){if(!p.alive){p.diedAt??=p.age;p.annualIncome=0;}if(p.alive&&p.role==='Child'&&p.age>=22&&!p.movedOut&&hash(s.seed+'|'+p.id+'|'+p.age)%3===0){p.movedOut=true;p.residence='Separate home';O.journal(s,`${p.name.split(' ')[0]} moves out`,`${p.name}, ${p.age}, establishes a separate home. You still make time to visit.`,'family');}}
 const parents=s.people.filter(p=>['Mother','Father'].includes(p.role));if(parents.length)s.familyIncome=parents.reduce((sum,p)=>sum+(p.alive?(p.annualIncome||0):0),0);
 for(const [name,hobby] of Object.entries(s.experience.hobbies)){if(s.age<6)continue;hobby.years+=s.focus==='Rest'?1:.25;hobby.level+=s.focus==='Rest'?2:1;if(hobby.level>=12&&!hobby.noted){hobby.noted=true;O.journal(s,`Your practice in ${name} is showing`,`After sustained practice, people start asking you for tips on ${name.toLowerCase()}. It has become something you can share.`,'achievement');}}
 if(s.age>=18){const after=amounts(s),change=diff(before,after);s.ledger.unshift({age:s.age,title:'Yearly finances',...change});s.ledger=s.ledger.slice(0,120);
 O.journal(s,'Your yearly finances',`Income ${O.money(before.income)} · living costs ${O.money(s.annualExpenses||0)} · debt change ${change.debt>=0?'+':''}${O.money(change.debt)}. Savings ${O.money(s.cash)}; debt ${O.money(s.debt)}. Net worth ${O.money(O.netWorth(s))} (${O.netWorth(s)-oldWorth>=0?'+':''}${O.money(O.netWorth(s)-oldWorth)} this year).`,'money');s.journal[0].money=change;s.journal[0].tone=O.netWorth(s)>=oldWorth?'good':'bad';}
 if([1,5,15,30,50,70,85].includes(s.age)&&s.status==='alive'){
 const evidence=O.countryEvidence(s);const survival=O.baselineSurvival(s,s.age);O.journal(s,'A birthday, and those born alongside you',`You reach ${s.age}. In this simulation’s baseline cohort for ${s.country.name}, about ${(survival*100).toFixed(1)}% survive to this age. Your own health and circumstances can change your risk.`,'milestone');
 s.journal[0].context={text:evidence.under5!==null?`National under-five mortality: ${evidence.under5} per 1,000 live births (2024). Survival after childhood is a model fitted to life expectancy, not a measured age/sex life table.`:`This location currently uses an estimated mortality curve. The displayed survival percentage is a model output, not a verified national statistic.`,source:evidence.under5!==null?'UNICEF / UN IGME 2024':'Mortality model and its limits',url:evidence.under5Source||'https://population.un.org/wpp/'};
 }
 };
});

const advanceMonth=O.advanceMonth;
O.advanceMonth=function(s){
 ensure(s);const at=s.age*12+s.month;const result=advanceMonth(s);
 // Story resolution may run more than once in a month; never collect twice.
 if(result.advanced&&s.age*12+s.month!==at)O.settleBillInstalments(s,at);
 return result;
};

O.survivalHTML=s=>{
 const evidence=O.countryEvidence(s),points=[];
 for(let age=0;age<=100;age+=2)points.push([28+age*2.5,128-O.baselineSurvival(s,age)*108]);
 const line=points.map(p=>p.join(',')).join(' '),x=28+Math.min(s.age,100)*2.5,y=128-O.baselineSurvival(s,Math.min(s.age,100))*108;
 return `<section class="survival-card"><p class="panel-label">Mortality & survival</p><p class="small">${esc(s.country.name)} · Modelled share of a birth cohort still alive</p><svg viewBox="0 0 300 158" role="img" aria-label="Modelled survival curve for ${esc(s.country.name)}"><path d="M28 20V128H278" fill="none" stroke="var(--muted)"/><polygon points="28,128 ${line} 278,128" fill="var(--fact)" opacity=".1"/><polyline points="${line}" fill="none" stroke="var(--fact)" stroke-width="2"/><circle cx="${x}" cy="${y}" r="4" fill="var(--fact)"/><g fill="var(--muted)" font-size="9"><text x="1" y="24">100%</text><text x="7" y="77">50%</text><text x="16" y="131">0</text><text x="28" y="145">0</text><text x="146" y="145">50</text><text x="260" y="145">100</text><text x="160" y="157">Age</text></g></svg><p class="fact-text">At age ${s.age}: ${(O.baselineSurvival(s,s.age)*100).toFixed(1)}% in the baseline model.</p>${evidence.under5!==null?`<p class="small fact-text">${evidence.under5} deaths before age 5 per 1,000 births · 2024 national reference. <a href="${evidence.under5Source}" target="_blank" rel="noopener">UNICEF ↗</a></p>`:''}<small>Adult ages use a fitted curve, not measured age/sex life tables. ${evidence.under5===null?'This location also uses an estimated childhood baseline. ':''}Individual health, sex and circumstances modify the in-game risk.</small></section>`;
};
// Original recurring moments use a particular relationship, a stage and a memory.
const oldPickStories=O.pickStories;
O.pickStories=function(s,n){const stories=oldPickStories(s,n);if(!n||hash(s.seed+'|detail|'+s.age)%3===0)return stories;
 const child=s.people.find(p=>p.alive&&p.role==='Child'&&p.age>=3&&p.age<=17);
 const friend=s.people.find(p=>p.alive&&p.role==='Friend');
 const parent=s.people.find(p=>p.alive&&['Mother','Father'].includes(p.role));
 const lost=s.people.find(p=>!p.alive&&['Mother','Father','Partner','Grandparent'].includes(p.role));
 const pet=s.memories?.pet;let detail;
 if(child)detail={title:`An afternoon with ${child.name.split(' ')[0]}`,description:child.age<7?`${child.name.split(' ')[0]}, ${child.age}, brings you a drawing. You find a place for it at home. Days later, they are still checking that it is there.`:`${child.name.split(' ')[0]}, ${child.age}, asks for your help with something from school. The conversation wanders from the assignment to what growing up has been like for you.`,scene:'home'};
 else if(s.age>=45&&lost)detail={title:'A phrase you still remember',description:`You catch yourself repeating something ${lost.role==='Mother'?'Mom':lost.role==='Father'?'Dad':lost.name.split(' ')[0]} used to say. For a moment, a familiar room and a voice from years ago feel very close.`,scene:'home'};
 else if(s.age>=18&&friend)detail={title:`Making time for ${friend.name.split(' ')[0]}`,description:`You and ${friend.name.split(' ')[0]}, ${friend.age}, finally find an afternoon when neither of you is busy. You talk about how your plans have changed since you first met.`,scene:'park'};
 else if(pet?.alive)detail={title:`A routine with ${pet.name}`,description:`${pet.name}, your ${pet.age}-year-old ${pet.kind}, waits in the same place when the household starts to wake. You have learnt each other's small habits.`,scene:'home'};
 else if(s.age>=6&&s.age<15&&parent)detail={title:'The journey back from school',description:`${parent.role==='Mother'?'Mom':'Dad'}, ${parent.age}, asks about your day. You explain something you learnt, then ask a question they cannot immediately answer. You decide to find out together.`,scene:'school'};
 if(detail&&stories.length)stories[stories.length-1]={...detail,kind:'story',effect:'clarity-relationship-detail'};
 return stories;
};
O.experienceHTML=s=>{const label=n=>n>=12?'Expert':n>=5?'Experienced':n>=2?'Capable':'Beginner';return `<section class="experience"><h3>Experience & interests</h3><p>${s.experience.totalYears} years in paid work</p>${Object.entries(s.experience.roles).map(([role,years])=>`<div class="experience-row"><span>${esc(role)}</span><strong>${years.toFixed(1)} years · ${label(years)}</strong></div>`).join('')}${Object.entries(s.experience.hobbies).map(([name,h])=>`<div class="experience-row"><span>${esc(name)}</span><strong>${label(h.level/2)} · Level ${Math.floor(h.level)} · ${h.years.toFixed(1)} practice years</strong></div>`).join('')}<small>${s.experience.trackedFrom>0?'Detailed practice tracking begins at age '+s.experience.trackedFrom+' for this save.':'Practice and experience accumulate as you grow.'}</small></section>`;};
O.familyHTML=s=>{return `<section class="family-life"><h3>Family, household & pets</h3>${s.people.filter(p=>['Mother','Father','Parent','Grandparent','Sibling','Partner','Child'].includes(p.role)).map(p=>`<div class="family-person ${p.alive?'':'deceased'}"><strong>${esc(p.role)} · ${esc(p.name)}</strong><span>${p.alive?`Age ${p.age}`:`Died at ${p.diedAt??p.age}`} · ${esc(p.job||'Not working')}</span><small>${p.alive?(O.householdMembers(s).includes(p)?'Lives with you':esc(p.residence||'Separate home')):'Remembered in your life'}</small></div>`).join('')}${s.memories.pet?`<div class="family-person"><strong>${esc(s.memories.pet.name)} · ${esc(s.memories.pet.kind)}</strong><span>${s.memories.pet.alive?'Age '+s.memories.pet.age:'Died at '+s.memories.pet.age}</span></div>`:''}</section>`;};
O.moneyDeltaHTML=e=>e?.money?`<div class="money-changes">${Object.entries(e.money).filter(([k,n])=>n&&['cash','debt','income'].includes(k)).map(([k,n])=>`<span class="effect-chip ${(k==='debt'?n<0:n>0)?'positive':'negative'}">${({cash:'Savings',debt:'Debt',income:'Yearly income'})[k]} ${n>0?'+':''}${O.money(n)}</span>`).join('')}</div>`:'';
O.financesHTML=s=>{return `<section class="money-strip" aria-label="Current finances"><div><small>${s.age<18?'Personal earnings':'Yearly income'}</small><strong>${O.money(s.income)}</strong><span>${O.money(s.income/12)} / month</span></div><div><small>Savings</small><strong>${O.money(s.cash)}</strong></div><div><small>Debt</small><strong class="${s.debt>0?'negative':''}">${O.money(s.debt)}</strong></div><div><small>Net worth</small><strong class="${O.netWorth(s)<0?'negative':''}">${O.money(O.netWorth(s))}</strong></div><div class="money-caption">${esc(s.job|| (s.age<18?'Supported by your household':'Not employed'))} · Purchasing-power equivalents ${O.currencySelector()}</div></section>`;};
O.searchHTML=s=>s.age<18||s.job==='Retired'?'':`<section class="search-actions"><h3>Work & direction</h3><p>Current: ${esc(s.job||'Not employed')} · ${O.money(s.income)} / year</p><button class="btn" data-action="search-work" data-mode="pay" ${s.flags.jobSearching?'disabled':''}>Look for ${s.income>0?'better-paid':'paid'} work · Free</button><button class="btn" data-action="search-work" data-mode="interest" ${s.flags.jobSearching?'disabled':''}>Explore work matching your interests · Free</button>${s.flags.jobSearching?`<p class="fact-text">Search in progress · ${s.flags.searchMode==='interest'?'Interest-led roles, including possible pay cuts':'Higher-paid roles only'} · Results from age ${s.flags.searchReady||s.age}</p>`:''}</section>`;
// Persistent, original low-resolution household tableau. Drawn from state, never event.
function sprite(ctx,x,ground,person,index=0){
 const age=person.age??30,scale=age<3?.48:age<12?.7:age<17?.85:1;
 const skin=['#8c5339','#bf8052','#e6b382','#70442f'][hash(person.id||person.name||index)%4];
 const shirt=['#3b8d8a','#cf9d55','#7e73a3','#b75f60','#57779b'][hash(person.name||index)%5];
 ctx.save();ctx.translate(Math.round(x),ground);ctx.scale(scale,scale);const r=(a,b,w,h,col)=>{ctx.fillStyle=col;ctx.fillRect(a,b,w,h)};
 r(-8,-3,16,3,'#57806a');r(-6,-13,5,11,'#34454d');r(1,-13,5,11,'#34454d');r(-7,-2,6,2,'#27383c');r(1,-2,6,2,'#27383c');r(-9,-28,18,16,shirt);r(-11,-25,3,12,skin);r(8,-25,3,12,skin);r(-8,-42,16,15,skin);r(-6,-44,12,3,age>=65?'#d5d4c7':'#3a302c');r(-9,-40,3,9,age>=65?'#d5d4c7':'#3a302c');r(6,-40,3,8,age>=65?'#d5d4c7':'#3a302c');r(-5,-36,2,2,'#263235');r(3,-36,2,2,'#263235');r(-1,-30,3,1,'#914b42');
 if(age>=75){r(11,-20,2,20,'#977a52');r(9,-21,4,2,'#977a52');}ctx.restore();
}
const oldScene=O.drawScene;
O.drawScene=function(canvas,scene,s){if(!s?.country)return oldScene(canvas,scene,s);canvas.width=400;canvas.height=140;const k=canvas.getContext('2d');if(!k)return;k.imageSmoothingEnabled=false;
 const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)};
 r(0,0,400,140,'#bcdbd4');r(0,0,400,35,'#a8ced8');r(0,39,400,53,'#d5e3ce');r(0,72,400,68,'#88ad80');r(0,116,400,24,'#d4c4a3');r(0,112,400,4,'#6f9367');
 [[35,14],[172,9],[288,17]].forEach(([x,y])=>{r(x,y,25,5,'#f4f3df');r(x+6,y-5,15,6,'#f4f3df')});
 // Home, left. Urban households use a compact block; rural homes have a tiled roof.
 r(16,63,62,47,s.strata<2?'#c4a17a':'#e7d5b0');for(let y=0;y<6;y++)r(12+y*5,58-y*4,70-y*10,5,'#8f655c');r(40,84,13,26,'#675c50');r(23,77,11,12,'#9fc5bd');r(60,77,11,12,'#9fc5bd');
 if(s.urban){r(15,48,64,18,'#ddd1b0');r(22,53,12,10,'#99bfc4');r(52,53,12,10,'#99bfc4');}
 // Current school / university / workplace, right, with stage-specific sign and shape.
 const workplace=s.age<6?'Growing':(s.flags.studying||(s.school&&!s.job))?(O.educationNumber(s.education)>=3||s.flags.studying?'University':'School'):s.job==='Retired'?'Retired':s.job?(/farm|herd|agricultur/i.test(s.job)?'Farm':/care|nurse|doctor/i.test(s.job)?'Clinic':'Work'):'Between roles';
 if(workplace==='Farm'){r(320,88,65,22,'#b49a5c');for(let x=323;x<385;x+=10)r(x,85,3,28,'#5e8558');}
 else if(workplace!=='Growing'&&workplace!=='Retired'&&workplace!=='Between roles'){r(318,54,65,56,'#dbd9bc');r(313,49,75,7,'#637e85');for(let x=324;x<379;x+=17){r(x,67,10,11,'#98bbc1');r(x,83,10,10,'#98bbc1')}r(345,91,13,19,'#7f7460');if(workplace==='Clinic'){r(345,57,13,3,'#b95b60');r(350,52,3,13,'#b95b60');}}
 else {r(345,75,5,35,'#806b4f');r(330,63,35,20,'#628f72');r(338,53,20,15,'#628f72');}
 const members=[{id:s.id,name:s.name,age:s.age},...O.householdMembers(s)],visible=members.slice(0,9);const gap=Math.min(24,190/visible.length);const start=200-(visible.length-1)*gap/2;visible.forEach((p,i)=>sprite(k,start+i*gap,112,p,i));
 const pet=s.memories.pet;if(pet?.alive){r(287,100,15,9,'#a6825a');r(299,95,8,9,'#a6825a');r(299,92,3,5,'#6a5145');r(288,108,3,4,'#6a5145');r(298,108,3,4,'#6a5145');r(302,98,1,2,'#29393a');}
 k.font='7px monospace';k.textAlign='center';k.fillStyle='#344f48';k.fillText('HOME',47,134);k.fillText(workplace.toUpperCase(),351,134);k.fillText(members.length>9?`${members.length} AT HOME`:'YOUR HOUSEHOLD',199,134);
 canvas.setAttribute('aria-label',O.householdCaption(s));
};
O.spriteAvatar=p=>{const canvas=document.createElement('canvas');canvas.width=40;canvas.height=52;const k=canvas.getContext('2d');k.fillStyle='#d4e4d3';k.fillRect(0,0,40,52);sprite(k,20,50,p);return canvas.toDataURL();};
O.avatarData=p=>O.spriteAvatar(p);
// The device preference is observed continuously; no preference is forced on the user.
if(typeof window.matchMedia==='function'){const media=window.matchMedia('(prefers-color-scheme: dark)');const theme=()=>{document.documentElement.dataset.theme=media.matches?'dark':'light';const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=media.matches?'#172521':'#f5f2eb';};theme();media.addEventListener?.('change',theme);}
window.dispatchEvent?.(new Event('other-lives-ready'));
})(window.OL);
