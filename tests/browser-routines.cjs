const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async function verifyRoutineInteraction(browser){
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
   const other=page.locator('.life-details details:not(.routine-panel)').first();await other.locator('summary').click();
   const panel=page.locator('.life-details .routine-panel');await panel.locator('summary').click();
   const names=()=>page.locator('.life-details details[open] > summary').allTextContents();
   const initialOpen=await names();assert(initialOpen.length>=2);
   async function toggle(id,{keyboard=false,rejected=false}={}){
    const button=panel.locator('[data-action="set-routine"][data-id="'+id+'"]');await button.scrollIntoViewIfNeeded();
    await button.evaluate(el=>{const target=document.querySelector('.time-sticky').getBoundingClientRect().bottom+24;scrollBy(0,el.getBoundingClientRect().top-target);});
    await button.focus();const before=await read(),top=await button.evaluate(e=>e.getBoundingClientRect().top);
    if(keyboard)await button.press('Enter');else await button.click();
    assert.equal(await panel.getAttribute('open'),'','the ongoing-routines menu must remain open');
    assert.equal(await other.getAttribute('open'),'','other expanded Spend sections must remain open');
    const after=await read();
    if(rejected){assert.deepEqual(after.routines,before.routines);assert((await page.locator('.toast').innerText()).includes('two routines'));}
    else assert.equal(after.routines.includes(id),!before.routines.includes(id));
    assert.equal(await button.getAttribute('aria-pressed'),String(after.routines.includes(id)));
    assert(Math.abs((await button.evaluate(e=>e.getBoundingClientRect().top))-top)<=2,'routine row must stay at the same viewport position');
    assert(await button.evaluate(e=>e===document.activeElement),'keyboard focus must stay on the same routine');
    assert.equal(after.age,before.age);assert.equal(after.month,before.month);assert.equal(after.rng,before.rng);assert.equal(after.cash,before.cash);
    assert.deepEqual(after.journal,before.journal,'editing a routine does not fabricate an event or apply annual effects early');
    return after;
   }
   assert((await read()).routines.includes('outdoors'));
   await toggle('outdoors');await toggle('study');assert.equal(await panel.locator('[data-id="practice"]').isVisible(),false,'a third routine must be hidden when both slots are full');
   const selected=await toggle('study',{keyboard:true});assert.equal(await panel.locator('[data-id="practice"]').isVisible(),true,'freeing a slot reveals eligible routines');
   await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();
   assert.deepEqual(await read(),selected,'selected routine must persist exactly through save/load');assert.deepEqual(errors,[]);
   results.push({width,changes:3,hiddenLimit:1,exactReload:true,errors});
  }finally{await context.close();}
 }
 fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/routines-'+browser.browserType().name()+'.json',JSON.stringify(results,null,2));
 console.log('PASS Spend routines: pointer/keyboard changes and hidden unavailable selections retain disclosures, row position, focus, annual timing and exact saves at mobile/desktop sizes');
};
