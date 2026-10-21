/* Read-only presentation rules. Saved tones, people, outcomes and decision tokens stay intact. */
(function(O){'use strict';
O.logTone=function(entry){
 if(!entry)return 'neutral';
 const title=String(entry.title||'').trim(),type=String(entry.type||'').toLowerCase();
 if(['birth','milestone','money'].includes(type))return 'neutral';
 if(['loss','ending'].includes(type)||/^Goodbye(?:,| to)\s/i.test(title))return 'bad';
 if(/^(?:A qualification earned|Training completed|Study completed)$/.test(title))return 'good';
 if(/^(?:Study interrupted|A preventable illness|A difficult emotional spell|You have become isolated)$/.test(title))return 'bad';
 if(entry.eventId==='promotion'){
  if(/\bYou progress from .+ to .+[,\.]/.test(entry.description||''))return 'good';
  if(/\bThe application is unsuccessful\./.test(entry.description||''))return 'bad';
 }
 // Ordinary memories, mixed choices, costs and small factor changes carry no verdict.
 return 'neutral';
};
const escapeRx=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
O.decisionText=function(s,value){
 let text=String(value??'');if(!s)return text;
 const aliases=new Map(),protectedWords=new Set([s.location?.name,s.birthPlace?.name,s.country?.name,...(s.interests||[])].filter(Boolean).flatMap(v=>[v,...v.split(/\s+/)]));
 const people=[...(s.people||[])];const candidate=s.flags?.dynamics?.candidate?.person;if(candidate?.name&&!people.some(p=>p.id===candidate.id))people.push({...candidate,role:'Acquaintance'});
 if(s.memories?.teacher?.name&&!people.some(p=>p.name===s.memories.teacher.name))people.push({...s.memories.teacher,role:'Teacher'});
 if(s.memories?.pet?.name)people.push({...s.memories.pet,role:'Pet'});
 const add=(name,p)=>{if(!aliases.has(name))aliases.set(name,[]);aliases.get(name).push(p);};
 for(const p of people){const name=String(p.name||'').trim();if(!name)continue;add(name,p);const first=name.split(/\s+/)[0];if(first!==name&&first.length>=3&&!protectedWords.has(first)&&!['May','Will','Bill','Art','Summer','Hope','Faith','Joy','Rose','Mark'].includes(first))add(first,p);}
 if(!aliases.size)return text;
 const pattern=[...aliases.keys()].sort((a,b)=>b.length-a.length).map(escapeRx).join('|');
 const roles='mum|mom|mother|dad|father|parent|sister|brother|sibling|son|daughter|child|grandmother|grandfather|grandparent|former partner|partner|spouse|wife|husband|friend|mentor|teacher|acquaintance|pet|cat|dog'.split('|').map(r=>'['+r[0].toUpperCase()+r[0]+']'+r.slice(1)).join('|');
 const rx=new RegExp('(^|[^\\p{L}\\p{N}_])(?:(?:(?:[Yy]our|[Tt]he|[Aa])\\s+)?(?:'+roles+')\\s*(?:[—–,:]\\s*|\\(\\s*|\\s+))?('+pattern+')(?:\\))?(?=$|[^\\p{L}\\p{N}_])','gu');
 text=text.replace(rx,(whole,prefix,name)=>{const matches=aliases.get(name);if(matches.length!==1)return whole;const p=matches[0],label=p.role==='Pet'?'your '+(p.kind||'pet'):p.role==='Acquaintance'?'your acquaintance':O.memoryPerson(s,p);return prefix+label+' '+name;});
 return text.replace(/(^|[.!?]\s+|\n)(your\b|someone\b)/g,(_m,prefix,word)=>prefix+word[0].toUpperCase()+word.slice(1));
};
O.narrativeText=(s,value)=>O.decisionText(s,O.cleanLogText(s,value));
// UI memory only, keyed by life and panel: actions may rebuild DOM, not reset disclosures.
const menus=new Map();
O.rememberSpendMenus=function(root){
 for(const scope of root.querySelectorAll('.spend-content')){
  const key=scope.dataset.spendLife+'|'+(scope.closest('.inspector-sheet')?'inspector':'main');
  const saved=menus.get(key)||new Map();for(const d of scope.querySelectorAll('details[data-menu-key]'))saved.set(d.dataset.menuKey,d.open);menus.set(key,saved);
 }
};
O.restoreSpendMenus=function(root){
 for(const scope of root.querySelectorAll('.spend-content')){
  const key=scope.dataset.spendLife+'|'+(scope.closest('.inspector-sheet')?'inspector':'main'),saved=menus.get(key);if(!saved)continue;
  for(const d of scope.querySelectorAll('details[data-menu-key]'))if(saved.has(d.dataset.menuKey))d.open=saved.get(d.dataset.menuKey);
 }
};
})(window.OL);
