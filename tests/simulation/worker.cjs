const {parentPort, workerData}=require('node:worker_threads');
const assert=require('node:assert/strict'),O=require('../engine.cjs');
O.snapshot=()=>{}; // Snapshot/replay is tested separately; cloning journals is not part of the model.
const eventMap=new Map(O.EVENTS.map(e=>[e.id,e]));
function choose(s,e,policy,step){
 const options=e.options(s).map((o,i)=>({o,i})).filter(x=>!x.o.disabled);
 assert(options.length,'No enabled option: '+e.id);
 let selected;
 const find=re=>options.find(x=>re.test(x.o.label));
 if(e.id==='school-entry')selected=policy===3?find(/home/):options[0];
 if(e.id==='adult-crossroads')selected=policy===3?find(/Prepare while/):policy===1||policy===2?find(/first full-time role/i):find(/university|subject/i);
 if(e.id==='choose-degree-subject')selected=options.filter(x=>O.DEGREES.some(d=>d.name===x.o.label))[s.seed%10]||options.find(x=>O.DEGREES.some(d=>d.name===x.o.label));
 if(e.id==='graduate-next-step')selected=policy===3?find(/time to decide/):options[0];
 if(e.id==='career-search-results')selected=options.find(x=>O.careerTrack(x.o.label));
 if(e.id==='university-funding-review')selected=find(/Confirm/ )||find(/grant/)||find(/year away/);
 if(e.id==='degree-assessment-review')selected=options[0];
 if(e.id==='life-route-decision')selected=policy===3?find(/Leave this route/):options[0];
 selected??=options[(s.seed+step*17+policy)%options.length];
 return selected;
}
function run(test){
 const {index,country,seed,quintile,policy,condition}=test;
 const s=O.create({country,seed,quintile});
 if(condition==='fragile'){s.health=35;s.happiness=35;}
 if(condition==='isolated'){s.relationships=20;s.stress=65;}
 let steps=0,decisions=0,clockCalls=0,years=0,workYears=0,familyChanges=0;const ceilings={health:0,happiness:0,knowledge:0,relationships:0}; const events={},groups={},degrees=new Set(),careers=new Set(),trace=[];
 const initial={people:s.people.map(p=>p.id),quintile:O.quintile(s)};
 let previous={age:s.age,month:s.month,people:s.people.map(p=>({...p}))};
 try {
  while(s.status==='alive'&&steps++<2600){
   if(!s.pending&&s.age>=19&&!(s.study&&['enrolled','funding-review','paused','overseas-route'].includes(s.study.status))&&!s.institution){
    if(!s.job&&!s.flags.jobSearching&&(policy!==3||s.age>=21))O.startJobSearch(s,'pay');
    if(policy===2&&s.job&&s.age>=20&&!s.routes.active['vocational-field']&&!s.routes.history.some(r=>r.id==='vocational-field')&&s.cash>=s.country.ppp*.045)O.startRoute(s,'vocational-field');
   }
   if(s.pending){
    const e=eventMap.get(s.pending);assert(e,'Unknown pending '+s.pending);
    assert(O.eventEligible(s,e,{resolving:true}),`Ineligible pending ${e.id} at ${s.age}`);
    const pick=choose(s,e,policy,steps);const id=e.id;
    assert(O.applyChoice(s,pick.i),'Rejected enabled option '+id+' / '+pick.o.label);
    assert.equal(s.used[id],s.age,'Choice missing cooldown history');
    events[id]=(events[id]||0)+1;
    const cat=/family|parent|child/i.test(e.category)?'family':/relationship|crush|love/i.test(e.category)?'relationships':/education|school|university|training/i.test(e.category)?'education':/work|career|employment/i.test(e.category)?'career':/health|well-being/i.test(e.category)?'health':/money|finance|wealth|housing/i.test(e.category)?'money':'other';
    groups[cat]=(groups[cat]||0)+1;decisions++;trace.push([s.age,s.month,id,pick.i]);
   }else{const r=O.advanceMonth(s);clockCalls++;if(r.birthday){years++;for(const k of Object.keys(ceilings))if(s[k]>=99)ceilings[k]++;}}
   for(const k of ['cash','debt','income','health','happiness','knowledge','relationships'])assert(Number.isFinite(s[k])&&s[k]>=0,'Invalid '+k);
   if(s.pending||previous.age!==s.age||s.status==='finished'){
    O.assertConsistent(s);
    assert.equal(O.transitionIssues(previous,s).length,0,O.transitionIssues(previous,s).join('; '));
    if(previous.age!==s.age){if(s.job&&s.job!=='Retired')workYears++;if(s.people.length!==previous.people.length||s.people.some(p=>!p.alive&&previous.people.find(q=>q.id===p.id)?.alive))familyChanges++;}
    previous={age:s.age,month:s.month,people:s.people.map(p=>({...p}))};
   }
   if(s.study?.status==='completed')degrees.add(s.study.degreeId||'legacy');
   if(s.job&&s.job!=='Retired')careers.add(s.job);
  }
  assert.equal(s.status,'finished','Life did not end within bound');O.assertConsistent(s);
  const moments=s.journal.filter(e=>e.momentId).map(e=>e.momentId);assert.equal(new Set(moments).size,moments.length,'Authored memory repeated');
  const repeats=Object.entries(events).filter(([id,n])=>n>1&&eventMap.get(id).milestone);assert.equal(repeats.length,0,'Repeated milestone');
  return {index,country,seed,quintile:initial.quintile,policy,condition,age:s.age,cause:s.cause,ceilings,steps,decisions,clockCalls,years,workYears,familyChanges,events,groups,degrees:[...degrees],careers:[...careers],factors:Object.fromEntries(['health','happiness','knowledge','relationships'].map(k=>[k,s[k]])),cash:s.cash,debt:s.debt};
 }catch(e){return {failure:true,...test,age:s.age,month:s.month,pending:s.pending,message:e.message,trace:trace.slice(-12),issues:O.consistencyIssues(s)};}
}
for(const test of workerData.cases){parentPort.postMessage(run(test));}
