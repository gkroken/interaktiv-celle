/* ---------------- NERVECELLE ---------------- */
const AXY=x=>300+16*Math.sin((x-300)/62);
const axPts=(x0,x1,st=4)=>{const p=[];for(let x=x0;x<x1;x+=st)p.push([x,AXY(x)]);p.push([x1,AXY(x1)]);return p};
const NV={SX:215,SY:290,my:[[316,380],[392,466],[478,552],[564,638]],nodes:[386,472,558],term:[[752,186],[772,262],[770,340],[748,414]]};
S.nervecelle=()=>{
 const {SX,SY}=NV,R=rng(31);let s=`<rect width="800" height="600" fill="#eef2f4"/><rect width="800" height="600" fill="url(#pGran)" opacity=".45"/>`;
 let o='',f='';const br=(x,y,a,len,w,d)=>{const x2=x+len*Math.cos(a),y2=y+len*Math.sin(a),mx=(x+x2)/2+(R()-.5)*len*.4,my=(y+y2)/2+(R()-.5)*len*.4,p=`M${f1(x)},${f1(y)} Q${f1(mx)},${f1(my)} ${f1(x2)},${f1(y2)}`;o+=`<path d="${p}" fill="none" stroke="#a8693a" stroke-width="${f1(w+2.6)}" stroke-linecap="round"/>`;f+=`<path d="${p}" class="hit"/><path d="${p}" fill="none" stroke="#f3cfa6" stroke-width="${f1(w)}" stroke-linecap="round"/>`;if(d>0){br(x2,y2,a-.42-R()*.3,len*.7,w*.62,d-1);br(x2,y2,a+.38+R()*.3,len*.7,w*.62,d-1)}else{f+=`<circle cx="${f1(x2)}" cy="${f1(y2)}" r="${f1(w*.7)}" fill="#f3cfa6"/>`}};
 [-2.55,-1.95,-1.3,-.75,1.45,2.1,2.75,3.35].forEach(a=>br(SX+52*Math.cos(a),SY+48*Math.sin(a),a,56+R()*14,10,2));
 s+=P('dendritt',`<g id="nDen">${o}${f}</g>`,{lx:96,ly:156});
 const A=axPts(300,690);
 s+=P('akson',`<path d="${pl(A)}" class="hit"/><path d="${pl(A)}" fill="none" stroke="#a8693a" stroke-width="10" stroke-linecap="round"/><path d="${pl(A)}" fill="none" stroke="#f3cfa6" stroke-width="7" stroke-linecap="round"/>`,{lx:662,ly:262});
 let my='';NV.my.forEach(([a,b])=>{const p=pl(axPts(a,b));my+=`<g filter="url(#sh)"><path d="${p}" fill="none" stroke="#b08a50" stroke-width="30"/><path d="${p}" fill="none" stroke="#fbf1dc" stroke-width="26"/>${[a,b].map(x=>`<ellipse cx="${x}" cy="${f1(AXY(x))}" rx="4" ry="15" fill="#fbf1dc" stroke="#b08a50" stroke-width="2"/>`).join('')}</g>`;for(let x=a+7;x<b-4;x+=7){const y=AXY(x);my+=`<path d="M${x},${f1(y-11)} q3,11 0,22" fill="none" stroke="#e3cfa6" stroke-width="1.2"/>`}const mx=(a+b)/2;my+=`<ellipse cx="${mx}" cy="${f1(AXY(mx)-8)}" rx="11" ry="4.5" fill="url(#gNucl)" opacity=".85"/>`});
 s+=P('myelin',`<g id="nMy">${my}</g>`,{lx:430,ly:350});
 s+=P('ranvier',`<g id="nRv">${NV.nodes.map(x=>`<circle cx="${x}" cy="${f1(AXY(x))}" r="14" class="hitc"/><rect x="${x-3}" y="${f1(AXY(x)-7)}" width="6" height="14" rx="2" fill="#e07a2c" opacity=".75"/>`).join('')}</g>`,{lx:472,ly:252});
 s+=P('cellekropp',`<g filter="url(#sh)"><path d="M258,268 C282,286 290,293 304,295 L304,305 C290,307 282,314 258,328Z" fill="#f3cfa6" stroke="#a8693a" stroke-width="2"/><path d="${blob(SX,SY,62,rng(4),9,.2)}" fill="url(#gNeur)" stroke="#a8693a" stroke-width="2.6"/></g>`,{lx:SX+8,ly:SY+52});
 let ni='';const R2=rng(8);for(let i=0;i<9;i++){const a=i/9*6.283+R2()*.4,d=38+R2()*8;ni+=`<path d="${blob(SX+d*Math.cos(a),SY+d*Math.sin(a),6+R2()*3,R2,6,.4)}" fill="url(#gER)" stroke="#b5536f" stroke-width=".8"/>`}
 s+=P('er',ni,{nl:1});
 s+=P('kjerne',nucleusD(SX-6,SY+2,27,11,{pores:8}),{lx:SX-6,ly:SY+8});
 s+=P('mitokondrie',mitoD(262,322,15,.2)+mitoD(170,246,-30,.2),{nl:1});
 let te='';const ex=690,ey=AXY(690);NV.term.forEach(([x,y])=>{const d=`M${ex},${f1(ey)} Q${ex+25},${f1((ey+y)/2)} ${x-12},${y}`;te+=`<path d="${d}" fill="none" stroke="#a8693a" stroke-width="7.6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f3cfa6" stroke-width="5" stroke-linecap="round"/>`});
 NV.term.forEach(([x,y])=>{te+=`<g filter="url(#sh)"><circle cx="${x}" cy="${y}" r="15" fill="url(#gNeur)" stroke="#a8693a" stroke-width="2"/></g>`+[[-5,-4],[4,-6],[0,4],[6,3],[-6,5]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="2.6" fill="#fbe6a8" stroke="#c79a1e" stroke-width=".8"/>`).join('')});
 s+=P('synapse',`<g id="nTerm">${te}</g>`,{lx:712,ly:462});
 s+=`<g id="nPulse" style="pointer-events:none"></g>`;
 s+=`<text x="24" y="586" class="rl" style="font-size:12.5px;font-weight:600">Signalet går én vei: dendritter → cellekropp → akson → aksonterminaler (synapser)</text>`;
 s+=badge(105,40,'Aksjonspotensial ›','aksjonspotensial',164);
 return s};
LIVE.nervecelle={pos:'tr',ctrl:`<div style="width:236px"><div class="cx-title">Send en nerveimpuls</div><div class="cx-row"><button class="cbtn" id="nFire">⚡ Send impuls</button><label class="cx-tog"><input type="checkbox" id="nMyC" checked> Myelin</label></div><div class="cx-note" id="nN"></div></div>`,
init(){const pg=q('#nPulse'),den=q('#nDen'),term=q('#nTerm'),my=q('#nMy'),rv=q('#nRv'),nt=cq('#nN');let t=-1,myel=true,idle=1.6;
 const HOP=[305,386,472,558,650,690];
 const msg=()=>nt.innerHTML=myel?'<b>Med myelin</b> «hopper» signalet fra innsnøring til innsnøring (saltatorisk ledning) – opptil ca. 100 m/s.':'<b>Uten myelin</b> må signalet vandre gjennom hver bit av membranen – ofte bare 0,5–2 m/s. Ved MS brytes myelinet ned.';
 cq('#nMyC').onchange=e=>{myel=e.target.checked;my.style.opacity=myel?1:.12;rv.style.opacity=myel?1:0;msg()};msg();
 cq('#nFire').onclick=()=>{t=0};
 const glow=(el,on)=>el.style.filter=on?'url(#glow2)':'';
 return loop(dt=>{
  if(t<0){idle+=dt;if(ANIM&&idle>2.6){idle=0;t=0}return}
  t+=dt;const T0=.5,T1=T0+.35,T2=T1+(myel?1.1:3.6),T3=T2+.6;glow(den,t<T0);let h='';
  if(t>=T0&&t<T1){const u=(t-T0)/(T1-T0);h=`<circle cx="${f1(215+90*u)}" cy="${f1(290+10*u)}" r="${f1(14+6*u)}" fill="#ffd54a" opacity=".55"/>`}
  else if(t>=T1&&t<T2){const u=(t-T1)/(T2-T1);
   if(myel){const k=u*(HOP.length-1),i=Math.min(HOP.length-2,Math.floor(k)),v=k-i,x0=HOP[i],x1=HOP[i+1],y0=AXY(x0),y1=AXY(x1),xm=(x0+x1)/2,ym=Math.min(y0,y1)-40,b=[(1-v)*(1-v)*x0+2*(1-v)*v*xm+v*v*x1,(1-v)*(1-v)*y0+2*(1-v)*v*ym+v*v*y1];
    h=`<path d="M${x0},${f1(y0)} Q${xm},${f1(ym)} ${x1},${f1(y1)}" fill="none" stroke="#f2a516" stroke-width="2.5" stroke-dasharray="5 5" opacity="${f1(1-v*.5)}"/><circle cx="${x0}" cy="${f1(y0)}" r="${f1(17-8*v)}" fill="#ffd54a" opacity="${f1(.9-.5*v)}"/><circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="6" fill="#ffb300"/>`}
   else{const x=305+(690-305)*u;h=`<rect x="${f1(x-30)}" y="${f1(AXY(x)-6)}" width="30" height="12" rx="6" fill="#ffd54a" opacity=".6"/><circle cx="${f1(x)}" cy="${f1(AXY(x))}" r="8" fill="#ffb300"/>`}}
  glow(term,t>=T2&&t<T3);pg.innerHTML=h;if(t>=T3){t=-1;idle=0}})}};

/* ---------------- SYNAPSE ---------------- */
S.synapse=()=>{
 let s=`<rect width="800" height="600" fill="#eef2f4"/>${title('Synapsen','Det elektriske signalet blir gjort om til et kjemisk signal – og så elektrisk igjen')}`;
 const pre="M335,78 C335,124 165,140 165,220 Q165,290 235,290 L565,290 Q635,290 635,220 C635,140 465,124 465,78Z";
 const post="M70,600 L70,412 Q70,350 132,350 L668,350 Q730,350 730,412 L730,600Z";
 s+=P('postsynaptisk',`<g filter="url(#sh)"><path d="${post}" fill="url(#gNeur2)" stroke="#5a77a8" stroke-width="3"/></g>`,{lx:400,ly:520})+SP('4',`<path d="${post}" fill="none" stroke="#ffb300" stroke-width="6" opacity=".5"><animate attributeName="opacity" values=".15;.6;.15" dur="1.2s" repeatCount="indefinite"/></path><text x="560" y="452" text-anchor="middle" class="pt" style="fill:#2c5c9e">Na⁺ strømmer inn → nytt signal i neste celle</text>${flowArrow('M560,462 L560,520','#3e7cc4')}`);
 s+=P('presynaptisk',`<g filter="url(#sh)"><path d="${pre}" fill="url(#gNeur)" stroke="#a8693a" stroke-width="3"/></g>`,{lx:400,ly:112});
 s+=SP('1',`<path d="${pre}" fill="none" stroke="#ffb300" stroke-width="7" opacity=".5"><animate attributeName="opacity" values=".15;.65;.15" dur="1s" repeatCount="indefinite"/></path>${flowArrow('M400,80 L400,128','#e07a2c')}<text x="480" y="104" class="pt" style="fill:#b85a14">aksjonspotensial ankommer</text>`);
 s+=P('mitokondrie',mitoD(540,176,25,.46)+mitoD(258,206,-20,.4),{nl:1});
 const ves=(x,y,r=15)=>`<g filter="url(#sh)"><circle cx="${x}" cy="${y}" r="${r}" fill="#fff8e6" stroke="#c79a1e" stroke-width="2"/></g>${[[-5,-4],[4,-6],[0,3],[6,4],[-6,5],[1,-1]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="2.4" fill="#e0457b"/>`).join('')}`;
 s+=P('synvesikkel',[[300,165],[358,200],[432,192],[492,165],[396,140],[250,240],[530,232],[300,226],[392,240]].map(([x,y])=>ves(x,y)).join('')+SP('1 2',ves(340,268)+ves(452,268))+SP('5',`<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-26" dur="2.4s" repeatCount="indefinite"/>${ves(560,252,12)}</g>`),{lx:400,ly:228});
 const half=(x,y,open,f,st,h=26)=>`<rect x="${x-(open?17:12)}" y="${y-h/2}" width="10" height="${h}" rx="4.5" fill="${f}" stroke="${st}" stroke-width="1.5"/><rect x="${x+(open?7:2)}" y="${y-h/2}" width="10" height="${h}" rx="4.5" fill="${f}" stroke="${st}" stroke-width="1.5"/>`;
 const ca=x=>[0,1,2].map(i=>mov2(`M${x},336 L${x},246`,1.6,-i*.53,`<circle r="7.5" fill="#4caf6a" stroke="#2f7a52"/><text y="3" text-anchor="middle" style="font-size:7px;font-weight:700;fill:#fff">Ca</text>`)).join('');
 s+=P('kalsiumkanal',SP('1 3 4 5',half(255,290,0,'#9fd3c7','#2f8f7f')+half(495,290,0,'#9fd3c7','#2f8f7f'))+SP('2',half(255,290,1,'#9fd3c7','#2f8f7f')+half(495,290,1,'#9fd3c7','#2f8f7f')+ca(255)+ca(495)+`<text x="375" y="326" text-anchor="middle" class="pt" style="fill:#2f7a52">Ca²⁺ strømmer inn</text>`),{lx:255,ly:326});
 const fuse=x=>`<path d="M${x-19},289 C${x-19},258 ${x+19},258 ${x+19},289" fill="#fff8e6" stroke="#c79a1e" stroke-width="2"/>`;
 s+=SP('3',fuse(340)+fuse(452));
 const td=(x0,y0,x1,y1,dur,beg)=>`<circle r="3" fill="#e0457b"><animateMotion path="M${x0},${y0} L${x1},${y1}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></circle>`;
 let t3='';[340,452].forEach(x=>{for(let k=0;k<7;k++)t3+=td(x+(k-3)*3,284,x+(k-3)*13,326,1.4,-k*.2)});
 let t4='';[[340,300],[340,400],[452,400],[452,500],[396,300],[396,500]].forEach(([a,b],i)=>{for(let k=0;k<2;k++)t4+=td(a+(k?6:-6),300,b+(k?4:-4),334,1.8,-(i*.3+k*.9))});
 let t5='';[[330,560,292],[420,560,292],[470,612,320],[380,612,320]].forEach(([a,b,c],i)=>t5+=td(a,322,b,c,2,-i*.5));
 s+=P('transmitter',SP('3',t3+`<text x="560" y="338" class="pt" style="fill:#a8355a">signalstoff slippes ut</text>`)+SP('4',t4)+SP('5',t5),{nl:1});
 const recC=x=>half(x,350,0,'#7fb5d9','#3d7fae',32),recO=x=>half(x,350,1,'#7fb5d9','#3d7fae',32)+`<circle cx="${x-8}" cy="333" r="4" fill="#e0457b"/><circle cx="${x+8}" cy="333" r="4" fill="#e0457b"/>`;
 const na=x=>[0,1].map(i=>mov2(`M${x},318 L${x},430`,1.4,-i*.7,`<circle r="7" fill="#e07a2c"/><text y="3" text-anchor="middle" style="font-size:7px;font-weight:700;fill:#fff">Na</text>`)).join('');
 s+=P('reseptor',SP('1 2 3 5',[290,380,470].map(recC).join(''))+SP('4',[290,380,470].map(x=>recO(x)+na(x)).join('')),{lx:380,ly:392});
 s+=P('gjenopptak',`<ellipse cx="560" cy="290" rx="12" ry="17" fill="#a1c9a0" stroke="#4f8a4d" stroke-width="2"/><g filter="url(#sh)"><path d="${blob(612,322,16,rng(3),7,.3)}" fill="url(#gEnz)" stroke="#5a4fb0" stroke-width="1.6"/></g><text x="612" y="326" text-anchor="middle" style="font-size:9px;font-weight:700;fill:#3d2a70">enzym</text>`,{lx:640,ly:300});
 s+=`<text x="24" y="318" class="rl" style="font-size:12.5px">synapsespalten</text><text x="24" y="334" class="rl" style="font-size:11.5px">(ca. 20 nm)</text>`;
 return s};
LIVE.synapse=stepper('Signal over synapsen',[
 {t:'<b>1 · Impulsen kommer.</b> Aksjonspotensialet når aksonterminalen, og membranen der depolariseres.'},
 {t:'<b>2 · Ca²⁺ strømmer inn.</b> Spenningsstyrte Ca²⁺-kanaler åpnes. Ca²⁺ er signalet som får vesiklene til å slippe.'},
 {t:'<b>3 · Eksocytose.</b> Vesiklene smelter sammen med membranen og tømmer signalstoffet ut i synapsespalten.'},
 {t:'<b>4 · Binding til reseptorer.</b> Signalstoffet diffunderer over spalten og binder seg til reseptorer. Ionekanaler åpnes, Na⁺ strømmer inn, og et nytt signal kan starte.'},
 {t:'<b>5 · Opprydding.</b> Enzymer bryter ned signalstoffet, eller det pumpes tilbake (gjenopptak) og pakkes i nye vesikler. Da stopper signalet.'}],{excl:true,dur:4.4,map:{kalsiumkanal:1,synvesikkel:2,transmitter:3,reseptor:3,postsynaptisk:3,gjenopptak:4}});

/* ---------------- AKSJONSPOTENSIAL ---------------- */
const APK=[[0,-70],[1,-70],[1.3,-55],[1.8,35],[2.9,-80],[4.4,-70],[6,-70]];
const apV=t=>{for(let i=0;i<APK.length-1;i++){const [a,va]=APK[i],[b,vb]=APK[i+1];if(t<=b){const u=(t-a)/(b-a);return va+(vb-va)*(1-Math.cos(Math.PI*u))/2}}return -70};
const APG={X:t=>70+t/6*430,Y:v=>550-(v+90)/140*220};
S.aksjonspotensial=()=>{const {X,Y}=APG;
 let s=`<rect width="800" height="600" fill="#f4f6fa"/><rect y="72" width="800" height="78" fill="#e3eef7"/><rect y="220" width="800" height="74" fill="#fbf1e1"/>${title('Aksjonspotensialet','Hva skjer i membranen når en nerveimpuls passerer?')}`;
 const R=rng(6),ion=(x,y,na)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" fill="${na?'#e07a2c':'#8c6bd1'}" opacity=".5"/>`;
 let io='';const ok=x=>Math.abs(x-178)>42&&Math.abs(x-383)>42&&Math.abs(x-605)>50;
 for(let i=0;i<34;i++){const x=20+R()*740,y=84+R()*56;if(ok(x)&&!(x>560&&y<104))io+=ion(x,y,i%6)}
 for(let i=0;i<30;i++){const x=20+R()*740,y=232+R()*52;if(ok(x)&&!(x>420&&y>268))io+=ion(x,y,!(i%6))}
 s+=io+`<text x="786" y="96" text-anchor="end" class="pt" style="fill:#2c5c9e">Utsiden: mye Na⁺</text><text x="786" y="284" text-anchor="end" class="pt" style="fill:#5b3f86">Innsiden: mye K⁺, negativt ladd</text>`;
 s+=bilayer(150,220,[[146,210],[351,415],[560,650]],'#e8a07a','#c4783f');
 const ch=(a,b,cx,f,st)=>`<rect id="${a}" x="${cx-25}" y="136" width="22" height="98" rx="9" fill="${f}" stroke="${st}" stroke-width="2.5"/><rect id="${b}" x="${cx+3}" y="136" width="22" height="98" rx="9" fill="${f}" stroke="${st}" stroke-width="2.5"/>`;
 s+=P('natriumkanal',ch('naL','naR',178,'#7fb5d9','#3d7fae')+`<g id="naB" style="opacity:0"><path d="M152,250 Q160,262 172,246" fill="none" stroke="#2c5c9e" stroke-width="2"/><circle cx="178" cy="240" r="9" fill="#2c5c9e"/></g><g id="naI"></g><text x="178" y="128" text-anchor="middle" class="pt" style="fill:#2c5c9e">Na⁺-kanal</text>`,{nl:1});
 s+=P('kaliumkanal',ch('kL','kR',383,'#c7b4e8','#6a5aa8')+`<g id="kI"></g><text x="383" y="128" text-anchor="middle" class="pt" style="fill:#5b3f86">K⁺-kanal</text>`,{nl:1});
 s+=P('pumpe',`<ellipse cx="605" cy="185" rx="40" ry="54" fill="#e8a6b8" stroke="#b04f6c" stroke-width="2.5"/><text x="605" y="182" text-anchor="middle" class="pt" style="font-size:11.5px">Na⁺/K⁺-</text><text x="605" y="197" text-anchor="middle" class="pt" style="font-size:11.5px">pumpe</text>`,{nl:1});
 let g=`<rect x="30" y="302" width="488" height="282" rx="14" fill="#fff" stroke="#e3dccd"/>`;
 [[40,'+40'],[0,'0'],[-70,'–70'],[-90,'–90']].forEach(([v,l])=>g+=`<line x1="${X(0)}" y1="${f1(Y(v))}" x2="${X(6)}" y2="${f1(Y(v))}" stroke="#efe9dd"/><text x="${X(0)-6}" y="${f1(Y(v)+4)}" text-anchor="end" class="rl" style="font-size:11px">${l}</text>`);
 for(let t=0;t<=6;t++)g+=`<text x="${f1(X(t))}" y="566" text-anchor="middle" class="rl" style="font-size:11px">${t}</text>`;
 g+=`<text x="${f1(X(3))}" y="580" text-anchor="middle" class="rl" style="font-size:11.5px">tid (ms)</text><text x="44" y="322" class="rl" style="font-size:11.5px">mV</text>`;
 s+=g;
 [['hvilepotensial',0,1],['depolarisering',1.3,1.8],['repolarisering',1.8,2.9],['hyperpolarisering',2.9,4.4]].forEach(([id,a,b])=>s+=P(id,`<rect x="${f1(X(a))}" y="318" width="${f1(X(b)-X(a))}" height="236" class="hitc"/>`,{nl:1}));
 s+=`<line x1="${X(0)}" y1="${f1(Y(-70))}" x2="${X(6)}" y2="${f1(Y(-70))}" stroke="#8a8270" stroke-width="1.5" stroke-dasharray="6 5"/><text x="${X(6)}" y="${f1(Y(-70)+14)}" text-anchor="end" class="rl" style="font-size:11px">hvilepotensial</text>`;
 s+=P('terskel',`<line x1="${X(0)}" y1="${f1(Y(-55))}" x2="${X(6)}" y2="${f1(Y(-55))}" class="hit"/><line x1="${X(0)}" y1="${f1(Y(-55))}" x2="${X(6)}" y2="${f1(Y(-55))}" stroke="#c0453b" stroke-width="1.5" stroke-dasharray="4 4"/><text x="${X(6)}" y="${f1(Y(-55)-5)}" text-anchor="end" class="rl" style="font-size:11px;fill:#c0453b">terskel</text>`,{nl:1});
 let cv='';for(let u=0;u<=6.001;u+=.04)cv+=(u?'L':'M')+f1(X(u))+','+f1(Y(apV(u)));
 s+=`<path d="${cv}" fill="none" stroke="#d9d2c2" stroke-width="2.5"/><path id="apTr" d="" fill="none" stroke="#e07a2c" stroke-width="3.5" stroke-linejoin="round"/><line id="apCur" y1="318" y2="554" stroke="#1f2430" stroke-width="1" opacity=".35"/><circle id="apDot" r="6.5" fill="#e07a2c" stroke="#fff" stroke-width="2"/>`;
 s+=`<text id="apPh" x="655" y="350" text-anchor="middle" style="font-family:Fraunces,serif;font-size:21px;font-weight:650;fill:#1f2430"></text><text id="apV" x="655" y="392" text-anchor="middle" style="font-size:30px;font-weight:700;fill:#e07a2c"></text>`;
 return s};
LIVE.aksjonspotensial={pos:'br',ctrl:`<div style="width:244px"><div class="cx-row"><button class="cbtn" id="apS">⚡ Stimuler</button><button class="cbtn" id="apP">Pause</button></div><div class="cx-note" id="apN"></div></div>`,
init(){const {X,Y}=APG;let t=ANIM?0:1.6,playing=true;const tr=q('#apTr'),dot=q('#apDot'),cur=q('#apCur'),ph=q('#apPh'),vv=q('#apV'),nI=q('#naI'),kI=q('#kI'),nb=q('#naB'),nt=cq('#apN'),pb=cq('#apP');
 const ch=(l,r,cx,g)=>{q(l).setAttribute('x',f1(cx-g/2-22));q(r).setAttribute('x',f1(cx+g/2))};
 const ionE=(x,y,o,na)=>`<g opacity="${f1(o)}"><circle cx="${x}" cy="${f1(y)}" r="8" fill="${na?'#e07a2c':'#8c6bd1'}"/><text x="${x}" y="${f1(y+3.2)}" text-anchor="middle" style="font-size:8.5px;font-weight:700;fill:#fff">${na?'Na':'K'}</text></g>`;
 const PH=[[1,'Hvilepotensial','Innsiden er negativ (ca. –70 mV). Na⁺/K⁺-pumpen og K⁺ som lekker ut, holder ladningene skjevt fordelt.'],[1.3,'Stimulus','Et signal gjør innsiden litt mindre negativ. Når terskelen (ca. –55 mV) nås, utløses aksjonspotensialet – alt eller ingenting.'],[1.8,'Depolarisering','Spenningsstyrte Na⁺-kanaler åpnes. Na⁺ strømmer inn, og innsiden blir et øyeblikk positiv (ca. +35 mV).'],[2.9,'Repolarisering','Na⁺-kanalene stenges av en «port» (inaktivering), og K⁺-kanalene åpnes. K⁺ strømmer ut, og spenningen faller.'],[4.4,'Hyperpolarisering','K⁺-kanalene lukkes sakte, så spenningen faller litt under hvile. I refraktærperioden kan ikke et nytt aksjonspotensial starte – derfor går signalet bare én vei.'],[7,'Hvilepotensial','Na⁺/K⁺-pumpen gjenoppretter ionefordelingen. Cellen er klar for neste impuls.']];
 let last='';
 function set(){const v=apV(t);let d='';for(let u=0;u<=t;u+=.04)d+=(u?'L':'M')+f1(X(u))+','+f1(Y(apV(u)));tr.setAttribute('d',d);dot.setAttribute('cx',f1(X(t)));dot.setAttribute('cy',f1(Y(v)));cur.setAttribute('x1',f1(X(t)));cur.setAttribute('x2',f1(X(t)));
  const p=PH.find(p=>t<p[0]);ph.textContent=p[1];vv.textContent=(v>0?'+':'')+Math.round(v)+' mV';if(p[1]+p[0]!==last){last=p[1]+p[0];nt.innerHTML=`<b>${p[1]}.</b> ${p[2]}`}
  const naO=t>=1.3&&t<1.8,naIn=t>=1.8&&t<2.9,kO=t>=1.8&&t<3.3;ch('#naL','#naR',178,naO?18:4);ch('#kL','#kR',383,kO?18:4);nb.style.opacity=naIn?1:0;
  let a='';if(naO)for(let i=0;i<4;i++){const u=((t-1.3)*3.2+i/4)%1;a+=ionE(178,96+u*176,1-Math.abs(u-.5)*1.5,1)}nI.innerHTML=a;
  a='';if(kO)for(let i=0;i<4;i++){const u=((t-1.8)*2.4+i/4)%1;a+=ionE(383,272-u*176,1-Math.abs(u-.5)*1.5,0)}kI.innerHTML=a}
 const setPB=()=>{pb.textContent=playing?'Pause':'Spill av';pb.classList.toggle('on',!playing)};setPB();
 pb.onclick=()=>{playing=!playing;setPB()};cq('#apS').onclick=()=>{t=.9;playing=true;setPB()};
 onSel=id=>{const m={hvilepotensial:.5,terskel:1.25,depolarisering:1.55,repolarisering:2.3,hyperpolarisering:3.5,natriumkanal:1.55,kaliumkanal:2.3};if(m[id]!=null){t=m[id];playing=false;setPB();set()}};
 set();return loop(dt=>{if(!(ANIM&&playing))return;t+=dt*.9;if(t>6)t=0;set()})}};
