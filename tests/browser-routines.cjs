const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async function verifySpendToggles(browser){
 const results=[];
 for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:844}}),page=await context.newPage(),errors=[];
  const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
  page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));
   await page.goto('http://127.0.0.1:8000');
   await page.evaluate(()=>{
    const O=window.OL,s=O.create({country:'US',seed:951,classChoice:'top1'});let actions=0;
    while(s.status==='alive'&&(s.age<18||s.pending)&&actions++<1500){
     if(s.pending){const view=O.decisionView(s),index=view.options.findIndex(x=>!x.disabled);if(index<0||!O.applyChoice(s,index,view.token))throw Error('No valid childhood continuation');}
     else O.advanceMonth(s);O.assertConsistent(s);
    }
    if(s.status!=='alive'||s.age!==18||s.pending)throw Error('Expected a bounded, valid adult fixture');
    localStorage.setItem('other-lives-current-v1',JSON.stringify(s));
   });
   await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();
   assert.equal(await page.locator('.routine-panel').count(),0,'separate ongoing-routines menu removed');
   const other=page.locator('.budget-summary details').first();await other.locator('summary').click();
   const panel=page.locator('.life-details .route-policies');await panel.locator('summary').click();
   async function toggle(action,id,{keyboard=false}={}){
    const button=panel.locator('[data-action="'+action+'"][data-id="'+id+'"]');await button.scrollIntoViewIfNeeded();
    await button.evaluate(el=>{const target=document.querySelector('.time-sticky').getBoundingClientRect().bottom+24;scrollBy(0,el.getBoundingClientRect().top-target);});
    await button.focus();const before=await read(),top=await button.evaluate(e=>e.getBoundingClientRect().top);
    if(keyboard)await button.press('Enter');else await button.click();
    assert.equal(await panel.getAttribute('open'),'','preferences must remain open');assert.equal(await other.getAttribute('open'),'','other expanded Spend menus remain open');
    assert.equal(await page.locator('[data-tab="spend"][aria-current="page"]').count(),1,'toggle must stay in Spend');
    const after=await read(),selected=action==='set-routine'?after.routines.includes(id):!!after.routes.policies[id];
    assert.equal(selected,!(action==='set-routine'?before.routines.includes(id):!!before.routes.policies[id]));
    assert.equal(await button.getAttribute('aria-pressed'),String(selected));
    assert(Math.abs((await button.evaluate(e=>e.getBoundingClientRect().top))-top)<=2,'preference row stays at the same viewport position');
    assert(await button.evaluate(e=>e===document.activeElement),'keyboard focus stays on the selected preference');
    for(const key of ['age','month','rng','cash'])assert.equal(after[key],before[key]);assert.deepEqual(after.journal,before.journal,'toggling does not apply annual effects early');
    return after;
   }
   await toggle('set-routine','outdoors');await toggle('set-routine','study');await toggle('set-routine','practice');
   assert((await read()).routines.length>=3,'more than two choices can remain enabled');
   await toggle('set-routine','study',{keyboard:true});const selected=await toggle('life-policy','faithPractice');
   await panel.locator('summary').click();assert.equal(await panel.getAttribute('open'),null,'explicitly collapsing is respected');
   await page.locator('[data-change="route-destination"]').selectOption('GB');assert.equal(await panel.getAttribute('open'),null,'another render must not reopen a closed menu');
   await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();
   const loaded=await read();assert.equal(loaded.id,selected.id);assert.deepEqual(loaded.routines,selected.routines);assert.deepEqual(loaded.routes.policies,selected.routes.policies);assert.deepEqual(loaded.journal,selected.journal);assert.deepEqual(errors,[]);
   results.push({width,changes:5,noSelectionCap:true,exactSelectionReload:true,errors});
  }finally{await context.close();}
 }
 fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/routines-'+browser.browserType().name()+'.json',JSON.stringify(results,null,2));
 console.log('PASS Spend toggles: pointer/keyboard, more than two enabled, open/closed sibling menus, current tab, row/focus, annual timing and saved choices at mobile/desktop sizes');
};
