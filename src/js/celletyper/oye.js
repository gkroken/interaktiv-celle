/* ====================== ØYET: øye → netthinne → staver og tapper ====================== */
DEFS=DEFS.replace('</defs>',[
 ['gRodOS','#efe9fd','#cdbcf1','#8f74c9'],['gConeOS','#fff0d6','#f6c27a','#d08a2e'],['gIS','#fff6ee','#f6dcc3','#d9a77e'],
 ['gRPE','#b48963','#80583b','#4e321f'],['gLens','#ffffff','#eef6fb','#bcd5e6'],['gVit','#fbfdfe','#eef5f9','#d8e6ef'],
 ['gIris','#9cc2df','#4f86b5','#2c5a85'],['gRet','#fde6df','#f6bdb1','#e08c7c'],['gRho','#f8d7e4','#e58aab','#b44a73'],
 ['gGa','#fff3cc','#f2c14e','#c48a12'],['gGbg','#d6f3ef','#5fc4b8','#2b8c80'],['gPde','#dbe8f9','#7aa8de','#3e6fae'],
 ['gCng','#e6f6dc','#8fcf6a','#4f9a2e'],['gArr','#ead9f7','#b48ad9','#7a4fa6'],['gGC','#fde3cf','#ef9f6a','#b9622c'],
 ['gGang','#fdeedd','#f3cfa6','#d39a68'],['gBip','#e9f1fb','#bcd0ee','#7f9fcf'],['gHor','#eaf6ee','#b7dfc3','#6fae82']
].map(([k,a,b,c])=>RG(k,a,b,c)).join('')+'</defs>');

const OY={};
// spektral følsomhet (normalisert). Toppunkter: S 420, M 530, L 560, stav 498 nm
OY.sens=(w,m,a,b)=>Math.exp(-.5*((w-m)/(w<m?a:b))**2);
OY.S=w=>OY.sens(w,420,30,30);OY.M=w=>OY.sens(w,530,52,38);OY.L=w=>OY.sens(w,560,56,40);OY.R=w=>OY.sens(w,498,46,38);
OY.mix=(a,b,t)=>'#'+[0,2,4].map(k=>Math.round(parseInt(a.substr(k+1,2),16)*(1-t)+parseInt(b.substr(k+1,2),16)*t).toString(16).padStart(2,'0')).join('');
// stiliserte fotoreseptorer (brukes i netthinne-scenen)
// indre segment øverst, ytre segment nederst mot pigmentepitelet (lyset kommer ovenfra)
OY.rodMini=(x,y0,y1)=>{const m=y0+(y1-y0)*.36;return `<g><rect x="${x-5.5}" y="${y0}" width="11" height="${f1(m-y0)}" rx="5" fill="url(#gIS)" stroke="#b07a52" stroke-width="1.2"/><rect x="${x-5}" y="${f1(m+1)}" width="10" height="${f1(y1-m-1)}" rx="4" fill="url(#gRodOS)" stroke="#6f58a8" stroke-width="1.2"/>${Array.from({length:7},(_,k)=>`<line x1="${x-4}" x2="${x+4}" y1="${f1(m+6+k*(y1-m-8)/7)}" y2="${f1(m+6+k*(y1-m-8)/7)}" stroke="#8f74c9" stroke-width=".8"/>`).join('')}</g>`};
OY.coneMini=(x,y0,y1,col='#d08a2e')=>{const m=y0+(y1-y0)*.5;return `<g><ellipse cx="${x}" cy="${f1((y0+m)/2)}" rx="10" ry="${f1((m-y0)/2)}" fill="url(#gIS)" stroke="#b07a52" stroke-width="1.2"/><path d="M${x-8},${f1(m)} L${x+8},${f1(m)} L${x+3},${f1(y1)} L${x-3},${f1(y1)}Z" fill="url(#gConeOS)" stroke="${col}" stroke-width="1.3"/></g>`};

