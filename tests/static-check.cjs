const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const base=path.join(__dirname,'..'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');
for(const file of fs.readdirSync(base).filter(x=>x.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(base,file),'utf8'),{filename:file});
for(const [i,m]of [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].entries()){const src=/src="\.\/([^"]+)"/.exec(m[1]);if(src)assert(fs.existsSync(path.join(base,src[1].split('?')[0])),'missing script '+src[1]);else new vm.Script(m[2],{filename:'inline-'+i});}
for(const m of html.matchAll(/(?:href|src)="\.\/([^"]+)"/g)){const local=m[1].split(/[?#]/)[0];assert(fs.existsSync(path.join(base,local)),'missing local resource '+local);}
const releaseVersion=JSON.parse(fs.readFileSync(path.join(base,'package.json'),'utf8')).version;
assert.equal(fs.readFileSync(path.join(base,'release-version.txt'),'utf8').trim(),releaseVersion,'published version file must match package');
assert.equal(/<meta name="application-version" content="([^"]+)">/.exec(html)?.[1],releaseVersion,'visible app release metadata must match package');
for(const m of html.matchAll(/(?:src|href)="\.\/[^"?]+[?]v=([^"&]+)"/g))assert.equal(m[1],releaseVersion,'asset release key must match the visible version');
require('../scripts/check.cjs');
const O=require('./engine.cjs');for(const [label,list]of [['events',O.EVENTS],['routes',O.ROUTES],['moments',O.MOMENT_DEFS]])assert.equal(new Set(list.map(x=>x.id)).size,list.length,'duplicate '+label);
console.log('PASS: all script syntax, inline UI syntax, local asset references and registry IDs');
