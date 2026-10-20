const assert=require('node:assert/strict'),fs=require('node:fs'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch(),context=await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:8000')&&r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url());});
 const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
 const click=action=>page.locator('[data-action="'+action+'"]').first().click();
 const results='test-results';fs.mkdirSync(results,{recursive:true});
 try{
  await page.goto('http://127.0.0.1:8000');await page.locator('[data-action="new-dialog"]').first().waitFor();await click('new-dialog');await page.locator('#new-country').selectOption('GB');await click('start');
  assert(await page.locator('[aria-label="New life reveal"]').isVisible());await page.locator('[data-action="dismiss-birth"]').waitFor();await click('dismiss-birth');
  await page.locator('[data-action="game-tab"][data-tab="family"]').click();const paused=await read();await page.waitForTimeout(4100);const later=await read();assert.equal(later.age,paused.age);assert.equal(later.month,paused.month,'inspecting family must pause clock');
  for(const tab of ['profile','people','spend','log'])await page.locator('[data-action="game-tab"][data-tab="'+tab+'"]').click();
  await click('next-decision');const pending=await read();assert(pending.pending||pending.status==='finished','next decision must reach choice or ending');
  if(pending.pending){await page.locator('[data-action="choose"]:not([disabled])').first().click();const chosen=await read();assert(chosen.journal.length>pending.journal.length,'choice must record consequence');}
  await page.locator('[data-action="game-tab"][data-tab="profile"]').click();const saved=await read();await page.reload();await click('resume');await page.locator('[data-action="game-tab"][data-tab="profile"]').click();const reloaded=await read();assert.equal(reloaded.id,saved.id);assert.deepEqual(reloaded.journal,saved.journal,'loading must preserve established history');
  await click('archive');const downloadPromise=page.waitForEvent('download');await click('export');const download=await downloadPromise;await download.saveAs(results+'/browser-backup.json');const backup=JSON.parse(fs.readFileSync(results+'/browser-backup.json','utf8'));assert.equal(backup.current.id,saved.id);
  const fresh=await browser.newContext(),importPage=await fresh.newPage();importPage.on('pageerror',e=>errors.push(e.message));await importPage.goto('http://127.0.0.1:8000');await importPage.locator('[data-action="archive"]').first().click();await importPage.locator('#import-file').setInputFiles(results+'/browser-backup.json');await importPage.waitForFunction(()=>!!localStorage.getItem('other-lives-current-v1'));assert.equal(await importPage.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')).id),saved.id);await fresh.close();
  await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('other-lives-current-v1'));s.status='alive';s.pending=null;window.OL.finish(s,'Synthetic browser ending');localStorage.setItem('other-lives-current-v1',JSON.stringify(s));});await page.reload();await click('resume');assert(await page.locator('body').innerText().then(t=>t.includes('Life complete')));await page.screenshot({path:results+'/ending-desktop.png',fullPage:true});
  await click('new-dialog');await click('start');await page.locator('[data-action="dismiss-birth"]').waitFor();await click('dismiss-birth');const next=await read();assert.notEqual(next.id,saved.id,'another life must have a new identity');
  await page.setViewportSize({width:390,height:844});await page.locator('[data-action="game-tab"][data-tab="family"]').click();assert(await page.locator('.story-tabs').isVisible());await page.screenshot({path:results+'/family-mobile.png',fullPage:true});
  // Retain the earlier branch's browser assertions and execute them with real asynchronous waits.
  const legacy=await context.newPage();await legacy.goto('http://127.0.0.1:8000/tests/browser.html?autorun=1');
  await legacy.waitForFunction(()=>['passed','failed'].includes(document.querySelector('#results')?.dataset.status),{},{timeout:45000});
  const legacyResult=await legacy.locator('#results').innerText();console.log(legacyResult);
  assert.equal(await legacy.locator('#results').getAttribute('data-status'),'passed',legacyResult);await legacy.close();
  assert.deepEqual(errors,[],'browser errors');console.log('PASS: Chromium birth/choice, tab pause, save/reload, downloaded export/import, ending display, next life, mobile navigation. Natural full-life timing and reference hands-on play remain unverified.');
 }catch(e){await page.screenshot({path:results+'/browser-failure.png',fullPage:true}).catch(()=>{});throw e;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
