/* ---------- reaction scenes ---------- */
const badge=(x,y,t,id,w=96)=>P(id,`<g transform="translate(${x},${y})" filter="url(#sh)"><rect x="${-w/2}" y="-15" width="${w}" height="30" rx="15" fill="#fff" stroke="#c4683a" stroke-width="2"/><text y="5" text-anchor="middle" class="pt" style="fill:#9a4a1e">${t}</text></g>`,{nl:1});
const SP=(s,html)=>`<g data-s="${s}">${html}</g>`;
const title=(t,sub)=>`<text x="24" y="40" style="font-family:Fraunces,serif;font-size:24px;font-weight:650;fill:#1f2430">${t}</text>${sub?`<text x="24" y="62" class="rl" style="font-size:13.5px;font-weight:600">${sub}</text>`:''}`;
const arrowL=(x1,y1,x2,y2,c='#5d6472')=>flowArrow(`M${x1},${y1} L${x2},${y2}`,c);
const pillP=(x,y,t,c)=>pill(x,y,t,'#fff',c);

S.cytoplasma=()=>{
 let s=`<rect width="800" height="600" fill="url(#gCyto)"/><rect width="800" height="600" fill="url(#pGran)"/>${title('Glykolysen','Første trinn i celleåndingen – skjer i cytoplasmaet og trenger ikke oksygen')}`;
 s+=P('glukose',ringM(100,205,26)+molLabel(100,268,'Glukose','6 C'));
 s+=SP('1',arrowL(140,205,222,205));
 s+=P('atpinv',SP('1',pillP(180,150,'2 ATP','#3f8f68')+pillP(180,262,'2 ADP','#8a8270')+`<path d="M180,165 L180,190" stroke="#3f8f68" stroke-width="2.5" marker-end="url(#arD)"/><path d="M180,220 L180,246" stroke="#8a8270" stroke-width="2.5" marker-end="url(#arD)"/>`));
 s+=SP('1 2',`<g>${chainM(320,205,6,{p:[0,5],dx:21})}</g>`+molLabel(320,268,'Fruktose-1,6-bisfosfat','6 C + 2 P'));
 s+=SP('2',flowArrow('M390,195 Q430,150 470,135')+flowArrow('M390,215 Q430,260 470,282')+`<text x="438" y="212" class="rl" style="font-size:13px">spaltes</text>`);
 s+=P('g3p',SP('2 3',chainM(530,132,3,{p:[2]})+molLabel(530,172,'G3P','3 C + P')+chainM(530,288,3,{p:[2]})+molLabel(530,328,'G3P','3 C + P')),{lx:530,ly:212});
 s+=SP('3',arrowL(578,132,660,132)+arrowL(578,288,660,288));
 s+=P('nadh',SP('3',pillP(620,88,'NAD⁺ → NADH','#4c74a8')+pillP(620,336,'NAD⁺ → NADH','#4c74a8')),{nl:1});
 s+=P('atpgevinst',SP('3',pillP(620,176,'2 ADP → 2 ATP','#3f8f68')+pillP(620,246,'2 ADP → 2 ATP','#3f8f68')),{nl:1});
 s+=P('pyruvat',SP('3',chainM(722,132,3)+molLabel(722,172,'Pyruvat','3 C')+chainM(722,288,3)+molLabel(722,328,'Pyruvat','3 C')+`<text x="722" y="364" text-anchor="middle" class="rl" style="font-size:12.5px;fill:#c4683a">→ videre til mitokondrien</text>`),{lx:722,ly:212});
 s+=SP('4',`<rect x="420" y="400" width="360" height="150" rx="16" fill="#fff" stroke="#e3dccd" stroke-width="2" filter="url(#sh)"/><text x="440" y="430" class="pt" style="font-size:15px">Sum for én glukose</text>${[['2 pyruvat (3 C)','#1f2430'],['4 ATP laget − 2 brukt = netto 2 ATP','#2f7a52'],['2 NADH (bærer elektroner videre)','#2c4f80']].map(([t,c],i)=>`<circle cx="446" cy="${457+i*28}" r="4" fill="${c}"/><text x="458" y="${462+i*28}" class="pt" style="font-weight:600;fill:${c}">${t}</text>`).join('')}`);
 s+=P('atp',`<g transform="translate(720,425)"><rect x="-44" y="-15" width="88" height="30" rx="15" fill="url(#gProtG)" stroke="#2f7a52" stroke-width="2"/><text y="5" text-anchor="middle" class="pt" style="fill:#1d4d34">ATP ›</text></g>`,{nl:1});
 return s};

