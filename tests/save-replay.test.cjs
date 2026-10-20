const assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function advance(O,s,n){for(let i=0;i<n&&s.status==='alive';i++){if(s.pending){const e=O.EVENTS.find(e=>e.id===s.pending);assert(O.applyChoice(s,e.options(s).findIndex(o=>!o.disabled)));}else O.advanceMonth(s);}return s;}
function comparable(s){return JSON.parse(JSON.stringify(s,(k,v)=>k==='snapshots'?undefined:v));}
for(const country of ['GB','IN','CN','NG','KE','IT','US','BR']){
 const O=loadEngine(),a=O.create({country,seed:24601,quintile:4});advance(O,a,240);
 const wire=JSON.stringify({format:'other-lives-life-v1',life:a}),raw=JSON.parse(wire).life,b=O.migrateLife(raw);
 assert.equal(JSON.stringify(raw),JSON.stringify(a),'Import input changed');
 advance(O,a,180);advance(O,b,180);assert.deepEqual(comparable(a),comparable(b),'Reload diverged from uninterrupted life: '+country);
 const N=loadEngine(),c=N.create({country,seed:24601,quintile:4});advance(N,c,420);assert.deepEqual(comparable(a),comparable(c),'Seed replay diverged: '+country);
 assert(a.snapshots.length>0,'Snapshots omitted');
 const snapshot=a.snapshots.find(x=>x.data.status==='alive');const original=JSON.stringify(snapshot);const fork=O.migrateLife(snapshot.data);fork.snapshots=[];advance(O,fork,24);assert.equal(JSON.stringify(snapshot),original,'Fork changed source snapshot');
}
console.log('PASS eight seeded save/reload, export JSON and milestone replay round trips with real snapshots');
