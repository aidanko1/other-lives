/* A serialized, read-only decision view binds UI clicks to the exact options the player saw. */
(function(O){'use strict';
 const hash=text=>{let n=2166136261;for(const c of text)n=Math.imul(n^c.charCodeAt(0),16777619);return (n>>>0).toString(16);};
 O.decisionView=function(s){
  if(!s.pending)return null;
  const copy=JSON.parse(JSON.stringify(s)),event=O.EVENTS.find(e=>e.id===copy.pending);
  if(!event)return null;
  const route=copy.pending==='life-route-decision'?O.readyRoute(copy):null;
  const title=event.title(copy),description=O.personalDecisionCopy?O.personalDecisionCopy(copy,event):event.description(copy);
  const options=(O.decisionOptions?O.decisionOptions(copy,event):event.options(copy)).map(({apply,...option})=>option);
  const context=O.contextForDecision?.(copy,event)||O.factForEvent(copy,event)||null;
  const identity={life:s.id,id:event.id,age:s.age,month:s.month,route:route?{id:route.id,started:route.started,stage:route.stage,due:route.due,participants:route.participants}:null,title,description,options};
  return {id:event.id,title,description,options,context,token:hash(JSON.stringify(identity))};
 };
})(window.OL);
