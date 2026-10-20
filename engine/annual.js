/* One annual transaction; explicit preparation/finalization preserves established system order. */
(function(O){'use strict';
 const stages=[],active=new WeakSet(),clone=s=>JSON.parse(JSON.stringify(s));
 const restore=(s,before)=>{for(const key of Object.keys(s))delete s[key];Object.assign(s,before);};
 O.registerAnnualStage=function(id,prepare){
  if(stages.some(x=>x.id===id)||id==='core'||typeof prepare!=='function')throw Error('Invalid or duplicate annual stage: '+id);
  stages.push({id,prepare});
 };
 O.annualStageOrder=()=>['core',...stages.map(x=>x.id)];
 O.runAnnual=function(s){
  if(!s||s.status!=='alive')return {advanced:false};
  if(s.annualReceipt?.age===s.age)return clone(s.annualReceipt);
  if(s.annualReceipt?.age>s.age)throw Error('Annual time moved backwards.');
  if(active.has(s))throw Error('Recursive annual transition.');
  const before=clone(s),known=new Set(O.consistencyIssues(s).map(x=>x.code)),finalizers=[];active.add(s);
  try{
   for(let i=stages.length-1;i>=0&&s.status==='alive';i--){const done=stages[i].prepare(s);if(done)finalizers.unshift({id:stages[i].id,done});}
   const completed=[];
   if(s.status==='alive'){O.annualCore(s);completed.push('core');}
   for(const {id,done}of finalizers){if(s.status!=='alive')break;done();completed.push(id);}
   const issues=O.consistencyIssues(s).filter(x=>!known.has(x.code));
   if(issues.length)throw Error('Annual transition would create invalid state: '+issues.map(x=>x.code).join(', '));
   s.annualReceipt={age:s.age,stages:completed};return clone(s.annualReceipt);
  }catch(error){restore(s,before);throw error;}finally{active.delete(s);}
 };
 O.passive=O.runAnnual; // Retained API name; no module may replace it.
 O.completeBirthday=function(s){
  const before=clone(s);
  try{
   s.age++;s.month=0;s.lastOutcome='';O.runAnnual(s);
   if(s.status==='finished')return {advanced:true,finished:true,birthday:true};
   if(O.mortality(s)){O.finish(s);return {advanced:true,finished:true,birthday:true};}
   O.snapshot(s);s.agenda=O.makeAgenda(s);return {advanced:true,birthday:true};
  }catch(error){restore(s,before);throw error;}
 };
})(window.OL);