/* ---------------- ØYET ---------------- */
OY.E={cx:505,cy:305,R:205,rr:186};
OY.ret=a=>[OY.E.cx+OY.E.rr*Math.cos(a*Math.PI/180),OY.E.cy+OY.E.rr*Math.sin(a*Math.PI/180)];
S.oye=()=>{const {cx,cy,R,rr}=OY.E;
 let s=`<rect width="800" height="600" fill="#f3f1ec"/>${title('Øyet','Horisontalt snitt gjennom høyre øye, sett ovenfra – lyset kommer fra venstre')}`;
 const arcP=(r,a0,a1)=>{const p=a=>[f1(cx+r*Math.cos(a*Math.PI/180)),f1(cy+r*Math.sin(a*Math.PI/180))];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${x0},${y0} A${r},${r} 0 ${a1-a0>180?1:0} 1 ${x1},${y1}`};
 // synsnerve bak
 const [ox,oy]=OY.ret(17);
 s+=P('synsnerve',`<path d="M${f1(ox+2)},${f1(oy-12)} C${f1(ox+60)},${f1(oy-6)} 720,${f1(oy+14)} 800,${f1(oy+44)} L800,${f1(oy+92)} C720,${f1(oy+60)} ${f1(ox+56)},${f1(oy+44)} ${f1(ox+2)},${f1(oy+18)}Z" fill="#f4e3c6" stroke="#b99a66" stroke-width="2"/>${[0,1,2,3].map(k=>`<path d="M${f1(ox+20)},${f1(oy-2+k*6)} C${f1(ox+80)},${f1(oy+4+k*7)} 730,${f1(oy+30+k*11)} 800,${f1(oy+56+k*10)}" fill="none" stroke="#e2c99b" stroke-width="2"/>`).join('')}`,{lx:740,ly:oy+30});
 // senehinne (hvit), årehinne, netthinne
 s+=P('senehinne',`<g filter="url(#sh)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fbfaf6" stroke="#b9ae9a" stroke-width="2.5"/></g><path d="${arcP(R-7,-150,150)}" fill="none" stroke="#8e4a3c" stroke-width="7" opacity=".85"/>`,{lx:cx+40,ly:cy-R+14});
 s+=`<circle cx="${cx}" cy="${cy}" r="${rr-5}" fill="url(#gVit)"/>`;
 s+=P('netthinne',`<path d="${arcP(rr,-130,130)}" fill="none" stroke="#e7907f" stroke-width="9" stroke-linecap="round"/><path d="${arcP(rr,-130,130)}" class="hit"/>`,{lx:cx+90,ly:cy-rr+40});
 const [fx,fy]=OY.ret(0);
 s+=P('fovea',`<ellipse cx="${f1(fx-2)}" cy="${f1(fy)}" rx="7" ry="22" fill="#f2c94c" opacity=".75"/><path d="M${f1(fx-4)},${f1(fy-9)} Q${f1(fx+3)},${f1(fy)} ${f1(fx-4)},${f1(fy+9)}" fill="none" stroke="#a84f40" stroke-width="2.5"/>`,{lx:fx-34,ly:fy-26});
 s+=P('blindflekk',`<ellipse cx="${f1(ox-1)}" cy="${f1(oy+3)}" rx="6" ry="14" fill="#fff4dc" stroke="#c8a76a" stroke-width="2"/>`,{lx:ox-40,ly:oy+30});
 s+=P('glasslegeme',`<circle cx="${cx+20}" cy="${cy}" r="130" class="hitc"/>`,{lx:cx+10,ly:cy+120});
 // fremre del
 const cy0=cy;
 s+=P('hornhinne',`<path d="M${cx-185},${cy0-92} Q${cx-275},${cy0} ${cx-185},${cy0+92}" fill="#eaf5fb" fill-opacity=".55" stroke="#7fb3d5" stroke-width="3.5"/>`,{lx:cx-262,ly:cy0-70});
 s+=`<g id="eIris"></g>`;
 s+=P('straalelegeme',`<path d="M${cx-185},${cy0-92} L${cx-166},${cy0-74} L${cx-180},${cy0-70}Z M${cx-185},${cy0+92} L${cx-166},${cy0+74} L${cx-180},${cy0+70}Z" fill="#b5675a" stroke="#8e4a3c" stroke-width="1.5"/><g id="eZon"></g>`,{lx:cx-150,ly:cy0-112});
 s+=P('linse',`<ellipse id="eLens" cx="${cx-160}" cy="${cy0}" rx="22" ry="62" fill="url(#gLens)" stroke="#8fb3cc" stroke-width="2.5"/>`,{lx:cx-160,ly:cy0+92});
 s+=`<g id="eRays" style="pointer-events:none"></g><g id="eSrc" style="pointer-events:none"></g>`;
 s+=badge(cx+150,92,'Netthinnen ›','netthinne',118);
 s+=`<text x="${cx+40}" y="${cy+R+38}" class="rl" style="font-size:12.5px;font-weight:600" text-anchor="middle">Linsen bøyer lyset slik at det samles i den gule flekken – bildet blir opp-ned</text>`;
 return s};
LIVE.oye={pos:'bl',ctrl:`<div style="width:256px"><div class="cx-title">Fokuser på en gjenstand</div><label class="cx-sl wide">Avstand <b id="eDv"></b><input type="range" id="eD" min="0" max="100" value="100"></label><label class="cx-sl wide">Alder <b id="eAv"></b><input type="range" id="eA" min="8" max="75" value="16"></label><label class="cx-sl wide">Lysstyrke <b id="eLv"></b><input type="range" id="eL" min="0" max="100" value="60"></label><div class="cx-note" id="eN"></div></div>`,
init(){const {cx,cy}=OY.E,LX=cx-160,nt=cq('#eN');let s=1,age=16,lux=.6,A=0,pup=.5,t=0;
 const amax=a=>Math.max(.5,15-.28*Math.max(0,a-8)-.0022*Math.max(0,a-30)**2*10);   // grovt: 14 D som barn, ~1 D ved 60 år
 function geo(){const d=s>=.999?Infinity:.1*Math.pow(10,s*2),V=d===Infinity?0:1/d,need=V,am=amax(age);return{d,V,need,am}}
 function draw(){const g=geo();
  cq('#eDv').textContent=g.d===Infinity?'langt unna':g.d<1?`${Math.round(g.d*100)} cm`:`${g.d.toFixed(1).replace('.',',')} m`;
  cq('#eAv').textContent=`${age} år`;cq('#eLv').textContent=lux<.25?'skumring':lux<.7?'innendørs':'sol';
  const rx=18+1.35*A;q('#eLens').setAttribute('rx',f1(rx));
  q('#eZon').innerHTML=[-1,1].map(sg=>[0,1,2].map(k=>`<line x1="${cx-172}" y1="${cy+sg*(72-k*3)}" x2="${f1(LX+(k-1)*rx*.4)}" y2="${f1(cy+sg*(58-k*6))}" stroke="#c9a28f" stroke-width="1" opacity="${f1(.5+.4*(1-A/15))}"/>`).join('')).join('');
  const pr=10+30*(1-pup);   // pupillens radius
  q('#eIris').innerHTML=P('iris',`<rect x="${cx-180}" y="${cy-86}" width="9" height="${f1(86-pr)}" rx="3" fill="url(#gIris)" stroke="#2c5a85"/><rect x="${cx-180}" y="${f1(cy+pr)}" width="9" height="${f1(86-pr)}" rx="3" fill="url(#gIris)" stroke="#2c5a85"/>`,{lx:cx-205,ly:cy-60});
  // stråler: punktkilde på aksen; fokus ligger bak netthinnen hvis linsen ikke klarer å akkommodere nok
  const RX=cx+OY.E.rr-4,def=g.V-A,fxp=RX+26*def,sx=g.d===Infinity?20:Math.max(30,LX-90-150*s),hs=[-1,-.45,.45,1].map(k=>k*Math.min(pr-3,30));
  let r='';const col=lux<.25?'#c9b45a':'#f2b630';
  hs.forEach(h=>{const ly=cy+h,y0=g.d===Infinity?ly:cy,x0=sx;const k=(cy-ly)/(fxp-LX),yr=ly+k*(RX-LX);
   r+=`<path d="M${f1(x0)},${f1(y0)} L${cx-215},${f1(y0+(ly-y0)*((cx-215-x0)/(LX-x0)))} L${LX},${f1(ly)} L${f1(RX)},${f1(yr)}" fill="none" stroke="${col}" stroke-width="2" opacity=".9"/>`});
  const blur=Math.abs(30*(1-(RX-LX)/(fxp-LX)));
  r+=`<ellipse cx="${f1(RX)}" cy="${cy}" rx="3.5" ry="${f1(Math.max(3,blur))}" fill="${blur>6?'#f08a1c':'#ffd54a'}" opacity=".9"/>`;
  if(blur>6)r+=`<text x="${f1(RX-12)}" y="${f1(cy-blur-8)}" text-anchor="end" style="font-size:12px;font-weight:700;fill:#c0453b">uskarpt</text>`;
  q('#eRays').innerHTML=r;
  q('#eSrc').innerHTML=g.d===Infinity?`<text x="22" y="${cy-48}" class="rl" style="font-size:11.5px">parallelle</text><text x="22" y="${cy-35}" class="rl" style="font-size:11.5px">stråler</text>`:`<circle cx="${f1(sx)}" cy="${cy}" r="11" fill="#ffe28a" opacity=".6"/><circle cx="${f1(sx)}" cy="${cy}" r="5" fill="#f2b630"/>`;
  const short=g.need-g.am;
  nt.innerHTML=`Linsen må brytes <b>${g.need.toFixed(1).replace('.',',')} D</b> ekstra – i din alder klarer den ca. <b>${g.am.toFixed(1).replace('.',',')} D</b>. `+(short>.3?`<b>For nært!</b> Med alderen blir linsen stivere (alderssynthet), og nærpunktet flytter seg utover.`:A>1?'Ringmuskelen i strålelegemet trekker seg sammen, trådene slakkes, og linsen blir rundere.':'Ved fjernsyn er ringmuskelen avslappet og linsen flat.')+` Pupillen: ${lux<.25?'stor – slipper inn mest mulig lys':lux<.7?'middels':'liten – skjermer mot for mye lys'}.`}
 cq('#eD').oninput=e=>{s=+e.target.value/100};cq('#eA').oninput=e=>{age=+e.target.value};cq('#eL').oninput=e=>{lux=+e.target.value/100};
 onSel=id=>{if(id==='akkommodasjon'||id==='linse'){s=.05;cq('#eD').value=5}if(id==='alderssyn'){age=60;cq('#eA').value=60;s=.2;cq('#eD').value=20}if(id==='iris'){lux=.1;cq('#eL').value=10}};
 A=Math.min(geo().need,amax(age));pup=lux;draw();
 return loop(dt=>{const g=geo(),tA=Math.min(g.need,g.am),k=ANIM?Math.min(1,dt*3):1;A+=(tA-A)*k;pup+=(lux-pup)*(ANIM?Math.min(1,dt*2):1);draw()})}};

/* ---------------- NETTHINNEN ---------------- */
// lyset kommer ovenfra (fra glasslegemet) og må gjennom alle lagene før det når stavene og tappene nederst
OY.N={PR:Array.from({length:15},(_,k)=>70+k*33.5),CONES:[3,7,12],Y:{gc:150,ipl:[180,240],inl:290,hor:332,opl:358,onl:400,is:452,os:[478,540],rpe:[542,586]}};
S.netthinne=()=>{const {PR,CONES,Y}=OY.N;const isC=k=>CONES.includes(k);
 let s=`<rect width="800" height="600" fill="#f7f2ee"/>${title('Netthinnen','Lyset må gjennom hele netthinnen før det treffer stavene og tappene')}`;
 // lag-bakgrunner
 [[100,128,'#f1ece4'],[128,172,'#efe6dc'],[172,248,'#f8f3ec'],[248,342,'#efe6dc'],[342,372,'#f8f3ec'],[372,432,'#ece2d6'],[432,540,'#f6efe6']].forEach(([a,b,c])=>s+=`<rect x="30" y="${a}" width="540" height="${b-a}" fill="${c}"/>`);
 s+=P('pigmentepitel',`<rect x="30" y="${Y.rpe[0]}" width="540" height="${Y.rpe[1]-Y.rpe[0]}" fill="url(#gRPE)"/>${Array.from({length:12},(_,k)=>`<rect x="${32+k*45}" y="${Y.rpe[0]+2}" width="42" height="40" rx="6" fill="none" stroke="#3b2516" stroke-width="1.2" opacity=".6"/><ellipse cx="${53+k*45}" cy="${Y.rpe[0]+26}" rx="7" ry="5" fill="#2a170c" opacity=".55"/>`).join('')}`,{lx:300,ly:Y.rpe[0]+30});
 // lysstråler og «lys inn»
 s+=`<g id="nPh" style="pointer-events:none"></g><text x="40" y="94" class="pt" style="font-size:13px;fill:#a8761a">Lys inn ↓ (fra glasslegemet)</text>`;
 // Müller-celle gjennom hele netthinnen
 s+=P('mullercelle',`<path d="M548,108 L552,108 L556,440 L544,440Z" fill="#f2ead6" stroke="#c8b892" stroke-width="1.2"/><path d="M536,104 Q550,96 564,104 L560,112 L540,112Z" fill="#f2ead6" stroke="#c8b892" stroke-width="1.2"/><ellipse cx="550" cy="300" rx="8" ry="14" fill="#efe1bf" stroke="#c8b892"/>`,{lx:556,ly:250});
 // fotoreseptorer
 let pr='',cn='';
 PR.forEach((x,k)=>{const c=isC(k);const body=c?OY.coneMini(x,Y.is-14,Y.os[0]+34,'#d08a2e'):OY.rodMini(x,Y.is-10,Y.os[1]);
  const axon=`<line x1="${x}" y1="${Y.onl+10}" x2="${x}" y2="${Y.opl}" stroke="${c?'#b07a52':'#9c86c9'}" stroke-width="${c?3:2}"/><ellipse cx="${x}" cy="${Y.onl+(k%2?8:-6)}" rx="${c?7:5.5}" ry="${c?8:6.5}" fill="${c?'#f6d7b2':'#ddd2f2'}" stroke="${c?'#b07a52':'#8f74c9'}" stroke-width="1"/><rect x="${x-(c?7:4)}" y="${Y.opl-4}" width="${c?14:8}" height="8" rx="3" fill="${c?'#e9b37d':'#c4b3e8'}" stroke="${c?'#b07a52':'#8f74c9'}" stroke-width="1"/>`;
  const g=`<g id="nPR${k}">${axon}${body}<line x1="${x}" y1="${Y.is-14}" x2="${x}" y2="${Y.onl+12}" stroke="${c?'#b07a52':'#9c86c9'}" stroke-width="${c?3:2}"/></g>`;if(c)cn+=g;else pr+=g});
 s+=P('stav',pr,{lx:120,ly:Y.os[1]-12})+P('tapp',cn,{lx:PR[7],ly:Y.os[0]-4});
 // horisontalcelle
 s+=P('horisontal',`<path d="M${PR[8]},${Y.opl+6} Q${PR[10]},${Y.hor-10} ${PR[12]},${Y.opl+6} M${PR[10]},${Y.hor} L${PR[9]-10},${Y.opl+4} M${PR[10]},${Y.hor} L${PR[11]+10},${Y.opl+4}" fill="none" stroke="#6fae82" stroke-width="3"/><ellipse id="nHor" cx="${PR[10]}" cy="${Y.hor}" rx="13" ry="9" fill="url(#gHor)" stroke="#4f8a60" stroke-width="1.4"/>`,{lx:PR[10]+30,ly:Y.hor+4});
 // bipolarceller: ON (tapp 3), OFF (tapp 7), stav-bipolar (staver 4-6)
 const bip=(id,x,dx,col,y2,txt)=>`<g id="${id}"><path d="M${dx.map(d=>`${x+d},${Y.opl+4} L${x},${Y.inl+12}`).join(' M')}" fill="none" stroke="${col}" stroke-width="2.4"/><line x1="${x}" y1="${Y.inl-12}" x2="${x}" y2="${y2}" stroke="${col}" stroke-width="3"/><circle cx="${x}" cy="${y2}" r="5" fill="${col}"/><ellipse class="bb" cx="${x}" cy="${Y.inl}" rx="10" ry="15" fill="url(#gBip)" stroke="${col}" stroke-width="1.6"/><text x="${x}" y="${Y.inl+4}" text-anchor="middle" style="font-size:${txt.length>3?7.5:9.5}px;font-weight:800;fill:${col}">${txt}</text></g>`;
 s+=P('bipolar',bip('nBon',PR[3],[0],'#3f6fb5',196,'ON')+bip('nBoff',PR[7],[0],'#7a4fa6',230,'OFF')+bip('nBrod',PR[5],[-33,0,33],'#5a7d9c',226,'stav'),{lx:PR[5]-6,ly:Y.inl+40});
  s+=P('onoff',`<rect x="34" y="186" width="18" height="16" rx="3" fill="#3f6fb5" opacity=".75"/><text x="43" y="198" text-anchor="middle" style="font-size:8.5px;font-weight:800;fill:#fff">ON</text><rect x="34" y="220" width="18" height="16" rx="3" fill="#7a4fa6" opacity=".75"/><text x="43" y="232" text-anchor="middle" style="font-size:8.5px;font-weight:800;fill:#fff">OFF</text>`,{lx:43,ly:176});
 // amakrinceller (AII kobler stavbanen inn i tappbanene)
 s+=P('amakrin',`<path d="M${PR[5]},228 Q${PR[5]+28},236 ${PR[6]+10},${Y.inl-26} M${PR[6]+10},${Y.inl-26} Q${PR[6]-6},214 ${PR[3]+6},200 M${PR[6]+10},${Y.inl-26} L${PR[7]+4},228" fill="none" stroke="#c2851b" stroke-width="2"/><ellipse cx="${PR[6]+10}" cy="${Y.inl-30}" rx="10" ry="8" fill="url(#gGa)" stroke="#a46e14" stroke-width="1.3"/>`,{lx:PR[6]+40,ly:Y.inl-30});
 // ganglionceller: ON (over ON-bipolar), OFF og en lysfølsom ipRGC
 const gc=(id,x,y2,col)=>`<g id="${id}"><line x1="${x}" y1="${y2}" x2="${x}" y2="${Y.gc+12}" stroke="${col}" stroke-width="2.6"/><path d="M${x-12},${y2} L${x+12},${y2}" stroke="${col}" stroke-width="2.6"/><path d="M${x-10},${Y.gc-12} Q${x-30},116 ${x-60},116 L40,116" fill="none" stroke="${col}" stroke-width="2.2"/><circle class="gb" cx="${x}" cy="${Y.gc}" r="14" fill="url(#gGang)" stroke="${col}" stroke-width="1.8"/></g>`;
 s+=P('ganglion',gc('nGon',PR[3],196,'#3f6fb5')+gc('nGoff',PR[7],230,'#7a4fa6'),{lx:PR[5],ly:Y.gc-24});
 s+=P('iprgc',`<g id="nGip"><path d="M${PR[11]-40},212 Q${PR[11]},200 ${PR[11]+40},214 M${PR[11]},${Y.gc+12} L${PR[11]},205" fill="none" stroke="#2b8c80" stroke-width="2.2"/><path d="M${PR[11]-10},${Y.gc-12} Q${PR[11]-40},120 ${PR[11]-90},120 L360,120" fill="none" stroke="#2b8c80" stroke-width="2"/><circle cx="${PR[11]}" cy="${Y.gc}" r="14" fill="url(#gGbg)" stroke="#2b8c80" stroke-width="1.8"/><text x="${PR[11]}" y="${Y.gc+4}" text-anchor="middle" style="font-size:9px;font-weight:800;fill:#fff">mel</text></g>`,{lx:PR[11]+34,ly:Y.gc});
 s+=`<text x="44" y="112" class="rl" style="font-size:10.5px">← til synsnerven</text>`;
 // signalpanel til høyre
 s+=`<g id="nTr"><rect x="590" y="200" width="198" height="388" rx="12" fill="#fff" stroke="#e3dccd"/><text x="602" y="220" class="pt" style="font-size:13px">Signaler over tid</text>`;
 [['Tapp','#d08a2e'],['ON-bipolar','#3f6fb5'],['OFF-bipolar','#7a4fa6'],['ON-ganglion','#3f6fb5'],['OFF-ganglion','#7a4fa6']].forEach(([t,c],i)=>s+=`<text x="602" y="${246+i*68}" style="font-size:11px;font-weight:700;fill:${c}">${t}</text><line x1="602" y1="${290+i*68}" x2="778" y2="${290+i*68}" stroke="#efe9dd"/>`);
 s+=`<path id="nLb" d="" fill="#ffe9a8" opacity=".55"/><g id="nTrc"></g></g>`;
 return s};
LIVE.netthinne={pos:'tr',ctrl:`<div style="width:236px"><div class="cx-title">Hva skjer når lyset kommer?</div><div class="cx-row"><button class="cbtn" id="nFl">💡 Lysblink</button><button class="cbtn" id="nOn">Lys på</button></div><div class="cx-note" id="nNt"></div></div>`,
init(){const {PR,CONES,Y}=OY.N,nt=cq('#nNt'),R=rng(5);let L=0,Lp=0,on=false,flash=-1,idle=0,acc=0,fOn=0,fOff=0;const H=[],N=180;   // historikk
 const ph=[],sp=[];
 const msg=()=>nt.innerHTML=Lp>.3?'<b>Lys:</b> tappene <b>hyperpolariseres</b> og slipper <b>mindre</b> glutamat. ON-bipolarene depolariseres, OFF-bipolarene hyperpolariseres – ON-ganglionene fyrer mer.':'<b>Mørke:</b> fotoreseptorene er depolarisert og slipper hele tiden ut glutamat. Det er i mørket de er mest aktive!';
 cq('#nFl').onclick=()=>{flash=0};cq('#nOn').onclick=e=>{on=!on;e.target.classList.toggle('on',on);e.target.textContent=on?'Lys av':'Lys på'};
 const tint=(id,v,c)=>{const e=q(id);if(e)e.style.filter=v>.05?`drop-shadow(0 0 ${f1(2+v*6)}px ${c})`:''};
 return loop(dt=>{idle+=dt;if(ANIM&&!on&&flash<0&&idle>5){flash=0}
  let tgt=on?1:0;if(flash>=0){flash+=dt;tgt=1;if(flash>.9){flash=-1;idle=0}}
  L+=(tgt-L)*Math.min(1,dt*12);Lp+=(L-Lp)*Math.min(1,dt*5);
  // fotoner faller ned gjennom lagene
  if(L>.2&&R()<dt*40*L)ph.push({x:50+R()*500,y:100,v:900});
  let h='';for(let k=ph.length-1;k>=0;k--){const p=ph[k];p.y+=p.v*dt;if(p.y>Y.os[0]+16){ph.splice(k,1);continue}h+=`<circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="3" fill="#ffd54a"/><line x1="${f1(p.x)}" y1="${f1(p.y-14)}" x2="${f1(p.x)}" y2="${f1(p.y)}" stroke="#ffd54a" stroke-width="2" opacity=".6"/>`}
  q('#nPh').innerHTML=h;
  // potensialer (grovt): fotoreseptor −40 → −65 mV, ON depol., OFF hyperpol.
  const vPR=Lp,vOn=Lp,vOff=Lp;
  PR.forEach((x,k)=>tint('#nPR'+k,vPR,'#4a7bd0'));tint('#nBon',vOn,'#f2a516');tint('#nBoff',vOff*.8,'#4a7bd0');tint('#nBrod',vOn*.6,'#f2a516');
  // spikes
  const rOn=3+18*Math.max(0,L-.1)+30*Math.max(0,L-Lp),rOff=9*(1-Lp)+30*Math.max(0,Lp-L);
  const sOn=R()<rOn*dt,sOff=R()<rOff*dt;
  if(sOn)sp.push({id:'nGon',x:PR[3]-10,t:0});if(sOff)sp.push({id:'nGoff',x:PR[7]-10,t:0});
  let g='';for(let k=sp.length-1;k>=0;k--){const s_=sp[k];s_.t+=dt;const u=s_.t/.6;if(u>1){sp.splice(k,1);continue}const x=s_.x-(s_.x-40)*u,y=u<.15?Y.gc-12-u/.15*20:116;g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" fill="${s_.id==='nGon'?'#3f6fb5':'#7a4fa6'}" opacity="${f1(1-u*.6)}"/>`}
  q('#nPh').innerHTML+=g;
  q('#nGon .gb').setAttribute('fill',sOn?'#ffd54a':'url(#gGang)');q('#nGoff .gb').setAttribute('fill',sOff?'#ffd54a':'url(#gGang)');
  fOn|=sOn;fOff|=sOff;acc+=dt;if(acc>=1/30){acc=0;H.push([L,-Lp,Lp,-Lp,fOn?1:0,fOff?1:0]);fOn=fOff=0;if(H.length>N)H.shift()}
  // spor
  const X=i=>602+i*176/N;let tr='';const base=i=>290+i*68;
  const line=(j,amp,col,row)=>{let d='';H.forEach((v,i)=>d+=(i?'L':'M')+f1(X(i))+','+f1(base(row)-14+v[j]*amp));return `<path d="${d}" fill="none" stroke="${col}" stroke-width="2"/>`};
  tr+=line(1,-22,'#d08a2e',0)+line(2,-22,'#3f6fb5',1)+line(3,-22,'#7a4fa6',2);
  [[4,3,'#3f6fb5'],[5,4,'#7a4fa6']].forEach(([j,row,c])=>H.forEach((v,i)=>{if(v[j])tr+=`<line x1="${f1(X(i))}" x2="${f1(X(i))}" y1="${base(row)}" y2="${base(row)-28}" stroke="${c}" stroke-width="1.6"/>`}));
  q('#nTrc').innerHTML=tr;
  let lb='';let st=-1;H.forEach((v,i)=>{if(v[0]>.5&&st<0)st=i;if((v[0]<=.5||i===H.length-1)&&st>=0){lb+=`M${f1(X(st))},226 H${f1(X(i))} V584 H${f1(X(st))}Z`;st=-1}});q('#nLb').setAttribute('d',lb);
  msg()})}};

