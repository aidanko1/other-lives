
/* v5.3 - age, finance and family-role coherence audit. */
(function(O){
 const originalJournal=O.journal;
 O.cleanLogText=function(s,text){
  let v=String(text??'');
  // Older archived journals are cleaned at display-time, without modifying saved files.
  for(const p of s.people||[]){
   const role=O.parentRole?O.parentRole(p):p.role;
   const label=role==='Mother'?'Mom':role==='Father'?'Dad':p.name;
   for(const name of [p.name,p.name.split(' ')[0]].filter(Boolean)){
     for(const prefix of [role,role.toLowerCase(),role==='Mother'?'Mom':role==='Father'?'Dad':'']){
       if(prefix)v=v.split(prefix+' ('+name+')').join(label);
     }
   }
  }
  v=v.replace(/\b(?:Mom|Dad|Mother|Father|Parent)\s*\([^)]{1,80}\)/gi,m=>/mom|mother/i.test(m)?'Mom':'Dad');
  v=v.replace(/\b(?:Friend|Partner|Sibling|Grandparent|Mentor|Child)\s*\(([^)]{1,80})\)/gi,(_m,name)=>name);
  return v;
 };
 O.journal=function(s,title,description,type){return originalJournal(s,O.cleanLogText(s,title),O.cleanLogText(s,description),type)};
 const event=(id)=>O.EVENTS.find(e=>e.id===id);
 const hardship=event('food-insecurity'); if(hardship)hardship.min=18;
 const schooling=event('school-costs'); if(schooling)schooling.min=13;
 const health=event('parent-health');if(health){
   health.min=12;
   const opts=health.options;
   health.options=s=>s.age<18?[
     {label:'Help at home where you can',detail:'Small practical acts while adults arrange healthcare.',apply:st=>{O.adjust(st,{relationships:3,stress:2});O.bond(st,'Parent',3);return 'You help with chores or keep a parent company while the adults arrange care.'}},
     {label:'Talk to another trusted adult',detail:'Ask an older relative, teacher or community member for support.',apply:st=>{O.adjust(st,{knowledge:2,stress:-1});return 'You ask for help. The situation is still uncertain, but you no longer have to carry every worry alone.'}},
     {label:'Keep some time for school or friends',detail:'Your wellbeing matters even when the household is under pressure.',apply:st=>{O.adjust(st,{happiness:2,stress:-2});return 'You keep part of your routine while your family organises the practical decisions.'}}
   ]:opts(s);
 }
 const vaccine=event('childhood-immunisation');if(vaccine)vaccine.when=()=>false;
 const scholarship=event('scholarship');if(scholarship){
  const oldOptions=scholarship.options;
  scholarship.options=s=>oldOptions(s).map((option,i)=>i===0?{...option,apply:st=>{const odds=.20+st.knowledge/260+(st.school?.1:0);if(O.chance(st,odds)){
   st.flags.studying=true;st.flags.graduationAge=st.age+Math.max(2,O.int(st,2,4));O.adjust(st,{knowledge:4,happiness:5});return 'You secure educational support and begin a programme. Completing the qualification will still take years.';}
   O.adjust(st,{stress:2});return 'You are not selected this time. You can continue looking for suitable opportunities.';}}:option);
 }
 const schoolEntry=event('school-entry');if(schoolEntry){
   schoolEntry.title=()=> 'Starting school: a family decision';
   schoolEntry.description=s=>`Caregivers consider the available schools and travel costs in ${s.country.name}. You can tell them what makes you curious or worried, but adults and school authorities make the enrolment arrangements.`;
   schoolEntry.options=s=>[
    {label:'Tell your family you want to attend school',detail:'Your wishes matter, but the adults have to organise enrolment and transport.',apply:st=>{const chance=Math.min(.98,.38+st.country.school/190+st.strata*.025);if(O.chance(st,chance)){st.school=true;O.adjust(st,{knowledge:7});return 'Your caregivers arrange for you to begin school.';}return 'Your family tries, but practical obstacles delay attendance.'}},
    {label:'Learn with family and community for now',detail:'Knowledge can grow outside school, but formal opportunities may be limited.',apply:st=>{O.adjust(st,{knowledge:3,relationships:2});return 'Your family teaches you useful things at home while exploring school access.'}},
    ...(s.strata>=5?[{label:'Ask about additional tutoring',detail:'Your family may be able to pay for extra support.',apply:st=>{st.school=true;O.adjust(st,{knowledge:9});return 'Your caregivers arrange extra help alongside school.'}}]:[])
   ];
 }
 O.registerAnnualStage('legacy-education',s=>{

 return ()=>{
   if(s.flags.vocationalEnrolled&&s.age>=s.flags.vocationalGraduationAge){s.flags.vocationalEnrolled=false;s.education=O.EDU[3];O.adjust(s,{knowledge:7,confidence:4});O.journal(s,'Vocational training completed','You complete a period of practical training. The qualification or experience improves some opportunities, but does not guarantee a job.','education');}
   if(s.age===1&&!s.flags.vaccineChoiceMade){
     const coverage=Math.max(.18,Math.min(.96,.30+(s.country.infra||40)/160+s.strata*.025));
     const offered=O.chance(s,coverage);s.flags.vaccineChoiceMade=true;s.flags.vaccinationMissed=!offered;
     O.journal(s,'Early childhood healthcare',offered?'Your caregivers are able to arrange routine childhood immunisations. Access depends on local services, travel and family circumstances.':'Some recommended childhood vaccinations are delayed or unavailable to your family. Adults continue seeking healthcare where possible.','health');
   }
 };
});
})(window.OL);
