const assert=require('node:assert/strict'),fs=require('node:fs'),{randomUUID,createHash}=require('node:crypto'),{isDeepStrictEqual}=require('node:util');
module.exports=async function verifyLargeArchive(browser){
 const context=await browser.newContext({acceptDownloads:true}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const token=browser.browserType().name()+'-'+randomUUID(),input='test-results/large-archive-input-'+token+'.json',output='test-results/large-archive-'+token+'.json';
 try{
  await page.goto('http://127.0.0.1:8000');
  // Transfer one serialized normal save, not100 deep object graphs through the automation protocol.
  const template=JSON.parse(await page.evaluate(()=>{
   const O=window.OL,s=O.create({country:'US',seed:955,comparisons:true});let actions=0;
   while(s.status==='alive'&&actions++<3000){if(s.pending){const v=O.decisionView(s),i=v.options.findIndex(o=>!o.disabled);if(i<0||!O.applyChoice(s,i,v.token))throw Error('Archive fixture choice failed');}else O.advanceMonth(s);O.assertConsistent(s);if(O.lifeIssues(s).length)throw Error('Invalid archive fixture');}
   if(s.status!=='finished')throw Error('Archive fixture did not finish');if(s.snapshots.length!==24||s.parallelWorld?.lives?.length!==4)throw Error('Archive fixture lacks normal replay/comparison data');return JSON.stringify(s);
  }));
  // These are100 storage copies of one complete fixture, not100 independent simulated lives.
  fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync(input,'{"format":"other-lives-backup-v1","lives":[');for(let i=0;i<100;i++)fs.appendFileSync(input,(i?',':'')+JSON.stringify({...template,id:'archive-stress-'+i}));fs.appendFileSync(input,']}');const bytes=fs.statSync(input).size;console.log('Archive stress input',JSON.stringify({bytes,records:100,snapshots:template.snapshots.length,companions:4}));
  await page.locator('[data-action="archive"]').first().click();await page.locator('#import-file').setInputFiles(input);await page.locator('[data-action="record"]').last().waitFor({timeout:120000});assert.equal(await page.locator('[data-action="record"]').count(),100);
  await page.reload();await page.locator('[data-action="archive"]').first().click();await page.locator('[data-action="record"][data-id="archive-stress-99"]').waitFor({timeout:120000});assert.equal(await page.locator('[data-action="record"]').count(),100,'archive reload lost records');
  const pending=page.waitForEvent('download',{timeout:120000});await page.locator('[data-action="export"]').click();const download=await pending;await download.saveAs(output);const raw=fs.readFileSync(output),digest=createHash('sha256').update(raw).digest('hex');let backup=JSON.parse(raw);assert.equal(backup.lives.length,100);assert.equal(new Set(backup.lives.map(r=>r.id)).size,100);for(const record of backup.lives){assert(/^archive-stress-\d+$/.test(record.id));const n=Number(record.id.slice(15));assert(n>=0&&n<100);assert(isDeepStrictEqual(record,{...template,id:record.id}),'archive changed established history: '+record.id);}backup=null;
  await page.locator('[data-action="record"][data-id="archive-stress-50"]').click();assert((await page.locator('body').innerText()).includes(template.cause));await page.locator('[data-action="delete-prompt"]').click();await page.locator('[data-action="delete"]').click();await page.waitForFunction(()=>document.querySelectorAll('[data-action="record"]').length===99);assert.equal(await page.locator('[data-action="record"]').count(),99);assert.deepEqual(errors,[]);
  const summary={bytes,records:100,validated:100,age:template.age,journal:template.journal.length,snapshots:template.snapshots.length,companions:4,exportSha256:digest,deleted:'archive-stress-50'};fs.writeFileSync('test-results/large-archive-summary-'+browser.browserType().name()+'.json',JSON.stringify(summary,null,2));fs.unlinkSync(input);fs.unlinkSync(output);console.log('PASS100 normal-save archive import/render/reload/exact export/detail/delete',JSON.stringify(summary));
 }finally{await context.close();}
};
