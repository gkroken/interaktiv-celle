/* ---------------- RØD BLODCELLE ---------------- */
S.rodblodcelle=()=>{let s=`<rect width="800" height="600" fill="#fbf1ea"/><rect width="800" height="600" fill="url(#pGran)" opacity=".45"/>`;
 let cap=`<rect x="0" y="70" width="800" height="104" fill="#fff4ea"/><rect x="0" y="62" width="800" height="12" fill="#eab3aa"/><rect x="0" y="170" width="800" height="12" fill="#eab3aa"/>${[110,380,650].map(x=>`<ellipse cx="${x}" cy="68" rx="28" ry="5" fill="url(#gNuc)"/><ellipse cx="${x+130}" cy="176" rx="28" ry="5" fill="url(#gNuc)"/>`).join('')}`;
 s+=P('kapillar',cap,{lx:400,ly:202});
 s+=`<g style="pointer-events:none">${[0,1,2,3,4,5].map(i=>`<g><animateMotion path="M-60,122 L860,122" dur="10s" begin="${f1(-i*10/6)}s" repeatCount="indefinite"/><ellipse rx="25" ry="41" fill="url(#gRBC2)" stroke="#9c2f27" stroke-width="1.5"/></g>`).join('')}${[150,330,510,690].map((x,i)=>[0,1].map(j=>`<text text-anchor="middle" style="font-size:12px;font-weight:700;fill:#3e7cc4" opacity="0"><animateMotion path="M${x},166 L${x+16},252" dur="2.6s" begin="${f1(-(i*.6+j*1.3))}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="${f1(-(i*.6+j*1.3))}s" repeatCount="indefinite"/>O₂</text>`).join('')).join('')}</g>`;
 s+=`<text x="24" y="236" class="rl" style="font-size:12.5px">O₂ diffunderer fra blodet ut i vevet</text>`;
 const cx=255,cy=410,r=140;
 s+=P('bikonkav',`<g filter="url(#sh)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gRBC2)"/></g>`,{lx:cx-62,ly:cy-72});
 const a0=-40*Math.PI/180,a1=40*Math.PI/180,ri=40,wp=`M${f1(cx+ri*Math.cos(a0))},${f1(cy+ri*Math.sin(a0))} L${f1(cx+r*Math.cos(a0))},${f1(cy+r*Math.sin(a0))} A${r},${r} 0 0 1 ${f1(cx+r*Math.cos(a1))},${f1(cy+r*Math.sin(a1))} L${f1(cx+ri*Math.cos(a1))},${f1(cy+ri*Math.sin(a1))} A${ri},${ri} 0 0 0 ${f1(cx+ri*Math.cos(a0))},${f1(cy+ri*Math.sin(a0))}Z`;
 let hb=`<path d="${wp}" fill="#fbe4df" stroke="#b8433a" stroke-width="2"/>`;scatter(14,64,(x,y)=>{const dx=x-cx,dy=y-cy,d=Math.hypot(dx,dy),a=Math.atan2(dy,dx);return d>50&&d<r-9&&a>a0+.07&&a<a1-.07}).forEach(([x,y])=>hb+=`<g transform="translate(${x},${y})"><circle cx="-2.6" cy="-2.6" r="2.8" fill="#e2766c"/><circle cx="2.6" cy="-2.6" r="2.8" fill="#b9a3e3"/><circle cx="-2.6" cy="2.6" r="2.8" fill="#b9a3e3"/><circle cx="2.6" cy="2.6" r="2.8" fill="#e2766c"/></g>`);
 s+=P('hemoglobin',hb,{lx:cx+92,ly:cy+5});
 s+=P('ingenkjerne',`<circle cx="${cx}" cy="${cy}" r="30" class="hitc"/><circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5 5" opacity=".85"/><text x="${cx}" y="${cy-2}" text-anchor="middle" style="font-size:11px;font-weight:700;fill:#fff">ingen</text><text x="${cx}" y="${cy+11}" text-anchor="middle" style="font-size:11px;font-weight:700;fill:#fff">kjerne</text>`,{nl:1});
 s+=P('membran',`<circle cx="${cx}" cy="${cy}" r="${r}" class="hit"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#8e2a20" stroke-width="3.5"/>`,{lx:cx-20,ly:cy+r+20});
 let gp='';for(let a=150;a<=240;a+=15){const t=a*Math.PI/180,x0=cx+r*Math.cos(t),y0=cy+r*Math.sin(t),x1=cx+(r+14)*Math.cos(t),y1=cy+(r+14)*Math.sin(t);gp+=`<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="#b8902a" stroke-width="2"/>`;[-.18,.18].forEach(o=>{const x2=cx+(r+24)*Math.cos(t+o*.5),y2=cy+(r+24)*Math.sin(t+o*.5);gp+=`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#b8902a" stroke-width="1.6"/><polygon points="${[0,1,2,3,4,5].map(k=>{const u=k*Math.PI/3;return f1(x2+4*Math.cos(u))+','+f1(y2+4*Math.sin(u))}).join(' ')}" fill="#f2b630" stroke="#b8902a" stroke-width="1"/>`})}
 s+=P('glykoprotein',gp,{lx:84,ly:300});
 const sv="M520,410 C520,368 548,358 580,374 C598,383 642,383 660,374 C692,358 720,368 720,410 C720,452 692,462 660,446 C642,437 598,437 580,446 C548,462 520,452 520,410Z";
 s+=P('bikonkav',`<g filter="url(#sh)"><path d="${sv}" fill="url(#gRBCs)" stroke="#8e2a20" stroke-width="2.5"/></g><path d="M520,486 V496 M520,491 H720 M720,486 V496" fill="none" stroke="#5d6472" stroke-width="1.6"/><text x="620" y="512" text-anchor="middle" class="rl" style="font-size:12.5px">ca. 7,5 µm</text><path d="M494,366 H504 M499,366 V454 M494,454 H504" fill="none" stroke="#5d6472" stroke-width="1.6"/><text x="490" y="414" text-anchor="end" class="rl" style="font-size:12px">ca. 2,5 µm</text>`,{nl:1});
 s+=`<text x="${cx}" y="590" text-anchor="middle" class="pt">Sett ovenfra (delvis åpnet)</text><text x="620" y="348" text-anchor="middle" class="pt">Sett fra siden</text>`;
 s+=badge(690,566,'Osmose ›','osmose',100);
 return s};

