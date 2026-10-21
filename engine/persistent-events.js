
/* V2.5: persistent, context-sensitive character life events. All fictional narratives,
   not assertions that demographic identity causes a personal outcome. */
(function(O){
 const OLD=O.pickStories;
 O.pickStories=function(s,n){
  const out=OLD(s,n); const id=s.country.code; const age=s.age;
  if(n&&age>=3&&age<=90){
   if(!s.flags.personalThread)s.flags.personalThread=O.pick(s,['books','sport','music','drawing','animals','technology']);
   const thread=s.flags.personalThread, people=(s.people||[]).filter(p=>p.alive);
   const mother=people.find(p=>p.role==='Mother');const father=people.find(p=>p.role==='Father');
   const guardian=mother||father||people[0];
   const who=guardian?O.personLabel(guardian):'a family member';
   let custom=null;
   if(age>=5&&age<16&&s.school&&O.chance(s,.30)){
    const subject=thread==='sport'?'physical education':thread==='music'?'music':thread==='technology'?'computing':thread==='drawing'?'art':'history';
    const teacherNames={GH:['Ms. Mensah','Mr. Boateng'],HK:['Ms. Chan','Mr. Wong'],BD:['Mr. Rahman','Ms. Akter'],GB:['Ms. Smith','Mr. Taylor'],IN:['Ms. Das','Mr. Sharma'],NG:['Mr. Okafor','Ms. Adebayo'],ET:['Ms. Bekele','Mr. Tesfaye']};const teacher=s.flags.favouriteTeacher||O.pick(s,teacherNames[id]||['Ms. Taylor','Mr. Lee']);
    s.flags.favouriteTeacher=teacher;
    custom={title:`${teacher} notices your interest`,description:`Your ${subject} teacher, ${teacher}, notices how much attention you pay. A short conversation leaves you feeling seen. ${who} asks what made you so cheerful when you return home.`,scene:'school',effect:'thread-encouragement'};
    s.flags.teacherMemory=age;
   } else if(s.flags.teacherMemory&&age-s.flags.teacherMemory>=4&&!s.flags.teacherReflection&&O.chance(s,.26)){
    custom={title:'A voice you remember',description:`You remember how ${s.flags.favouriteTeacher||'a teacher'} once encouraged your interest in ${thread}. That small moment comes back as you think about the next stage of life.`,scene:'home',effect:'thread-reflection'};
    s.flags.teacherReflection=true;
   } else if(age>=10&&O.chance(s,.19)){
    const examples={GH:[`A tro-tro fare increase changes how your household plans travel. ${who} explains what must wait until the next pay day.`,`At a neighbourhood gathering, talk turns to school costs and work. You notice adults have different ideas about opportunity.`],HK:[`Your household compares public transport routes and rising housing costs. ${who} discusses how little space can shape daily routines.`,`A classmate talks about tutorials and school places. You compare experiences without assuming every family can afford the same support.`],BD:[`Seasonal rain changes the trip to school or market. ${who} worries about lost work time.`,`At a local bazaar, you hear adults comparing prices, debt and ways to manage household expenses.`],GB:[`A teacher describes different routes through GCSEs, sixth form, apprenticeships and college. ${who} asks what appeals to you.`,`A family conversation turns to housing costs and the possibility of moving farther from work.`],NG:[`A neighbour discusses fuel and transport expenses. ${who} adjusts the household budget.`,`A schoolfriend tells you about different exam and vocational routes, opening a new line of thought.`],IN:[`Your household plans around education fees, travel distance and exam options. ${who} shares their hopes.`,`You overhear a conversation about moving cities for work and the relatives who have already left.`],ET:[`Rainfall affects daily plans for some neighbours. ${who} talks about what that means for supplies.`,`You hear adults discuss community savings and how local networks can help during a difficult season.`]};
    const pool=examples[id];if(pool)custom={title:({GH:'Fares and family budgets',HK:'Daily life in Hong Kong',BD:'Seasonal routines and prices',GB:'Choices closer to home',NG:'Life in the neighbourhood',IN:'Costs and opportunities',ET:'Community and seasons'})[id],description:O.pick(s,pool),scene:'city',effect:'local-'+id};
   }
   if(custom)out[O.int(s,0,out.length-1)]=custom;
  }
  return out;
 };
 const prevFire=O.fireStory;
 O.fireStory=function(s,item){prevFire(s,item);if(item.effect==='thread-encouragement')O.adjust(s,{knowledge:2,happiness:2});};
})(window.OL);
