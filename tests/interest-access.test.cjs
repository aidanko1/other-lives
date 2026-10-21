const {test}=require('node:test'),assert=require('node:assert/strict'),O=require('./engine.cjs');
test('every specialised-career interest is reachable through four pure stable childhood choices',()=>{
 const event=O.EVENTS.find(e=>e.id==='discover-real-interest'),seen=new Set();
 for(let seed=0;seed<129;seed++){const s=O.create({seed,country:O.COUNTRIES[seed].code,snapshotPolicy:'none'});s.age=7;const before=JSON.stringify(s),options=event.options(s);assert.equal(options.length,4);assert.equal(new Set(options.map(o=>o.label)).size,4);assert.equal(JSON.stringify(s),before);assert.deepEqual(event.options(s).map(o=>o.label),options.map(o=>o.label));
  for(const option of options){const copy=JSON.parse(before);option.apply(copy);assert(copy.interests.includes(option.label));assert.equal(copy.experience.hobbies[option.label].years,.25);seen.add(option.label);}
 }
 for(const interest of ['Drawing','Football','Music','History','Programming','Cooking','Dance','Acting','Gaming','Chess'])assert(seen.has(interest),'unreachable interest '+interest);
});
test('existing interests are not repeated and adult optional introductions include the four missing interests',()=>{
 const s=O.create({seed:42,country:'GB',snapshotPolicy:'none'});s.age=20;s.cash=100000;s.interests=['Dance','Acting','Gaming','Chess'];const event=O.EVENTS.find(e=>e.id==='discover-real-interest');assert(event.options(s).every(o=>!s.interests.includes(o.label)));
 s.interests=[];for(const name of ['Dance','Acting','Gaming','Chess'])assert(O.planOffers(s).some(o=>o.id==='interest-'+name),'missing optional introduction '+name);
});