S.matriks=()=>{
 const cx=540,cy=338,r=140,A=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)];
 let s=`<rect width="800" height="600" fill="url(#gMitoM)"/><rect width="800" height="600" fill="#fff" opacity=".35"/>${title('Matriksen: sitronsyresyklusen','Pyruvat brytes helt ned til CO₂ – energien fanges i NADH, FADH₂ og ATP')}`;
 s+=P('pyruvat',chainM(80,130,3)+molLabel(80,172,'Pyruvat','3 C'));
 s+=SP('1',arrowL(118,130,222,130));
 s+=P('co2',SP('1',pillP(170,92,'CO₂','#8a8270'))+SP('3',pillP(712,186,'CO₂','#8a8270'))+SP('4',pillP(700,470,'CO₂','#8a8270')),{nl:1});
 s+=P('nadh',SP('1',pillP(170,172,'NADH','#4c74a8'))+SP('3',pillP(712,220,'NADH','#4c74a8'))+SP('4',pillP(700,504,'NADH','#4c74a8'))+SP('5',pillP(458,402,'NADH','#4c74a8')),{nl:1});
 s+=P('acetylcoa',SP('1 2',chainM(262,130,2)+`<rect x="286" y="116" width="46" height="28" rx="10" fill="url(#gProtV)" stroke="#6a5aa8" stroke-width="1.5"/><text x="309" y="135" text-anchor="middle" class="pt" style="font-size:12px">CoA</text>`+molLabel(290,172,'Acetyl-CoA','2 C')));
 s+=SP('2',flowArrow('M330,150 Q420,170 470,214'));
 const track=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#c4683a" stroke-width="5" opacity=".35"/><g><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="14s" repeatCount="indefinite"/>${[0,90,180,270].map(a=>{const [x,y]=A(a);return `<path d="M-7,-6 L5,0 L-7,6Z" fill="#c4683a" transform="translate(${f1(x)},${f1(y)}) rotate(${a+90})"/>`}).join('')}</g>`;
 s+=track+[0,1].map(i=>`<circle r="7" fill="#f2b630" stroke="#a8761a" stroke-width="1.5"><animateMotion path="M${cx-r},${cy} a${r},${r} 0 1,1 ${2*r},0 a${r},${r} 0 1,1 ${-2*r},0" dur="9s" begin="${-i*4.5}s" repeatCount="indefinite"/></circle>`).join('');
 s+=`<text x="${cx+40}" y="${cy-6}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:19px;font-weight:650;fill:#7a3510">Sitronsyre-</text><text x="${cx+40}" y="${cy+16}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:19px;font-weight:650;fill:#7a3510">syklusen</text>`;
 const [ox,oy]=A(200),[sx,sy]=A(285),[fx,fy]=A(0),[qx,qy]=A(95);
 s+=P('oksaloacetat',SP('2 5',`<rect x="${f1(ox-44)}" y="${f1(oy-24)}" width="88" height="48" rx="14" fill="#fff" opacity=".8"/>`+chainM(ox,oy,4,{dx:20})+`<text x="${f1(ox-54)}" y="${f1(oy+4)}" text-anchor="end" class="pt">Oksaloacetat</text><text x="${f1(ox-54)}" y="${f1(oy+20)}" text-anchor="end" class="rl" style="font-size:12px">4 C</text>`),{nl:1});
 s+=P('sitrat',SP('2 3',`<rect x="${f1(sx-58)}" y="${f1(sy-22)}" width="116" height="44" rx="14" fill="#fff" opacity=".8"/>`+chainM(sx,sy,6,{dx:19})+`<text x="${f1(sx)}" y="${f1(sy-30)}" text-anchor="middle" class="pt">Sitrat (sitronsyre) · 6 C</text>`),{nl:1});
 s+=SP('3 4',`<rect x="${f1(fx-50)}" y="${f1(fy-22)}" width="100" height="44" rx="14" fill="#fff" opacity=".8"/>`+chainM(fx,fy,5,{dx:19})+`<text x="${f1(fx)}" y="${f1(fy+40)}" text-anchor="middle" class="rl" style="font-size:12.5px">5 C</text>`);
 s+=SP('4 5',`<rect x="${f1(qx-44)}" y="${f1(qy-22)}" width="88" height="44" rx="14" fill="#fff" opacity=".8"/>`+chainM(qx,qy,4,{dx:20})+`<text x="${f1(qx)}" y="${f1(qy+40)}" text-anchor="middle" class="rl" style="font-size:12.5px">4 C</text>`);
 s+=P('fadh2',SP('5',pillP(458,368,'FADH₂','#7d5ba6')),{nl:1});
 s+=P('atp',SP('4',pillP(700,538,'ATP ›','#2f7a52')),{nl:1});
 return s};

