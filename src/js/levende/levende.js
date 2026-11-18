/* ---------- live / interactive scenes ---------- */
const RB={XA:464,XP:384,CODONS:['AUG','GCU','UAC','UUC','CCA','AAG','UGG','GGA','CAU','GAA','UCU','UAA'],
 AA:{AUG:['Met','metionin','#5a6f9a'],GCU:['Ala','alanin','#e05a4f'],UAC:['Tyr','tyrosin','#e9a923'],UUC:['Phe','fenylalanin','#4caf6a'],CCA:['Pro','prolin','#3bb3a8'],AAG:['Lys','lysin','#3e7cc4'],UGG:['Trp','tryptofan','#9a7bcb'],GGA:['Gly','glysin','#e88a3c'],CAU:['His','histidin','#d16a9a'],GAA:['Glu','glutaminsyre','#7a8b3a'],UCU:['Ser','serin','#c0614a']},
 OFF:[[0,0],[-14,-24],[-30,-46],[-40,-72],[-50,-98],[-64,-122],[-84,-142],[-108,-154],[-134,-158],[-160,-154],[-186,-146],[-210,-134],[-232,-118],[-250,-98]]};
const anti=c=>c.split('').map(b=>({A:'U',U:'A',G:'C',C:'G'})[b]).join('');
const trnaSVG=(ac,aa)=>`<path d="M-26,250 h52 v90 l-8,12 h-36 l-8,-12 z" fill="#f2c38b" stroke="#b9772f" stroke-width="2.5"/><circle cx="-30" cy="292" r="14" fill="#f2c38b" stroke="#b9772f" stroke-width="2.5"/><circle cx="30" cy="292" r="14" fill="#f2c38b" stroke="#b9772f" stroke-width="2.5"/>${ac.split('').map((b,k)=>letterBox(-24+k*24,370,b)).join('')}${aa?`<line x1="0" y1="250" x2="0" y2="244" stroke="#4b5563" stroke-width="4"/><circle cx="0" cy="236" r="12" fill="${aa}" stroke="#333" stroke-width="1.2"/>`:''}`;
const rfSVG=()=>`<rect x="-30" y="248" width="60" height="108" rx="16" fill="#d5d9e2" stroke="#6b7280" stroke-width="2.5"/><text x="0" y="300" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#374151">STOPP</text><text x="0" y="316" text-anchor="middle" style="font-size:9.5px;font-weight:600;fill:#4b5563">frigjørings-</text><text x="0" y="328" text-anchor="middle" style="font-size:9.5px;font-weight:600;fill:#4b5563">faktor</text>`;
const ENZ={nb:"M250,420 C232,330 318,290 400,300 C470,306 520,330 530,368 L488,398 L530,432 C520,482 450,522 380,517 C300,512 266,472 250,420Z",
 db:"M236,432 C214,350 322,318 404,326 C478,334 548,316 556,362 L552,398 L560,438 C552,494 470,506 384,526 C290,534 256,486 236,432Z",
 ns:"M290,430 C300,380 340,340 380,360 C420,380 380,420 420,440 C460,460 470,410 450,380 M320,470 C350,490 400,480 420,470 M300,360 C320,330 360,320 400,330",
 ds:"M262,448 C320,430 360,400 420,410 C470,418 480,452 530,446 C548,440 548,410 540,390 M292,496 C350,488 420,506 480,488 M272,358 C330,356 380,348 470,356",
 nn:"M530,368 L488,398 L530,432", dn:"M556,362 L552,398 L560,438"};
const morph=(a,b,t)=>{const nb=b.match(/-?\d+(\.\d+)?/g);let i=0;return a.replace(/-?\d+(\.\d+)?/g,m=>f1(+m+(+nb[i++]-+m)*t))};
const cl=x=>Math.max(0,Math.min(1,x)), ez=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
let ANIM=!matchMedia('(prefers-reduced-motion: reduce)').matches, blocked=false;
function syncSMIL(){try{(ANIM&&!blocked)?svg.unpauseAnimations():svg.pauseAnimations()}catch(e){}}
function loop(fn){let id,last=performance.now();const f=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;fn(dt);id=requestAnimationFrame(f)};id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id)}
const q=s=>svg.querySelector(s), cq=s=>ctrl.querySelector(s);

