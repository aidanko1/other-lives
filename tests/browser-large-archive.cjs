const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async function verifyLargeArchive(browser){
 const context=await browser.newContext({acceptDownloads:true}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8000');
  const fixture=await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'US',seed:951,snapshotPolicy:'none'});let actions=0;
   while(s.status==='alive'&&actions++<3000){if(s.pending){const v=O.decisionView(s),i=v.options.findIndex(o=>!o.disabled);if(i<0||!O.applyChoice(s,i,v.token))throw Error('Archive fixture choice failed');}else O.advanceMonth(s);O.assertConsistent(s);if(O.lifeIssues(s).length)throw Error('Invalid archive fixture');}
   if(s.status!=='finished')throw Error('Archive fixture did not finish');
   return {format:'other-lives-backup-v1',lives:Array.from({length:100},(_,i)=>({...JSON.parse(JSON.stringify(s)),id:'archive-stress-'+i}))};
  });
  // These are100 storage copies of one complete fixture, not100 independent simulated lives.
  const bytes=Buffer.from(JSON.stringify(fixture));await page.locator('[data-action="archive"]').first().click();await page.locator('#import-file').setInputFiles({name:'archive-stress.json',mimeType:'application/json',buffer:bytes});await page.locator('[data-action="record"]').last().waitFor({timeout:30000});assert.equal(await page.locator('[data-action="record"]').count(),100);
  await page.reload();await page.locator('[data-action="archive"]').first().click();await page.locator('[data-action="record"][data-id="archive-stress-99"]').waitFor({timeout:30000});assert.equal(await page.locator('[data-action="record"]').count(),100,'archive reload lost records');
  const pending=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const download=await pending,path='test-results/large-archive-'+browser.browserType().name()+'.json';await download.saveAs(path);const backup=JSON.parse(fs.readFileSync(path,'utf8'));assert.equal(backup.lives.length,100);for(const record of backup.lives)assert.deepEqual(record,fixture.lives.find(r=>r.id===record.id),'archive changed established history');
  await page.locator('[data-action="record"][data-id="archive-stress-50"]').click();assert((await page.locator('body').innerText()).includes(fixture.lives[50].cause));await page.locator('[data-action="delete-prompt"]').click();await page.locator('[data-action="delete"]').click();await page.waitForFunction(()=>document.querySelectorAll('[data-action="record"]').length===99);assert.equal(await page.locator('[data-action="record"]').count(),99);assert.deepEqual(errors,[]);console.log('PASS100-record archive import/render/reload/exact export/detail/delete',JSON.stringify({bytes:bytes.length,age:fixture.lives[0].age,journal:fixture.lives[0].journal.length}));
 }finally{await context.close();}
};
