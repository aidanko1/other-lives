/* Dwelling and secured-loan identity. Legacy aggregates remain explicitly aggregates. */
(function(O){'use strict';
 const clone=s=>JSON.parse(JSON.stringify(s)),round=Math.round;
 function legacyRecords(s){
  const total=Math.max(0,s.property||0),rental=Math.min(total,Math.max(0,s.flags?.rentalPropertyValue||0)),h=s.housing||{},result=[];
  const home=h.kind==='owned'?Math.min(Math.max(0,h.value??total-rental),total-rental):0;
  if(home>0||h.kind==='owned'&&h.mortgage)result.push({id:'legacy-home',kind:'home',value:home,acquiredAge:null,country:null,legacyAggregate:true,...(!h.rentalMortgage&&h.mortgage?{mortgage:clone(h.mortgage)}:{})});
  if(rental>0||h.rentalMortgage&&h.mortgage)result.push({id:'legacy-rental',kind:'rental',value:rental,acquiredAge:null,country:null,legacyAggregate:true,...(h.rentalMortgage&&h.mortgage?{mortgage:clone(h.mortgage)}:{})});
  const other=total-home-rental;if(other>0)result.push({id:'legacy-other',kind:'unclassified',value:other,acquiredAge:null,country:null,legacyAggregate:true});
  return result;
 }
 O.propertyRecords=s=>s.propertyLedger?.properties?.length?s.propertyLedger.properties:legacyRecords(s);
 O.mortgageRecords=s=>O.propertyRecords(s).filter(p=>p.mortgage?.balance>0);
 O.securedBalance=s=>O.mortgageRecords(s).reduce((n,p)=>n+p.mortgage.balance,0);
 O.securedAnnualPayment=s=>O.mortgageRecords(s).reduce((n,p)=>n+(p.mortgage.annual||0),0);
 O.rentalMortgagePayment=s=>O.mortgageRecords(s).filter(p=>p.kind!=='home').reduce((n,p)=>n+(p.mortgage.annual||0),0);
 O.initializePropertyLedger=function(s){
  s.propertyLedger??={version:1,nextId:0,properties:[],history:[]};
  if(!s.propertyLedger.properties.length&&(s.property>0||s.housing?.mortgage))s.propertyLedger.properties=legacyRecords(s);
  return s.propertyLedger;
 };
 O.syncPropertyView=function(s){
  const records=s.propertyLedger.properties,home=records.find(p=>p.kind==='home'),rentals=records.filter(p=>p.kind==='rental');
  s.property=records.reduce((n,p)=>n+p.value,0);s.flags.rentalPropertyValue=rentals.reduce((n,p)=>n+p.value,0);
  if(home){s.housing.value=home.value;if(home.mortgage)s.housing.mortgage=home.mortgage;else delete s.housing.mortgage;delete s.housing.rentalMortgage;}
  else{delete s.housing.value;const letLoan=rentals.find(p=>p.mortgage?.balance>0);if(letLoan){s.housing.mortgage=letLoan.mortgage;s.housing.rentalMortgage=true;}else{delete s.housing.mortgage;delete s.housing.rentalMortgage;}}
 };
 O.setHousing=function(s,housing){
  O.initializePropertyLedger(s);
  if(housing.kind!=='owned'&&s.propertyLedger.properties.some(p=>p.kind==='home'))throw Error('Sell or let the current home before changing residence.');
  s.housing={...housing};s.flags.livingWithFamily=housing.kind==='family';O.syncPropertyView(s);
 };
 O.acquireProperty=function(s,value,kind,mortgage=null){
  if(!Number.isFinite(value)||value<=0||!['home','rental'].includes(kind))throw Error('Invalid property purchase.');
  const ledger=O.initializePropertyLedger(s);
  if(kind==='home'&&ledger.properties.some(p=>p.kind==='home'))throw Error('A current home is already owned.');
  if(mortgage&&(!Number.isFinite(mortgage.balance)||mortgage.balance<0))throw Error('Invalid secured loan.');
  const record={id:'property-'+(++ledger.nextId),kind,value:round(value),acquiredAge:s.age,country:s.country.code,...(mortgage?{mortgage:{...mortgage}}:{})};
  ledger.properties.push(record);if(mortgage)s.debt+=mortgage.balance;
  if(kind==='home'){s.housing={kind:'owned',rent:0};s.flags.livingWithFamily=false;}
  O.syncPropertyView(s);return record;
 };
 O.letHome=function(s,rent){
  const ledger=O.initializePropertyLedger(s),home=ledger.properties.find(p=>p.kind==='home');if(!home)throw Error('No owned home to let.');
  home.kind='rental';home.letAt=s.age;O.setHousing(s,{kind:'rented',rent});return home;
 };
 O.reoccupyProperty=function(s){
  const ledger=O.initializePropertyLedger(s);if(ledger.properties.some(p=>p.kind==='home'))throw Error('Resolve the current home first.');
  const record=ledger.properties.find(p=>p.kind==='rental');if(!record)throw Error('No let property is available.');
  record.kind='home';record.occupiedAt=s.age;s.housing={kind:'owned',rent:0};s.flags.livingWithFamily=false;O.syncPropertyView(s);return record;
 };
 O.sellHome=function(s,rent){
  const ledger=O.initializePropertyLedger(s),home=ledger.properties.find(p=>p.kind==='home');if(!home)throw Error('No owned home to sell.');
  const loan=home.mortgage?.balance||0,proceeds=round(home.value*.97)-loan;if(proceeds<0)throw Error('Sale proceeds do not cover the secured loan.');
  s.cash+=proceeds;s.debt-=loan;ledger.history.push({...clone(home),soldAge:s.age,proceeds,fees:home.value-round(home.value*.97)});ledger.properties=ledger.properties.filter(p=>p.id!==home.id);
  O.syncPropertyView(s);
  O.setHousing(s,{kind:'rented',rent});return proceeds;
 };
 O.revalueProperties=function(s,factor){
  if(!Number.isFinite(factor)||factor<0)throw Error('Invalid property valuation.');
  const records=O.initializePropertyLedger(s).properties,total=round(s.property*factor);let remaining=total;
  records.forEach((p,i)=>{const value=i===records.length-1?remaining:Math.min(remaining,round(p.value*factor));p.lastValuation={age:s.age,from:p.value,to:value};p.value=value;remaining-=value;});
  O.syncPropertyView(s);return total;
 };
})(window.OL);
