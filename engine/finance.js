/* Annual cost ownership. Quotes are pure; only settlement commits gifts, fees and policy exits.
 * Model rates are retained gameplay assumptions, not country-specific financial estimates. */
(function(O){'use strict';
 const clone=s=>JSON.parse(JSON.stringify(s)),round=Math.round;
 const alive=(s,role)=>s.people.filter(p=>p.alive&&p.role===role);
 const rates={checkups:.008,insurance:.025,carefulEating:.012,hobbyLessons:.008,familyGifts:.01};
 O.quoteAnnualCosts=function(s,base){
  if(!Number.isFinite(base)||base<0)throw Error('Annual base costs must be finite and nonnegative.');
  const st=s.study,policies=s.routes?.policies||{},p=s.country.ppp,covered=!!s.institution||s.routes?.active?.['overseas-study']?.stage==='study';
  // A working resource record lets living support follow the tuition gift without touching a save.
  const funds={...s},quote={age:s.age,total:0,breakdown:{},personalTuition:0,familyTuition:0,familyLiving:0,tuition:null,fundingReview:false,living:[],pausedPolicies:[],familyCashChange:0,familyAssetsChange:0};
  const draw=f=>{funds.familyCash-=f.cashPart;funds.familyAssets-=f.assetPart;};
  const routineCost=O.routineCost(s),routineAvailable=s.cash+Math.max(0,O.earnedIncome(s)-(s.annualExpenses||p*.25));
  if(!covered&&st?.status==='enrolled'&&st.funding?.managed&&s.age>=st.funding.nextFeeAge&&s.age<st.graduationAge){
   const d=O.DEGREES.find(d=>d.id===st.degreeId);if(!d)throw Error('Unknown course for annual tuition.');
   const f=O.degreeFunding(funds,d);
   if(funds.cash<f.personal){quote.fundingReview=true;quote.review=f;}
   else{quote.tuition=f;quote.personalTuition=f.personal;quote.familyTuition=f.family;draw(f);funds.cash-=f.personal;}
  }
  let n=base,b=quote.breakdown;
  const housing=s.housing||{kind:'family',rent:null},enrolled=st?.status==='enrolled'&&!quote.fundingReview;
  if(housing.kind!=='family'&&housing.rent!==null)n=base*.65+(housing.rent||0);
  if(housing.kind==='owned')n=base*.65+(housing.mortgage?.annual||0)+(s.property||0)*.012;
  n=round(n+(s.flags.recurringCare||0)+(s.flags.childTuition||0));
  const dependent=s.flags.livingWithFamily&&(s.age<=18||enrolled&&st.mode==='full-time'||st?.status==='overseas-route'&&st.mode==='full-time')&&(alive(s,'Father').length+alive(s,'Mother').length);
  const support=dependent?Math.min(n,Math.max(0,(s.familyIncome||0)*.18)):0;n-=support;
  if(s.age<=18&&s.flags.livingWithFamily&&!s.job&&!st)n=0;
  const tuition=enrolled&&!st.funding?.managed&&!st.firstYearPaid?st.annualFees||0:0;
  const pet=s.memories?.pet?.alive?round(p*(s.memories.pet.kind==='dog'?.008:.005)):0,routine=routineCost<=routineAvailable?routineCost:0;
  const childSchooling=Math.min(n,s.flags.childTuition||0),care=Math.min(n-childSchooling,s.flags.recurringCare||0),homePayment=Math.min(n-childSchooling-care,housing.mortgage?.annual||housing.rent||0);
  Object.assign(b,{basic:round(n-childSchooling-care-homePayment),homePayment:round(homePayment),childSchooling,care,familySupport:round(support),tuition,pet,routines:routine,vehicle:s.flags.annualUpkeep||0});
  n=round(n+tuition+pet+routine);
  function living(target,funding){
   const eligible=Math.max(0,n-(b.pet||0)-(b.routines||0)),prior=funding.livingHistory?.find(x=>x.age===s.age),budget=O.parentStudyBudget(funds);
   const amount=Math.min(eligible,prior?.amount??budget.cash+budget.assets);
   if(amount>0){
    const cashPart=Math.min(amount,budget.cash),assetPart=amount-cashPart;
    quote.living.push({target,age:s.age,amount,cashPart,assetPart,previous:!!prior});
    if(!prior){draw({cashPart,assetPart});quote.familyLiving+=amount;}
    b.familyStudyLiving=(b.familyStudyLiving||0)+amount;let remaining=amount;
    for(const key of ['basic','homePayment','care','childSchooling']){const used=Math.min(remaining,b[key]||0);b[key]-=used;remaining-=used;}
   }
   n-=amount;
  }
  if(!covered&&enrolled&&st.mode==='full-time'&&st.funding?.managed)living('study',st.funding);
  const masters=s.routes?.active?.masters;
  if(!covered&&masters?.stage==='studying'&&masters.mode==='full-time'&&masters.funding?.familyAssisted)living('masters',masters.funding);
  if(quote.tuition)Object.assign(b,{tuition:quote.personalTuition,parentTuition:quote.familyTuition,tuitionGrant:quote.tuition.grant});
  // Institutional and overseas study costs are paid by their existing route contracts.
  if(covered){n=0;quote.breakdown={};b=quote.breakdown;}
  if(!covered){
   b.childcare=policies.childcare==='paid'&&alive(s,'Child').some(c=>c.age<6&&!c.movedOut)?round(p*.1):0;
   b.parentCare=s.people.some(x=>x.alive&&['Mother','Father'].includes(x.role))?policies.parentCare||0:0;
   b.childSupport=alive(s,'Child').some(c=>c.age<18)?policies.childSupport||0:0;n+=b.childcare+b.parentCare+b.childSupport;
  }
  if(!s.institution){
   for(const [id,rate]of Object.entries(rates)){
    if(!policies[id])continue;const amount=round(p*rate),available=funds.cash+O.earnedIncome(s)+O.partnerContribution(s)-n;
    if(available<amount){quote.pausedPolicies.push({id,amount});continue;}n+=amount;b[id]=amount;
   }
  }
  if(housing.rentalMortgage){const extra=housing.mortgage?.annual||0;if(extra)b.rentalMortgage=extra;n+=extra;}
  quote.total=n;quote.familyCashChange=funds.familyCash-s.familyCash;quote.familyAssetsChange=funds.familyAssets-s.familyAssets;
  return quote;
 };
 O.settleAnnualCosts=function(s,base){
  if(s.annualCostSettlement?.age===s.age)return clone(s.annualCostSettlement);
  if(s.status!=='alive')throw Error('Annual costs require a living, active character.');
  const q=O.quoteAnnualCosts(s,base),before=clone(s),st=s.study;
  try{
   if(q.fundingReview){
    const f=q.review;st.status='funding-review';st.funding.pending=f;st.funding.reviewAge=s.age;s.school=false;O.adjust(s,{stress:4,happiness:-2});
    O.journal(s,`${st.course}: the next year needs a funding decision`,`Tuition ${O.money(f.gross)}; grant ${O.money(f.grant)}; your parents can give ${O.money(f.family)}. Your share is ${O.money(f.personal)}, but savings are ${O.money(s.cash)}. ${!f.budget.parents?'Neither parent is alive to provide further support.':f.budget.ill?'A parent’s health now leaves more money reserved for care.':f.budget.retired?'Retirement means protecting more of the household’s remaining money.':'The household can no longer cover the earlier share.'} No tuition loan is added automatically. Your place is on hold while you review the options.`,'education');
   }
   if(q.tuition){
    const f=q.tuition,last=st.funding.last;O.commitFamilyGift(s,f);s.cash-=f.personal;O.recordStudyTuition(s,f);
    s.flags.tuitionPaidUpfront={age:s.age,personal:f.personal};
    if(last&&last.family!==f.family&&Math.abs(last.family-f.family)>f.gross*.2)O.journal(s,`${st.course}: your parents’ support changes`,`Their contribution changes from ${O.money(last.family)} to ${O.money(f.family)}. You pay ${O.money(f.personal)} from savings for this year. Family savings, assets, dependants, retirement and care needs determine the available support.`,'education');
   }
   for(const gift of q.living){
    if(gift.previous)continue;O.commitFamilyGift(s,gift);
    const funding=gift.target==='study'?st.funding:s.routes.active.masters.funding;
    (funding.livingHistory??=[]).push({age:gift.age,amount:gift.amount,cashPart:gift.cashPart,assetPart:gift.assetPart});funding.totalLiving=(funding.totalLiving||0)+gift.amount;
   }
   for(const {id,amount}of q.pausedPolicies){s.routes.policies[id]=false;O.journal(s,'An optional continuing cost is paused',`${id.replace(/([A-Z])/g,' $1')} would cost ${O.money(amount)} this year. You pause it to protect essential spending rather than borrowing for it.`,'money');}
   const withdrawn=(before.familyCash+before.familyAssets)-(s.familyCash+s.familyAssets);
   if(Math.abs(withdrawn-q.familyTuition-q.familyLiving)>.001||Math.abs(before.cash-s.cash-q.personalTuition)>.001)throw Error('Annual gift/tuition conservation failed.');
   s.budgetBreakdown=clone(q.breakdown);s.annualCostSettlement=clone(q);
   return clone(q);
  }catch(error){for(const key of Object.keys(s))delete s[key];Object.assign(s,before);throw error;}
 };
 O.protectedDebt=s=>(s.flags.billPlans||[]).reduce((n,p)=>n+(p.monthsLeft>0?p.balance:0),0)+(s.housing?.mortgage?.balance||0);
 O.repayUnsecuredDebt=function(s,requested){
  if(!Number.isFinite(requested)||requested<0)throw Error('Invalid debt repayment.');
  const paid=Math.min(s.cash,Math.max(0,s.debt-O.protectedDebt(s)),Math.round(requested));
  s.debt-=paid;s.cash-=paid;let remaining=paid;
  for(const plan of s.flags.billPlans||[]){if(plan.monthsLeft>0)continue;const n=Math.min(remaining,plan.balance);plan.balance-=n;remaining-=n;if(remaining<=0)break;}
  return paid;
 };
 O.settleAnnualBudget=function(s){
  if(s.annualBudgetSettlement?.age===s.age)return clone(s.annualBudgetSettlement);
  if(s.status!=='alive'||s.age<18)throw Error('Annual personal budgets require an active adult.');
  const before=clone(s),age=s.age,c=s.country;
  try{
  const earned=O.earnedIncome?O.earnedIncome(s):s.income,partnerIncome=O.partnerContribution?.(s)||0,assetIncome=O.passiveAssetIncome?.(s)||0,annual=earned+partnerIncome+assetIncome;
  s.lastIncomeSources={earned,partner:partnerIncome,assets:assetIncome};
  let cost=Math.max(900,round(c.ppp*(s.urban?.34:.25)*(s.people.some(p=>p.role==='Child'&&p.alive)?1.25:1)*(s.flags.livingWithFamily?.61:1)));
  if(s.strata>=5&&s.flags.familySupport&&!s.income)cost*=.5;
  if(s.flags.foodInsecure)cost*=.9;
  if(s.job==='Retired')cost*=.85;
  if(O.settleAnnualCosts)cost=O.settleAnnualCosts(s,cost).total;cost+=(s.flags.annualUpkeep||0);s.annualExpenses=round(cost);
  const planBalance=O.protectedDebt(s);const interest=round(Math.max(0,s.debt-planBalance)*(s.flags.predatoryDebt?.19:.055));
  let net=round(annual-cost-interest);
  if(net>0){s.cash+=net;if(s.debt>0)O.repayUnsecuredDebt(s,round(net*.48));}else{const deficit=-net,fromCash=Math.min(s.cash,deficit);s.cash-=fromCash;s.debt+=deficit-fromCash;O.adjust(s,{stress:2,happiness:-1})}
  s.lastInterest=interest;s.lastAnnualIncome=annual;O.reconcileDebt?.(s,'Annual budget shortfall','budget',`Living / housing costs ${O.money(s.budgetBreakdown?.basic||0)}; rent / mortgage payments ${O.money(s.budgetBreakdown?.homePayment||0)}; child school fees ${O.money(s.budgetBreakdown?.childSchooling||0)}; continuing care ${O.money(s.budgetBreakdown?.care||0)}; tuition ${O.money(s.budgetBreakdown?.tuition||0)}; pet care ${O.money(s.budgetBreakdown?.pet||0)}; routines ${O.money(s.budgetBreakdown?.routines||0)}; other commitments ${O.money(s.flags.annualUpkeep||0)}; interest ${O.money(interest)}; total income ${O.money(annual)}. Savings were used first.`);
  if(s.investments>0){let returnRate=O.investmentReturn?O.investmentReturn(s):-.12+O.rand(s)*.23;s.investments=Math.max(0,round(s.investments*(1+returnRate)))}
  if(s.property>0)s.property=Math.max(0,round(s.property*(.96+O.rand(s)*.09)));
  if(s.debt>c.ppp*2)O.adjust(s,{stress:3,happiness:-2});

   const valuation=(s.investments-before.investments)+(s.property-before.property),personalTuition=s.annualCostSettlement?.personalTuition||0;
   const actual=(s.cash-s.debt+s.investments+s.property)-(before.cash-before.debt+before.investments+before.property),expected=net-personalTuition+valuation;
   if(Math.abs(actual-expected)>.001)throw Error('Annual budget conservation failed.');
   s.annualBudgetSettlement={age,income:annual,cost:round(cost),interest,personalTuition,net,valuation,netWorthChange:actual};
   return clone(s.annualBudgetSettlement);
  }catch(error){for(const key of Object.keys(s))delete s[key];Object.assign(s,before);throw error;}
 };
 O.settleMortgagePrincipal=function(s){
  if(s.mortgageSettlement?.age===s.age)return clone(s.mortgageSettlement);
  const mortgage=s.housing.mortgage;if(!mortgage||mortgage.balance<=0)return null;
  const interest=round(mortgage.balance*mortgage.rate),principal=Math.min(mortgage.balance,Math.max(0,mortgage.annual-interest));
  if(!Number.isFinite(principal)||principal<0||principal>s.debt)throw Error('Invalid mortgage principal payment.');
  mortgage.balance-=principal;s.debt-=principal;mortgage.years=Math.max(0,mortgage.years-1);
  s.mortgageSettlement={age:s.age,interest,principal};
  if(mortgage.balance<=0){mortgage.annual=0;O.journal(s,'Your mortgage is paid off','Your home is now owned without a mortgage. Maintenance costs continue.','money');}
  return clone(s.mortgageSettlement);
 };
 O.settleBillInstalments=function(s,month){
  if(s.flags.lastInstalmentMonth===month||s.status!=='alive')return;
  s.flags.lastInstalmentMonth=month;
  for(const plan of s.flags.billPlans||[]){if(plan.monthsLeft<=0||plan.balance<=0)continue;
   const due=Math.min(plan.monthly,plan.balance),paid=Math.min(Math.max(0,s.cash),due);
   s.cash-=paid;s.debt-=paid;plan.balance-=paid;plan.monthsLeft--;
   if(paid<due)O.journal(s,'An instalment is short',`You pay ${O.money(paid)} of the ${O.money(due)} bill instalment. The unpaid amount remains in your debt.`,'money');
  }
 };
 // Compatibility for older tests/integrations: this name is explicitly a settlement, never a query.
 O.livingCost=(s,base)=>O.settleAnnualCosts(s,base).total;
})(window.OL);
