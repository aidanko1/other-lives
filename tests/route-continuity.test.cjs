const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function adult(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;Object.assign(s,{age:30,month:0,pending:null,agenda:[],cash:100000,school:false,gender:'F'});s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);return s;}
function partner(O,s){const p=O.createContact(s,'Partner',30,'M');p.relationshipStage='dating';p.residence='Separate home';return p;}
test('an intention to have a child is bound to the partner who agreed to it',()=>{
 const O=loadEngine(),s=adult(O),first=partner(O,s);assert(O.startRoute(s,'child-planning').ok);const r=s.routes.active['child-planning'];r.status='decision';s.pending='life-route-decision';first.role='Former partner';partner(O,s);
 const chance=O.chance;try{O.chance=()=>true;assert(O.applyChoice(s,0));}finally{O.chance=chance;}
 assert.equal(s.routes.active['child-planning'],undefined);assert.equal(s.routes.history.at(-1).outcome,'Circumstances changed');assert.equal(O.countChildren(s),0);
});
test('a pregnancy retains the recorded other parent after bereavement and a new relationship',()=>{
 const O=loadEngine(),s=adult(O),first=partner(O,s);assert(O.startRoute(s,'child-planning').ok);const chance=O.chance;
 try{O.chance=()=>true;O.advanceMonth(s);assert(O.applyChoice(s,0));}finally{O.chance=chance;}
 const r=s.routes.active['child-planning'];assert.equal(r.stage,'birth');first.alive=false;first.diedAt=first.age;const later=partner(O,s);r.status='decision';r.due=s.age;s.pending='life-route-decision';assert(O.applyChoice(s,0));
 const child=s.people.find(p=>p.role==='Child');assert(child.parents.includes(first.id),'recorded parent was forgotten');assert(!child.parents.includes(later.id),'a new partner silently replaced the biological parent');
});
test('leaving an overseas course clears the commitment without awarding a qualification',()=>{
 const O=loadEngine(),s=adult(O),education=s.education;s.study={degreeId:'computing',course:'Computing',mode:'full-time',status:'overseas-route',legacy:true,duration:3,started:27,graduationAge:30};s.school=true;s.routes.active['overseas-study']={id:'overseas-study',stage:'study',status:'decision',started:27,due:30,country:s.country,origin:'US',spent:10000};s.pending='life-route-decision';
 const opts=O.EVENTS.find(e=>e.id===s.pending).options(s),i=opts.findIndex(o=>o.label==='Leave this route for now');assert(i>=0);assert(O.applyChoice(s,i));
 assert.equal(s.study.status,'interrupted');assert.equal(s.school,false);assert.equal(s.education,education);assert.equal(s.routes.active['overseas-study'],undefined);
});
test('leaving doctoral research stops its stipend and keeps its research history',()=>{
 const O=loadEngine(),s=adult(O);O.routeJob(s,'Doctoral researcher',20000);s.postgraduate={level:'master',subject:'Psychology'};s.routes.active.phd={id:'phd',stage:'research',status:'decision',started:25,due:30,spent:0,years:5,subject:'Psychology'};s.pending='life-route-decision';
 const opts=O.EVENTS.find(e=>e.id===s.pending).options(s),i=opts.findIndex(o=>o.label==='Leave this route for now');assert(i>=0);assert(O.applyChoice(s,i));assert.equal(s.job,'');assert.equal(s.income,0);assert.equal(s.postgraduate.level,'master');assert(s.routes.history.some(r=>r.id==='phd'));
});
