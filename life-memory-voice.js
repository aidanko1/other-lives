/* Relationships lead the memory narration; identities remain in People and Family. */
(function(O){'use strict';
O.VERSION='5.9.2';
const escaped=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
O.memoryPerson=function(s,p){
 if(!p)return 'someone close to you';if(p===s)return 'you';if(p.kind&&!p.role)return p.name; // Keep chosen pet names.
 const role=O.parentRole?O.parentRole(p):p.role;
 switch(role){
  case 'Mother':return 'your mum';case 'Father':return 'your dad';
  case 'Sibling':return p.gender==='F'?'your sister':p.gender==='M'?'your brother':'your sibling';
  case 'Child':return p.gender==='F'?'your daughter':p.gender==='M'?'your son':'your child';
  case 'Grandparent':return p.gender==='F'?'your grandmother':p.gender==='M'?'your grandfather':'your grandparent';
  case 'Partner':return 'your partner';case 'Former partner':return 'your former partner';
  case 'Friend':return 'your friend';case 'Mentor':return /teacher/i.test(p.job||'')?'your teacher':'your mentor';
  case 'Acquaintance':return 'someone you know';case 'Teacher':return 'your teacher';
  default:return 'your relative';
 }
};
const roleWords='mum|mom|mother|dad|father|parent|sister|brother|sibling|son|daughter|child|grandmother|grandfather|grandparent|former partner|partner|spouse|wife|husband|friend|mentor|teacher|relative'.split('|').map(word=>'['+word[0].toLowerCase()+word[0].toUpperCase()+']'+word.slice(1)).join('|');
const capitalise=text=>text.replace(/(^|[.!?]\s+|\n)(your\b|someone\b)/g,(_m,prefix,word)=>prefix+word[0].toUpperCase()+word.slice(1));
O.memoryText=function(s,value){
 let text=String(value??'');if(!s)return text;
 const people=s.people||[],aliases=new Map(),protectedWords=new Set([s.location?.name,s.birthPlace?.name,s.country?.name,s.memories?.pet?.name,...(s.interests||[])].filter(Boolean).flatMap(v=>[v,...v.split(/\s+/)]));
 const add=(name,label)=>{if(!name)return;const labels=aliases.get(name)||new Set();labels.add(label);aliases.set(name,labels);};
 for(const p of people){const label=O.memoryPerson(s,p),name=String(p.name||'').trim();if(!name)continue;add(name,label);const first=name.split(/\s+/)[0];if(first.length>=3&&!protectedWords.has(first)&&!['May','Will','Bill','Art','Summer','Hope','Faith','Joy','Rose','Mark'].includes(first))add(first,label);}
 // One combined replacement prevents a person's name being matched inside a replacement label.
 if(aliases.size){const pattern=[...aliases.keys()].sort((a,b)=>b.length-a.length).map(escaped).join('|'),rx=new RegExp('(^|[^\\p{L}\\p{N}_])('+pattern+')(?=$|[^\\p{L}\\p{N}_])','gu');
  // Consume a preceding relationship label, avoiding "your son your son" in birth memories.
  const labelled=new RegExp('\\b(?:(?:[Yy]our|[Tt]he|[Aa])\\s+)?(?:'+roleWords+')\\s*(?:[—–,:]\\s*|\\(\\s*|\\s+)('+pattern+')(?:\\))?(?=$|[^\\p{L}\\p{N}_])','gu');
  text=text.replace(labelled,(_m,name)=>{const labels=aliases.get(name);return labels.size===1?[...labels][0]:'your relative';});
  text=text.replace(rx,(_m,prefix,name)=>{const labels=aliases.get(name);return prefix+(labels.size===1?[...labels][0]:'your relative');});
 }
 text=text.replace(/\b[Yy]our (?:mom|mother)\b/g,'your mum').replace(/\b[Yy]our father\b/g,'your dad');
 text=text.replace(/\b(?:Mom|Mum|Mother)\b(?!\s+(?:Teresa|Nature))/g,'your mum').replace(/\b(?:Dad|Father)\b(?!\s+Christmas)/g,'your dad');
 text=text.replace(/\b(?:your\s+){2,}/gi,'your ');
 return capitalise(text);
};
const clean=O.cleanLogText;O.cleanLogText=(s,text)=>O.memoryText(s,clean(s,text));
const journal=O.journal;O.journal=function(s,title,description,type){
 journal(s,O.memoryText(s,title),O.memoryText(s,description),type);
};
window.dispatchEvent?.(new Event('other-lives-ready'));
})(window.OL);
