const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async function verifyAccessibility(browser){
 const context=await browser.newContext(),page=await context.newPage(),reports=[];
 async function audit(stage){console.log('Accessibility audit',stage);await page.evaluate(()=>Promise.all(document.getAnimations().filter(a=>a.playState==='running').map(a=>a.finished.catch(()=>{}))));await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const result=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));reports.push({stage,violations:result.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id)});}
 try{
  await page.goto('http://127.0.0.1:8000');await audit('landing');await page.locator('[data-action="new-dialog"]').first().click();await audit('birth-form');
  assert(await page.evaluate(()=>document.querySelector('[role="dialog"]').contains(document.activeElement)),'new dialog must receive focus');
  await page.locator('[data-action="start"]').focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'close-modal','Tab must wrap inside modal');await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'start');await page.keyboard.press('Escape');assert.equal(await page.locator('[role="dialog"]').count(),0);assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'new-dialog','closing must return focus to the opener');

  await page.evaluate(()=>{const O=window.OL,s=O.create({country:'GB',seed:2218});localStorage.setItem('other-lives-current-v1',JSON.stringify(s));});await page.reload();await page.locator('[data-action="resume"]').first().click();await audit('childhood');
  await page.locator('[data-action="next-decision"]').click();await audit('decision');
  // The decision covers the page: keyboard access must match that visible boundary.
  const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1'))),waiting=await read();
  const popup=page.locator('.decision-popup'),reopen=page.locator('[data-action="return-decision"]');
  const decision=await popup.innerText(),token=await popup.locator('[data-action="choose"]').first().getAttribute('data-decision');
  for(const width of [390,1280]){
   await page.setViewportSize({width,height:900});
   assert.equal(await popup.getAttribute('aria-modal'),'true','visible decision must be modal');
   const first=popup.locator('[data-action="set-aside"]'),last=popup.locator('[data-action="choose"]').last();
   await first.focus();await page.keyboard.press('Shift+Tab');assert(await last.evaluate(e=>e===document.activeElement),'Shift+Tab wraps inside the decision');
   await page.keyboard.press('Tab');assert(await first.evaluate(e=>e===document.activeElement),'Tab wraps to Set aside');
   assert(await page.locator('.story-tabs').evaluate(e=>!!e.closest('[inert]')),'covered controls cannot receive focus');
   const stops=await popup.locator('button,a[href]').count();
   for(let i=0;i<=stops;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>!!document.activeElement.closest('.decision-popup')),'keyboard focus escaped behind the decision');}
   await page.keyboard.press('Escape');assert.equal(await popup.count(),0);assert(await reopen.evaluate(e=>e===document.activeElement),'Set aside returns focus to Open decision');
   for(const tab of ['profile','family','people','spend','log']){
    await page.locator('[data-action="game-tab"][data-tab="'+tab+'"]').click();
    assert.equal(await popup.count(),0);assert.deepEqual(await read(),waiting,'inspection must preserve the pending life exactly');
    assert.equal(await page.locator('.story-tabs').evaluate(e=>!!e.closest('[inert]')),false,'inspection is available after Set aside');
   }
   await reopen.press('Enter');assert.equal(await popup.innerText(),decision);assert.equal(await popup.locator('[data-action="choose"]').first().getAttribute('data-decision'),token);
   await first.click();assert(await reopen.evaluate(e=>e===document.activeElement),'pointer Set aside also restores focus');
   await reopen.press('Enter');assert.deepEqual(await read(),waiting);
  }
  await page.reload();await page.locator('[data-action="resume"]').first().click();assert.deepEqual(await read(),waiting,'reload retains the exact pending life');
  assert.equal(await popup.locator('[data-action="choose"]').first().getAttribute('data-decision'),token);
  await popup.locator('[data-action="choose"]').first().click();await page.locator('[data-action="game-tab"][data-tab="profile"]').click();
  const resolved=await read();assert(resolved.journal.length>waiting.journal.length,'the reopened decision still records its consequence');assert.notEqual(resolved.pending,waiting.pending);
  console.log('PASS decision keyboard boundary, Escape/pointer Set aside, mobile/desktop inspection, exact pending reload and resolution');
  await page.evaluate(()=>{const O=window.OL,s=JSON.parse(localStorage.getItem('other-lives-current-v1'));O.finish(s,'Accessibility fixture ending');localStorage.setItem('other-lives-current-v1',JSON.stringify(s));});await page.reload();await page.locator('[data-action="resume"]').first().click();await audit('ending');
  await page.setViewportSize({width:390,height:844});await audit('mobile-ending');await page.evaluate(()=>{document.documentElement.dataset.theme='dark'});await audit('dark-ending');await page.locator('[data-action="home"]').click();await audit('dark-landing');await page.locator('[data-action="new-dialog"]').first().click();await audit('dark-birth-form');
  fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/accessibility-'+browser.browserType().name()+'.json',JSON.stringify(reports,null,2));const failures=reports.flatMap(r=>r.violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>({...v,stage:r.stage})));assert.deepEqual(failures,[],'WCAG serious/critical accessibility violations');console.log('PASS accessibility: nine light/dark lifecycle/form/mobile surfaces, no serious/critical WCAG violations; manual screen-reader review remains separate');
 }finally{await context.close();}
};
