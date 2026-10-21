// Read-only reference UX observation. Never import its source, artwork or prose into the game.
const fs=require('node:fs'),{chromium}=require('playwright');
(async()=>{
 fs.mkdirSync('test-results',{recursive:true});const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1280,height:900}}),report={url:'https://1in8b.life/en/',observedAt:new Date().toISOString(),steps:[],unknown:[]};
 const visibleControls=()=>page.locator('button, [role="button"], select').evaluateAll(nodes=>nodes.filter(n=>n.getBoundingClientRect().width&&n.getBoundingClientRect().height).map(n=>({tag:n.tagName,id:n.id,label:(n.getAttribute('aria-label')||n.textContent||'').trim().slice(0,80)})).slice(0,50));
 async function clickText(re){const nodes=page.locator('button, [role="button"], a');for(let i=0;i<await nodes.count();i++){const n=nodes.nth(i);if(await n.isVisible()&&re.test((await n.innerText()).trim())){await n.click();return true;}}return false;}
 try{
  await page.goto(report.url,{waitUntil:'domcontentloaded',timeout:45000});report.title=await page.title();report.steps.push({stage:'setup',controls:await visibleControls()});await page.screenshot({path:'test-results/reference-setup.png',fullPage:true});
  if(!await clickText(/^Be born$/i))throw Error('Birth control not found');
  await page.getByRole('button',{name:/Begin this life/i}).waitFor({state:'visible',timeout:20000});report.steps.push({stage:'birth registration',controls:await visibleControls()});await page.screenshot({path:'test-results/reference-birth.png',fullPage:true});
  if(!await clickText(/^Begin this life/i))throw Error('Begin-life control not found');
  await page.waitForTimeout(1200);await clickText(/^.*Pause$/i);report.steps.push({stage:'life',controls:await visibleControls()});await page.screenshot({path:'test-results/reference-life.png',fullPage:true});
  if(await clickText(/^Family and life$/i)){report.steps.push({stage:'family inspection',controls:await visibleControls()});await page.screenshot({path:'test-results/reference-family.png',fullPage:true});await page.keyboard.press('Escape');await clickText(/^(Close|Done|×|✕)$/);}
  if(await clickText(/^Spend.*invest/i)){report.steps.push({stage:'spending inspection',controls:await visibleControls()});await page.screenshot({path:'test-results/reference-spend.png',fullPage:true});await page.keyboard.press('Escape');await clickText(/^(Close|Done|×|✕)$/);}
  if(await clickText(/Next decision|Next »/i)){await page.waitForTimeout(1000);report.steps.push({stage:'next decision',controls:await visibleControls()});await page.screenshot({path:'test-results/reference-decision.png',fullPage:true});}
  else report.unknown.push('Next-decision interaction could not be selected reliably');
  report.unknown.push('No complete reference life or ending replayed; frequencies, causal depth and subjective pacing not verified');
  console.log(JSON.stringify(report,null,2));
 }catch(e){report.error=e.message;console.error(JSON.stringify(report,null,2));process.exitCode=1;}finally{fs.writeFileSync('test-results/reference-observation.json',JSON.stringify(report,null,2));await browser.close();}
})();
