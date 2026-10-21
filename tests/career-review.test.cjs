const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function reviewed(O,yearsSince=3){
 const s=O.create({country:'GB',seed:2218});
 for(const p of s.people)p.age+=30+yearsSince;
 Object.assign(s,{age:30+yearsSince,month:0,school:false,pending:null,agenda:[],cash:100000});
 s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);
 O.routeJob(s,'Retail assistant',20000);s.experience.roles[s.job]=4+yearsSince;
 s.flags.careerReviewAt=30;s.used.promotion=30;
 return s;
}
test('promotion review honours its promised three-year interval across exact load',()=>{
 const O=loadEngine(),event=O.EVENTS.find(e=>e.id==='promotion'),early=reviewed(O,2),due=reviewed(O);
 assert.equal(O.nextCareerStep(early),null);assert.equal(O.eventEligible(early,event),false);
 assert(O.nextCareerStep(due));assert.equal(O.eventEligible(due,event),true);
 const before=JSON.stringify(due),loaded=O.migrateLife(due);
 assert.equal(JSON.stringify(due),before);assert.equal(JSON.stringify(loaded),before);
 assert.equal(O.eventEligible(loaded,event),true);assert.equal(loaded.used.promotion,30);
 loaded.pending='promotion';
 const pending=JSON.stringify(loaded),view=O.decisionView(loaded);assert(view.options.length>=2);
 assert.equal(JSON.stringify(loaded),pending,'review display must not mutate a saved life');
 assert.match(view.options.at(-1).detail,/three years/);
});
test('primary event selection includes a due promotion without bypassing training or qualification',()=>{
 const O=loadEngine(),s=reviewed(O),weighted=O.weighted,pools=[];
 O.weighted=(st,items,weight)=>{if(items.some(x=>x.id))pools.push(items.map(x=>x.id));return weighted(st,items,weight);};
 O.chooseEvent(s);assert(pools.some(ids=>ids.includes('promotion')),'eligible review must enter the actual selection pool');
 const t=O.CAREER_TRACKS.find(t=>t.id==='medicine');
 O.routeJob(s,t.stages[2].title,50000);s.experience.roles[s.job]=15;
 s.flags.completedDegree='medicine';s.education=O.EDU[4];
 assert.equal(O.nextCareerStep(s),null,'specialist title still requires its professional assessment');
});
test('secondary annual decision pool honours the same review cooldown',()=>{
 const O=loadEngine(),s=reviewed(O),weighted=O.weighted,pools=[];
 // Isolate the optional second-decision selector; do not force application success.
 O.chooseEvent=()=>O.EVENTS.find(e=>e.id==='health-check');O.chance=()=>true;
 O.weighted=(st,items,weight)=>{if(items.some(x=>x.id))pools.push(items.map(x=>x.id));return weighted(st,items,weight);};
 O.makeAgenda(s);assert(pools.some(ids=>ids.includes('promotion')),'second decision must use the declared interval too');
});