S.stroma=()=>{
 const cx=430,cy=322,r=140,A=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)];
 let s=`<rect width="800" height="600" fill="url(#gChl)"/><rect width="800" height="600" fill="#fff" opacity=".45"/><rect width="800" height="600" fill="url(#pGranG)"/>${title('Calvinsyklusen','Skjer i stroma – bygger sukker av CO₂ med energi fra lysreaksjonene')}`;
 s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3f7a22" stroke-width="5" opacity=".3"/><g><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="14s" repeatCount="indefinite"/>${[45,135,225,315].map(a=>{const [x,y]=A(a);return `<path d="M-7,-6 L5,0 L-7,6Z" fill="#3f7a22" transform="translate(${f1(x)},${f1(y)}) rotate(${a+90})"/>`}).join('')}</g>`;
 s+=[0,1,2].map(i=>`<circle r="6" fill="#4b5563" stroke="#fff" stroke-width="1.5"><animateMotion path="M${cx},${cy-r} a${r},${r} 0 1,1 0,${2*r} a${r},${r} 0 1,1 0,${-2*r}" dur="10s" begin="${-i*3.3}s" repeatCount="indefinite"/></circle>`).join('');
 s+=`<text x="${cx}" y="${cy-4}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:19px;font-weight:650;fill:#2d5e16">Calvin-</text><text x="${cx}" y="${cy+18}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:19px;font-weight:650;fill:#2d5e16">syklusen</text><text x="${cx}" y="${cy+38}" text-anchor="middle" class="rl" style="font-size:12px">tallene gjelder 3 CO₂</text>`;
 const [tx,ty]=A(-90),[px,py]=A(0),[gx,gy]=A(90),[rx,ry]=A(-42);
 s+=P('rubp',SP('1 4',`<rect x="${tx-60}" y="${ty-38}" width="120" height="56" rx="14" fill="#fff" opacity=".85"/>`+chainM(tx,ty,5,{p:[0,4],dx:21})+`<text x="${tx-70}" y="${ty+4}" text-anchor="end" class="pt">3 RuBP</text><text x="${tx-70}" y="${ty+20}" text-anchor="end" class="rl" style="font-size:12px">5 C</text>`),{nl:1});
 s+=P('co2',SP('1',pillP(690,105,'3 CO₂','#8a8270')+flowArrow('M650,118 Q610,150 575,182')),{nl:1});
 s+=P('rubisko',SP('1',`<g filter="url(#sh)"><path d="${blob(rx+8,ry-4,30,rng(4),8,.3)}" fill="url(#gEnz)" stroke="#5a4fb0" stroke-width="2"/></g><text x="${rx+8}" y="${ry+1}" text-anchor="middle" class="pt" style="font-size:12px">rubisko</text>`),{nl:1});
 s+=P('pga',SP('1 2',`<rect x="${px-38}" y="${py-38}" width="76" height="62" rx="14" fill="#fff" opacity=".85"/>`+chainM(px,py,3,{p:[2]})+`<text x="${px+48}" y="${py+4}" class="pt">6 PGA</text><text x="${px+48}" y="${py+20}" class="rl" style="font-size:12px">3 C</text>`),{nl:1});
 s+=P('atp',SP('2',pillP(660,428,'6 ATP → 6 ADP','#2f7a52'))+SP('4',pillP(200,322,'3 ATP → 3 ADP','#2f7a52')),{nl:1});
 s+=P('nadph',SP('2',pillP(660,462,'6 NADPH → 6 NADP⁺','#2d5e16')),{nl:1});
 s+=P('g3p',SP('2 3 4',`<rect x="${gx-38}" y="${gy-38}" width="76" height="62" rx="14" fill="#fff" opacity=".85"/>`+chainM(gx,gy,3,{p:[2]})+`<text x="${gx-50}" y="${gy+4}" text-anchor="end" class="pt">6 G3P</text><text x="${gx-50}" y="${gy+20}" text-anchor="end" class="rl" style="font-size:12px">3 C</text>`),{nl:1});
 s+=SP('4',`<text x="${cx-120}" y="${cy+70}" class="pt" style="font-size:12.5px;fill:#2d5e16">5 G3P → 3 RuBP</text>`);
 s+=P('glukoseut',SP('3',flowArrow(`M${gx+38},${gy+14} Q${gx+90},${gy+60} ${gx+130},${gy+80}`,'#c4683a')+`<g transform="translate(${gx+250},${gy+92})"><rect x="-120" y="-24" width="240" height="48" rx="14" fill="#fff" stroke="#c4683a" stroke-width="2" filter="url(#sh)"/><text y="-3" text-anchor="middle" class="pt">1 G3P går ut av syklusen</text><text y="15" text-anchor="middle" class="rl" style="font-size:12px">2 G3P → 1 glukose (6 C)</text></g>`),{nl:1});
 return s};