/* ---------------- HEMOGLOBIN ---------------- */
const HB={C:[332,340],X:p=>566+p*2.04,Y:s=>282-s*168,S:(p,b)=>{const P50=b?34:26,n=2.7;return p<=0?0:Math.pow(p,n)/(Math.pow(p,n)+Math.pow(P50,n))}};
S.hemoglobin=()=>{let s=`<rect width="800" height="600" fill="#fbf3f1"/>${title('Hemoglobin','Fire kjeder og fire hemgrupper – kan frakte fire O₂-molekyler')}`;
 const sub=(x,y,k,i)=>{const R=rng(40+i),A=k==='a';let o=`<g filter="url(#sh)"><path d="${blob(x,y,80,R,9,.16)}" fill="url(#${A?'gHbA':'gProtV'})" stroke="${A?'#a8443c':'#6a5aa8'}" stroke-width="2.4"/></g>`;
  for(let j=0;j<6;j++){const a=R()*6.283,d=R()*40;let px=x+d*Math.cos(a),py=y+d*Math.sin(a);const p=[[px,py]];for(let m=0;m<3;m++){px+=(R()-.5)*55;py+=(R()-.5)*55;const dd=Math.hypot(px-x,py-y);if(dd>58){px=x+(px-x)*58/dd;py=y+(py-y)*58/dd}p.push([px,py])}o+=`<path d="${smooth(p,false)}" fill="none" stroke="${A?'#c4574e':'#7d68c0'}" stroke-width="9" stroke-linecap="round" opacity=".3"/>`}
  const lx=x+(x<HB.C[0]?-34:34),ly=y+(y<HB.C[1]?-30:30);return o+`<text x="${lx}" y="${ly+8}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:26px;font-weight:650;fill:${A?'#7a2a24':'#3d2a70'};opacity:.8">${A?'α':'β'}</text>`};
 const heme=(x,y,i)=>{const dx=x-HB.C[0],dy=y-HB.C[1],L=Math.hypot(dx,dy),hx=x+dx/L*14,hy=y+dy/L*14,a=Math.atan2(dy,dx)*180/Math.PI;return `<g transform="translate(${f1(hx)},${f1(hy)}) rotate(${f1(a+90)})"><rect x="-17" y="-8" width="34" height="16" rx="5" fill="#9c2f27" stroke="#5e1712" stroke-width="1.5"/><circle r="7.5" fill="url(#gYel)" stroke="#8a5a10" stroke-width="1.2"/><text y="3.2" text-anchor="middle" style="font-size:7.5px;font-weight:700;fill:#6e4a10">Fe</text><g id="hbO${i}" opacity="0"><line x1="0" y1="-7" x2="0" y2="-13" stroke="#374151" stroke-width="2"/><circle cx="-6" cy="-19" r="6.5" fill="url(#gO)" stroke="rgba(0,0,0,.3)"/><circle cx="6" cy="-21" r="6.5" fill="url(#gO)" stroke="rgba(0,0,0,.3)"/></g></g>`};
 s+=`<g id="hbD1">${P('alfa',sub(255,265,'a',0))}${P('beta',sub(410,265,'b',1))}${P('hem',heme(255,265,0)+heme(410,265,1),{lx:332,ly:232})}</g>`;
 s+=`<g id="hbD2">${P('beta',sub(255,415,'b',2))}${P('alfa',sub(410,415,'a',3))}${P('hem',heme(255,415,2)+heme(410,415,3),{nl:1})}</g>`;
 const {X,Y}=HB;let ch=`<rect x="540" y="84" width="244" height="232" rx="12" fill="#fff" stroke="#e3dccd"/>`;
 [0,.5,1].forEach(v=>ch+=`<line x1="${X(0)}" y1="${f1(Y(v))}" x2="${X(100)}" y2="${f1(Y(v))}" stroke="#efe9dd"/><text x="${X(0)-5}" y="${f1(Y(v)+4)}" text-anchor="end" class="rl" style="font-size:10.5px">${v*100}</text>`);
 [0,50,100].forEach(p=>ch+=`<text x="${f1(X(p))}" y="296" text-anchor="middle" class="rl" style="font-size:10.5px">${p}</text>`);
 ch+=`<text x="${X(50)}" y="309" text-anchor="middle" class="rl" style="font-size:11px">O₂-trykk (mmHg)</text><text x="548" y="101" class="rl" style="font-size:11px">% mettet</text>`;
 [[100,'lunger'],[40,'vev'],[20,'muskel']].forEach(([p,l])=>ch+=`<line x1="${f1(X(p))}" y1="${Y(0)}" x2="${f1(X(p))}" y2="${Y(1)}" stroke="#c9c0ad" stroke-dasharray="3 4"/><text x="${f1(X(p))}" y="${Y(1)-6}" text-anchor="middle" class="rl" style="font-size:10px">${l}</text>`);
 const cv=b=>{let d='';for(let p=0;p<=100;p+=2)d+=(p?'L':'M')+f1(X(p))+','+f1(Y(HB.S(p,b)));return d};
 ch+=`<path d="${cv(0)}" fill="none" stroke="#c0453b" stroke-width="3"/>`;
 s+=P('metningskurve',ch,{nl:1});
 s+=P('bohr',`<path id="hbCB" d="${cv(1)}" fill="none" stroke="#7d5ba6" stroke-width="2.5" stroke-dasharray="6 4" style="display:none"/>`,{nl:1});
 s+=`<circle id="hbDot" r="6.5" fill="#c0453b" stroke="#fff" stroke-width="2"/><text id="hbR" x="662" y="340" text-anchor="middle" class="pt" style="font-size:14px"></text>`;
 s+=`<text x="24" y="560" class="rl" style="font-size:12.5px">Røde kuler = O₂ bundet til jernet (Fe) i hver hemgruppe.</text><text x="24" y="578" class="rl" style="font-size:12.5px">Molekylet vrir seg litt når O₂ binder seg – da binder de neste lettere.</text>`;
 return s};