/* ---------------- STAVEN ---------------- */
OY.ROD={x:300,os:[126,300],nd:28};
S.stav=()=>{const {x,os}=OY.ROD;
 let s=`<rect width="800" height="600" fill="#f4f1f8"/>${title('Staven','Fotoreseptor for svakt lys – kan registrere ett eneste foton')}`;
 // pigmentepitel øverst
 s+=P('pigmentepitel',`<rect x="150" y="76" width="300" height="44" rx="6" fill="url(#gRPE)"/>${[0,1,2,3,4,5].map(k=>`<ellipse cx="${175+k*50}" cy="97" rx="8" ry="5" fill="#2a170c" opacity=".55"/>`).join('')}${Array.from({length:9},(_,k)=>`<path d="M${x-26+k*6.5},120 L${x-26+k*6.5},${134+(k%3)*4}" stroke="#80583b" stroke-width="2.2" stroke-linecap="round"/>`).join('')}<g id="rPhag"></g>`,{lx:390,ly:98});
 // ytre segment med disker
 s+=P('fototransduksjon',`<rect x="${x-30}" y="${os[0]}" width="60" height="${os[1]-os[0]}" rx="12" fill="url(#gRodOS)" stroke="#6f58a8" stroke-width="2.4"/><g id="rDisc"></g>`,{lx:x-80,ly:200});
 s+=P('cilium',`<rect x="${x-6}" y="${os[1]}" width="12" height="22" fill="#e9dcf5" stroke="#6f58a8" stroke-width="1.6"/><line x1="${x}" y1="${os[1]-60}" x2="${x}" y2="${os[1]+22}" stroke="#8f74c9" stroke-width="1.5" stroke-dasharray="3 3"/>`,{lx:x+46,ly:os[1]+12});
 // indre segment
 let mi='';const R=rng(9);for(let k=0;k<9;k++)mi+=`<ellipse cx="${f1(x-18+(k%3)*18+(R()-.5)*4)}" cy="${f1(338+Math.floor(k/3)*13)}" rx="8.5" ry="5" fill="#f2a46e" stroke="#b9622c" stroke-width="1"/>`;
 s+=P('indresegment',`<path d="M${x-30},322 L${x+30},322 L${x+28},405 Q${x},418 ${x-28},405Z" fill="url(#gIS)" stroke="#b07a52" stroke-width="2.2"/><path d="M${x-14},385 q8,-6 16,0 t16,0" fill="none" stroke="#c6567a" stroke-width="2"/><path d="M${x-14},394 q8,-6 16,0 t16,0" fill="none" stroke="#c6567a" stroke-width="2"/>`,{lx:x+70,ly:392});
 s+=P('mitokondrie',mi,{lx:x+64,ly:344});
 s+=P('kjerne',`<path d="M${x-14},410 L${x+14},410 L${x+20},440 L${x-20},440Z" fill="url(#gIS)" stroke="#b07a52" stroke-width="1.6"/><ellipse cx="${x}" cy="456" rx="22" ry="26" fill="url(#gNuc)" stroke="#6a4c98" stroke-width="2"/>`,{lx:x+56,ly:458});
 s+=`<rect x="${x-4}" y="480" width="8" height="40" fill="url(#gIS)" stroke="#b07a52" stroke-width="1.4"/>`;
 // synapse (sfærule) med bånd
 s+=P('stavsynapse',`<path d="M${x-26},520 Q${x-30},556 ${x-14},566 L${x+14},566 Q${x+30},556 ${x+26},520Z" fill="url(#gIS)" stroke="#b07a52" stroke-width="2"/><rect x="${x-2.5}" y="532" width="5" height="22" rx="2" fill="#4a3a2a"/>${[[-8,536],[8,538],[-8,548],[8,550],[0,528],[-14,544],[14,544]].map(([a,b])=>`<circle cx="${x+a}" cy="${b}" r="3" fill="#fbe6a8" stroke="#c79a1e" stroke-width=".8"/>`).join('')}<path d="M${x-22},600 Q${x-16},570 ${x-8},560 M${x+22},600 Q${x+16},570 ${x+8},560" fill="none" stroke="#6fae82" stroke-width="5"/><path d="M${x},600 L${x},566" stroke="#3f6fb5" stroke-width="6"/><g id="rGlu"></g>`,{lx:x+60,ly:548});
 // strømsløyfe og målere
 s+=P('morkestrom',`<g id="rLoop"><path d="M${x+48},300 C${x+90},300 ${x+90},180 ${x+48},150" fill="none" stroke="#e07a2c" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#arD)" opacity=".7"/><path d="M${x-48},150 C${x-90},180 ${x-90},300 ${x-48},300" fill="none" stroke="#e07a2c" stroke-width="2" stroke-dasharray="5 5" opacity=".0"/><path d="M${x+40},370 C${x+80},370 ${x+90},320 ${x+60},310" fill="none" stroke="#3e7cc4" stroke-width="2" stroke-dasharray="5 5" opacity=".7"/><text x="${x+96}" y="232" style="font-size:12px;font-weight:700;fill:#e07a2c">Na⁺ og Ca²⁺ inn</text><text x="${x+96}" y="374" style="font-size:12px;font-weight:700;fill:#3e7cc4">K⁺ ut</text></g>`,{lx:x+128,ly:212});
 s+=`<g transform="translate(560,140)"><rect x="0" y="0" width="200" height="190" rx="12" fill="#fff" stroke="#e3dccd" filter="url(#sh)"/><text x="14" y="24" class="pt" style="font-size:13px">Membranpotensial</text><rect x="30" y="40" width="22" height="130" rx="6" fill="#f3eef9" stroke="#c9bfe0"/><rect id="rVm" x="30" y="40" width="22" height="50" rx="6" fill="#8f74c9"/>${[[-30,'−30'],[-50,'−50'],[-70,'−70']].map(([v,t])=>`<text x="58" y="${f1(40+(-30-v)/40*130+4)}" class="rl" style="font-size:10.5px">${t}</text>`).join('')}<text id="rVt" x="96" y="80" style="font-family:Fraunces,serif;font-size:24px;font-weight:650;fill:#3d2a70"></text><text x="96" y="100" class="rl" style="font-size:11px">mV</text><text x="96" y="130" class="rl" style="font-size:11px">glutamat ut:</text><rect x="96" y="138" width="90" height="10" rx="5" fill="#f1ece0"/><rect id="rGb" x="96" y="138" width="90" height="10" rx="5" fill="#e9b23a"/></g>`;
 s+=badge(660,110,'Fototransduksjon ›','fototransduksjon',160);
 s+=`<g id="rIonOv" style="pointer-events:none"></g>`;
 return s};
