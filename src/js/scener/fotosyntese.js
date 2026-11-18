/* ---------- photosynthesis in depth ---------- */
const gs=(m,s)=>x=>Math.exp(-(((x-m)/s)**2)/2);
const SPEC={a:x=>1.0*gs(430,14)(x)+.32*gs(410,12)(x)+.78*gs(662,11)(x)+.16*gs(615,14)(x)+.05,
 b:x=>1.0*gs(453,13)(x)+.55*gs(642,11)(x)+.13*gs(595,14)(x)+.04,
 c:x=>.72*gs(450,14)(x)+.82*gs(480,14)(x)+.48*gs(425,12)(x)};
SPEC.v=x=>Math.min(1,.55*SPEC.a(x)+.45*SPEC.b(x)+.25*SPEC.c(x)+.12);
const wlCol=w=>w<450?'#6a4bd1':w<495?'#2f7fe0':w<570?'#3fb04a':w<590?'#e6c31e':w<620?'#f08a1c':'#e0402e';
const wlName=w=>w<450?'fiolett/blått':w<495?'blått':w<570?'grønt':w<590?'gult':w<620?'oransje':'rødt';

S.klorofyll=()=>{
 let s=`<rect width="800" height="600" fill="#f5f9f0"/>${title('Klorofyll og lysabsorpsjon','Pigmentet som fanger lysenergien – og hvorfor blader er grønne')}`;
 const cx=200,cy=250,pr=(x,y,rot)=>{const p=Array.from({length:5},(_,k)=>{const t=(rot+k*72)*Math.PI/180;return[x+24*Math.cos(t),y+24*Math.sin(t)]});return p};
 const rings=[[cx,cy-66,90],[cx+66,cy,180],[cx,cy+66,270],[cx-66,cy,0]];let pg='',nb='';
 const outer=[];rings.forEach(([x,y,r])=>{const p=pr(x,y,r);pg+=`<polygon points="${p.map(q=>q.map(f1).join(',')).join(' ')}" fill="#d5edc1" stroke="#2f6a17" stroke-width="3" stroke-linejoin="round"/><polygon points="${p.map(q=>[x+(q[0]-x)*.68,y+(q[1]-y)*.68].map(f1).join(',')).join(' ')}" fill="none" stroke="#5aa83a" stroke-width="1.5" stroke-dasharray="5 4"/>`;nb+=`<line x1="${f1(p[0][0])}" y1="${f1(p[0][1])}" x2="${cx}" y2="${cy}" stroke="#2f6a17" stroke-width="2.5"/>`+atom(p[0][0],p[0][1],'N','url(#gN)',9);outer.push(p)});
 let br='';for(let i=0;i<4;i++){const a=outer[i],b=outer[(i+1)%4];br+=`<path d="M${f1(a[2][0])},${f1(a[2][1])} Q${f1((a[2][0]+b[3][0])/2+((a[2][0]+b[3][0])/2-cx)*.25)},${f1((a[2][1]+b[3][1])/2+((a[2][1]+b[3][1])/2-cy)*.25)} ${f1(b[3][0])},${f1(b[3][1])}" fill="none" stroke="#2f6a17" stroke-width="3"/>`}
 const r5=pr(cx+52,cy+58,45);pg+=`<polygon points="${r5.map(q=>q.map(f1).join(',')).join(' ')}" fill="#d5edc1" stroke="#2f6a17" stroke-width="3"/><text x="${cx+64}" y="${cy+66}" text-anchor="middle" style="font-size:10px;font-weight:700;fill:#2f6a17">V</text>`;
 const sideG=[[cx-30,cy-112,'CH₃'],[cx+34,cy-112,'CH=CH₂'],[cx+118,cy-24,'CH₃'],[cx+118,cy+30,'C₂H₅'],[cx-118,cy+20,'CH₃']];
 s+=P('porfyrinring',`<g filter="url(#sh)">${br}${pg}</g>`+sideG.map(([x,y,t])=>`<text x="${x}" y="${y}" text-anchor="middle" class="rl" style="font-size:11.5px">${t}</text>`).join('')+`<circle cx="${cx}" cy="${cy}" r="120" class="hitc"/>`,{lx:cx-105,ly:cy-80});
 s+=P('klorofyllb',`<rect x="${cx-150}" y="${cy-48}" width="42" height="22" rx="8" fill="#fff4bf" stroke="#c98a10" stroke-width="2"/><text x="${cx-129}" y="${cy-33}" text-anchor="middle" style="font-size:11.5px;font-weight:700;fill:#8a5a10">CH₃</text><text x="${cx-129}" y="${cy-55}" text-anchor="middle" style="font-size:10.5px;font-weight:700;fill:#8a5a10">b: CHO</text>`,{nl:1});
 s+=P('magnesium',`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy}" />`+atom(cx,cy,'Mg','url(#gProtG)',17,'#1d4d34'),{lx:cx,ly:cy+36});
 let ph=`M${cx-40},${cy+80}`;const tp=[];let x=cx-40,y=cy+80;for(let i=0;i<16;i++){x+=(i%2?9:-9);y+=17;tp.push([x,y])}ph+=tp.map(p=>' L'+p.map(f1).join(',')).join('');let br2='';tp.forEach(([px,py],i)=>{if(i%4==1)br2+=`<line x1="${px}" y1="${py}" x2="${px+(i%2?14:-14)}" y2="${py-4}" stroke="#7a6a3b" stroke-width="2.5"/>`});
 s+=P('fytolhale',`<path d="${ph}" class="hit"/><path d="${ph}" fill="none" stroke="#7a6a3b" stroke-width="4" stroke-linejoin="round"/>${br2}`,{lx:cx+40,ly:520});
 s+=`<text x="${cx}" y="590" text-anchor="middle" class="rl" style="font-size:12.5px">Klorofyll a (forenklet strukturformel)</text>`;
 // spectrum
 const X0=440,X1=775,Y0=470,Y1=235,X=w=>X0+(w-400)/300*(X1-X0),Yv=v=>Y0-v*(Y0-Y1);
 const curve=f=>{let d='';for(let w=400;w<=700;w+=3)d+=(w==400?'M':'L')+f1(X(w))+','+f1(Yv(f(w)));return d};
 let ch=`<rect x="${X0}" y="${Y1-10}" width="${X1-X0}" height="${Y0-Y1+10}" fill="#fff" stroke="#e3dccd"/><defs><linearGradient id="gSpec" x1="0" x2="1"><stop offset="0" stop-color="#6a4bd1"/><stop offset=".22" stop-color="#2f7fe0"/><stop offset=".42" stop-color="#3fb04a"/><stop offset=".6" stop-color="#e6c31e"/><stop offset=".72" stop-color="#f08a1c"/><stop offset="1" stop-color="#d32f2f"/></linearGradient></defs><rect x="${X0}" y="${Y0+4}" width="${X1-X0}" height="14" fill="url(#gSpec)"/>`;
 [400,500,600,700].forEach(w=>ch+=`<text x="${f1(X(w))}" y="${Y0+34}" text-anchor="middle" class="rl" style="font-size:12px">${w}</text>`);ch+=`<text x="${(X0+X1)/2}" y="${Y0+52}" text-anchor="middle" class="rl" style="font-size:12.5px">Bølgelengde (nm)</text><text x="${X0-12}" y="${(Y0+Y1)/2}" text-anchor="middle" transform="rotate(-90 ${X0-12} ${(Y0+Y1)/2})" class="rl" style="font-size:12.5px">Absorpsjon</text>`;
 ch+=`<path d="${curve(SPEC.a)}" fill="none" stroke="#1f7a2a" stroke-width="3"/><path d="${curve(SPEC.b)}" fill="none" stroke="#7cc152" stroke-width="3"/>`;
 s+=P('absorpsjonsspekter',ch+`<g transform="translate(${X0},${Y0+82})"><line x1="0" y1="0" x2="18" y2="0" stroke="#1f7a2a" stroke-width="3"/><text x="23" y="4" class="pt" style="font-size:11.5px">klorofyll a</text><line x1="96" y1="0" x2="114" y2="0" stroke="#7cc152" stroke-width="3"/><text x="119" y="4" class="pt" style="font-size:11.5px">klorofyll b</text><line x1="0" y1="20" x2="18" y2="20" stroke="#f08a1c" stroke-width="3"/><text x="23" y="24" class="pt" style="font-size:11.5px">karotenoider</text><line x1="96" y1="20" x2="114" y2="20" stroke="#5d6472" stroke-width="2.5" stroke-dasharray="5 4"/><text x="119" y="24" class="pt" style="font-size:11.5px">virkningsspekter (fotosyntese)</text></g>`,{nl:1});
 s+=P('karotenoider',`<path d="${curve(SPEC.c)}" fill="none" stroke="#f08a1c" stroke-width="3"/><path d="${curve(SPEC.c)}" class="hit"/>`,{nl:1});
 s+=P('virkningsspekter',`<g id="vsp"><path d="${curve(SPEC.v)}" fill="none" stroke="#5d6472" stroke-width="2.5" stroke-dasharray="6 5"/><path d="${curve(SPEC.v)}" class="hit"/></g>`,{nl:1});
 s+=`<g id="wlm"><line id="wlL" x1="0" y1="${Y1-10}" x2="0" y2="${Y0+18}" stroke="#1f2430" stroke-width="2"/><circle id="wlA" r="6" fill="#1f7a2a" stroke="#fff" stroke-width="2"/><circle id="wlB" r="6" fill="#7cc152" stroke="#fff" stroke-width="2"/><circle id="wlC" r="6" fill="#f08a1c" stroke="#fff" stroke-width="2"/></g>`;
 return s};

