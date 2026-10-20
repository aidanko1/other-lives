const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function adult(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=40;Object.assign(s,{age:40,month:0,pending:null,agenda:[],cash:2000000,school:false});s.flags.flow.schoolLeavingResolved=true;O.routeJob(s,'Office administrator',400000);O.ensureClarity(s);return s;}
function year(s){s.age++;for(const p of s.people)if(p.alive)p.age++;}
function housing(O,s,label){assert(O.startRoute(s,'housing-review').ok);O.advanceMonth(s);const options=O.EVENTS.find(e=>e.id===s.pending).options(s),i=options.findIndex(o=>o.label===label);assert(i>=0&&!options[i].disabled,label);assert(O.applyChoice(s,i));}
function letMortgagedHome(O,s){assert(O.planAction(s,'mortgage').ok);const loan=s.housing.mortgage.balance;housing(O,s,'Let the owned home and rent elsewhere');return loan;}
test('moving or buying another home cannot erase a let property mortgage',()=>{
 for(const action of ['move-area','buy-home']){const O=loadEngine(),s=adult(O),loan=letMortgagedHome(O,s),debt=s.debt;assert(O.planAction(s,action).ok);assert.equal(s.debt,debt);assert.equal(O.protectedDebt(s),loan,action+' lost the secured loan');assert.equal(O.propertyRecords(s).filter(p=>p.mortgage?.balance>0).length,1);}
});
test('two actual mortgages remain distinct and both amortize once per year',()=>{
 const O=loadEngine(),s=adult(O),first=letMortgagedHome(O,s);year(s);assert(O.planAction(s,'mortgage').ok);const second=s.housing.mortgage.balance;assert.equal(O.protectedDebt(s),first+second);
 const properties=O.propertyRecords(s);assert.equal(properties.filter(p=>p.mortgage?.balance>0).length,2);assert.equal(new Set(properties.map(p=>p.id)).size,2);
 const before=s.debt,result=O.settleMortgagePrincipal(s);assert(result.principal>0);assert.equal(before-s.debt,result.principal);assert.equal(O.protectedDebt(s),s.debt);
 const after=JSON.stringify(s);O.settleMortgagePrincipal(s);assert.equal(JSON.stringify(s),after);
});
test('reoccupying one let dwelling preserves other rentals and their income',()=>{
 const O=loadEngine(),s=adult(O);assert(O.planAction(s,'buy-home').ok);const home=s.housing.value;assert(O.planAction(s,'rental-property').ok);const rental=s.flags.rentalPropertyValue,total=s.property;
 housing(O,s,'Let the owned home and rent elsewhere');year(s);housing(O,s,'Move into a property you currently let');assert.equal(s.housing.value,home);assert.equal(s.flags.rentalPropertyValue,rental);assert.equal(s.property,total);assert(O.passiveAssetIncome(s)>0);
});
test('property valuation keeps aggregate, dwelling and rental values consistent',()=>{
 const O=loadEngine(),s=adult(O);assert(O.planAction(s,'buy-home').ok);assert(O.planAction(s,'rental-property').ok);const total=s.property,home=s.housing.value,rental=s.flags.rentalPropertyValue;
 O.revalueProperties(s,1.1);assert.equal(s.property,Math.round(total*1.1));assert.equal(s.housing.value,Math.round(home*1.1));assert.equal(s.flags.rentalPropertyValue,Math.round(rental*1.1));
 assert.equal(O.propertyRecords(s).reduce((n,p)=>n+p.value,0),s.property);
});
test('legacy property migration preserves value, liabilities and history without inventing dwellings',()=>{
 const O=loadEngine(),s=adult(O);delete s.propertyLedger;s.schemaVersion=1;s.property=100000;s.flags.rentalPropertyValue=100000;s.debt=50000;s.housing={kind:'rented',rent:5000,rentalMortgage:true,mortgage:{balance:50000,annual:6000,rate:.05,years:20}};
 const before=JSON.stringify(s),a=O.migrateLife(s),records=O.propertyRecords(a);assert.equal(JSON.stringify(s),before);assert.equal(a.schemaVersion,O.SAVE_VERSION);assert.equal(records.length,1);assert.equal(records[0].legacyAggregate,true);
 for(const key of ['property','debt','cash','familyCash','familyAssets'])assert.equal(a[key],s[key],key);assert.equal(JSON.stringify(a.journal),JSON.stringify(s.journal));assert.equal(JSON.stringify(O.migrateLife(a)),JSON.stringify(a));assert.equal(O.protectedDebt(a),50000);
});
test('selling or downsizing settles only that dwelling and never recreates a sold asset',()=>{
 for(const choice of ['Sell the home and release net equity','Downsize to a smaller owned home']){
  const O=loadEngine(),s=adult(O);O.planAction(s,'mortgage');O.planAction(s,'rental-property');const value=s.housing.value,loan=s.housing.mortgage.balance,rental=s.flags.rentalPropertyValue,cash=s.cash,debt=s.debt;
  housing(O,s,choice);const smaller=choice.startsWith('Downsize')?Math.round(value*.65):0;
  assert.equal(s.cash,cash+Math.round(value*.97)-loan-Math.round(smaller*1.03));assert.equal(s.debt,debt-loan);assert.equal(s.property,rental+smaller);assert.equal(s.flags.rentalPropertyValue,rental);
  assert.equal(s.propertyLedger.history.length,1);assert.equal(s.propertyLedger.history[0].soldAge,s.age);O.assertConsistent(s);
 }
 const O=loadEngine(),s=adult(O);O.planAction(s,'buy-home');O.planAction(s,'sell-home');assert.equal(s.property,0);assert.equal(O.propertyRecords(s).length,0);O.initializePropertyLedger(s);assert.equal(s.propertyLedger.properties.length,0);
});
test('two secured repayments and current rent are quoted without mutating or double charging',()=>{
 const O=loadEngine(),s=adult(O);letMortgagedHome(O,s);year(s);O.planAction(s,'mortgage');const homeAnnual=s.housing.mortgage.annual;housing(O,s,'Let the owned home and rent elsewhere');const all=O.securedAnnualPayment(s),before=JSON.stringify(s),q=O.quoteAnnualCosts(s,10000);
 assert.equal(JSON.stringify(s),before);assert(all>homeAnnual);assert.equal(q.breakdown.rentalMortgage,all);assert.equal(q.breakdown.homePayment,s.housing.rent);
 const loaded=O.migrateLife(s);assert.equal(JSON.stringify(loaded),before);O.settleMortgagePrincipal(loaded);assert.equal(O.securedBalance(loaded),loaded.debt);O.assertConsistent(loaded);
});
test('asset and scheduled-debt invariants detect broken financial ownership',()=>{
 const O=loadEngine(),s=adult(O);O.planAction(s,'buy-home');s.property++;assert(O.consistencyIssues(s).some(x=>x.code==='property.total'));s.property--;s.flags.rentalPropertyValue=1;assert(O.consistencyIssues(s).some(x=>x.code==='property.rentals'));
 s.flags.billPlans=[{balance:100,monthsLeft:2}];assert(O.consistencyIssues(s).some(x=>x.code==='debt.components'));
});
test('negative legacy household assets become an explicit conserved liability, never free wealth',()=>{
 const O=loadEngine();for(const version of [0,1]){const s=adult(O);s.schemaVersion=version;s.familyAssets=-357;s.familyDebts=200;const input=JSON.stringify(s),a=O.migrateLife(s);
  assert.equal(JSON.stringify(s),input);assert.equal(a.familyAssets,0);assert.equal(a.familyDebts,557);assert.equal(a.familyAssets-a.familyDebts,s.familyAssets-s.familyDebts);assert.equal(a.flags.legacyRepairs[0].householdDebtAdded,357);assert.equal(JSON.stringify(a.journal),JSON.stringify(s.journal));assert.equal(JSON.stringify(O.migrateLife(a)),JSON.stringify(a));}
});
test('every country preserves two loans through moving, annual budgets and save reload',()=>{
 const O=loadEngine();for(const c of O.COUNTRIES){const s=adult(O);s.country=c;s.cash=10000000;O.setEmployment(s,{role:'Office administrator',pay:4000000,mode:'full-time',hours:40});
  letMortgagedHome(O,s);assert(O.planAction(s,'move-area').ok,c.code);year(s);assert(O.planAction(s,'mortgage').ok,c.code);const before=O.securedBalance(s);assert.equal(before,s.debt);
  O.runAnnual(s);O.assertConsistent(s);assert(O.securedBalance(s)<before,c.code+' principal');assert.equal(s.propertyLedger.properties.length,2);assert.equal(O.securedBalance(s),s.debt);
  const serialized=JSON.stringify(s),loaded=O.migrateLife(s);assert.equal(JSON.stringify(loaded),serialized);O.runAnnual(loaded);assert.equal(JSON.stringify(loaded),serialized,'same-age repeat after '+c.code+' reload');
 }
});
