/* ---------- scenes ---------- */
const S={};
S.dyrecelle=()=>{
 const mem="M400,40 C610,30 772,150 766,305 C760,462 612,566 404,560 C198,554 32,470 34,300 C36,138 196,50 400,40Z";
 const inC=(x,y)=>((x-400)/340)**2+((y-300)/235)**2<.82, near=(x,y,a,b,r)=>Math.hypot(x-a,y-b)<r;
 let s=P('cytoplasma',`<path d="${mem}" fill="#fbf1e1"/>`,{lx:110,ly:300});
 const sk=["M90,250 Q250,200 300,140","M520,95 Q560,230 715,250","M150,520 Q300,500 430,530","M600,510 Q650,430 745,390","M240,100 Q300,150 270,190","M470,330 Q520,300 560,330","M60,330 Q90,380 70,430"];
 s+=P('cytoskjelett',sk.map(d=>`<path d="${d}" class="hit"/><path d="${d}" fill="none" stroke="#d8ba8c" stroke-width="2"/>`).join(''),{lx:680,ly:470});
 s+=P('ribosom',ribs(scatter(11,42,(x,y)=>inC(x,y)&&!near(x,y,330,290,195)&&!near(x,y,585,185,80))),{lx:560,ly:300});
 const ser=["M80,415 C110,385 145,440 180,410 S240,380 270,420","M95,455 C135,435 165,485 205,458 S260,440 285,475","M120,500 C150,485 180,520 220,500"];
 s+=P('er',roughER(330,290,[128,148,168],-75,80)+ser.map(d=>`<path d="${d}" fill="none" stroke="#d98aa0" stroke-width="10" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f8dbe3" stroke-width="4" stroke-linecap="round"/>`).join(''),{lx:505,ly:300});
 s+=P('golgi',golgiG(585,165),{lx:585,ly:240});
 s+=P('kjerne',nucleusG(330,290,105,7),{lx:300,ly:330});
 s+=P('mitokondrie',mito(645,395,25)+mito(200,180,-35)+mito(470,480,8)+mito(695,245,78));
 s+=P('lysosom',lyso(724,345,13)+lyso(332,494,15),{lx:332,ly:524});
 const cen=`<rect x="-16" y="-7" width="32" height="14" rx="3" fill="#d7d0ec" stroke="#6a5aa8" stroke-width="2"/><path d="M-10,-7v14M-4,-7v14M2,-7v14M8,-7v14" stroke="#6a5aa8" stroke-width="1.2"/>`;
 s+=P('sentrioler',`<g transform="translate(470,104)">${cen}<g transform="translate(26,12) rotate(90)">${cen}</g></g>`);
 s+=`<g style="pointer-events:none"><circle r="5" fill="#f6cbd5" stroke="#c45a74" stroke-width="2" opacity="0"><animateMotion path="M512,268 Q550,255 572,228" dur="3.2s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.2s" begin="0s" repeatCount="indefinite"/></circle><circle r="5" fill="#f6cbd5" stroke="#c45a74" stroke-width="2" opacity="0"><animateMotion path="M512,268 Q550,255 572,228" dur="3.2s" begin="-1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.2s" begin="-1.6s" repeatCount="indefinite"/></circle><circle r="5" fill="#f9e6a6" stroke="#c79a1e" stroke-width="2" opacity="0"><animateMotion path="M600,150 Q640,110 652,66" dur="3.6s" begin="-0.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.6s" begin="-0.8s" repeatCount="indefinite"/></circle><circle r="5" fill="#f9e6a6" stroke="#c79a1e" stroke-width="2" opacity="0"><animateMotion path="M600,150 Q640,110 652,66" dur="3.6s" begin="-2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.6s" begin="-2.6s" repeatCount="indefinite"/></circle></g>`;
 s+=P('membran',`<path d="${mem}" fill="none" stroke="#c9895a" stroke-width="14"/><path d="${mem}" fill="none" stroke="#f3d9bd" stroke-width="5"/>`,{lx:400,ly:22});
 return s};
S.plantecelle=()=>{
 const vac="M330,115 C470,92 660,100 680,205 C700,315 690,450 590,485 C470,520 330,500 310,400 C295,300 270,145 330,115Z";
 let s=P('cellevegg',`<rect x="14" y="14" width="772" height="572" rx="34" fill="#dbe9c2" stroke="#6f8f3e" stroke-width="6"/><path d="M14,300 H42 M758,300 H786 M400,14 V42 M400,558 V586" stroke="#a9c47e" stroke-width="2"/>`,{lx:240,ly:28});
 s+=P('cytoplasma',`<rect x="42" y="42" width="716" height="516" rx="24" fill="#f6f3e2"/>`,{lx:270,ly:80});
 s+=P('ribosom',ribs(scatter(4,34,(x,y)=>x>58&&x<742&&y>58&&y<542&&((x-495)/215)**2+((y-300)/220)**2>1.05&&Math.hypot(x-170,y-175)>128&&Math.hypot(x-190,y-425)>55)),{lx:120,ly:420});
 s+=P('vakuole',`<path d="${vac}" fill="#d8ebf6" stroke="#5a9cc4" stroke-width="3"/><path d="M380,150 C470,135 600,140 630,200" fill="none" stroke="#fff" stroke-width="4" opacity=".6" stroke-linecap="round"/>`,{lx:500,ly:300});
 s+=P('er',roughER(170,175,[94,112],15,120),{lx:250,ly:250});
 s+=P('golgi',golgiG(190,420,.8),{lx:190,ly:470});
 s+=P('kjerne',nucleusG(170,175,72,3),{lx:150,ly:205});
 s+=P('kloroplast',chloro(430,66,3,.8)+chloro(600,70,-4,.8)+chloro(722,280,88,.78)+chloro(722,420,92,.78)+chloro(470,526,-2,.8)+chloro(640,516,8,.8)+chloro(85,330,85,.8)+chloro(300,530,0,.8),{lx:600,ly:110});
 s+=P('mitokondrie',mito(255,320,-40,.8)+mito(92,505,15,.8));
 s+=`<g style="pointer-events:none"><circle r="5" fill="#f6cbd5" stroke="#c45a74" stroke-width="2" opacity="0"><animateMotion path="M200,292 Q214,345 196,398" dur="3.2s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.2s" begin="0s" repeatCount="indefinite"/></circle><circle r="5" fill="#f6cbd5" stroke="#c45a74" stroke-width="2" opacity="0"><animateMotion path="M200,292 Q214,345 196,398" dur="3.2s" begin="-1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.2s" begin="-1.6s" repeatCount="indefinite"/></circle><circle r="5" fill="#f9e6a6" stroke="#c79a1e" stroke-width="2" opacity="0"><animateMotion path="M222,446 Q252,500 262,548" dur="3.6s" begin="-0.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.6s" begin="-0.8s" repeatCount="indefinite"/></circle><circle r="5" fill="#f9e6a6" stroke="#c79a1e" stroke-width="2" opacity="0"><animateMotion path="M222,446 Q252,500 262,548" dur="3.6s" begin="-2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="3.6s" begin="-2.6s" repeatCount="indefinite"/></circle></g>`;
 s+=P('membran',`<rect x="42" y="42" width="716" height="516" rx="24" fill="none" stroke="#c9895a" stroke-width="6"/>`,{lx:330,ly:56});
 return s};
