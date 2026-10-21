const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
const clone=s=>JSON.parse(JSON.stringify(s));
function comparable(s){const c=clone(s);delete c.parallelWorld;delete c.parallelWorldRef;delete c.settings.comparisons;for(const snap of c.snapshots)snap.data=comparable(snap.data);return c;}
function finish(O,s){let steps=0;while(s.status==='alive'&&steps++<3000){if(s.pending){const v=O.decisionView(s);assert(O.applyChoice(s,v.options.findIndex(o=>!o.disabled),v.token));}else O.advanceMonth(s);}assert.equal(s.status,'finished');}
test('four validated comparison lives are seeded independently and never alter the player',()=>{
 const A=loadEngine(),B=loadEngine(),plain=A.create({country:'GB',seed:2218}),world=B.create({country:'GB',seed:2218,comparisons:true});
 assert.equal(world.parallelWorld.lives.length,4);assert.equal(new Set(world.parallelWorld.lives.map(p=>p.seed)).size,4);
 for(const p of world.parallelWorld.lives){assert(p.validation.states>0);assert.equal(p.timeline.at(-1).status,'finished');assert.equal(p.death.cause,p.timeline.at(-1).cause);assert.equal(p.validation.states,p.validation.actions+1);}
 assert.equal(JSON.stringify(comparable(world)),JSON.stringify(comparable(plain)));
 finish(A,plain);finish(B,world);assert.equal(JSON.stringify(comparable(world)),JSON.stringify(comparable(plain)));
});
test('comparison view is read-only, current-date bound, and never announces a future death',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218,comparisons:true}),saved=JSON.stringify(s);
 assert(O.parallelView(s).every(p=>p.status==='alive'&&p.age===0&&p.cause===null));assert.equal(JSON.stringify(s),saved);
 const peer=s.parallelWorld.lives[0];s.age=peer.death.age-1;s.month=11;assert.equal(O.parallelView(s)[0].status,'alive');s.age=peer.death.age;s.month=peer.death.month;assert.equal(O.parallelView(s)[0].status,'finished');assert.equal(O.parallelView(s)[0].age,peer.death.age);
 const before=JSON.stringify(s);for(let i=0;i<3;i++)O.parallelView(s);assert.equal(JSON.stringify(s),before);
 const malformed={...s,parallelWorld:{version:1,lives:[null,{name:'Preserved',country:{name:'Unknown'},timeline:null}]}},wire=JSON.stringify(malformed);assert.equal(O.parallelView(malformed).length,0);assert.equal(JSON.stringify(malformed),wire);
});
test('saving and replay preserve a single compact comparison history without regenerating lives',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218,comparisons:true}),wire=JSON.stringify(s),loaded=O.migrateLife(s);
 assert.equal(JSON.stringify(loaded),wire);assert.equal(JSON.stringify(s),wire);assert.equal(loaded.snapshots[0].data.parallelWorld,undefined);assert.equal(loaded.snapshots[0].data.parallelWorldRef.id,s.parallelWorld.id);
 const replay=O.replayState(loaded,loaded.snapshots[0]);assert.deepEqual(replay.parallelWorld,loaded.parallelWorld);replay.parallelWorld.lives[0].name='Changed in fork';assert.notEqual(replay.parallelWorld.lives[0].name,loaded.parallelWorld.lives[0].name);
 assert.throws(()=>O.replayState(loaded,{data:loaded.snapshots[0].data}),/does not belong/);
 const absent=clone(loaded);delete absent.parallelWorld;assert.throws(()=>O.replayState(absent,absent.snapshots[0]),/history is missing/);
 const old=O.create({country:'GB',seed:0});assert.equal(O.parallelView(old).length,0);assert.equal(JSON.stringify(O.migrateLife(old)),JSON.stringify(old));assert.deepEqual(O.replayState(old,old.snapshots[0]),O.migrateLife(old.snapshots[0].data));
 assert(JSON.stringify(loaded).length<50000,'comparison history inflated a newborn save');
});
