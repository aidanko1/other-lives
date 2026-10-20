const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base=path.join(__dirname,'..'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const window={OL:{},matchMedia:()=>({matches:false,addEventListener(){}}),dispatchEvent(){}};
const ctx=vm.createContext({window,OL:window.OL,console,Intl,Date,Math,JSON,Set,Map,WeakMap,Event:class{},localStorage:{getItem(){return null},setItem(){}},document:{documentElement:{dataset:{}},querySelector:()=>null},setTimeout,clearTimeout});
for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){const src=/src="\.\/(.*?)"/.exec(m[1]),code=src?fs.readFileSync(path.join(base,src[1]),'utf8'):m[2];if(code.includes('const $=s=>document.querySelector')||code.includes("'serviceWorker' in navigator")||code.includes('document.documentElement.dataset.theme=matchMedia'))continue;vm.runInContext(code,ctx,{filename:src?.[1]||'inline'});}
module.exports=window.OL;
