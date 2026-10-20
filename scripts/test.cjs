const {spawnSync}=require('node:child_process'),path=require('node:path');
const tests=[['scripts/check.cjs'],['--test','tests/contracts.test.cjs','tests/reliability.test.cjs'],['tests/birth-reveal.test.cjs'],['tests/memory-voice.test.cjs'],['tests/life-clarity.test.cjs','--quick'],['tests/life-dynamics.test.cjs'],['tests/university.test.cjs'],['tests/flow-balance-routes.test.cjs'],['tests/career-continuity.test.cjs'],['tests/registry-sweep.test.cjs'],['tests/save-replay.test.cjs']];
for(const args of tests){const result=spawnSync(process.execPath,args,{cwd:path.join(__dirname,'..'),stdio:'inherit',timeout:180000});if(result.status!==0){console.error('FAILED',args.join(' '),result.error?.message||'');process.exit(result.status||1);}}
console.log('PASS all mandatory fast checks');
