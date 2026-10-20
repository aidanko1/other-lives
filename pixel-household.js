/* Original tile art. Art direction and limits: ART_DIRECTION.md. */
(function(O){'use strict';
const hash=v=>{let n=2166136261;for(const c of String(v))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0};
const skins=[['#f8d0a0','#d89868','#a86048'],['#e8b080','#bc7850','#885038'],['#c08858','#985838','#683c30'],['#986040','#704030','#482c28'],['#704838','#503028','#382428'],['#e8c098','#c09068','#885840']];
function appearance(person,s){if(person.appearance)return person.appearance;const h=hash((s?.seed||'')+'|'+(person.id||person.name));let options=[0,1,2,3,4,5];const region=s?.country?.region||'';if(/africa/i.test(region))options=[2,3,4,3,4,1];else if(/asia/i.test(region))options=[0,1,2,5,1,5];else if(/europe/i.test(region))options=[0,0,1,5,2,3];const family=s?.appearance;const tone=family&&['Child','Sibling'].includes(person.role)?Math.max(0,Math.min(5,family.skinTone+(h%3)-1)):options[h%options.length];return person.appearance={skinTone:tone,hairStyle:h%4,hairColour:h%5===0?'#905840':'#403038',shirt:h%6};}
const priorEnsure=O.ensureClarity;O.ensureClarity=function(s){priorEnsure(s);s.appearance??=appearance({id:s.id,name:s.name},s);for(const p of s.people)appearance(p,s);return s;};
const oldCreate=O.create;O.create=function(settings){const s=oldCreate(settings);O.ensureClarity(s);return s;};
function person(k,x,y,p,s){const a=appearance(p,s),skin=skins[a.skinTone]||skins[1],age=p.age??30,child=age<12,infant=age<3,w=infant?10:child?12:16,h=infant?14:child?23:29,left=x-Math.floor(w/2),top=y-h;
 const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)},hair=age>=65?'#d8d8c0':a.hairColour,shirt=['#3888b0','#d87868','#68a058','#c89848','#8868a8','#58a8a0'][a.shirt];
 r(left+2,y,w-4,2,'#507848');
 if(infant){r(left+1,top+6,8,7,'#e8d8a8');r(left+2,top+1,6,6,skin[0]);r(left+2,top,6,2,hair);r(left+3,top+4,1,1,'#403038');r(left+6,top+4,1,1,'#403038');return;}
 const head=child?10:12,hx=left+(w-head)/2;
 r(left+3,y-7,4,6,'#384858');r(left+w-6,y-7,3,6,'#384858');r(left+2,y-2,5,2,'#303038');r(left+w-6,y-2,5,2,'#303038');
 r(left+2,top+12,w-4,h-18,'#384048');r(left+2,top+12,w-4,h-19,shirt);r(left+2,top+13,2,h-20,'#304858');r(left+4,top+13,w-8,2,'#a8c8b0');
 r(left,top+14,2,6,skin[1]);r(left+w-2,top+14,2,6,skin[0]);
 r(hx,top+2,head,10,'#403038');r(hx+1,top+3,head-2,9,skin[1]);r(hx+2,top+4,head-4,7,skin[0]);r(hx+2,top+11,head-4,2,skin[2]);
 r(hx+1,top+1,head-2,4,hair);r(hx+2,top,head-4,2,hair);r(hx,top+3,2,5,hair);r(hx+head-2,top+3,2,5,hair);
 if(a.hairStyle===1){for(let i=1;i<head-1;i+=3)r(hx+i,top,2,2,hair);r(hx,top+2,head,3,hair);}if(a.hairStyle===2){r(hx+head-1,top+5,2,7,hair);r(hx-1,top+5,2,7,hair);}if(a.hairStyle===3){r(hx+2,top+3,3,2,hair);r(hx+5,top+4,2,1,hair);}
 r(hx+3,top+7,1,2,'#303038');r(hx+head-4,top+7,1,2,'#303038');r(hx+head/2,top+10,2,1,skin[2]);
 if(age>=75){r(left+w+1,y-12,1,12,'#705038');r(left+w-1,y-12,3,1,'#705038');}
 if(/doctor|nurse|clinic/i.test(p.job||'')){r(left+2,top+13,3,h-20,'#f8f0d8');r(left+w-5,top+13,3,h-20,'#d8e0d0');}
}
function building(k,x,y,kind,s){const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)},east=['CN','HK','JP','KR','TW'].includes(s.country.code),poor=s.strata<=1,urban=s.urban,home=kind==='home',tower=home&&urban&&east;
 r(x+3,y+8,75,8,'#608850');
 if(kind==='garden'){tree(k,x+28,y-6);return;}
 if(kind==='farm'){r(x,y-20,80,24,'#b89860');for(let j=0;j<3;j++)for(let i=0;i<7;i++){r(x+5+i*10,y-19+j*8,3,6,'#487840');r(x+6+i*10,y-20+j*8,3,2,'#80b048');}return;}
 const bh=tower?65:home?34:43,by=y-bh;
 r(x+4,by,72,bh,'#605850');r(x+6,by+2,68,bh-3,poor?'#c8b078':tower?'#d0d0b0':'#e8d8a8');r(x+6,y-4,68,4,'#a09870');r(x+72,by+2,2,bh-2,'#b0a880');
 if(tower){r(x+2,by-4,76,5,'#8898a0');for(let row=0;row<4;row++)for(let col=0;col<4;col++){const wx=x+11+col*16,wy=by+7+row*12;r(wx,wy,9,8,'#586878');r(wx+1,wy+1,7,4,'#90c8c8');r(wx+1,wy+6,7,1,'#e0e0c0');}}
 else{const roof=home?(east?'#607890':poor?'#a89058':'#b86858'):'#6888a0';for(let row=0;row<4;row++){r(x-row*2,by-16+row*4,80+row*4,4,roof);r(x-row*2,by-16+row*4,80+row*4,1,'#485868');for(let col=0;col<10;col++)r(x+col*8+(row%2)*4,by-14+row*4,1,2,'#d0b088');}r(x-8,by,96,3,'#505860');for(const wx of [x+13,x+52]){r(wx,by+9,15,13,'#605848');r(wx+1,by+10,13,10,'#78b8c0');r(wx+2,by+10,5,4,'#b0e0d0');r(wx+7,by+10,1,11,'#e8e0b8');r(wx,by+22,15,2,'#989878');}}
 r(x+34,y-19,14,19,'#685048');r(x+36,y-17,10,16,'#907050');r(x+43,y-10,1,2,'#f0d890');r(x+29,y,24,4,'#c8c0a0');r(x+27,y+4,28,3,'#909878');
 if(kind==='clinic'){r(x+33,by+5,14,4,'#d06868');r(x+38,by,4,14,'#d06868');}
}
function tree(k,x,y){const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)};r(x-3,y,7,15,'#786040');r(x-8,y-15,17,22,'#305840');r(x-14,y-9,29,13,'#407848');r(x-10,y-16,21,14,'#589850');r(x-7,y-20,15,8,'#78b060');r(x-9,y-11,5,3,'#88c068');r(x+6,y-7,6,4,'#305840');}
let demo;O.drawScene=function(canvas,_scene,s){if(!s?.country){if(!demo){demo=O.create({country:'GB',seed:14});demo.age=30;demo.job='Office worker';demo.school=false;}s=demo;}O.ensureClarity(s);canvas.width=384;canvas.height=128;const k=canvas.getContext('2d');if(!k)return;k.imageSmoothingEnabled=false;const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)};
 // 24 by 8 tiles. Flat overhead ground; no horizon, sky, gradients or labels.
 for(let y=0;y<128;y+=16)for(let x=0;x<384;x+=16){r(x,y,16,16,'#88b868');r(x+2,y+3,2,1,'#a8d080');r(x+3,y+2,1,1,'#a8d080');r(x+10,y+11,2,1,'#689850');r(x+11,y+10,1,1,'#689850');}
 r(0,103,384,22,'#d8c898');r(0,103,384,2,'#b0a878');r(0,125,384,3,'#689850');for(let x=0;x<384;x+=16){r(x+3,108,2,1,'#c0b080');r(x+11,119,2,1,'#e8d8a8');}
 building(k,12,96,'home',s);
 const stage=s.age<6?'garden':s.school&&!s.job||s.flags.studying?'school':s.job==='Retired'||!s.job?'garden':/farm|herd|agricultur/i.test(s.job)?'farm':/doctor|nurse|care/i.test(s.job)?'clinic':'work';building(k,292,96,stage,s);
 const people=[{id:s.id,name:s.name,age:s.age,job:s.job,appearance:s.appearance},...O.householdMembers(s)];const maxRow=7;people.forEach((p,i)=>{const row=Math.floor(i/maxRow),count=Math.min(maxRow,people.length-row*maxRow),col=i%maxRow;person(k,192+(col-(count-1)/2)*21,89+row*24,p,s);});
 const pet=s.memories.pet;if(pet?.alive){const x=265,y=94;r(x,y,11,7,'#a07850');r(x+8,y-4,7,7,'#c09868');r(x+9,y-6,2,3,'#705040');r(x+13,y-6,2,3,'#705040');r(x+12,y-2,1,1,'#303038');r(x+1,y+6,2,3,'#705040');r(x+8,y+6,2,3,'#705040');r(x-3,y+1,4,2,'#a07850');}
 canvas.setAttribute('aria-label',O.householdCaption(s));
};
O.spriteAvatar=p=>{const canvas=document.createElement('canvas');canvas.width=40;canvas.height=64;const k=canvas.getContext('2d');k.imageSmoothingEnabled=false;k.fillStyle='#c8d8b0';k.fillRect(0,0,40,64);k.save();k.scale(2,2);person(k,10,31,p);k.restore();return canvas.toDataURL();};O.avatarData=O.spriteAvatar;
window.dispatchEvent?.(new Event('other-lives-ready'));
})(window.OL);
