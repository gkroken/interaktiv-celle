/* ====================== FOTOTRANSDUKSJON: fra foton til elektrisk signal ====================== */
// Et utsnitt av ytre segment: en diskmembran (nederst), cytosol med cGMP, og cellemembranen
// (til høyre) med CNG-kanaler og Na⁺/Ca²⁺-K⁺-veksleren. Simuleringen er en forenklet modell
// i sakte film (ca. 10×), men rekkefølgen og forsterkningen er ekte.
const FT={X0:40,X1:525,MY:412,PM:560,RHO:[78,158,238,318,398,470],PDE:[110,196,278,358,432,490],CNG:[275,385],NCKX:330,GC:514};
FT.rho=(x,y,st='')=>`<g transform="translate(${x},${y})" ${st}>${[-12,-7,-2,3,8,13].map((d,i)=>`<rect x="${d-2.6}" y="-17" width="5.2" height="34" rx="2.6" fill="${i%2?'#e58aab':'#d06b92'}" stroke="#9c3d63" stroke-width=".7"/>`).join('')}</g>`;
FT.tr=(gdp=true)=>`<ellipse cx="0" cy="0" rx="15" ry="11" fill="url(#gGa)" stroke="#a46e14" stroke-width="1.4"/><text y="3" text-anchor="middle" style="font-size:7px;font-weight:800;fill:#7a520d">${gdp?'GDP':'GTP'}</text>`;
FT.bg=()=>`<ellipse cx="0" cy="0" rx="9" ry="7.5" fill="url(#gGbg)" stroke="#2b8c80" stroke-width="1.2"/>`;
FT.pde=()=>`<ellipse cx="-10" cy="0" rx="11" ry="13" fill="url(#gPde)" stroke="#3e6fae" stroke-width="1.4"/><ellipse cx="10" cy="0" rx="11" ry="13" fill="url(#gPde)" stroke="#3e6fae" stroke-width="1.4"/>`;
FT.cgmp=(x,y,o=1,r=5)=>`<g transform="translate(${f1(x)},${f1(y)})" opacity="${f1(o)}"><polygon points="0,${-r} ${f1(r*.95)},${f1(-r*.3)} ${f1(r*.6)},${f1(r*.8)} ${f1(-r*.6)},${f1(r*.8)} ${f1(-r*.95)},${f1(-r*.3)}" fill="#9b6fd6" stroke="#5e3d99" stroke-width=".9"/></g>`;
S.fototransduksjon=()=>{const {X0,X1,MY,PM,RHO,PDE,CNG,NCKX,GC}=FT;
 let s=`<rect width="800" height="600" fill="#faf8fc"/>${title('Fototransduksjon','Fra ett foton til et elektrisk signal – en G-protein-kaskade')}`;
 // disk over (bare kanten) og disken vi ser på
 const bil=(y,x0,x1)=>`<rect x="${x0}" y="${y}" width="${x1-x0}" height="26" fill="#f6e7c9"/>${Array.from({length:Math.floor((x1-x0)/9)},(_,k)=>`<circle cx="${x0+5+k*9}" cy="${y+3}" r="3.3" fill="#e9b23a"/><circle cx="${x0+5+k*9}" cy="${y+23}" r="3.3" fill="#e9b23a"/>`).join('')}`;
 s+=`<g opacity=".7">${bil(72,X0-10,X1)}</g><text x="${X0}" y="${118}" class="rl" style="font-size:11px">neste disk (bare ~15 nm unna i virkeligheten)</text>`;
 s+=P('rodopsin',`<g>${bil(MY,X0-10,X1)}${bil(MY+52,X0-10,X1)}<path d="M${X1},${MY} Q${X1+26},${MY+39} ${X1},${MY+78}" fill="none" stroke="#e9b23a" stroke-width="8"/><rect x="${X0-10}" y="${MY+26}" width="${X1-X0+10}" height="26" fill="#fdf6ea"/><text x="${X0}" y="${MY+44}" class="rl" style="font-size:10.5px">inne i disken</text></g><g id="ftRho">${RHO.map((x,i)=>FT.rho(x,MY+13,`id="ftR${i}"`)).join('')}</g>`,{lx:RHO[1],ly:MY+50});
 // cellemembranen
 s+=`<rect x="${PM}" y="70" width="26" height="430" fill="#f6e7c9"/>${Array.from({length:47},(_,k)=>`<circle cx="${PM+3}" cy="${74+k*9}" r="3.3" fill="#e9b23a"/><circle cx="${PM+23}" cy="${74+k*9}" r="3.3" fill="#e9b23a"/>`).join('')}<text x="${PM+40}" y="456" class="rl" style="font-size:11px">utenfor cellen</text><text x="${PM+40}" y="470" class="rl" style="font-size:11px">mye Na⁺, Ca²⁺</text>`;
 s+=P('cngkanal',CNG.map((y,i)=>`<g transform="translate(${PM+13},${y})"><rect x="-17" y="-26" width="34" height="18" rx="6" fill="url(#gCng)" stroke="#4f9a2e" stroke-width="1.4"/><rect x="-17" y="8" width="34" height="18" rx="6" fill="url(#gCng)" stroke="#4f9a2e" stroke-width="1.4"/><g id="ftG${i}"></g></g>`).join('')+`<text x="${PM+40}" y="${CNG[0]-30}" style="font-size:11.5px;font-weight:700;fill:#4f9a2e">CNG-kanal</text>`,{lx:PM+60,ly:CNG[1]+40});
 s+=P('nckx',`<g transform="translate(${PM+13},${NCKX})"><rect x="-16" y="-14" width="32" height="28" rx="8" fill="#d9e2f5" stroke="#5b74a8" stroke-width="1.4"/><text y="3.5" text-anchor="middle" style="font-size:7.5px;font-weight:800;fill:#3a4f7a">NCKX</text></g>`,{lx:PM+62,ly:NCKX+4});
 // guanylatsyklase i diskkanten
 s+=P('guanylatsyklase',`<g transform="translate(${GC},${MY+13})"><rect x="-10" y="-30" width="20" height="44" rx="7" fill="url(#gGC)" stroke="#b9622c" stroke-width="1.4"/><text y="-36" text-anchor="middle" style="font-size:9px;font-weight:800;fill:#b9622c">GC</text><circle id="ftGcap" cx="15" cy="-24" r="6" fill="#f7d488" stroke="#b9862c"/></g>`,{lx:GC-4,ly:MY-60});
 s+=P('transducin',`<g id="ftT"></g>`,{nl:1});
 s+=P('pde6',`<g id="ftPde">${PDE.map((x,i)=>`<g id="ftP${i}" transform="translate(${x},${MY-12})">${FT.pde()}<g class="gam"><rect x="-17" y="-20" width="9" height="7" rx="3" fill="#2c5a85"/><rect x="8" y="-20" width="9" height="7" rx="3" fill="#2c5a85"/></g></g>`).join('')}</g>`,{lx:PDE[1],ly:MY-44});
 s+=P('cgmp',`<g id="ftC"></g>`,{nl:1});
 s+=`<g id="ftFx" style="pointer-events:none"></g>`;
 // strømgraf
 s+=P('enkeltfoton',`<rect x="${X0-10}" y="500" width="${PM-X0+36}" height="92" rx="10" fill="#fff" stroke="#e3dccd"/><text x="${X0}" y="517" class="pt" style="font-size:12.5px">Strøm inn i staven (mørkestrømmen)</text><line x1="${X0}" y1="530" x2="${PM+16}" y2="530" stroke="#efe9dd"/><text x="${PM+18}" y="533" class="rl" style="font-size:9.5px">100 %</text><line x1="${X0}" y1="584" x2="${PM+16}" y2="584" stroke="#efe9dd"/><text x="${PM+18}" y="587" class="rl" style="font-size:9.5px">0</text><path id="ftI" fill="none" stroke="#c0453b" stroke-width="2.2"/><g id="ftIm"></g>`,{nl:1});
 // tellere
 s+=P('forsterkning',`<g transform="translate(600,500)"><rect width="190" height="92" rx="10" fill="#fff" stroke="#e3dccd"/><text x="12" y="19" class="pt" style="font-size:12.5px">Forsterkning</text><text x="12" y="40" class="rl" style="font-size:11.5px">fotoner</text><text id="ftN0" x="178" y="40" text-anchor="end" style="font-weight:800;fill:#a8761a">0</text><text x="12" y="60" class="rl" style="font-size:11.5px">transducin aktivert</text><text id="ftN1" x="178" y="60" text-anchor="end" style="font-weight:800;fill:#a46e14">0</text><text x="12" y="80" class="rl" style="font-size:11.5px">cGMP spaltet</text><text id="ftN2" x="178" y="80" text-anchor="end" style="font-weight:800;fill:#5e3d99">0</text></g>`,{nl:1});
 s+=badge(690,290,'Rodopsin ›','rodopsin',120)+badge(690,330,'G-protein ›','transducin',120);
 return s};
