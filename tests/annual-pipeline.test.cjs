const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function adult(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people){p.age+=40;delete p.careerInitialized;}Object.assign(s,{age:40,month:0,pending:null,agenda:[],cash:10000,debt:0,school:false,health:95,happiness:80,stress:0});s.flags.flow.schoolLeavingResolved=true;O.routeJob(s,'Office administrator',58000);O.ensureClarity(s);O.ensureTimeline(s);return s;}
test('a complete annual transition is ordered, once per age and preserved on reload',()=>{
 const O=loadEngine(),s=adult(O);assert.equal(typeof O.runAnnual,'function');
 O.runAnnual(s);const after=JSON.stringify(s);O.runAnnual(s);assert.equal(JSON.stringify(s),after,'annual income, people, skills or RNG applied twice');
 const loaded=O.migrateLife(s);O.runAnnual(loaded);assert.equal(JSON.stringify(loaded),after,'reloading repeated the annual transition');
 assert.equal(s.annualReceipt.age,s.age);assert(s.annualReceipt.stages.includes('core'));assert.equal(new Set(s.annualReceipt.stages).size,s.annualReceipt.stages.length);
});
test('a late annual failure restores money, people, decisions, history and RNG',()=>{
 const O=loadEngine(),s=adult(O),before=JSON.stringify(s);O.routeYearHandlers.push((s,phase)=>{if(phase==='after'){s.cash+=123;O.rand(s);throw Error('Synthetic annual failure');}});
 assert.throws(()=>O.passive(s),/Synthetic annual failure/);assert.equal(JSON.stringify(s),before);
});
test('a birthday failure also restores clock and can retry without skipping a year',()=>{
 const O=loadEngine(),s=adult(O);s.month=11;const before=JSON.stringify(s),agenda=O.makeAgenda;O.makeAgenda=()=>{throw Error('Synthetic agenda failure');};
 assert.throws(()=>O.advanceMonth(s),/Synthetic agenda failure/);assert.equal(JSON.stringify(s),before,'birthday rollback lost the previous month or state');
 O.makeAgenda=agenda;O.advanceMonth(s);assert.equal(s.age,41);assert.equal(s.month,0);assert.equal(s.annualReceipt.age,41);
});
test('annual unsecured repayment cannot forgive an unrelated live instalment plan',()=>{
 const O=loadEngine(),s=adult(O);s.debt=5000;s.flags.billPlans=[{balance:1000,monthly:100,monthsLeft:10}];
 const chance=O.chance;try{O.chance=()=>false;O.passive(s);}finally{O.chance=chance;}
 assert.equal(s.flags.billPlans[0].balance,1000,'unsecured repayment was allocated to protected instalments');assert.equal(s.debt,1000);
});
test('retirement income cannot add working years or professional experience',()=>{
 const O=loadEngine(),s=adult(O);s.job='Retired';s.income=20000;s.employment={role:'Retired',mode:'retired',hours:0};s.yearsWorked=20;s.workYears=3;const years=s.experience.totalYears,roles=JSON.stringify(s.experience.roles);
 O.passive(s);assert.equal(s.yearsWorked,20);assert.equal(s.workYears,3);assert.equal(s.experience.totalYears,years);assert.equal(JSON.stringify(s.experience.roles),roles);
});
test('a savings decision prepays its bill schedule rather than charging it again',()=>{
 const O=loadEngine(),s=adult(O);s.debt=1000;s.flags.billPlans=[{balance:1000,monthly:100,monthsLeft:10}];s.pending='invest-money';
 assert(O.applyChoice(s,2));assert.equal(s.debt,0);assert.equal(s.flags.billPlans[0].balance,0);assert.equal(s.flags.billPlans[0].monthsLeft,0);
 const cash=s.cash;O.settleBillInstalments(s,s.age*12+1);assert.equal(s.debt,0);assert.equal(s.cash,cash);
});
test('finished and paused lives cannot receive annual income, ageing or changes',()=>{
 const O=loadEngine();for(const status of ['paused','finished']){const s=adult(O);s.status=status;const before=JSON.stringify(s);O.passive(s);assert.equal(JSON.stringify(s),before,status);}
});
