const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function adult(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;Object.assign(s,{age:30,month:0,pending:null,agenda:[],school:false,cash:1000000,knowledge:70});s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);return s;}
test('routine, mixed and financial entries stay neutral despite legacy tones, keyword hits or tiny effects',()=>{
 const O=loadEngine();for(const entry of [
  {title:'A familiar voice',description:'Your friend offers support.',tone:'good',effects:{happiness:.1}},
  {title:'A conversation about debt',description:'You discuss the bill. Nobody is in danger.',tone:'bad'},
  {title:'Your yearly finances',type:'money',tone:'bad',money:{debt:20000}},
  {title:'A birthday, and those born alongside you',type:'milestone',tone:'good'},
  {title:'Promotion possibilities',description:'An application might succeed.',tone:'good'},
  {title:'Remembering an illness',description:'You are not sick now.',tone:'bad'},
  {title:'A friend is finding their feet',momentId:'ordinary',effects:{health:2,stress:-1},tone:'good'}
 ]){const before=JSON.stringify(entry);assert.equal(O.logTone(entry),'neutral',entry.title);assert.equal(JSON.stringify(entry),before);}
});
test('colour is reserved for verified clear outcomes, including the actual result of a promotion',()=>{
 const O=loadEngine();for(const entry of [{type:'ending'},{type:'loss'},{title:'Goodbye to your father'},{title:'Study interrupted'}])assert.equal(O.logTone(entry),'bad');
 assert.equal(O.logTone({title:'A qualification earned'}),'good');
 assert.equal(O.logTone({eventId:'promotion',description:'Apply. You progress from Retail assistant to Senior retail assistant, full-time.'}),'good');
 assert.equal(O.logTone({eventId:'promotion',description:'The application is unsuccessful. You remain in your job.'}),'bad');
 assert.equal(O.logTone({eventId:'promotion',description:'You choose to remain in your job.'}),'neutral');
});
test('decision text introduces known people, teachers and pets without inventing relationships or conflating names',()=>{
 const O=loadEngine(),s=adult(O);s.people=[{id:'f',name:'Amelia Parker',role:'Friend'},{id:'p',name:'Isabella Chen',role:'Partner'},{id:'j',name:'Jordan Lee',role:'Mentor'}];s.location.name='Jordan';s.memories.teacher={name:'Charlotte Smith'};s.memories.pet={name:'Milo',kind:'cat'};
 const before=JSON.stringify(s);
 assert.equal(O.decisionText(s,'Amelia Parker calls Isabella Chen.'),'Your friend Amelia Parker calls your partner Isabella Chen.');
 assert.equal(O.decisionText(s,'Talk to your friend Amelia Parker.'),'Talk to your friend Amelia Parker.');assert.equal(O.decisionText(s,'Friend — Amelia Parker calls.'),'Your friend Amelia Parker calls.');
 assert.equal(O.decisionText(s,"Amelia’s advice helped."),"Your friend Amelia’s advice helped.");
 assert.equal(O.decisionText(s,'Charlotte Smith meets Milo.'),'Your teacher Charlotte Smith meets your cat Milo.');
 assert.equal(O.decisionText(s,'Visit Jordan. Alex arrives.'),'Visit Jordan. Alex arrives.');
 s.people.push({id:'f2',name:'Amelia Stone',role:'Friend'});assert.equal(O.decisionText(s,'Amelia calls.'),'Amelia calls.','ambiguous first names are not assigned an invented identity');s.people.pop();assert.equal(JSON.stringify(s),before);
});
test('explicit route opening binds the clicked support menu even with an older ready work route',()=>{
 const O=loadEngine(),s=adult(O);assert(O.startRoute(s,'career-direction').ok);assert(O.startRoute(s,'support').ok);const calendar=[s.age,s.month,s.rng];
 assert(O.openRouteDecision(s,'support'));assert.equal(O.readyRoute(s).id,'support');assert.match(O.decisionView(s).title,/support/i);assert.deepEqual([s.age,s.month,s.rng],calendar);
 const before=JSON.stringify(s),view=O.decisionView(s),loaded=O.migrateLife(s);assert.equal(JSON.stringify(loaded),before);assert.equal(O.decisionView(loaded).token,view.token);
 assert.equal(O.openRouteDecision(s,'career-direction'),false,'an unanswered menu cannot be redirected');assert.equal(JSON.stringify(s),before);
 assert(O.applyChoice(s,0,view.token));assert(s.routes.active['career-direction']);assert.equal(s.routes.active.support,undefined);assert.equal(s.routes.history.at(-1).id,'support');assert.equal(s.routes.decisionId,undefined);
});
test('the same explicit route binding works across categories and deferred plans do not advance time',()=>{
 const O=loadEngine();for(const id of ['will','housing-review','career-direction']){const s=adult(O);if(id==='housing-review')assert(O.planAction(s,'buy-home').ok);assert(O.startRoute(s,'support').ok);assert(O.startRoute(s,id).ok,id);assert(O.openRouteDecision(s,id));assert.equal(O.readyRoute(s).id,id);assert.equal(O.decisionView(s).title,O.ROUTES.find(d=>d.id===id).heading?.(s,s.routes.active[id])||O.ROUTES.find(d=>d.id===id).title);}
 const s=adult(O);s.health=40;assert(O.startRoute(s,'medical-care').ok);const before=JSON.stringify(s);assert.equal(O.openRouteDecision(s,'medical-care'),false);assert.equal(JSON.stringify(s),before);
});
test('Spend has one persistent control per repeated yearly activity and no separate routines panel',()=>{
 const O=loadEngine(),s=adult(O);s.interests=['Programming'];s.experience.hobbies.Programming={years:1,level:1};const html=O.spendHTML(s),offers=O.planOffers(s);
 assert.equal(O.routinesHTML(s),'');assert.doesNotMatch(html,/routine-panel|Choose up to two|ongoing routines/);
 for(const id of ['food','counselling','checkup','sport','hobby'])assert(!offers.some(x=>x.id===id),id+' duplicated by an ongoing toggle');
 for(const [action,id]of [['set-routine','therapy'],['life-policy','carefulEating'],['life-policy','checkups'],['life-policy','hobbyLessons']])assert.equal((html.match(new RegExp('data-action="'+action+'" data-id="'+id+'"','g'))||[]).length,1,id);
 assert(offers.some(x=>x.id==='dental'));assert(offers.some(x=>x.id==='holiday'));assert(offers.some(x=>x.id==='gift'));
 const support=O.ROUTES.find(r=>r.id==='support').options(s);assert.equal(support[1].disabled,true,'legacy counselling option index stays guarded; its control moved to Spend');
 s.interests=[];assert(O.planOffers(s).some(x=>x.id==='hobby'),'the introductory drawing acquisition path remains available');
 s.routines=[];assert.equal(O.ROUTES.find(r=>r.id==='support').options(s)[2].disabled,true);s.routines=['connection','outdoors','study','practice'];assert(O.startRoute(s,'support').ok);assert(O.openRouteDecision(s,'support'));assert(O.applyChoice(s,2));assert.deepEqual(JSON.parse(JSON.stringify(s.routines)),['connection','outdoors','study'],'reduce one demand must preserve the other three');
});
test('more than two enabled preferences persist across annual settlement and exact reload without yearly rebooking',()=>{
 const O=loadEngine(),s=adult(O);s.interests=['Programming'];s.experience.hobbies.Programming={years:1,level:1};s.routines=[];
 for(const id of ['outdoors','connection','practice','study','fitness','therapy'])assert(O.setRoutine(s,id).ok,id);assert(O.setLifePolicy(s,'carefulEating').ok);const initial=JSON.parse(JSON.stringify(s));assert.equal(s.routines.length,6);assert.equal(s.cash,initial.cash);
 const selected=JSON.stringify(s.routines);for(let year=0;year<2;year++){s.age++;O.passive(s);assert.equal(JSON.stringify(s.routines),selected);assert.equal(s.routes.policies.carefulEating,true);const once=JSON.stringify(s);O.passive(s);assert.equal(JSON.stringify(s),once,'annual costs/effects cannot be charged twice');assert.equal(JSON.stringify(O.migrateLife(s)),once);}
 assert(s.cash<initial.cash,'continuing costs are actually settled');assert(O.setRoutine(s,'therapy').ok);assert(!s.routines.includes('therapy'));assert(O.setLifePolicy(s,'carefulEating').ok);assert.equal(s.routes.policies.carefulEating,false);
});

