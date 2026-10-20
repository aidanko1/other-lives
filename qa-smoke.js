const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const tags=[...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
const scope={console:{log(){},info(){},warn(){},error:console.error},Math,JSON,Date,Intl,URL,Map,Set,Promise,setTimeout:()=>0,clearTimeout:()=>{},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{}},location:{protocol:'file:',hostname:'localhost'},addEventListener:()=>{}};scope.window=scope;scope.globalThis=scope;
vm.createContext(scope);
for(let i=0;i<tags.length;i++){
 const src=tags[i][1].match(/src="([^"]+)"/)?.[1],code=src?fs.readFileSync(__dirname+'/'+src,'utf8'):tags[i][2];
 if(code.includes('document.querySelector(s), root')||code.includes("serviceWorker' in navigator"))continue;
 vm.runInContext(code,scope,{filename:src||'inline'+i,timeout:10000});
}
const O=scope.OL,profiles=O.EVIDENCE_DEPTH?.countries;
assert(profiles,'missing researched profiles');assert.strictEqual(O.COUNTRIES.length,12);
let checked=0;
for(const code of Object.keys(profiles)){
 const s=O.create({country:code,seed:4133+checked,year:2026,draw:'equal'});
 assert.strictEqual(s.country.code,code);assert.deepStrictEqual(Array.from(O.spendOffers(s)),[]);
 let q=1;for(let a=1;a<=5;a++)q*=1-O.hazardAt(s.country,a);
 if(profiles[code].q5!=null)assert(Math.abs(1000*(1-q)-profiles[code].q5)<1e-7,'child mortality '+code);
 s.age=22;s.status='alive';s.school=true;s.education=O.EDU[2];
 s.flags.auditLearning={route:'academic',phase:'completed',passed:true};s.cash=Math.max(15000,s.cash);
 const ev=O.EVENTS.find(x=>x.id==='evidence-next-education-'+code);
 assert(ev&&ev.when(s),'missing further study route '+code);
 const before=s.education;const opt=ev.options(s);assert(!opt[0].disabled);
 opt[0].apply(s);assert.strictEqual(s.education,before);assert.strictEqual(s.flags.auditLearning.phase,'applied');
 const t=s.flags.auditLearning,original=O.chance;O.chance=()=>true;
 s.age=23;O.passive(s);assert.strictEqual(t.phase,'enrolled');
 for(let age=24;age<=t.finishAt;age++){s.age=age;O.passive(s)}
 assert.strictEqual(O.educationNumber(s.education),4);O.chance=original;
 checked++;
}
console.log('PASS: '+checked+' country profiles, child-spend gates, U5 reference anchors and delayed tertiary degrees.');
