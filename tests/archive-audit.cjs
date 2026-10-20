/* Read-only audit of Other Lives exports: node tests/archive-audit.cjs backup.json */
const fs=require('node:fs');
function livesFrom(data){if(Array.isArray(data))return data;if(data.format==='other-lives-life-v1')return [data.life];if(data.format==='other-lives-backup-v1')return [...(data.lives||[]),...(data.current?[data.current]:[])];return data.journal?[data]:[];}
function auditLife(s){const findings=[],add=(kind,age,evidence)=>findings.push({kind,age,evidence});
 if(s.study?.status==='completed'&&s.school)add('State conflict',s.age,'Completed qualification still marked as currently at school.');
 if(s.study?.status==='enrolled'&&s.study.mode==='full-time'&&s.job&&s.employment?.mode==='full-time')add('State conflict',s.age,'Full-time paid role and full-time degree overlap.');
 if(s.housing?.mortgage?.balance>s.debt+1)add('Accounting conflict',s.age,'Mortgage balance exceeds recorded total debt.');
 if(s.study?.degreeId==='medicine'&&s.study.status==='completed'&&s.employment?.mode==='part-time')add('Review graduation',s.age,`Completed Medicine; current role ${s.job}. Check whether a relevant full-time choice was ever offered.`);
 const seen=new Map(),entries=(s.journal||[]).slice().sort((a,b)=>a.age-b.age);
 for(const e of entries){const t=(e.title||'')+' '+(e.description||'');if(/\bundefined\b|\bNaN\b/.test(t))add('Broken text',e.age,t);
 if(e.age<5&&/You (?:start working|begin a degree|apply for (?:work|university))|your (?:paid shift|colleague|job search)/i.test(t))add('Age conflict',e.age,t);
 const key=e.momentId||e.title;if(e.momentId&&seen.has(key)&&e.age-seen.get(key)<10)add('Repeated memory',e.age,e.title);seen.set(key,e.age);
 if(/your relative/i.test(t))add('Ambiguous person',e.age,t);
 }
 return {id:s.id,name:s.name,age:s.age,findings};
}
module.exports={livesFrom,auditLife};
if(require.main===module){const files=process.argv.slice(2);if(!files.length)throw Error('Pass one or more Other Lives JSON export paths.');const report=files.flatMap(file=>livesFrom(JSON.parse(fs.readFileSync(file,'utf8'))).filter(Boolean).map(auditLife));process.stdout.write(JSON.stringify({lives:report.length,findings:report.reduce((n,r)=>n+r.findings.length,0),report},null,2)+'\n');}
