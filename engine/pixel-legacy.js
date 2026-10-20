
/* Pixel drawings are original, procedurally rendered static scene assets.
   Deliberately evoke a classic overhead handheld-game illustration without
   copying any existing franchise sprites, maps or environments. */
(function(O){
const palettes={
  morning:{sky:'#bad5c9',light:'#e0e9ce',grass:'#8eaf8a',darkgrass:'#659578',path:'#d4c4a5',pathDark:'#bea889',wall:'#e9d3a5',roof:'#a35e5b',trim:'#6e7670'},
  rich:{sky:'#c6d9d2',light:'#e2eacb',grass:'#92b38d',darkgrass:'#69947f',path:'#c6b7a4',pathDark:'#ae9c8a',wall:'#f1e6ce',roof:'#52697c',trim:'#64786a'},
  low:{sky:'#b4cbbb',light:'#dce2bc',grass:'#93ab82',darkgrass:'#778e72',path:'#c7b6a2',pathDark:'#a18f80',wall:'#d6bf9c',roof:'#936f68',trim:'#736e60'}
};
function draw(canvas,scene,s){
 if(!canvas)return;
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 canvas.width=320;canvas.height=180;ctx.imageSmoothingEnabled=false;
 const tier=s?.strata??3,rich=tier>=6,poor=tier<=1,rural=s?.urban===false;
 const p=rich?palettes.rich:poor?palettes.low:palettes.morning;
 const blocks=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
 const line=(x,y,x2,y2,c)=>{ctx.strokeStyle=c;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke()};
 const box=(x,y,w,h,border,fill)=>{blocks(x-2,y-2,w+4,h+4,border);blocks(x,y,w,h,fill)};
 const dots=(x,y,w,h,c,step=13,offset=0)=>{for(let j=y+offset;j<y+h;j+=step)for(let i=x+offset;i<x+w;i+=step)blocks(i,j,2,2,c)};
 const hash=(s?.seed||7)%9;
 const sky=()=>{blocks(0,0,320,180,p.sky);blocks(0,95,320,85,p.grass);blocks(0,105,320,12,p.darkgrass);dots(0,126,320,54,p.darkgrass,17,hash);for(let j=0;j<3;j++){const x=24+j*119+(hash*3)%22;blocks(x,20+j%2*8,30,7,'#eff3df');blocks(x+5,14+j%2*8,15,6,'#eff3df')}if(rural){for(let i=0;i<6;i++){let x=i*65-28;blocks(x,81,66,28,'#93b49e');blocks(x+8,77,43,18,'#a2bca9')}}else{for(let i=0;i<8;i++){let x=i*42+(hash%4)*3;blocks(x,52+(i%3)*8,28,47,p.light);blocks(x+5,64+(i%3)*8,4,5,'#8eaeb2');blocks(x+15,64+(i%3)*8,4,5,'#8eaeb2')}}};
 const path=()=>{blocks(0,136,320,44,p.path);blocks(0,136,320,4,p.pathDark);for(let x=0;x<320;x+=28){blocks(x,153,12,2,'#b9aa8f');blocks(x+8,171,10,2,'#b9aa8f')}};
 const tree=(x,y,scale=1)=>{const n=scale;blocks(x+11*n,y+18*n,7*n,28*n,'#755e47');blocks(x+8*n,y+36*n,13*n,5*n,'#5e5942');blocks(x,y+6*n,30*n,26*n,'#5f9272');blocks(x+4*n,y,22*n,30*n,'#83ae7d');blocks(x+4*n,y+7*n,10*n,6*n,'#aed096');blocks(x+18*n,y+19*n,8*n,4*n,'#648e6c')};
 const character=(x,y,gender='F',coat='#5a839a',hair='#594a42',size=1)=>{const b=(a,b,c,d,e)=>blocks(x+a*size,y+b*size,c*size,d*size,e);b(4,15,10,3,'#48534c');b(3,11,4,5,'#514e54');b(11,11,4,5,'#514e54');b(3,7,12,7,coat);b(1,8,3,7,'#b78467');b(15,8,3,7,'#b78467');b(5,0,9,9,'#c79778');b(4,0,11,4,hair);b(5,4,1,1,'#4d463c');b(12,4,1,1,'#4d463c');if(gender==='F')b(2,3,2,6,hair)};
 const plant=(x,y)=>{blocks(x+5,y+12,12,8,'#ac745e');blocks(x+8,y+4,6,10,'#6b9b72');blocks(x+1,y+5,10,6,'#77ac83');blocks(x+12,y+1,10,7,'#699873')};
 const house=(x,y,w,h,scheme='default')=>{const elegant=scheme==='mansion';const roof=elegant?'#647582':poor?'#926b67':'#a36c66',wall=elegant?'#f0e4ca':poor?'#d3b99a':'#eed9ba';blocks(x+2,y+5,w,h,wall);blocks(x-8,y-4,w+16,22,roof);blocks(x-4,y-8,w+8,8,'#b5a08a');for(let i=0;i<(elegant?5:3);i++){let wx=x+11+i*(w-30)/(elegant?4:2);if(wx+10>x+w-10)break;blocks(wx,y+25,13,15,'#f9f1dc');blocks(wx+2,y+27,9,11,'#91b8bd');blocks(wx+6,y+27,1,11,'#dce8df')}blocks(x+w/2-9,y+h-29,18,29,'#755f53');blocks(x+w/2-5,y+h-24,4,4,'#d7b67a')};
 const room=()=>{blocks(0,0,320,73,rich?'#ded7c4':poor?'#c7bb9f':'#e4dcc9');blocks(0,73,320,107,rich?'#c5ae91':poor?'#ae937b':'#c2ac8c');for(let y=78;y<180;y+=18)blocks(0,y,320,2,rich?'#b8a082':'#a88e72');for(let x=0;x<320;x+=37)blocks(x,74,2,106,'#b3987a');blocks(0,65,320,10,'#8d8170');blocks(19,15,60,47,'#deded0');blocks(23,19,52,39,'#679da8');blocks(47,19,3,39,'#eef3e2');blocks(23,37,52,3,'#eef3e2');blocks(88,18,60,44,'#eddac0');blocks(92,23,52,34,'#c3d4c7');if(rich){blocks(150,76,140,80,'#c2a38f');blocks(158,85,124,64,'#e5d7bd');blocks(177,105,86,21,'#9a725e');blocks(183,98,74,15,'#7d907e');blocks(190,96,60,4,'#e8ded0');blocks(35,105,72,37,'#668a87');blocks(39,98,64,11,'#d7c29e');plant(7,120);plant(293,109)}else if(poor){blocks(12,93,105,52,'#7e9b8c');blocks(17,98,95,41,'#e1d6a7');blocks(128,91,77,65,'#816c58');blocks(134,95,65,58,'#a98970');blocks(230,94,65,38,'#836c5c');blocks(236,98,52,28,'#dbbd96');blocks(33,148,88,20,'#897e62');blocks(10,143,21,20,'#968c73');plant(280,58)}else{blocks(32,98,113,60,'#8cafa1');blocks(39,106,99,48,'#d7c8a8');blocks(175,90,104,60,'#87725d');blocks(182,97,91,47,'#c2a98e');blocks(201,82,55,20,'#9b816d');plant(287,132);blocks(10,160,310,4,'#ad967e')}};
 switch(scene){
 case 'home':{if(rural&&poor&&s?.age<19){sky();path();house(58,45,194,90);tree(9,87);tree(275,86);character(144,142,s?.gender,'#839c78');character(175,142,'F','#ad7a69');break}room();character(rich?121:151,132,s?.gender,rich?'#71889c':'#588e89');if(s?.age<20)character(rich?249:181,125,'F','#b58e71');break}
 case 'mansion':{sky();path();house(35,25,247,115,'mansion');tree(0,83);tree(289,89);blocks(130,140,66,40,'#d0bda6');blocks(140,140,46,40,'#e6d8bd');character(154,150,s?.gender,'#5f7a90');break}
 case 'school':{sky();path();house(45,40,240,110,'school');blocks(133,57,64,11,'#597c7b');blocks(137,61,56,3,'#e5e8d4');tree(3,86);tree(292,93);character(142,144,s?.gender,'#526a9e');character(171,145,'M','#667e90');break}
 case 'clinic':{sky();path();house(46,42,228,105);blocks(148,41,23,22,'#f4f0dc');blocks(156,44,6,16,'#b85b60');blocks(151,49,16,6,'#b85b60');plant(17,126);plant(287,126);character(154,146,s?.gender,'#689ba0');character(187,149,'M','#ddd1c2');break}
 case 'office':{sky();path();blocks(25,35,270,104,'#899da6');blocks(32,27,256,18,'#617986');for(let y=54;y<119;y+=23)for(let x=41;x<285;x+=33){blocks(x,y,23,16,'#c5dfe0');blocks(x+2,y+2,19,12,'#92b5bb');blocks(x+11,y,2,16,'#617986')}blocks(150,113,35,27,'#3f555f');character(164,148,s?.gender,'#708b8e');break}
 case 'factory':{sky();path();blocks(28,58,270,83,'#b8aaa0');blocks(34,49,256,16,'#776b6e');blocks(207,19,27,33,'#8d8381');blocks(213,10,15,9,'#ada49e');for(let x=46;x<292;x+=38){blocks(x,78,26,19,'#6e8584');blocks(x+2,80,22,15,'#b0bbb0')}blocks(150,106,43,35,'#786c67');character(164,146,s?.gender,'#8b9a72');break}
 case 'shop':{sky();path();blocks(48,53,226,86,'#e6d3b9');blocks(40,43,242,18,'#c67762');for(let x=48;x<278;x+=32)blocks(x,43,16,18,'#efdbbd');blocks(71,75,45,42,'#91b5ad');blocks(126,75,45,42,'#91b5ad');blocks(185,89,55,49,'#766459');blocks(198,94,28,43,'#b9ac98');character(158,144,s?.gender,'#7d9b84');break}
 case 'station':{sky();path();blocks(33,55,254,80,'#b5ada1');blocks(28,49,265,15,'#637d87');blocks(53,70,60,43,'#a5bec0');blocks(131,70,60,43,'#a5bec0');blocks(209,70,60,43,'#a5bec0');blocks(147,128,27,18,'#ddd1b0');character(141,150,s?.gender,'#789a8a');blocks(172,145,13,9,'#a77756');break}
 case 'park':{sky();path();blocks(0,136,320,44,'#8db18d');for(let i=0;i<4;i++)tree(14+i*89,85+(i%2)*13,i%2?1:.8);blocks(85,149,167,31,'#cbb998');blocks(85,149,167,4,'#b5a285');blocks(112,157,70,3,'#e8d2a7');character(157,142,s?.gender,'#678e90');character(185,147,'F','#b68374');break}
 default:{sky();path();house(59,50,196,86);character(152,144,s?.gender,'#829c7f');tree(11,100);tree(274,103)}
 }
 // Film-like pixel detail and subtle border, no movement.
 blocks(0,0,320,2,'#ffffff');blocks(0,178,320,2,'#6c826f');
}
O.drawScene=draw;
O.avatarData=(person)=>{const c=document.createElement('canvas');c.width=38;c.height=38;const k=c.getContext('2d');k.imageSmoothingEnabled=false;const palette=['#d9e6d8','#eedec6','#dce5eb','#e4dccd','#e7d8dd'];const i=(person.id||person.name||'x').split('').reduce((t,x)=>t+x.charCodeAt(0),0);k.fillStyle=palette[i%palette.length];k.fillRect(0,0,38,38);const b=(x,y,w,h,color)=>{k.fillStyle=color;k.fillRect(x,y,w,h)};b(8,29,24,9,['#6d8e91','#ac8c74','#7385a2','#819b72'][i%4]);b(12,14,15,17,['#d3aa8b','#9a6e56','#b8826a','#dcba92'][i%4]);b(10,10,19,8,['#453c38','#75624b','#564f47','#322e2d'][i%4]);b(14,20,2,2,'#4f473f');b(23,20,2,2,'#4f473f');b(17,26,6,1,'#a66c5b');return c.toDataURL()};
})(window.OL);

