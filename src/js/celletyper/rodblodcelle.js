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
// Modellen: frie O₂-molekyler i plasma (tetthet ~ O₂-trykk), fire hemgrupper
// som binder/slipper ett og ett O₂ med synlig flukt, og en T→R-overgang
// (dimerene vrir seg ~15° og saltbroene brytes) som gjør at de neste binder
// lettere. Grafen viser metning og hvor mye O₂ som er avgitt siden lungene.
const HB={C:[270,322],X:p=>566+p*2.04,Y:s=>282-s*168,
 S:(p,b)=>{const P50=b?34:26,n=2.7;return p<=0?0:Math.pow(p,n)/(Math.pow(p,n)+Math.pow(P50,n))},
 // subenheter: [x,y,type,dimer] – dimer 0 = øverste par, 1 = nederste
 U:[[198,250,'a',0],[342,250,'b',0],[198,394,'b',1],[342,394,'a',1]],
 ORD:[0,3,1,2]};
HB.heme=i=>{const [x,y]=HB.U[i],dx=x-HB.C[0],dy=y-HB.C[1],L=Math.hypot(dx,dy);return{x:x+dx/L*18,y:y+dy/L*18,ux:dx/L,uy:dy/L,ang:Math.atan2(dy,dx)*180/Math.PI}};
S.hemoglobin=()=>{const [CX,CY]=HB.C;
 let s=`<rect width="800" height="600" fill="#fbf3f1"/>${title('Hemoglobin','Fire kjeder og fire hemgrupper – kan frakte fire O₂-molekyler')}`;
 s+=`<text id="hbBig" x="784" y="44" text-anchor="end" style="font-family:Fraunces,serif;font-size:24px;font-weight:650;fill:#9c2f27"></text><text id="hbSmall" x="784" y="66" text-anchor="end" class="rl" style="font-size:12.5px"></text>`;
 // blodplasma / omgivelser
 s+=`<rect id="hbEnv" x="16" y="80" width="508" height="462" rx="18" fill="#eaf3fa" stroke="#e3dccd"/>`;
 s+=`<g id="hbFree"></g>`;
 const sub=(i)=>{const [x,y,k]=HB.U[i],R=rng(40+i),A=k==='a';let o=`<g filter="url(#sh)"><path d="${blob(x,y,66,R,9,.14)}" fill="url(#${A?'gHbA':'gProtV'})" stroke="${A?'#a8443c':'#6a5aa8'}" stroke-width="2.4"/></g>`;
  for(let j=0;j<5;j++){const a=R()*6.283,d=R()*30;let px=x+d*Math.cos(a),py=y+d*Math.sin(a);const pts=[[px,py]];for(let m=0;m<3;m++){px+=(R()-.5)*44;py+=(R()-.5)*44;const dd=Math.hypot(px-x,py-y);if(dd>46){px=x+(px-x)*46/dd;py=y+(py-y)*46/dd}pts.push([px,py])}o+=`<path d="${smooth(pts,false)}" fill="none" stroke="${A?'#c4574e':'#7d68c0'}" stroke-width="8" stroke-linecap="round" opacity=".28"/>`}
  const lx=x+(x<CX?-30:30),ly=y+(y<CY?-28:34);return o+`<text x="${lx}" y="${ly+8}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:24px;font-weight:650;fill:${A?'#7a2a24':'#3d2a70'};opacity:.8">${A?'α':'β'}</text>`};
 const heme=i=>{const h=HB.heme(i);return `<g transform="translate(${f1(h.x)},${f1(h.y)}) rotate(${f1(h.ang+90)})"><rect id="hbH${i}" x="-18" y="-8" width="36" height="16" rx="5" fill="#5b2236" stroke="#3a1020" stroke-width="1.5"/><g id="hbFe${i}"><circle r="7.5" fill="url(#gYel)" stroke="#8a5a10" stroke-width="1.2"/><text y="3.2" text-anchor="middle" style="font-size:7.5px;font-weight:700;fill:#6e4a10">Fe</text></g><g id="hbO${i}" opacity="0"><line x1="0" y1="-7" x2="0" y2="-13" stroke="#374151" stroke-width="2"/><circle cx="-5.5" cy="-19" r="6.5" fill="url(#gO)" stroke="rgba(0,0,0,.3)"/><circle cx="5.5" cy="-21" r="6.5" fill="url(#gO)" stroke="rgba(0,0,0,.3)"/></g></g>`};
 const dimer=d=>{const ids=[0,1,2,3].filter(i=>HB.U[i][3]===d);return `<g id="hbD${d}">${ids.map(i=>P(HB.U[i][2]==='a'?'alfa':'beta',sub(i))).join('')}${P('hem',ids.map(heme).join(''),d?{nl:1}:{lx:CX,ly:CY-112})}</g>`};
 // saltbroer i grenseflatene – synlige i T-form
 const sb=(x,y,rot)=>`<g transform="translate(${x},${y}) rotate(${rot})"><line x1="-11" y1="0" x2="11" y2="0" stroke="#b03a2e" stroke-width="2.5" stroke-dasharray="3 3"/><circle cx="-13" r="6" fill="#fff" stroke="#3e7cc4" stroke-width="1.5"/><text x="-13" y="3.5" text-anchor="middle" style="font-size:10px;font-weight:800;fill:#3e7cc4">+</text><circle cx="13" r="6" fill="#fff" stroke="#c0453b" stroke-width="1.5"/><text x="13" y="3.5" text-anchor="middle" style="font-size:11px;font-weight:800;fill:#c0453b">–</text></g>`;
 s+=dimer(0)+dimer(1);
 s+=P('trform',`<g id="hbSB">${sb(CX-58,CY,90)+sb(CX+58,CY,90)+sb(CX,CY,0)}</g>`,{nl:1});
 s+=P('trform',`<g transform="translate(${CX},512)"><rect id="hbTRr" x="-120" y="-17" width="240" height="34" rx="17" fill="#fff" stroke="#6a5aa8" stroke-width="2"/><text id="hbTR" y="6" text-anchor="middle" style="font-size:14px;font-weight:700;fill:#3d2a70"></text></g>`,{nl:1});
 s+=`<g id="hbFly"></g>`;
 s+=`<g id="hbPlace"><rect id="hbPlR" x="0" y="0" width="10" height="28" rx="14" fill="#fff" stroke="#c9c0ad"/><text id="hbPlT" x="0" y="19" text-anchor="middle" style="font-size:13.5px;font-weight:700;fill:#1f2430"></text></g>`;
 // graf
 const {X,Y}=HB;let ch=`<rect x="540" y="84" width="244" height="232" rx="12" fill="#fff" stroke="#e3dccd"/>`;
 [0,.5,1].forEach(v=>ch+=`<line x1="${X(0)}" y1="${f1(Y(v))}" x2="${X(100)}" y2="${f1(Y(v))}" stroke="#efe9dd"/><text x="${X(0)-5}" y="${f1(Y(v)+4)}" text-anchor="end" class="rl" style="font-size:10.5px">${v*100}</text>`);
 [0,50,100].forEach(p=>ch+=`<text x="${f1(X(p))}" y="296" text-anchor="middle" class="rl" style="font-size:10.5px">${p}</text>`);
 ch+=`<text x="${X(50)}" y="309" text-anchor="middle" class="rl" style="font-size:11px">O₂-trykk (mmHg)</text><text x="548" y="101" class="rl" style="font-size:11px">% mettet</text>`;
 [[100,'lunger'],[40,'vev'],[20,'muskel']].forEach(([p,l])=>ch+=`<line x1="${f1(X(p))}" y1="${Y(0)}" x2="${f1(X(p))}" y2="${Y(1)}" stroke="#c9c0ad" stroke-dasharray="3 4"/><text x="${f1(X(p))}" y="${Y(1)-6}" text-anchor="${p===100?'end':'middle'}" class="rl" style="font-size:10px">${l}</text>`);
 const cv=b=>{let d='';for(let p=0;p<=100;p+=2)d+=(p?'L':'M')+f1(X(p))+','+f1(Y(HB.S(p,b)));return d};
 ch+=`<path d="${cv(0)}" fill="none" stroke="#c0453b" stroke-width="3"/>`;
 s+=P('metningskurve',ch,{nl:1});
 s+=P('bohr',`<path id="hbCB" d="${cv(1)}" fill="none" stroke="#7d5ba6" stroke-width="2.5" stroke-dasharray="6 4" style="display:none"/>`,{nl:1});
 s+=`<g id="hbDel" style="pointer-events:none"><line id="hbDelH" stroke="#9c2f27" stroke-width="1.5" stroke-dasharray="4 3"/><path id="hbDelA" fill="none" stroke="#9c2f27" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><g id="hbDelTg"><rect id="hbDelR" height="20" rx="6" fill="#9c2f27"/><text id="hbDelT" text-anchor="middle" style="font-size:11.5px;font-weight:700;fill:#fff"></text></g></g>`;
 s+=`<circle cx="${f1(X(100))}" cy="${f1(Y(HB.S(100,0)))}" r="5" fill="#fff" stroke="#c0453b" stroke-width="2"/><circle id="hbDot" r="6.5" fill="#c0453b" stroke="#fff" stroke-width="2"/>`;
 s+=`<text x="24" y="566" class="rl" style="font-size:12.5px">Mørk hem = uten O₂ · knallrød = med O₂ (derfor er oksygenrikt blod lysere)</text><text x="24" y="584" class="rl" style="font-size:12.5px">De første O₂ vrir molekylet fra T- til R-form – da binder resten lettere</text>`;
 return s};