S.calvin=S.stroma;

S.transkripsjon=()=>{
 let s=`<rect width="800" height="600" fill="url(#gNuc)"/><rect width="800" height="600" fill="#fff" opacity=".35"/>${title('Transkripsjon','I cellekjernen: RNA-polymerase leser malstrengen og bygger mRNA')}`;
 const R=rng(3);let fr='';for(let i=0;i<9;i++){const x=80+R()*640,y=430+R()*130,b='AUGC'[i%4];fr+=`<g transform="translate(${f1(x)},${f1(y)})"><g><animateTransform attributeName="transform" type="translate" values="0,0;${f1((R()-.5)*20)},${f1((R()-.5)*16)};0,0" dur="${f1(2+R()*2)}s" repeatCount="indefinite"/>${letterBox(0,0,b)}<circle cx="13" cy="-9" r="4" fill="url(#gYel)"/><circle cx="20" cy="-14" r="3.4" fill="url(#gYel)"/><circle cx="26" cy="-18" r="3" fill="url(#gYel)"/></g></g>`}
 s+=P('rntp',fr+`<text x="560" y="590" class="rl" style="font-size:12.5px">frie RNA-nukleotider</text>`,{lx:560,ly:420});
 s+=P('kodende',`<g id="tCod"></g>`,{lx:110,ly:198});
 s+=P('malstreng',`<g id="tTpl"></g>`,{lx:110,ly:392});
 s+=P('mrna',`<g id="tM"></g>`,{lx:300,ly:118});
 s+=P('rnapol',`<g id="tPol"></g>`,{nl:1});
 return s};

