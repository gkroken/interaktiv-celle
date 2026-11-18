/* ---------------- PROTEINFOLDING ---------------- */
const FOLD=(()=>{const N=36,U=a=>[Math.cos(a),Math.sin(a)];
 function gen(o){const P=[];const [hx,hy]=U(o.aH),px=-hy,py=hx;
  for(let j=0;j<12;j++){const t=j*100*Math.PI/180,w=15*Math.cos(t);P[3+j]=[o.H0[0]+hx*j*9+px*w,o.H0[1]+hy*j*9+py*w,Math.sin(t)]}
  const [sx,sy]=U(o.aS),qx=-sy*o.side,qy=sx*o.side;
  for(let k=0;k<6;k++){const z=k%2?2.5:-2.5,bx=o.S0[0]+sx*k*17,by=o.S0[1]+sy*k*17;P[18+k]=[bx+qx*z,by+qy*z,0];P[32-k]=[bx+qx*(34-z),by+qy*(34-z),0]}
  const gap=(a,b,bul)=>{const A=P[a],B=P[b],dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy)||1,cx=(A[0]+B[0])/2+dy/L*bul,cy=(A[1]+B[1])/2-dx/L*bul,n=b-a;for(let i=1;i<n;i++){const t=i/n,v=1-t;P[a+i]=[v*v*A[0]+2*v*t*cx+t*t*B[0],v*v*A[1]+2*v*t*cy+t*t*B[1],0]}};
  gap(14,18,o.b1);gap(23,27,o.b2);
  const ext=(from,idx,a0)=>{let [x,y]=P[from];idx.forEach((k,i)=>{const a=a0+i*.38;x+=17*Math.cos(a);y+=17*Math.sin(a);P[k]=[x,y,0]})};
  ext(3,[2,1,0],o.lead);ext(32,[33,34,35],o.tail);
  const cx=P.reduce((s,p)=>s+p[0],0)/N,cy=P.reduce((s,p)=>s+p[1],0)/N;return P.map(p=>[p[0]-cx,p[1]-cy,p[2]])}
 const L1=gen({H0:[0,0],aH:0,S0:[150,30],aS:0,side:1,b1:14,b2:30,lead:Math.PI,tail:2.0});
 const L2=gen({H0:[95,-44],aH:Math.PI,S0:[0,0],aS:0,side:1,b1:-16,b2:30,lead:-1,tail:2.3});
 const T=(L,s,cx,cy,mx=1,my=1)=>L.map(p=>[cx+mx*s*p[0],cy+my*s*p[1],p[2]]);
 const K0=Array.from({length:N},(_,i)=>[400+(i-17.5)*19.5,300+(i%2?5:-5),0]);
 const K=[K0,T(L1,1.5,370,262),T(L2,1.75,370,265),T(L2,.95,250,200)];
 const R=rng(17),Kd=[];let x=120,y=240,h=.25;for(let i=0;i<N;i++){Kd.push([x,y,0]);if(x<90||x>560||y<140||y>420)h=Math.atan2(280-y,330-x)+(R()-.5);else h+=(R()-.5)*1.1;x+=18*Math.cos(h);y+=18*Math.sin(h)}
 const typ=Array(N).fill('P'),el=[];for(let i=3;i<=14;i++)el.push(i);for(let i=18;i<=23;i++)el.push(i);for(let i=27;i<=32;i++)el.push(i);
 const hc=el.filter(i=>i<=23).reduce((s,i)=>[s[0]+L2[i][0]/18,s[1]+L2[i][1]/18],[0,0]);
 el.slice().sort((a,b)=>Math.hypot(L2[a][0]-hc[0],L2[a][1]-hc[1])-Math.hypot(L2[b][0]-hc[0],L2[b][1]-hc[1])).slice(0,11).forEach(i=>typ[i]='H');
 const dist=(i,j)=>Math.hypot(L2[i][0]-L2[j][0],L2[i][1]-L2[j][1]);
 const bestAB=(A,B,sep)=>{let b=null,bd=1e9;A.forEach(i=>B.forEach(j=>{if(Math.abs(j-i)>sep){const d=dist(i,j);if(d<bd){bd=d;b=[i,j]}}}));return b};
 const free=()=>[...Array(N).keys()].filter(i=>typ[i]==='P');
 const cys=bestAB(free().filter(i=>i>=3&&i<=14),free().filter(i=>i>=18&&i<=32),6);typ[cys[0]]='C';typ[cys[1]]='C';
 const ion=bestAB(free().filter(i=>i<=17),free().filter(i=>i>=24),4);typ[ion[0]]='+';typ[ion[1]]='-';
 [1,8,16,25,34,30].forEach((i,k)=>{if(typ[i]==='P')typ[i]=k%2?'-':'+'});
 const arw=(Q,ids,w)=>{const A=Q[ids[0]],B=Q[ids[ids.length-1]];let dx=B[0]-A[0],dy=B[1]-A[1];const L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;const nx=-dy,ny=dx,s0=[A[0]-dx*4,A[1]-dy*4],e=[B[0]+dx*8,B[1]+dy*8],hh=[B[0]-dx*3,B[1]-dy*3];return [[s0[0]+nx*w,s0[1]+ny*w],[hh[0]+nx*w,hh[1]+ny*w],[hh[0]+nx*w*1.9,hh[1]+ny*w*1.9],e,[hh[0]-nx*w*1.9,hh[1]-ny*w*1.9],[hh[0]-nx*w,hh[1]-ny*w],[s0[0]-nx*w,s0[1]-ny*w]].map(q=>f1(q[0])+','+f1(q[1])).join(' ')};
 const sub=(mx,my,cx,cy,g,c1,c2)=>{const Q=T(L2,.95,cx,cy,mx,my);let o=`<polygon points="${arw(Q,[18,19,20,21,22,23],5)}" fill="${c1}" fill-opacity=".45" stroke="${c2}" stroke-width="1.2"/><polygon points="${arw(Q,[27,28,29,30,31,32],5)}" fill="${c1}" fill-opacity=".45" stroke="${c2}" stroke-width="1.2"/><path d="${smooth(Q.slice(3,15).map(p=>[p[0],p[1]]),false)}" fill="none" stroke="${c2}" stroke-width="6" opacity=".45" stroke-linecap="round"/><polyline points="${Q.map(p=>f1(p[0])+','+f1(p[1])).join(' ')}" fill="none" stroke="#6b7280" stroke-width="2.6" stroke-linejoin="round"/>`;Q.forEach(p=>o+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(5+.7*p[2])}" fill="url(#${g})" stroke="rgba(0,0,0,.35)" stroke-width=".9"/>`);return o};
 const lt=(x,y,t)=>`<text x="${x}" y="${y}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:24px;font-weight:650;fill:#1f2430">${t}</text>`;
 const quat=sub(-1,1,400,200,'gProtV','#c7b4e8','#6a5aa8')+sub(-1,-1,400,350,'gHbA','#f2a7a0','#a8443c')+sub(1,-1,250,350,'gProtV','#c7b4e8','#6a5aa8')+lt(150,208,'α')+lt(496,208,'β')+lt(496,358,'α')+lt(150,358,'β')+`<text x="40" y="474" class="pt" style="font-size:14px">Fire kjeder (2 α + 2 β) passer sammen – slik er hemoglobin bygd.</text>`;
 return{N,K,Kd,typ,cys,ion,quat,R:[8.5,8,8.5,5.5],SC:[1,1.5,1.75,.95],GF:{H:'gAaH',P:'gAaP','+':'gAaPos','-':'gAaNeg',C:'gAaC'},TX:{'+':'+','-':'−',C:'S'}}})();

S.protein=()=>{let s=`<rect width="800" height="600" fill="#f8f4ee"/>${title('Proteinfolding','Fra aminosyrekjede til ferdig protein – formen bestemmer hva proteinet gjør')}`;
 s+=P('tertiaer',`<g id="fCore"></g>`,{nl:1})+P('kvartaer',`<g id="fQ" opacity="0">${FOLD.quat}</g>`,{nl:1})+P('sekundaer',`<g id="fHx"></g>`,{nl:1})+P('betaflak',`<g id="fSh"></g>`,{nl:1})+P('hbinding',`<g id="fHb"></g>`,{nl:1})+P('peptidbinding',`<g id="fBb"></g>`,{nl:1})+P('ionebinding',`<g id="fIo"></g>`,{nl:1})+P('disulfid',`<g id="fSS"></g>`,{nl:1})+P('aminosyre',`<g id="fAa"></g>`,{nl:1});
 s+=`<g id="fLab" style="pointer-events:none"></g>`;
 const lg=(x,y,g,t,tx='')=>`<g transform="translate(${x},${y})"><circle r="8" fill="url(#${g})" stroke="rgba(0,0,0,.4)" stroke-width="1"/>${tx?`<text y="3.6" text-anchor="middle" style="font-size:10px;font-weight:700;fill:#fff">${tx}</text>`:''}<text x="14" y="4.5" class="pt" style="font-size:12.5px;font-weight:600">${t}</text></g>`;
 s+=lg(32,552,'gAaH','upolar (hydrofob)')+lg(186,552,'gAaP','polar')+lg(32,577,'gAaPos','positivt ladd','+')+lg(160,577,'gAaNeg','negativt ladd','−')+lg(292,577,'gAaC','cystein','S');
 return s};
LIVE.enzym={...LIVE.protein,pos:'tr'};
LIVE.protein={pos:'br',ctrl:`<div style="width:272px"><div class="cx-title">Fold proteinet</div><div class="cx-row">${['Primær','Sekundær','Tertiær','Kvartær'].map((t,i)=>`<button class="cbtn" data-lv="${i}">${i+1} ${t}</button>`).join('')}</div><div class="cx-row" style="margin-top:6px"><button class="cbtn" id="fPlay"></button><label class="cx-tog"><input type="checkbox" id="fDen"> Varme: denaturer</label></div><div class="cx-note" id="fN"></div></div>`,
init(){const D=FOLD,N=D.N,NS='http://www.w3.org/2000/svg';let f=0,ft=0,d=0,dg=0,play=ANIM,hold=0,tm=0,refold=false,lastKey='';
 const aa=q('#fAa'),bb=q('#fBb'),hx=q('#fHx'),sh=q('#fSh'),hb=q('#fHb'),io=q('#fIo'),ss=q('#fSS'),core=q('#fCore'),qq=q('#fQ'),lab=q('#fLab'),nt=cq('#fN'),pb=cq('#fPlay'),den=cq('#fDen');
 const beads=D.typ.map(t=>{const g=document.createElementNS(NS,'g');g.innerHTML=`<circle r="9" fill="url(#${D.GF[t]})" stroke="rgba(0,0,0,.4)" stroke-width="1.1"/>${D.TX[t]?`<text y="4" text-anchor="middle" style="font-size:11px;font-weight:700;fill:#fff">${D.TX[t]}</text>`:''}`;aa.appendChild(g);return g});
 const NOTE=['<b>Primærstruktur:</b> rekkefølgen av aminosyrer, bundet sammen med peptidbindinger. Rekkefølgen er bestemt av genet – og den avgjør hvordan resten av proteinet foldes.','<b>Sekundærstruktur:</b> deler av kjeden kveiles til α-helikser (lilla) eller legger seg side om side i β-flak (gule piler). Hydrogenbindinger i ryggraden (blå stiplet) holder formene på plass.','<b>Tertiærstruktur:</b> hele kjeden pakkes til en fast 3D-form. Upolare sidekjeder gjemmer seg i en hydrofob kjerne, borte fra vannet. Disulfidbroer (S–S) og ionebindinger låser formen.','<b>Kvartærstruktur:</b> flere ferdigfoldede kjeder går sammen til ett protein. Hemoglobin har fire kjeder: to α og to β.'];
 const DEN='<b>Denaturert:</b> varmen får kjeden til å riste så kraftig at hydrogenbindinger, ionebindinger og hydrofobe kontakter brytes. Primærstrukturen er intakt, men formen – og funksjonen – er borte.';
 const REF='<b>Avkjølt igjen:</b> mange små proteiner folder seg tilbake av seg selv (Anfinsens forsøk). Formen ligger «skrevet» i aminosyrerekkefølgen. Større proteiner, som i eggehvite, klumper seg i stedet.';
 const setPB=()=>{pb.textContent=play?'Pause':'▶ Fold alt';pb.classList.toggle('on',play)};setPB();
 const lv=n=>{play=false;refold=false;setPB();if(dg){dg=0;den.checked=false}ft=n};
 ctrl.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>lv(+b.dataset.lv));
 pb.onclick=()=>{play=!play;refold=false;if(play){if(dg){dg=0;den.checked=false}if(f>2.95){f=0;ft=0}hold=0}setPB()};
 den.onchange=e=>{dg=e.target.checked?1:0;play=false;setPB();refold=!e.target.checked};
 onSel=id=>{const m={aminosyre:0,sekundaer:1,betaflak:1,hbinding:1,tertiaer:2,hydrofob:2,disulfid:2,ionebinding:2,kvartaer:3};if(m[id]!=null)lv(m[id]);else if(id==='denaturering'){dg=1;den.checked=true;play=false;setPB()}};
 const lerp=(a,b,t)=>a+(b-a)*t,ptsS=P=>P.map(p=>f1(p[0])+','+f1(p[1])).join(' ');
 const arrow=(P,ids,w)=>{const A=P[ids[0]],B=P[ids[ids.length-1]];let dx=B[0]-A[0],dy=B[1]-A[1];const L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;const nx=-dy,ny=dx,s0=[A[0]-dx*7,A[1]-dy*7],e=[B[0]+dx*13,B[1]+dy*13],hh=[B[0]-dx*5,B[1]-dy*5];return [[s0[0]+nx*w,s0[1]+ny*w],[hh[0]+nx*w,hh[1]+ny*w],[hh[0]+nx*w*1.9,hh[1]+ny*w*1.9],e,[hh[0]-nx*w*1.9,hh[1]-ny*w*1.9],[hh[0]-nx*w,hh[1]-ny*w],[s0[0]-nx*w,s0[1]-ny*w]].map(q=>f1(q[0])+','+f1(q[1])).join(' ')};
 const cen=(P,ids)=>{let x=0,y=0;ids.forEach(i=>{x+=P[i][0];y+=P[i][1]});return[x/ids.length,y/ids.length]};
 const HX=[3,4,5,6,7,8,9,10,11,12,13,14],E1=[18,19,20,21,22,23],E2=[27,28,29,30,31,32],HI=D.typ.map((t,i)=>t==='H'?i:-1).filter(i=>i>=0);
 const lab_=(x,y,t,o,c='#1f2430')=>o>.03?`<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" class="lab" style="opacity:${f1(o)};fill:${c}">${t}</text>`:'';
 function draw(){const i=Math.min(2,Math.floor(f)),u=ez(f-i),A=D.K[i],B=D.K[i+1],ed=ez(d);
  const r=lerp(lerp(D.R[i],D.R[i+1],u),8,ed),sc=lerp(D.SC[i],D.SC[i+1],u);
  const P=A.map((p,k)=>{let x=lerp(p[0],B[k][0],u),y=lerp(p[1],B[k][1],u),z=lerp(p[2],B[k][2],u);if(ed>0){const w=D.Kd[k];x=lerp(x,w[0]+Math.sin(tm*3.1+k*1.7)*4,ed);y=lerp(y,w[1]+Math.cos(tm*2.7+k*2.3)*4,ed);z*=1-ed}return[x,y,z]});
  beads.forEach((g,k)=>{const [x,y,z]=P[k],rr=r*(1+.14*z);g.setAttribute('transform',`translate(${f1(x)},${f1(y)}) scale(${(rr/9).toFixed(3)})`);g.style.opacity=z<-.35?.8:1});
  const pts=ptsS(P);bb.innerHTML=`<polyline points="${pts}" class="hit"/><polyline points="${pts}" fill="none" stroke="#4b5563" stroke-width="${f1(Math.max(2.5,r*.5))}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const a0=(1-cl(f/.4))*(1-ed),a1=cl((f-.45)/.5)*(1-ed),a2=cl((f-1.45)/.5)*(1-ed)*(1-.55*cl((f-2.3)/.5)),a3=ez(cl(f-2))*(1-ed);
  hx.innerHTML=a1>.02?`<path d="${smooth(HX.map(k=>[P[k][0],P[k][1]]),false)}" fill="none" stroke="#9a7bcb" stroke-width="${f1(7*sc)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(.5*a1)}"/>${a1>.3?`<path d="${smooth(HX.map(k=>[P[k][0],P[k][1]]),false)}" class="hit"/>`:''}`:'';
  sh.innerHTML=a1>.02?[E1,E2].map(ids=>`<polygon points="${arrow(P,ids,5.5*sc)}" fill="#f2b630" fill-opacity="${f1(.45*a1)}" stroke="#b8862a" stroke-opacity="${f1(a1)}" stroke-width="1.5" stroke-linejoin="round"${a1<.3?' style="pointer-events:none"':''}/>`).join(''):'';
  let h='';if(a1>.02){const ln=(a,b)=>`<line x1="${f1(P[a][0])}" y1="${f1(P[a][1])}" x2="${f1(P[b][0])}" y2="${f1(P[b][1])}"/>`;for(let k=3;k<=10;k++)h+=ln(k,k+4);for(let k=0;k<6;k++)h+=ln(18+k,32-k);h=`<g stroke="#3e7cc4" stroke-width="1.7" stroke-dasharray="3 3" opacity="${f1(.85*a1)}">${h}</g>`}hb.innerHTML=h;
  const [c1,c2]=D.cys,[i1,i2]=D.ion;
  ss.innerHTML=a2>.02?`<line x1="${f1(P[c1][0])}" y1="${f1(P[c1][1])}" x2="${f1(P[c2][0])}" y2="${f1(P[c2][1])}" stroke="#8a7a10" stroke-width="7" stroke-linecap="round" opacity="${f1(a2)}"/><line x1="${f1(P[c1][0])}" y1="${f1(P[c1][1])}" x2="${f1(P[c2][0])}" y2="${f1(P[c2][1])}" stroke="#f0dc4a" stroke-width="4" stroke-linecap="round" opacity="${f1(a2)}"/>${a2>.3?`<line x1="${f1(P[c1][0])}" y1="${f1(P[c1][1])}" x2="${f1(P[c2][0])}" y2="${f1(P[c2][1])}" class="hit"/>`:''}`:'';
  io.innerHTML=a2>.02?`<line x1="${f1(P[i1][0])}" y1="${f1(P[i1][1])}" x2="${f1(P[i2][0])}" y2="${f1(P[i2][1])}" stroke="#7d5ba6" stroke-width="2.6" stroke-dasharray="2 5" stroke-linecap="round" opacity="${f1(a2)}"/>${a2>.3?`<line x1="${f1(P[i1][0])}" y1="${f1(P[i1][1])}" x2="${f1(P[i2][0])}" y2="${f1(P[i2][1])}" class="hit"/>`:''}`:'';
  if(a2>.02){const cc=cen(P,HI);let m=0;HI.forEach(k=>m=Math.max(m,Math.hypot(P[k][0]-cc[0],P[k][1]-cc[1])));core.innerHTML=`<ellipse cx="${f1(cc[0])}" cy="${f1(cc[1])}" rx="${f1(m*1.25+10)}" ry="${f1(m*1.05+10)}" fill="url(#gCore)" opacity="${f1(a2)}"${a2<.3?' style="pointer-events:none"':''}/>`}else core.innerHTML='';
  qq.setAttribute('opacity',f1(a3));qq.style.pointerEvents=a3>.3?'':'none';
  let L=lab_(P[0][0]-15,P[0][1]-12,'N',1,'#5d6472')+lab_(P[N-1][0]+15,P[N-1][1]-12,'C',1,'#5d6472');
  L+=lab_(P[3][0],P[3][1]+32,'aminosyre',a0)+lab_((P[9][0]+P[10][0])/2,P[9][1]-24,'peptidbinding',a0);
  const hcn=cen(P,HX),scn=cen(P,[...E1,...E2]);const la=a1*(1-a3);L+=lab_(hcn[0],hcn[1]-30*sc,'α-heliks',la,'#5b3f86')+lab_(scn[0],scn[1]+40*sc,'β-flak',la,'#8a5a10');
  const lb=a2*(1-a3);if(lb>.03){const cc=cen(P,HI);L+=lab_(cc[0],cc[1]+5,'hydrofob kjerne',lb,'#8a5a10')+lab_((P[c1][0]+P[c2][0])/2+30,(P[c1][1]+P[c2][1])/2,'S–S',lb,'#6e5f0c')+lab_((P[i1][0]+P[i2][0])/2,(P[i1][1]+P[i2][1])/2+20,'ionebinding',lb,'#5b3f86')}
  L+=lab_(300,470,'Denaturert – formen er borte',ed,'#a8352c');lab.innerHTML=L;
  const key=dg?'d':refold?'r':String(Math.round(ft));if(key!==lastKey){lastKey=key;nt.innerHTML=key==='d'?DEN:key==='r'?REF:NOTE[+key];ctrl.querySelectorAll('[data-lv]').forEach(b=>b.classList.toggle('on',!dg&&!refold&&+b.dataset.lv===Math.round(ft)))}}
 if(!ANIM){f=ft=2;play=false;setPB()}
 draw();
 return loop(dt=>{tm+=dt;const pf=f,pd=d;
  if(play&&!dg){if(Math.abs(f-ft)<.001){hold+=dt;if(hold>1.4){hold=0;if(ft<3)ft++;else{play=false;setPB()}}}}
  const sp=ANIM?.75:99;f+=Math.sign(ft-f)*Math.min(Math.abs(ft-f),dt*sp);d+=Math.sign(dg-d)*Math.min(Math.abs(dg-d),dt*(ANIM?.7:99));
  if(f!==pf||d!==pd||d>0||lastKey!==(dg?'d':refold?'r':String(Math.round(ft))))draw()})}};

S.enzym=()=>{let s=`<rect width="800" height="600" fill="#f8f4ee"/>${title('Enzymer','Et enzym er et protein med en form som passer til ett bestemt substrat')}`;
 s+=`<g transform="translate(10,-40)">`;
 s+=P('tertiaer',`<path id="eb" d="${ENZ.nb}" fill="#c9c2f0" stroke="#5a4fb0" stroke-width="3.5"/><path id="es" d="${ENZ.ns}" fill="none" stroke="#7b6fd0" stroke-width="9" stroke-linecap="round" opacity=".7"/>`,{lx:360,ly:420});
 s+=P('aktivtsete',`<path id="en" d="${ENZ.nn}" fill="none" stroke="#e07a2c" stroke-width="5" stroke-linejoin="round"/><polygon id="sA" points="0,-32 -42,-2 40,0" fill="#f2b630" stroke="#b8862a" stroke-width="2.5" stroke-linejoin="round" transform="translate(690,400)"/><polygon id="sB" points="-42,-2 0,32 40,0" fill="#f2b630" stroke="#b8862a" stroke-width="2.5" stroke-linejoin="round" transform="translate(690,400)"/>`,{lx:520,ly:470});
 s+=`</g><text x="24" y="560" class="rl" style="font-size:12.5px;font-weight:600">Substratet (gult) passer inn i det aktive setet (oransje) og spaltes i to produkter.</text><text x="24" y="578" class="rl" style="font-size:12.5px;font-weight:600">Prøv å endre temperaturen i hjørnet.</text>`;
 return s};
