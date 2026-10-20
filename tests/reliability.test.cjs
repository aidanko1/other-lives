const test=require('node:test'),assert=require('node:assert/strict'),O=require('./engine.cjs');
const clone=s=>JSON.parse(JSON.stringify(s));
function adult(){const s=O.create({country:'GB',seed:2218});Object.assign(s,{age:40,month:0,pending:null,agenda:[],cash:100000,debt:50000,property:100000,school:false});s.flags.flow={schoolLeavingResolved:true};O.routeJob(s,'Office administrator',30000);O.ensureClarity(s);return s;}
test('zero is a valid reproducible uint32 seed',()=>{const a=O.create({country:'GB',seed:0}),b=O.create({country:'GB',seed:0});assert.equal(a.seed,0);assert.equal(a.rng,b.rng);assert.equal(a.name,b.name);assert.deepEqual(a.agenda,b.agenda);});
test('seeded shuffle preserves a permutation and repeats without random sort semantics',()=>{
 assert.equal(typeof O.shuffle,'function');for(const seed of [0,1,42,4294967295]){const a={rng:seed},b={rng:seed};const first=O.shuffle(a,[0,1,2,3,4,5]),second=O.shuffle(b,[0,1,2,3,4,5]);assert.deepEqual(first,second);assert.equal(a.rng,b.rng);assert.deepEqual([...first].sort(),[0,1,2,3,4,5]);}
});
test('reoccupying a let home preserves its mortgage, net worth and next payment',()=>{
 const s=adult();s.housing={kind:'rented',rent:5000,rentalMortgage:true,mortgage:{balance:50000,annual:6000,rate:.05,years:20}};s.flags.rentalPropertyValue=100000;s.flags.livingWithFamily=false;
 const before=O.netWorth(s),debt=s.debt;assert(O.startRoute(s,'housing-review').ok);O.advanceMonth(s);assert.equal(s.pending,'life-route-decision');
 const opts=O.EVENTS.find(e=>e.id===s.pending).options(s),i=opts.findIndex(o=>o.label==='Move into a property you currently let');assert(i>=0&&!opts[i].disabled);assert(O.applyChoice(s,i));
 assert.equal(s.housing.kind,'owned');assert.equal(s.housing.mortgage?.balance,50000);assert.equal(s.housing.rentalMortgage,undefined);assert.equal(s.flags.rentalPropertyValue,0);assert.equal(s.debt,debt);assert.equal(O.netWorth(s),before);
 const annual=s.housing.mortgage.annual;O.passive(s);assert.equal(s.housing.mortgage.balance,50000-(annual-Math.round(50000*.05)));assert(s.debt>=s.housing.mortgage.balance);
});
test('finishing a life twice cannot pay insurance or append ending history twice',()=>{
 const s=adult();s.routes.policies.insurance=true;s.routes.will={age:39,beneficiaries:[],communityShare:0};O.finish(s,'Synthetic regression ending');assert.equal(s.status,'finished');const after=JSON.stringify(s);O.finish(s,'Another reason');assert.equal(JSON.stringify(s),after);
});
test('cached currency formatting keeps the fixed display conventions',()=>{
 for(const [currency,rate]of [['GBP',.75],['USD',1],['HKD',7.8],['EUR',.9]]){O.setCurrency(currency);for(const amount of [0,1234.5,-321,Infinity]){const n=Number.isFinite(amount)?amount:0;if(!Number.isFinite(amount))continue;assert.equal(O.money(amount),new Intl.NumberFormat('en-GB',{style:'currency',currency,maximumFractionDigits:0}).format(n*rate));}}O.setCurrency('GBP');
});
test('saved lives continue identically at birth and after decisions at several ages',()=>{
 for(const age of [0,12,25,65]){const s=adult();s.age=age;s.pending=null;s.agenda=[];O.snapshot(s);const frozen=JSON.stringify(s),a=clone(s),b=JSON.parse(JSON.stringify(s));for(let i=0;i<16&&a.status==='alive';i++){
  if(a.pending){assert.equal(a.pending,b.pending);const e=O.EVENTS.find(e=>e.id===a.pending),index=e.options(a).findIndex(o=>!o.disabled);assert(index>=0);assert(O.applyChoice(a,index));assert(O.applyChoice(b,index));}else{O.advanceMonth(a);O.advanceMonth(b);}assert.deepEqual(a,b);
 }assert.equal(JSON.stringify(s),frozen,'continuing a copy must not change the source save');}
});

test('new adult contacts have a work or retirement status immediately',()=>{
 const s=adult();for(const age of [26,62,70,90]){const p=O.createContact(s,'Friend',age);assert.notEqual(p.job,'—');if(age>=67)assert.equal(p.job,'Retired');}assert.deepEqual(JSON.parse(JSON.stringify(O.lifeIssues(s))),[]);
});
test('every supported origin has a real foreign destination without setup',()=>{
 for(const country of O.COUNTRIES){const s=O.create({country:country.code,seed:317});s.age=30;s.education=O.EDU[2];s.cash=1e7;s.pending=null;s.agenda=[];s.flags.flow.schoolLeavingResolved=true;const d=O.ROUTES.find(d=>d.id==='overseas-study');const text=d.intro(s);assert(!/undefined/.test(text),country.code);const r={id:d.id,stage:'funding',years:3};assert(d.options(s,r).length,country.code);}
});
test('overseas full-time study gets part-time offers and preserves quoted pay',()=>{
 const s=adult();s.study={course:'Computing',degreeId:'computing',mode:'full-time',status:'overseas-route',started:39,duration:3,graduationAge:42};s.job='';s.income=0;s.employment={role:'',mode:'unemployed',hours:0};s.flags.studentWorkSearch=true;s.flags.jobSearching=true;s.flags.searchReady=s.age;s.flags.searchMode='pay';s.pending='career-search-results';O.ensureClarity(s);const offers=O.careerOffers(s);assert(offers.length);assert(offers.every(o=>o.mode==='part-time'&&o.hours===20));const quoted=offers[0].pay;assert(O.applyChoice(s,0));assert.equal(s.employment.mode,'part-time');assert.equal(s.employment.hours,20);assert.equal(s.income,quoted);assert(s.school);O.assertConsistent(s);
});
test('a prepared full-time work route is revalidated after enrolling overseas',()=>{
 const s=adult();const d=O.ROUTES.find(d=>d.id==='seafaring');s.routes.active.seafaring={id:'seafaring',stage:'consider',started:39,due:40,status:'decision',spent:100};s.study={course:'Nursing',degreeId:'nursing',mode:'full-time',status:'overseas-route',started:40,duration:3,graduationAge:43};s.job='';s.income=0;s.employment={role:'',mode:'unemployed',hours:0};s.pending='life-route-decision';assert(O.routeContinuationBlock(s,d,s.routes.active.seafaring));const e=O.EVENTS.find(e=>e.id===s.pending),opts=e.options(s);assert.equal(opts.length,1);assert.match(opts[0].label,/circumstances changed/);assert(O.applyChoice(s,0));assert(!s.routes.active.seafaring);assert.equal(s.study.status,'overseas-route');assert.equal(s.job,'');assert(s.routes.history.some(r=>r.id==='seafaring'&&r.outcome==='Circumstances changed'));
});
