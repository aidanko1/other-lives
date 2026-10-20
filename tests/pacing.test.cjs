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
