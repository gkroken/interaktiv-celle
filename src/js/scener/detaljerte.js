/* ---------- detailed redraws ---------- */
S.dyrecelle=()=>{
 const mem="M400,40 C610,30 772,150 766,305 C760,462 612,566 404,560 C198,554 32,470 34,300 C36,138 196,50 400,40Z";
 const inC=(x,y)=>((x-400)/340)**2+((y-300)/235)**2<.84, near=(x,y,a,b,r)=>Math.hypot(x-a,y-b)<r;
 const NX=318,NY=300,NR=100,CX=476,CY=132;
 let s=P('cytoplasma',`<path d="${mem}" fill="url(#gCyto)"/><path d="${mem}" fill="url(#pGran)"/>`,{lx:105,ly:250});
 const R=rng(21),ends=[];for(let i=0;i<26;i++){const a=i/26*6.283+R()*.2;ends.push([+f1(400+340*Math.cos(a)*.92),+f1(300+238*Math.sin(a)*.92)])}
 s+=P('cytoskjelett',microtub(CX,CY,ends)+ends.map(([x,y])=>`<path d="M${CX},${CY} L${x},${y}" class="hit" style="stroke-width:6"/>`).join('')+`<path d="M70,360 Q120,380 160,350 M600,520 Q650,500 700,470 M250,80 Q300,60 350,70" fill="none" stroke="#b9925b" stroke-width="1" opacity=".5"/>`,{lx:690,ly:470});
 const rib=scatter(11,46,(x,y)=>inC(x,y)&&!near(x,y,NX,NY,180)&&!near(x,y,600,175,80));
 s+=P('ribosom',riboD(rib)+polysome(590,330,-20)+polysome(240,505,10,6)+polysome(660,470,30,4),{lx:560,ly:300});
 const ser=["M80,415 C100,395 128,420 150,405 S190,385 215,410 L240,395","M150,405 C160,430 140,450 165,470 S210,480 235,465","M95,455 C120,445 135,470 160,470","M215,410 C230,430 260,425 280,445","M240,395 C255,380 280,390 290,410"];
 s+=P('er',rerD(NX,NY,NR+11,11,5,-72,78,6.5,3)+tubes(ser,7),{lx:500,ly:300});
 s+=P('golgi',golgiD(600,176,1,-8),{lx:600,ly:250});
 s+=P('kjerne',nucleusD(NX,NY,NR,7),{lx:292,ly:340});
 s+=P('mitokondrie',mitoD(652,398,25)+mitoD(188,172,-35)+mitoD(470,482,8)+mitoD(706,252,78,.92)+mitoD(96,300,88,.85));
 s+=P('lysosom',lysoD(735,350,12)+lysoD(345,505,14)+lysoD(560,410,10),{lx:345,ly:533});
 s+=P('sentrioler',centrosome(CX,CY),{lx:CX+4,ly:CY-26});
 s+=`<g style="pointer-events:none">${[["M505,262 Q545,250 570,222",3.2,0,'gER','#b5536f'],["M505,262 Q545,250 570,222",3.2,-1.6,'gER','#b5536f'],["M620,140 Q650,105 660,64",3.6,-.8,'gGolgi','#a87b12'],["M620,140 Q650,105 660,64",3.6,-2.6,'gGolgi','#a87b12']].map(([p,d,b,f,st])=>`<circle r="5" fill="url(#${f})" stroke="${st}" stroke-width="1.2" opacity="0"><animateMotion path="${p}" dur="${d}s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></circle>`).join('')}</g>`;
 s+=P('membran',`<path d="${mem}" fill="none" stroke="#b77945" stroke-width="10"/><path d="${mem}" fill="none" stroke="#f6dcc1" stroke-width="4.5"/>`,{lx:400,ly:22});
 return s};
