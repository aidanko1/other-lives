const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async browser=>{
 const results=[];
 for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
  try{
   await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));await page.goto('http://127.0.0.1:8000');
   await page.evaluate(()=>{const O=window.OL,s=O.create({country:'GB',seed:2218});let n=0;while(!s.pending&&s.status==='alive'&&n++<200)O.advanceMonth(s);if(s.pending!=='early-bonds')throw Error('Natural childhood fixture missing');localStorage.setItem('other-lives-current-v1',JSON.stringify(s));});
   await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('.decision-popup [data-action="choose"]').filter({hasText:'Explore books and questions'}).click();const chosen=await read();assert.equal(chosen.choiceHistory.at(-1).index,1);assert(chosen.choiceHistory.at(-1).storyContext);
   let found=false;
   for(let n=0;n<18;n++){
    const s=await read();if(s.journal.some(e=>e.momentId==='chosen-curiosity')){found=true;break;}assert.equal(s.status,'alive');assert(s.age<=17,'childhood follow-through did not appear');
    if(s.pending){const options=await page.locator('.decision-popup [data-action="choose"]').evaluateAll(xs=>xs.filter(x=>!x.disabled).map(x=>x.dataset.index));assert(options.length);await page.locator('.decision-popup [data-action="choose"][data-index="'+options[0]+'"]').click();}else await page.locator('[data-action="next-decision"]').click();
   }
   assert(found,'natural choices must produce a later contextual scene');let s=await read();const e=s.journal.find(e=>e.momentId==='chosen-curiosity');assert.equal(e.cause.eventId,'early-bonds');assert.equal(e.cause.index,1);assert.equal(e.cause.age,5);assert(e.age>5);assert.match(e.description,/chose to explore books and questions/);
   if(s.pending)await page.locator('[data-action="set-aside"]').click();await page.locator('[data-action="game-tab"][data-tab="log"]').click();assert(await page.locator('.log-entry').filter({hasText:e.title}).count());assert.equal(await page.locator('.log-entry .effect-badge').count(),0);const before=await read();
   await page.locator('[data-action="game-tab"][data-tab="profile"]').click();assert.deepEqual(await read(),before);await page.reload();await page.locator('[data-action="resume"]').first().click();assert.deepEqual(await read(),before,'history and causal receipt survive exact reload');assert.deepEqual(errors,[]);results.push({width,seed:2218,sourceAge:5,eventAge:e.age,exactReload:true});
   if((await read()).pending)await page.locator('[data-action="set-aside"]').click();await page.locator('[data-action="game-tab"][data-tab="log"]').click();await page.screenshot({path:'test-results/story-flow-'+browser.browserType().name()+'-'+width+'.png',fullPage:true,animations:'disabled'});
  }finally{await context.close();}
 }
 fs.writeFileSync('test-results/story-flow-'+browser.browserType().name()+'.json',JSON.stringify(results,null,2));console.log('PASS actual childhood choice leads to a later contextual story; narrative-only log, inspection and exact causal-history reload at mobile/desktop sizes');
};
