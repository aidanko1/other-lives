const {test}=require('node:test'),assert=require('node:assert/strict'),O=require('./engine.cjs');
const ids=['first-steps-care','shared-spoon','first-naming','toddler-stacking','cloth-book','ant-trail','lost-mitten','new-taste'];
test('newborn candidates exclude walking, words, spoon and toddler stacking without removing infant care',()=>{
 for(const c of O.COUNTRIES){const s=O.create({country:c.code,seed:2218,snapshotPolicy:'none'});for(const month of [0,6,11]){s.month=month;const candidates=O.momentCandidates(s);assert(candidates.length>=5,c.code+' lacks infant narrative variety');for(const id of ids)assert(!candidates.some(x=>x.d.id===id),id+' eligible for newborn '+c.code);}}
});
test('queued legacy toddler stories are rechecked without rewriting recorded history or applying effects',()=>{
 const s=O.create({country:'GB',seed:5,snapshotPolicy:'none'}),p=s.people.find(p=>p.role==='Mother');
 for(const id of ids){const before=JSON.stringify(s);O.fireStory(s,{id:'moment-'+id,dynamicMoment:id,subjectId:p.id,title:'Old queued toddler story',description:'Old saved text',effect:'dynamic-moment'});assert(JSON.stringify(s)===before,'invalid queued '+id+' changed the life');}
 s.age=1;s.month=3;s.mortalityTiming.infantMonths=12;for(const id of ids){const d=O.MOMENT_DEFS.find(d=>d.id===id),subjectId=d.subject==='self'?'self':p.id;s.age=Math.max(1,d.min);assert(O.momentCandidates(s).some(x=>x.d.id===id),'appropriate toddler story missing '+id);O.fireStory(s,{id:'moment-'+id,dynamicMoment:id,subjectId,effect:'dynamic-moment'});assert.equal(s.journal[0].momentId,id);assert.equal(s.journal[0].subjectId,subjectId);}
});
