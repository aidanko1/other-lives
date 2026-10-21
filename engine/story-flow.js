/* Contextual selection and choice follow-through, within existing story slots. */
(function(O){'use strict';
 const enabled=s=>s.storyFlow?.version===1;
 O.createStoryFlow=s=>{s.storyFlow={version:1};};
 const choice=(s,id,index)=>[...(s.choiceHistory||[])].reverse().find(c=>c.eventId===id&&(index===undefined||c.index===index)&&c.age<s.age);
 const cause=(s,id,index,years=12)=>{const c=choice(s,id,index);return c&&s.age-c.age<=years?c:null;};
 const workEvents=new Set(['career-search-results','graduate-next-step']);
 const acceptedWork=s=>[...(s.choiceHistory||[])].reverse().find(c=>workEvents.has(c.eventId)&&c.storyContext?.job===s.job&&c.age<s.age&&s.age-c.age<=5);
 const tracked=new Set(['early-bonds','school-entry','discover-real-interest',...workEvents,'relationship-strain-specific','invest-money']);
 const apply=O.applyChoice;
 O.applyChoice=function(s,index){
  const id=s.pending,jobBefore=s.job,debtBefore=s.debt,partner=s.people.find(p=>p.alive&&p.role==='Partner'),parent=s.people.find(p=>p.alive&&['Mother','Father'].includes(p.role));
  const context=enabled(s)&&tracked.has(id)?{country:s.country.code,...(id==='relationship-strain-specific'&&partner?{personId:partner.id}:{}),...(id==='early-bonds'&&index===2&&parent?{personId:parent.id}:{})}:null;
  const result=apply(s,index);
  if(result&&context){const c=s.choiceHistory.at(-1);if(workEvents.has(id)&&s.job!==jobBefore)context.job=s.job;if(id==='discover-real-interest')context.interest=c.label;if(id==='invest-money'&&index===2)Object.assign(context,{debtBefore,debtAfter:s.debt});c.storyContext=context;}
  return result;
 };
 const add=(id,subject,min,max,category,title,body,fx,when,source)=>O.MOMENT_DEFS.push({id,subject,min,max,category,title,body,fx,when:(s,p)=>enabled(s)&&when(s,p),source,cooldown:12,maxUses:1,followThrough:true});
 add('chosen-curiosity','self',6,17,'Learning','A question that leads somewhere',s=>`At five, you chose to explore books and questions. Today a question about ${s.urban?'something on your street':'something you notice outdoors'} leads to another, and you keep looking after the first answer.`,{knowledge:2,confidence:1},s=>!!cause(s,'early-bonds',1),s=>cause(s,'early-bonds',1));
 add('chosen-playmates','friend',6,17,'Friendship','Making room in the game','You chose to spend more time playing with other children when you were five. When {person} hesitates at the edge of a game, you make room. The friendship grows through things you actually do together.',{relationships:2,happiness:1},(s,p)=>!!cause(s,'early-bonds',0)&&p.close>=50,s=>cause(s,'early-bonds',0));
 add('chosen-family','parent',6,17,'Family','A routine you both remember','Staying close to family was what felt right at five. You and {person} return to a small routine you used to share. You are older now, and there is more room for your own opinions.',{relationships:2,confidence:1},(s,p)=>cause(s,'early-bonds',2)?.storyContext?.personId===p.id&&p.close>=50,s=>cause(s,'early-bonds',2));
 add('chosen-interest-practice','self',8,90,'Interests','The part that used to be difficult',s=>{const c=choice(s,'discover-real-interest');return `You chose ${c.label.toLowerCase()} at ${c.age}. A part you used to struggle with now comes more easily. The time spent practising has become something you can use, even without making it your career.`;},{confidence:2,happiness:1},s=>{const c=choice(s,'discover-real-interest');return !!c&&s.interests.includes(c.label)&&(s.experience.hobbies[c.label]?.years||0)>=1;},s=>choice(s,'discover-real-interest'));
 add('chosen-interest-return','self',18,95,'Interests','Finding a way back to an interest',s=>{const c=choice(s,'discover-real-interest');return `You chose ${c.label.toLowerCase()} at ${c.age}, but work and other obligations have left little time for it. You try a small piece of it again without deciding that it has to become another achievement.`;},{happiness:2,stress:-1},s=>{const c=choice(s,'discover-real-interest');return !!c&&s.interests.includes(c.label)&&s.stress>=55&&!s.routines.includes('practice');},s=>choice(s,'discover-real-interest'));
 add('chosen-home-learning','self',7,16,'Learning','Learning through something useful',s=>`When school was discussed at six, you chose to learn with family and community for now. Helping with ${s.urban?'an errand nearby':'a practical task outdoors'} brings a chance to ask how something works. You learn from it, while formal school qualifications remain a separate question.`,{knowledge:2,confidence:1},s=>!!cause(s,'school-entry',1)&&!s.school,s=>cause(s,'school-entry',1));
 add('chosen-work-routine','self',19,80,'Work','A role becomes part of your days',s=>{const c=acceptedWork(s);return `You accepted work as ${s.job.toLowerCase()} at ${c.age}. The first unfamiliar tasks have become a routine. ${s.stress>=60?'Being able to do the work has not removed the pressure of fitting everything else around it.':'You have a better sense of which parts need care and when to ask for help.'}`;},{knowledge:1,confidence:1},s=>!!s.job&&s.job!=='Retired'&&!!acceptedWork(s)&&(s.experience.roles[s.job]||0)>=1,acceptedWork);
 add('chosen-repair-holds','partner',19,95,'Partnership','A change that has lasted',s=>`Since the difficult conversation at ${choice(s,'relationship-strain-specific',0).age}, you and {person} have found more time to talk before small problems build up. The relationship feels easier because of the routines that followed, rather than the conversation alone.`,{relationships:2,happiness:1},(s,p)=>cause(s,'relationship-strain-specific',0,6)?.storyContext?.personId===p.id&&p.close>=60,s=>cause(s,'relationship-strain-specific',0,6));
 add('chosen-repair-unfinished','partner',19,95,'Partnership','The conversation was only a beginning',s=>`You and {person} tried talking through the strain at ${choice(s,'relationship-strain-specific',0).age}. Some of the same difficulties keep returning. Wanting things to improve has not yet made everyday life together easier.`,{stress:1,happiness:-1},(s,p)=>cause(s,'relationship-strain-specific',0,6)?.storyContext?.personId===p.id&&p.close<45,s=>cause(s,'relationship-strain-specific',0,6));
 add('chosen-emergency-buffer','self',21,95,'Resources','Room to handle a difficult week','You chose to keep a larger emergency fund. When several small costs arrive together, the money you kept accessible gives you time to compare what matters most. Keeping that buffer still means leaving some other plans for later.',{stress:-2,confidence:1},s=>!!cause(s,'invest-money',1,6)&&s.cash>=s.country.ppp*.2,s=>cause(s,'invest-money',1,6));
 add('chosen-debt-progress','self',21,95,'Resources','The balance is smaller, the choices wider','You chose to pay down outstanding debt. There are still bills to plan around, but less of each decision revolves around an old balance. The repayment remains a trade-off with what you could have used those savings for.',{stress:-1,confidence:1},s=>{const c=cause(s,'invest-money',2,6);return !!c&&Number.isFinite(c.storyContext?.debtAfter)&&c.storyContext.debtAfter<c.storyContext.debtBefore&&s.debt<=c.storyContext.debtAfter;},s=>cause(s,'invest-money',2,6));
 const defs=new Map(O.MOMENT_DEFS.map(d=>[d.id,d]));
 O.storyWeight=function(s,c){
  let weight=c.weight;
  const d=c.d,topic=(d.category+' '+d.id).toLowerCase(),recent=s.journal.filter(e=>e.momentId&&s.age-e.age<=2).slice(0,8);
  weight/=1+recent.filter(e=>(e.storyCategory||defs.get(e.momentId)?.category)===d.category).length*1.5;
  if(d.followThrough)weight*=3;
  if(d.specificity)weight*=1+Math.min(3,d.specificity)*.5;
  if(/school|learning|education/.test(topic)&&s.school)weight*=1.6;
  if(/work|career/.test(topic)&&s.job&&s.job!=='Retired')weight*=1.6;
  if(/hobby|interest|practice/.test(topic)&&s.interests.length)weight*=1.6;
  if(/parent|child|family|partner/.test(topic)&&s.focus==='Relationships')weight*=1.8;
  if(/learning|school|interest/.test(topic)&&s.focus==='Learning')weight*=1.8;
  if(/health|recovery|rest/.test(topic)&&(s.health<45||s.focus==='Rest'||s.focus==='Health'))weight*=1.8;
  return Math.max(.05,weight);
 };
 const oldPick=O.pickStories;
 O.pickStories=function(s,n,{excludeQueued=false}={}){
  if(!enabled(s))return oldPick(s,n);
  const queued=new Set(excludeQueued?(s.agenda||[]).filter(x=>!x.done&&x.plannedAge===s.age).map(x=>x.dynamicMoment):[]),pool=O.momentCandidates(s).filter(c=>!queued.has(c.d.id)),out=[],counts={};let last,followThrough=s.journal.some(e=>e.age===s.age&&e.cause)||excludeQueued&&(s.agenda||[]).some(x=>!x.done&&x.plannedAge===s.age&&x.cause);
  while(out.length<n&&pool.length){
   const available=pool.filter(c=>!followThrough||!c.d.followThrough);if(!available.length)break;
   let varied=available.filter(c=>c.d.category!==last&&(counts[c.d.category]||0)<2);if(!varied.length)varied=available.filter(c=>(counts[c.d.category]||0)<2);if(!varied.length)varied=available;
   const c=O.weighted(s,varied,x=>O.storyWeight(s,x)),item=O.materialiseMoment(s,c);item.plannedAge=s.age;item.storyCategory=c.d.category;
   if(c.d.source){const source=c.d.source(s);item.cause={eventId:source.eventId,age:source.age,month:source.month,index:source.index,...(source.storyContext?.personId?{personId:source.storyContext.personId}:{})};followThrough=true;}
   out.push(item);counts[c.d.category]=(counts[c.d.category]||0)+1;last=c.d.category;
   for(let i=pool.length-1;i>=0;i--)if(pool[i].d.id===c.d.id)pool.splice(i,1);
  }
  return out;
 };
 const allowed=O.storyAllowed;
 O.storyAllowed=function(s,item){
  if(item.dynamicMoment){const d=defs.get(item.dynamicMoment),p=item.subjectId==='self'?s:item.subjectId==='pet'?s.memories.pet:s.people.find(p=>p.id===item.subjectId);
   if(!d||!p)return false;
   const role=d.subject==='self'?p===s:d.subject==='pet'?p===s.memories.pet:d.subject==='lost'?!p.alive:d.subject==='parent'?['Mother','Father'].includes(p.role):p.role===d.subject[0].toUpperCase()+d.subject.slice(1);
   if(!role)return false;
   if(enabled(s)&&!O.momentCandidates(s).some(c=>c.d.id===d.id&&c.p===p))return false;
   if(enabled(s)&&d.source){const c=d.source(s),a=item.cause;if(!c||!a||c.eventId!==a.eventId||c.age!==a.age||c.month!==a.month||c.index!==a.index||c.storyContext?.personId!==a.personId)return false;}
  }
  return allowed(s,item);
 };
 const fire=O.fireStory;
 O.fireStory=function(s,item){
  if(!O.storyAllowed(s,item))return;
  if(!enabled(s)||!item.dynamicMoment)return fire(s,item);
  const d=defs.get(item.dynamicMoment),p=item.subjectId==='self'?s:item.subjectId==='pet'?s.memories.pet:s.people.find(p=>p.id===item.subjectId),current=O.materialiseMoment(s,{d,p,key:item.momentKey});
  const previous=s.journal[0];fire(s,{...item,title:current.title,description:current.description});
  if(s.journal[0]!==previous){const entry=s.journal[0];entry.storyCategory=d.category;if(item.cause)entry.cause=item.cause;}
 };
 O.replaceMissedStory=function(s){if(enabled(s)){const item=O.pickStories(s,1,{excludeQueued:true})[0];if(item)O.fireStory(s,item);}};
})(window.OL);
