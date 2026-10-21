/* Read-only ending facts. Missing history is omitted rather than reconstructed. */
(function(O){'use strict';
 O.lifeRetrospective=function(s){
  const people=s.people||[],children=people.filter(p=>p.role==='Child'),partners=people.filter(p=>['Partner','Former partner'].includes(p.role));
  const work=Object.entries(s.experience?.roles||{}).filter(([role,years])=>role!=='Retired'&&Number.isFinite(years)&&years>0).map(([role,years])=>({role,years:Math.round(years*10)/10})).sort((a,b)=>b.years-a.years||a.role.localeCompare(b.role));
  if(!work.length&&s.job&&s.job!=='Retired')work.push({role:s.job,years:null});
  const subject=s.study?.status==='completed'?s.study.course:O.DEGREES.find(d=>d.id===s.flags?.completedDegree)?.name;
  const education=s.education?[s.education,subject,s.postgraduate?.level&&s.postgraduate?.subject?`${s.postgraduate.level}: ${s.postgraduate.subject}`:null].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).join(' · '):null;
  const interests=Object.entries(s.experience?.hobbies||{}).filter(([,h])=>Number.isFinite(h.years)&&h.years>0).map(([name,h])=>({name,years:Math.round(h.years*10)/10})).sort((a,b)=>b.years-a.years||a.name.localeCompare(b.name));
  const positive=(s.journal||[]).filter(e=>e.tone==='good'&&!['ending','birth','money'].includes(e.type)&&e.title!=='Your yearly finances'&&e.age<=s.age),moment=positive.find(e=>e.momentId)||positive[0];
  return {age:s.age,cause:s.cause||null,education,work,workYears:Number.isFinite(s.yearsWorked)?s.yearsWorked:null,children:{total:children.length,surviving:children.filter(p=>p.alive).length,names:children.map(p=>p.name)},partners:partners.map(p=>({name:p.name,alive:p.alive,role:p.role})),interests,netWorth:['cash','debt','investments','property'].every(k=>Number.isFinite(s[k]))?O.netWorth(s):null,moment:moment?{age:moment.age,title:moment.title,description:moment.description}:null};
 };
})(window.OL);
