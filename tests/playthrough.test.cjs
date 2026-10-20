const O=require('./engine.cjs');O.snapshot=()=>{};
let months=0,decisions=0;const outcomes=[];
for(const code of (process.argv.includes('--quick')?['GB','IN','IT']:['GB','IN','CN','NG','KE','IT','US','BR']))for(let seed=1;seed<=(process.argv.includes('--quick')?2:3);seed++){
 const s=O.create({country:code,seed:seed*317});let same=0,last='';
 try{for(let step=0;step<2200&&s.status==='alive';step++){
 if(s.pending){const e=O.EVENTS.find(e=>e.id===s.pending);if(!e)throw Error('unknown decision '+s.pending);const opts=e.options(s),usable=opts.map((o,i)=>({o,i})).filter(x=>!x.o.disabled);if(!usable.length)throw Error('no enabled choice '+s.pending);
 let selected=usable[seed%usable.length];if(s.pending==='adult-crossroads')selected=usable[0];if(s.pending==='choose-degree-subject')selected=usable.find(x=>x.o.label==='Medicine')||usable[0];if(s.pending==='graduate-next-step')selected=usable[0];if(s.pending==='career-search-results')selected=usable[0];if(s.pending==='university-funding-review')selected=usable.find(x=>/Confirm/.test(x.o.label))||usable.find(x=>/year away/.test(x.o.label))||usable.at(-1);
 if(!O.applyChoice(s,selected.i))throw Error('rejected enabled choice '+e.id);decisions++;
 }else{O.advanceMonth(s);months++;}
 O.ensureClarity(s);const issues=O.lifeIssues(s);if(issues.length)throw Error(issues.join(';'));
 const key=s.age+'|'+s.month+'|'+s.pending+'|'+s.study?.status;if(key===last)same++;else same=0;last=key;if(same>8)throw Error('stalled '+key);
 for(const k of ['cash','debt','income','health','happiness','knowledge','relationships'])if(!Number.isFinite(s[k])||s[k]<0)throw Error('invalid '+k+' '+s[k]);
 }if(s.status==='alive')throw Error('life did not reach its end within the safety bound');console.log('PASS playthrough',code,seed,'age',s.age);outcomes.push({code,seed,age:s.age,status:s.status,degree:s.study?.degreeId,result:s.study?.status,job:s.job});}
 catch(e){console.error(JSON.stringify({code,seed,age:s.age,month:s.month,pending:s.pending,error:e.message}));process.exit(1);}
}
console.log(JSON.stringify({months,decisions,lives:outcomes.length,outcomes},null,2));
