const assert=require('node:assert/strict');
module.exports=async function verifyPlayback(browser){
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
  // Install before app timers; runFor fires every real production interval deterministically.
  await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});
  await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));
  await page.goto('http://127.0.0.1:8000');
  const fixture=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'GB',seed:2218});
   delete s.playback; // Existing saves retain their original 45-second calendar-year rate.
   s.agenda=O.pickStories(s,5).map((item,i)=>({...item,type:'story',month:i*2+1,done:false}));
   if(s.agenda.length!==5)throw Error('Expected five real eligible infant highlights.');
   localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return {stories:s.agenda.map(x=>x.id),journal:s.journal.length};
  });
  await page.reload();await page.locator('[data-action="resume"]').first().click();
  await page.clock.runFor(45100);
  const life=await page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
  assert.equal(life.age*12+life.month,12,'five narrative deliveries must not charge five additional calendar months');
  assert.equal(life.status,'alive');assert.equal(life.pending,null);
  for(const id of fixture.stories)assert(life.journal.some(e=>e.momentId===id.replace(/^moment-/,'')),'scheduled highlight was lost: '+id);
  assert.equal(life.journal.length>fixture.journal,true);assert.deepEqual(errors,[]);
  console.log('PASS actual 1x playback: twelve calendar months in45.1s of controlled time, five authored highlights retained');
 }finally{await context.close();}
};
if(require.main===module){const {chromium}=require('playwright');(async()=>{const browser=await chromium.launch();try{await module.exports(browser);}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});}
