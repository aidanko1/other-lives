/* Reproducible, assertion-driven complete lives. No external dependency. */
const {Worker}=require('node:worker_threads'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),os=require('node:os');
const O=require('../engine.cjs');
const value=(name,fallback)=>{const i=process.argv.indexOf(name);return i<0?fallback:Number(process.argv[i+1]);};
const count=value('--lives',1000),start=value('--start',0),workers=Math.min(value('--workers',4),os.availableParallelism(),count);
assert(count>0&&Number.isInteger(count));
const codes=O.COUNTRIES.map(c=>c.code),cases=Array.from({length:count},(_,n)=>{const index=start+n;return {index,country:codes[Math.floor(index/5)%codes.length],quintile:index%5+1,seed:(Math.imul(index+1,2654435761)>>>0)||1,policy:Math.floor(index/5)%4,condition:index%13===0?'fragile':index%17===0?'isolated':'baseline'};});
const results=[],began=Date.now();
Promise.all(Array.from({length:workers},(_,w)=>new Promise((resolve,reject)=>{
 const worker=new Worker(path.join(__dirname,'worker.cjs'),{workerData:{cases:cases.filter((_,i)=>i%workers===w)}});
 worker.on('message',r=>{results.push(r);if(r.failure)console.error('FAIL',JSON.stringify(r));if(results.length%100===0)console.log('Completed',results.length,'/',count);});
 worker.on('error',reject);worker.on('exit',code=>code?reject(Error('Worker exited '+code)):resolve());
}))).then(()=>{
 results.sort((a,b)=>a.index-b.index);const failures=results.filter(r=>r.failure),ok=results.filter(r=>!r.failure);
 const sum=k=>ok.reduce((n,r)=>n+(r[k]||0),0),freq=k=>{const m={};for(const r of ok)for(const [id,n]of Object.entries(r[k]||{}))m[id]=(m[id]||0)+n;return m;};
 const report={format:'other-lives-simulation-report-v1',requested:count,completed:ok.length,failures:failures.length,seconds:Math.round((Date.now()-began)/1000),clockCalls:sum('clockCalls'),decisions:sum('decisions'),coverage:{countries:new Set(ok.map(r=>r.country)).size,quintiles:[...new Set(ok.map(r=>r.quintile))].sort(),policies:[...new Set(ok.map(r=>r.policy))],conditions:[...new Set(ok.map(r=>r.condition))],degreeSubjects:[...new Set(ok.flatMap(r=>r.degrees))],careerRoles:[...new Set(ok.flatMap(r=>r.careers))].sort()},balance:{meanAge:ok.length?sum('age')/ok.length:0,ageBands:Object.fromEntries([0,5,18,40,65,85].map((a,i,arr)=>[a+'-'+((arr[i+1]||121)-1),ok.filter(r=>r.age>=a&&r.age<(arr[i+1]||121)).length])),decisionCategories:freq('groups'),eventCounts:freq('events'),livesWithPaidWork:ok.filter(r=>r.workYears>0).length,livesWithFamilyChange:ok.filter(r=>r.familyChanges>0).length,factorCeilingYearRates:Object.fromEntries(['health','happiness','knowledge','relationships'].map(k=>[k,ok.reduce((n,r)=>n+r.ceilings[k],0)/Math.max(1,sum('years'))])),fullFactorsAtDeath:ok.filter(r=>Object.values(r.factors).every(v=>v>=99)).length},results};
 fs.mkdirSync(path.join(__dirname,'../reports'),{recursive:true});const out=path.join(__dirname,'../reports/simulation-latest.json');fs.writeFileSync(out,JSON.stringify(report,null,2));
 console.log(JSON.stringify({...report,results:undefined},null,2));
 assert.equal(results.length,count,'Missing worker results');assert.equal(failures.length,0,'Consistency failures; see report for seeds and traces');
 if(count>=1000){assert.equal(report.coverage.countries,codes.length,'Release must exercise every playable country');assert.equal(report.coverage.quintiles.length,5);assert.equal(report.coverage.policies.length,4);assert(ok.some(r=>r.age>=65),'No later life coverage');assert(ok.some(r=>r.age<18),'No childhood mortality coverage');assert(report.balance.livesWithPaidWork>count*.15,'Too few lives ever enter work');assert(report.balance.fullFactorsAtDeath<count*.05,'Factor saturation');for(const [factor,rate]of Object.entries(report.balance.factorCeilingYearRates))assert(rate<.25,'Excessive saturation of '+factor);assert(ok.filter(r=>(r.policy===1||r.policy===2)&&r.age>=30&&r.workYears>0).length>ok.filter(r=>(r.policy===1||r.policy===2)&&r.age>=30).length*.7,'Work-seeking policies seldom obtain paid work');for(const group of ['family','relationships','education','career','health','money'])assert((report.balance.decisionCategories[group]||0)>0,'Unexercised decision category '+group);}
 console.log('PASS complete simulated lives:',ok.length);
}).catch(e=>{console.error(e);process.exitCode=1;});
