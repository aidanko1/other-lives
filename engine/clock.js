
/* v2.4: continuous month-by-month clock; each year has 2–5 highlights,
   and only some highlights are interactive decisions. Original implementation. */
(function(O){
// Approximate a normal-speed life; freeze the birth reference so moving does not change pacing.
// The reference game's exact formula is unknown. This affects playback only, never lifespan.
O.birthPlayback=function(country,targetMinutes=60){
 if(![30,60,90].includes(targetMinutes))throw Error('Life duration must be 30, 60 or 90 minutes.');
 const referenceYears=country?.life;
 if(!Number.isFinite(referenceYears)||referenceYears<=0||referenceYears>150)throw Error('Invalid birth playback reference.');
 return {version:1,targetMinutes,referenceYears};
};
O.monthDurationMs=function(s){
 const p=s?.playback;
 if(p?.version!==1||![30,60,90].includes(p.targetMinutes)||!Number.isFinite(p.referenceYears)||p.referenceYears<=0||p.referenceYears>150)return 3750;
 return p.targetMinutes*60000/(p.referenceYears*12);
};
const originalCreate=O.create;
O.ensureTimeline=function(s){
 if(typeof s.month!=='number')s.month=0;
  if(O.upgradeLife)O.upgradeLife(s);
 if(!s.storyUsed)s.storyUsed={};
 if(!Array.isArray(s.agenda))s.agenda=O.makeAgenda(s);
 return s;
};
O.create=function(settings){const s=originalCreate(settings);O.ensureTimeline(s);return s;};
O.makeAgenda=function(s){
 const milestone=O.EVENTS.find(e=>e.milestone&&e.min===s.age&&e.when(s)&&s.used[e.id]===undefined);
 let decisionList=[];
 const chance=s.age<5?.025:s.age<12?.20:s.age<18?.43:s.age<30?.55:s.age<60?.48:s.age<80?.38:.26;
 if(milestone)decisionList.push(milestone.id);
 else if(O.chance(s,chance)){
  const ev=O.chooseEvent(s);if(ev)decisionList.push(ev.id);
 }
 if(s.age>=16&&s.age<=70&&O.chance(s,.095)&&decisionList.length){
  const ex=new Set(decisionList);
  let pool=O.EVENTS.filter(e=>!e.milestone&&e.min<=s.age&&e.max>=s.age&&e.when(s)&&!ex.has(e.id)&&(s.used[e.id]===undefined||s.age-s.used[e.id]>=7));
  if(pool.length)decisionList.push(O.weighted(s,pool,e=>e.weight).id);
 }
 const total=O.weighted(s,[2,3,4,5],n=>({2:20,3:37,4:29,5:14})[n]);
 const narrativeCount=Math.max(0,total-decisionList.length);
 const stories=O.pickStories(s,narrativeCount);
 let slots=[];
 // Month 1-11, so birthdays and recorded events don't collide at the boundary.
 while(slots.length<stories.length+decisionList.length){const m=O.int(s,1,11);if(!slots.includes(m))slots.push(m)}
 slots.sort((a,b)=>a-b);
 const all=[...stories.map(x=>({...x,type:'story'})),...decisionList.map(id=>({type:'decision',id}))];
 // Interleave story and decision, keeping both types independent of the yearly age increment.
 const shuffled=O.shuffle?O.shuffle(s,all):all;
 return shuffled.map((x,i)=>({...x,month:slots[i],done:false})).sort((a,b)=>a.month-b.month);
};
O.advanceMonth=function(s){
 if(!s||s.status!=='alive'||s.pending)return {advanced:false,decision:!!s?.pending};
 O.ensureTimeline(s);
 // First process anything at the current position not yet processed.
 const due=s.agenda.find(a=>a.month<=s.month&&!a.done);
 if(due){
  due.done=true;
  if(due.type==='story')O.fireStory(s,due);
  else{
   const e=O.EVENTS.find(x=>x.id===due.id);
   if(e&&(O.eventEligible?O.eventEligible(s,e):e.when(s))&&s.age>=e.min&&s.age<=e.max){s.pending=e.id;s.scene=e.scene||s.scene;O.snapshot(s)}
   else O.journal(s,'Plans change','An expected opportunity does not materialise as circumstances shift.','life');
  }
  return {advanced:true,decision:!!s.pending,entry:true};
 }
 if(s.month<11){s.month++;s.lastOutcome='';return {advanced:true};}
 return O.completeBirthday(s);
};
O.advance=function(s){ // Legacy compatibility; advance to the next birthday or decision.
 if(!s||s.pending||s.status!=='alive')return false;
 const start=s.age;
 for(let i=0;i<22&&s.status==='alive'&&!s.pending&&s.age===start;i++)O.advanceMonth(s);
 return true;
};
// Delivery at the current date is not another month of elapsed calendar time.
O.playbackStep=function(s){
 if(!s||s.status!=='alive'||s.pending)return {advanced:false,decision:!!s?.pending,months:0};
 const before=s.age*12+s.month,result=O.advanceMonth(s),months=s.age*12+s.month-before;
 if(months!==0&&months!==1)throw Error('Playback must advance at most one calendar month.');
 return {...result,months};
};
O.skipToDecision=function(s,onFamilyDeath){
 if(!s||s.status!=='alive'||s.pending)return 0;
 const family=new Set(s.people.filter(p=>p.alive&&['Mother','Father','Parent','Grandparent','Sibling','Partner','Child'].includes(p.role)).map(p=>p.id));
 let months=0;
 while(s.status==='alive'&&!s.pending&&months<1500){
  const before=s.month,age=s.age;
  O.advanceMonth(s);if(s.month!==before||s.age!==age)months++;
  const bereaved=s.people.find(p=>family.has(p.id)&&!p.alive);
  if(bereaved&&s.status==='alive'){if(typeof onFamilyDeath==='function')onFamilyDeath(bereaved);break;}
 }
 return months;
};
})(window.OL);

