/* 250 complete four-peer worlds: 1,000 additional, per-action asserted simulated lives. */
const {Worker,isMainThread,parentPort,workerData}=require('node:worker_threads'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os');
if(!isMainThread){
 const O=require('./engine.cjs'),{loadEngine}=O;
 function comparable(s){const c=JSON.parse(JSON.stringify(s));delete c.parallelWorld;delete c.settings.comparisons;return JSON.stringify(c);}
 for(const n of workerData){const country=O.COUNTRIES[n%O.COUNTRIES.length].code,seed=Math.imul(n+1,2246822519)>>>0;
  try{const A=loadEngine(),B=loadEngine(),a=A.create({country,seed,comparisons:false,snapshotPolicy:'none'}),s=B.create({country,seed,comparisons:true,snapshotPolicy:'none'});assert.equal(comparable(s)===comparable(a),true,'comparison generation changed the player');assert.equal(s.parallelWorld.lives.length,4);
   const peers=s.parallelWorld.lives.map(p=>{assert.equal(p.timeline.at(-1).status,'finished');assert(p.death.cause);assert(p.validation.states===p.validation.actions+1);assert(p.validation.actions<3000);assert(p.timeline.every((t,i)=>i===0||t.at>p.timeline[i-1].at));return {seed:p.seed,country:p.country.code,age:p.death.age,actions:p.validation.actions,states:p.validation.states,decisions:p.validation.decisions,points:p.timeline.length};});parentPort.postMessage({n,country,seed,bytes:JSON.stringify(s).length,peers});
  }catch(e){parentPort.postMessage({n,country,seed,error:e.message,comparison:e.comparison,stack:e.stack});}
 }
}else{
 const O=require('./engine.cjs'),requested=Number(process.argv.find(a=>a.startsWith('--lives='))?.split('=')[1]||1000);assert(Number.isInteger(requested)&&requested>0&&requested%4===0);
 const worlds=requested/4,workers=Math.min(4,os.availableParallelism(),worlds),results=[];
 Promise.all(Array.from({length:workers},(_,w)=>new Promise((resolve,reject)=>{const worker=new Worker(__filename,{workerData:Array.from({length:worlds},(_,n)=>n).filter(n=>n%workers===w)});worker.on('message',r=>{results.push(r);if(r.error)console.error(JSON.stringify(r));if(results.length%25===0)console.log('Parallel worlds',results.length,'/',worlds);});worker.on('error',reject);worker.on('exit',c=>c?reject(Error('Worker exited '+c)):resolve());}))).then(()=>{
  const failures=results.filter(r=>r.error),peers=results.flatMap(r=>r.peers||[]);const report={requested,worlds:results.length,validated:peers.length,failed:failures.length,playerOrigins:new Set(results.map(r=>r.country)).size,peerCountries:new Set(peers.map(p=>p.country)).size,states:peers.reduce((n,p)=>n+p.states,0),decisions:peers.reduce((n,p)=>n+p.decisions,0),ages:{min:Math.min(...peers.map(p=>p.age)),max:Math.max(...peers.map(p=>p.age))},maxSaveBytes:Math.max(...results.map(r=>r.bytes||0)),failures,results};
  fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/parallel-summary.json',JSON.stringify(report,null,2));console.log(JSON.stringify({...report,results:undefined},null,2));assert.equal(results.length,worlds);assert.equal(failures.length,0,'invalid comparison lives');assert.equal(peers.length,requested);assert.equal(new Set(peers.map(p=>p.seed)).size,requested,'duplicate seeded peers');if(requested>=1000){assert.equal(report.playerOrigins,O.COUNTRIES.length);assert(report.peerCountries>=30,'comparison birth diversity collapsed');assert(peers.some(p=>p.age<18));assert(peers.some(p=>p.age>=65));}console.log('PASS asserted complete comparison lives:',peers.length);
 }).catch(e=>{console.error(e);process.exitCode=1;});
}