S.kjerne=()=>{
 let s=`<rect width="800" height="600" fill="#fbf1e1"/><g opacity=".5">${roughER(400,300,[262,284],-40,40)}${roughER(400,300,[262,284],145,215)}</g>`;
 s+=`<circle cx="400" cy="300" r="213" fill="#efe6f9"/>`;
 const R=rng(5);let ch='',n=0,g=0;
 while(n<16&&g++<200){const a=R()*6.283,r=R()*165;let x=400+r*Math.cos(a),y=300+r*Math.sin(a);if(Math.hypot(x-470,y-245)<85)continue;n++;let d=`M${x|0},${y|0}`;for(let j=0;j<6;j++){const qx=x+(R()-.5)*70,qy=y+(R()-.5)*70;x+=(R()-.5)*60;y+=(R()-.5)*60;const dd=Math.hypot(x-400,y-300);if(dd>185){x=400+(x-400)*185/dd;y=300+(y-300)*185/dd}d+=` Q${qx|0},${qy|0} ${x|0},${y|0}`}ch+=`<path d="${d}" class="hit"/><path d="${d}" fill="none" stroke="#a284cc" stroke-width="4" stroke-linecap="round"/>`}
 s+=P('kromosom',ch,{lx:330,ly:380});
 let nu=`<circle cx="470" cy="245" r="62" fill="#6b4c98"/>`;scatter(2,40,(x,y)=>Math.hypot(x-470,y-245)<55).forEach(([x,y])=>nu+=`<circle cx="${x}" cy="${y}" r="2.4" fill="#a68ac9"/>`);
 s+=P('nukleolus',nu);
 let m=`<circle cx="400" cy="300" r="226" fill="none" stroke="#d9c6ef" stroke-width="26"/><circle cx="400" cy="300" r="239" fill="none" stroke="#7d5ba6" stroke-width="5"/><circle cx="400" cy="300" r="213" fill="none" stroke="#7d5ba6" stroke-width="5"/>`;
 for(let k=0;k<16;k++)m+=`<g transform="translate(400,300) rotate(${k*22.5+8})"><rect x="208" y="-8" width="36" height="16" rx="4" fill="#efe6f9" stroke="#7d5ba6" stroke-width="2.5"/></g>`;
 s+=P('kjernemembran',m,{lx:400,ly:55});
 return s};