LIVE.stav={pos:'br',ctrl:`<div style="width:236px"><div class="cx-title">Mørke og lys</div><div class="cx-row"><button class="cbtn on" id="rDk">Mørke</button><button class="cbtn" id="rLt">Lys</button></div><label class="cx-tog" style="margin-top:6px"><input type="checkbox" id="rRen"> Diskfornyelse (tidsforløp)</label><div class="cx-note" id="rN"></div></div>`,
init(){const {x,os,nd}=OY.ROD,nt=cq('#rN'),R=rng(12);let light=0,lt=0,V=-40,off=0,ren=false,phag=[];const ions=[],glu=[];
 const set=v=>{light=v;cq('#rDk').classList.toggle('on',!v);cq('#rLt').classList.toggle('on',!!v);
  nt.innerHTML=v?'<b>Lys:</b> cGMP brytes ned, CNG-kanalene lukkes og Na⁺/Ca²⁺ slutter å strømme inn. K⁺ lekker fortsatt ut, så cellen blir mer negativ (<b>hyperpolariseres</b>) og slipper mindre glutamat.':'<b>Mørke:</b> cGMP holder kanalene i ytre segment åpne. Na⁺ og Ca²⁺ strømmer inn (<b>mørkestrømmen</b>), så staven er depolarisert (ca. −40 mV) og slipper ut glutamat hele tiden.'};
 cq('#rDk').onclick=()=>set(0);cq('#rLt').onclick=()=>set(1);cq('#rRen').onchange=e=>{ren=e.target.checked};set(0);
 onSel=id=>{if(id==='diskfornyelse'){ren=true;cq('#rRen').checked=true}if(id==='morkestrom')set(0)};
 const SP=(os[1]-os[0]-12)/nd;
 return loop(dt=>{lt+=(light-lt)*Math.min(1,dt*(ANIM?4:99));const tV=-40-27*lt;V+=(tV-V)*Math.min(1,dt*(ANIM?6:99));
  // disker (beveger seg oppover når diskfornyelse er på)
  if(ren&&ANIM){off+=dt*SP*.8;if(off>=SP){off-=SP;phag.push({y:os[0],t:0})}}
  let d='';for(let k=0;k<nd;k++){const y=os[0]+8+k*SP-off;if(y<os[0]+4)continue;const fresh=k>=nd-2&&ren;d+=`<rect x="${x-25}" y="${f1(y)}" width="50" height="${f1(SP*.55)}" rx="${f1(SP*.27)}" fill="${fresh?'#f4effc':'#d9ccf3'}" stroke="#8f74c9" stroke-width="1" opacity="${f1(y<os[0]+10?(y-os[0]-4)/6:1)}"/>`}
  q('#rDisc').innerHTML=d;
  let ph='';for(let k=phag.length-1;k>=0;k--){const p=phag[k];p.t+=dt;const u=p.t/3;if(u>1){phag.splice(k,1);continue}ph+=`<ellipse cx="${f1(x+(u*60-10))}" cy="${f1(112-u*16)}" rx="${f1(10-u*4)}" ry="${f1(6-u*2)}" fill="#c9b6ef" stroke="#6f58a8" opacity="${f1(1-u)}"/>`}
  q('#rPhag').innerHTML=ph;
  // ioner
  const inR=(1-lt)*14;
  if(ANIM&&R()<dt*inR){const side=R()<.5?-1:1;ions.push({k:R()<.2?'Ca':'Na',x:x+side*48,y:os[0]+20+R()*(os[1]-os[0]-40),vx:-side*60,t:0})}
  if(ANIM&&R()<dt*9)ions.push({k:'K',x:x+(R()<.5?-24:24),y:330+R()*60,vx:0,t:0});
  let io='';for(let k=ions.length-1;k>=0;k--){const p=ions[k];p.t+=dt;if(p.k==='K'){p.x+=(p.x>x?1:-1)*50*dt;if(p.t>1){ions.splice(k,1);continue}}else{p.x+=p.vx*dt;if(Math.abs(p.x-x)<22){p.vx*=.3}if(p.t>1.4){ions.splice(k,1);continue}}
   const c=p.k==='K'?'#3e7cc4':p.k==='Ca'?'#5aa83a':'#e07a2c';io+=`<g transform="translate(${f1(p.x)},${f1(p.y)})" opacity="${f1(1-p.t/1.6)}"><circle r="6" fill="${c}"/><text y="3" text-anchor="middle" style="font-size:6.5px;font-weight:800;fill:#fff">${p.k==='Ca'?'Ca':p.k}</text></g>`}
  q('#rLoop').style.opacity=f1(.25+.75*(1-lt));q('#rIonOv').innerHTML=io;
  // glutamat
  const rel=cl((V+70)/30);if(ANIM&&R()<dt*12*rel)glu.push({x:x+(R()-.5)*16,y:560,t:0});
  let gl='';for(let k=glu.length-1;k>=0;k--){const p=glu[k];p.t+=dt;p.y+=40*dt;if(p.t>.8){glu.splice(k,1);continue}gl+=`<circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="2.6" fill="#e9b23a" opacity="${f1(1-p.t/.8)}"/>`}
  q('#rGlu').innerHTML=gl;
  q('#rVm').setAttribute('y',f1(40+(-30-V)/40*130-6));q('#rVm').setAttribute('height','12');q('#rVt').textContent=Math.round(V).toString().replace('-','−');q('#rGb').setAttribute('width',f1(6+84*rel))})}};

