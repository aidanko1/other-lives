const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const base=path.join(__dirname,'..'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');
for(const file of fs.readdirSync(base).filter(x=>x.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(base,file),'utf8'),{filename:file});
for(const [i,m]of [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].entries()){const src=/src="\.\/([^"]+)"/.exec(m[1]);if(src)assert(fs.existsSync(path.join(base,src[1].split('?')[0])),'missing script '+src[1]);else new vm.Script(m[2],{filename:'inline-'+i});}
for(const m of html.matchAll(/(?:href|src)="\.\/([^"]+)"/g)){const local=m[1].split(/[?#]/)[0];assert(fs.existsSync(path.join(base,local)),'missing local resource '+local);}
require('../scripts/check.cjs');
const O=require('./engine.cjs');for(const [label,list]of [['events',O.EVENTS],['routes',O.ROUTES],['moments',O.MOMENT_DEFS]])assert.equal(new Set(list.map(x=>x.id)).size,list.length,'duplicate '+label);
console.log('PASS: all script syntax, inline UI syntax, local asset references and registry IDs');
