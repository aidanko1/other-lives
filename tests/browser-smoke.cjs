const assert=require('node:assert/strict'),fs=require('node:fs'),playwright=require('playwright'),browserName=process.env.PLAYWRIGHT_BROWSER||'chromium';
if(!['chromium','firefox','webkit'].includes(browserName))throw Error('Unknown test browser: '+browserName);
(async()=>{
 const browser=await playwright[browserName].launch(),context=await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:8000')&&r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url());});
 const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')));
 const click=action=>page.locator('[data-action="'+action+'"]').first().click();
 const results='test-results';fs.mkdirSync(results,{recursive:true});
 try{
  await require('./browser-pacing.cjs')(browser);
  await require('./browser-duration.cjs')(browser);
  await require('./browser-polish.cjs')(browser);
  const menuChecks=await Promise.allSettled([require('./browser-routines.cjs')(browser),require('./browser-menu-clarity.cjs')(browser),require('./browser-presentation.cjs')(browser)]);
  const menuFailures=menuChecks.filter(r=>r.status==='rejected');if(menuFailures.length)throw new AggregateError(menuFailures.map(r=>r.reason),'Spend interaction checks failed');
  await require('./browser-no-reflections.cjs')(browser);
  await require('./browser-parallel.cjs')(browser);
  await require('./browser-infant.cjs')(browser);
  await require('./browser-accessibility.cjs')(browser);
  await require('./browser-schooling.cjs')(browser);
  await require('./browser-large-archive.cjs')(browser);
  await page.goto('http://127.0.0.1:8000');await page.locator('[data-action="new-dialog"]').first().waitFor();assert.equal(await page.locator('.footer-note .release-version').innerText(),'v'+require('../package.json').version,'landing must identify the running release');await click('new-dialog');await page.locator('#new-country').selectOption('GB');await click('start');
  assert(await page.locator('[aria-label="New life reveal"]').isVisible());await page.locator('[data-action="dismiss-birth"]').waitFor();await click('dismiss-birth');assert.equal(await page.locator('.footer-note .release-version').innerText(),'v'+require('../package.json').version,'gameplay must retain the subtle release label');
  await page.locator('[data-action="game-tab"][data-tab="family"]').click();const paused=await read();await page.waitForTimeout(4100);const later=await read();assert.equal(later.age,paused.age);assert.equal(later.month,paused.month,'inspecting family must pause clock');
  for(const tab of ['profile','people','spend','log'])await page.locator('[data-action="game-tab"][data-tab="'+tab+'"]').click();
  let pending;
  for(let skipped=0;skipped<30;skipped++){const beforeSkip=await read();await click('next-decision');pending=await read();if(pending.pending||pending.status==='finished')break;
   assert(beforeSkip.people.some(p=>p.alive&&['Mother','Father','Parent','Grandparent','Sibling','Partner','Child'].includes(p.role)&&pending.people.find(q=>q.id===p.id)?.alive===false),'skip stopped without a new family bereavement');
   assert((await page.locator('.toast').innerText()).includes('Time has stopped'));
  }
  assert(pending.pending||pending.status==='finished','next decision must eventually reach choice or ending after bereavement stops');
  if(pending.pending){await page.locator('[data-action="choose"]:not([disabled])').first().click();const chosen=await read();assert(chosen.journal.length>pending.journal.length,'choice must record consequence');}
  await page.locator('[data-action="game-tab"][data-tab="profile"]').click();const saved=await read();await page.reload();await click('resume');await page.locator('[data-action="game-tab"][data-tab="profile"]').click();const reloaded=await read();assert.equal(reloaded.id,saved.id);assert.deepEqual(reloaded.journal,saved.journal,'loading must preserve established history');
  await click('archive');const downloadPromise=page.waitForEvent('download');await click('export');const download=await downloadPromise;await download.saveAs(results+'/browser-backup.json');const backup=JSON.parse(fs.readFileSync(results+'/browser-backup.json','utf8'));assert.equal(backup.current.id,saved.id);
  const fresh=await browser.newContext(),importPage=await fresh.newPage();importPage.on('pageerror',e=>errors.push(e.message));await importPage.goto('http://127.0.0.1:8000');await importPage.locator('[data-action="archive"]').first().click();await importPage.locator('#import-file').setInputFiles(results+'/browser-backup.json');await importPage.waitForFunction(()=>!!localStorage.getItem('other-lives-current-v1'));assert.equal(await importPage.evaluate(()=>JSON.parse(localStorage.getItem('other-lives-current-v1')).id),saved.id);await fresh.close();
  await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('other-lives-current-v1'));s.status='alive';s.pending=null;window.OL.finish(s,'Synthetic browser ending');localStorage.setItem('other-lives-current-v1',JSON.stringify(s));});await page.reload();await click('resume');assert(await page.locator('body').innerText().then(t=>t.includes('Life complete')));await page.screenshot({path:results+'/ending-desktop.png',fullPage:true});
  await click('new-dialog');await click('start');await page.locator('[data-action="dismiss-birth"]').waitFor();await click('dismiss-birth');const next=await read();assert.notEqual(next.id,saved.id,'another life must have a new identity');
  await page.setViewportSize({width:390,height:844});await page.locator('[data-action="game-tab"][data-tab="family"]').click();assert(await page.locator('.story-tabs').isVisible());await page.screenshot({path:results+'/family-mobile.png',fullPage:true});

  // Complete a real seeded life through production UI controls. Only its birth input is fixed.
  await page.evaluate(()=>{const create=window.OL.create;window.OL.create=settings=>{window.OL.create=create;return create({...settings,country:'US',seed:953});};});
  await click('new-dialog');await click('start');await page.locator('[data-action="dismiss-birth"]').waitFor();await click('dismiss-birth');
  const stages=new Set(['birth']);let lifecycleChoices=0,ended=false;
  for(let step=0;step<200;step++){
   let life=await read();if(life.status==='finished'){ended=true;break;}
   for(const [stage,age]of [['childhood',6],['adulthood',18],['old-age',65]]){
    if(life.age>=age&&!stages.has(stage)){stages.add(stage);const checkpoint=life;await page.reload();await click('resume');life=await read();assert.equal(life.id,checkpoint.id);assert.deepEqual(life.journal,checkpoint.journal,'history changed on '+stage+' reload');assert.equal(life.pending,checkpoint.pending,'pending choice changed on '+stage+' reload');}
   }
   if(!life.pending){await click('next-decision');continue;}
   const choices=await page.locator('[data-action="choose"]').evaluateAll(nodes=>nodes.filter(n=>!n.disabled).map(n=>({index:n.dataset.index,label:n.querySelector('strong')?.textContent||n.textContent})));assert(choices.length,'no UI exit '+life.pending);
   let chosen=choices[3%choices.length];
   if(['adult-crossroads','graduate-next-step','career-search-results'].includes(life.pending))chosen=choices[0];
   if(life.pending==='choose-degree-subject')chosen=choices.find(o=>o.label==='Medicine')||choices[0];
   if(life.pending==='university-funding-review')chosen=choices.find(o=>/Confirm/.test(o.label))||choices.find(o=>/year away/.test(o.label))||choices.at(-1);
   await page.locator('[data-action="choose"][data-index="'+chosen.index+'"]').click();lifecycleChoices++;
   if(await page.locator('[data-action="save-pet-name"]').isVisible())await click('save-pet-name');
  }
  assert(ended,'natural UI life did not conclude');assert(stages.has('childhood')&&stages.has('adulthood')&&stages.has('old-age'),'full lifecycle stage coverage');const natural=await read();assert(natural.cause);assert(natural.age>=65);console.log('PASS natural UI lifecycle',JSON.stringify({country:'US',seed:953,age:natural.age,choices:lifecycleChoices,stages:[...stages]}));
  await click('archive');await page.locator('[data-action="record"][data-id="'+natural.id+'"]').waitFor();await page.locator('[data-action="record"][data-id="'+natural.id+'"]').click();assert((await page.locator('body').innerText()).includes(natural.cause),'archive must display actual cause');
  await click('new-dialog');await click('start');await page.locator('[data-action="dismiss-birth"]').waitFor();await click('dismiss-birth');assert.notEqual((await read()).id,natural.id,'new life after natural death');await page.locator('[data-action="game-tab"][data-tab="family"]').click();

  // Current-save reload and actual rendering/export must not execute an estate or other repairs.
  const readFixture=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'GB',seed:61});s.age=19;s.month=0;s.pending=null;s.agenda=[];s.school=false;
   for(const p of s.people){p.age+=19;p.alive=false;p.diedAt=p.age;}
   s.familyCash=10000;s.familyAssets=40000;s.familyDebts=500;s.cash=3000;s.inheritance=0;s.status='paused';
   localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return s;
  });
  await page.reload();await click('resume');
  for(let repeat=0;repeat<2;repeat++)for(const tab of ['profile','family','people','spend','log'])await page.locator('[data-action="game-tab"][data-tab="'+tab+'"]').click();
  await click('archive');const readDownloadPromise=page.waitForEvent('download');await click('export');const readDownload=await readDownloadPromise;await readDownload.saveAs(results+'/browser-read-boundary.json');
  const readExport=JSON.parse(fs.readFileSync(results+'/browser-read-boundary.json','utf8'));assert.deepEqual(readExport.current,readFixture,'reload/render/export changed paused life, RNG, finances, people or journal');
  console.log('PASS actual browser reload/render/export state immutability');

  // Existing housing choices must preserve each secured loan through real UI/save boundaries.
  const propertyFixture=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=40;
   Object.assign(s,{age:40,month:0,school:false,pending:null,agenda:[],cash:2000000});s.flags.flow.schoolLeavingResolved=true;O.routeJob(s,'Office administrator',400000);
   if(!O.planAction(s,'mortgage').ok||!O.startRoute(s,'housing-review').ok)throw Error('Housing fixture setup failed');O.advanceMonth(s);
   localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return s;
  });
  await page.reload();await click('resume');await page.locator('[data-action="choose"]').filter({hasText:'Let the owned home and rent elsewhere'}).click();
  await page.locator('[data-action="game-tab"][data-tab="spend"]').click();
  await page.locator('.budget-group').filter({has:page.locator('[data-action="plan-action"][data-id="move-area"]')}).locator(':scope > summary').click();await page.locator('[data-action="plan-action"][data-id="move-area"]').click();const housing=page.locator('.budget-group').filter({has:page.locator('[data-action="plan-action"][data-id="buy-home"]')});if(await housing.getAttribute('open')===null)await housing.locator(':scope > summary').click();await page.locator('[data-action="plan-action"][data-id="buy-home"]').click();
  const propertySaved=await read();assert.equal(propertySaved.debt,propertyFixture.debt);assert.equal(propertySaved.propertyLedger.properties.length,2);assert(propertySaved.flags.rentalPropertyValue>0);
  assert.equal(propertySaved.propertyLedger.properties.filter(p=>p.mortgage?.balance>0).length,1);assert.equal(propertySaved.propertyLedger.properties.find(p=>p.kind==='rental').mortgage.balance,propertyFixture.debt);
  await page.reload();await click('resume');await page.locator('[data-action="game-tab"][data-tab="spend"]').click();assert.deepEqual((await read()).propertyLedger,propertySaved.propertyLedger);
  console.log('PASS housing UI let/move/buy/save/reload preserves the let dwelling and secured loan');

  const bereavement=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;Object.assign(s,{age:30,month:11,school:false,pending:null,agenda:[],cash:100000});s.flags.flow.schoolLeavingResolved=true;
   localStorage.setItem('other-lives-current-v1',JSON.stringify(s));return s.people.find(p=>['Mother','Father'].includes(p.role)).id;
  });
  await page.reload();await click('resume');await page.evaluate(id=>{const O=window.OL;O.personDeathRisk=(_s,p)=>p.id===id?1:0;O.mortality=()=>false;O.makeAgenda=()=>[{type:'decision',id:'unexpected-expense',month:1,done:false}];},bereavement);
  await click('next-decision');const bereaved=await read();assert.equal(bereaved.age,31);assert.equal(bereaved.month,0);assert.equal(bereaved.pending,null);assert.equal(bereaved.people.find(p=>p.id===bereavement).alive,false);assert((await page.locator('.toast').innerText()).includes('Time has stopped'));
  await page.waitForTimeout(4100);assert.deepEqual(await read(),bereaved,'bereavement stop must remain paused');console.log('PASS next-decision pauses at a real annual family death without adding a choice');

  // Retain the earlier branch's browser assertions and execute them with real asynchronous waits.
  const legacy=await context.newPage();await legacy.goto('http://127.0.0.1:8000/tests/browser.html?autorun=1');
  await legacy.waitForFunction(()=>['passed','failed'].includes(document.querySelector('#results')?.dataset.status),{},{timeout:45000});
  const legacyResult=await legacy.locator('#results').innerText();console.log(legacyResult);
  assert.equal(await legacy.locator('#results').getAttribute('data-status'),'passed',legacyResult);await legacy.close();
  assert.deepEqual(errors,[],'browser errors');console.log('PASS: '+browserName+' birth/choice, tab pause, save/reload, downloaded export/import, ending display, next life, mobile navigation. Natural UI lifecycle exercised; wall-clock life duration and full reference lifecycle remain unverified.');
 }catch(e){await page.screenshot({path:results+'/browser-failure.png',fullPage:true}).catch(()=>{});throw e;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