S.kromosom=()=>{
 let s=`<rect width="800" height="600" fill="#f4eefb"/>`;
 const arm=(tx,rot,len)=>`<g transform="translate(${tx},300) rotate(${rot})"><rect x="-38" y="${-len}" width="76" height="${len}" rx="38" fill="#9a7bcb" stroke="#5b3f86" stroke-width="3"/>${[[-70,10],[-112,16],[-185,10]].map(([y,h])=>`<rect x="-36" y="${y}" width="72" height="${h}" fill="#5b3f86" opacity=".3"/>`).join('')}</g>`;
 // thread with nucleosomes
 const c1=[[330,74],[280,10],[140,30],[120,150]],c2=[[120,150],[105,210],[150,250],[125,300]];
 let h=`<path d="M330,74 C280,10 140,30 120,150 C105,210 150,250 125,300" fill="none" stroke="#5b3f86" stroke-width="3"/><path d="M330,74 C280,10 140,30 120,150 C105,210 150,250 125,300" class="hit"/>`;
 [c1,c2].forEach(c=>{for(let t=.08;t<1;t+=.14){const [x,y]=bez(c,t);h+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="12" fill="#c9b3e6" stroke="#5b3f86" stroke-width="2.5"/>`}});
 s+=P('histoner',h,{lx:215,ly:118});
 let d='',a='',b='';for(let y=300;y<=575;y+=3){a+=(y==300?'M':'L')+f1(125+17*Math.sin((y-300)/14))+','+y;b+=(y==300?'M':'L')+f1(125-17*Math.sin((y-300)/14))+','+y}
 for(let y=306;y<=572;y+=9){const x1=125+17*Math.sin((y-300)/14),x2=125-17*Math.sin((y-300)/14);if(Math.abs(x1-x2)>5)d+=`<line x1="${f1(x1)}" y1="${y}" x2="${f1(x2)}" y2="${y}" stroke="${['#e05a4f','#3e7cc4','#4caf6a','#e9a923'][y%4]}" stroke-width="3"/>`}
 s+=P('dna',`<rect x="95" y="300" width="60" height="280" class="hitc"/>`+d+`<path d="${a}" fill="none" stroke="#586579" stroke-width="3.5"/><path d="${b}" fill="none" stroke="#586579" stroke-width="3.5"/>`,{lx:200,ly:470});
 s+=P('kromatid',arm(388,-14,225)+arm(388,194,215),{lx:290,ly:420});
 s+=P('kromatid',arm(412,14,225)+arm(412,166,215),{lx:520,ly:420});
 s+=P('gen',`<rect x="-37" y="-150" width="74" height="24" fill="#f2b630" stroke="#b8862a" stroke-width="2"/>`,{t:'translate(412,300) rotate(14)',lx:540,ly:150});
 s+=P('sentromer',`<ellipse cx="400" cy="300" rx="34" ry="20" fill="#5b3f86"/>`,{lx:400,ly:345});
 s+=`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:13px;font-weight:600">Tegningen viser et duplisert kromosom (to søsterkromatider)</text>`;
 return s};
S.dna=()=>{
 const seq='ATGCGTACCGATTGCAAGTCGATCCGTA';
 let s=`<rect width="800" height="600" fill="#f2f5fa"/>`;
 const Y=(x,ph)=>300+115*Math.sin(2*Math.PI*(x-40)/260+ph);
 const pth=ph=>{let d='';for(let x=30;x<=770;x+=5)d+=(x==30?'M':'L')+x+','+f1(Y(x,ph));return d};
 const d1=pth(0),d2=pth(Math.PI);
 s+=P('ryggrad',`<path id="dBh" d="${d2}" class="hit"/><path id="dB" d="${d2}" fill="none" stroke="#8b97ab" stroke-width="11" stroke-linecap="round"/>`,{lx:200,ly:445});
 let r='',i=0;
 for(let x=50;x<=750;x+=22){const y1=Y(x,0),y2=Y(x,Math.PI);const bb=seq[i%seq.length];i++;const m=(y1+y2)/2;const op=Math.abs(y1-y2)<16?0:1;r+=`<line data-x="${x}" data-h="1" x1="${x}" y1="${f1(y1)}" x2="${x}" y2="${f1(m)}" stroke="${col[bb]}" stroke-width="9" opacity="${op}"/><line data-x="${x}" data-h="2" x1="${x}" y1="${f1(m)}" x2="${x}" y2="${f1(y2)}" stroke="${col[comp[bb]]}" stroke-width="9" opacity="${op}"/>`}
 s+=P('basepar',r,{lx:470,ly:300});
 let fr=`<path id="dFh" d="${d1}" class="hit"/><path id="dF" d="${d1}" fill="none" stroke="#586579" stroke-width="11" stroke-linecap="round"/><g id="dP">`;
 for(let x=39;x<=761;x+=22)fr+=`<circle data-x="${x}" cx="${x}" cy="${f1(Y(x,0))}" r="3.6" fill="#f7d774"/>`;
 s+=P('ryggrad',fr+'</g>',{lx:200,ly:445});
 const nx=358,ny1=Y(nx,0);
 s+=P('nukleotid',`<rect id="nuc" x="${nx-24}" y="290" width="48" height="${f1(ny1-290+16)}" rx="10" fill="#f2b630" fill-opacity=".18" stroke="#c98a10" stroke-width="3" stroke-dasharray="7 5"/>`,{lx:nx,ly:470});
 s+=`<g transform="translate(180,560)">${[['A','adenin'],['T','tymin'],['C','cytosin'],['G','guanin']].map(([b,n],k)=>`<g transform="translate(${k*120},0)"><circle r="10" fill="${col[b]}"/><text x="0" y="5" text-anchor="middle" class="in" style="font-size:12px">${b}</text><text x="16" y="5" class="rl" style="font-size:14px">${n}</text></g>`).join('')}</g>`;
 return s};
S.nukleotid=()=>{
 let s=`<rect width="800" height="600" fill="#f2f5fa"/>`;
 s+=`<line x1="245" y1="262" x2="335" y2="310" stroke="#5d6472" stroke-width="6"/><line x1="465" y1="300" x2="548" y2="258" stroke="#5d6472" stroke-width="6"/>`;
 s+=P('fosfat',`<circle cx="190" cy="235" r="64" fill="#f7d774" stroke="#b8902a" stroke-width="4"/><text x="190" y="248" text-anchor="middle" style="font-size:36px;font-weight:700;fill:#7a5c12">P</text>`+['0','90','180','270'].map(a=>`<g transform="translate(190,235) rotate(${+a+45})"><circle cx="0" cy="-64" r="12" fill="#f08a7a" stroke="#c0453b" stroke-width="2"/></g>`).join(''));
 const pent=(cx,cy,r)=>Array.from({length:5},(_,k)=>{const t=(-90+k*72)*Math.PI/180;return f1(cx+r*Math.cos(t))+','+f1(cy+r*Math.sin(t))}).join(' ');
 s+=P('deoksyribose',`<polygon points="${pent(400,335,78)}" fill="#f5b7a4" stroke="#c0614a" stroke-width="4" stroke-linejoin="round"/><circle cx="400" cy="257" r="12" fill="#f08a7a" stroke="#c0453b" stroke-width="2"/><text x="400" y="262" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#fff">O</text><text x="400" y="350" text-anchor="middle" style="font-size:15px;font-weight:700;fill:#7a3423">5 C</text>`);
 const hex=Array.from({length:6},(_,k)=>{const t=(30+k*60-90)*Math.PI/180;return f1(600+55*Math.cos(t))+','+f1(240+55*Math.sin(t))}).join(' ');
 s+=P('base',`<polygon points="${hex}" fill="#f3a59e" stroke="#c0453b" stroke-width="4" stroke-linejoin="round"/><polygon points="647.6,212.5 647.6,267.5 700,284.5 732,240 700,195.5" fill="#f3a59e" stroke="#c0453b" stroke-width="4" stroke-linejoin="round"/><text x="600" y="253" text-anchor="middle" style="font-size:36px;font-weight:700;fill:#8a2a22">A</text>`);
 s+=`<text x="190" y="340" text-anchor="middle" class="rl">Fosfatgruppe</text><text x="400" y="445" text-anchor="middle" class="rl">Sukker (deoksyribose)</text><text x="640" y="330" text-anchor="middle" class="rl">Nitrogenbase (her: adenin)</text>`;
 s+=`<text x="400" y="545" text-anchor="middle" class="rl" style="font-size:14px;font-weight:600">Fosfatet binder seg til sukkeret i neste nukleotid – slik dannes ryggraden i DNA-tråden.</text>`;
 return s};
S.gen=()=>{
 let s=`<rect width="800" height="600" fill="#f7f3ec"/><rect x="20" y="24" width="500" height="300" rx="24" fill="#efe6f9" stroke="#7d5ba6" stroke-width="3" stroke-dasharray="10 6"/><text x="40" y="54" class="rl">Cellekjernen</text><text x="560" y="54" class="rl">Cytoplasma</text>`;
 s+=`<rect x="160" y="78" width="230" height="96" rx="10" fill="#f2b630" opacity=".25"/><text x="275" y="72" text-anchor="middle" class="rl">Genet</text><text x="40" y="196" class="rl" style="font-size:13px">DNA</text>`;
 const bs='ATGCCGTATGCAATGCCGTAGCTTAGGCA';let d='';for(let i=0;i<30;i++){const x=56+i*14,b=bs[i%bs.length];d+=`<line x1="${x}" y1="104" x2="${x}" y2="125" stroke="${col[b]}" stroke-width="6"/><line x1="${x}" y1="125" x2="${x}" y2="146" stroke="${col[comp[b]]}" stroke-width="6"/>`}
 s+=d+`<path d="M48,102 H470 M48,148 H470" stroke="#586579" stroke-width="7" stroke-linecap="round"/>`;
 const seq='AUGGCUUACGGAUUCCCAAAGUAA';const X=i=>90+i*24+Math.floor(i/3)*8;
 s+=P('ribosom',`<ellipse cx="470" cy="506" rx="82" ry="24" fill="#b8c7e3" stroke="#5a6f9a" stroke-width="3"/>`);
 let m=`<path d="M290,162 C285,210 240,240 160,250" fill="none" stroke="#2f9e8f" stroke-width="5" stroke-linecap="round"/><path d="M150,262 C120,320 110,380 116,452" fill="none" stroke="#2f9e8f" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#arT)"><animate attributeName="stroke-dashoffset" values="26;0" dur="1s" repeatCount="indefinite"/></path><text x="132" y="390" class="rl" style="font-size:13px">ut gjennom en kjernepore</text><line x1="60" y1="480" x2="730" y2="480" stroke="#2f9e8f" stroke-width="5" stroke-linecap="round"/>`;
 for(let i=0;i<seq.length;i++)m+=letterBox(X(i),480,seq[i]);
 s+=P('mrna',m,{lx:640,ly:520});
 s+=P('kodon',`<rect x="74" y="462" width="80" height="36" rx="8" fill="#000" fill-opacity="0" stroke="#e05a4f" stroke-width="3.5"/>`,{lx:114,ly:525});
 const pts=[[470,402],[488,386],[508,374],[530,368],[554,366],[578,370],[600,380],[618,394]];
 let rb=`<ellipse cx="470" cy="440" rx="88" ry="36" fill="#8fa6cf" stroke="#5a6f9a" stroke-width="3" opacity=".96"/><polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#4b5563" stroke-width="4" stroke-linejoin="round"/>`;
 pts.forEach(([x,y],k)=>rb+=`<circle cx="${x}" cy="${y}" r="10" fill="${['#e05a4f','#e9a923','#4caf6a','#3e7cc4','#9a7bcb','#e88a3c','#3bb3a8','#d16a9a'][k]}" stroke="#333" stroke-width="1.2"/>`);
 s+=P('ribosom',rb,{lx:470,ly:445});
 s+=P('transkripsjon',`<ellipse cx="300" cy="125" rx="52" ry="40" fill="#9fd3c7" stroke="#2f8f7f" stroke-width="3" opacity=".95"/><text x="300" y="130" text-anchor="middle" style="font-size:13px;font-weight:700;fill:#1d5c52">RNA-pol.</text>${pill(400,215,'Transkripsjon','#e3f4f0','#2f8f7f')}`,{nl:1});
 s+=pill(470,566,'Translasjon','#e6ecf7','#5a6f9a');
 return s};
S.mitokondrie=()=>{
 let s=`<rect width="800" height="600" fill="#fbf1e1"/>`;
 s+=P('ytremembran',`<ellipse cx="400" cy="300" rx="350" ry="205" fill="#fde6d4" stroke="#c4683a" stroke-width="7"/>`,{lx:400,ly:113});
 let mx=`<ellipse cx="400" cy="300" rx="305" ry="165" fill="#f5c09c"/>`;
 scatter(3,34,(x,y)=>((x-400)/290)**2+((y-300)/150)**2<.8).forEach(([x,y])=>mx+=`<circle cx="${x}" cy="${y}" r="2.6" fill="#b36a43" opacity=".55"/>`);
 s+=P('matriks',mx,{lx:250,ly:300});
 let im=`<ellipse cx="400" cy="300" rx="305" ry="165" fill="none" stroke="#b4532a" stroke-width="6"/>`;
 for(let dx=-240;dx<=240;dx+=60){const yt=300-165*Math.sqrt(1-(dx/305)**2),h=110-Math.abs(dx)*.15;im+=`<rect x="${400+dx-12}" y="${f1(yt-3)}" width="24" height="${f1(h)}" rx="12" fill="#fde6d4" stroke="#b4532a" stroke-width="5"/>`}
 for(let dx=-210;dx<=210;dx+=60){const yb=300+165*Math.sqrt(1-(dx/305)**2),h=110-Math.abs(dx)*.15;im+=`<rect x="${400+dx-12}" y="${f1(yb+3-h)}" width="24" height="${f1(h)}" rx="12" fill="#fde6d4" stroke="#b4532a" stroke-width="5"/>`}
 s+=P('indremembran',im,{lx:430,ly:152});
 const loop=(x,y)=>`<path d="M${x-20},${y} C${x-20},${y-26} ${x+20},${y-26} ${x+20},${y} C${x+20},${y+24} ${x-14},${y+28} ${x-18},${y+6}" fill="none" stroke="#6b4c98" stroke-width="3"/><circle cx="${x}" cy="${y}" r="26" class="hitc"/>`;
 s+=P('mtdna',loop(400,300)+loop(580,300),{lx:490,ly:345});
 s+=`<text x="770" y="580" text-anchor="end" class="rl" style="font-size:13px;font-weight:600">Intermembranrommet ligger mellom ytre og indre membran</text>`;
 return s};
S.indremembran=()=>{
 let s=`<rect width="800" height="250" fill="#fde6d4"/><rect y="250" width="800" height="350" fill="#f5c09c"/><text x="20" y="32" class="rl">Intermembranrom – høy H⁺-konsentrasjon</text><text x="20" y="588" class="rl">Matriks – lav H⁺-konsentrasjon</text>`;
 s+=bilayer(255,345,[[82,178],[242,338],[382,478],[590,690]],'#e3a27c','#c4683a');
 const cx=(x,l)=>`<rect x="${x}" y="215" width="80" height="170" rx="26" fill="#a7c4e5" stroke="#4c74a8" stroke-width="3"/><text x="${x+40}" y="305" text-anchor="middle" style="font-size:20px;font-weight:700;fill:#2c4f80">${l}</text>`;
 const el=[0,1,2].map(i=>`<circle r="6.5" fill="#f2a516" stroke="#a86a00" stroke-width="1.5"><animateMotion dur="3s" begin="${-i}s" repeatCount="indefinite"><mpath href="#ep"/></animateMotion></circle>`).join('');
 s+=P('etkjede',`<ellipse cx="118" cy="400" rx="34" ry="24" fill="#a7c4e5" stroke="#4c74a8" stroke-width="3"/>${cx(90,'I')}${cx(250,'III')}${cx(390,'IV')}<circle cx="208" cy="322" r="14" fill="#f2d16b" stroke="#b8902a" stroke-width="2.5"/><text x="208" y="327" text-anchor="middle" class="pt">Q</text><circle cx="362" cy="226" r="14" fill="#f08a7a" stroke="#c0453b" stroke-width="2.5"/><text x="362" y="231" text-anchor="middle" class="pt">c</text><path id="ep" d="M130,340 C165,365 190,340 205,325 C232,302 262,330 292,300 C320,270 340,240 360,230 C385,218 410,262 428,300" fill="none" stroke="#d18a12" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#arY)"/>${el}<text x="232" y="290" style="font-size:16px;font-weight:700;fill:#a86a00">e⁻</text>`,{lx:290,ly:200});
 const rotor=`<g><animateTransform attributeName="transform" type="rotate" from="0 640 472" to="360 640 472" dur="1.6s" repeatCount="indefinite"/><path d="M640,472 L640,438 M640,472 L670,489 M640,472 L610,489" stroke="#3f8f68" stroke-width="6" stroke-linecap="round"/><circle cx="640" cy="472" r="9" fill="#3f8f68"/></g>`;
 const atp=[0,1].map(i=>`<g opacity="0"><animateMotion path="M700,470 L770,420" dur="1.6s" begin="${-i*.8}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.2;.7;1" dur="1.6s" begin="${-i*.8}s" repeatCount="indefinite"/><rect x="-20" y="-11" width="40" height="22" rx="11" fill="#3f8f68"/><text x="0" y="5" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#fff">ATP</text></g>`).join('');
 s+=P('atpsyntase',`<rect x="598" y="228" width="84" height="144" rx="16" fill="#9ad0b6" stroke="#3f8f68" stroke-width="3"/><rect x="632" y="372" width="16" height="60" fill="#9ad0b6" stroke="#3f8f68" stroke-width="3"/><ellipse cx="640" cy="472" rx="66" ry="44" fill="#9ad0b6" stroke="#3f8f68" stroke-width="3"/>${rotor}${atp}${pill(640,548,'ADP + Pᵢ → ATP','#e6f5ee','#3f8f68')}`,{lx:640,ly:430});
 const hm=(path,dur,beg)=>`<text text-anchor="middle" y="6" style="font-size:15px;font-weight:700;fill:#c0453b" opacity="0"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>H⁺</text>`;
 let hp='';[155,310,450].forEach((x,j)=>{hp+=`<line x1="${x}" y1="440" x2="${x}" y2="182" stroke="#c0453b" stroke-width="3" opacity=".55" marker-end="url(#arR)"/>`+hm(`M${x},450 V175`,2.4,-j*.7)+hm(`M${x},450 V175`,2.4,-j*.7-1.2)});
 [[60,90],[235,80],[385,110],[520,70],[545,175],[720,90],[750,185],[90,190]].forEach(([x,y])=>hp+=`<text x="${x}" y="${y}" text-anchor="middle" style="font-size:16px;font-weight:700;fill:#c0453b">H⁺</text>`);
 hp+=`<line x1="640" y1="140" x2="640" y2="418" stroke="#c0453b" stroke-width="3" opacity=".55" stroke-dasharray="8 5" marker-end="url(#arR)"/>`+hm('M640,140 V420',2,0)+hm('M640,140 V420',2,-1);
 s+=P('protoner',`<rect x="30" y="55" width="740" height="140" class="hitc"/>`+hp,{lx:460,ly:38});
 s+=P('nadh',pill(122,478,'NADH → NAD⁺','#fff','#4c74a8'),{nl:1});
 s+=P('oksygen',`<g id="o2p">${pill(440,478,'½ O₂ + 2 H⁺ → H₂O','#fff','#4c74a8')}</g>`,{nl:1});
 return s};
S.kloroplast=()=>{
 let s=`<rect width="800" height="600" fill="#f1f7e8"/><ellipse cx="400" cy="300" rx="355" ry="210" fill="#e3f2d3" stroke="#4f8a2b" stroke-width="6"/>`;
 let st=`<ellipse cx="400" cy="300" rx="338" ry="193" fill="#cfe8b4" stroke="#4f8a2b" stroke-width="3"/>`;
 scatter(9,26,(x,y)=>((x-400)/320)**2+((y-300)/175)**2<.9).forEach(([x,y])=>st+=`<circle cx="${x}" cy="${y}" r="2.2" fill="#3e5a8a" opacity=".6"/>`);
 s+=P('stroma',st,{lx:400,ly:150});
 const G=[[180,270],[290,345],[400,250],[510,335],[620,265]];let g='';
 for(let i=0;i<G.length-1;i++){const [a,b]=G[i],[c,d]=G[i+1];g+=`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#3d7a1f" stroke-width="8" stroke-linecap="round"/><line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#8cc56a" stroke-width="3"/>`}
 G.forEach(([x,y])=>{for(let k=0;k<7;k++)g+=`<rect x="${x-38}" y="${y-42+k*12}" width="76" height="10.5" rx="5.2" fill="#4f9a2e" stroke="#2d5e16" stroke-width="1.5"/>`});
 s+=P('tylakoid',g,{lx:400,ly:190});
 s+=P('stivelse',`<ellipse cx="250" cy="440" rx="34" ry="20" fill="#fffbea" stroke="#c9b98a" stroke-width="2.5"/><ellipse cx="560" cy="165" rx="28" ry="17" fill="#fffbea" stroke="#c9b98a" stroke-width="2.5"/><ellipse cx="660" cy="420" rx="24" ry="15" fill="#fffbea" stroke="#c9b98a" stroke-width="2.5"/>`,{lx:250,ly:478});
 const loop=(x,y)=>`<path d="M${x-16},${y} C${x-16},${y-22} ${x+16},${y-22} ${x+16},${y} C${x+16},${y+20} ${x-11},${y+23} ${x-14},${y+5}" fill="none" stroke="#6b4c98" stroke-width="3"/><circle cx="${x}" cy="${y}" r="22" class="hitc"/>`;
 s+=P('cpdna',loop(420,440)+loop(700,330),{lx:420,ly:482});
 return s};
S.tylakoid=()=>{
 let s=`<rect width="800" height="250" fill="#d4ebbd"/><rect y="250" width="800" height="350" fill="#eef7e4"/><text x="785" y="236" text-anchor="end" class="rl">Stroma</text><text x="20" y="588" class="rl">Tylakoidrommet – høy H⁺-konsentrasjon</text>`;
 s+=bilayer(255,345,[[107,223],[287,373],[437,553],[620,720]],'#8cc56a','#4f8a2b');
 const ps=(x,l)=>{let t=`<rect x="${x}" y="215" width="100" height="170" rx="30" fill="#5aa83a" stroke="#2d5e16" stroke-width="3"/>`;for(let i=0;i<4;i++)for(let j=0;j<6;j++)if((i+j)%2==0)t+=`<circle cx="${x+20+i*20}" cy="${235+j*25}" r="4" fill="#1f4d10"/>`;return t+`<text x="${x+50}" y="306" text-anchor="middle" style="font-size:19px;font-weight:700;fill:#fff;paint-order:stroke;stroke:#2d5e16;stroke-width:3px">${l}</text>`};
 let sun=`<g id="sun"><circle cx="55" cy="55" r="28" fill="#f6c443"/>`;for(let k=0;k<8;k++){const t=k*Math.PI/4;sun+=`<line x1="${f1(55+36*Math.cos(t))}" y1="${f1(55+36*Math.sin(t))}" x2="${f1(55+48*Math.cos(t))}" y2="${f1(55+48*Math.sin(t))}" stroke="#e0a020" stroke-width="3" stroke-linecap="round"/>`}
 sun+=`<line x1="80" y1="88" x2="150" y2="206" stroke="#e0a020" stroke-width="3" opacity=".6" marker-end="url(#arY)"/><line x1="92" y1="70" x2="455" y2="208" stroke="#e0a020" stroke-width="3" opacity=".6" marker-end="url(#arY)"/><text x="120" y="125" style="font-size:15px;font-weight:700;fill:#a86a00">lys</text>`;
 const pho=(path,dur,beg)=>`<circle r="5.5" fill="#ffe066" stroke="#e0a020" stroke-width="1.5"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></circle>`;
 sun+=pho('M80,88 L150,206',1.1,0)+pho('M80,88 L150,206',1.1,-.55)+[0,1,2].map(i=>pho('M92,70 L455,208',2.1,-i*.7)).join('')+'</g>';
 s+=P('fotosystem',sun+ps(115,'PS II')+ps(445,'PS I'),{lx:165,ly:400});
 const el=[0,1,2].map(i=>`<circle r="6" fill="#f2a516" stroke="#a86a00" stroke-width="1.5"><animateMotion dur="2.6s" begin="${-i*.87}s" repeatCount="indefinite"><mpath href="#ep2"/></animateMotion></circle>`).join('');
 const hm=(path,dur,beg)=>`<text text-anchor="middle" y="6" style="font-size:15px;font-weight:700;fill:#c0453b" opacity="0"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>H⁺</text>`;
 s+=P('etktyl',`<rect x="295" y="222" width="70" height="156" rx="22" fill="#b9d7a0" stroke="#4f8a2b" stroke-width="3"/><text x="330" y="306" text-anchor="middle" style="font-size:18px;font-weight:700;fill:#2d5e16">b₆f</text><circle cx="405" cy="384" r="13" fill="#8fc0e0" stroke="#3d7fae" stroke-width="2.5"/><path id="ep2" d="M200,332 C240,352 270,342 298,322 C330,300 350,384 392,384 C420,384 440,352 452,330" fill="none" stroke="#d18a12" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#arY)"/>${el}<text x="240" y="380" style="font-size:16px;font-weight:700;fill:#a86a00">e⁻</text><line x1="330" y1="170" x2="330" y2="440" stroke="#c0453b" stroke-width="3" opacity=".55" marker-end="url(#arR)"/>${hm('M330,165 V445',2.4,0)}${hm('M330,165 V445',2.4,-1.2)}`,{lx:330,ly:470});
 let lum='';[[300,525],[385,470],[470,440],[560,505],[618,452],[700,500],[240,560]].forEach(([x,y])=>lum+=`<text x="${x}" y="${y}" text-anchor="middle" style="font-size:16px;font-weight:700;fill:#c0453b">H⁺</text>`);s+=lum;
 const o2=[0,1].map(i=>`<text text-anchor="middle" style="font-size:14px;font-weight:700;fill:#3d7fae" opacity="0"><animateMotion path="M110,478 L60,560" dur="3s" begin="${-i*1.5}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="3s" begin="${-i*1.5}s" repeatCount="indefinite"/>O₂</text>`).join('');
 s+=P('vannspalting',pill(165,452,'2 H₂O → O₂ + 4 H⁺','#fff','#3d7fae')+`<line x1="165" y1="436" x2="165" y2="392" stroke="#3d7fae" stroke-width="3" marker-end="url(#arD)"/>`+o2,{nl:1});
 const rotor=`<g><animateTransform attributeName="transform" type="rotate" from="0 670 130" to="360 670 130" dur="1.6s" repeatCount="indefinite"/><path d="M670,130 L670,98 M670,130 L698,146 M670,130 L642,146" stroke="#3f8f68" stroke-width="6" stroke-linecap="round"/><circle cx="670" cy="130" r="9" fill="#3f8f68"/></g>`;
 const atp=[0,1].map(i=>`<g opacity="0"><animateMotion path="M730,135 L780,175" dur="1.6s" begin="${-i*.8}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.2;.7;1" dur="1.6s" begin="${-i*.8}s" repeatCount="indefinite"/><rect x="-20" y="-11" width="40" height="22" rx="11" fill="#3f8f68"/><text x="0" y="5" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#fff">ATP</text></g>`).join('');
 s+=P('atpsyntase2',`<rect x="628" y="228" width="84" height="144" rx="16" fill="#9ad0b6" stroke="#3f8f68" stroke-width="3"/><rect x="662" y="170" width="16" height="60" fill="#9ad0b6" stroke="#3f8f68" stroke-width="3"/><ellipse cx="670" cy="130" rx="64" ry="42" fill="#9ad0b6" stroke="#3f8f68" stroke-width="3"/>${rotor}${atp}<line x1="670" y1="440" x2="670" y2="178" stroke="#c0453b" stroke-width="3" opacity=".55" stroke-dasharray="8 5" marker-end="url(#arR)"/>${hm('M670,445 V175',2,0)}${hm('M670,445 V175',2,-1)}${pill(670,60,'ADP + Pᵢ → ATP','#e6f5ee','#3f8f68')}`,{lx:670,ly:200});
 s+=P('nadph',pill(530,170,'NADP⁺ → NADPH','#fff','#2d5e16'),{nl:1});
 s+=P('calvin',`<g><animateTransform attributeName="transform" type="rotate" from="0 390 80" to="360 390 80" dur="6s" repeatCount="indefinite"/><path d="${arc(390,80,30,-60,240)}" fill="none" stroke="#4f8a2b" stroke-width="5" marker-end="url(#arD)"/></g><circle cx="390" cy="80" r="40" class="hitc"/><text x="390" y="86" text-anchor="middle" style="font-size:14px;font-weight:700;fill:#2d5e16">CO₂</text><text x="390" y="140" text-anchor="middle" style="font-size:13px;font-weight:700;fill:#2d5e16">Calvinsyklusen</text>`,{nl:1});
 return s};
S.membran=()=>{
 let s=`<rect width="800" height="232" fill="#e6f1f8"/><rect y="232" width="800" height="368" fill="#fbf1e1"/><text x="20" y="34" class="rl">Utsiden av cellen</text><text x="20" y="588" class="rl">Cytoplasma (innsiden)</text>`;
 s+=P('fosfolipid',`<rect x="0" y="228" width="800" height="144" class="hitc"/>`+bilayer(240,360,[[100,200],[265,375],[430,550],[615,705]],'#e8a07a','#c4783f'),{lx:60,ly:208});
 s+=P('kolesterol',[230,405,585,752,40].map((x,i)=>`<rect x="${x-6}" y="${i%2?300:262}" width="12" height="34" rx="6" fill="#f7d774" stroke="#b8902a" stroke-width="2"/>`).join(''),{lx:405,ly:395});
 const mov=(path,dur,beg,inner)=>`<g opacity="0"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>${inner}</g>`;
 const ion=`<circle r="6.5" fill="#3d7fae"/>`;
 s+=P('kanalprotein',`<line x1="150" y1="170" x2="150" y2="450" stroke="#3d7fae" stroke-width="2.5" stroke-dasharray="6 5" opacity=".6" marker-end="url(#arD)"/><rect x="110" y="215" width="32" height="170" rx="12" fill="#7fb5d9" stroke="#3d7fae" stroke-width="3"/><rect x="158" y="215" width="32" height="170" rx="12" fill="#7fb5d9" stroke="#3d7fae" stroke-width="3"/>${[0,1,2,3].map(i=>mov('M150,165 V455',3.2,-i*.8,ion)).join('')}${[[120,160],[175,140],[95,120],[200,175],[140,110]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="#3d7fae" opacity=".55"/>`).join('')}`,{lx:150,ly:480});
 const glu=`<polygon points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" fill="#f2b630" stroke="#b8862a" stroke-width="1.5"/>`;
 s+=P('baererprotein',`<path d="M282,215 C258,262 262,338 282,385 L358,385 C378,338 382,262 358,215 Z" fill="#a1c9a0" stroke="#4f8a4d" stroke-width="3"/><ellipse cx="320" cy="300" rx="22" ry="28" fill="#e6f1f8" stroke="#4f8a4d" stroke-width="2"><animate attributeName="rx" values="22;16;22" dur="4.2s" repeatCount="indefinite"/></ellipse><g><animateTransform attributeName="transform" type="translate" values="320,165;320,300;320,300;320,440" keyTimes="0;.38;.62;1" dur="4.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;.1;.5;.9;1" dur="4.2s" repeatCount="indefinite"/>${glu}</g><line x1="368" y1="175" x2="368" y2="430" stroke="#4f8a4d" stroke-width="2.5" stroke-dasharray="6 5" opacity=".6" marker-end="url(#arD)"/>`,{lx:320,ly:480});
 const na=`<circle r="8" fill="#e07a2c"/><text y="4" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#fff">Na</text>`,k=`<circle r="8" fill="#8c6bd1"/><text y="4" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#fff">K</text>`;
 s+=P('pumpe',`<ellipse cx="490" cy="300" rx="54" ry="90" fill="#e8a6b8" stroke="#b04f6c" stroke-width="3"><animate attributeName="rx" values="54;46;54" dur="2.7s" repeatCount="indefinite"/></ellipse><line x1="466" y1="400" x2="466" y2="168" stroke="#e07a2c" stroke-width="2.5" opacity=".6" marker-end="url(#arD)"/><line x1="514" y1="170" x2="514" y2="410" stroke="#8c6bd1" stroke-width="2.5" opacity=".6" marker-end="url(#arD)"/>${[0,1,2].map(i=>mov('M466,345 V125',2.7,-i*.9,na)).join('')}${[0,1].map(i=>mov('M514,150 V450',2.7,-i*1.35,k)).join('')}<text x="420" y="122" class="pt" style="fill:#b85a14">3 Na⁺ ut</text><text x="540" y="468" class="pt" style="fill:#6a4fb0">2 K⁺ inn</text>${pill(440,515,'ATP → ADP','#fff','#b04f6c')}`,{lx:490,ly:300});
 let gs=`<rect x="635" y="215" width="50" height="170" rx="22" fill="#c7b4e8" stroke="#6a5aa8" stroke-width="3"/><path d="M660,215 V150 M660,170 L640,140 M660,170 L680,140 M640,140 L630,115 M680,140 L690,115" stroke="#b8902a" stroke-width="2.5"/>`;
 [[660,200],[660,180],[660,160],[640,140],[680,140],[630,115],[690,115]].forEach(([x,y])=>gs+=`<polygon points="${x},${y-7} ${x+6},${y-3.5} ${x+6},${y+3.5} ${x},${y+7} ${x-6},${y+3.5} ${x-6},${y-3.5}" fill="#f2b630" stroke="#b8902a" stroke-width="1.5"/>`);
 gs+=`<g><animateTransform attributeName="transform" type="translate" values="760,60;700,105;700,105;760,60" keyTimes="0;.4;.7;1" dur="5s" repeatCount="indefinite"/><path d="M-9,-9 L9,-9 L0,9Z" fill="#d16a9a" stroke="#8a3a62" stroke-width="1.5"/></g>`;
 s+=P('glykoprotein',gs,{lx:660,ly:480});
 return s};
S.fosfolipid=()=>{
 let s=`<rect width="800" height="600" fill="#f4f8fb"/>`;
 const zz=(x0,y0,n,ang)=>{let p=[[x0,y0]],x=x0,y=y0;const dx=Math.sin(ang),dy=Math.cos(ang);for(let i=1;i<=n;i++){x+=dx*22;y+=dy*22;const o=(i%2?1:-1)*9;p.push([x+o*dy,y-o*dx])}return p};
 const L=zz(362,250,13,0);const R1=zz(438,250,5,0);const last=R1[R1.length-1];const R2=zz(last[0],last[1],8,-.55);
 const pd=p=>'M'+p.map(q=>f1(q[0])+','+f1(q[1])).join(' L');
 s+=P('mettet',`<path d="${pd(L)}" class="hit"/><path d="${pd(L)}" fill="none" stroke="#8a6d3b" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>`,{lx:300,ly:560});
 const kink=[R1[R1.length-2],last];
 s+=P('umettet',`<path d="${pd(R1)} ${pd(R2).replace('M',' L')}" class="hit"/><path d="${pd(R1)} ${pd(R2).replace('M',' L')}" fill="none" stroke="#8a6d3b" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/><line x1="${f1(kink[0][0]+12)}" y1="${f1(kink[0][1])}" x2="${f1(kink[1][0]+12)}" y2="${f1(kink[1][1])}" stroke="#c0453b" stroke-width="5" stroke-linecap="round"/><text x="${f1(last[0]+28)}" y="${f1(last[1]-8)}" style="font-size:13px;font-weight:700;fill:#c0453b">dobbeltbinding</text>`,{lx:600,ly:560});
 s+=P('glyserol',`<rect x="325" y="205" width="150" height="46" rx="12" fill="#f7d774" stroke="#b8902a" stroke-width="3"/><text x="400" y="234" text-anchor="middle" style="font-size:17px;font-weight:700;fill:#6e5310">Glyserol</text>`);
 s+=P('hode',`<line x1="400" y1="195" x2="400" y2="207" stroke="#5d6472" stroke-width="5"/><circle cx="400" cy="128" r="66" fill="#e8a07a" stroke="#b4532a" stroke-width="4"/><text x="400" y="124" text-anchor="middle" style="font-size:17px;font-weight:700;fill:#fff">Fosfat-</text><text x="400" y="144" text-anchor="middle" style="font-size:17px;font-weight:700;fill:#fff">gruppe</text><text x="400" y="80" text-anchor="middle" style="font-size:20px;font-weight:700;fill:#fff">–</text>`);
 s+=`<path d="M250,64 H240 V250 H250" fill="none" stroke="#3e7cc4" stroke-width="3"/><text x="228" y="150" text-anchor="end" class="rl" style="fill:#3e7cc4">Hydrofilt</text><text x="228" y="170" text-anchor="end" class="rl" style="font-weight:600;font-size:13px">trekkes mot vann</text><path d="M250,262 H240 V545 H250" fill="none" stroke="#8a6d3b" stroke-width="3"/><text x="228" y="400" text-anchor="end" class="rl" style="fill:#8a6d3b">Hydrofobt</text><text x="228" y="420" text-anchor="end" class="rl" style="font-weight:600;font-size:13px">skyr vann</text>`;
 let ins=`<g transform="translate(640,170)"><rect x="-10" y="-30" width="150" height="220" rx="14" fill="#fff" stroke="#e3dccd"/><text x="65" y="-8" text-anchor="middle" style="font-size:12.5px;font-weight:700;fill:#5d6472">I membranen:</text>`;
 for(let k=0;k<6;k++){const x=10+k*22;ins+=`<circle cx="${x}" cy="30" r="8" fill="#e8a07a"/><path d="M${x-3},38 V80 M${x+3},38 V80 M${x-3},100 V142 M${x+3},100 V142" stroke="#8a6d3b" stroke-width="2"/><circle cx="${x}" cy="150" r="8" fill="#e8a07a"/>`}
 ins+=`<text x="65" y="180" text-anchor="middle" style="font-size:12px;font-weight:600;fill:#5d6472">hoder ut, haler inn</text></g>`;
 return s+ins};
S.ribosom=()=>{
 let s=`<rect width="800" height="600" fill="#eef2f9"/><g transform="translate(0,-58)">`;
 s+=P('litensub',`<ellipse cx="400" cy="440" rx="205" ry="72" fill="#b8c7e3" stroke="#5a6f9a" stroke-width="3"/>`,{lx:400,ly:427});
 s+=P('storsub',`<path d="M185,385 C165,250 260,138 400,138 C540,138 635,250 615,385 Z" fill="#8fa6cf" stroke="#5a6f9a" stroke-width="3"/>`,{lx:545,ly:142});
 s+=['E','P','A'].map((l,i)=>`<text x="${RB.XP-80+i*80}" y="212" text-anchor="middle" style="font-size:15px;font-weight:700;fill:#fff;opacity:.75">${l}</text>`).join('');
 let m=`<line x1="-400" y1="400" x2="1100" y2="400" stroke="#2f9e8f" stroke-width="5" stroke-linecap="round"/>`;
 RB.CODONS.forEach((c,j)=>c.split('').forEach((b,q)=>m+=letterBox(64+80*j+(q-1)*24,400,b)));
 s+=P('mrna',`<g id="mr" transform="translate(${RB.XA-144},0)">${m}</g>`,{lx:700,ly:382});
 s+=P('trna',`<g id="tE"></g><g id="tP"></g><g id="tA"></g>`,{lx:575,ly:242});
 s+=P('kodon',`<rect x="${RB.XA-42}" y="386" width="84" height="28" rx="8" fill="#000" fill-opacity="0" stroke="#e05a4f" stroke-width="3.5"/>`,{lx:RB.XA,ly:374});
 s+=P('protein',`<g id="ch"></g>`,{lx:120,ly:30});
 return s+'</g>'};
S.protein=()=>{
 let s=`<rect width="800" height="600" fill="#f8f4ee"/>`;
 const cols=['#e05a4f','#e9a923','#4caf6a','#3e7cc4','#9a7bcb','#e88a3c','#3bb3a8','#d16a9a','#7a8b3a','#5a6f9a'];
 s+=`<text x="50" y="80" class="rl">1 · Primærstruktur</text><text x="470" y="80" class="rl">2 · Sekundærstruktur (α-heliks)</text><text x="300" y="262" class="rl">3 · Tertiærstruktur – ferdig foldet protein (her et enzym)</text>`;
 let links='',beads='';for(let i=0;i<10;i++){const x=70+i*36;if(i<9)links+=`<line x1="${x+12}" y1="135" x2="${x+24}" y2="135" stroke="#333" stroke-width="5"/>`;beads+=`<circle cx="${x}" cy="135" r="13" fill="${cols[i]}" stroke="#333" stroke-width="1.5"/>`}
 s+=P('peptidbinding',`<rect x="70" y="120" width="324" height="30" class="hitc"/>`+links,{lx:232,ly:180});
 s+=P('aminosyre',beads,{lx:232,ly:108});
 let hd='';for(let t=0;t<=1.0001;t+=.004){const w=2*Math.PI*6*t;hd+=(t==0?'M':'L')+f1(480+250*t+22*Math.cos(w))+','+f1(140+34*Math.sin(w))}
 s+=P('sekundaer',`<path d="${hd}" class="hit"/><path d="${hd}" fill="none" stroke="#7b6fd0" stroke-width="7" stroke-linecap="round"/>`,{lx:610,ly:200});
 s+=`<g transform="translate(70,0)">`;
 s+=P('tertiaer',`<path id="eb" d="${ENZ.nb}" fill="#c9c2f0" stroke="#5a4fb0" stroke-width="3.5"/><path id="es" d="${ENZ.ns}" fill="none" stroke="#7b6fd0" stroke-width="9" stroke-linecap="round" opacity=".7"/>`);
 s+=P('aktivtsete',`<path id="en" d="${ENZ.nn}" fill="none" stroke="#e07a2c" stroke-width="5" stroke-linejoin="round"/><polygon id="sA" points="0,-32 -42,-2 40,0" fill="#f2b630" stroke="#b8862a" stroke-width="2.5" stroke-linejoin="round" transform="translate(690,400)"/><polygon id="sB" points="-42,-2 0,32 40,0" fill="#f2b630" stroke="#b8862a" stroke-width="2.5" stroke-linejoin="round" transform="translate(690,400)"/>`);
 s+=`</g>`;
 return s};
S.er=()=>{
 let s=`<rect width="800" height="600" fill="#fbf1e1"/><path d="M0,0 H34 Q74,300 34,600 H0Z" fill="#eadff6" stroke="#7d5ba6" stroke-width="6"/>`;
 let r='';for(let i=0;i<4;i++){const base=110+i*58;const pts=[];for(let x=50;x<=500;x+=10)pts.push([x,base+12*Math.sin(x/45+i)]);const d='M'+pts.map(p=>p[0]+','+f1(p[1])).join(' L');r+=`<path d="${d}" fill="none" stroke="#c45a74" stroke-width="30" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f6cbd5" stroke-width="19" stroke-linecap="round"/>`;pts.forEach(([x,y])=>r+=`<circle cx="${x}" cy="${f1(y-20)}" r="4" fill="#3e5a8a"/><circle cx="${x+5}" cy="${f1(y+20)}" r="4" fill="#3e5a8a"/>`)}
 s+=P('ruer',r,{lx:280,ly:62});
 const sm=["M420,380 C480,340 540,420 600,380 S700,340 750,400","M440,470 C500,430 560,520 640,470 S720,440 760,500","M520,398 C510,440 530,450 540,480","M650,384 C640,420 670,440 660,465","M430,540 C500,520 560,560 640,540"];
 s+=P('glatter',sm.map(d=>`<path d="${d}" fill="none" stroke="#d98aa0" stroke-width="20" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f8dbe3" stroke-width="11" stroke-linecap="round"/>`).join(''),{lx:600,ly:585});
 const rb=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="13" ry="9" fill="#5a78ad"/><ellipse cx="${x+2}" cy="${y+11}" rx="10" ry="6.5" fill="#8fa6cf"/>`;
 s+=P('ribosom',rb(620,110)+rb(700,180)+rb(630,240)+rb(730,90)+rb(580,300),{lx:670,ly:62});
 s+=P('vesikkel',[[548,120,14],[566,190,12],[530,262,11],[390,330,10]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#f6cbd5" stroke="#c45a74" stroke-width="3"/>`).join(''));
 s+=`<text x="44" y="585" class="rl" style="font-size:13px;font-weight:600">← henger sammen med kjernemembranen</text>`;
 return s};
