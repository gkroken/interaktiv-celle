/* ---------- cell division ---------- */
const CR='#d1495b',CB='#3e7cc4';
const rodC=(x,y,L,c,rot=0,seg)=>`<g transform="translate(${f1(x)},${f1(y)}) rotate(${rot})"><rect x="-6.5" y="${-L/2}" width="13" height="${L}" rx="6.5" fill="${c}" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>${seg?`<rect x="-6.5" y="${-L/2}" width="13" height="${f1(L*.38)}" rx="6.5" fill="${seg}" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>`:''}<rect x="-3" y="${-L/2+4}" width="3" height="${L-8}" rx="1.5" fill="#fff" opacity=".25"/></g>`;
const dupC=(x,y,L,c,rot=0,segs=[null,null])=>`<g transform="translate(${f1(x)},${f1(y)}) rotate(${rot})">${rodC(-7,0,L,c,0,segs[0])}${rodC(7,0,L,c,0,segs[1])}<circle cx="0" cy="0" r="6" fill="#3a2a55"/></g>`;
const vC=(x,y,L,c,dir,seg)=>{const s=dir;return `<g transform="translate(${f1(x)},${f1(y)})"><path d="M${-s*L*.42},${-L*.48} Q${s*4},0 ${-s*L*.42},${L*.48}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="15" stroke-linecap="round"/><path d="M${-s*L*.42},${-L*.48} Q${s*4},0 ${-s*L*.42},${L*.48}" fill="none" stroke="${c}" stroke-width="12.5" stroke-linecap="round"/>${seg?`<path d="M${-s*L*.42},${-L*.48} Q${-s*L*.3},${-L*.3} ${-s*L*.2},${-L*.18}" fill="none" stroke="${seg}" stroke-width="12.5" stroke-linecap="round"/>`:''}<circle cx="${s*2}" cy="0" r="5" fill="#3a2a55"/></g>`};
const cellBody=(cx,cy,rx,ry)=>`<g filter="url(#sh)"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gCyto)" stroke="#b77945" stroke-width="5"/></g><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#pGran)"/>`;
const pole=(x,y)=>`<circle cx="${x}" cy="${y}" r="16" fill="#d6c9f0" opacity=".6" filter="url(#soft)"/>${Array.from({length:10},(_,k)=>{const a=k/10*6.283;return `<line x1="${x}" y1="${y}" x2="${f1(x+26*Math.cos(a))}" y2="${f1(y+26*Math.sin(a))}" stroke="#9d8bd0" stroke-width="1.3"/>`}).join('')}<rect x="${x-8}" y="${y-4}" width="16" height="8" rx="2" fill="url(#gCent)" stroke="#5b4a9a"/>`;
const fibers=(px,py,targets)=>targets.map(([x,y])=>`<path d="M${px},${py} Q${f1((px+x)/2)},${f1((py+y)/2+(y-py)*.15)} ${x},${y}" fill="none" stroke="#9d8bd0" stroke-width="1.5"/>`).join('');
const nucE=(cx,cy,r,dashed)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gNuc)" opacity=".85"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#6a4c98" stroke-width="3" ${dashed?'stroke-dasharray="14 9"':''}/>`;
const chromatin=(cx,cy,r,seed)=>{const R=rng(seed);let s='';for(let i=0;i<10;i++){const a=R()*6.283,d=R()*r*.7;let x=cx+d*Math.cos(a),y=cy+d*Math.sin(a);const p=[[x,y]];for(let j=0;j<5;j++){x+=(R()-.5)*r*.4;y+=(R()-.5)*r*.4;p.push([x,y])}s+=`<path d="${smooth(p,false)}" fill="none" stroke="${i%2?CR:CB}" stroke-width="2" opacity=".55"/>`}return s};

S.cellesyklus=()=>{
 const cx=400,cy=330,ro=200,ri=130;
 let s=`<rect width="800" height="600" fill="#f7f3ec"/>${title('Cellesyklusen','Livsløpet til en celle: vekst, kopiering av DNA og deling')}`;
 const seg=(a0,a1,f,id,lab,sub)=>{const t=a=>(a-90)*Math.PI/180,P0=(r,a)=>[f1(cx+r*Math.cos(t(a))),f1(cy+r*Math.sin(t(a)))];const L=a1-a0>180?1:0;const [x0,y0]=P0(ro,a0),[x1,y1]=P0(ro,a1),[x2,y2]=P0(ri,a1),[x3,y3]=P0(ri,a0);const m=(a0+a1)/2,[lx,ly]=P0((ro+ri)/2,m);
  return P(id,`<path d="M${x0},${y0} A${ro},${ro} 0 ${L} 1 ${x1},${y1} L${x2},${y2} A${ri},${ri} 0 ${L} 0 ${x3},${y3}Z" fill="${f}" stroke="#fff" stroke-width="4" filter="url(#sh)"/><text x="${lx}" y="${f1(+ly-2)}" text-anchor="middle" style="font-family:Fraunces,serif;font-size:21px;font-weight:650;fill:#1f2430">${lab}</text><text x="${lx}" y="${f1(+ly+16)}" text-anchor="middle" class="rl" style="font-size:11.5px">${sub}</text>`,{nl:1})};
 s+=seg(0,160,'url(#gProtB)','g1','G1','vekst');
 s+=seg(160,250,'url(#gYel)','sfase','S','DNA kopieres');
 s+=seg(250,305,'url(#gProtG)','g2','G2','klargjøring');
 s+=seg(305,360,'url(#gProtP)','mitose','M','mitose ›');
 s+=`<path d="${arc(cx,cy,ro+22,-88,212)}" fill="none" stroke="#5d6472" stroke-width="2"/><text x="${cx+150}" y="${cy-205}" class="pt" style="fill:#5d6472">Interfase (ca. 90 % av tiden)</text>`;
 s+=`<g><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="16s" repeatCount="indefinite"/><path d="M${cx},${cy-ri+8} L${cx-9},${cy-ri+30} L${cx+9},${cy-ri+30}Z" fill="#1f2430"/></g>`;
 s+=`<circle cx="${cx}" cy="${cy}" r="${ri-14}" fill="#fff" stroke="#e3dccd" stroke-width="2"/>${cellBody(cx,cy-6,62,48)}${nucE(cx,cy-6,26)}${chromatin(cx,cy-6,26,4)}<text x="${cx}" y="${cy+62}" text-anchor="middle" class="rl" style="font-size:12px">ca. 24 timer</text><text x="${cx}" y="${cy+78}" text-anchor="middle" class="rl" style="font-size:12px">i menneskeceller</text>`;
 const stop=(x,y)=>`<g transform="translate(${x},${y})" filter="url(#sh)"><polygon points="-7,-17 7,-17 17,-7 17,7 7,17 -7,17 -17,7 -17,-7" fill="#c0453b" stroke="#fff" stroke-width="2"/><text y="4" text-anchor="middle" style="font-size:8.5px;font-weight:700;fill:#fff">STOPP</text></g>`;
 const pt=(a,r)=>[f1(cx+r*Math.cos((a-90)*Math.PI/180)),f1(cy+r*Math.sin((a-90)*Math.PI/180))];
 const [a1x,a1y]=pt(158,ro+6),[a2x,a2y]=pt(303,ro+6),[a3x,a3y]=pt(335,ro+6);
 s+=P('sjekkpunkt',stop(a1x,a1y)+stop(a2x,a2y)+stop(a3x,a3y),{nl:1});
 const [gx,gy]=pt(70,ro);
 s+=P('g0',`<path d="M${gx},${gy} Q${+gx+60},${+gy-10} ${+gx+90},${+gy-60}" fill="none" stroke="#5d6472" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#arD)"/><g transform="translate(${+gx+120},${+gy-90})" filter="url(#sh)"><rect x="-70" y="-24" width="140" height="48" rx="14" fill="#fff" stroke="#5d6472" stroke-width="2"/><text y="-3" text-anchor="middle" class="pt">G0 – hvilefase</text><text y="14" text-anchor="middle" class="rl" style="font-size:11.5px">f.eks. nerveceller</text></g>`,{nl:1});
 s+=badge(110,470,'Meiose ›','meiose',110);
 s+=P('kreft',`<g transform="translate(110,540)" filter="url(#sh)"><rect x="-90" y="-22" width="180" height="44" rx="14" fill="#fff4f2" stroke="#c0453b" stroke-width="2"/><text y="-2" text-anchor="middle" class="pt" style="fill:#a8352c">Når kontrollen svikter</text><text y="14" text-anchor="middle" class="rl" style="font-size:11.5px">→ kreft</text></g>`,{nl:1});
 return s};

