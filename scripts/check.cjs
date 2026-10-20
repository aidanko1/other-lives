const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');let scripts=0;
const version=require('../package.json').version;assert.equal(fs.readFileSync(path.join(root,'release-version.txt'),'utf8').trim(),version);for(const tag of html.matchAll(/(?:src|href)="\.\/[^"]+\?v=([^"]+)"/g))assert.equal(tag[1],version,'Mixed asset version');
const sources=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map(m=>{const src=/src="\.\/(.*?)"/.exec(m[1]);if(src){const file=src[1].split('?')[0];assert(!file.includes('..'));new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});scripts++;return file;}new vm.Script(m[2]);return 'inline';});
assert.equal(sources.filter(s=>s==='ui/app.js').length,1);assert.equal(sources.at(-1),'ui/app.js','UI must boot after all engine modules');
const O=require('../tests/engine.cjs');
for(const [name,rows]of Object.entries({countries:O.COUNTRIES,events:O.EVENTS,routes:O.ROUTES,moments:O.MOMENT_DEFS,degrees:O.DEGREES,careers:O.CAREER_TRACKS})){
 const ids=rows.map(x=>x.id||x.code);assert.equal(new Set(ids).size,ids.length,'Duplicate '+name+' IDs');assert(ids.every(Boolean),'Missing '+name+' identity');
 if(name==='events')for(const e of rows){assert(e.min>=0&&e.max<=120&&e.max>=e.min,e.id+' age range');for(const f of ['when','title','description','options'])assert.equal(typeof e[f],'function',e.id+' '+f);}
 console.log(name,rows.length);
}
for(const c of O.COUNTRIES){for(const key of ['ppp','life','school','infra','births'])assert(Number.isFinite(c[key])&&c[key]>=0,c.code+' '+key);}
for(const asset of [...html.matchAll(/(?:src|href)="\.\/(.*?)"/g)].map(x=>x[1].split('?')[0]))assert(fs.existsSync(path.join(root,asset)),'Missing asset '+asset);
console.log('PASS',scripts,'script dependencies, syntax, registries and static references');
