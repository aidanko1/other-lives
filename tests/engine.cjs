const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base=path.join(__dirname,'..'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');
function loadEngine({storage,clock=0,skipScripts=[]}={}) {
 const window={OL:{},matchMedia:()=>({matches:false,addEventListener(){}}),dispatchEvent(){}};
 class FixedDate extends Date {constructor(...args){super(...(args.length?args:[clock]));}static now(){return clock;}}
 const math=Object.create(Math); let idSeed=1; math.random=()=>((idSeed=Math.imul(idSeed,1664525)+1013904223>>>0)/4294967296);
 const ctx=vm.createContext({window,OL:window.OL,console,Intl,Date:FixedDate,Math:math,JSON,Set,Map,WeakMap,Event:class{},localStorage:storage||{getItem(){return null},setItem(){}},document:{documentElement:{dataset:{}},querySelector:()=>null},setTimeout,clearTimeout});
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  const src=/src="\.\/(.*?)"/.exec(m[1]),name=src?.[1].split('?')[0];
  if(name==='ui/app.js'||skipScripts.includes(name))continue;
  const code=src?fs.readFileSync(path.join(base,name),'utf8'):m[2];
  if(code.includes("'serviceWorker' in navigator")||code.includes('document.documentElement.dataset.theme=matchMedia'))continue;
  vm.runInContext(code,ctx,{filename:name||'inline'});
 }
 return window.OL;
}
module.exports=loadEngine();module.exports.loadEngine=loadEngine;