LIVE.hemoglobin={pos:'br',ctrl:`<div style="width:262px"><div class="cx-title">Oksygen i blodet</div><label class="cx-sl wide">O₂-trykk <b id="hbP"></b><input type="range" id="hbS" min="0" max="100" value="100"></label><div class="cx-row" style="margin-top:6px"><button class="cbtn" data-p="100">Lunger</button><button class="cbtn" data-p="40">Vev</button><button class="cbtn" data-p="20">Muskel i arbeid</button></div><div class="cx-row" style="margin-top:6px"><button class="cbtn" id="hbPlay"></button><label class="cx-tog"><input type="checkbox" id="hbB"> Mer CO₂ (lav pH)</label></div><div class="cx-note" id="hbN"></div></div>`,
init(){let p=100,bohr=false,play=ANIM,tm=0;const sl=cq('#hbS'),nt=cq('#hbN'),pb=cq('#hbPlay'),O=[0,1,2,3].map(i=>q('#hbO'+i)),d2=q('#hbD2'),dot=q('#hbDot'),rd=q('#hbR'),cb=q('#hbCB'),ord=[0,3,1,2];
 const setPB=()=>{pb.textContent=play?'Pause':'▶ Blodomløpet';pb.classList.toggle('on',play)};
 function set(){const S_=HB.S(p,bohr);cq('#hbP').textContent=Math.round(p)+' mmHg';sl.value=Math.round(p);ord.forEach((h,k)=>O[h].setAttribute('opacity',f1(cl(4*S_-k))));
  d2.setAttribute('transform',`rotate(${(7*(1-S_)).toFixed(2)} 332 340)`);dot.setAttribute('cx',f1(HB.X(p)));dot.setAttribute('cy',f1(HB.Y(S_)));
  rd.textContent=`${Math.round(S_*100)} % mettet · ${(4*S_).toFixed(1).replace('.',',')} av 4 O₂`;
  nt.innerHTML=(p>=85?'<b>Lungene:</b> høyt O₂-trykk – nesten alle hemgruppene binder O₂.':p<=28?'<b>Arbeidende muskel:</b> lavt O₂-trykk – hemoglobinet slipper mye O₂. Kurven er bratt akkurat her.':'<b>Vevet:</b> lavere O₂-trykk, så hemoglobinet avgir noe av oksygenet.')+(bohr?' <b>Bohr-effekten:</b> CO₂ og lav pH flytter kurven mot høyre, så mer O₂ slippes der det trengs mest.':'')}
 sl.oninput=e=>{play=false;setPB();p=+e.target.value;set()};
 ctrl.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{play=false;setPB();p=+b.dataset.p;set()});
 cq('#hbB').onchange=e=>{bohr=e.target.checked;cb.style.display=bohr?'':'none';set()};
 pb.onclick=()=>{play=!play;setPB()};setPB();
 onSel=id=>{if(id==='bohr'){bohr=true;cq('#hbB').checked=true;cb.style.display='';set()}};
 set();return loop(dt=>{if(!(ANIM&&play))return;tm+=dt;p=60+40*Math.cos(tm*.8);set()})}};
