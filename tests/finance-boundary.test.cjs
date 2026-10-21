const test=require('node:test'),assert=require('node:assert/strict'),O=require('./engine.cjs');
const copy=s=>JSON.parse(JSON.stringify(s));
function student(){
 const s=O.create({country:'GB',seed:61});for(const p of s.people)p.age+=18;
 Object.assign(s,{age:18,month:0,education:O.EDU[2],pending:null,agenda:[],job:'',income:0,cash:30000,debt:0,familyCash:100000,familyAssets:200000,familyDebts:0,school:false,knowledge:90,health:85,schoolGrades:90,interests:['Programming']});s.flags.livingWithFamily=true;O.ensureClarity(s);
 const chance=O.chance;try{O.chance=()=>true;O.applyForDegree(s,'computing');}finally{O.chance=chance;}assert.equal(s.study.status,'enrolled');s.age=19;return s;
}
test('annual costs have one explicit, once-per-age settlement owner',()=>{
 const s=student(),before=copy(s),quote=O.quoteAnnualCosts(s,8000);assert.equal(JSON.stringify(s),JSON.stringify(before),'quote changed live state');
 const result=O.settleAnnualCosts(s,8000);assert.equal(result.total,quote.total);assert.deepEqual(copy(result.breakdown),copy(quote.breakdown));
 const family=before.familyCash+before.familyAssets-s.familyCash-s.familyAssets;
 assert.equal(family,result.familyTuition+result.familyLiving,'family withdrawals must equal recorded gifts');
 assert.equal(before.cash-s.cash,result.personalTuition,'personal tuition must be paid exactly once');
 assert.equal(s.study.funding.history.length,2);assert.equal(s.study.funding.livingHistory.length,1);
 const after=JSON.stringify(s);assert.deepEqual(copy(O.settleAnnualCosts(s,8000)),copy(result));assert.equal(JSON.stringify(s),after,'repeated settlement changed state');
 const loaded=O.migrateLife(s);assert.equal(JSON.stringify(loaded),after,'reload changed settled history');O.settleAnnualCosts(loaded,8000);assert.equal(JSON.stringify(loaded),after);
});
test('unaffordable tuition and policies change only at settlement',()=>{
 const s=student();s.cash=0;s.familyCash=0;s.familyAssets=0;s.routes.policies.insurance=true;
 const before=JSON.stringify(s),a=O.quoteAnnualCosts(s,8000),b=O.quoteAnnualCosts(s,8000);assert.deepEqual(a,b);assert.equal(JSON.stringify(s),before);
 const result=O.settleAnnualCosts(s,8000);assert.equal(s.study.status,'funding-review');assert.equal(s.debt,0);assert.equal(s.routes.policies.insurance,false);assert.equal(result.personalTuition,0);
 const after=JSON.stringify(s);O.settleAnnualCosts(s,8000);assert.equal(JSON.stringify(s),after,'funding interruption/journal repeated');
});
test('current save loading preserves established history and does not settle an estate',()=>{
 const s=student();s.study=null;s.school=false;for(const p of s.people){p.alive=false;p.diedAt=p.age;}
 const before=JSON.stringify(s),loaded=O.migrateLife(s);assert.equal(JSON.stringify(s),before);assert.equal(JSON.stringify(loaded),before,'loading performed a simulation transition');
 assert.equal(JSON.stringify(O.migrateLife(loaded)),before);
});
test('profile, family, spending, finance and art reads preserve money, people, RNG and history',()=>{
 const s=student();for(const p of s.people){p.alive=false;p.diedAt=p.age;}s.study=null;s.school=false;
 const avatar=O.spriteAvatar;O.spriteAvatar=()=>'';
 try{for(let i=0;i<3;i++)for(const fn of ['profileHTML','familyHTML','spendHTML','financesHTML','householdCaption','householdAges']){
  const before=JSON.stringify(s);assert.equal(typeof O[fn](s),'string',fn);assert.equal(JSON.stringify(s),before,fn+' mutated a life');
 }}finally{O.spriteAvatar=avatar;}
 const before=JSON.stringify(s);O.drawScene({getContext:()=>null},'home',s);assert.equal(JSON.stringify(s),before,'art mutated a life');
 const cash=s.cash;O.settleFamilyEstate(s);assert(s.cash>cash,'estate must still settle at its explicit transition');
 const after=JSON.stringify(s);O.settleFamilyEstate(s);assert.equal(JSON.stringify(s),after,'estate paid twice');
});
test('legacy save migrations keep journal, RNG and family wealth without inventing payments',()=>{
 for(const status of ['alive','paused','finished']){
  const s=student();delete s.schemaVersion;s.status=status;s.study=null;s.school=false;
  for(const p of s.people){p.alive=false;p.diedAt=p.age;}const before=JSON.stringify(s),loaded=O.migrateLife(s);
  assert.equal(JSON.stringify(s),before);assert.equal(JSON.stringify(loaded.journal),JSON.stringify(s.journal));assert.equal(loaded.rng,s.rng);
  for(const key of ['cash','familyCash','familyAssets','debt','inheritance'])assert.equal(loaded[key],s[key],key);
  assert.equal(JSON.stringify(O.migrateLife(loaded)),JSON.stringify(loaded));
 }
});
test('prepaid overseas and institutional budgets remain valid with continuing commitments',()=>{
 for(const country of O.COUNTRIES)for(const type of ['overseas','institution']){
  const s=O.create({country:country.code,seed:61});s.age=30;s.cash=100000;s.school=false;s.job='';s.income=0;
  s.routes.policies={checkups:true,insurance:true,parentCare:2000};
  if(type==='overseas')s.routes.active['overseas-study']={id:'overseas-study',stage:'study'};else s.institution={type:'military'};
  const before=JSON.stringify(s),quote=O.quoteAnnualCosts(s,12000);assert.equal(JSON.stringify(s),before);
  assert.equal(quote.total,type==='institution'?0:Math.round(country.ppp*.008)+Math.round(country.ppp*.025));
  assert.equal(quote.familyTuition+quote.familyLiving,0);assert(Number.isFinite(quote.total));
  const result=O.settleAnnualCosts(s,12000);assert.equal(result.total,quote.total);assert.equal(s.cash,100000);
 }
});
test('a failed annual commitment rolls back all earlier gifts, history and RNG',()=>{
 const s=student(),before=JSON.stringify(s),commit=O.commitFamilyGift;let draws=0;
 try{O.commitFamilyGift=(s,q)=>{commit(s,q);if(++draws===2)throw Error('Synthetic transfer failure');};assert.throws(()=>O.settleAnnualCosts(s,8000),/Synthetic transfer failure/);}
 finally{O.commitFamilyGift=commit;}
 assert.equal(draws,2,'fixture must exercise a partial commit');assert.equal(JSON.stringify(s),before);
});
test('untracked legacy family cash is marked unknown without creating money or rewriting history',()=>{
 const s=student();delete s.schemaVersion;delete s.familyCash;const before=JSON.stringify(s),a=O.migrateLife(s);
 assert.equal(JSON.stringify(s),before);assert.equal(a.familyCash,0);assert.equal(a.flags.legacyFamilyCashUnknown,true);
 assert.equal(a.familyAssets,s.familyAssets);assert.equal(a.cash,s.cash);assert.equal(a.debt,s.debt);
 assert.equal(JSON.stringify(a.journal),JSON.stringify(s.journal));assert.equal(JSON.stringify(O.migrateLife(a)),JSON.stringify(a));
 assert(!O.consistencyIssues(a).some(x=>x.code==='money.familyCash'));
 const avatar=O.spriteAvatar;try{O.spriteAvatar=()=>'';assert.match(O.familyHTML(a),/No opening savings were invented/);}finally{O.spriteAvatar=avatar;}
});
test('a known zero family-debt balance stays zero through migration and later adapters',()=>{
 const s=student();s.strata=0;s.familyIncome=5000;s.familyDebts=0;delete s.schemaVersion;
 const loaded=O.migrateLife(s);assert.equal(loaded.familyDebts,0,'loading must not create a family liability');
 for(let i=0;i<3;i++){O.upgradeLife(loaded);assert.equal(loaded.familyDebts,0,'a cleared liability reappeared');}
});