LIVE.fototransduksjon={pos:'tr',ctrl:`<div style="width:252px"><div class="cx-title">Send lys inn i staven</div><div class="cx-row"><button class="cbtn" id="ft1">✦ Ett foton</button><button class="cbtn" id="ft5">✦✦ Fem</button></div><label class="cx-tog" style="margin-top:6px"><input type="checkbox" id="ftK"> Uten rodopsinkinase (GRK1)</label><label class="cx-tog"><input type="checkbox" id="ftG"> Uten RGS9</label><div class="cx-note" id="ftNt"></div></div>`,
init(){const {X0,X1,MY,PM,RHO,PDE,CNG,NCKX,GC}=FT,R=rng(7),nt=cq('#ftNt');
 const N0=70,BASAL=.12,KP=.04;          // cGMP-partikler i mørke, basal spalting, spalting per aktiv PDE-enhet
 let c=[],cc=1,spl=0,ca=1,I=1,T=0,noGRK=false,noRGS=false,cnt=[0,0,0],idle=3;
 const Rs=RHO.map(x=>({x,on:0,t:0,ph:0,arr:0})),Ts=[],Gs=[],Ps=PDE.map(x=>({x,s:[null,null]})),fx=[],ion=[],hist=[];
 const spawnC=(x,y)=>c.push({x:x??X0+R()*(PM-X0-20),y:y??140+R()*(MY-160),vx:0,vy:0,o:x==null?1:.2});
 for(let k=0;k<N0;k++)spawnC();
 const spawnT=x=>Ts.push({x:x??X0+R()*(X1-X0),v:0,o:x==null?1:.3});
 for(let k=0;k<9;k++)spawnT();
 const msg=()=>nt.innerHTML=cnt[0]?`Ett aktivt rodopsin har aktivert <b>${cnt[1]}</b> transduciner, og PDE har spaltet <b>${cnt[2]}</b> cGMP. I en ekte musestav gir ett foton ca. 16 transduciner og ~2000 spaltede cGMP – i frosk ~60 og ~72 000.`:'Trykk på «Ett foton». Følg kjeden: <b>rodopsin → transducin → PDE6 → cGMP faller → CNG-kanalene lukkes</b>.';
 const photon=()=>{const r=Rs[Math.floor(R()*Rs.length)];r.on=0;r.ph=.001;r.t=0;r.arr=0;cnt[0]++;msg()};
 cq('#ft1').onclick=()=>{if(!cnt[0]||Rs.every(r=>!r.on&&!r.ph)){cnt=[0,0,0];spl=0}photon();idle=0};
 cq('#ft5').onclick=()=>{cnt=[0,0,0];spl=0;for(let k=0;k<5;k++)setTimeout(photon,k*120);idle=0};
 cq('#ftK').onchange=e=>{noGRK=e.target.checked};cq('#ftG').onchange=e=>{noRGS=e.target.checked};
 onSel=id=>{if(id==='avslutning'){noGRK=false;noRGS=false;cq('#ftK').checked=false;cq('#ftG').checked=false}if(id==='enkeltfoton'||id==='forsterkning'){cnt=[0,0,0];spl=0;photon()}};
 msg();
 const TR=()=>noGRK?12:1.5, TG=()=>noRGS?9:1.6;
 return loop(dt=>{if(!ANIM)dt=0;T+=dt;idle+=dt;if(idle>12&&ANIM&&Rs.every(r=>!r.on&&!r.ph)){cnt=[0,0,0];spl=0;photon();idle=0}
  let fxh='';
  // fotoner og aktivt rodopsin
  Rs.forEach((r,i)=>{if(r.ph){r.ph+=dt/.45;const u=cl(r.ph);const sx=r.x-150,sy=110,x=sx+(r.x-sx)*u,y=sy+(MY+6-sy)*u;
    fxh+=`<path d="M${f1(sx+(x-sx)*.5)},${f1(sy+(y-sy)*.5)} L${f1(x)},${f1(y)}" stroke="#f2b630" stroke-width="2.5" stroke-dasharray="4 3" opacity="${f1(1-u*.3)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(5+3*Math.sin(T*30))}" fill="#ffd54a"/>`;
    if(r.ph>=1){r.ph=0;r.on=1;r.t=0}}
   const g=q('#ftR'+i);
   if(r.on){r.t+=dt;
    // aktivering av transducin som kommer nær
    r.acc=(r.acc||0)+dt;if(r.acc>.16){r.acc-=.16;let best=null,bd=1e9;Ts.forEach(t=>{if(t.o<.5)return;const d=Math.abs(t.x-r.x);if(d<bd){bd=d;best=t}});
     if(best){Ts.splice(Ts.indexOf(best),1);Gs.push({x:r.x+(best.x>r.x?14:-14),y:MY-12,st:'fri',bg:{x:r.x,y:MY-12,o:1},p:null,slot:-1,t:0});cnt[1]++;spawnT();
      fxh+=`<circle cx="${r.x}" cy="${MY-8}" r="18" fill="none" stroke="#f2b630" stroke-width="3"/>`}}
    const tr=TR();
    if(r.t>tr*.55&&!noGRK)r.grk=Math.min(1,(r.grk||0)+dt*3);
    if(r.t>tr){r.on=0;r.arr=1;r.grk=0;r.t=0}
    g.style.filter=`drop-shadow(0 0 ${f1(5+3*Math.sin(T*12))}px #ffb300)`}
   else{g.style.filter='';if(r.arr){r.arr-=dt/4;if(r.arr<0)r.arr=0}}
   if(r.grk)fxh+=`<g transform="translate(${r.x+16},${MY-30})" opacity="${f1(r.grk)}"><rect x="-17" y="-8" width="34" height="16" rx="8" fill="#5b74a8"/><text y="3.5" text-anchor="middle" style="font-size:8px;font-weight:800;fill:#fff">GRK1</text></g>${[0,1,2].map(k=>`<circle cx="${r.x-10+k*9}" cy="${MY-6}" r="4" fill="#e66a5e" opacity="${f1(r.grk)}"/>`).join('')}`;
   if(r.arr>0)fxh+=`<path d="M${r.x-20},${MY-2} Q${r.x},${MY-36} ${r.x+20},${MY-2}" fill="url(#gArr)" stroke="#7a4fa6" stroke-width="1.5" opacity="${f1(Math.min(1,r.arr*2))}"/><text x="${r.x}" y="${MY-38}" text-anchor="middle" style="font-size:9px;font-weight:800;fill:#7a4fa6" opacity="${f1(Math.min(1,r.arr*2))}">arrestin</text>`});
  // inaktiv transducin diffunderer langs membranen
  let th='';Ts.forEach(t=>{t.v+=(R()-.5)*240*dt;t.v*=.96;t.x+=t.v*dt;if(t.x<X0+10||t.x>X1-10)t.v*=-1;t.x=Math.max(X0+10,Math.min(X1-10,t.x));t.o=Math.min(1,t.o+dt*2);
   th+=`<g transform="translate(${f1(t.x)},${MY-14})" opacity="${f1(t.o)}">${FT.tr(true)}<g transform="translate(12,-12)">${FT.bg()}</g></g>`});
  // aktivt Gα-GTP: finner en ledig PDE-plass, binder, slås av av RGS9
  for(let k=Gs.length-1;k>=0;k--){const G=Gs[k];G.t+=dt;G.bg.o-=dt*.8;
   if(G.st==='fri'){if(!G.p){let best=null,bd=1e9;Ps.forEach((p,pi)=>p.s.forEach((sl,si)=>{if(sl)return;const d=Math.abs(p.x-G.x)+si;if(d<bd){bd=d;best=[pi,si]}}));if(best){G.p=best;Ps[best[0]].s[best[1]]=G}}
    if(G.p){const p=Ps[G.p[0]],tx=p.x+(G.p[1]?12:-12),ty=MY-44;G.x+=(tx-G.x)*Math.min(1,dt*3.5);G.y+=(ty-G.y)*Math.min(1,dt*3.5);if(Math.abs(tx-G.x)<2){G.st='bundet';G.t=0}}}
   else if(G.st==='bundet'){if(G.t>TG()){G.st='av';G.t=0;fxh+=``}}
   else if(G.st==='av'){if(G.t>.6){Ps[G.p[0]].s[G.p[1]]=null;Gs.splice(k,1);spawnT(G.x);continue}}
   th+=`<g transform="translate(${f1(G.x)},${f1(G.y)})">${G.st==='av'?`<g opacity="${f1(1-G.t/.6)}">${FT.tr(true)}</g><g transform="translate(0,-22)" opacity="${f1(1-G.t/.6)}"><rect x="-16" y="-7" width="32" height="14" rx="7" fill="#c0453b"/><text y="3" text-anchor="middle" style="font-size:7.5px;font-weight:800;fill:#fff">RGS9</text></g>`:`<g style="filter:drop-shadow(0 0 4px #ffb300)">${FT.tr(false)}</g>`}</g>`;
   if(G.bg.o>0)th+=`<g transform="translate(${f1(G.bg.x)},${f1(G.bg.y-14)})" opacity="${f1(G.bg.o)}">${FT.bg()}</g>`}
  q('#ftT').innerHTML=th;
  // PDE-aktivitet: én bundet Gα gir lite, to gir full aktivitet (dimer-aktivering)
  let act=0;Ps.forEach((p,i)=>{const n=p.s.filter(x=>x&&x.st==='bundet').length,a=n===2?1:n===1?.25:0;act+=a;p.a=a;
   const e=q('#ftP'+i);e.style.filter=a?`drop-shadow(0 0 ${f1(3+6*a)}px #3e7cc4)`:'';e.querySelector('.gam').setAttribute('transform',`translate(0,${f1(-10*Math.min(1,n))})`);e.querySelector('.gam').setAttribute('opacity',f1(1-.6*Math.min(1,n)))});
  // cGMP: syntese (GC, raskere når Ca²⁺ er lav) og spalting (basal + PDE)
  // jevn cGMP-konsentrasjon (1 = mørke); partiklene følger etter
  const synth=BASAL*(1+5*(1-ca)),hyd=(BASAL+act*KP)*cc;cc+=(synth-hyd)*dt;cc=Math.max(0,cc);
  spl+=act*KP*cc*N0*dt;cnt[2]=Math.round(spl);
  const tgt=Math.round(cc*N0);
  while(c.length<tgt)spawnC(GC+(R()-.5)*10,MY-40);
  while(c.length>tgt){const ap=Ps.filter(p=>p.a>0);let idx=Math.floor(R()*c.length);
   if(ap.length&&R()<act*KP/(act*KP+BASAL)){const p=ap[Math.floor(R()*ap.length)];let bd=1e9;c.forEach((m,j)=>{const d=Math.hypot(m.x-p.x,m.y-MY+40);if(d<bd){bd=d;idx=j}});fx.push({x:p.x+(R()-.5)*30,y:MY-58,t:0})}
   c.splice(idx,1)}
  let ch='';c.forEach(m=>{m.vx+=(R()-.5)*200*dt;m.vy+=(R()-.5)*200*dt;m.vx*=.95;m.vy*=.95;m.x+=m.vx*dt;m.y+=m.vy*dt;
   if(m.x<X0||m.x>PM-12)m.vx*=-1;if(m.y<110||m.y>MY-26)m.vy*=-1;m.x=Math.max(X0,Math.min(PM-12,m.x));m.y=Math.max(110,Math.min(MY-26,m.y));m.o=Math.min(1,m.o+dt*2);ch+=FT.cgmp(m.x,m.y,m.o)});
  for(let k=fx.length-1;k>=0;k--){const f=fx[k];f.t+=dt;if(f.t>.7){fx.splice(k,1);continue}ch+=`<text x="${f1(f.x)}" y="${f1(f.y-f.t*20)}" text-anchor="middle" style="font-size:8.5px;font-weight:800;fill:#5e3d99" opacity="${f1(1-f.t/.7)}">GMP</text>`}
  q('#ftC').innerHTML=ch;
  // kanaler: åpen andel ~ (cGMP)³; Ca²⁺ følger innstrømmen
  I=Math.min(1.15,cc**3);ca+=(I-ca)*Math.min(1,dt/.6);
  CNG.forEach((y,i)=>{q('#ftG'+i).innerHTML=`<rect x="-15" y="${f1(-8+8*cl(I))}" width="30" height="${f1(16-16*cl(I))}" fill="#4f9a2e" opacity=".85"/>`;
   if(ANIM&&R()<dt*9*I){const kCa=R()<.25;ion.push({x:PM+40,y:y+(R()-.5)*8,k:kCa?'Ca²⁺':'Na⁺',c:kCa?'#5aa83a':'#e07a2c',vx:-110,t:0})}});
  if(ANIM&&R()<dt*4*ca)ion.push({x:PM-6,y:NCKX+(R()-.5)*8,k:'Ca²⁺',c:'#5aa83a',vx:110,t:0});
  let ih='';for(let k=ion.length-1;k>=0;k--){const p=ion[k];p.t+=dt;p.x+=p.vx*dt;if(p.t>.9){ion.splice(k,1);continue}ih+=`<g transform="translate(${f1(p.x)},${f1(p.y)})" opacity="${f1(1-p.t/.9)}"><circle r="7" fill="${p.c}"/><text y="2.8" text-anchor="middle" style="font-size:6px;font-weight:800;fill:#fff">${p.k}</text></g>`}
  q('#ftGcap').setAttribute('fill',ca<.8?'#ffb347':'#f7d488');
  q('#ftFx').innerHTML=fxh+ih;
  // graf
  hist.push(I);if(hist.length>420)hist.shift();
  let d='';hist.forEach((v,i)=>d+=(i?'L':'M')+f1(X0+i*(PM+16-X0)/420)+','+f1(584-54*cl(v)));q('#ftI').setAttribute('d',d);
  q('#ftN0').textContent=cnt[0];q('#ftN1').textContent=cnt[1];q('#ftN2').textContent=cnt[2];
  if(R()<dt*2)msg()})}};