S.fotosystem=()=>{
 let s=`<rect width="800" height="600" fill="url(#gChl)"/><rect width="800" height="600" fill="#fff" opacity=".5"/>${title('Fotosystemet','Antennepigmenter samler lysenergien og sender den inn til reaksjonssenteret')}`;
 const R=rng(12);const pig=[];
 const cl6=[[230,200],[570,200],[640,340],[560,480],[240,480],[160,340]];
 let ant='',car='';
 cl6.forEach(([x,y],ci)=>{ant+=`<path d="${blob(x,y,62,R,9,.18)}" fill="#c9e7ae" stroke="#5a9439" stroke-width="2" opacity=".9"/>`;for(let k=0;k<9;k++){const a=k/9*6.283+R()*.3,d=k%3==0?10:38;const px=x+d*Math.cos(a),py=y+d*Math.sin(a);if(k%4==2){car+=`<rect x="${f1(px-3)}" y="${f1(py-11)}" width="6" height="22" rx="3" fill="#f08a1c" transform="rotate(${f1(a*57)} ${f1(px)} ${f1(py)})"/>`}else pig.push([px,py])}});
 const inner=[];for(let k=0;k<14;k++){const a=k/14*6.283,d=k%2?118:96;inner.push([400+d*1.25*Math.cos(a),340+d*.9*Math.sin(a)])}
 let ip=`<ellipse cx="400" cy="340" rx="165" ry="118" fill="#b5dc95" stroke="#3f8a22" stroke-width="2" opacity=".85"/>`;inner.forEach(p=>pig.push(p));
 pig.forEach(([x,y],i)=>{const g=`<g data-pi="${i}" data-x="${f1(x)}" data-y="${f1(y)}" transform="translate(${f1(x)},${f1(y)})"><circle r="9" fill="url(#gPS)" stroke="#1f4d10" stroke-width="1.2"/><circle r="2.6" fill="#d9f0c4"/></g>`;if(i<pig.length-inner.length)ant+=g;else ip+=g});
 s+=P('antenne',ant+ip,{lx:230,ly:120});
 s+=P('karotenoider',car,{nl:1});
 s+=P('reaksjonssenter',`<g filter="url(#sh)"><rect x="340" y="305" width="120" height="70" rx="22" fill="#2f6a17" stroke="#1f4d0c" stroke-width="2"/></g><circle id="p1" cx="385" cy="340" r="13" fill="#9be070" stroke="#1f4d0c" stroke-width="2"/><circle id="p2" cx="415" cy="340" r="13" fill="#9be070" stroke="#1f4d0c" stroke-width="2"/><text x="400" y="395" text-anchor="middle" class="pt" style="fill:#1f4d0c">P680</text>`,{nl:1});
 s+=P('primaerakseptor',`<g filter="url(#sh)"><rect x="600" y="80" width="150" height="50" rx="14" fill="#fff" stroke="#c98a10" stroke-width="2.5"/></g><text x="675" y="102" text-anchor="middle" class="pt">Primær elektron-</text><text x="675" y="119" text-anchor="middle" class="pt">akseptor → PQ</text><path d="M440,320 C520,240 560,160 600,120" fill="none" stroke="#d18a12" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#arY)"/>`,{nl:1});
 s+=P('vannspalting',`<g filter="url(#sh)"><rect x="345" y="520" width="110" height="44" rx="14" fill="#fff" stroke="#3d7fae" stroke-width="2.5"/></g><text x="400" y="538" text-anchor="middle" class="pt" style="font-size:12px">Mn-kompleks</text><text x="400" y="554" text-anchor="middle" class="pt" style="font-size:12px">2 H₂O → O₂</text><path d="M400,518 L400,382" stroke="#3d7fae" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#arD)"/>`,{nl:1});
 s+=`<g id="fx"></g><path id="phot" d="" fill="none" stroke="#f2b630" stroke-width="3"/>`;
 s+=badge(110,566,'Klorofyll ›','klorofyll',120);
 return s};

