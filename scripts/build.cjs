const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..'),out=path.join(root,'_site');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
// Keep production packaging explicit. Tests, docs, reports and private fixtures never ship.
for(const f of fs.readdirSync(root)){if(/\.(js|css)$/.test(f)||['index.html','release-version.txt','manifest.webmanifest','icon.svg','.nojekyll'].includes(f))fs.copyFileSync(path.join(root,f),path.join(out,f));}
for(const d of ['engine','ui','icons'])fs.cpSync(path.join(root,d),path.join(out,d),{recursive:true});
console.log('PASS static site assembled');
