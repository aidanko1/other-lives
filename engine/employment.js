/* Employment records have one transition and experience owner. Pay is the accepted quoted pay. */
(function(O){'use strict';
 O.setEmployment=function(s,{role='',pay=0,mode=role?'full-time':'unemployed',hours=mode==='part-time'?20:mode==='full-time'?40:0}){
  if(!Number.isFinite(pay)||pay<0||!Number.isFinite(hours)||hours<0||hours>80)throw Error('Invalid employment pay or hours.');
  if(!['full-time','part-time','retired','unemployed'].includes(mode)||!role&&mode!=='unemployed'||mode==='unemployed'&&(role||pay||hours)||mode==='retired'&&(role!=='Retired'||hours))throw Error('Inconsistent employment transition.');
  const changed=s.employment?.role!==role;
  s.job=role;s.income=Math.round(pay);s.employment={role,mode,hours};
  if(changed)s.workYears=0;
  if(role&&mode!=='retired'){s.experience.roles[role]??=0;s.flags.jobSearching=false;}
  return s.employment;
 };
 O.setEmploymentMode=function(s,mode){
  if(!['part-time','full-time'].includes(mode))throw Error('Unknown work arrangement.');
  if(!s.job||s.job==='Retired')return false;
  const hours=mode==='part-time'?20:40,current=s.employment?.hours||(s.employment?.mode==='part-time'?20:40);
  O.setEmployment(s,{role:s.job,pay:s.income*hours/current,mode,hours});return true;
 };
 O.restoreEmployment=function(s,record){
  const role=record.job||record.role||'',saved=record.employment||{};
  return O.setEmployment(s,{role,pay:role?record.income??record.fullPay??0:0,mode:role?saved.mode||record.mode||'full-time':'unemployed',hours:role?saved.hours??(saved.mode==='part-time'?20:40):0});
 };
 O.reconcileEmployment=function(s,fullStudy){
  if(!s.job||s.job==='Retired'){s.employment={role:s.job||'',mode:s.job==='Retired'?'retired':'unemployed',hours:0};return;}
  if(!s.employment||s.employment.role!==s.job)s.employment={role:s.job,mode:fullStudy?'part-time':'full-time',hours:fullStudy?20:40};
  if(fullStudy&&s.employment.mode==='full-time'){O.setEmploymentMode(s,'part-time');s.employment.legacyHours=true;}
 };
 O.recordEmploymentYear=function(s){
  if(!s.job||s.income<=0){if(s.job!=='Retired')s.unemployedYears++;return;}
  if(s.job==='Retired'||s.employment?.mode==='retired')return;
  s.yearsWorked++;s.workYears++;
  const years=(s.employment?.hours??(s.employment?.mode==='part-time'?20:40))/40;
  s.experience.totalYears+=years;s.experience.roles[s.job]=(s.experience.roles[s.job]||0)+years;
 };
})(window.OL);
