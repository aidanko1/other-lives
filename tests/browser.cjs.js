/* Browser E2E without a simulated DOM. Run tests/browser.html through the normal preview. */
'use strict';
const output=document.querySelector('#results'),frame=document.querySelector('#game');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function waitFor(fn,label){for(let i=0;i<100;i++){const result=fn();if(result)return result;await pause(50);}throw Error('Timed out: '+label);}
function check(condition,label){if(!condition)throw Error(label);output.textContent+='\nPASS '+label;}
async function click(selector){const el=await waitFor(()=>frame.contentDocument.querySelector(selector),selector);if(el.disabled)throw Error('Disabled: '+selector);el.click();await pause(100);}
async function closeFrame(){await new Promise(resolve=>{frame.onload=resolve;frame.src='about:blank';});frame.onload=null;}
async function load(){await new Promise(resolve=>{frame.onload=resolve;frame.src='../index.html?qa='+Date.now();});frame.onload=null;await waitFor(()=>frame.contentDocument?.querySelector('#app .brand'),'app loaded');}
document.querySelector('#run').onclick=async()=>{
 output.textContent='Running…';output.dataset.status='running';document.querySelector('#run').disabled=true;
 const currentKey='other-lives-current-v1',original=localStorage.getItem(currentKey),created=new Set();let db;
 const install=async s=>{await closeFrame();localStorage.setItem(currentKey,JSON.stringify(s));await load();};
 try{
  const html=await(await fetch('../index.html')).text();const parsed=new DOMParser().parseFromString(html,'text/html');
  if(!window.OL)for(const script of parsed.querySelectorAll('script[src]')){if(script.getAttribute('src').includes('ui/app.js'))continue;await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='../'+script.getAttribute('src').replace(/^\.\//,'');s.onload=resolve;s.onerror=reject;document.head.append(s);});}
  const O=window.OL,s=O.create({country:'GB',seed:777,quintile:5});
  for(const p of s.people)p.age+=25;
  Object.assign(s,{id:'qa-'+Date.now(),name:'QA Test Person',first:'QA',age:25,month:0,school:false,education:O.EDU[4],cash:100000,debt:0,pending:'unexpected-expense',agenda:[]});s.flags.flow.schoolLeavingResolved=true;s.people[0].close=95.50000000001;O.ensureClarity(s);created.add(s.id);
  await install(s);await click('[data-action="resume"]');
  check(frame.contentDocument.querySelectorAll('.stats-grid .meter').length===4,'Four factor bars render');
  check(!frame.contentDocument.body.textContent.includes('95.50000000001')&&frame.contentDocument.body.textContent.includes('96%'),'Relationship display does not leak floating-point precision');
  await click('[data-action="choose"][data-index="0"]');
  const paid=JSON.parse(localStorage.getItem(currentKey));check(paid.cash<s.cash&&paid.debt===0,'Decision charges the quoted bill and saves');check(paid.used['unexpected-expense']===25,'Decision cooldown is saved');
  await click('[data-action="game-tab"][data-tab="profile"]');check(!!frame.contentDocument.querySelector('.passport'),'Passport navigation');
  await click('[data-action="play-pause"]');check(!frame.contentDocument.querySelector('.passport'),'Play returns to the Life Log');await click('[data-action="play-pause"]');
  await click('[data-action="game-tab"][data-tab="spend"]');check(!!frame.contentDocument.querySelector('.spend-panel, .budget-group, .route-planner'),'Spend navigation');
  check(frame.contentDocument.documentElement.scrollWidth<=frame.contentDocument.documentElement.clientWidth+2,'No horizontal overflow at 390px');
  await load();await click('[data-action="resume"]');check(JSON.parse(localStorage.getItem(currentKey)).id===s.id,'Current life reloads');
  await click('[data-action="new-dialog"]');await click('[data-action="start"]');await pause(1550);await click('[data-action="dismiss-birth"]');
  const next=JSON.parse(localStorage.getItem(currentKey));created.add(next.id);
  await click('[data-action="archive"]');await click('[data-action="record"][data-id="'+s.id+'"]');
  check(!!frame.contentDocument.querySelector('[data-action="delete-prompt"]'),'Paused archived life has deletion control');
  let exported;const url=frame.contentWindow.URL;const oldCreate=url.createObjectURL;url.createObjectURL=blob=>{exported=blob;return oldCreate.call(url,blob);};
  await click('[data-action="export-one"]');check(!!exported,'Individual export creates a JSON download');const data=JSON.parse(await exported.text());check(data.life.id===s.id&&data.format==='other-lives-life-v1','Export contains exactly the selected life');
  await click('[data-action="delete-prompt"]');await click('[data-action="delete"]');check(!frame.contentDocument.querySelector('[data-action="record"][data-id="'+s.id+'"]'),'Confirmed deletion removes paused life');
  const input=frame.contentDocument.querySelector('#import-file'),transfer=new frame.contentWindow.DataTransfer();transfer.items.add(new frame.contentWindow.File([JSON.stringify(data)],'qa-life.json',{type:'application/json'}));input.files=transfer.files;input.dispatchEvent(new frame.contentWindow.Event('change',{bubbles:true}));
  await waitFor(()=>frame.contentDocument.querySelector('[data-action="record"][data-id="'+s.id+'"]'),'imported archive card');check(true,'Individual JSON import restores the archived life');
  await click('[data-action="resume-record"][data-id="'+s.id+'"]');check(JSON.parse(localStorage.getItem(currentKey)).id===s.id,'Paused archive resumes the exact selected life');
  const postgraduate=O.create({country:'GB',seed:778,quintile:5});
  for(const p of postgraduate.people)p.age+=25;
  Object.assign(postgraduate,{id:'qa-master-'+Date.now(),first:'Postgraduate',name:'Postgraduate QA',age:25,month:0,school:false,cash:0,debt:0,education:O.EDU[4],knowledge:85,pending:null,agenda:[],familyCash:200000,familyAssets:500000});postgraduate.flags.flow.schoolLeavingResolved=true;O.ensureClarity(postgraduate);O.startRoute(postgraduate,'masters');postgraduate.routes.active.masters.status='decision';postgraduate.pending='life-route-decision';created.add(postgraduate.id);await install(postgraduate);
 check(JSON.parse(localStorage.getItem(currentKey)).id===postgraduate.id,'Postgraduate fixture survives navigation');await click('[data-action="resume"]');
  const familyChoice=[...frame.contentDocument.querySelectorAll('[data-action="choose"]')].find(el=>/full-time.*family support/.test(el.textContent));check(!!familyChoice&&!familyChoice.disabled,'Wealthy postgraduate family-funding choice is usable: '+[...frame.contentDocument.querySelectorAll('[data-action="choose"] strong')].map(el=>el.textContent).join(' / '));familyChoice.click();await pause(100);
  const enrolled=JSON.parse(localStorage.getItem(currentKey));check(enrolled.routes.active.masters.funding.family>0&&enrolled.debt===0,'Postgraduate choice commits a parental gift without debt');
  const child=O.create({country:'CN',seed:779,quintile:3});for(const p of child.people)p.age+=6;Object.assign(child,{id:'qa-school-'+Date.now(),age:6,month:0,school:false,pending:'school-entry',agenda:[]});created.add(child.id);await install(child);await click('[data-action="resume"]');
  check(/Starting school: a family decision/.test(frame.contentDocument.body.textContent),'School-entry decision appears before attendance');await click('[data-action="choose"][data-index="1"]');await click('[data-action="game-tab"][data-tab="profile"]');check(/Not currently enrolled/.test(frame.contentDocument.body.textContent),'Home learning does not become primary-school enrolment');
  output.dataset.status='cleaning';output.textContent+='\nALL BROWSER CHECKS PASSED';
 }catch(error){output.dataset.status='failed';output.textContent+='\nFAIL '+error.stack+'\nSaved fixture: '+JSON.stringify((()=>{const x=JSON.parse(localStorage.getItem(currentKey));return {id:x?.id,age:x?.age,pending:x?.pending,routes:x?.routes?.active};})())+'\nHeading: '+frame.contentDocument?.querySelector('h1')?.textContent+'\nApp notification: '+frame.contentDocument?.querySelector('.toast')?.textContent+'\nAvailable actions: '+[...frame.contentDocument?.querySelectorAll('[data-action]')||[]].map(el=>el.dataset.action).join(', ');}
 finally{
  await closeFrame();
  if(original===null)localStorage.removeItem(currentKey);else localStorage.setItem(currentKey,original);
  await new Promise(resolve=>{const req=indexedDB.open('other-lives-library',1);req.onsuccess=()=>{db=req.result;if(!db.objectStoreNames.contains('lives'))return resolve();const tx=db.transaction('lives','readwrite');for(const id of created)tx.objectStore('lives').delete(id);tx.oncomplete=resolve;tx.onerror=resolve;};req.onerror=resolve;});db?.close();
  if(output.dataset.status==='cleaning')output.dataset.status='passed';
  document.querySelector('#run').disabled=false;
 }
};

if(new URLSearchParams(location.search).has('autorun'))document.querySelector('#run').click();