S.mitose=()=>{
 let s=`<rect width="800" height="600" fill="#f7f3ec"/>${title('Mitose','Én celle blir til to genetisk like datterceller – her med 2n = 4 kromosomer')}`;
 const L1=86,L2=52;
 // 1 interfase
 let st=cellBody(400,300,240,175)+nucE(380,300,105)+chromatin(380,300,105,9)+`<circle cx="410" cy="270" r="22" fill="url(#gNucl)"/>`+P('sentrioler',pole(540,190)+pole(560,212),{nl:1});
 s+=SP('1',P('interfase',st,{nl:1}));
 // 2 profase
 st=cellBody(400,300,240,175)+nucE(400,300,115,1)+dupC(350,270,L1,CR,-20)+dupC(445,280,L1,CB,15)+dupC(370,350,L2,CR,40)+dupC(440,355,L2,CB,-30)+pole(250,180)+pole(560,420)+`<g opacity=".7">${fibers(250,180,[[400,300],[560,420],[330,200]])}${fibers(560,420,[[400,300],[470,470]])}</g>`;
 s+=SP('2',P('profase',st,{nl:1}));
 // 3 metafase
 const ys=[175,250,340,415],chs=[[L1,CR],[L1,CB],[L2,CR],[L2,CB]];
 let ch='';chs.forEach(([L,c],i)=>ch+=dupC(400,ys[i]+(L==L2?12:0),L,c,0));
 st=cellBody(400,300,260,180)+P('spoletrader',`<g>${fibers(160,300,ys.map((y,i)=>[393,y+(chs[i][0]==L2?12:0)]))}${fibers(640,300,ys.map((y,i)=>[407,y+(chs[i][0]==L2?12:0)]))}${fibers(160,300,[[640,300]])}</g>`,{nl:1})+pole(160,300)+pole(640,300)+ch+`<line x1="400" y1="120" x2="400" y2="480" stroke="#5d6472" stroke-width="1.5" stroke-dasharray="4 6"/><text x="400" y="112" text-anchor="middle" class="rl" style="font-size:11.5px">ekvatorplanet</text>`;
 s+=SP('3',P('metafase',st,{nl:1}));
 // 4 anafase
 let lft='',rgt='';chs.forEach(([L,c],i)=>{lft+=vC(0,ys[i]+(L==L2?12:0),L,c,-1);rgt+=vC(0,ys[i]+(L==L2?12:0),L,c,1)});
 const mv=(dx)=>`<animateTransform attributeName="transform" type="translate" values="${400-dx*.1},0;${400-dx},0;${400-dx},0" keyTimes="0;.75;1" dur="3.2s" repeatCount="indefinite"/>`;
 st=cellBody(400,300,285,170)+P('spoletrader',`<g opacity=".8">${fibers(130,300,ys.map(y=>[270,y]))}${fibers(670,300,ys.map(y=>[530,y]))}${fibers(130,300,[[670,300]])}</g>`,{nl:1})+pole(130,300)+pole(670,300)+`<g>${mv(130)}${lft}</g><g>${mv(-130)}${rgt}</g>`;
 s+=SP('4',P('anafase',st,{nl:1}));
 // 5 telofase
 st=`<g filter="url(#sh)"><path d="M150,300 C150,170 330,150 400,230 C470,150 650,170 650,300 C650,430 470,450 400,370 C330,450 150,430 150,300Z" fill="url(#gCyto)" stroke="#b77945" stroke-width="5"/></g>`+nucE(270,300,70,1)+nucE(530,300,70,1)+chromatin(270,300,70,3)+chromatin(530,300,70,5)+[[-20,-20,L1*.7,CR],[15,-10,L1*.7,CB],[-15,25,L2*.7,CR],[20,25,L2*.7,CB]].map(([dx,dy,L,c])=>rodC(270+dx,300+dy,L,c,dx*2)+rodC(530+dx,300+dy,L,c,dx*2)).join('')+`<path d="M400,232 L400,368" stroke="#c0453b" stroke-width="2" stroke-dasharray="5 5"/><text x="400" y="215" text-anchor="middle" class="rl" style="font-size:11.5px">kløvningsfure</text>`;
 s+=SP('5',P('telofase',st,{nl:1}));
 // 6 cytokinese
 st=cellBody(240,300,145,130)+cellBody(560,300,145,130)+nucE(240,300,62)+nucE(560,300,62)+chromatin(240,300,62,2)+chromatin(560,300,62,2)+`<text x="790" y="590" text-anchor="end" class="pt" style="font-size:15px">To datterceller – hver med 2n = 4, likt som morcellen</text>`;
 s+=SP('6',P('cytokinese',st,{nl:1}));
 return s};