S.zskjema=()=>{
 let s=`<rect width="800" height="600" fill="#f6faf1"/>${title('Z-skjemaet','Elektronenes vei i lysreaksjonene – høyden viser hvor mye energi elektronet har')}`;
 s+=`<path d="M38,520 V110" stroke="#5d6472" stroke-width="2.5" marker-end="url(#arD)"/><text x="26" y="320" text-anchor="middle" transform="rotate(-90 26 320)" class="rl" style="font-size:13px">mer energi i elektronet ↑</text>`;
 const B=(id,x,y,t,c,w=78)=>P(id,`<g filter="url(#sh)"><rect x="${x-w/2}" y="${y-18}" width="${w}" height="36" rx="12" fill="#fff" stroke="${c}" stroke-width="2.5"/></g><text x="${x}" y="${y+5}" text-anchor="middle" class="pt" style="font-size:12.5px">${t}</text>`,{nl:1});
 const main="M118,470 L150,450 L150,170 L208,200 L268,272 L340,320 L410,362 L460,384 L460,108 L540,160 L612,210 L690,236";
 s+=`<path id="zp" d="${main}" fill="none" stroke="#d18a12" stroke-width="3" stroke-dasharray="7 5" opacity=".75"/>`;
 s+=`<g id="cyc" style="display:none"><path id="zc" d="M540,160 C560,240 430,300 340,320 L410,362 L460,384 L460,108 L540,160" fill="none" stroke="#b04f6c" stroke-width="3" stroke-dasharray="7 5"/>${[0,1,2].map(i=>`<circle r="6.5" fill="#e8a6b8" stroke="#b04f6c" stroke-width="1.5"><animateMotion dur="5s" begin="${-i*1.66}s" repeatCount="indefinite"><mpath href="#zc"/></animateMotion></circle>`).join('')}</g>`;
 s+=`<g id="ncy">${[0,1,2,3].map(i=>`<circle r="6.5" fill="#f2a516" stroke="#a86a00" stroke-width="1.5"><animateMotion dur="6s" begin="${-i*1.5}s" repeatCount="indefinite"><mpath href="#zp"/></animateMotion></circle>`).join('')}</g>`;
 const light=(x,y1,y2,l)=>`<path d="M${x-26},${y1} q-8,-12 0,-24 t0,-24 t0,-24 t0,-24" fill="none" stroke="#e0a020" stroke-width="3"/><circle cx="${x-26}" cy="${y1+12}" r="12" fill="#ffe066" stroke="#e0a020" stroke-width="2"/><text x="${x-46}" y="${y1-50}" text-anchor="end" style="font-size:12.5px;font-weight:700;fill:#a86a00">${l}</text>`;
 s+=light(150,420,170,'lys')+light(460,360,120,'lys');
 s+=B('vannspalting',90,500,'H₂O → O₂','#3d7fae',86);
 s+=B('p680',150,450,'P680','#2d5e16',70)+B('p680',150,170,'P680*','#2d5e16',74);
 s+=B('plastokinon',230,236,'PQ','#c98a10',56)+`<text x="198" y="196" text-anchor="end" class="rl" style="font-size:11.5px">feofytin</text>`;
 s+=B('cytb6f',340,320,'cyt b₆f','#4f8a2b',80)+`<text x="340" y="292" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#c0453b">H⁺ pumpes inn → ATP</text>`;
 s+=B('plastocyanin',410,362,'PC','#3d7fae',54);
 s+=B('p700',460,402,'P700','#2d5e16',70)+B('p700',460,108,'P700*','#2d5e16',74);
 s+=B('ferredoksin',540,160,'Fd','#b04f6c',54)+B('fnr',612,210,'FNR','#7d5ba6',62);
 s+=B('nadph',712,236,'NADP⁺ → NADPH','#2d5e16',126);
 s+=`<text x="150" y="560" text-anchor="middle" class="pt" style="fill:#2d5e16">Fotosystem II</text><text x="460" y="440" text-anchor="middle" class="pt" style="fill:#2d5e16">Fotosystem I</text>`;
 s+=P('syklisk',`<rect x="560" y="300" width="1" height="1" class="hitc"/>`,{nl:1});
 return s};

