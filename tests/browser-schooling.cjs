const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async browser=>{
 const results=[];
 for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
  try{
   await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));await page.goto('http://127.0.0.1:8000');
   for(const mode of ['academic','home']){
    // Natural production progression to the first school-leaving choice; only birth and choices are fixed.
    const fixture=await page.evaluate(mode=>{
     const O=window.OL,s=O.create({country:'HK',seed:2218,classChoice:'comfortable'});let actions=0,course=null;
     while(s.status==='alive'&&s.pending!=='adult-crossroads'&&actions++<600){
      if(s.pending){const v=O.decisionView(s),a=v.options.map((o,i)=>({...o,i})).filter(o=>!o.disabled);let c=a[0];
       if(mode==='home'){if(s.pending==='school-entry')c=a.find(o=>/Learn with family/.test(o.label));if(s.pending==='school-return')c=a.find(o=>/Keep learning/.test(o.label));if(s.pending.startsWith('local-pathway-'))c=a.find(o=>/Work or help/.test(o.label));if(s.pending==='exam-years')c=a.find(o=>/contributing/.test(o.label));}
       if(!c||!O.applyChoice(s,c.i,v.token))throw Error('No valid school continuation '+s.pending);
      }else O.advanceMonth(s);
      O.assertConsistent(s);if(!course&&!s.pending&&s.age>=16&&O.initialSchoolCourse(s)&&s.flags.educationTrack.status==='enrolled')course=JSON.parse(JSON.stringify(s));
     }
     if(s.pending!=='adult-crossroads')throw Error('Natural school fixture did not reach its school-leaving choice');localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return JSON.parse(JSON.stringify({s,course}));
    },mode);
    await page.reload();await page.locator('[data-action="resume"]').first().click();const popup=page.locator('.decision-popup');assert.deepEqual(await read(),fixture.s,'pending school history survives reload');
    if(mode==='academic'){
     assert(fixture.s.schoolRecord.awards.some(a=>a.level===2));assert(fixture.s.schoolRecord.years.filter(y=>y.attended&&y.formal).length>=12);
     await popup.locator('[data-action="choose"]').filter({hasText:'Explore university subjects'}).click();assert.match(await popup.locator('h2').innerText(),/degree/i);
     await popup.locator('[data-action="choose"]').filter({hasText:'Work or prepare first'}).click();
     assert(fixture.course,'natural enrolled-course checkpoint');await page.evaluate(s=>localStorage.setItem('other-lives-current-v1',JSON.stringify(s)),fixture.course);await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();
     const preferences=page.locator('.route-policies');await preferences.locator(':scope > summary').click();const course=page.locator('.school-course');await course.locator(':scope > summary').click();const before=await read();await page.locator('[data-action="leave-school-course"]').click();const left=await read();
     assert.equal(left.flags.educationTrack.status,'withdrawn');assert.equal(left.school,false);for(const key of ['age','month','rng','cash','familyCash','familyAssets','education'])assert.equal(left[key],before[key]);assert.equal(await preferences.getAttribute('open'),'');assert.equal(await page.locator('[data-tab="spend"][aria-current="page"]').count(),1);assert.equal(left.journal.length,before.journal.length+1);
    }else{
     assert.equal(fixture.s.schoolRecord.awards.length,0);assert.equal(fixture.s.schoolRecord.years.filter(y=>y.attended).length,0);
     const before=await read();await popup.locator('[data-action="choose"]').filter({hasText:'Prepare a secondary-equivalency route'}).click();const started=await read(),r=started.routes.active.equivalency;
     assert(r);assert.equal(r.due,started.age+2);assert.equal(started.schoolRecord.awards.length,0);assert.equal(before.cash+before.familyCash+before.familyAssets-started.cash-started.familyCash-started.familyAssets,r.funding.fee);assert.equal(started.debt,before.debt);
     await page.locator('[data-action="game-tab"][data-tab="spend"]').click();assert.equal(await page.locator('[data-action="browse-degrees"]').count(),0,'ineligible applications are hidden');assert.match(await page.locator('.route-progress').filter({hasText:/equivalency/i}).innerText(),/qualification/i);
     await page.reload();await page.locator('[data-action="resume"]').first().click();await page.locator('[data-action="game-tab"][data-tab="spend"]').click();assert.deepEqual(await read(),started,'prepared recovery and exact funds survive reload');
    }
    assert.deepEqual(errors,[]);results.push({width,mode,seed:2218,country:'HK',age:fixture.s.age,awards:fixture.s.schoolRecord.awards.length});
   }
   await page.screenshot({path:'test-results/schooling-'+browser.browserType().name()+'-'+width+'.png',fullPage:true,animations:'disabled'});
  }finally{await context.close();}
 }
 fs.writeFileSync('test-results/schooling-'+browser.browserType().name()+'.json',JSON.stringify(results,null,2));console.log('PASS natural school attendance/completion vs home-learning; qualified university entry, funded equivalency, optional withdrawal/Spend continuity and exact reload at mobile/desktop sizes');
};