S.plantecelle=()=>{
 const vac="M330,115 C470,92 660,100 680,205 C700,315 690,450 590,485 C470,520 330,500 310,400 C295,300 270,145 330,115Z";
 let w=`<rect x="6" y="6" width="788" height="588" rx="38" fill="url(#gWall)" stroke="#7d9a4e" stroke-width="2"/><rect x="2" y="2" width="796" height="596" rx="40" fill="none" stroke="#a88b55" stroke-width="3"/>`;
 for(let k=0;k<44;k++){const t=k/44;w+=`<path d="M${f1(30+t*740)},10 l${f1(8+(k%3)*4)},26" stroke="#b9cf94" stroke-width="1.2"/><path d="M${f1(30+t*740)},590 l${f1(8+(k%3)*4)},-26" stroke="#b9cf94" stroke-width="1.2"/>`}
 for(let k=0;k<30;k++){const t=k/30;w+=`<path d="M10,${f1(40+t*520)} l26,${f1(6+(k%3)*4)}" stroke="#b9cf94" stroke-width="1.2"/><path d="M790,${f1(40+t*520)} l-26,${f1(6+(k%3)*4)}" stroke="#b9cf94" stroke-width="1.2"/>`}
 [[200,8,6,30],[560,8,6,30],[200,562,6,30],[560,562,6,30],[8,300,30,6],[762,200,30,6],[762,430,30,6]].forEach(([x,y,ww,hh])=>w+=`<rect x="${x-ww/2}" y="${y-hh/2+(hh>ww?hh/2:0)}" width="${ww}" height="${hh}" fill="#f4f1dc" stroke="#b77945" stroke-width="1"/>`);
 let s=P('cellevegg',w,{lx:300,ly:26});
 s+=P('cytoplasma',`<rect x="40" y="40" width="720" height="520" rx="26" fill="url(#gCytoP)"/><rect x="40" y="40" width="720" height="520" rx="26" fill="url(#pGranG)"/>`,{lx:270,ly:82});
 s+=P('ribosom',riboD(scatter(4,40,(x,y)=>x>58&&x<742&&y>58&&y<542&&((x-495)/215)**2+((y-300)/220)**2>1.05&&Math.hypot(x-170,y-175)>132&&Math.hypot(x-190,y-425)>60))+polysome(230,360,70,5),{lx:120,ly:420});
 s+=P('vakuole',`<path d="${vac}" fill="url(#gVac)" stroke="#3f86b5" stroke-width="2.6" filter="url(#sh)"/><path d="${vac}" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".6" transform="translate(495,300) scale(.985) translate(-495,-300)"/><path d="M380,150 C470,135 600,140 630,200" fill="none" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/>${[[420,330,5],[560,260,4],[520,410,6],[610,370,3.5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#9cc6e2" opacity=".5"/>`).join('')}`,{lx:500,ly:300});
 s+=P('er',rerD(170,175,83,10,4,10,125,6,5),{lx:262,ly:258});
 s+=P('golgi',golgiD(192,425,.78,-6),{lx:192,ly:478});
 s+=P('kjerne',nucleusD(170,175,72,3,{pores:10}),{lx:150,ly:210});
 s+=P('kloroplast',chloroD(430,68,3,.82)+chloroD(600,70,-4,.82)+chloroD(724,280,88,.8)+chloroD(724,420,92,.8)+chloroD(470,527,-2,.82)+chloroD(640,517,8,.82)+chloroD(84,330,85,.82)+chloroD(300,531,0,.82),{lx:600,ly:112});
 s+=P('mitokondrie',mitoD(255,322,-40,.8)+mitoD(92,505,15,.8));
 s+=`<g style="pointer-events:none">${[["M200,292 Q214,345 196,398",3.2,0,'gER','#b5536f'],["M200,292 Q214,345 196,398",3.2,-1.6,'gER','#b5536f'],["M222,446 Q252,500 262,548",3.6,-.8,'gGolgi','#a87b12'],["M222,446 Q252,500 262,548",3.6,-2.6,'gGolgi','#a87b12']].map(([p,d,b,f,st])=>`<circle r="5" fill="url(#${f})" stroke="${st}" stroke-width="1.2" opacity="0"><animateMotion path="${p}" dur="${d}s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></circle>`).join('')}</g>`;
 s+=P('membran',`<rect x="40" y="40" width="720" height="520" rx="26" fill="none" stroke="#b77945" stroke-width="6.5"/><rect x="40" y="40" width="720" height="520" rx="26" fill="none" stroke="#f6dcc1" stroke-width="2.4"/>`,{lx:330,ly:56});
 return s};
S.kjerne=()=>{
 const cx=400,cy=300,r=228;
 let s=`<rect width="800" height="600" fill="url(#gCyto)"/><rect width="800" height="600" fill="url(#pGran)"/>`;
 s+=`<g opacity=".9">${rerD(cx,cy,r+26,18,3,-38,38,10,2)}${rerD(cx,cy,r+26,18,3,142,218,10,4)}${rerD(cx,cy,r+26,18,2,250,290,10,6)}</g>`;
 [[-30,256],[210,256],[270,256]].forEach(([a])=>{});
 s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gNuc)"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#pNuc)"/>`;
 const R=rng(5);let ch='';
 for(let i=0;i<34;i++){const a=i/34*6.283+R()*.15,d=r*(.86+R()*.05);ch+=`<path d="${blob(cx+d*Math.cos(a),cy+d*Math.sin(a),12+R()*14,R)}" fill="#8f6cbf" opacity=".55"/>`}
 for(let i=0;i<9;i++){const a=R()*6.283,d=r*(.2+R()*.45);if(Math.hypot(cx+d*Math.cos(a)-470,cy+d*Math.sin(a)-245)<95)continue;ch+=`<path d="${blob(cx+d*Math.cos(a),cy+d*Math.sin(a),12+R()*12,R)}" fill="#8f6cbf" opacity=".42"/>`}
 let n=0,g=0;while(n<22&&g++<300){const a=R()*6.283,rr=R()*170;let x=cx+rr*Math.cos(a),y=cy+rr*Math.sin(a);if(Math.hypot(x-470,y-245)<85)continue;n++;const p=[[x,y]];for(let j=0;j<6;j++){x+=(R()-.5)*55;y+=(R()-.5)*55;const dd=Math.hypot(x-cx,y-cy);if(dd>185){x=cx+(x-cx)*185/dd;y=cy+(y-cy)*185/dd}p.push([x,y])}const d=smooth(p,false);ch+=`<path d="${d}" class="hit"/><path d="${d}" fill="none" stroke="#a284cc" stroke-width="2.6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#7d5ba6" stroke-width="1" stroke-dasharray="1.5 3" stroke-linecap="round"/>`}
 s+=P('kromosom',ch,{lx:330,ly:390});
 let nu=`<path d="${blob(470,245,66,rng(9),11,.18)}" fill="url(#gNucl)" filter="url(#sh)"/>`;scatter(2,70,(x,y)=>Math.hypot(x-470,y-245)<56).forEach(([x,y])=>nu+=`<circle cx="${x}" cy="${y}" r="1.8" fill="#c7b2e6" opacity=".75"/>`);[[455,232,12],[488,262,10],[478,222,8]].forEach(([x,y,r])=>nu+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#b7a0dc" opacity=".8"/><circle cx="${x}" cy="${y}" r="${r*.55}" fill="#d9ccef" opacity=".8"/>`);
 s+=P('nukleolus',nu);
 let m=`<circle cx="${cx}" cy="${cy}" r="${r+8}" fill="none" stroke="#e7dcf4" stroke-width="14"/><circle cx="${cx}" cy="${cy}" r="${r+15}" fill="none" stroke="#5b3f86" stroke-width="3.5"/><circle cx="${cx}" cy="${cy}" r="${r+1}" fill="none" stroke="#5b3f86" stroke-width="3.5"/>`;
 for(let k=0;k<18;k++){const a=k*20+6;m+=`<g transform="translate(${cx},${cy}) rotate(${a})"><rect x="${r-2}" y="-9" width="20" height="18" fill="#efe4fa"/><rect x="${r-3}" y="-12" width="22" height="4" rx="2" fill="#4a2f73"/><rect x="${r-3}" y="8" width="22" height="4" rx="2" fill="#4a2f73"/><path d="M${r-3},-8 C${r-16},-6 ${r-16},6 ${r-3},8" fill="none" stroke="#4a2f73" stroke-width="1.6"/><circle cx="${r+20}" cy="-7" r="2.2" fill="#4a2f73"/><circle cx="${r+20}" cy="7" r="2.2" fill="#4a2f73"/></g>`}
 s+=P('kjernemembran',m,{lx:400,ly:52});
 s+=`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px;font-weight:600">Mørke flekker = tett pakket kromatin · rosa sekker = ru ER som henger sammen med kjernemembranen</text>`;
 return s};
