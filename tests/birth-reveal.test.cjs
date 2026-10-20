const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const section=(start,end)=>html.slice(html.indexOf(start),html.indexOf(end,html.indexOf(start)));
const code=section('function birthRevealView(s){','function archiveView()')+section('function drawBirthRoulette(){','function render(){');
// Exercise the actual view and timer with a selected country distinct from every decoy.
vm.runInNewContext(`
let birthReveal=true,birthRouletteFinished=false,birthRouletteTimer=null,birthRevealStarted=0,view='game';
let now=0,timer,rendered='',nodes={line:{textContent:''},face:{textContent:''}};
const state={name:'Chosen Identity',country:{name:'Chosen Country'},birthYear:2026,urban:true};
const O={ensureClarity(){},tier:()=> 'Chosen circumstances',COUNTRIES:[{name:'Decoy Country',region:'test'}],POOLS:{test:{firstF:['Decoy name']}}};
const safe=String,performance={now:()=>now},document={querySelector:s=>s==='.birth-rolling'?nodes.line:nodes.face};
const setInterval=fn=>{timer=fn;return 1},clearInterval=()=>{};
function render(){rendered=game();}
${code}
render();
assert(!rendered.includes('Chosen Country'));
assert(!rendered.includes('Chosen Identity'));
assert(!rendered.includes('Chosen circumstances'));
assert(!rendered.includes('data-action="dismiss-birth"'));
assert(!rendered.includes('game-layout'),'the life behind the overlay must not reveal the result');
drawBirthRoulette();now=500;timer();assert(nodes.line.textContent.includes('Decoy Country'));
nodes={line:{textContent:''},face:{textContent:''}};render();now=1000;timer();
assert(nodes.face.textContent.includes('Decoy name'),'timer must update replacement nodes after a render');
assert(!rendered.includes('Chosen Country'));
now=1400;timer();assert(birthRouletteFinished);assert.equal(birthRouletteTimer,null);
assert(rendered.includes('Chosen Country'));assert(rendered.includes('Chosen Identity'));
assert(rendered.includes('Chosen circumstances'));assert(rendered.includes('data-action="dismiss-birth"'));
`,{assert});
console.log('PASS: no birth-result spoiler before or during animation; result appears on completion; animation survives rerendering.');