test('staged and handoff decisions keep their route identity ahead of unrelated ready work',()=>{
 const O=loadEngine(),s=adult(O);assert(O.startRoute(s,'will').ok);assert(O.startRoute(s,'career-direction').ok);assert(O.openRouteDecision(s,'career-direction'));assert(O.applyChoice(s,0));assert.equal(s.routes.active['career-direction'].stage,'fields');O.advanceMonth(s);assert.equal(O.readyRoute(s).id,'career-direction');assert.match(O.decisionView(s).description,/individual pathways|pathways/i);
 const t=adult(O);t.gender='F';const p=O.createContact(t,'Partner',30,'M');p.relationshipStage='dating';assert(O.startRoute(t,'career-direction').ok);assert(O.startRoute(t,'child-planning').ok);t.routes.active['child-planning'].stage='difficulty';assert(O.openRouteDecision(t,'child-planning'));const view=O.decisionView(t),index=view.options.findIndex(o=>/adoption or guardianship/.test(o.label));assert(index>=0);assert(O.applyChoice(t,index,view.token));assert.equal(t.routes.decisionId,'adoption');assert.equal(O.openRouteDecision(t,'adoption'),false,'adoption preparation must wait for its due age');const wait=t.routes.active.adoption.due-t.age;t.age+=wait;for(const person of t.people)if(person.alive)person.age+=wait;O.advanceMonth(t);assert.equal(O.readyRoute(t).id,'adoption');assert(t.routes.active['career-direction']);
});

test('narrative hides embedded legacy factor readouts while keeping costs, consequences, stored prose and effects',()=>{
 const O=loadEngine(),s=adult(O);assert(O.planAction(s,'meal').ok);const raw=JSON.stringify(s),entry=s.journal[0];assert.match(entry.description,/relationships \+5/);assert.match(entry.description,/happiness \+4/);assert(entry.effects.relationships>0);const shown=O.narrativeText(s,entry.description);assert.doesNotMatch(shown,/\b(?:relationships|happiness)\s*\+/);assert.match(shown,/An unhurried evening together/);assert.match(shown,/Paid /);assert.match(shown,/Available funds:/);assert.equal(JSON.stringify(s),raw);
 assert.equal(O.narrativeText(s,'A visit. health +2 · confidence -1.5 · stress −3'),'A visit.');assert.equal(O.narrativeText(s,'You spend 5 years learning about health.'),'You spend 5 years learning about health.');
});