const LIVE={};
LIVE.ribosom={pos:'bl',ctrl:`<div style="width:300px;max-width:100%"><div class="cx-title">Translasjon – se proteinet bli bygd</div><div class="cx-row"><button class="cbtn" id="rPlay">Pause</button><button class="cbtn" id="rStep">Neste kodon ›</button><label class="cx-sl">Fart<input type="range" id="rSpd" min="0.3" max="2.2" step="0.1" value="1"></label></div><div class="cx-read" id="rRead"></div></div>`,
init(){
 const {XA,XP,CODONS,AA,OFF}=RB, mr=q('#mr'),tE=q('#tE'),tP=q('#tP'),tA=q('#tA'),ch=q('#ch'),rd=cq('#rRead');
 const TE=.95,TT=.6,TL=.95,TW=.5,TOT=TE+TT+TL+TW, NS='http://www.w3.org/2000/svg';
 let k=1,t=0,chain=['AUG'],playing=true,stepping=false,spd=1,done=false,fadeIn=false,beads=[],line;
 const isStop=()=>!AA[CODONS[k]];
 function buildChain(){ch.innerHTML='';ch.style.opacity=1;line=document.createElementNS(NS,'polyline');line.setAttribute('fill','none');line.setAttribute('stroke','#4b5563');line.setAttribute('stroke-width','4');line.setAttribute('stroke-linejoin','round');ch.appendChild(line);beads=chain.map(c=>{const e=document.createElementNS(NS,'circle');e.setAttribute('r','12');e.setAttribute('fill',AA[c][2]);e.setAttribute('stroke','#333');e.setAttribute('stroke-width','1.2');ch.appendChild(e);return e})}
 function place(fn){line.setAttribute('points',beads.map((b,i)=>{const [x,y]=fn(i);b.setAttribute('cx',f1(x));b.setAttribute('cy',f1(y));return f1(x)+','+f1(y)}).join(' '))}
 function readout(){const c=CODONS[k],a=AA[c];rd.innerHTML=`<div>A-setet leser <b class="cod">${c}</b> · tRNA-antikodon <b class="cod">${a?anti(c):'–'}</b> → ${a?`<b>${a[0]}</b> (${a[1]})`:'<b>stoppkodon</b>: proteinet slippes fri'}</div><div class="chainread">${[...chain].reverse().map(c=>`<span style="background:${AA[c][2]}">${AA[c][0]}</span>`).join('')}</div>`}
 function setup(){done=false;tP.innerHTML=trnaSVG(anti(CODONS[k-1]));tE.innerHTML=k>=2?trnaSVG(anti(CODONS[k-2])):'';tA.innerHTML=isStop()?rfSVG():trnaSVG(anti(CODONS[k]),AA[CODONS[k]][2]);buildChain();readout()}
 function frame(){
  const st=isStop(),u=ez(cl(t/TE)),v=ez(cl((t-TE)/TT)),w=ez(cl((t-TE-TT)/TL)),shift=st?0:80*w;
  const g=st?1-ez(cl((t-TE-TT*.5)/(TT+TL))):(fadeIn?cl(t/.5):1);
  mr.setAttribute('transform',`translate(${f1(XA-(64+80*k)-shift)},0)`);mr.style.opacity=g;
  tE.setAttribute('transform',`translate(${f1(XP-80-50*u)},${f1(-110*u)})`);tE.style.opacity=(1-u)*(fadeIn?0:1);
  tP.setAttribute('transform',`translate(${f1(XP-shift)},0)`);tP.style.opacity=g;
  tA.setAttribute('transform',`translate(${f1(XA-shift+150*(1-u))},${f1(-130*(1-u))})`);tA.style.opacity=u*g;
  if(!st){
   if(v>=1&&!done){done=true;chain=[CODONS[k],...chain];tA.innerHTML=trnaSVG(anti(CODONS[k]));buildChain();readout()}
   if(!done)place(i=>{const a=[XP+OFF[i][0],236+OFF[i][1]],b=[XA+OFF[i+1][0],236+OFF[i+1][1]];return[a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v]});
   else place(i=>[XA+OFF[i][0]-shift,236+OFF[i][1]]);
  }else{const r=ez(cl((t-TE)/(TT+TL)));place(i=>[XP+OFF[i][0]-150*r,236+OFF[i][1]-80*r]);ch.style.opacity=1-r}
 }
 function advance(){if(isStop()){k=1;chain=['AUG'];fadeIn=true}else{k++;fadeIn=false}t=0;setup()}
 setup();if(!ANIM)t=TE;frame();let crossed=false;
 const pb=cq('#rPlay');const setPB=()=>{pb.textContent=playing?'Pause':'Spill av';pb.classList.toggle('on',!playing)};setPB();
 pb.onclick=()=>{playing=!playing;stepping=false;setPB()};
 cq('#rStep').onclick=()=>{playing=false;stepping=true;crossed=false;setPB()};
 cq('#rSpd').oninput=e=>spd=+e.target.value;
 return loop(dt=>{if(!((ANIM&&playing)||stepping))return;t+=dt*(stepping?1.4:spd);if(t>=TOT){advance();crossed=true}if(stepping&&crossed&&t>=TE){stepping=false;t=TE}frame()});
}};