S.fotosynteseformer=()=>{
 let s=`<rect width="800" height="600" fill="#f3f8ec"/>`;
 const cell=(x,y,w,h,f='url(#gChl)')=>`<g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${f}" stroke="#3a7420" stroke-width="2.5"/></g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="url(#pGranG)"/>`;
 const cyc=(x,y,l='Calvin-')=>`<circle cx="${x}" cy="${y}" r="34" fill="#fff" opacity=".8" stroke="#3f7a22" stroke-width="3" stroke-dasharray="8 5"><animateTransform attributeName="transform" type="rotate" from="0 ${x} ${y}" to="360 ${x} ${y}" dur="8s" repeatCount="indefinite"/></circle><text x="${x}" y="${y-2}" text-anchor="middle" class="pt" style="font-size:12px;fill:#2d5e16">${l}</text><text x="${x}" y="${y+13}" text-anchor="middle" class="pt" style="font-size:12px;fill:#2d5e16">syklusen</text>`;
 const enz=(x,y,t,id)=>P(id,`<g filter="url(#sh)"><path d="${blob(x,y,30,rng(x),8,.25)}" fill="url(#gEnz)" stroke="#5a4fb0" stroke-width="2"/></g><text x="${x}" y="${y+4}" text-anchor="middle" class="pt" style="font-size:11px">${t}</text>`,{nl:1});
 const stoma=(x,y,open,id)=>P(id,`<g transform="translate(${x},${y})"><ellipse cx="-14" cy="0" rx="14" ry="30" fill="url(#gChl)" stroke="#3a7420" stroke-width="2"/><ellipse cx="14" cy="0" rx="14" ry="30" fill="url(#gChl)" stroke="#3a7420" stroke-width="2"/><ellipse cx="0" cy="0" rx="${open?5:1}" ry="${open?20:22}" fill="#f3f8ec" stroke="#3a7420" stroke-width="1"/><text y="48" text-anchor="middle" class="rl" style="font-size:11.5px">${open?'åpen':'lukket'} spalteåpning</text></g>`,{nl:1});
 const P_=(x,y,t,c='#5d6472')=>pill(x,y,t,'#fff',c);
 const head=(t,sub,ex)=>`<text x="24" y="40" style="font-family:Fraunces,serif;font-size:24px;font-weight:650;fill:#1f2430">${t}</text><text x="24" y="62" class="rl" style="font-size:13.5px;font-weight:600">${sub}</text><text x="776" y="40" text-anchor="end" class="rl" style="font-size:12.5px">${ex}</text>`;
 // C3
 let c3=head('C3-fotosyntese','CO₂ bindes direkte av rubisko – det første stabile produktet har 3 C','Eks.: hvete, ris, bjørk, gran');
 c3+=cell(250,130,330,300)+stoma(170,380,1,'spalteapning')+flowArrow('M195,360 Q240,320 300,300')+P_(230,300,'CO₂')+enz(340,260,'rubisko','rubisko')+cyc(470,260)+flowArrow('M370,270 L432,268')+`<path d="M470,296 L470,360" stroke="#5d6472" stroke-width="3" marker-end="url(#arD)"/>`+P_(470,385,'sukker (G3P)','#c4683a');
 c3+=P('fotorespirasjon',`<g transform="translate(615,468)"><rect x="-175" y="-10" width="350" height="122" rx="16" fill="#fff4f2" stroke="#c0453b" stroke-width="2"/><text x="-158" y="16" class="pt" style="fill:#a8352c">Problem: fotorespirasjon</text><text x="-158" y="38" class="rl" style="font-size:12.5px">Varmt og tørt → spalteåpningene lukkes,</text><text x="-158" y="56" class="rl" style="font-size:12.5px">CO₂ synker og O₂ hoper seg opp.</text><text x="-158" y="74" class="rl" style="font-size:12.5px">Rubisko binder da O₂ i stedet for CO₂ –</text><text x="-158" y="92" class="rl" style="font-size:12.5px">energi og karbon går tapt.</text></g>`,{nl:1});
 c3+=P('c3',`<text x="415" y="120" text-anchor="middle" class="pt">mesofyllcelle</text>`,{nl:1});
 // C4
 let c4=head('C4-fotosyntese','CO₂ «forhåndsbindes» i én celle og pumpes konsentrert inn til rubisko i en annen','Eks.: mais, sukkerrør, hirse');
 c4+=cell(60,140,300,300)+cell(440,140,300,300,'url(#gWall)')+`<text x="210" y="465" text-anchor="middle" class="pt">mesofyllcelle</text>`;
 c4+=P('buntskjede',`<text x="590" y="465" text-anchor="middle" class="pt">buntskjedecelle</text><g transform="translate(700,520)"><circle r="40" fill="#d6e8b9" stroke="#7d9a4e" stroke-width="2"/>${Array.from({length:9},(_,k)=>{const a=k/9*6.283;return `<circle cx="${f1(28*Math.cos(a))}" cy="${f1(28*Math.sin(a))}" r="10" fill="url(#gChl)" stroke="#3a7420"/>`}).join('')}<circle r="14" fill="#e6c9a8" stroke="#a88b55"/><text x="-50" y="5" text-anchor="end" class="rl" style="font-size:11.5px">krans rundt nerven</text></g>`,{nl:1});
 c4+=stoma(40,500,1,'spalteapning')+P_(120,190,'CO₂')+flowArrow('M150,200 L178,236')+enz(205,265,'PEP-karb.','pepkarboksylase')+P_(110,330,'PEP (3 C)')+flowArrow('M150,320 L180,290')+flowArrow('M232,285 L262,330')+P('malat',P_(290,355,'malat (4 C)','#c4683a'),{nl:1})+flowArrow('M345,355 L470,355','#c4683a')+`<text x="408" y="345" text-anchor="middle" class="rl" style="font-size:11.5px">transporteres</text>`;
 c4+=P_(530,355,'malat → CO₂','#c4683a')+flowArrow('M560,335 L590,300')+enz(610,270,'rubisko','rubisko')+cyc(660,195)+flowArrow('M626,250 L645,232')+`<text x="660" y="252" text-anchor="middle" class="rl" style="font-size:11px">høy CO₂</text>`+P_(520,420,'pyruvat (3 C)')+flowArrow('M470,420 C400,450 250,450 140,345','#8a8270');
 c4+=`<text x="300" y="420" class="rl" style="font-size:11.5px">tilbake (bruker ATP)</text>`;
 c4+=P('c4',`<rect x="440" y="140" width="1" height="1" class="hitc"/>`,{nl:1});
 // CAM
 let cam=head('CAM-fotosyntese','Samme celle – men CO₂ tas opp om natten og brukes om dagen','Eks.: kaktus, ananas, bergknapp');
 cam+=`<rect x="40" y="90" width="355" height="480" rx="20" fill="#26324d"/><rect x="405" y="90" width="355" height="480" rx="20" fill="#fff7d6"/><circle cx="90" cy="135" r="20" fill="#e9eef8"/><circle cx="100" cy="128" r="17" fill="#26324d"/><text x="130" y="141" style="font-size:16px;font-weight:700;fill:#e9eef8">Natt</text><circle cx="455" cy="135" r="18" fill="#f6c443"/><text x="485" y="141" style="font-size:16px;font-weight:700;fill:#8a5a10">Dag</text>`;
 cam+=cell(80,180,280,300)+cell(445,180,280,300);
 cam+=`<g transform="translate(0,0)">${stoma(70,520,1,'spalteapning')}</g>`.replace('fill="#f3f8ec"','fill="#26324d"')+`<g>${stoma(435,520,0,'spalteapning')}</g>`;
 cam+=P_(140,215,'CO₂')+enz(160,285,'PEP-karb.','pepkarboksylase')+flowArrow('M190,300 L230,330')+P('malat',P_(270,350,'malat','#c4683a'),{nl:1})+`<g filter="url(#sh)"><rect x="190" y="390" width="150" height="70" rx="20" fill="url(#gVac)" stroke="#3f86b5" stroke-width="2"/></g><text x="265" y="420" text-anchor="middle" class="pt" style="font-size:12px">vakuole: lagrer</text><text x="265" y="438" text-anchor="middle" class="pt" style="font-size:12px">eplesyre</text>`+flowArrow('M270,365 L268,388','#c4683a');
 cam+=`<g filter="url(#sh)"><rect x="465" y="390" width="150" height="70" rx="20" fill="url(#gVac)" stroke="#3f86b5" stroke-width="2"/></g><text x="540" y="430" text-anchor="middle" class="pt" style="font-size:12px">eplesyre ut</text>`+flowArrow('M560,388 L590,330','#c4683a')+P_(600,310,'CO₂ frigjøres','#c4683a')+flowArrow('M620,290 L640,260')+enz(560,235,'rubisko','rubisko')+cyc(660,230)+`<text x="400" y="590" text-anchor="middle" class="rl" style="font-size:12.5px;fill:#5d6472">Spalteåpningene er lukket om dagen – planten mister lite vann</text>`;
 cam+=P('cam',`<rect x="40" y="90" width="1" height="1" class="hitc"/>`,{nl:1});
 s+=`<g data-tab="c3">${c3}</g><g data-tab="c4" style="display:none">${c4}</g><g data-tab="cam" style="display:none">${cam}</g>`;
 return s};
