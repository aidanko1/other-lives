const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),O=require('./engine.cjs'),{validate,checkpoint}=require('./invariants.cjs');
const arg=(name,fallback)=>Number(process.argv.find(x=>x.startsWith('--'+name+'='))?.split('=')[1]??fallback);
const count=arg('count',1000),shard=arg('shard',0),shards=arg('shards',1);
assert(Number.isInteger(count)&&count>0);assert(Number.isInteger(shards)&&shards>0&&shard>=0&&shard<shards);
const backgrounds=['random','hardship','comfortable','top1'],outcomes=[],failures=[],eventCounts={},routeCounts={};
// Snapshot copying is omitted in batches only; real snapshots/save continuation have a separate test.
O.snapshot=()=>{};
for(let n=shard;n<count;n+=shards){
 const country=O.COUNTRIES[n%O.COUNTRIES.length].code,seed=((n+1)*317)>>>0,background=backgrounds[Math.floor(n/O.COUNTRIES.length)%backgrounds.length];
 let s,actions=0,decisions=0,last='',same=0;
 try{
  s=O.create({country,seed,classChoice:background});validate(O,s);
  while(s.status==='alive'&&actions++<3000){
   const before=checkpoint(s);
   if(s.pending){const e=O.EVENTS.find(e=>e.id===s.pending);assert(e,'unknown decision '+s.pending);const usable=e.options(s).map((o,i)=>({o,i})).filter(x=>!x.o.disabled);assert(usable.length,'no enabled choice '+e.id);const selected=usable[(seed+decisions)%usable.length];eventCounts[e.id]=(eventCounts[e.id]||0)+1;assert(O.applyChoice(s,selected.i),'rejected enabled choice '+e.id);decisions++;}
   else{
    // Exercise optional existing intentions in a subset of lives, without adding gameplay.
    if(n%3===0&&s.age>=18&&s.month===0&&s.flags.simRouteAt!==s.age){s.flags.simRouteAt=s.age;const available=O.ROUTES.filter(d=>!O.routeBlock(s,d)&&s.cash>=O.routeCost(s,d));if(available.length){const d=available[(seed+s.age)%available.length];const result=O.startRoute(s,d.id);if(result.ok)routeCounts[d.id]=(routeCounts[d.id]||0)+1;}}
    O.advanceMonth(s);
   }
   validate(O,s,before);
   const key=s.age+'|'+s.month+'|'+s.pending+'|'+s.study?.status+'|'+s.routes.history.length;
   same=key===last?same+1:0;last=key;assert(same<=12,'stalled '+key);
  }
  assert.equal(s.status,'finished','life did not finish within action bound');validate(O,s);
  const moments=s.journal.map(e=>e.momentId).filter(Boolean);assert.equal(new Set(moments).size,moments.length,'authored moment template repeated');
  outcomes.push({n,country,seed,background,age:s.age,decisions,actions,people:s.people.length,job:s.job,degree:s.study?.status||null});
 }catch(error){const failure={n,country,seed,background,age:s?.age,month:s?.month,pending:s?.pending,error:error.message,stack:error.stack,route:s?.pending==='life-route-decision'?O.readyRoute(s)?.id:null,study:s?.study,employment:s?.employment,job:s?.job,unprogressed:s?.people.filter(p=>p.alive&&p.age>25&&/^(Student|Pupil|—|Not working|)$/i.test(p.job||'')&&!p.studyUntil)};failures.push(failure);console.error(JSON.stringify(failure));}
 if((n-shard)% (shards*25)===0)console.log('PROGRESS',JSON.stringify({shard,attempted:outcomes.length+failures.length,validated:outcomes.length,failures:failures.length}));
}
const expected=Math.max(0,Math.ceil((count-shard)/shards));
const summary={count,shard,shards,attempted:outcomes.length+failures.length,validated:outcomes.length,failed:failures.length,countries:[...new Set(outcomes.map(x=>x.country))],backgrounds:[...new Set(outcomes.map(x=>x.background))],ageBands:{under18:outcomes.filter(x=>x.age<18).length,adult:outcomes.filter(x=>x.age>=18&&x.age<65).length,older:outcomes.filter(x=>x.age>=65).length},decisions:outcomes.reduce((n,x)=>n+x.decisions,0),eventCounts,routeCounts,failures,outcomes};
const dir=path.join(__dirname,'..','test-results');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'simulation-'+shard+'.json'),JSON.stringify(summary,null,2));console.log('SUMMARY',JSON.stringify({...summary,outcomes:undefined,eventCounts:undefined,failures:undefined}));
assert.equal(summary.attempted,expected,'scenario lost');assert.equal(summary.failed,0,'simulation assertion failures');assert.equal(summary.validated,expected,'incomplete batch');
module.exports=summary;