LIVE.protein={pos:'bl',ctrl:`<div style="width:226px"><div class="cx-title">Enzymet og temperaturen</div><label class="cx-sl wide">Temperatur <b id="pT">37 °C</b><input type="range" id="pTs" min="0" max="80" value="37"></label><svg id="pCh" viewBox="0 0 230 78" class="mini"></svg><div class="cx-read" id="pRd"></div><button class="cbtn" id="pReset" hidden>Lag et nytt enzym</button></div>`,
init(){
 const eb=q('#eb'),es=q('#es'),en=q('#en'),sA=q('#sA'),sB=q('#sB'),ch=cq('#pCh'),rd=cq('#pRd'),rs=cq('#pReset'),sl=cq('#pTs');
 const act=T=>T<=37?Math.exp(-(((T-37)/20)**2)):Math.exp(-(((T-37)/9)**2)), den=T=>cl((T-45)/15);
 let T=37,latched=false,ph='in',p=0,n=0,dCur=0;
 const X=T=>12+T*2.6,Yv=r=>62-r*50;
 let curve='';for(let t=0;t<=80;t+=1)curve+=(t?'L':'M')+f1(X(t))+','+f1(Yv(act(t)*(1-den(t))));
 ch.innerHTML=`<line x1="12" y1="62" x2="222" y2="62" stroke="#c9c0ad"/><path d="${curve}" fill="none" stroke="#7b6fd0" stroke-width="2.5"/><line x1="${X(37)}" y1="8" x2="${X(37)}" y2="62" stroke="#c9c0ad" stroke-dasharray="3 3"/><text x="12" y="75" class="mt">0 °C</text><text x="${X(37)}" y="75" text-anchor="middle" class="mt">37</text><text x="222" y="75" text-anchor="end" class="mt">80 °C</text><text x="${X(37)+4}" y="14" class="mt">optimum</text><circle id="pDot" r="5.5" fill="#e07a2c" stroke="#fff" stroke-width="2"/>`;
 const dot=ch.querySelector('#pDot');
 function eff(){const d=latched?1:den(T);return{d,r:act(T)*(1-d)}}
 function ui(){const {d,r}=eff();cq('#pT').textContent=T+' °C';dot.setAttribute('cx',f1(X(T)));dot.setAttribute('cy',f1(Yv(r)));
  let msg;if(latched)msg='<b>Enzymet er denaturert.</b> Formen er ødelagt, og substratet passer ikke lenger. Det blir ikke bra igjen når det avkjøles.';else if(d>0)msg='<b>For varmt:</b> bindingene som holder formen begynner å ryke. Det aktive setet endrer form.';else if(T<25)msg='<b>Kaldt:</b> molekylene beveger seg sakte, så substrat og enzym møtes sjeldnere. Enzymet er ikke ødelagt.';else if(Math.abs(T-37)<=5)msg='<b>Optimal temperatur</b> for dette enzymet (som i kroppen).';else msg='Aktiviteten er lavere enn ved optimum.';
  rd.innerHTML=`<div class="bar"><i style="width:${Math.round(r*100)}%"></i></div><div class="cx-note" style="margin-top:4px">Aktivitet ${Math.round(r*100)} % · ${n} reaksjoner</div><div class="cx-note">${msg}</div>`;rs.hidden=!latched}
 sl.oninput=e=>{T=+e.target.value;if(T>=60)latched=true;ui()};
 rs.onclick=()=>{latched=false;T=37;sl.value=37;ph='in';p=0;ui()};
 const tr=(el,x,y,o=1)=>{el.setAttribute('transform',`translate(${f1(x)},${f1(y)})`);el.style.opacity=o};
 function step(dt){
  const {d,r}=eff();dCur+=(d-dCur)*Math.min(1,dt*3);
  eb.setAttribute('d',morph(ENZ.nb,ENZ.db,dCur));es.setAttribute('d',morph(ENZ.ns,ENZ.ds,dCur));en.setAttribute('d',morph(ENZ.nn,ENZ.dn,dCur));
  const sp=.25+.75*r, fits=dCur<.5, wob=Math.sin(performance.now()/260)*6;
  if(ph==='in'){p+=dt*sp/1.3;const e=ez(cl(p)),tx=fits?530:610;const x=700+(tx-700)*e,y=400+wob*(1-e);tr(sA,x,y);tr(sB,x,y);sA.setAttribute('fill','#f2b630');sB.setAttribute('fill','#f2b630');if(p>=1){ph=fits?'bound':'bounce';p=0}}
  else if(ph==='bound'){p+=dt*(r+.04)/.8;const j=Math.sin(p*40)*1.2*(r>.05);tr(sA,530+j,400);tr(sB,530-j,400);if(p>=1){ph='split';p=0;n++;ui()}}
  else if(ph==='split'){p+=dt/1.2;const e=ez(cl(p));sA.setAttribute('fill','#f7c948');sB.setAttribute('fill','#e88a3c');tr(sA,530+190*e,400-110*e,1-cl((p-.6)/.4));tr(sB,530+190*e,400+110*e,1-cl((p-.6)/.4));if(p>=1){ph='in';p=0;tr(sA,700,400,0);tr(sB,700,400,0)}}
  else if(ph==='bounce'){p+=dt/1.1;const e=ez(cl(p));tr(sA,610+90*e,400-40*Math.sin(e*3.14));tr(sB,610+90*e,400-40*Math.sin(e*3.14));if(p>=1){ph='in';p=0}}
  if(ph==='in'&&p<.15){sA.style.opacity=sB.style.opacity=cl(p/.15)}
 }
 ui();step(0);if(!ANIM){ph='bound';p=.2;step(0)}
 return loop(dt=>{if(ANIM)step(dt)});
}};

