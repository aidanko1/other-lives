const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async browser=>{
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
 const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
 page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));await page.goto('http://127.0.0.1:8000');
  const fixture=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;
   Object.assign(s,{age:30,month:0,pending:'degree-placement',agenda:[],school:false,cash:0,income:0,knowledge:60});s.flags.flow.schoolLeavingResolved=true;O.ensureClarity(s);
   s.study={degreeId:'computing',course:'Computer Science',status:'enrolled',mode:'full-time',duration:3,started:29,graduationAge:32,progress:1};
   s.experience.roles={'Graduate business analyst':2,'Business analyst':1.5};
   localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return s;
  });
  await page.reload();await page.locator('[data-action="resume"]').first().click();
  assert.equal(await page.locator('[data-action="choose"][data-index="0"]').count(),0,'unaffordable first option omitted');
  const choice=page.locator('[data-action="choose"][data-index="1"]');assert(await choice.isVisible());await choice.click();
  const selected=await read();assert.equal(selected.pending,null);assert.equal(selected.study.placementConsidered,true);assert.equal(selected.study.placement,undefined);assert.equal(selected.cash,0);
  await page.locator('[data-action="game-tab"][data-tab="profile"]').click();
  const work=page.locator('.passport-experience .skill-record').filter({hasText:'Business analysis'});assert.equal(await work.count(),1);assert.match(await work.innerText(),/3.5 working years/);
  await page.locator('[data-action="game-tab"][data-tab="spend"]').click();
  assert.equal(await page.locator('.life-details > section:not(.budget-summary)').count(),0,'each Spend menu section is a native disclosure');
  assert(await page.locator('.budget-summary').isVisible(),'money overview stays visible');
  const panels=page.locator('.life-details > details');const sectionCount=await panels.count();assert(sectionCount>=3);
  for(let i=0;i<await panels.count();i++){
   const panel=panels.nth(i),summary=panel.locator(':scope > summary');assert.equal(await summary.count(),1);assert.equal(await panel.getAttribute('open'),null);
   await summary.click();assert.equal(await panel.getAttribute('open'),'');await summary.click();assert.equal(await panel.getAttribute('open'),null);
  }
  const Oview=await page.evaluate(()=>{const O=window.OL,s=JSON.parse(localStorage.getItem('other-lives-current-v1'));return {offers:O.planOffers(s).filter(o=>!o.reason).map(o=>o.id),routes:O.ROUTES.filter(d=>!s.pending&&!O.routeBlock(s,d)&&s.cash>=O.routeCost(s,d)).map(d=>d.id)};});
  assert.deepEqual(await page.locator('[data-action="plan-action"]').evaluateAll(xs=>xs.map(x=>x.dataset.id).sort()),Oview.offers.sort());
  assert.deepEqual(await page.locator('[data-action="route-start"]').evaluateAll(xs=>xs.map(x=>x.dataset.id).sort()),Oview.routes.sort());
  assert.equal(await page.locator('.life-details button[disabled]').count(),0);assert.deepEqual(await read(),selected,'inspection/disclosure toggles must not change the saved life');
  await page.locator('.route-planner > summary').click();
  await page.screenshot({path:'test-results/spend-clarity-'+browser.browserType().name()+'.png',fullPage:true,animations:'disabled'});
  await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="profile"]').click();assert.deepEqual(await read(),selected);assert.deepEqual(errors,[]);
  fs.writeFileSync('test-results/menu-clarity-'+browser.browserType().name()+'.json',JSON.stringify({seed:2218,syntheticAdultFixture:true,originalChoiceIndex:1,sharedCareerYears:3.5,collapsibleSections:sectionCount,unchangedExperienceLedger:JSON.stringify(selected.experience.roles)===JSON.stringify(fixture.experience.roles),exactReload:true,errors},null,2));
  console.log('PASS hidden choice retains original index; one career skill; all Spend menus expand/collapse; eligibility, inspection and exact saves preserved');
 }finally{await context.close();}
};
