const assert=require('node:assert/strict');
module.exports=async function verifyDuration(browser){
 for(const minutes of [30,60,90]){
  const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));
   await page.goto('http://127.0.0.1:8000');await page.locator('[data-action="new-dialog"]').first().click();
   assert.equal(await page.locator('#new-duration').inputValue(),'60');assert.deepEqual(await page.locator('#new-duration option').evaluateAll(options=>options.map(o=>o.value)),['30','60','90']);
   await page.locator('#new-duration').selectOption(String(minutes));await page.locator('#new-country').selectOption('GB');
   // Fix birth randomness, retaining the actual setup, reveal, playback and five authored stories.
   await page.evaluate(()=>{const O=window.OL,create=O.create;O.create=settings=>{O.create=create;const s=create({...settings,seed:2218});s.agenda=O.pickStories(s,5).map((item,i)=>({...item,type:'story',month:i*2+1,done:false}));return s;};});
   await page.locator('[data-action="start"]').click();await page.clock.runFor(1500);await page.locator('[data-action="dismiss-birth"]').click();
   const birth=await page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));assert.equal(birth.playback.targetMinutes,minutes);assert.equal(birth.settings.durationMinutes,minutes);
   const yearMs=minutes*60000/birth.playback.referenceYears;await page.clock.runFor(yearMs+100);
   const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1'))),life=await read();assert.equal(life.age*12+life.month,12);assert.equal(life.pending,null);
   for(const story of birth.agenda)assert(life.journal.some(e=>e.momentId===story.id.replace(/^moment-/,'')),'duration playback lost '+story.id);
   await page.locator('[data-action="game-tab"][data-tab="profile"]').click();const paused=await read();await page.clock.runFor(yearMs);assert.deepEqual(await read(),paused,'inspection must pause each duration');
   await page.reload();assert.deepEqual(await read(),paused,'reloading must preserve the full duration save');assert.deepEqual(errors,[]);
   console.log('PASS actual UI duration '+minutes+'min: saved birth setting, timed year, retained highlights, inspection pause and exact reload');
  }finally{await context.close();}
 }
};
