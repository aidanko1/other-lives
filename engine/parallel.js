/* Four passive comparison lives; production simulation, independent RNG, compact saved history. */
(function(O){'use strict';
 const copy=value=>JSON.parse(JSON.stringify(value));
 const peerSeed=(seed,index)=>{let n=(seed^Math.imul(index+1,0x9e3779b9))>>>0;n=Math.imul(n^(n>>>16),0x85ebca6b);n=Math.imul(n^(n>>>13),0xc2b2ae35);return (n^(n>>>16))>>>0;};
 const position=s=>({age:s.age,month:s.month,people:s.people.map(p=>({id:p.id,name:p.name,age:p.age,alive:p.alive}))});
 function check(s,before){
  O.assertConsistent(s);
  const issues=O.lifeIssues(s);if(issues.length)throw Error('Invalid comparison life: '+issues.join('; '));
  if(before){const transitions=O.transitionIssues(before,s);if(transitions.length)throw Error('Invalid comparison timeline: '+transitions.join('; '));
   for(const p of before.people)if(s.people.find(q=>q.id===p.id)?.name!==p.name)throw Error('Comparison identity changed.');
  }
 }
 function point(s){return {at:s.age*12+s.month,status:s.status,stage:O.stage(s.age),education:O.schoolLabel(s),work:O.workLabel(s),country:{code:s.country.code,name:s.country.name},children:s.people.filter(p=>p.role==='Child').length,partner:s.people.find(p=>p.role==='Partner'&&p.alive)?.name||null,cause:s.status==='finished'?s.cause:null};}
 function record(history,s){
  const next=point(s),last=history.at(-1),same=last&&JSON.stringify({...last,at:0})===JSON.stringify({...next,at:0});
  if(last?.at===next.at)history[history.length-1]=next;else if(!same)history.push(next);
 }
 O.simulateParallelLife=function(settings){
  const s=O.create({...settings,comparisons:false,snapshotPolicy:'none'}),history=[];check(s);record(history,s);
  const birth={seed:s.seed,name:s.name,gender:s.gender,country:{code:s.country.code,name:s.country.name},household:O.tier(s),urban:s.urban};let actions=0,decisions=0;
  try{while(s.status==='alive'&&actions<3000){const before=position(s);actions++;
   if(s.pending){const view=O.decisionView(s);if(!view)throw Error('Missing comparison decision.');const choices=view.options.map((o,i)=>o.disabled?null:i).filter(i=>i!==null);
    if(!choices.length||!O.applyChoice(s,O.pick(s,choices),view.token))throw Error('Unresolvable comparison decision: '+s.pending);decisions++;
   }else O.advanceMonth(s);
   check(s,before);record(history,s);
  }}catch(error){error.message=`Comparison seed ${s.seed}, ${s.country.code}, age ${s.age}:${s.month}, pending ${s.pending}: ${error.message}`;error.comparison={seed:s.seed,country:s.country.code,age:s.age,month:s.month,pending:s.pending,partners:s.people.filter(p=>/partner/i.test(p.role)).map(p=>({id:p.id,name:p.name,age:p.age,role:p.role,knownSince:p.knownSince,relationshipStage:p.relationshipStage,alive:p.alive})),recentChoices:s.choiceHistory.slice(-8)};throw error;}
  if(s.status!=='finished'||!s.cause||!s.finishedAt||s.pending)throw Error('Comparison life failed to complete.');
  const moments=s.journal.filter(e=>e.momentId).map(e=>e.momentId);if(new Set(moments).size!==moments.length)throw Error('Repeated authored comparison memory.');
  return {...birth,timeline:history,death:{age:s.age,month:s.month,cause:s.cause},validation:{actions,decisions,states:actions+1}};
 };
 O.buildParallelWorld=function(s){
  const lives=Array.from({length:4},(_,i)=>O.simulateParallelLife({seed:peerSeed(s.seed,i),year:s.birthYear,draw:s.settings.draw||'birth'}));
  if(new Set(lives.map(p=>p.seed)).size!==4)throw Error('Duplicate comparison seeds.');
  return {version:1,id:'parallel-'+s.birthYear+'-'+s.seed,lives};
 };
 O.parallelView=function(s){
  if(s?.parallelWorld?.version!==1||!Array.isArray(s.parallelWorld.lives))return [];
  const date=s.age*12+s.month;
  return s.parallelWorld.lives.map(p=>{if(!p||typeof p.name!=='string'||!p.country?.name||!Array.isArray(p.timeline))return null;const now=p.timeline.findLast(t=>t&&Number.isInteger(t.at)&&t.at>=0&&t.at<=date);if(!now||!['alive','finished'].includes(now.status))return null;return {name:p.name,gender:p.gender,birthCountry:p.country.name,household:p.household,...copy(now),age:now.status==='finished'?Math.floor(now.at/12):s.age};}).filter(Boolean);
 };
 O.replayState=function(source,snapshot){
  if(!source?.snapshots?.includes(snapshot))throw Error('Turning point does not belong to this life.');
  const state=O.migrateLife(snapshot.data);
  if(state.parallelWorldRef){if(source.parallelWorld?.id!==state.parallelWorldRef.id)throw Error('Comparison history is missing from this turning point.');state.parallelWorld=copy(source.parallelWorld);delete state.parallelWorldRef;}
  return state;
 };
})(window.OL);