/* ---------------- RODOPSIN (fasefilm) ---------------- */
{
const HX=[262,312,362,412,462,512,562],MT=232,MB=408;
const lab=(t,x,y,c='#1f2430',sz=12.5,a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" style="font-size:${sz}px;font-weight:700;fill:${c}">${t}</text>`;
// retinal som sikksakk-kjede; tw = 0 gir 11-cis (knekk), 1 gir all-trans (rett)
const retinal=(st)=>{const ox=(1-st.ret)*150,oy=(1-st.ret)*170,ring=[392+ox,318+oy];
 const pts=[];let x=ring[0]+22,y=ring[1],a=0;for(let i=0;i<10;i++){if(i===5)a=-(1-st.tw)*52*Math.PI/180+st.twi*.6;const zig=(i%2?-1:1)*6;pts.push([x+Math.sin(a)*zig,y+Math.cos(a)*zig]);x+=Math.cos(a)*16;y+=Math.sin(a)*16}
 const sb=pts[pts.length-1];
 let s=`<g opacity="${f1(.25+.75*st.ret)}"><polygon points="${Array.from({length:6},(_,k)=>{const a=k/6*6.283+.5;return f1(ring[0]+15*Math.cos(a))+','+f1(ring[1]+15*Math.sin(a))}).join(' ')}" fill="#fff4c4" stroke="#c48a12" stroke-width="2.5"/><path d="M${f1(ring[0]+15)},${f1(ring[1])} L${pts.map(p=>f1(p[0])+','+f1(p[1])).join(' L')}" fill="none" stroke="#c48a12" stroke-width="3.2" stroke-linejoin="round"/>`;
 // C11=C12 markert
 s+=`<circle cx="${f1(pts[5][0])}" cy="${f1(pts[5][1])}" r="4.5" fill="#f2b630" stroke="#a46e14"/>`;
 if(st.ret>.9)s+=`<line x1="${f1(sb[0])}" y1="${f1(sb[1])}" x2="${HX[6]-8}" y2="${f1(sb[1])}" stroke="#2c5a85" stroke-width="3"/><text x="${HX[6]-6}" y="${f1(sb[1]+16)}" style="font-size:9px;font-weight:800;fill:#2c5a85">K296</text>`;
 s+=`</g>`;
 return {s,pts,sb}};
const tegn=(st,id)=>{
 let s=`<rect x="0" y="${MT}" width="800" height="${MB-MT}" fill="#fbf1dc"/>${[MT,MB].map(y=>Array.from({length:62},(_,k)=>`<circle cx="${6+k*13}" cy="${y+(y===MT?6:-6)}" r="5" fill="#e9b23a" opacity=".8"/>`).join('')).join('')}`;
 s+=lab('cytosol – her kobler transducin seg på',30,MT-110,'#5d6472',12,'start')+lab('inne i disken',30,MB+34,'#5d6472',12,'start')+lab('diskmembran',30,MT+30,'#a8761a',11,'start');
 // heliksene; H6 (indeks 5) vipper ut i Meta II
 let hx='';HX.forEach((x,i)=>{const rot=i===5?st.h6*20:i===2?-st.h6*4:0;hx+=`<g transform="rotate(${f1(rot)} ${x} ${MB-10})"><rect x="${x-21}" y="${MT-26}" width="42" height="${MB-MT+40}" rx="21" fill="url(#gRho)" stroke="#9c3d63" stroke-width="2" opacity=".93"/>${Array.from({length:8},(_,k)=>`<path d="M${x-20},${MT-14+k*25} Q${x},${MT-4+k*25} ${x+20},${MT-14+k*25}" fill="none" stroke="#b44a73" stroke-width="1.3" opacity=".6"/>`).join('')}<text x="${x}" y="${MB+28}" text-anchor="middle" style="font-size:11px;font-weight:800;fill:#9c3d63">${i+1}</text></g>`});
 s+=P('opsin',hx,{lx:HX[0]-50,ly:MT+60});
 const R=retinal(st);s+=P('retinal',R.s,{lx:R.pts[2][0],ly:R.pts[2][1]-30});
 // proton fra Schiff-basen til Glu113
 if(st.pr>.01)s+=`<g opacity="${f1(Math.min(1,st.pr*3)*(1-Math.max(0,st.pr-.97)*0))}"><circle cx="${f1(R.sb[0]-st.pr*170)}" cy="${f1(R.sb[1]+18+st.pr*20)}" r="9" fill="#3e7cc4"/><text x="${f1(R.sb[0]-st.pr*170)}" y="${f1(R.sb[1]+21.5+st.pr*20)}" text-anchor="middle" style="font-size:9px;font-weight:800;fill:#fff">H⁺</text></g>`+(st.pr>.9?lab('Glu113',R.sb[0]-170,R.sb[1]+66,'#3e7cc4',10):'');
 // C-terminal hale med fosfater
 s+=`<path d="M${HX[6]+18},${MT-20} C${HX[6]+60},${MT-60} ${HX[6]+120},${MT-20} ${HX[6]+160},${MT-70}" fill="none" stroke="#b44a73" stroke-width="5" stroke-linecap="round"/>`;
 s+=P('avslutning',`<g opacity="${f1(st.phos)}">${[0,1,2].map(k=>`<g transform="translate(${HX[6]+76+k*30},${MT-44-k*8})"><circle r="9" fill="#e66a5e" stroke="#a8352c"/><text y="3.5" text-anchor="middle" style="font-size:9.5px;font-weight:800;fill:#fff">P</text></g>`).join('')}</g><g opacity="${f1(st.grk)}" transform="translate(${HX[6]+150},${MT-110})"><rect x="-34" y="-14" width="68" height="28" rx="14" fill="#5b74a8"/><text y="5" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#fff">GRK1</text></g><g opacity="${f1(st.arr)}" transform="translate(${(HX[2]+HX[5])/2},${MT-60-(1-st.arr)*60})"><path d="M-110,40 Q-110,-30 0,-34 Q110,-30 110,40 Q60,10 0,12 Q-60,10 -110,40Z" fill="url(#gArr)" stroke="#7a4fa6" stroke-width="2"/><text y="-2" text-anchor="middle" style="font-size:13px;font-weight:800;fill:#4a2a70">arrestin</text></g>`,{nl:1});
 // transducins C-hale stikker inn i lommen som åpnes
 s+=P('transducin',`<g opacity="${f1(st.gt)}" transform="translate(${HX[4]+12},${MT-150+st.gt*96})"><ellipse cx="0" cy="-40" rx="70" ry="34" fill="url(#gGa)" stroke="#a46e14" stroke-width="2"/><text y="-36" text-anchor="middle" style="font-size:13px;font-weight:800;fill:#7a520d">transducin (Gα)</text><rect x="-7" y="-10" width="14" height="44" rx="7" fill="#f2c14e" stroke="#a46e14" stroke-width="1.6"/></g>`,{nl:1});
 // foton
 if(st.ph>.01){const u=st.ph;s+=`<path d="M60,90 ${Array.from({length:12},(_,k)=>`q10,${k%2?-10:10} 20,0`).join(' ')}" fill="none" stroke="#f2b630" stroke-width="3" opacity="${f1(u)}" transform="translate(${f1(u*120)},${f1(u*150)}) rotate(28 60 90)"/>`+lab('foton (≈ 500 nm)',90,86,'#a8761a',12,'start').replace('<text','<text opacity="'+f1(u)+'"')}
 // tidslinje
 const TL=[['fs',.0],['ps',.17],['ns',.33],['µs',.5],['ms',.67],['s',.83],['min',1]];const tx=k=>130+k*270;
 s+=`<g transform="translate(0,500)"><line x1="${tx(0)}" y1="0" x2="${tx(1)}" y2="0" stroke="#c9c0ad" stroke-width="3"/>${TL.map(([t,k])=>`<line x1="${tx(k)}" y1="-6" x2="${tx(k)}" y2="6" stroke="#9c8f78" stroke-width="2"/><text x="${tx(k)}" y="22" text-anchor="middle" class="rl" style="font-size:11px">${t}</text>`).join('')}<circle cx="${f1(tx(st.tm))}" cy="0" r="9" fill="#c0453b" stroke="#fff" stroke-width="2"/><text x="${tx(0)}" y="-16" class="rl" style="font-size:11px">tid etter fotonet (logaritmisk)</text></g>`;
 return s};
const K=[
 {tw:0,twi:0,h6:0,gt:0,ph:0,phos:0,grk:0,arr:0,ret:1,pr:0,tm:0},
 {tw:1,twi:.3,h6:0,gt:0,ph:1,phos:0,grk:0,arr:0,ret:1,pr:0,tm:0},
 {tw:1,twi:0,h6:1,gt:0,ph:0,phos:0,grk:0,arr:0,ret:1,pr:1,tm:.67},
 {tw:1,twi:0,h6:1,gt:1,ph:0,phos:0,grk:0,arr:0,ret:1,pr:1,tm:.7},
 {tw:1,twi:0,h6:.9,gt:0,ph:0,phos:1,grk:1,arr:1,ret:1,pr:1,tm:.76},
 {tw:1,twi:0,h6:.4,gt:0,ph:0,phos:0,grk:0,arr:0,ret:0,pr:0,tm:1}];
const TM=[{ret:[0,.7],tw:[.5,.9],h6:[0,.6],pr:[0,.3],tm:[0,1]},{ph:[0,.45],tw:[.45,.65],twi:[.45,.65],tm:[0,.2]},{ph:[0,.2],h6:[.1,.9],pr:[.2,.9],tm:[0,1]},{gt:[0,1]},{gt:[0,.4],grk:[0,.4],phos:[.2,.6],arr:[.5,1]},{arr:[0,.4],grk:[0,.3],phos:[0,.4],ret:[.3,1]}];
S.rodopsin=()=>`<rect width="800" height="600" fill="#fbf8f4"/>${title('Rodopsin','Et protein med syv heliser og et lysfølsomt molekyl – retinal – inni')}<g id="ff">${tegn(K[0],'rodopsin')}</g>`;
LIVE.rodopsin=fasefilm({tittel:'Fra lys til aktivt protein',keys:K,tm:TM,svg:tegn,dur:6.2,pos:'br',w:290,steps:[
 {id:'rodopsin',t:'<b>Mørk rodopsin.</b> Retinal (fra vitamin A) sitter bundet til lysin 296 i heliks 7. Den har en knekk ved C11=C12: <b>11-cis</b>. Den låser proteinet i av-stilling.'},
 {id:'retinal',t:'<b>Fotoisomerisering.</b> Fotonet retter ut knekken – 11-cis blir <b>all-trans</b> på ca. 200 femtosekunder, en av de raskeste reaksjonene i naturen. Bare ca. 2 av 3 absorberte fotoner gir isomerisering.'},
 {id:'rodopsin',t:'<b>Metarodopsin II.</b> Via flere mellomtrinn (batho-, lumi-, meta I) skyves heliksene fra hverandre. Schiff-basen mister H⁺, og <b>heliks 6 vipper ut</b> – det åpner en lomme på cytosolsiden. Etter ca. 1 ms er rodopsin aktivt (R*).'},
 {id:'transducin',t:'<b>Transducin kobler seg på.</b> Halen til Gα stikker inn i lommen. R* bytter GDP mot GTP i transducin og slipper den – og kan aktivere mange flere etter hverandre.'},
 {id:'avslutning',t:'<b>Avslutning.</b> Rodopsinkinase (GRK1) setter fosfatgrupper på halen, og <b>arrestin</b> binder seg og dekker lommen. R* er slått av – i en musestav etter ca. 40 ms.'},
 {id:'synssyklus',t:'<b>Synssyklusen.</b> All-trans-retinal slippes og fraktes ut til pigmentepitelet, der enzymet RPE65 lager ny 11-cis-retinal. Den sendes tilbake og binder seg til opsin – rodopsin er klar igjen. Det tar minutter (mørketilpasning).'}],
 map:{opsin:0,retinal:1,transducin:3,avslutning:4,synssyklus:5}});
}

/* ---------------- G-PROTEINSYKLUSEN (transducin) ---------------- */
{
const MY=360;
const pill=(x,y,t,c,o=1)=>o<.01?'':`<g transform="translate(${f1(x)},${f1(y)})" opacity="${f1(o)}"><rect x="-21" y="-10" width="42" height="20" rx="10" fill="${c}" stroke="rgba(0,0,0,.25)"/><text y="4.5" text-anchor="middle" style="font-size:11px;font-weight:800;fill:#fff">${t}</text></g>`;
const tegn=(st,id)=>{
 let s=`<rect x="0" y="${MY}" width="800" height="54" fill="#fbf1dc"/>${[MY,MY+54].map(y=>Array.from({length:62},(_,k)=>`<circle cx="${6+k*13}" cy="${y+(y===MY?6:-6)}" r="5" fill="#e9b23a" opacity=".8"/>`).join('')).join('')}<text x="24" y="${MY+92}" class="rl" style="font-size:12px">diskmembran – nedenfor er innsiden av disken</text><text x="24" y="110" class="rl" style="font-size:12px">cytosol</text>`;
 // rodopsin
 s+=P('gpcr',`<g transform="translate(160,${MY+27})" style="${st.ra>.5?'filter:drop-shadow(0 0 8px #ffb300)':''}">${[-24,-15,-6,3,12,21].map((d,i)=>`<rect x="${d-4}" y="-46" width="8" height="92" rx="4" fill="${i%2?'#e58aab':'#d06b92'}" stroke="#9c3d63" stroke-width="1"/>`).join('')}<text y="-56" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#9c3d63">${st.ra>.5?'R* (aktiv)':'rodopsin'}</text></g>`,{nl:1});
 // PDE6
 s+=P('pde6',`<g transform="translate(640,${MY-34})" style="${st.pa>.3?`filter:drop-shadow(0 0 ${f1(4+8*st.pa)}px #3e7cc4)`:''}"><ellipse cx="-22" cy="0" rx="24" ry="30" fill="url(#gPde)" stroke="#3e6fae" stroke-width="2"/><ellipse cx="22" cy="0" rx="24" ry="30" fill="url(#gPde)" stroke="#3e6fae" stroke-width="2"/><text y="48" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#3e6fae">PDE6</text><g transform="translate(${f1(-st.pg*40)},${f1(-st.pg*26)})"><rect x="-30" y="-40" width="22" height="13" rx="5" fill="#2c5a85"/><text x="-19" y="-30.5" text-anchor="middle" style="font-size:9px;font-weight:800;fill:#fff">γ</text></g><rect x="8" y="-40" width="22" height="13" rx="5" fill="#2c5a85"/><text x="19" y="-30.5" text-anchor="middle" style="font-size:9px;font-weight:800;fill:#fff">γ</text></g>`+
  `<g opacity="${f1(st.pa)}">${[0,1,2].map(k=>`<g transform="translate(${700+k*30},${MY-120-k*26})">${FT.cgmp(0,0,1,8)}<text x="14" y="4" style="font-size:10px;font-weight:700;fill:#5e3d99">→ GMP</text></g>`).join('')}</g>`,{nl:1});
 // Gβγ
 s+=P('transducin',`<g transform="translate(${f1(st.bx)},${f1(st.by)})"><ellipse rx="24" ry="20" fill="url(#gGbg)" stroke="#2b8c80" stroke-width="2"/><text y="4" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#fff">βγ</text><line x1="0" y1="20" x2="0" y2="${f1(MY+6-st.by)}" stroke="#2b8c80" stroke-width="2.5" stroke-dasharray="3 2"/></g>`+
 // Gα
  `<g transform="translate(${f1(st.gx)},${f1(st.gy)})" style="${st.nt>.5&&st.np>.5?'filter:drop-shadow(0 0 6px #ffb300)':''}"><path d="M-40,-8 C-44,-46 34,-52 42,-14 C48,16 20,34 -6,32 C-30,30 -38,14 -40,-8Z" fill="url(#gGa)" stroke="#a46e14" stroke-width="2"/><text x="-8" y="-22" text-anchor="middle" style="font-size:13px;font-weight:800;fill:#7a520d">Gα</text><line x1="-20" y1="28" x2="-20" y2="${f1(MY+6-st.gy)}" stroke="#a46e14" stroke-width="2.5" stroke-dasharray="3 2"/>${pill(8,6,st.nt>.5?'GTP':'GDP',st.nt>.5?'#e07a2c':'#7d68c0',st.np)}</g>`,{nl:1});
 // nukleotider på vei inn/ut
 s+=pill(st.gx+8,st.gy+6-st.gd*110,'GDP','#7d68c0',st.gd>0&&st.gd<1?1-st.gd:0)+pill(st.gx+8-(1-st.gi)*60,st.gy+6-(1-st.gi)*120,'GTP','#e07a2c',st.gi>0&&st.gi<1?st.gi:0);
 // RGS9-kompleks og fosfat
 s+=P('rgs9',`<g opacity="${f1(st.rg)}" transform="translate(${f1(st.gx+10)},${f1(st.gy-70-(1-st.rg)*40)})"><rect x="-58" y="-17" width="116" height="34" rx="17" fill="#c0453b"/><text y="5" text-anchor="middle" style="font-size:12px;font-weight:800;fill:#fff">RGS9·Gβ5·R9AP</text></g>`,{nl:1});
 if(st.pi>0&&st.pi<1)s+=`<g transform="translate(${f1(st.gx+40+st.pi*60)},${f1(st.gy-st.pi*90)})" opacity="${f1(1-st.pi)}"><circle r="11" fill="#e66a5e"/><text y="4" text-anchor="middle" style="font-size:10px;font-weight:800;fill:#fff">Pᵢ</text></g>`;
 return s};
const G0={ra:0,gx:360,gy:MY-38,bx:398,by:MY-62,np:1,nt:0,gd:0,gi:0,pg:0,pa:0,rg:0,pi:0};
const K=[G0,
 {...G0,ra:1,gx:236,bx:274,np:0,gd:1},
 {...G0,ra:1,gx:420,gy:MY-40,bx:300,by:MY-60,np:1,nt:1,gd:1,gi:1},
 {...G0,ra:1,gx:572,gy:MY-40,bx:300,by:MY-60,nt:1,gd:1,gi:1,pg:1,pa:1},
 {...G0,ra:0,gx:572,gy:MY-40,bx:300,by:MY-60,nt:0,gd:1,gi:1,pg:1,pa:.25,rg:1,pi:1},
 {...G0,gd:0,gi:0}];
const TM=[{},{gx:[0,.6],bx:[0,.6],np:[.5,.7],gd:[.5,1]},{gi:[0,.4],np:[0,.3],nt:[.3,.4],gx:[.4,1],bx:[.4,1],by:[.4,1],gy:[.4,1]},{gx:[0,.6],pg:[.5,.8],pa:[.6,1]},{rg:[0,.4],nt:[.4,.5],pi:[.4,1],pa:[.4,.8],ra:[0,.3]},{rg:[0,.3],gx:[.2,.9],bx:[.2,.9],by:[.2,.9],gy:[.2,.9],pg:[0,.5],pa:[0,.3]}];
S.transducin=()=>`<rect width="800" height="600" fill="#f7faf9"/>${title('G-proteinsyklusen','Transducin er et G-protein: en bryter som er «på» med GTP og «av» med GDP')}<g id="ff">${tegn(K[0],'transducin')}</g>`;
LIVE.transducin=fasefilm({tittel:'G-protein: på og av',keys:K,tm:TM,svg:tegn,dur:5.6,pos:'bl',w:300,steps:[
 {id:'transducin',t:'<b>Hvile.</b> Transducin består av tre deler: Gα (med GDP), β og γ. Alle henger fast i membranen med fettsyrehaler.'},
 {id:'gpcr',t:'<b>R* fanger transducin.</b> Aktivt rodopsin binder Gαβγ og vrir Gα slik at GDP slipper taket.'},
 {id:'gtp',t:'<b>GTP inn – bryteren slås på.</b> Det er mye mer GTP enn GDP i cellen, så GTP binder seg. Gα-GTP løsner fra βγ og fra R*. R* er fri til å aktivere neste transducin – hundrevis per sekund.'},
 {id:'pde6',t:'<b>Gα-GTP skrur på PDE6.</b> Gα skyver bort den hemmende γ-delen av PDE6. Nå spalter PDE6 cGMP raskt. Full aktivitet krever at <b>begge</b> halvdelene får en Gα.'},
 {id:'rgs9',t:'<b>RGS9 slår av.</b> Gα kan spalte GTP selv, men sakte. RGS9-komplekset gjør det mange ganger raskere: GTP → GDP + Pᵢ, og PDE6 hemmes igjen.'},
 {id:'transducin',t:'<b>Tilbake til start.</b> Gα-GDP finner βγ igjen. Den samme bryteren – reseptor, G-protein, GTP/GDP – brukes av hundrevis av reseptorer i kroppen: lukt, smak, adrenalin, dopamin …'}],
 map:{gtp:2,pde6:3,rgs9:4,gpcr:1}});
}
