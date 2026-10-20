/* Atomic command boundary for the legacy systems during incremental extraction. */
(function(O){
 'use strict';
 const active=new WeakSet();
 function restore(target, snapshot){for(const key of Object.keys(target))delete target[key];Object.assign(target,snapshot);}
 function command(name, succeeded){
  const implementation=O[name];
  O[name]=function(s,...args){
   if(active.has(s))return implementation(s,...args);
   if(name==='applyChoice'&&(!Number.isInteger(args[0])||args[0]<0||!s.pending))return false;
   const before=JSON.parse(JSON.stringify(s)),known=new Set(O.consistencyIssues(s).map(x=>x.code));active.add(s);
   try{
    if(name==='applyChoice'&&!O.eventEligible(s,O.EVENTS.find(e=>e.id===s.pending),{resolving:true})){restore(s,before);return false;}
    const result=implementation(s,...args);
    if(!succeeded(result)){restore(s,before);return result;}
    const issues=O.consistencyIssues(s).filter(x=>!known.has(x.code));
    if(issues.length)throw Error(name+' would create an invalid state: '+issues.map(x=>x.code).join(', '));
    return result;
   }catch(error){restore(s,before);throw error;}finally{active.delete(s);}
  };
 }
 command('applyChoice',Boolean);command('startRoute',r=>r?.ok);command('planAction',r=>r?.ok);
})(window.OL);