S.golgi=()=>{
 let s=`<rect width="800" height="600" fill="#fbf1e1"/><path d="M0,40 Q400,10 800,40" fill="none" stroke="#c9895a" stroke-width="10"/><text x="20" y="22" class="rl" style="font-size:13px">cellemembranen</text>`;
 let c='';for(let i=0;i<5;i++){const y=230+i*36,d=`M210,${y} Q400,${y-80} 590,${y}`;c+=`<path d="${d}" fill="none" stroke="#d9a62a" stroke-width="26" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f9e6a6" stroke-width="15" stroke-linecap="round"/>`}
 s+=P('cisterner',c,{lx:400,ly:300});
 const mv=(x,y,r,f,st,path,dur,beg,op='1;1;0',kt='0;.7;1')=>`<circle r="${r}" fill="${f}" stroke="${st}" stroke-width="3" opacity="0"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="${op}" keyTimes="${kt}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></circle>`;
 const pink=['#f6cbd5','#c45a74'],yel=['#f9e6a6','#c79a1e'];
 s+=P('cis',mv(0,0,13,...pink,'M320,500 L345,395',3.4,0,'0;1;1;0','0;.15;.8;1')+mv(0,0,14,...pink,'M420,540 L420,400',3.4,-1.1,'0;1;1;0','0;.15;.8;1')+mv(0,0,12,...pink,'M520,495 L490,395',3.4,-2.2,'0;1;1;0','0;.15;.8;1')+`<path d="M200,575 C300,555 500,590 640,565" fill="none" stroke="#c45a74" stroke-width="22" stroke-linecap="round"/><path d="M200,575 C300,555 500,590 640,565" fill="none" stroke="#f6cbd5" stroke-width="12" stroke-linecap="round"/><text x="560" y="500" class="rl" style="font-size:13px">fra ER (cis-siden)</text><rect x="300" y="396" width="240" height="154" class="hitc"/>`,{lx:420,ly:532});
 let tr=mv(0,0,13,...yel,'M265,190 L235,110',3.6,0,'0;1;1;0','0;.2;.8;1')+mv(0,0,15,...yel,'M400,160 L400,80',3.6,-1.2,'0;1;1;0','0;.2;.8;1')+mv(0,0,13,...yel,'M535,185 L650,60',3.6,-2.4,'0;1;1;0','0;.2;.85;1');
 tr+=[[640,14],[658,8],[668,22]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="3.5" fill="#c79a1e" opacity="0"><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.8;.9;1" dur="3.6s" begin="-2.4s" repeatCount="indefinite"/></circle>`).join('')+`<text x="600" y="130" class="rl" style="font-size:13px">ut fra trans-siden</text><rect x="210" y="50" width="460" height="118" class="hitc"/>`;
 s+=P('sekretorisk',tr,{lx:400,ly:70});
 return s};
S.cellevegg=()=>{
 let s=`<defs><clipPath id="cw"><rect x="300" y="0" width="200" height="600"/></clipPath></defs><rect width="800" height="600" fill="#f6f3e2"/>`;
 s+=`<text x="150" y="560" text-anchor="middle" class="rl">Celle 1</text><text x="650" y="560" text-anchor="middle" class="rl">Celle 2</text>${chloro(150,120,10,1)}${chloro(660,470,-20,1)}${mito(140,430,30,1)}`;
 let w=`<rect x="300" y="0" width="200" height="600" fill="#e3efcf"/><g clip-path="url(#cw)">`;for(let k=-200;k<800;k+=24)w+=`<line x1="300" y1="${k}" x2="500" y2="${k+130}" stroke="#a9c47e" stroke-width="3.2"/>`;for(let k=-100;k<900;k+=30)w+=`<line x1="300" y1="${k}" x2="500" y2="${k-100}" stroke="#c3d89f" stroke-width="2.6"/>`;w+='</g>';
 s+=P('cellulose',w,{lx:350,ly:90});
 s+=P('mellomlamell',`<rect x="394" y="0" width="12" height="600" fill="#c9a96e"/>`,{lx:400,ly:470});
 s+=`<line x1="298" y1="0" x2="298" y2="600" stroke="#c9895a" stroke-width="5"/><line x1="502" y1="0" x2="502" y2="600" stroke="#c9895a" stroke-width="5"/>`;
 s+=P('plasmodesmata',[190,380].map(y=>`<rect x="294" y="${y-13}" width="212" height="26" rx="6" fill="#f6f3e2" stroke="#c9895a" stroke-width="3"/><line x1="290" y1="${y}" x2="510" y2="${y}" stroke="#c45a74" stroke-width="3"/>`).join(''),{lx:400,ly:240});
 return s};
