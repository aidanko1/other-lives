/* CI only: drive the installed Chrome with its native protocol and real time.
 * Local interactive QA uses the supported browser tool, not this adapter. */
const fs=require('node:fs');
const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 let page;
 for(let i=0;i<80;i++){try{const r=await fetch('http://127.0.0.1:9222/json/new?http://127.0.0.1:4173/tests/browser.html?autorun=1',{method:'PUT'});if(r.ok){page=await r.json();break;}}catch{}await delay(250);}
 if(!page)throw Error('Chrome did not become ready');
 const ws=new WebSocket(page.webSocketDebuggerUrl),pending=new Map();let next=0;
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout '+method));},10000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result?.value;
 try{
  let status;
  for(let i=0;i<240;i++){status=await evaluate("document.querySelector('#results')?.dataset.status");if(status==='passed'||status==='failed')break;await delay(250);}
  const html=await evaluate('document.documentElement.outerHTML');fs.mkdirSync('tests/reports',{recursive:true});fs.writeFileSync('tests/reports/browser.html',html||'No document');
  console.log(await evaluate("document.querySelector('#results')?.textContent"));
  if(status!=='passed')throw Error('Browser runner: '+status);
 }finally{ws.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