LIVE.membran={pos:'tr',ctrl:`<div class="cx-row"><button class="cbtn on" data-f="alle">Alle</button><button class="cbtn" data-f="passiv">Passiv transport</button><button class="cbtn" data-f="aktiv">Aktiv transport</button></div><div class="cx-note" id="mNote">Klikk for å skille passiv og aktiv transport.</div>`,
init(){
 const G={alle:[],passiv:['kanalprotein','baererprotein'],aktiv:['pumpe']},note={alle:'Klikk for å skille passiv og aktiv transport.',passiv:'<b>Passiv:</b> stoffene går med konsentrasjonsgradienten (fra høy til lav). Krever ingen energi.',aktiv:'<b>Aktiv:</b> stoffene pumpes mot gradienten (fra lav til høy). Krever energi fra ATP.'};
 ctrl.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const f=b.dataset.f;ctrl.querySelectorAll('[data-f]').forEach(x=>x.classList.toggle('on',x===b));svg.querySelectorAll('.part').forEach(p=>p.classList.toggle('dim',f!=='alle'&&['kanalprotein','baererprotein','pumpe','glykoprotein'].includes(p.dataset.go)&&!G[f].includes(p.dataset.go)));cq('#mNote').innerHTML=note[f]});
}};

LIVE.indremembran={pos:'tr',ctrl:`<label class="cx-tog"><input type="checkbox" id="oOff"> Fjern oksygenet (O₂)</label><div class="cx-note" id="oNote">Se elektronene vandre og H⁺ pumpes – ATP-syntase snurrer.</div>`,
init(){cq('#oOff').onchange=e=>{blocked=e.target.checked;syncSMIL();q('#o2p').style.opacity=blocked?.25:1;cq('#oNote').innerHTML=blocked?'<b>Uten O₂</b> har elektronene ingen sluttmottaker. Kjeden stopper, H⁺ pumpes ikke, og ATP-produksjonen stanser.':'Se elektronene vandre og H⁺ pumpes – ATP-syntase snurrer.'}}};

