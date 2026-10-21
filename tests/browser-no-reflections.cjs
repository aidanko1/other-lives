const assert=require('node:assert/strict');
module.exports=async function verifyNoReflectionPauses(browser){
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));await page.goto('http://127.0.0.1:8000');
  for(const age of [5,15,30,50,70]){
   const fixture=await page.evaluate(age=>{
    const O=window.OL,s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=age-1;Object.assign(s,{age:age-1,month:11,school:false,pending:null,agenda:[],cash:100000});s.flags.flow.schoolLeavingResolved=true;delete s.playback;
    localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return {id:s.id,age};
   },age);
   await page.reload();await page.evaluate(()=>{const O=window.OL;O.makeAgenda=()=>[];O.personDeathRisk=()=>0;O.mortality=()=>false;});await page.locator('[data-action="resume"]').first().click();
   await page.clock.runFor(7600);await page.locator('[data-action="game-tab"][data-tab="profile"]').click();
   const life=await page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));assert.equal(life.id,fixture.id);assert.equal(life.status,'alive');assert.equal(life.age,age);assert.equal(life.month,1,'automatic playback must not stop for a reflection at '+age);assert.equal(life.pending,null);assert.equal(Object.hasOwn(life,'reflections'),false);
   assert.equal(await page.locator('[data-action*="reflection"], [data-change="reflections"], #reflection-note').count(),0);assert.equal(await page.locator('[role="dialog"]').count(),0);
  }
  assert.deepEqual(errors,[]);console.log('PASS no reflection prompts/notes/toggle/automatic pauses at5/15/30/50/70; normal playback and inspection retained');
 }finally{await context.close();}
};