S.replikasjon=()=>{
 let s=`<rect width="800" height="600" fill="url(#gNuc)"/><rect width="800" height="600" fill="#fff" opacity=".35"/>${title('DNA-replikasjon','DNA kopieres før celledeling – hver ny dobbelheliks får én gammel og én ny tråd')}`;
 const F=[440,300],seq='ATGCCGTAGCTTAGGCATCGATGC';
 let par='';for(let i=0;i<17;i++){const x=470+i*19,b=seq[i%seq.length];par+=`<line x1="${x}" y1="268" x2="${x}" y2="300" stroke="${col[b]}" stroke-width="7"/><line x1="${x}" y1="300" x2="${x}" y2="332" stroke="${col[comp[b]]}" stroke-width="7"/>`}
 par+=`<path d="M462,266 H790 M462,334 H790" stroke="#586579" stroke-width="8" stroke-linecap="round"/><text x="790" y="256" text-anchor="end" class="rl" style="font-size:12px">5'</text><text x="790" y="358" text-anchor="end" class="rl" style="font-size:12px">3'</text>`;
 s+=P('semikonservativ',par,{lx:620,ly:390});
 const U0=[425,282],U1=[40,120],L0=[425,318],L1=[40,480];
 const at=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
 const uv=[U1[0]-U0[0],U1[1]-U0[1]],ul=Math.hypot(...uv),un=[-uv[1]/ul*-1,uv[0]/ul*-1];
 const nU=[ -(U1[1]-U0[1])/ul, (U1[0]-U0[0])/ul ]; // rotate -90 -> points down
 const nUd=nU[1]>0?nU:[-nU[0],-nU[1]];
 const lv=[L1[0]-L0[0],L1[1]-L0[1]],ll=Math.hypot(...lv);let nL=[-(lv[1])/ll,lv[0]/ll];if(nL[1]>0)nL=[-nL[0],-nL[1]];
 const off=(p,n,d)=>[p[0]+n[0]*d,p[1]+n[1]*d];
 let tpl=`<path d="M${U0} L${U1}" stroke="#586579" stroke-width="8" stroke-linecap="round"/><path d="M${L0} L${L1}" stroke="#586579" stroke-width="8" stroke-linecap="round"/>`;
 let rU='',rL='';for(let t=.06;t<.97;t+=.045){const p=at(U0,U1,t),q=off(p,nUd,32),b=seq[Math.round(t*40)%seq.length];rU+=`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1((p[0]+q[0])/2)}" y2="${f1((p[1]+q[1])/2)}" stroke="${col[b]}" stroke-width="6"/>`;const p2=at(L0,L1,t),q2=off(p2,nL,32),b2=seq[Math.round(t*37)%seq.length];rL+=`<line x1="${f1(p2[0])}" y1="${f1(p2[1])}" x2="${f1((p2[0]+q2[0])/2)}" y2="${f1((p2[1]+q2[1])/2)}" stroke="${col[b2]}" stroke-width="6"/>`}
 s+=`<g>${tpl}${rU}${rL}</g><text x="30" y="108" class="rl" style="font-size:12px">3'</text><text x="30" y="505" class="rl" style="font-size:12px">5'</text>`;
 // leading strand (new, continuous)
 const a1=off(at(U0,U1,.12),nUd,32),a2=off(at(U0,U1,.96),nUd,32);let lead=`<path d="M${f1(a2[0])},${f1(a2[1])} L${f1(a1[0])},${f1(a1[1])}" stroke="#e07a2c" stroke-width="8" stroke-linecap="round" stroke-dasharray="420" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" values="300;0;0" keyTimes="0;.8;1" dur="7s" repeatCount="indefinite"/></path>`;
 for(let t=.12;t<.96;t+=.045){const p=at(U0,U1,t),q=off(p,nUd,32),b=seq[Math.round(t*40)%seq.length];lead+=`<line x1="${f1((p[0]+q[0])/2)}" y1="${f1((p[1]+q[1])/2)}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${col[comp[b]]}" stroke-width="6"/>`}
 s+=P('ledende',lead+`<text x="290" y="160" class="pt" style="fill:#b85a14">Ledende tråd</text><text x="290" y="178" class="rl" style="font-size:12.5px">lages sammenhengende</text>`,{nl:1});
 // lagging fragments
 const frs=[[.7,.94],[.44,.66],[.17,.40]];let lag='',pri='';
 frs.forEach(([t0,t1],k)=>{const b0=off(at(L0,L1,t0),nL,32),b1=off(at(L0,L1,t1),nL,32),pp=off(at(L0,L1,t0+.035),nL,32);const L=Math.hypot(b1[0]-b0[0],b1[1]-b0[1]);const anim=k==2?`<animate attributeName="stroke-dashoffset" values="${f1(L)};0;0" keyTimes="0;.8;1" dur="7s" repeatCount="indefinite"/>`:'';lag+=`<path d="M${f1(b0[0])},${f1(b0[1])} L${f1(b1[0])},${f1(b1[1])}" stroke="#e07a2c" stroke-width="8" stroke-linecap="round" stroke-dasharray="${f1(L)}" stroke-dashoffset="0">${anim}</path>`;for(let t=t0+.01;t<t1;t+=.045){const p=at(L0,L1,t),q=off(p,nL,32),b=seq[Math.round(t*37)%seq.length];lag+=`<line x1="${f1((p[0]+q[0])/2)}" y1="${f1((p[1]+q[1])/2)}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${col[comp[b]]}" stroke-width="6" opacity="${k==2?'.0':'1'}">${k==2?`<animate attributeName="opacity" values="0;1;1" keyTimes="0;${f1((t-t0)/(t1-t0)*.8)};1" dur="7s" repeatCount="indefinite"/>`:''}</line>`}
  pri+=`<path d="M${f1(b0[0])},${f1(b0[1])} L${f1(pp[0])},${f1(pp[1])}" stroke="#d64545" stroke-width="9" stroke-linecap="round"/>`});
 const lb=off(at(L0,L1,.94),nL,32);
 s+=P('etterslepende',lag+`<text x="290" y="462" class="pt" style="fill:#b85a14">Etterslepende tråd</text><text x="290" y="480" class="rl" style="font-size:12.5px">lages i biter (Okazaki-fragmenter)</text>`,{nl:1});
 s+=P('primer',pri,{lx:300,ly:470});
 const pU=off(at(U0,U1,.12),nUd,18),pL0=off(at(L0,L1,.17),nL,18),pL1=off(at(L0,L1,.40),nL,18);
 s+=P('dnapolymerase',`<g filter="url(#sh)"><ellipse cx="${f1(pU[0])}" cy="${f1(pU[1])}" rx="30" ry="22" fill="url(#gProtG)" stroke="#2f7a52" stroke-width="2"/></g><g><animateMotion path="M${f1(pL0[0]-pL0[0])},${f1(pL0[1]-pL0[1])} L${f1(pL1[0]-pL0[0])},${f1(pL1[1]-pL0[1])} L${f1(pL1[0]-pL0[0])},${f1(pL1[1]-pL0[1])}" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear" dur="7s" repeatCount="indefinite"/><g filter="url(#sh)"><ellipse cx="${f1(pL0[0])}" cy="${f1(pL0[1])}" rx="30" ry="22" fill="url(#gProtG)" stroke="#2f7a52" stroke-width="2"/></g></g>`,{lx:f1(pU[0]),ly:f1(pU[1]-30)});
 s+=P('helikase',`<g filter="url(#sh)"><circle cx="${F[0]}" cy="${F[1]}" r="34" fill="url(#gProtV)" stroke="#5b4a9a" stroke-width="2.5"/><circle cx="${F[0]}" cy="${F[1]}" r="11" fill="#f1ebfa" stroke="#5b4a9a" stroke-width="2"/></g><g><animateTransform attributeName="transform" type="rotate" from="0 ${F[0]} ${F[1]}" to="360 ${F[0]} ${F[1]}" dur="3s" repeatCount="indefinite"/><path d="M${F[0]},${F[1]-22} l4,-6 l4,6z M${F[0]},${F[1]+22} l-4,6 l-4,-6z" fill="#5b4a9a"/></g>`,{lx:F[0],ly:F[1]-46});
 s+=`<g transform="translate(560,200)"><path d="M0,0 H70" stroke="#5d6472" stroke-width="3" marker-end="url(#arD)"/><text x="0" y="-10" class="rl" style="font-size:12.5px">gaffelen åpner seg videre</text></g>`;
 return s};