LIVE.tylakoid={pos:'br',ctrl:`<label class="cx-tog"><input type="checkbox" id="lOff"> Slå av lyset</label><div class="cx-note" id="lNote">Lys eksiterer elektroner i fotosystemene.</div>`,
init(){cq('#lOff').onchange=e=>{blocked=e.target.checked;syncSMIL();q('#sun').style.opacity=blocked?.15:1;cq('#lNote').innerHTML=blocked?'<b>Mørke:</b> ingen elektroner eksiteres, vann spaltes ikke, og det lages verken ATP eller NADPH. Calvinsyklusen går tom og stopper også.':'Lys eksiterer elektroner i fotosystemene.'}}};

LIVE.dna={init(){
 const B=q('#dB'),Bh=q('#dBh'),F=q('#dF'),Fh=q('#dFh'),R=[...svg.querySelectorAll('line[data-x]')],Pc=[...svg.querySelectorAll('#dP circle')],nuc=q('#nuc');
 const Y=(x,a)=>300+115*Math.sin(2*Math.PI*(x-40)/260+a);
 const pth=a=>{let d='';for(let x=30;x<=770;x+=5)d+=(x==30?'M':'L')+x+','+f1(Y(x,a));return d};
 let p=0;
 function upd(){const db=pth(p+Math.PI),df=pth(p);B.setAttribute('d',db);Bh.setAttribute('d',db);F.setAttribute('d',df);Fh.setAttribute('d',df);
  R.forEach(l=>{const x=+l.dataset.x,y1=Y(x,p),y2=Y(x,p+Math.PI),m=(y1+y2)/2;if(l.dataset.h==='1'){l.setAttribute('y1',f1(y1));l.setAttribute('y2',f1(m))}else{l.setAttribute('y1',f1(m));l.setAttribute('y2',f1(y2))}l.setAttribute('opacity',Math.abs(y1-y2)<16?0:1)});
  Pc.forEach(c=>c.setAttribute('cy',f1(Y(+c.dataset.x,p))));
  const y1=Y(358,p);nuc.setAttribute('y',f1(Math.min(y1,300)-12));nuc.setAttribute('height',f1(Math.abs(y1-300)+24));nuc.style.opacity=Math.abs(y1-300)<14?0:1}
 return loop(dt=>{if(!ANIM)return;p-=dt*.55;upd()});
}};