S.meiose=()=>{
 let s=`<rect width="800" height="600" fill="#f7f3ec"/>${title('Meiose','Reduksjonsdeling: 2n → n. Gir kjønnsceller som er genetisk ulike')}`;
 const L1=86,L2=52;
 // 1 profase I – tetrads w/ crossing over
 let st=cellBody(400,300,250,175)+nucE(400,300,128,1)+P('homologe',`${dupC(330,260,L1,CR,-10,[null,CB])}${dupC(358,262,L1,CB,-10,[CR,null])}${dupC(450,345,L2,CR,20)}${dupC(476,352,L2,CB,20)}`,{nl:1})+P('overkrysning',`<circle cx="338" cy="232" r="22" fill="none" stroke="#f2b630" stroke-width="3" stroke-dasharray="5 4"/><text x="300" y="196" text-anchor="end" class="pt" style="fill:#a8761a">overkrysning</text><path d="M302,200 L322,218" stroke="#a8761a" stroke-width="2"/>`,{nl:1});
 s+=SP('1',st);
 // 2 metafase I
 const pair=(x,y,L,cl,cr,segs)=>dupC(x-12,y,L,cl,0,segs?segs[0]:[null,null])+dupC(x+12,y,L,cr,0,segs?segs[1]:[null,null]);
 st=cellBody(400,300,260,180)+P('meioseI',`<g opacity=".8">${fibers(160,300,[[381,230],[381,360]])}${fibers(640,300,[[419,230],[419,360]])}</g>`,{nl:1})+pole(160,300)+pole(640,300)+pair(400,230,L1,CR,CB,[[null,CB],[CR,null]])+pair(400,360,L2,CB,CR)+P('uavhengig',`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px">Parene stiller seg tilfeldig: rød/blå kan havne på hver sin side</text>`,{nl:1});
 s+=SP('2',st);
 // 3 anafase I
 st=cellBody(400,300,285,170)+pole(130,300)+pole(670,300)+`<g><animateTransform attributeName="transform" type="translate" values="-10,0;-110,0;-110,0" keyTimes="0;.75;1" dur="3.2s" repeatCount="indefinite"/>${dupC(390,230,L1,CR,0,[null,CB])}${dupC(390,360,L2,CB,0)}</g><g><animateTransform attributeName="transform" type="translate" values="10,0;110,0;110,0" keyTimes="0;.75;1" dur="3.2s" repeatCount="indefinite"/>${dupC(410,230,L1,CB,0,[CR,null])}${dupC(410,360,L2,CR,0)}</g><text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px">Homologe kromosomer skilles – søsterkromatidene henger fortsatt sammen</text>`;
 s+=SP('3',P('meioseI',st,{nl:1}));
 // 4 telofase I
 st=cellBody(240,300,140,125)+cellBody(560,300,140,125)+dupC(225,280,L1*.85,CR,-15,[null,CB])+dupC(260,320,L2*.85,CB,15)+dupC(545,280,L1*.85,CB,10,[CR,null])+dupC(580,320,L2*.85,CR,-10)+`<text x="790" y="590" text-anchor="end" class="pt">To celler med n = 2 – hvert kromosom har fortsatt to kromatider</text>`;
 s+=SP('4',P('meioseI',st,{nl:1}));
 // 5 metafase II
 const m2=(cx,a,b,sa,sb)=>cellBody(cx,300,150,135)+pole(cx-120,300)+pole(cx+120,300)+`<g opacity=".8">${fibers(cx-120,300,[[cx-7,250],[cx-7,345]])}${fibers(cx+120,300,[[cx+7,250],[cx+7,345]])}</g>`+dupC(cx,250,L1*.85,a,0,sa)+dupC(cx,345,L2*.85,b,0,sb);
 st=P('meioseII',m2(225,CR,CB,[null,CB],[null,null])+m2(575,CB,CR,[CR,null],[null,null]),{nl:1})+`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px">Meiose II ligner mitose: søsterkromatidene skal fra hverandre</text>`;
 s+=SP('5',st);
 // 6 four haploid cells
 const hc=(x,y,a,b,sa)=>cellBody(x,y,92,78)+nucE(x,y,44)+rodC(x-12,y-2,L1*.7,a,-8,sa)+rodC(x+14,y+6,L2*.7,b,10);
 st=P('haploid',hc(190,160,CR,CB)+hc(410,160,CR,CB,CB)+hc(190,322,CB,CR,CR)+hc(410,322,CB,CR),{nl:1})+`<g transform="translate(640,300)"><rect x="-130" y="-95" width="260" height="190" rx="16" fill="#fff" stroke="#e3dccd" stroke-width="2" filter="url(#sh)"/><text x="-112" y="-62" class="pt" style="font-size:14.5px">Resultat</text>${['4 celler, hver med n = 2','Alle er genetisk forskjellige','Hos dyr: eggceller og sædceller','Befruktning: n + n = 2n'].map((t,i)=>`<circle cx="-108" cy="${-34+i*30}" r="4" fill="#c4683a"/><text x="-96" y="${-29+i*30}" class="pt" style="font-weight:600;font-size:13px">${t}</text>`).join('')}</g>`;
 s+=SP('6',st);
 return s};
