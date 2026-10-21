const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function adult(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;Object.assign(s,{age:30,month:0,pending:null,agenda:[],school:false,cash:0,income:0});s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);return s;}
test('career stages share one displayed skill without rewriting employment or its ledger',()=>{
 const O=loadEngine(),s=adult(O);O.routeJob(s,'Business analyst',30000);
 s.experience.roles={'Graduate business analyst':2,'Business analyst':1.5,'Senior business analyst':.5,'Retail worker':.25,'Retail assistant':.5,'Uncatalogued work':.75};
 const before=JSON.stringify(s),groups=O.workExperienceGroups(s),business=groups.find(g=>g.name==='Business analysis');
 assert.equal(business.years,4);assert.equal(groups.length,3);assert.equal(groups.reduce((n,g)=>n+g.years,0),5.5);
 assert.equal(O.skillLevel(s,business.role,'work'),O.skillLevel(s,'Business analyst','work'));
 O.spriteAvatar=()=>'';const html=O.profileHTML(s).split('<h3>Work & skills</h3>')[1].split('<h3>Interests & practice</h3>')[0];
 assert.equal((html.match(/class="skill-record"/g)||[]).length,3);assert.match(html,/>Business analysis</);assert.match(html,/4.0 working years/);assert.doesNotMatch(html,/Graduate business analyst|Senior business analyst/);
 assert.equal(JSON.stringify(s),before);assert.equal(JSON.stringify(O.migrateLife(s)),before);
});
test('unavailable spending, routes, preferences and search actions are omitted while execution remains guarded',()=>{
 const O=loadEngine(),s=adult(O);s.debt=50000;s.flags.jobSearching=true;s.pending='unexpected-expense';
 const offers=O.planOffers(s),html=O.spendHTML(s);assert(offers.some(o=>o.reason));
 for(const o of offers)assert.equal(html.includes('data-action="plan-action" data-id="'+o.id+'"'),!o.reason,o.id);
 assert.doesNotMatch(html,/Not available yet|data-action="route-start"|data-action="search-work"|data-action="browse-degrees"/);
 assert.doesNotMatch(O.policiesHTML(s),/data-id="insurance"/);s.routes.policies.insurance=true;assert.match(O.policiesHTML(s),/data-id="insurance"/,'active unaffordable preference remains removable');
 assert.equal(O.planAction(s,'mortgage').ok,false);assert.equal(O.startRoute(s,'professional-training').ok,false);
});
test('routine visibility shares the existing age, budget and two-slot rules, retaining selected removals',()=>{
 const O=loadEngine(),s=adult(O);s.routines=['outdoors','study'];
 assert.equal(O.routineAvailable(s,'practice'),false);assert.equal(O.setRoutine(s,'practice').ok,false);
 assert.equal(O.routineAvailable(s,'study'),true);assert(O.setRoutine(s,'study').ok);assert.equal(O.routineAvailable(s,'practice'),true);
 assert.equal(O.routineAvailable(s,'therapy'),false);assert.equal(O.setRoutine(s,'therapy').ok,false);
 s.routines=['therapy'];assert.equal(O.routineAvailable(s,'therapy'),true);assert(O.setRoutine(s,'therapy').ok);
 s.age=5;assert.equal(O.routineAvailable(s,'outdoors'),false);assert.equal(O.setRoutine(s,'outdoors').ok,false);
});
test('a hidden first choice retains its original index, token and backend rejection',()=>{
 const O=loadEngine(),s=adult(O);s.pending='degree-placement';s.knowledge=60;s.study={degreeId:'computing',course:'Computer Science',status:'enrolled',mode:'full-time',duration:3,started:29,graduationAge:32,progress:1};
 const view=O.decisionView(s);assert.equal(view.options[0].disabled,true);assert.equal(!!view.options[1].disabled,false);
 const before=JSON.stringify(s);assert.equal(O.applyChoice(s,0,view.token),false);assert.equal(JSON.stringify(s),before);
 assert(O.applyChoice(s,1,view.token));assert.equal(s.study.placementConsidered,true);assert.equal(s.study.placement,undefined);assert.equal(s.cash,0);
});