/* ---------------- TAPPEN ---------------- */
OY.CH={x0:390,x1:780,y0:300,y1:110,X:w=>390+(w-380)/320*390,Y:v=>300-v*190};
S.tapp=()=>{const x=190;const {X,Y}=OY.CH;
 let s=`<rect width="800" height="600" fill="#f8f4ec"/>${title('Tappen','Fotoreseptor for dagslys, skarpsyn og fargesyn')}`;
 s+=`<g transform="translate(53.2,25.2) scale(.72)">`;
 s+=P('tappfolder',`<path d="M${x-6},96 L${x+6},96 L${x+24},206 L${x-24},206Z" fill="url(#gConeOS)" stroke="#b9772a" stroke-width="2.2"/>${Array.from({length:16},(_,k)=>{const y=102+k*6.5,w=6+(y-96)/110*18;return `<path d="M${f1(x-w+1)},${f1(y)} L${f1(x+w-2)},${f1(y)}" stroke="#c98a3c" stroke-width="1.2"/>`}).join('')}<path d="M${x+5},100 L${x+23},204" stroke="#b9772a" stroke-width="3"/>`,{lx:x-70,ly:140});
 s+=P('cilium',`<rect x="${x-5}" y="206" width="10" height="14" fill="#fbe7c9" stroke="#b9772a" stroke-width="1.4"/>`,{nl:1});
 let mi='';const R=rng(21);for(let k=0;k<12;k++)mi+=`<ellipse cx="${f1(x-22+(k%4)*15)}" cy="${f1(236+Math.floor(k/4)*12+(R()-.5)*3)}" rx="7.5" ry="4.5" fill="#f2a46e" stroke="#b9622c" stroke-width="1"/>`;
 s+=P('indresegment',`<path d="M${x-30},220 L${x+30},220 Q${x+38},262 ${x+26},290 L${x-26},290 Q${x-38},262 ${x-30},220Z" fill="url(#gIS)" stroke="#b07a52" stroke-width="2.2"/>${mi}`,{lx:x+64,ly:252});
 s+=P('kjerne',`<ellipse cx="${x}" cy="310" rx="20" ry="20" fill="url(#gNuc)" stroke="#6a4c98" stroke-width="2"/>`,{lx:x+48,ly:316});
 s+=`<rect x="${x-4}" y="328" width="8" height="38" fill="url(#gIS)" stroke="#b07a52" stroke-width="1.4"/>`;
 s+=P('tappfot',`<path d="M${x-48},366 L${x+48},366 Q${x+54},402 ${x+40},412 L${x-40},412 Q${x-54},402 ${x-48},366Z" fill="url(#gIS)" stroke="#b07a52" stroke-width="2"/>${[-26,0,26].map(d=>`<rect x="${x+d-2}" y="378" width="4" height="18" rx="2" fill="#4a3a2a"/><path d="M${x+d-10},420 Q${x+d-6},404 ${x+d-3},398 M${x+d+10},420 Q${x+d+6},404 ${x+d+3},398" fill="none" stroke="#6fae82" stroke-width="3.5"/><path d="M${x+d},424 L${x+d},400" stroke="#3f6fb5" stroke-width="4"/>`).join('')}${[-40,-13,13,40].map(d=>`<rect x="${x+d-4}" y="412" width="8" height="10" rx="2" fill="#7a4fa6"/>`).join('')}`,{lx:x+90,ly:394});
 s+=`</g>`;
 // følsomhetskurver
 let ch=`<rect x="${X(380)-10}" y="${Y(1)-24}" width="${X(700)-X(380)+20}" height="${Y(0)-Y(1)+58}" rx="12" fill="#fff" stroke="#e3dccd"/>`;
 for(let w=380;w<700;w+=4)ch+=`<rect x="${f1(X(w))}" y="${Y(0)+4}" width="${f1(X(w+4)-X(w)+.5)}" height="8" fill="${OY.spec(w)}"/>`;
 [400,450,500,550,600,650,700].forEach(w=>ch+=`<text x="${f1(X(w))}" y="${Y(0)+26}" text-anchor="middle" class="rl" style="font-size:10.5px">${w}</text>`);
 ch+=`<text x="${X(540)}" y="${Y(0)+40}" text-anchor="middle" class="rl" style="font-size:11px">bølgelengde (nm)</text><text x="${X(700)}" y="${Y(1)-10}" text-anchor="end" class="rl" style="font-size:11px">relativ følsomhet</text>`;
 const cv=f=>{let d='';for(let w=380;w<=700;w+=3)d+=(w>380?'L':'M')+f1(X(w))+','+f1(Y(f(w)));return d};
 ch+=`<path d="${cv(OY.R)}" fill="none" stroke="#6b7280" stroke-width="2" stroke-dasharray="5 4"/><text x="${f1(X(498))}" y="${f1(Y(1)-4)}" text-anchor="middle" style="font-size:10.5px;font-weight:700;fill:#6b7280">stav 498</text>`;
 s+=P('fargesyn',ch,{nl:1});
 s+=P('tapptyper',`<g id="tCv"></g>`,{nl:1});
 s+=`<line id="tWl" y1="${Y(1)-4}" y2="${Y(0)}" stroke="#1f2430" stroke-width="1.5"/>`;
 // tre tapper som lyser opp + fargeprøve
 s+=`<g transform="translate(400,388)"><text x="0" y="0" class="pt" style="font-size:13px">Hvor mye hver tapptype reagerer</text>${['S','M','L','stav'].map((t,i)=>`<g transform="translate(${i*62},14)"><rect x="0" y="0" width="50" height="86" rx="10" fill="#f6f2ea" stroke="#e3dccd"/><rect id="tB${i}" x="8" y="76" width="34" height="0" rx="5" fill="${['#6a4bd1','#3fb04a','#e0402e','#6b7280'][i]}"/><text x="25" y="104" text-anchor="middle" style="font-size:12px;font-weight:800;fill:${['#6a4bd1','#2f8a3a','#c0453b','#6b7280'][i]}">${t}</text></g>`).join('')}<g transform="translate(270,14)"><rect id="tSw" width="96" height="86" rx="12" stroke="#c9c0ad" stroke-width="2"/><text x="48" y="104" text-anchor="middle" class="rl" style="font-size:11px">det du ser</text></g></g>`;
 s+=P('fargeblindhet',`<text x="400" y="560" class="rl" style="font-size:12px">L : M : S ≈ 10 : 5 : 1 i netthinnen – S-tappene er få og mangler helt midt i fovea.</text>`,{nl:1});
 return s};
