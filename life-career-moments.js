/* Occupation-specific moments: particular tasks, lasting experience, actual trade-offs. */
(function(O){'use strict';
const tasks={
 retail:['Checking a delivery against the invoice','A delivery contains fewer items than its invoice. You count again before reporting it; catching the discrepancy saves an argument at closing time.'],
 hospitality:['The order that cannot be improvised','A guest explains a food allergy. You check the kitchen’s procedure and ask a supervisor rather than guessing what can be served.'],
 logistics:['A discrepancy at the loading bay','Two shipment labels have been exchanged. Following the picking record lets you correct them before the lorry leaves.'],
 manufacturing:['Stopping the line for a faulty component','A component fails the quality check. Stopping to report it delays the batch, but prevents the fault being passed to the next station.'],
 agriculture:['A change in the field before the others notice','You notice uneven growth along one edge of a field. Checking the water supply with an experienced colleague reveals a blocked section.'],
 administration:['The missing attachment','An application has stalled because a document was filed under an old reference. You trace the correspondence and explain what still needs to happen.'],
 care:['Noticing a change during an ordinary visit','Someone you support seems unusually confused. You record what changed and follow the escalation procedure rather than dismissing it as a difficult morning.'],
 domestic:['A surface that needs a different treatment','A new cleaning product could damage a surface. Reading its instructions and checking the material takes longer than rushing into the task.'],
 community:['Making an activity accessible','A visitor cannot join an activity as it is arranged. You and a colleague adapt the setup, checking what would help rather than making assumptions.'],
 trades:['Finding the cause before replacing the part','An intermittent fault is difficult to reproduce. You work through the checks, isolate the cause and explain the repair before starting it.'],
 medicine:['A handover that changes the plan','During a supervised handover, a detail in a patient’s history does not match the summary. You ask your supervising doctor to review it before the team proceeds.'],
 nursing:['A patient explains what the chart misses','A patient describes a change that is absent from the notes. You document it, check the observations and raise the concern with the responsible clinician.'],
 teaching:['A different explanation reaches the back row','A pupil can repeat a rule without being able to use it. Trying a concrete example reveals the missing step and helps you change the next lesson.'],
 software:['A bug that only appears with real data','A feature works in your example and fails on a real input. You isolate the case, write a useful check and review the fix with a colleague.'],
 data:['The total changes after removing duplicates','A report contains duplicate records. Checking their origin changes the result, and you explain the correction before anyone uses the earlier figure.'],
 support:['The repeated support ticket','Several colleagues report the same connection problem. Comparing their setups reveals a shared cause; you document the fix so the next person can find it.'],
 engineering:['A drawing that needs checking before work begins','Two dimensions in a project drawing disagree. You raise the discrepancy with the responsible engineer before it reaches fabrication.'],
 'engineering-tech':['A measurement that does not repeat','A test produces different readings each time. You check the instrument setup and calibration record before accepting the result.'],
 accounting:['The entry that will not reconcile','An account does not balance with its supporting record. You trace the entries with your reviewer instead of forcing the difference into another category.'],
 business:['A recommendation changes after talking to users','A proposed process looks efficient in the spreadsheet. Talking to the people doing the work reveals a constraint the first plan missed.'],
 operations:['A schedule with no room for a late delivery','A supplier delay threatens the week’s schedule. You compare priorities with the team and explain which commitment can realistically be moved.'],
 design:['A design tested at the size people will use','A layout looks clear on your screen and becomes difficult to read at its intended size. Testing it changes the spacing and hierarchy.'],
 studio:['The colour proof before the print run','A proof differs from the approved design. You check the production settings and ask for sign-off before the full run begins.'],
 digital:['The export that fails on another device','A finished asset fails a delivery specification. You check its format and accessibility requirements before sending the corrected version.'],
 editorial:['A confident sentence with no supporting source','A manuscript makes a strong claim that its reference does not support. You ask for clarification and help rewrite it accurately.'],
 museum:['An object means something different to a visitor','A visitor adds a perspective missing from an activity sheet. You discuss it with the team and revise how the object is introduced.'],
 'humanities-research':['Following a citation back to its source','A frequently repeated claim changes when you read the original source. You record the distinction so the project can represent it fairly.'],
 'clinical-research':['A study record needs clarification','A research record is incomplete. You follow the study protocol and ask the responsible team for clarification without guessing the missing data.'],
 'public-health':['The neighbourhood hidden by an average','A summary figure conceals a difference between neighbourhoods. Breaking down the data makes the limits of the programme easier to discuss.'],
 'education-programmes':['A programme adjusted around actual attendance','Attendance records reveal that the advertised session time excludes some families. You consult them before proposing a revised timetable.'],
 'learning-support':['A strategy a pupil can use independently','You practise a small learning strategy with a pupil and their teacher. The important moment comes when they try it without your prompt.'],
 'agri-advice':['Advice adapted to a farmer’s available resources','A recommended method requires equipment a farmer cannot access. You work through an affordable alternative and explain its limitations.'],
 environment:['A sample with a missing location record','A sample’s location record is incomplete. You flag the uncertainty instead of treating it as interchangeable with the others.'],
 'agri-research':['The comparison plot that changes the conclusion','A field result looks promising until you compare the control plot and rainfall record. The revised explanation is less tidy and more useful.'],
 psychology:['A research result needs a more careful explanation','The observed association does not establish a cause. You revise the project summary with your supervisor so it says what the study can support.'],
 behaviour:['A question that leads participants toward an answer','A pilot interview reveals a leading question. You revise it before collecting the next set of responses.'],
 'support-work':['A plan made with the person it concerns','A support plan is easy to complete on paper. Asking the person what matters to them changes which practical goal comes first.']
};
for(const t of O.CAREER_TRACKS){const [title,body]=tasks[t.id];O.MOMENT_DEFS.push({id:'career-task-'+t.id,subject:'self',min:18,max:85,category:'Working life',title,body,fx:{knowledge:2,confidence:1,stress:1},when:s=>O.careerTrack(s.job)?.id===t.id&&!s.institution&&s.health>=35,cooldown:20,maxUses:1,specificity:6});
 if(t.id==='retail')O.MOMENT_DEFS.push({id:'career-boundary',subject:'self',min:18,max:85,category:'Working life',title:'The work still waiting when your hours end',body:`A task in your {job} work is unfinished when your agreed hours end. You explain the handover rather than quietly taking the whole workload home. Protecting a limit takes practice as well as confidence.`,fx:{stress:-2,confidence:1,happiness:1},when:s=>!!O.careerTrack(s.job)&&!s.institution&&s.stress>=55&&(s.experience.roles[s.job]||0)>=2,cooldown:20,maxUses:1,specificity:4});}
})(window.OL);
