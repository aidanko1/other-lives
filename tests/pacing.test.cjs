const test=require('node:test'),assert=require('node:assert/strict'),{loadEngine}=require('./engine.cjs');
function fixture(O){const s=O.create({country:'GB',seed:2218});for(const p of s.people)p.age+=30;Object.assign(s,{age:30,month:11,school:false,pending:null,agenda:[],cash:100000});s.flags.flow.schoolLeavingResolved=true;O.mortality=()=>false;return s;}
test('next-decision stops at a newly bereaved family moment without inventing a choice',()=>{
 const O=loadEngine(),s=fixture(O),parent=s.people.find(p=>['Mother','Father'].includes(p.role)),stops=[];assert(parent);
 O.personDeathRisk=(_s,p)=>p.id===parent.id?1:0;O.makeAgenda=()=>[{type:'decision',id:'unexpected-expense',month:1,done:false}];
 O.skipToDecision(s,p=>stops.push(p.id));assert.equal(s.age,31);assert.equal(s.month,0);assert.equal(s.pending,null);assert.equal(s.status,'alive');assert.equal(parent.alive,false);assert.deepEqual(stops,[parent.id]);
 const history=JSON.stringify(s.journal),loaded=O.migrateLife(s);assert.equal(JSON.stringify(loaded.journal),history);
 O.makeAgenda=()=>[{type:'decision',id:'unexpected-expense',month:1,done:false}];s.agenda=O.makeAgenda(s);O.skipToDecision(s,p=>stops.push(p.id));assert.equal(s.pending,'unexpected-expense');assert.equal(stops.length,1,'an old death must not stop time again');
});
test('ordinary highlights and a distant contact death do not add mandatory pauses',()=>{
 const O=loadEngine(),s=fixture(O),friend=O.createContact(s,'Friend',30),stops=[];
 O.personDeathRisk=(_s,p)=>p.id===friend.id?1:0;O.makeAgenda=()=>[{type:'decision',id:'unexpected-expense',month:1,done:false}];
 O.skipToDecision(s,p=>stops.push(p.id));assert.equal(friend.alive,false);assert.equal(s.pending,'unexpected-expense');assert.equal(stops.length,0);
});
test('playback charges calendar advances, preserves every story and matches manual simulation',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218});s.agenda=O.pickStories(s,5).map((item,i)=>({...item,type:'story',month:i*2+1,done:false}));assert.equal(s.agenda.length,5);
 const manual=JSON.parse(JSON.stringify(s));let months=0,deliveries=0,calls=0;
 while(months<12&&calls++<30){const result=O.playbackStep(s);O.advanceMonth(manual);assert.equal(JSON.stringify(s),JSON.stringify(manual),'playback changed simulation transitions or RNG');if(result.entry){assert.equal(result.months,0);deliveries++;}months+=result.months;}
 assert.equal(months,12);assert.equal(s.age,1);assert.equal(s.month,0);assert.equal(deliveries,5);assert.equal(calls,17);
});
test('playback preserves paused, finished and pending records without spending calendar time',()=>{
 const O=loadEngine();for(const mode of ['paused','finished','pending']){const s=O.create({country:'GB',seed:2218});if(mode==='pending')s.pending='school-entry';else s.status=mode;const before=JSON.stringify(s),result=O.playbackStep(s);assert.equal(result.months,0);assert.equal(JSON.stringify(s),before);}
});
test('birth duration is an approximate 30/60/90 minute target for every supported origin',()=>{
 const O=loadEngine();for(const country of O.COUNTRIES){
  const s=O.create({country:country.code,seed:2218});assert.equal(s.playback.targetMinutes,60);assert.equal(s.playback.referenceYears,country.life);
  assert.equal(s.snapshots[0].data.playback.targetMinutes,60,'birth replay must retain pacing');
  for(const minutes of [30,60,90]){const p=O.birthPlayback(country,minutes),monthMs=O.monthDurationMs({playback:p});assert.equal(monthMs,minutes*60000/(country.life*12));assert(Math.abs(monthMs*12*p.referenceYears-minutes*60000)<1e-6,'target must agree within one nanosecond of floating-point rounding');}
 }
 assert.throws(()=>O.birthPlayback({life:80},45),/30, 60 or 90/);
 assert.throws(()=>O.birthPlayback({life:0}),/Invalid birth/);
 assert.throws(()=>O.create({country:'GB',durationMinutes:'30'}),/30, 60 or 90/);
});
test('playback survives save and moving country without rewriting history or randomness',()=>{
 const O=loadEngine(),s=O.create({country:'GB',seed:2218,durationMinutes:30}),rate=O.monthDurationMs(s),before=JSON.stringify(s);
 assert.equal(JSON.stringify(O.migrateLife(s)),before);assert.equal(JSON.stringify(s),before);
 s.country=O.COUNTRIES.find(c=>c.code==='IN');assert.equal(O.monthDurationMs(s),rate,'migration must not rescale an established clock');
 const loaded=O.migrateLife(JSON.parse(JSON.stringify(s)));assert.equal(O.monthDurationMs(loaded),rate);
 const wire=JSON.stringify(loaded);for(let i=0;i<5;i++)O.monthDurationMs(loaded);assert.equal(JSON.stringify(loaded),wire);
});
test('existing and malformed playback saves keep the legacy rate without invented metadata',()=>{
 const O=loadEngine();for(const playback of [undefined,null,{version:2,targetMinutes:60,referenceYears:80},{version:1,targetMinutes:45,referenceYears:80},{version:1,targetMinutes:30,referenceYears:0},{version:1,targetMinutes:30,referenceYears:Infinity}]){
  const s=O.create({country:'GB',seed:2218});delete s.playback;if(playback!==undefined)s.playback=playback;const before=JSON.stringify(s);
  assert.equal(O.monthDurationMs(s),3750);assert.equal(JSON.stringify(s),before);assert.equal(JSON.stringify(O.migrateLife(s)),before);
 }
});
test('duration selection cannot change a seeded complete life or its decisions',()=>{
 const records=[];for(const durationMinutes of [30,60,90]){
  const O=loadEngine(),s=O.create({country:'GB',seed:2218,durationMinutes});let calls=0;
  while(s.status==='alive'&&calls++<3000){if(s.pending){const e=O.EVENTS.find(e=>e.id===s.pending);assert(O.applyChoice(s,e.options(s).findIndex(o=>!o.disabled)));}else O.advanceMonth(s);}
  assert.equal(s.status,'finished');records.push(JSON.stringify(s,(key,value)=>['playback','durationMinutes'].includes(key)?undefined:value));
 }
 assert.equal(records[0],records[1]);assert.equal(records[1],records[2]);
});