S.mitokondrie=()=>{
 let s=`<rect width="800" height="600" fill="url(#gCyto)"/><rect width="800" height="600" fill="url(#pGran)"/>`;
 s+=P('ytremembran',`<ellipse cx="400" cy="300" rx="352" ry="208" fill="url(#gMitoO)" stroke="#9c4a1d" stroke-width="5" filter="url(#sh)"/><ellipse cx="400" cy="300" rx="345" ry="201" fill="none" stroke="#f4cfae" stroke-width="2"/>`,{lx:400,ly:110});
 const M=mitoInner(318,178,11,.44,8);
 let mx=`<path d="${M.d}" fill="url(#gMitoM)" transform="translate(400,300)"/>`;
 scatter(3,60,(x,y)=>((x-400)/300)**2+((y-300)/160)**2<.85).forEach(([x,y],i)=>mx+=i%3?`<circle cx="${x}" cy="${y}" r="2" fill="#8a3f14" opacity=".45"/>`:`<circle cx="${x}" cy="${y}" r="3.2" fill="#3a5a92" opacity=".7"/>`);
 s+=P('matriks',mx,{lx:248,ly:300});
 let im=`<g transform="translate(400,300)"><path d="${M.d}" class="hit"/><path d="${M.d}" fill="none" stroke="#8c3f16" stroke-width="3.6" stroke-linejoin="round"/>`;
 M.folds.forEach(f=>{const L=Math.abs(f.tip-f.e);for(let k=16;k<L-8;k+=30){const y=f.e-f.s*k;for(const side of [-1,1]){const x=f.fx+side*(f.w+2.5);im+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x+side*5)}" y2="${f1(y)}" stroke="#2f7a52" stroke-width="1.6"/><circle cx="${f1(x+side*7.5)}" cy="${f1(y)}" r="2.8" fill="url(#gProtG)" stroke="#2f7a52" stroke-width=".8"/>`}}});
 s+=P('indremembran',im+'</g>',{lx:430,ly:150});
 const loop=(x,y)=>`<path d="M${x-22},${y} C${x-24},${y-26} ${x+18},${y-30} ${x+22},${y-4} C${x+26},${y+22} ${x-6},${y+30} ${x-16},${y+12} C${x-20},${y+6} ${x-10},${y-6} ${x},${y-2}" fill="none" stroke="#5b3f86" stroke-width="2.6"/><circle cx="${x}" cy="${y}" r="28" class="hitc"/>`;
 s+=P('mtdna',loop(390,300)+loop(590,300),{lx:490,ly:345});
 s+=`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px;font-weight:600">Grønne «knotter» på cristae = ATP-syntase · blå prikker = ribosomer · mellom membranene: intermembranrommet</text>`;
 return s};
S.kloroplast=()=>{
 let s=`<rect width="800" height="600" fill="#f1f7e8"/><ellipse cx="400" cy="300" rx="358" ry="214" fill="#e9f5dc" stroke="#3a7420" stroke-width="4.5" filter="url(#sh)"/>`;
 let st=`<ellipse cx="400" cy="300" rx="340" ry="196" fill="url(#gChl)" stroke="#4f8a2b" stroke-width="3"/><ellipse cx="400" cy="300" rx="340" ry="196" fill="url(#pGranG)"/>`;
 scatter(9,40,(x,y)=>((x-400)/320)**2+((y-300)/175)**2<.9).forEach(([x,y],i)=>st+=i%4?`<circle cx="${x}" cy="${y}" r="2.6" fill="#3a5a92" opacity=".65"/>`:`<circle cx="${x}" cy="${y}" r="5" fill="#3d3a1a" opacity=".5"/>`);
 s+=P('stroma',st,{lx:400,ly:140});
 const G=[[170,280,7],[270,355,8],[380,250,9],[490,340,7],[600,262,8],[300,195,5],[540,420,5]];let g='';
 const lam=(a,b)=>{const [x1,y1]=a,[x2,y2]=b;return `<path d="M${x1},${y1} L${x2},${y2}" stroke="#2c6414" stroke-width="9" stroke-linecap="round"/><path d="M${x1},${y1} L${x2},${y2}" stroke="#7cc152" stroke-width="4.5" stroke-linecap="round"/>`};
 [[0,1],[1,2],[2,3],[3,4],[2,5],[3,6],[1,5]].forEach(([i,j])=>g+=lam([G[i][0]+(i<j?20:-20),G[i][1]+10],[G[j][0]+(i<j?-20:20),G[j][1]-10]));
 G.forEach(([x,y,n])=>{const h=11.5,top=y-n*h/2;g+=`<g filter="url(#sh)">`;for(let k=0;k<n;k++){const yy=top+k*h;g+=`<rect x="${x-40}" y="${f1(yy)}" width="80" height="${h-1.5}" rx="${(h-1.5)/2}" fill="url(#gGranaL)" stroke="#1f4d0c" stroke-width="1"/><line x1="${x-30}" y1="${f1(yy+2.4)}" x2="${x+30}" y2="${f1(yy+2.4)}" stroke="#b6e58f" stroke-width="1.2" opacity=".7"/>`}g+='</g>'});
 s+=P('tylakoid',g,{lx:380,ly:182});
 const starch=(x,y,rx,ry)=>`<g filter="url(#sh)"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#gStarch)" stroke="#bfae76" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="${rx*.65}" ry="${ry*.6}" fill="none" stroke="#d8cb9b" stroke-width="1.2"/><ellipse cx="${x}" cy="${y}" rx="${rx*.32}" ry="${ry*.3}" fill="none" stroke="#d8cb9b" stroke-width="1.2"/></g>`;
 s+=P('stivelse',starch(230,450,36,21)+starch(640,165,28,17)+starch(670,420,24,15),{lx:230,ly:488});
 const loop=(x,y)=>`<path d="M${x-18},${y} C${x-18},${y-24} ${x+16},${y-26} ${x+18},${y-2} C${x+20},${y+20} ${x-6},${y+26} ${x-14},${y+8}" fill="none" stroke="#5b3f86" stroke-width="2.6"/><circle cx="${x}" cy="${y}" r="24" class="hitc"/>`;
 s+=P('cpdna',loop(420,450)+loop(705,330),{lx:420,ly:492});
 s+=`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px;font-weight:600">Stablene av tylakoider kalles grana · tynne forbindelser = stromalameller · mørke prikker = fettdråper</text>`;
 return s};
S.er=()=>{
 let s=`<rect width="800" height="600" fill="url(#gCyto)"/><rect width="800" height="600" fill="url(#pGran)"/><path d="M0,0 H40 Q86,300 40,600 H0Z" fill="url(#gNuc)" stroke="#5b3f86" stroke-width="5"/><path d="M0,0 H28 Q72,300 28,600 H0Z" fill="none" stroke="#5b3f86" stroke-width="3"/>`;
 let r='';for(let i=0;i<5;i++){const base=96+i*50,ph=i*.9;const top=[],bot=[];for(let x=56;x<=510-i*14;x+=8){const y=base+11*Math.sin(x/48+ph);top.push([x,y-8]);bot.push([x,y+8])}const d='M'+top.map(p=>p.map(f1).join(',')).join(' L')+` Q${f1(top.at(-1)[0]+12)},${f1((top.at(-1)[1]+bot.at(-1)[1])/2)} `+bot.slice().reverse().map(p=>p.map(f1).join(',')).join(' L')+` Q${f1(top[0][0]-14)},${f1((top[0][1]+bot[0][1])/2)} ${f1(top[0][0])},${f1(top[0][1])}Z`;
  r+=`<path d="${d}" fill="url(#gER)" stroke="#a84966" stroke-width="2" filter="url(#sh)"/><path d="${'M'+top.map(p=>f1(p[0])+','+f1(p[1]+3)).join(' L')}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".55"/>`;
  top.forEach(([x,y],k)=>{if(k%1==0)r+=`<circle cx="${x}" cy="${f1(y-5)}" r="3.6" fill="#3a5a92"/><circle cx="${x+1.3}" cy="${f1(y-9.5)}" r="2.4" fill="#6f8bc0"/>`});bot.forEach(([x,y],k)=>{r+=`<circle cx="${x+4}" cy="${f1(y+5)}" r="3.6" fill="#3a5a92"/><circle cx="${x+5.3}" cy="${f1(y+9.5)}" r="2.4" fill="#6f8bc0"/>`})}
 s+=P('ruer',r,{lx:280,ly:60});
 const sm=["M410,370 C470,330 540,410 600,370 S700,330 760,390","M430,470 C490,430 560,520 640,470 S720,440 770,500","M520,388 C510,430 530,450 540,482","M650,374 C640,420 670,440 660,465","M420,545 C500,520 560,565 650,540","M600,370 C610,330 640,320 660,300","M540,482 C520,510 500,520 480,540"];
 s+=P('glatter',tubes(sm,15),{lx:600,ly:588});
 const rb=(x,y,s2=1)=>`<g transform="translate(${x},${y}) scale(${s2})" filter="url(#sh)"><ellipse cx="0" cy="0" rx="13" ry="9" fill="url(#gRibL)"/><ellipse cx="2" cy="11" rx="10" ry="6.5" fill="url(#gRibS)"/></g>`;
 s+=P('ribosom',rb(625,110)+rb(705,180)+rb(640,236)+rb(735,95)+`<path d="M560,300 C600,285 640,310 690,295" fill="none" stroke="#5f6f96" stroke-width="1.5"/>`+rb(575,293,.8)+rb(605,293,.8)+rb(635,300,.8)+rb(665,298,.8),{lx:680,ly:60});
 s+=P('vesikkel',[[548,120,13],[566,190,11],[530,262,10],[388,330,9]].map(([x,y,r])=>`<g filter="url(#sh)"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#gER)" stroke="#a84966" stroke-width="2"/><ellipse cx="${x-r*.3}" cy="${y-r*.4}" rx="${r*.4}" ry="${r*.2}" fill="#fff" opacity=".5"/></g>`).join(''));
 s+=`<text x="54" y="588" class="rl" style="font-size:13px;font-weight:600">← cellekjernen: ER henger sammen med kjernemembranen</text>`;
 return s};
S.golgi=()=>{
 let s=`<rect width="800" height="600" fill="url(#gCyto)"/><rect width="800" height="600" fill="url(#pGran)"/><path d="M0,40 Q400,10 800,40" fill="none" stroke="#b77945" stroke-width="12"/><path d="M0,40 Q400,10 800,40" fill="none" stroke="#f6dcc1" stroke-width="5"/><text x="20" y="66" class="rl" style="font-size:13px">cellemembranen</text>`;
 let c='';for(let i=0;i<6;i++){const y=210+i*32,w=190-Math.abs(i-2.5)*10;const d=`M${400-w},${y-4} Q400,${y-84} ${400+w},${y-4} L${400+w},${y+6} Q400,${y-50} ${400-w},${y+6}Z`;c+=`<g filter="url(#sh)"><path d="${d}" fill="url(#gGolgi)" stroke="#9c7010" stroke-width="2.2" stroke-linejoin="round"/><circle cx="${400-w-4}" cy="${y+1}" r="13" fill="url(#gGolgi)" stroke="#9c7010" stroke-width="2"/><circle cx="${400+w+4}" cy="${y+1}" r="13" fill="url(#gGolgi)" stroke="#9c7010" stroke-width="2"/>${[-.5,-.15,.25].map(t=>`<ellipse cx="${f1(400+t*w*1.6)}" cy="${f1(y-36+Math.abs(t)*30)}" rx="7" ry="3" fill="#c79a2a" opacity=".45"/>`).join('')}</g>`}
 s+=P('cisterner',c,{lx:400,ly:300});
 const mv=(r,g,st,path,dur,beg,op='0;1;1;0',kt='0;.15;.8;1')=>`<g opacity="0"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="${op}" keyTimes="${kt}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><circle r="${r}" fill="url(#${g})" stroke="${st}" stroke-width="2"/><ellipse cx="${-r*.3}" cy="${-r*.4}" rx="${r*.4}" ry="${r*.2}" fill="#fff" opacity=".5"/></g>`;
 s+=P('cis',mv(13,'gER','#a84966','M320,505 L345,402',3.4,0)+mv(14,'gER','#a84966','M420,545 L420,406',3.4,-1.1)+mv(12,'gER','#a84966','M520,500 L490,402',3.4,-2.2)+`<path d="M190,575 C300,555 500,590 650,565" fill="none" stroke="#a84966" stroke-width="24" stroke-linecap="round"/><path d="M190,575 C300,555 500,590 650,565" fill="none" stroke="#f5bccb" stroke-width="16" stroke-linecap="round"/>${[220,260,300,340,380,420,460,500,540,580,620].map((x,i)=>`<circle cx="${x}" cy="${f1(560+(i%3)*2)}" r="3" fill="#3a5a92"/>`).join('')}<text x="580" y="505" class="rl" style="font-size:13px">fra ER (cis-siden)</text><rect x="300" y="404" width="240" height="146" class="hitc"/>`,{lx:420,ly:532});
 let tr=mv(13,'gGolgi','#9c7010','M262,180 L235,112',3.6,0,'0;1;1;0','0;.2;.8;1')+mv(15,'gGolgi','#9c7010','M400,148 L400,84',3.6,-1.2,'0;1;1;0','0;.2;.8;1')+mv(13,'gGolgi','#9c7010','M540,178 L650,62',3.6,-2.4,'0;1;1;0','0;.2;.85;1');
 tr+=[[640,16],[658,10],[668,24]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="#c79a1e" opacity="0"><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.8;.9;1" dur="3.6s" begin="-2.4s" repeatCount="indefinite"/></circle>`).join('')+`<text x="600" y="130" class="rl" style="font-size:13px">ut fra trans-siden</text><rect x="210" y="70" width="460" height="92" class="hitc"/>`;
 s+=P('sekretorisk',tr,{lx:400,ly:96});
 return s};