LIVE.hemoglobin={pos:'br',ctrl:`<div style="width:262px"><div class="cx-title">Oksygen i blodet</div><label class="cx-sl wide">O₂-trykk <b id="hbP"></b><input type="range" id="hbS" min="0" max="100" value="100"></label><div class="cx-row" style="margin-top:6px"><button class="cbtn" data-p="100">Lunger</button><button class="cbtn" data-p="40">Vev</button><button class="cbtn" data-p="20">Muskel i arbeid</button></div><div class="cx-row" style="margin-top:6px"><button class="cbtn" id="hbPlay"></button><label class="cx-tog"><input type="checkbox" id="hbB"> Mer CO₂ (lav pH)</label></div><div class="cx-note" id="hbN"></div></div>`,
init(){
 const [CX,CY]=HB.C,NS='http://www.w3.org/2000/svg',R=rng(77);
 let p=100,bohr=false,play=ANIM,tm=0,r=1,wait=0,dest=40,placeTxt='';
 const occ=[1,1,1,1],flying=[],free=[];
 const sl=cq('#hbS'),nt=cq('#hbN'),pb=cq('#hbPlay'),cb=q('#hbCB'),gFree=q('#hbFree'),gFly=q('#hbFly');
 const O=[0,1,2,3].map(i=>q('#hbO'+i)),H=[0,1,2,3].map(i=>q('#hbH'+i)),FE=[0,1,2,3].map(i=>q('#hbFe'+i)),D=[q('#hbD0'),q('#hbD1')];
 const mol=()=>{const el=document.createElementNS(NS,'g');el.innerHTML='<circle cx="-5" r="6" fill="url(#gO)" stroke="rgba(0,0,0,.28)"/><circle cx="5" r="6" fill="url(#gO)" stroke="rgba(0,0,0,.28)"/>';return el};
 const inside=(x,y)=>x>34&&x<506&&y>118&&y<530;
 const push=(x,y)=>{const dx=x-CX,dy=y-CY,d=Math.hypot(dx,dy);return d<158?[CX+dx/d*158,CY+dy/d*158]:[x,y]};
 function spawn(x,y,vx=0,vy=0,a=0){if(x==null){do{x=34+R()*472;y=118+R()*412}while(Math.hypot(x-CX,y-CY)<165)}const el=mol();gFree.appendChild(el);const m={x,y,vx,vy,a,el,rot:R()*360,dying:false};free.push(m);return m}
 // transform av dimerene: T-form = vridd og litt fra hverandre
 const tf=()=>{const a=7.5*(1-r),g=7*(1-r);return[{a:-a,g:-g},{a:a,g:g}]};
 function hemePos(i){const h=HB.heme(i),t=tf()[HB.U[i][3]],rad=t.a*Math.PI/180,ax=h.x+h.ux*20,ay=h.y+h.uy*20,dx=ax-CX,dy=ay-CY;
  return[CX+dx*Math.cos(rad)-dy*Math.sin(rad),CY+dx*Math.sin(rad)+dy*Math.cos(rad)+t.g]}
 const mix=(a,b,t)=>'#'+[0,2,4].map(k=>Math.round(parseInt(a.substr(k+1,2),16)*(1-t)+parseInt(b.substr(k+1,2),16)*t).toString(16).padStart(2,'0')).join('');
 const nOcc=()=>occ.filter(o=>o>=1).length;
 const setPB=()=>{pb.textContent=play?'❚❚ Pause':'▶ Blodomløpet';pb.classList.toggle('on',play)};
 const place=()=>play&&placeTxt?placeTxt:p>=85?'I lungene':p<=28?'I arbeidende muskel':p<=50?'I vevet':'På vei';
 function text(){const S_=HB.S(p,bohr),n=nOcc();
  cq('#hbP').textContent=Math.round(p)+' mmHg';sl.value=Math.round(p);
  q('#hbBig').textContent=`Blodet: ${Math.round(S_*100)} % mettet`;
  q('#hbSmall').textContent=`Dette ene molekylet: ${n} av 4 O₂ bundet`;
  nt.innerHTML=(p>=85?'<b>Lungene:</b> mye O₂ rundt – hemoglobinet fylles opp.':p<=28?'<b>Arbeidende muskel:</b> lite O₂ – det meste slippes. Kurven er bratt akkurat her.':'<b>Vevet:</b> mindre O₂ rundt, så noe av oksygenet slippes.')+(bohr?' <b>Bohr:</b> CO₂ og lav pH flytter kurven mot høyre – mer O₂ leveres.':'')}
 function chart(){const S_=HB.S(p,bohr),{X,Y}=HB,x=X(p),y0=Y(HB.S(100,false)),y1=Y(S_);
  q('#hbDot').setAttribute('cx',f1(x));q('#hbDot').setAttribute('fill',bohr?'#7d5ba6':'#c0453b');q('#hbDot').setAttribute('cy',f1(y1));
  const del=HB.S(100,false)-S_,show=del>.04;q('#hbDel').style.display=show?'':'none';if(!show)return;
  const H_=q('#hbDelH');H_.setAttribute('x1',f1(x));H_.setAttribute('x2',f1(X(100)));H_.setAttribute('y1',f1(y0));H_.setAttribute('y2',f1(y0));
  q('#hbDelA').setAttribute('d',`M${f1(x)},${f1(y0)} V${f1(y1-9)} M${f1(x-5)},${f1(y1-15)} L${f1(x)},${f1(y1-9)} L${f1(x+5)},${f1(y1-15)}`);
  const t=`avgitt ${Math.round(del*100)} %`,w=t.length*6.4+14,tx=Math.min(X(100)-w/2,Math.max(X(0)+w/2,x+w/2+8)),ty=(y0+y1)/2;
  q('#hbDelR').setAttribute('x',f1(tx-w/2));q('#hbDelR').setAttribute('y',f1(ty-10));q('#hbDelR').setAttribute('width',f1(w));q('#hbDelT').setAttribute('x',f1(tx));q('#hbDelT').setAttribute('y',f1(ty+4));q('#hbDelT').textContent=t}
 function env(){const k=cl((p-20)/80);q('#hbEnv').setAttribute('fill',mix('#fbe6df','#e8f2fb',k));
  const t=place(),w=t.length*7.6+30,pl=q('#hbPlace');q('#hbPlT').textContent=t;q('#hbPlR').setAttribute('width',f1(w));q('#hbPlR').setAttribute('x',f1(-w/2));q('#hbPlT').setAttribute('x','0');pl.setAttribute('transform',`translate(270,110)`)}
 function molecule(){const t=tf();D.forEach((g,d)=>g.setAttribute('transform',`translate(0,${f1(t[d].g)}) rotate(${f1(t[d].a)} ${CX} ${CY})`));
  q('#hbSB').setAttribute('opacity',f1(cl(1-r*1.3)));
  const T=r<.5;q('#hbTR').textContent=T?'T-form (spent) · vanskelig å binde O₂':'R-form (avslappet) · binder O₂ lett';
  q('#hbTRr').setAttribute('stroke',T?'#6a5aa8':'#c0453b');q('#hbTR').style.fill=T?'#3d2a70':'#9c2f27';
  for(let i=0;i<4;i++){const o=+O[i].getAttribute('opacity');H[i].setAttribute('fill',mix('#5b2236','#e0392b',o));H[i].setAttribute('stroke',mix('#3a1020','#8f1f16',o));FE[i].setAttribute('transform',`translate(0,${f1(4*(1-o))})`)}}
 function draw(){text();chart();env();molecule()}
 // start: lungene, alle fire bundet, R-form
 for(let i=0;i<4;i++)O[i].setAttribute('opacity','1');
 const want=()=>Math.max(4,Math.round(3+p/100*24));
 for(let k=0;k<want();k++)spawn();
 const kick=()=>{wait=Math.min(wait,.25)};
 sl.oninput=e=>{play=false;setPB();p=+e.target.value;kick();draw()};
 ctrl.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{play=false;setPB();p=+b.dataset.p;kick();draw()});
 cq('#hbB').onchange=e=>{bohr=e.target.checked;cb.style.display=bohr?'':'none';kick();draw()};
 pb.onclick=()=>{play=!play;if(play)tm=0;setPB();draw()};setPB();
 onSel=id=>{if(id==='bohr'){bohr=true;cq('#hbB').checked=true;cb.style.display='';draw()}};
 // blodomløpet: lungene → vev/muskel → lungene, vekselvis vev (40) og muskel (20)
 const CYC=[3,2.6,3.6,2.6],CT=CYC.reduce((a,b)=>a+b);
 function circulate(dt){tm+=dt;if(tm>=CT){tm-=CT;dest=dest===40?20:40}let t=tm,ph=0;while(t>CYC[ph]){t-=CYC[ph];ph++}const u=t/CYC[ph],e=ez(u);
  const to=dest===40?'vevet':'den arbeidende muskelen';
  if(ph===0){p=100;placeTxt='I lungene'}else if(ph===1){p=100+(dest-100)*e;placeTxt='På vei til '+to}else if(ph===2){p=dest;placeTxt=dest===40?'I vevet':'I arbeidende muskel'}else{p=dest+(100-dest)*e;placeTxt='På vei til lungene'}}
 function bind(i){let best=null,bd=1e9;const [hx,hy]=hemePos(i);free.forEach(m=>{if(m.dying)return;const d=Math.hypot(m.x-hx,m.y-hy);if(d<bd){bd=d;best=m}});
  if(!best){best=spawn();}free.splice(free.indexOf(best),1);gFly.appendChild(best.el);flying.push({m:best,i,t:0,x0:best.x,y0:best.y});occ[i]=.001}
 function release(i){occ[i]=0;O[i].setAttribute('opacity','0');const [hx,hy]=hemePos(i),h=HB.heme(i);spawn(hx+h.ux*6,hy+h.uy*6,h.ux*150,h.uy*150,1)}
 draw();
 return loop(dt=>{
  if(ANIM&&play){circulate(dt)}
  const target=Math.max(0,Math.min(4,Math.round(4*HB.S(p,bohr)))),n=occ.filter(o=>o>0).length;
  if(!ANIM){ // uten bevegelse: hopp rett til riktig tilstand
   flying.splice(0).forEach(f=>{f.m.el.remove();occ[f.i]=1});
   HB.ORD.forEach((i,k)=>{occ[i]=k<target?1:0;O[i].setAttribute('opacity',occ[i]?'1':'0')});
   r=nOcc()>=2?1:0;draw();return}
  wait-=dt;
  if(wait<=0&&n<target){const i=HB.ORD.find(i=>!occ[i]);bind(i);wait=n===0?1.2:n===1?.7:.3}
  else if(wait<=0&&n>target&&!flying.length){const i=[...HB.ORD].reverse().find(i=>occ[i]>=1);release(i);wait=n>=3?.55:.4}
  // fri O₂: brownske bevegelser, holder seg utenfor molekylet
  const W=want(),alive=free.filter(m=>!m.dying);
  if(alive.length<W&&R()<dt*8)spawn();
  if(alive.length>W&&R()<dt*8){alive[Math.floor(R()*alive.length)].dying=true}
  for(let k=free.length-1;k>=0;k--){const m=free[k];
   m.vx+=(R()-.5)*260*dt;m.vy+=(R()-.5)*260*dt;const sp=Math.hypot(m.vx,m.vy),mx=m.a>.5?400:46;if(sp>mx){m.vx*=mx/sp;m.vy*=mx/sp}if(m.a>.5){m.vx*=1-dt*2.2;m.vy*=1-dt*2.2;if(Math.hypot(m.vx,m.vy)<50)m.a=0}
   m.x+=m.vx*dt;m.y+=m.vy*dt;if(m.x<34||m.x>506)m.vx*=-1;if(m.y<118||m.y>530)m.vy*=-1;m.x=Math.max(34,Math.min(506,m.x));m.y=Math.max(118,Math.min(530,m.y));
   if(!m.a){const q_=push(m.x,m.y);m.x=q_[0];m.y=q_[1]}
   m.rot+=dt*40;const op=m.dying?Math.max(0,(m.op??1)-dt*1.5):Math.min(1,(m.op??0)+dt*2);m.op=op;
   m.el.setAttribute('transform',`translate(${f1(m.x)},${f1(m.y)}) rotate(${f1(m.rot)})`);m.el.setAttribute('opacity',f1(op));
   if(m.dying&&op<=0){m.el.remove();free.splice(k,1)}}
  // O₂ på vei inn til en hemgruppe
  for(let k=flying.length-1;k>=0;k--){const f=flying[k];f.t+=dt/.85;const [hx,hy]=hemePos(f.i),e=ez(cl(f.t)),bx=(f.x0+hx)/2+(hy-f.y0)*.18,by=(f.y0+hy)/2-(hx-f.x0)*.18;
   const x=(1-e)*(1-e)*f.x0+2*(1-e)*e*bx+e*e*hx,y=(1-e)*(1-e)*f.y0+2*(1-e)*e*by+e*e*hy;f.m.el.setAttribute('transform',`translate(${f1(x)},${f1(y)})`);f.m.el.setAttribute('opacity','1');
   if(f.t>=1){f.m.el.remove();flying.splice(k,1);occ[f.i]=1;O[f.i].setAttribute('opacity','1')}}
  // T→R: vrir seg når to O₂ sitter
  const rt=[0,.1,.85,.95,1][nOcc()|0];r+=(rt-r)*Math.min(1,dt*2.6);
  draw()})}};
