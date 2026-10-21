const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async browser=>{
 const results=[];
 for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
  const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
  page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));await page.goto('http://127.0.0.1:8000');
   const fixture=await page.evaluate(()=>{
    const O=window.OL,s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;
    Object.assign(s,{age:30,month:0,pending:null,agenda:[],school:false,cash:1000000,knowledge:70,health:40,relationships:70});s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);s.interests=['Music'];s.experience.hobbies.Music={years:1,level:1};
    const friend=O.createContact(s,'Friend',30,'F');friend.name='Amelia Parker';friend.close=70;
    const p=O.person(s,'Acquaintance',30,'F');Object.assign(p,{id:'qa-acquaintance',name:'Alex Morgan',close:50,interests:['Music'],job:'Office worker',knownSince:30});s.flags.dynamics.candidate={teen:false,createdAt:30,birthAt:0,person:p};
    if(!O.startRoute(s,'career-direction').ok)throw Error('Could not queue older work enquiry');s.pending='adult-connection-specific';
    s.journal=[{age:30,title:'A chat with a friend',description:'You discuss work and debt with your friend.',tone:'good',type:'life',effects:{happiness:.1}},
     {age:30,title:'Your yearly finances',description:'You pay bills and save a little.',type:'money',tone:'bad'},
     {age:29,title:'A qualification earned',description:'You completed your course. Future work is uncertain.',type:'education',tone:'good'},
     {age:28,title:'Goodbye to a relative',description:'A relative died. You remember their visits.',type:'loss',tone:'bad'}];
    localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return s;
   });
   await page.reload();await page.locator('[data-action="resume"]').first().click();
   const popup=page.locator('.decision-popup');assert.match(await popup.innerText(),/your acquaintance Alex/i);assert.doesNotMatch(await popup.innerText(),/your partner Alex/i);
   await popup.locator('[data-action="choose"]').filter({hasText:'Keep the connection friendly'}).click();
   for(const theme of ['light','dark']){
    await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;},theme);
    const neutral=page.locator('.log-entry').filter({hasText:'A chat with a friend'}),finance=page.locator('.log-entry').filter({hasText:'Your yearly finances'}),good=page.locator('.log-entry').filter({hasText:'A qualification earned'}),bad=page.locator('.log-entry').filter({hasText:'Goodbye to a relative'});
    assert((await neutral.getAttribute('class')).includes('tone-neutral'));assert((await finance.getAttribute('class')).includes('tone-neutral'));
    const bodyColour=await neutral.locator('.text > div').evaluate(e=>getComputedStyle(e).color);
    for(const row of [good,bad]){assert.equal(await row.locator('.text > div').evaluate(e=>getComputedStyle(e).color),bodyColour,'narrative body remains neutral');assert.notEqual(await row.locator('.text > strong').evaluate(e=>getComputedStyle(e).color),bodyColour,'clear outcome has a restrained headline accent');}
    // Current prose has its own existing neutral light shade; dark prose uses ink.
    assert.equal(await page.locator('.event-content .event-copy').evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(83, 99, 93)':bodyColour);
    assert.doesNotMatch(await page.locator('.event-content .event-copy').getAttribute('class'),/tone-(good|bad)/);
   }
   await page.locator('[data-action="game-tab"][data-tab="spend"]').click();const preferences=page.locator('.route-policies');await preferences.locator(':scope > summary').click();
   const planner=page.locator('.route-planner');await planner.locator(':scope > summary').click();
   const healthGroup=planner.locator('details').filter({has:page.locator('summary').filter({hasText:/^Health & support ·/})});await healthGroup.locator(':scope > summary').click();
   const beforeSupport=await read();await page.locator('[data-action="route-start"][data-id="support"]').click();assert.match(await popup.locator('h2').innerText(),/emotional support/i);
   assert.equal((await read()).routes.decisionId,'support');assert.equal(await page.locator('[data-tab="spend"][aria-current="page"]').count(),1);
   assert.equal((await read()).month,beforeSupport.month);await popup.locator('[data-action="choose"][data-index="0"]').click();
   assert.equal(await preferences.getAttribute('open'),'');assert.equal(await planner.getAttribute('open'),'');assert.equal(await healthGroup.getAttribute('open'),'');
   const supported=await read();assert(supported.routes.active['career-direction'],'older work enquiry is retained');assert(supported.routes.history.some(r=>r.id==='support'));assert.equal(supported.pending,null);
   const beforeDeferred=await read();await page.locator('[data-action="route-start"][data-id="medical-care"]').click();assert.equal(await popup.count(),0,'deferred medical care must not open an unrelated work menu');
   const deferred=await read();assert.equal(deferred.age,beforeDeferred.age);assert.equal(deferred.month,beforeDeferred.month);assert(deferred.routes.active['medical-care']);
   for(const [action,id]of [['set-routine','therapy'],['life-policy','carefulEating']]){
    const button=preferences.locator('[data-action="'+action+'"][data-id="'+id+'"]');const before=await read();await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');assert.equal(await preferences.getAttribute('open'),'');assert.equal((await read()).cash,before.cash);assert.equal(await page.locator('[data-tab="spend"][aria-current="page"]').count(),1);
   }
   assert((await read()).routines.length>=3);assert.equal(await page.locator('.routine-panel').count(),0);
   for(const id of ['food','counselling','checkup','hobby'])assert.equal(await page.locator('[data-action="plan-action"][data-id="'+id+'"]').count(),0,'duplicate '+id+' removed');
   const courses=page.locator('details.course-entry').filter({has:page.locator('[data-action="browse-degrees"]')});await courses.locator(':scope > summary').click();await page.locator('[data-action="browse-degrees"]').click();assert.equal(await page.locator('[data-tab="spend"][aria-current="page"]').count(),1);await popup.locator('[data-action="choose"]').filter({hasText:'Work or prepare first'}).click();assert.equal(await courses.getAttribute('open'),'','course disclosure survives its decision');
   const people=page.locator('.budget-group').filter({has:page.locator('summary').filter({hasText:/^People$/})});await people.locator(':scope > summary').click();const beforePurchase=await read();await page.locator('[data-action="plan-action"][data-id="meal"]').click();assert.equal(await people.getAttribute('open'),'');assert.equal(await preferences.getAttribute('open'),'');assert.equal(await planner.getAttribute('open'),'');assert((await read()).cash<beforePurchase.cash);assert.equal(await page.locator('[data-tab="spend"][aria-current="page"]').count(),1);
   await page.locator('[data-action="game-tab"][data-tab="profile"]').click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();assert.equal(await preferences.getAttribute('open'),'','Spend remembers disclosures across tab visits');
   const saved=await read();assert.deepEqual(saved.journal.filter(e=>fixture.journal.some(f=>f.title===e.title)),fixture.journal,'display colours must not rewrite old tone/effects/history');
   await page.screenshot({path:'test-results/spend-fixes-'+browser.browserType().name()+'-'+width+'.png',fullPage:true,animations:'disabled'});
   await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();assert.deepEqual(await read(),saved);assert.deepEqual(errors,[]);
   results.push({width,syntheticAdultFixture:true,clearRelationships:true,neutralLogBodies:true,correctSupportTarget:true,deferredPlanNoAdvance:true,stayInSpend:true,persistentToggles:true,menusRetained:true,exactReload:true,errors});
  }finally{await context.close();}
 }
 fs.writeFileSync('test-results/presentation-fixes-'+browser.browserType().name()+'.json',JSON.stringify(results,null,2));console.log('PASS log colour/relationship labels; support target and deferred care; persistent counselling/food toggles; nested menus/purchases/course decisions stay in Spend; exact reload');
};
