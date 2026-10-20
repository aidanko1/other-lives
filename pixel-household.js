/* Original tile art. Art direction and limits: ART_DIRECTION.md. */
(function(O){'use strict';
const hash=v=>{let n=2166136261;for(const c of String(v))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0};
const skins=[['#f8d0a0','#d89868','#a86048'],['#e8b080','#bc7850','#885038'],['#c08858','#985838','#683c30'],['#986040','#704030','#482c28'],['#704838','#503028','#382428'],['#e8c098','#c09068','#885840']];
function appearance(person,s){if(person.appearance)return person.appearance;const h=hash((s?.seed||'')+'|'+(person.id||person.name));let options=[0,1,2,3,4,5];const region=s?.country?.region||'';if(/africa/i.test(region))options=[2,3,4,3,4,1];else if(/asia/i.test(region))options=[0,1,2,5,1,5];else if(/europe/i.test(region))options=[0,0,1,5,2,3];const family=s?.appearance;const tone=family&&['Child','Sibling'].includes(person.role)?Math.max(0,Math.min(5,family.skinTone+(h%3)-1)):options[h%options.length];return person.appearance={skinTone:tone,hairStyle:h%4,hairColour:h%5===0?'#905840':'#403038',shirt:h%6};}
const priorEnsure=O.ensureClarity;O.ensureClarity=function(s){priorEnsure(s);s.appearance??=appearance({id:s.id,name:s.name},s);for(const p of s.people)appearance(p,s);return s;};
const oldCreate=O.create;O.create=function(settings){const s=oldCreate(settings);O.ensureClarity(s);return s;};
function person(k,x,y,p,s){
 const a=appearance(p,s),skin=skins[a.skinTone]||skins[1],age=p.age??30,infant=age<3,child=age<12;
 const outline='#203038',hair=age>=65?'#d8d8c0':a.hairColour,shine=age>=65?'#f0f0d8':a.hairColour==='#905840'?'#b87850':'#605058';
 const colours=[['#3078a0','#60b0c0','#205070'],['#b85068','#e08888','#783850'],['#508848','#98b868','#305838'],['#b88038','#e8b850','#785028'],['#785088','#b088b0','#503858'],['#389080','#78b8a0','#206058']];
 const shirt=colours[a.shirt%6],h=infant?14:child?22:26,left=Math.round(x)-8,top=y-h;
 const r=(dx,dy,w,h,c)=>{k.fillStyle=c;k.fillRect(left+dx,top+dy,w,h)};
 r(3,h-1,10,2,'#307058');r(1,h,14,1,'#408860');
 if(infant){r(3,5,10,8,outline);r(4,6,8,6,'#e8d8a8');r(5,7,6,2,'#f8f0c8');r(4,1,8,6,outline);r(5,2,6,5,skin[0]);r(5,1,6,2,hair);r(6,4,1,1,outline);r(9,4,1,1,outline);return;}
 // Compact, rounded head occupies half the visible sprite; short torso and feet.
 const hy=child?0:1,headW=child?14:16,off=child?1:0;
 r(3+off,hy,headW-6,1,outline);r(1+off,hy+1,headW-2,10,outline);r(off,hy+3,headW,6,outline);
 r(2+off,hy+1,headW-4,10,hair);r(1+off,hy+3,headW-2,6,hair);r(4+off,hy+2,headW-8,2,shine);
 r(2+off,hy+6,headW-4,5,skin[1]);r(3+off,hy+6,headW-6,5,skin[0]);r(4+off,hy+11,headW-8,1,skin[1]);r(5+off,hy+12,headW-10,1,outline);
 r(1+off,hy+8,1,2,skin[1]);r(headW-2+off,hy+8,1,2,skin[1]);r(4+off,hy+8,1,2,outline);r(headW-5+off,hy+8,1,2,outline);r(7,hy+10,2,1,skin[2]);
 if(a.hairStyle===1){for(let i=2+off;i<14-off;i+=3){r(i,hy,2,2,outline);r(i,hy+1,2,2,hair);}r(2+off,hy+5,headW-4,2,hair);}
 if(a.hairStyle===2){r(off,hy+8,2,7,outline);r(1+off,hy+8,1,6,hair);r(headW-2+off,hy+8,2,7,outline);r(headW-2+off,hy+8,1,6,hair);}
 if(a.hairStyle===3){r(3+off,hy+4,3,3,hair);r(6+off,hy+5,2,1,hair);}
 if(age>=75){r(5,hy+1,6,3,skin[0]);r(4,hy+2,2,2,skin[1]);}
 const torso=hy+13,bodyH=child?5:7;
 r(2,torso,12,bodyH,outline);r(1,torso+1,14,bodyH-2,outline);r(3,torso,10,bodyH-1,shirt[0]);r(4,torso,8,2,shirt[1]);r(3,torso+bodyH-2,10,1,shirt[2]);
 r(1,torso+2,2,3,skin[1]);r(13,torso+2,2,3,skin[0]);r(5,torso,6,1,skin[1]);
 r(3,torso+bodyH,4,2,'#384858');r(9,torso+bodyH,4,2,'#384858');r(2,h-2,5,2,outline);r(9,h-2,5,2,outline);r(3,h-2,3,1,'#607078');r(10,h-2,3,1,'#607078');
 if(/doctor|nurse|clinic/i.test(p.job||'')){r(3,torso+1,3,bodyH-2,'#f8f0d8');r(10,torso+1,3,bodyH-2,'#d8e0d0');}
 if(age>=75){r(16,h-12,1,12,'#604830');r(15,h-12,3,1,outline);}
}
function building(k,x,y,kind,s){const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)},east=['CN','HK','JP','KR','TW'].includes(s.country.code),poor=s.strata<=1&&s.housing?.kind!=='owned',urban=s.urban,home=kind==='home',tower=home&&urban&&east&&(s.birthYear+s.age>=1960);
 r(x+3,y+8,75,8,'#308060');
 if(kind==='garden'){tree(k,x+28,y-6);return;}
 if(kind==='farm'){r(x,y-20,80,24,'#b89860');for(let j=0;j<3;j++)for(let i=0;i<7;i++){r(x+5+i*10,y-19+j*8,3,6,'#487840');r(x+6+i*10,y-20+j*8,3,2,'#80b048');}return;}
 const bh=tower?65:home?34:43,by=y-bh;
 r(x+4,by,72,bh,'#384840');r(x+6,by+2,68,bh-3,poor?'#c8b078':tower?'#d0d0b0':'#e8d8a8');r(x+6,y-4,68,4,'#a09870');r(x+72,by+2,2,bh-2,'#b0a880');
 if(tower){r(x+2,by-4,76,5,'#8898a0');for(let row=0;row<4;row++)for(let col=0;col<4;col++){const wx=x+11+col*16,wy=by+7+row*12;r(wx,wy,9,8,'#586878');r(wx+1,wy+1,7,4,'#90c8c8');r(wx+1,wy+6,7,1,'#e0e0c0');}}
 else{const roof=home?(east?'#486878':poor&&!urban?'#a89058':'#b86048'):'#6888a0';for(let row=0;row<4;row++){r(x-row*2,by-16+row*4,80+row*4,4,roof);r(x-row*2,by-16+row*4,80+row*4,1,'#485868');for(let col=0;col<10;col++)r(x+col*8+(row%2)*4,by-14+row*4,1,2,'#d0b088');}r(x-8,by,96,3,'#505860');for(const wx of [x+13,x+52]){r(wx,by+9,15,13,'#304048');r(wx+1,by+10,13,10,'#78b8c0');r(wx+2,by+10,5,4,'#b0e0d0');r(wx+7,by+10,1,11,'#e8e0b8');r(wx,by+22,15,2,'#989878');}}
 r(x+34,y-19,14,19,'#685048');r(x+36,y-17,10,16,'#907050');r(x+43,y-10,1,2,'#f0d890');r(x+29,y,24,4,'#c8c0a0');r(x+27,y+4,28,3,'#909878');
 if(kind==='school'){r(x+8,by-12,1,12,'#384840');r(x+9,by-12,8,5,'#e0b850');r(x+34,by+7,12,10,'#687060');r(x+35,by+8,10,8,'#f0e8c8');r(x+39,by+8,1,4,'#384840');r(x+39,by+11,4,1,'#384840');}if(kind==='clinic'){r(x+33,by+5,14,4,'#d06868');r(x+38,by,4,14,'#d06868');}
}
const leaves=['....ddd....','..ddgggdd..','.dgggggggd.','dggghhggggd','dgglhhhgggd','dggghhggggd','.dgggghggd.','..ddddddd..'];
function leafCluster(k,x,y){const palette={d:'#104830',g:'#206838',h:'#389840',l:'#70b848'};leaves.forEach((row,j)=>{for(let i=0;i<row.length;i++)if(palette[row[i]]){k.fillStyle=palette[row[i]];k.fillRect(x+i,y+j,1,1);}});}
function tree(k,x,y){const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)};
 r(x-13,y+10,28,4,'#287050');r(x-4,y-8,9,21,'#484830');r(x-2,y-7,5,19,'#a89050');r(x-2,y-4,2,13,'#c0b068');
 for(const [dx,dy,w,h] of [[-9,-31,19,4],[-15,-27,31,8],[-18,-19,37,10],[-14,-9,29,6]])r(x+dx,y+dy,w,h,'#104830');
 for(const [dx,dy] of [[-13,-16],[-5,-12],[5,-14],[-10,-23],[1,-23],[9,-18],[-6,-29],[-14,-9],[-3,-6],[7,-8]])leafCluster(k,x+dx,y+dy);
}
let demo;O.drawScene=function(canvas,_scene,s){if(!s?.country){if(!demo){demo=O.create({country:'GB',seed:14});demo.age=30;demo.job='Office worker';demo.school=false;}s=demo;}O.ensureClarity(s);canvas.width=384;canvas.height=128;const k=canvas.getContext('2d');if(!k)return;k.imageSmoothingEnabled=false;const r=(x,y,w,h,c)=>{k.fillStyle=c;k.fillRect(x,y,w,h)};
 // 24 by 8 tiles. Flat overhead ground; no horizon, sky, gradients or labels.
 const urban=s.urban,arid=!urban&&['EG','SA','AE','IR','PK','ET','KE','MA'].includes(s.country.code),cool=!urban&&['GB','DE','PL','CA','NZ'].includes(s.country.code);
 const ground=urban?['#a8b0b0','#889898','#c0c8c0']:arid?['#d8c080','#b89860','#e8d098']:cool?['#78a870','#508858','#a0c080']:['#50b080','#28885b','#78c088'];
 O.sceneEnvironment={kind:urban?'urban paving':arid?'dry countryside':cool?'temperate countryside':'lush countryside',place:s.location?.name||s.country.name};
 for(let y=0;y<128;y+=16)for(let x=0;x<384;x+=16){r(x,y,16,16,ground[0]);const n=hash(x+'|'+y);if(urban){r(x,y,16,1,ground[1]);r(x,y,1,16,ground[1]);r(x+2,y+2,13,1,ground[2]);if(n%5===0)r(x+9,y+8,3,1,ground[1]);}else{r(x+2,y+4,1,2,ground[1]);r(x+1,y+3,1,1,ground[1]);r(x+3,y+3,1,1,ground[1]);if(n%3){r(x+10,y+11,2,1,ground[2]);r(x+11,y+10,1,1,ground[2]);}if(n%5===0)r(x+7,y+7,2,1,ground[1]);}}
 // A narrow border of clustered foliage gives the strip the reference's dense greens.
 for(let x=0;x<384;x+=16){r(x,0,16,12,'#104830');r(x+1,1,13,9,'#206838');r(x+2,2,5,3,'#389840');r(x+9,5,5,4,'#389840');r(x+3,2,3,1,'#70b848');r(x+8,10,4,3,'#206838');leafCluster(k,x-2,2);leafCluster(k,x+7,5);}
 r(0,103,384,22,urban?'#c8c0a8':arid?'#c8a870':'#b8c890');r(0,103,384,2,'#488860');r(0,125,384,3,'#389060');for(let x=0;x<384;x+=8){const j=hash(x)%7;r(x+2,107+j,2,1,'#90b880');r(x+4,119-j,2,1,'#d0d0a0');r(x,115,1,1,'#78a878');}
 tree(k,117,43);tree(k,266,42);
 building(k,12,96,'home',s);
 const stage=s.age<6?'garden':s.school||s.study?.status==='enrolled'||s.flags.studying?'school':s.job==='Retired'||!s.job?'garden':/farm|herd|agricultur/i.test(s.job)?'farm':/doctor|nurse|care/i.test(s.job)?'clinic':'work';building(k,292,96,stage,s);
 const people=[{id:s.id,name:s.name,age:s.age,job:s.job,appearance:s.appearance},...O.householdMembers(s)];const maxRow=7;people.forEach((p,i)=>{const row=Math.floor(i/maxRow),count=Math.min(maxRow,people.length-row*maxRow),col=i%maxRow;person(k,192+(col-(count-1)/2)*21,89+row*24,p,s);});
 const pet=s.memories.pet;if(pet?.alive){const x=265,y=94;r(x,y,11,7,'#a07850');r(x+8,y-4,7,7,'#c09868');r(x+9,y-6,2,3,'#705040');r(x+13,y-6,2,3,'#705040');r(x+12,y-2,1,1,'#303038');r(x+1,y+6,2,3,'#705040');r(x+8,y+6,2,3,'#705040');r(x-3,y+1,4,2,'#a07850');}
 canvas.setAttribute('aria-label',O.householdCaption(s));
};
O.spriteAvatar=p=>{const canvas=document.createElement('canvas');canvas.width=40;canvas.height=64;const k=canvas.getContext('2d');k.imageSmoothingEnabled=false;k.fillStyle='#90b898';k.fillRect(0,0,40,64);k.save();k.scale(2,2);person(k,10,31,p);k.restore();return canvas.toDataURL();};O.avatarData=O.spriteAvatar;
window.dispatchEvent?.(new Event('other-lives-ready'));
})(window.OL);
