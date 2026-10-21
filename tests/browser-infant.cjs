const assert=require('node:assert/strict');
module.exports=async function verifyInfantEnding(browser){
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const click=a=>page.locator('[data-action="'+a+'"]').first().click(),read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
 try{
  await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));await page.goto('http://127.0.0.1:8000');await click('new-dialog');await page.locator('#new-country').selectOption('NG');await page.evaluate(()=>{const O=window.OL,create=O.create;O.create=settings=>{O.create=create;return create({...settings,seed:2});};});await click('start');await page.clock.runFor(1500);await click('dismiss-birth');
  for(let n=0;n<20;n++){const s=await read();if(s.status==='finished')break;if(s.pending)await page.locator('[data-action="choose"]:not(:disabled)').first().click();else await click('next-decision');}
  const ended=await read();assert.equal(ended.status,'finished');assert.equal(ended.age,0);assert.equal(ended.month,9);assert(ended.cause);assert(await page.locator('[aria-label="Life in retrospect"]').isVisible());assert((await page.locator('body').innerText()).includes(ended.cause));await page.reload();await click('resume');assert.deepEqual(await read(),ended,'infant ending load changed history');await click('archive');await page.locator('[data-action="record"][data-id="'+ended.id+'"]').click();assert((await page.locator('body').innerText()).includes(ended.cause));
  await click('new-dialog');await page.locator('#new-country').selectOption('GB');await click('start');await page.clock.runFor(1500);await click('dismiss-birth');assert.notEqual((await read()).id,ended.id);assert.deepEqual(errors,[]);console.log('PASS natural NG2 infant death at0years9months, exact ending reload/archive and another UI birth');
 }finally{await context.close();}
};