OY.spec=w=>w<440?'#7b4fd6':w<470?'#3b5fe0':w<495?'#1f9fd8':w<520?'#22b07a':w<555?'#5cc23a':w<575?'#c8d22a':w<590?'#f2c21e':w<620?'#f08a1c':'#e0402e';
LIVE.tapp={pos:'bl',ctrl:`<div style="width:262px"><div class="cx-title">Hvilken farge?</div><label class="cx-sl wide">Bølgelengde <b id="tWv"></b><input type="range" id="tW" min="390" max="690" value="530"></label><div class="cx-row" style="margin-top:6px">${[['n','Normalt'],['p','Uten L'],['d','Uten M'],['t','Uten S'],['r','Bare staver']].map(([k,t],i)=>`<button class="cbtn${i?'':' on'}" data-v="${k}">${t}</button>`).join('')}</div><div class="cx-note" id="tN"></div></div>`,
init(){const {X,Y}=OY.CH,nt=cq('#tN');let w=530,v='n';
 const cv=(f,c,lab,m,dash)=>{let d='';for(let x=380;x<=700;x+=3)d+=(x>380?'L':'M')+f1(X(x))+','+f1(Y(f(x)));return `<path d="${d}" fill="none" stroke="${c}" stroke-width="3" ${dash?'stroke-dasharray="3 5" opacity=".35"':''}/><text x="${f1(X(m))}" y="${f1(Y(1)-6)}" text-anchor="middle" style="font-size:11px;font-weight:800;fill:${c}" ${dash?'opacity=".4"':''}>${lab}</text>`};
 function draw(){const miss={p:'L',d:'M',t:'S'}[v];
  q('#tCv').innerHTML=v==='r'?'':cv(OY.S,'#6a4bd1','S 420',420,miss==='S')+cv(OY.M,'#2f8a3a','M 530',530,miss==='M')+cv(OY.L,'#c0453b','L 560',575,miss==='L');
  q('#tWl').setAttribute('x1',f1(X(w)));q('#tWl').setAttribute('x2',f1(X(w)));
  const r={S:OY.S(w),M:OY.M(w),L:OY.L(w),R:OY.R(w)};if(miss)r[miss]=0;if(v==='r'){r.S=r.M=r.L=0}
  [r.S,r.M,r.L,v==='r'?r.R:r.R*.15].forEach((a,i)=>{const h=66*a;const e=q('#tB'+i);e.setAttribute('y',f1(76-h));e.setAttribute('height',f1(h))});
  let col;const tot=r.S+r.M+r.L;
  if(v==='r'){const g=Math.round(60+180*r.R);col=`rgb(${g},${g},${g})`}
  else if(v==='n')col=OY.spec(w);
  else if(v==='t'){const k=r.L/(r.L+r.M+1e-6);col=OY.mix('#26b5b0','#e0403a',cl((k-.42)*3.5+.5));}
  else{const k=r.S/(tot+1e-6);col=OY.mix('#e7c21e','#2f6fe0',cl(k*3.2))}
  if(v!=='n'&&v!=='r'){const b=cl(tot/1.1+.15);col=OY.mix('#1f2430',col,b)}
  q('#tSw').setAttribute('fill',col);
  cq('#tWv').innerHTML=`<span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:${OY.spec(w)};vertical-align:-1px"></span> ${w} nm`;
  const pc=a=>Math.round(a*100);
  nt.innerHTML=(v==='n'?`S ${pc(r.S)} %, M ${pc(r.M)} %, L ${pc(r.L)} %. Hjernen tolker <b>forholdet</b> mellom de tre – ikke hver tapp alene. Én tapp kan ikke skille farge fra lysstyrke.`
   :v==='r'?'<b>Skumringssyn:</b> bare stavene virker. Én type fotoreseptor gir ingen farger – bare lyst og mørkt. Stavene er mest følsomme for blågrønt (498 nm), derfor ser røde blomster mørke ut i skumringen.'
   :v==='p'?'<b>Protanopi</b> (mangler L): rødt ser mørkt ut, og rødt og grønt forveksles. Rammer ca. 1 % av menn.'
   :v==='d'?'<b>Deuteranopi</b> (mangler M): rødt og grønt forveksles. Rød-grønn fargesvikt (alle typer) rammer ca. 8 % av menn – genene for L og M ligger på X-kromosomet.'
   :'<b>Tritanopi</b> (mangler S): blått og grønt forveksles. Svært sjelden, og genet ligger ikke på X-kromosomet.')}
 const sl=cq('#tW');sl.oninput=e=>{w=+e.target.value;draw()};
 ctrl.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{v=b.dataset.v;ctrl.querySelectorAll('[data-v]').forEach(x=>x.classList.toggle('on',x===b));draw()});
 onSel=id=>{if(id==='fargeblindhet'){v='d';ctrl.querySelectorAll('[data-v]').forEach(x=>x.classList.toggle('on',x.dataset.v==='d'));w=560;sl.value=560;draw()}if(id==='olo'){v='n';w=530;sl.value=530;draw()}};
 draw()}};
