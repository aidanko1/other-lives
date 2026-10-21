const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async function verifyGameplayPolish(browser){
 const context=await browser.newContext(),page=await context.newPage(),errors=[],layouts=[];
 const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
 const click=action=>page.locator('[data-action="'+action+'"]').first().click();
 page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.clock.install({time:new Date('2026-10-21T00:00:00Z')});
  await page.clock.pauseAt(new Date('2026-10-21T00:00:01Z'));
  await page.goto('http://127.0.0.1:8000');
  const fixture=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'US',seed:951});
   // A rendering fixture with actual adjusted factors and retained history metadata.
   const before=O.factorSnapshot(s);O.adjust(s,{knowledge:2,relationships:.4});
   O.journal(s,'A familiar voice','A familiar voice keeps you company.','life');
   s.journal[0].effects=O.factorDelta(before,s);s.journal[0].money={cash:0,income:0,debt:0};
   s.people[0].close=63.599999999999994;
   localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return s;
  });
  await page.reload();await click('resume');await click('play-pause');
  assert.deepEqual(await read(),fixture,'opening and pausing must preserve the entire saved state');
  assert.equal(await page.locator('.stats-grid').count(),1);
  assert.equal(await page.locator('.time-sticky .stats-grid [role="meter"]').count(),4);
  assert.equal(await page.locator('.game-layout .stats-grid').count(),0,'living factors belong only to the floating strip');
  assert.equal(await page.locator('.log-list .effect-chip,.log-list .money-changes,.event-content .effect-chip').count(),0);
  assert((await page.locator('.log-list').innerText()).includes('A familiar voice keeps you company.'));
  assert((await read()).journal[0].effects.knowledge>0,'consequence metadata must remain in the save');
  for(const text of await page.locator('.person-row .bond').allTextContents())assert.match(text,/^\d{1,3}%$/,'contact percentages must be readable, without floating-point tails');
  const expected={Health:'health','Well-being':'happiness',Learning:'knowledge',Bonds:'relationships'};
  for(const [label,key]of Object.entries(expected))assert.equal(await page.getByRole('meter',{name:label,exact:true}).getAttribute('aria-valuenow'),String(Math.round(fixture[key])));
  for(const [width,height]of [[320,740],[390,844],[768,1024],[1280,900]])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height});await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;scrollTo(0,0);},theme);
   const dimensions=await page.evaluate(()=>{
    const bar=document.querySelector('.time-sticky'),r=bar.getBoundingClientRect();
    return {width:innerWidth,height:r.height,overflow:document.documentElement.scrollWidth>innerWidth,
     outside:[...bar.querySelectorAll('[role="meter"],button,select')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&b.height&&(b.left<r.left-1||b.right>r.right+1);}).map(e=>e.outerHTML.slice(0,100))};
   });
   assert.equal(dimensions.overflow,false,'page overflow at '+width+'/'+theme);assert.deepEqual(dimensions.outside,[],'controls must fit the strip');
   assert(dimensions.height<=height*.28,'floating strip must leave room for the life itself');
   await page.evaluate(()=>scrollTo(0,document.querySelector('.game-layout').offsetTop+160));
   const top=await page.locator('.time-sticky').evaluate(e=>e.getBoundingClientRect().top);assert(Math.abs(top)<=2,'factor strip must remain visible while reading');
   for(const label of Object.keys(expected))assert(await page.getByRole('meter',{name:label,exact:true}).isVisible());
   layouts.push({...dimensions,theme,stickyTop:top});
  }
  assert.deepEqual(await read(),fixture,'layout, themes and scrolling must not change simulation history or randomness');
  for(let stops=0;stops<12;stops++){await click('next-decision');const s=await read();if(s.pending||s.status==='finished')break;}
  const beforeChoice=await read();assert.equal(beforeChoice.pending,'early-bonds');
  await page.locator('[data-action="choose"]').filter({hasText:'Explore books and questions'}).click();
  const afterChoice=await read();assert(afterChoice.knowledge>beforeChoice.knowledge,'the narrative-only choice still changes learning');
  assert.equal(await page.getByRole('meter',{name:'Learning',exact:true}).getAttribute('aria-valuenow'),String(Math.round(afterChoice.knowledge)));
  assert.equal(await page.locator('.log-list .effect-chip,.event-content .effect-chip').count(),0);
  assert((await page.locator('.log-list').innerText()).includes('Curiosity becomes one of your earliest habits.'));
  assert(afterChoice.journal[0].effects.knowledge>0);
  fs.mkdirSync('test-results',{recursive:true});
  for(const theme of ['light','dark']){
   await page.setViewportSize({width:390,height:844});await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;scrollTo(0,document.querySelector('.game-layout').offsetTop+160);},theme);
   await page.screenshot({path:'test-results/gameplay-polish-'+browser.browserType().name()+'-'+theme+'.png'});
  }
  await page.reload();await click('resume');await click('play-pause');assert.deepEqual(await read(),afterChoice,'reloading must preserve the full choice consequence and metadata');
  assert.deepEqual(errors,[]);fs.writeFileSync('test-results/gameplay-polish-'+browser.browserType().name()+'.json',JSON.stringify({layouts,choice:afterChoice.pending,age:afterChoice.age,errors},null,2));
  console.log('PASS gameplay polish: four persistent factors, eight responsive light/dark layouts, narrative-only logs, rounded bonds and exact choice/reload consequences');
 }finally{await context.close();}
};