S.atp=()=>{
 let s=`<rect width="800" height="600" fill="#f4f6fa"/>${title('ATP – cellens energivaluta','Adenosintrifosfat: energien ligger i bindingene mellom fosfatgruppene')}`;
 const hex=Array.from({length:6},(_,k)=>{const t=(30+k*60-90)*Math.PI/180;return f1(150+42*Math.cos(t))+','+f1(280+42*Math.sin(t))}).join(' ');
 s+=P('adenin',`<g filter="url(#sh)"><polygon points="${hex}" fill="url(#gBase)" stroke="#c0453b" stroke-width="3" stroke-linejoin="round"/><polygon points="186.4,259 186.4,301 226,314 251,280 226,246" fill="url(#gBase)" stroke="#c0453b" stroke-width="3" stroke-linejoin="round"/></g><text x="150" y="290" text-anchor="middle" style="font-size:24px;font-weight:700;fill:#8a2a22">A</text><text x="180" y="355" text-anchor="middle" class="rl">adenin</text>`);
 const pent=(cx,cy,r)=>Array.from({length:5},(_,k)=>{const t=(-90+k*72)*Math.PI/180;return f1(cx+r*Math.cos(t))+','+f1(cy+r*Math.sin(t))}).join(' ');
 s+=`<line x1="245" y1="296" x2="292" y2="330" stroke="#4b5563" stroke-width="5"/><line x1="358" y1="330" x2="398" y2="300" stroke="#4b5563" stroke-width="5"/>`;
 s+=P('ribose',`<g filter="url(#sh)"><polygon points="${pent(320,352,48)}" fill="url(#gSug)" stroke="#c0614a" stroke-width="3" stroke-linejoin="round"/></g><circle cx="320" cy="304" r="9" fill="url(#gO)"/><text x="320" y="364" text-anchor="middle" class="pt">ribose</text>`,{lx:320,ly:430});
 const ph=(x,l)=>`<g filter="url(#sh)"><circle cx="${x}" cy="300" r="33" fill="url(#gYel)" stroke="#b8902a" stroke-width="3"/></g><text x="${x}" y="309" text-anchor="middle" style="font-size:24px;font-weight:700;fill:#6e5310">P</text>${[[-1,-1],[1,-1],[0,1.3]].map(([a,b])=>`<circle cx="${x+a*28}" cy="${300+b*28}" r="8" fill="url(#gO)"/>`).join('')}<text x="${x}" y="368" text-anchor="middle" class="rl" style="font-size:13px">${l}</text>`;
 const wav=(x1,x2,id)=>`<path id="${id}" d="M${x1},300 q8,-10 16,0 t16,0 t16,0" fill="none" stroke="#e05a4f" stroke-width="5" stroke-linecap="round"/>`;
 s+=P('fosfatkjede',ph(432,'α')+wav(465,530,'b1')+ph(530,'β')+`<g id="gam">${ph(628,'γ')}</g>`,{lx:530,ly:410});
 s+=P('hydrolyse',`<g id="bg">${wav(563,628,'b2')}</g><g id="burst" opacity="0"><polygon points="${Array.from({length:16},(_,k)=>{const rr=k%2?18:44,t=k*Math.PI/8;return f1(580+rr*Math.cos(t))+','+f1(300+rr*Math.sin(t))}).join(' ')}" fill="#ffd54a" stroke="#e0a020" stroke-width="2"/><text x="580" y="250" text-anchor="middle" style="font-size:17px;font-weight:700;fill:#b06b00">energi!</text></g><g id="wat" transform="translate(690,500)"><circle r="14" fill="url(#gO)" stroke="rgba(0,0,0,.3)"/><text y="5" text-anchor="middle" style="font-size:13px;font-weight:700;fill:#fff">O</text><circle cx="-16" cy="12" r="9" fill="url(#gH)" stroke="#9aa3b0"/><circle cx="16" cy="12" r="9" fill="url(#gH)" stroke="#9aa3b0"/><text x="0" y="40" text-anchor="middle" class="rl" style="font-size:12.5px">H₂O</text></g>`,{nl:1});
 s+=`<text id="atpT" x="400" y="150" text-anchor="middle" style="font-family:Fraunces,serif;font-size:30px;font-weight:650;fill:#1f2430">ATP</text><text x="400" y="470" text-anchor="middle" class="rl" style="font-size:13px">Røde bølgelinjer = energirike bindinger mellom fosfatgruppene</text>`;
 return s};

