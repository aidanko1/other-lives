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
