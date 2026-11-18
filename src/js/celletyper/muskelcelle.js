/* ---------------- MUSKELCELLE ---------------- */
S.muskelcelle=()=>{
 const body="M690,170 L120,170 C64,170 40,236 40,300 C40,364 64,430 120,430 L690,430Z";
 let s=`<rect width="800" height="600" fill="#f7efe9"/><rect width="800" height="600" fill="url(#pGran)" opacity=".6"/><defs><clipPath id="mClip"><path d="${body}"/></clipPath></defs><g id="mFib">`;
 let b=`<g filter="url(#sh)"><path d="${body}" fill="url(#gMusL)" stroke="#a8554e" stroke-width="3"/></g><g clip-path="url(#mClip)">`;
 for(let x=46;x<690;x+=18)b+=`<rect x="${x}" y="170" width="9" height="260" fill="#b9605a" opacity=".26"/><line x1="${x+13.5}" y1="170" x2="${x+13.5}" y2="430" stroke="#9c4a45" stroke-width=".8" opacity=".35"/>`;
 b+=`<path d="M110,196 H688" stroke="#fff" stroke-width="12" opacity=".16" stroke-linecap="round"/></g>`;
 s+=P('sarkolemma',b,{lx:250,ly:300});
 const nuc=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="24" ry="7.5" fill="url(#gNuc)" stroke="#6a4c98" stroke-width="1.6"/><ellipse cx="${x+5}" cy="${y-1}" rx="5" ry="2.6" fill="url(#gNucl)"/>`;
 s+=P('kjerne',[[110,184],[215,182],[320,183],[160,416],[270,417],[360,418]].map(([x,y])=>nuc(x,y)).join(''),{lx:215,ly:206});
 const winF="M402,192 Q470,182 540,192 Q615,198 690,190 L690,410 Q620,420 540,410 Q470,418 404,413 Q396,300 402,192Z",winE="M690,190 Q615,198 540,192 Q470,182 402,192 Q396,300 404,413 Q470,418 540,410 Q620,420 690,410";
 let w=`<path d="${winF}" fill="#6e3330"/><ellipse cx="690" cy="300" rx="18" ry="128" fill="#8e4a44" stroke="#a8554e" stroke-width="2.5"/>`;
 s+=w;
 const mf=(y,xe)=>{let o=`<rect x="408" y="${y-15}" width="${xe-408}" height="30" rx="15" fill="url(#gFib)" stroke="#a8554e" stroke-width="1.4"/>`;for(let x=416;x<xe-16;x+=26)o+=`<rect x="${x}" y="${y-14}" width="14" height="28" fill="#b9605a" opacity=".45"/><line x1="${x+20}" y1="${y-14}" x2="${x+20}" y2="${y+14}" stroke="#7a2f2a" stroke-width="1.6"/>`;return o};
 s+=P('sarkomer',[[214,742],[254,770],[294,756],[334,778],[374,738]].map(([y,xe])=>mf(y,xe)).join(''),{lx:684,ly:452});
 let sr='';[254,334].forEach(y=>{sr+=`<path d="M430,${y-13} ${Array.from({length:8},(_,k)=>`Q${443+k*26},${y-17} ${456+k*26},${y-13}`).join(' ')}" fill="none" stroke="#f0a7c6" stroke-width="2.4" opacity=".95"/><path d="M430,${y+13} ${Array.from({length:8},(_,k)=>`Q${443+k*26},${y+17} ${456+k*26},${y+13}`).join(' ')}" fill="none" stroke="#f0a7c6" stroke-width="2.4" opacity=".95"/>`;for(let x=440;x<640;x+=26)sr+=`<path d="M${x},${y-13} C${x+5},${y-4} ${x-3},${y+4} ${x+2},${y+13}" fill="none" stroke="#f0a7c6" stroke-width="1.8"/>`});
 s+=P('sr',sr,{lx:520,ly:246});
 let tt='';for(let x=436;x<=660;x+=52)tt+=`<line x1="${x}" y1="193" x2="${x}" y2="408" stroke="#3e7cc4" stroke-width="2.6" opacity=".8"/><ellipse cx="${x}" cy="192" rx="4" ry="2" fill="#1f3f70"/><line x1="${x}" y1="193" x2="${x}" y2="408" class="hit"/>`;
 s+=P('ttubuli',tt,{lx:644,ly:206});
 s+=P('mitokondrie',mitoD(472,234,0,.2)+mitoD(592,274,0,.2)+mitoD(520,354,0,.2)+mitoD(630,394,0,.18),{nl:1});
 s+=`<path d="${winE}" fill="none" stroke="#a8554e" stroke-width="3" stroke-linejoin="round"/>`;
 s+=P('endeplate',`<g id="mNerve"><path d="M140,-10 C150,60 214,96 232,160" fill="none" stroke="#a8693a" stroke-width="15" stroke-linecap="round"/><path d="M140,-10 C150,60 214,96 232,160" fill="none" stroke="#fbf1dc" stroke-width="11" stroke-linecap="round"/>${[[212,169],[234,173],[256,169]].map(([x,y])=>`<path d="M232,160 L${x},${y}" stroke="#a8693a" stroke-width="5"/><ellipse cx="${x}" cy="${y}" rx="11" ry="6" fill="url(#gNeur)" stroke="#a8693a" stroke-width="1.6"/>`).join('')}</g>`,{lx:300,ly:120});
 s+=`</g><text x="420" y="470" text-anchor="middle" class="rl" style="font-size:12.5px;font-weight:600">Skjelettmuskelfiber – tverrstripet, med mange kjerner langs kanten. Fiberen er skåret opp til høyre.</text>`;
 return s};
LIVE.muskelcelle={pos:'bl',ctrl:`<div style="width:232px"><div class="cx-row"><button class="cbtn" id="mGo">⚡ Send nervesignal</button></div><div class="cx-note" id="mN"></div></div>`,
init(){const g=q('#mFib'),nv=q('#mNerve'),nt=cq('#mN');let t=-1,idle=1.5;const base='Klikk på en myofibrill for å se aktin og myosin inni.';nt.textContent=base;
 const set=k=>g.setAttribute('transform',`translate(40,300) scale(${(1-.07*k).toFixed(3)},${(1+.05*k).toFixed(3)}) translate(-40,-300)`);
 cq('#mGo').onclick=()=>{t=0};
 return loop(dt=>{if(t<0){idle+=dt;if(ANIM&&idle>3.2){idle=0;t=0}return}t+=dt;const k=t<.3?0:t<.8?ez((t-.3)/.5):t<1.4?1:t<2?1-ez((t-1.4)/.6):0;nv.style.filter=t<.45?'url(#glow2)':'';set(k);if(t>=.3&&t<2)nt.innerHTML='<b>Nervesignal</b> → aksjonspotensial i sarkolemma og T-tubuli → SR slipper ut Ca²⁺ → alle sarkomerene forkortes. Fiberen blir kortere og tykkere.';if(t>2.1){t=-1;idle=0;nt.textContent=base}})}};

/* ---------------- SARKOMER ---------------- */
function drawSark(c,ca,rig,tm){const H=300-72*c,xL=400-H,xR=400+H,AL=228,ACT=[205,285,365,445],MYO=[245,325,405];
 const zz=x=>{let d=`M${f1(x)},183`;for(let y=183,k=0;y<467;y+=14,k++)d+=` L${f1(x+(k%2?5:-5))},${y+14}`;return d};
 q('#sZ').innerHTML=[xL,xR].map(x=>`<path d="${zz(x)}" class="hit"/><path d="${zz(x)}" fill="none" stroke="#374151" stroke-width="4" stroke-linejoin="round"/>`).join('');
 let a='',t='';ACT.forEach(y=>{[[xL,xL+AL],[xR-AL,xR]].forEach(([x1,x2])=>{a+=`<line x1="${f1(x1)}" y1="${y}" x2="${f1(x2)}" y2="${y}" class="hit"/><line x1="${f1(x1)}" y1="${y-2.6}" x2="${f1(x2)}" y2="${y-2.6}" stroke="#5b86c0" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="0.1 7.5"/><line x1="${f1(x1+3.7)}" y1="${y+2.6}" x2="${f1(x2)}" y2="${y+2.6}" stroke="#86a8d6" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="0.1 7.5"/>`;
  const oy=ca?-5.5:0;t+=`<line x1="${f1(x1)}" y1="${y+oy}" x2="${f1(x2)}" y2="${y+oy}" stroke="#4f8a2b" stroke-width="1.8" opacity=".9"/>`;for(let x=x1+18;x<x2-6;x+=38)t+=`<circle cx="${f1(x)}" cy="${y+oy}" r="3.6" fill="${ca?'#4caf6a':'#e9a923'}" stroke="#5d6472" stroke-width=".7"/>`})});
 q('#sA').innerHTML=a;q('#sT').innerHTML=t;
 let m='';MYO.forEach(y=>{m+=`<line x1="208" y1="${y}" x2="592" y2="${y}" class="hit"/><line x1="208" y1="${y}" x2="592" y2="${y}" stroke="#a8443c" stroke-width="12" stroke-linecap="round"/><line x1="212" y1="${y-1.6}" x2="588" y2="${y-1.6}" stroke="#e8a6a0" stroke-width="3.5" stroke-linecap="round"/>`});
 m+=`<line x1="400" y1="222" x2="400" y2="428" stroke="#6e2a25" stroke-width="3"/>`;q('#sM').innerHTML=m;
 let h='',idx=0;MYO.forEach(y=>{[-1,1].forEach(side=>{for(let k=0;k<10;k++){const x=side<0?214+k*18:424+k*18;[-1,1].forEach(dir=>{idx++;const inA=side<0?(x>=xL&&x<=xL+AL):(x>=xR-AL&&x<=xR);let att=inA&&(rig||ca),tdx,dy;
  if(att&&rig){tdx=side*-4;dy=31}else if(att){const ph=(tm*1.5+idx*.137)%1;if(ph<.6){const s2=ph/.6;tdx=side*(16-20*s2);dy=31}else{const r=(ph-.6)/.4;tdx=side*(-4+16*r);dy=22;att=false}}else{tdx=side*12;dy=21}
  const hx=x+tdx,hy=y+dir*dy;h+=`<line x1="${x}" y1="${y+dir*5}" x2="${f1(hx)}" y2="${f1(hy-dir*4)}" stroke="#8a3a35" stroke-width="2.2"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="5.2" fill="${att?'#c0392b':'#eba59d'}" stroke="#6e2a25" stroke-width="1"/>`})}})});
 q('#sH').innerHTML=h;
 const brk=(x1,x2,y,tx,c)=>x2-x1<3?'':`<path d="M${f1(x1)},${y+7} V${y} H${f1(x2)} V${y+7}" fill="none" stroke="${c}" stroke-width="2"/><text x="${f1((x1+x2)/2)}" y="${y-6}" text-anchor="middle" class="pt" style="font-size:12.5px;fill:${c}">${tx}</text>`;
 const hz=(xR-AL)-(xL+AL);
 q('#sB').innerHTML=brk(208,592,112,'A-bånd – lengden endres ikke','#a8443c')+brk(xL,208,148,'I-bånd','#3e6aa8')+brk(592,xR,148,'I-bånd','#3e6aa8')+(hz>4?brk(xL+AL,xR-AL,148,'H-sone','#7a6a3b'):'')+`<text x="${f1(xL)}" y="178" text-anchor="middle" class="pt" style="font-size:12px">Z</text><text x="${f1(xR)}" y="178" text-anchor="middle" class="pt" style="font-size:12px">Z</text><text x="400" y="486" text-anchor="middle" class="pt" style="font-size:12.5px">M-linje</text><text x="300" y="520" text-anchor="middle" class="rl" style="font-size:14px;fill:#1f2430">Sarkomerlengde: <tspan style="font-weight:700">${(2.5-.6*c).toFixed(2).replace('.',',')} µm</tspan></text>`}
S.sarkomer=()=>{let s=`<rect width="800" height="600" fill="#f9f1ee"/>${title('Sarkomeret','Aktin glir inn langs myosin – sarkomeret blir kortere, trådene gjør det ikke')}`;
 s+=P('baand',`<g id="sB"></g>`,{nl:1})+P('zskive',`<g id="sZ"></g>`,{nl:1})+P('aktin',`<g id="sA"></g>`,{nl:1})+P('troponin',`<g id="sT"></g>`,{nl:1})+P('myosin',`<g id="sM"></g>`,{nl:1})+P('kryssbro',`<g id="sH"></g>`,{nl:1});
 s+=`<g transform="translate(24,556)" class="pt" style="font-size:12px"><line x1="0" y1="0" x2="22" y2="0" stroke="#a8443c" stroke-width="8" stroke-linecap="round"/><text x="30" y="4">myosin</text><circle cx="92" cy="0" r="5" fill="#c0392b"/><text x="102" y="4">myosinhode</text><line x1="188" y1="0" x2="210" y2="0" stroke="#5b86c0" stroke-width="6" stroke-linecap="round" stroke-dasharray="0.1 7.5"/><text x="218" y="4">aktin</text><circle cx="270" cy="0" r="3.6" fill="#e9a923"/><line x1="262" y1="0" x2="278" y2="0" stroke="#4f8a2b" stroke-width="1.8"/><text x="284" y="4">troponin/tropomyosin</text></g>`;
 return s};
LIVE.sarkomer={pos:'br',ctrl:`<div style="width:250px"><div class="cx-title">Styr sarkomeret</div><label class="cx-tog"><input type="checkbox" id="sCa"> Nervesignal: Ca²⁺ slippes ut</label><label class="cx-tog" style="margin-top:5px"><input type="checkbox" id="sAtp"> Tomt for ATP</label><div class="cx-note" id="sN"></div></div>`,
init(){let c=0,ca=false,rig=false,tm=0,dirty=true;const nt=cq('#sN');
 const msg=()=>{dirty=true;nt.innerHTML=rig?'<b>Uten ATP</b> kan ikke myosinhodene slippe aktin. Muskelen låses i den stillingen den er i – slik oppstår likstivhet (rigor mortis).':ca?'<b>Ca²⁺</b> binder seg til troponin, tropomyosin flyttes, og bindingsstedene på aktin blir ledige. Myosinhodene griper, vipper og slipper – og drar aktin mot midten. Hvert tak koster ett ATP.':'<b>Avslappet:</b> tropomyosin dekker bindingsstedene på aktin, så myosinhodene får ikke tak. Slå på nervesignalet.'};
 cq('#sCa').onchange=e=>{ca=e.target.checked;msg()};cq('#sAtp').onchange=e=>{rig=e.target.checked;msg()};msg();
 onSel=id=>{if(id==='troponin'||id==='kryssbro'){ca=true;cq('#sCa').checked=true;msg()}};
 drawSark(c,ca,rig,tm);
 return loop(dt=>{const pc=c;if(!rig){const tg=ca?1:0;c=ANIM?c+(tg-c)*Math.min(1,dt*1.3):tg}const cyc=ANIM&&ca&&!rig;if(cyc)tm+=dt;if(dirty||cyc||Math.abs(c-pc)>1e-4){dirty=false;drawSark(c,ca,rig,tm)}})}};