S.peptidbinding=()=>{
 let s=`<rect width="800" height="600" fill="#f8f4ee"/>${title('Peptidbinding','To aminosyrer kobles sammen – og ett vannmolekyl spaltes av (kondensasjon)')}`;
 const C=(x,y)=>atom(x,y,'C','url(#gCarb)',15),N=(x,y)=>atom(x,y,'N','url(#gN)',15),O=(x,y)=>atom(x,y,'O','url(#gO)',15),H=(x,y)=>atom(x,y,'H','url(#gH)',11,'#374151');
 const bd=(x1,y1,x2,y2,dbl)=>dbl?`<line x1="${x1-5}" y1="${y1}" x2="${x2-5}" y2="${y2}" stroke="#374151" stroke-width="3.5"/><line x1="${x1+5}" y1="${y1}" x2="${x2+5}" y2="${y2}" stroke="#374151" stroke-width="3.5"/>`:`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#374151" stroke-width="3.5"/>`;
 const Y=290;
 // amino acid 1
 s+=`<text x="210" y="150" text-anchor="middle" class="pt" style="font-size:14px">Aminosyre 1</text><text x="580" y="150" text-anchor="middle" class="pt" style="font-size:14px" id="aa2t">Aminosyre 2</text>`;
 s+=bd(140,Y,205,Y)+bd(205,Y,270,Y)+bd(205,Y,205,Y-50)+bd(205,Y,205,Y+58)+bd(270,Y,270,Y-58,1);
 s+=P('aminogruppe',bd(140,Y,104,Y-30)+bd(140,Y,104,Y+30)+H(104,Y-30)+H(104,Y+30)+N(140,Y),{lx:110,ly:Y+70});
 s+=C(205,Y)+H(205,Y-50);
 s+=P('rgruppe',`<g filter="url(#sh)"><circle cx="205" cy="${Y+68}" r="20" fill="url(#gR)" stroke="#6a4fb0" stroke-width="2"/></g><text x="205" y="${Y+74}" text-anchor="middle" style="font-size:15px;font-weight:700;fill:#3d2a70">R₁</text>`,{lx:205,ly:Y+112});
 s+=P('karboksylgruppe',C(270,Y)+O(270,Y-58)+`<g id="bCO">${bd(270,Y,335,Y)}${bd(335,Y,385,Y)}</g>`,{lx:300,ly:Y-92});
 s+=P('vann',`<g id="mO">${O(335,Y)}</g><g id="mH1">${H(385,Y)}</g><g id="mH2">${H(440,Y)}</g><g id="h2o" opacity="0"><line x1="400" y1="470" x2="368" y2="492" stroke="#374151" stroke-width="3"/><line x1="400" y1="470" x2="432" y2="492" stroke="#374151" stroke-width="3"/><text x="400" y="${Y+228}" text-anchor="middle" class="pt" style="font-size:15px;fill:#3e7cc4">H₂O spaltes av</text></g>`,{nl:1});
 s+=`<g id="aa2"><g id="bNH">${bd(440,Y,490,Y)}</g>`+bd(490,Y,555,Y)+bd(555,Y,620,Y)+bd(555,Y,555,Y-50)+bd(555,Y,555,Y+58)+bd(620,Y,620,Y-58,1)+bd(620,Y,685,Y)+bd(685,Y,735,Y)+bd(490,Y,490,Y+50)+
  P('aminogruppe',H(490,Y+50)+N(490,Y))+C(555,Y)+H(555,Y-50)+P('rgruppe',`<g filter="url(#sh)"><circle cx="555" cy="${Y+68}" r="20" fill="url(#gR2)" stroke="#2f7a52" stroke-width="2"/></g><text x="555" y="${Y+74}" text-anchor="middle" style="font-size:15px;font-weight:700;fill:#1d4d34">R₂</text>`)+P('karboksylgruppe',C(620,Y)+O(620,Y-58)+O(685,Y)+H(735,Y))+`</g>`;
 s+=P('pbind',`<g id="pb" opacity="0"><line x1="270" y1="${Y}" x2="335" y2="${Y}" stroke="#e07a2c" stroke-width="7" stroke-linecap="round"/><rect x="250" y="${Y-28}" width="105" height="56" rx="16" fill="none" stroke="#e07a2c" stroke-width="2.5" stroke-dasharray="6 4"/><text x="302" y="${Y+86}" text-anchor="middle" class="pt" style="fill:#b85a14">peptidbinding</text></g>`,{nl:1});
 s+=`<text id="ppT" x="400" y="560" text-anchor="middle" class="pt" style="font-size:15px"></text>`;
 return s};

{const _d=S.dna;S.dna=()=>_d()+badge(700,40,'Replikasjon ›','replikasjon',130);}
{const _e=S.indremembran;S.indremembran=()=>_e()+badge(752,566,'ATP ›','atp',70);}
{const _t=S.tylakoid;S.tylakoid=()=>_t()+badge(520,110,'ATP ›','atp',70);}
