/* ---------- step-by-step reactions ---------- */
function stepper(title,steps,{pos='bl',w=300,dur=4.2,excl=false,map={}}={}){return{pos,ctrl:`<div style="width:${w}px;max-width:100%"><div class="cx-title">${title}</div><div class="cx-row"><button class="cbtn" data-a="prev" aria-label="Forrige">‹</button><button class="cbtn" data-a="play">Pause</button><button class="cbtn" data-a="next" aria-label="Neste">›</button><span class="stepn"></span></div><div class="dots">${steps.map((_,i)=>`<i data-i="${i}"></i>`).join('')}</div><div class="cx-note stx"></div></div>`,
 init(){let i=0,t=0,playing=ANIM;const pb=cq('[data-a=play]');
  const show=()=>{svg.querySelectorAll('[data-s]').forEach(e=>{const on=steps[i].all||e.dataset.s.split(' ').includes(String(i+1));if(excl||e.dataset.hide!=null){e.classList.toggle('shide',!on);e.classList.remove('soff')}else e.classList.toggle('soff',!on)});cq('.stx').innerHTML=steps[i].t;cq('.stepn').textContent=`Trinn ${i+1} av ${steps.length}`;ctrl.querySelectorAll('.dots i').forEach((d,k)=>d.classList.toggle('on',k===i));pb.textContent=playing?'Pause':'Spill av';pb.classList.toggle('on',!playing)};
  const go=d=>{i=(i+d+steps.length)%steps.length;t=0;show()};
  cq('[data-a=prev]').onclick=()=>{playing=false;go(-1)};cq('[data-a=next]').onclick=()=>{playing=false;go(1)};pb.onclick=()=>{playing=!playing;show()};
  ctrl.querySelectorAll('.dots i').forEach(d=>d.onclick=()=>{playing=false;i=+d.dataset.i;t=0;show()});
  onSel=id=>{if(map[id]!=null){playing=false;i=map[id];t=0;show()}};
  show();return loop(dt=>{if(!(ANIM&&playing))return;t+=dt;if(t>dur*(steps[i].all?1.6:1))go(1)})}}}
LIVE.cytoplasma=stepper('Glykolysen trinn for trinn',[
 {t:'<b>1 · Investering.</b> To ATP brukes til å feste to fosfatgrupper på glukose. Molekylet blir ustabilt og lettere å spalte.'},
 {t:'<b>2 · Spalting.</b> Sukkeret med 6 C deles i to like molekyler med 3 C hver: G3P.'},
 {t:'<b>3 · Energiutbytte.</b> Hver G3P gir fra seg elektroner til NAD⁺ (→ NADH) og fosfatgrupper til ADP (→ 2 ATP). Sluttproduktet er pyruvat.'},
 {t:'<b>Resultat:</b> 2 pyruvat, netto 2 ATP og 2 NADH per glukose. Ingen O₂ trengs. Med O₂ går pyruvat videre inn i mitokondrien.',all:1}]);
LIVE.matriks=stepper('Sitronsyresyklusen trinn for trinn',[
 {t:'<b>1 · Fra pyruvat til acetyl-CoA.</b> Pyruvat (3 C) fraktes inn i matriksen. Ett C forsvinner som CO₂, NADH dannes, og resten (2 C) bindes til koenzym A.'},
 {t:'<b>2 · Sitrat dannes.</b> Acetyl-CoA (2 C) slår seg sammen med oksaloacetat (4 C) og blir sitrat (6 C) – sitronsyre, som har gitt syklusen navnet.'},
 {t:'<b>3 · Første CO₂.</b> Sitrat omdannes og mister ett C som CO₂. Elektroner fanges av NAD⁺ → NADH. Igjen: 5 C.'},
 {t:'<b>4 · Andre CO₂.</b> Enda ett C forsvinner som CO₂. Det dannes NADH og ett ATP.'},
 {t:'<b>5 · Oksaloacetat gjenskapes.</b> 4C-molekylet omdannes tilbake til oksaloacetat. Elektroner fanges av FAD → FADH₂ og NAD⁺ → NADH. Syklusen er klar for neste runde.'},
 {t:'<b>Per runde:</b> 2 CO₂, 3 NADH, 1 FADH₂ og 1 ATP. Hver glukose gir to runder. NADH og FADH₂ leverer elektronene til elektrontransportkjeden.',all:1}]);
LIVE.stroma=LIVE.calvin=stepper('Calvinsyklusen trinn for trinn',[
 {t:'<b>1 · Karbonfiksering.</b> Enzymet rubisko fester CO₂ til RuBP (5 C). Det nye 6C-molekylet deles straks i to PGA (3 C).'},
 {t:'<b>2 · Reduksjon.</b> ATP og NADPH fra lysreaksjonene brukes til å gjøre PGA om til G3P – et sukker med 3 C.'},
 {t:'<b>3 · Utbytte.</b> For hver 3 CO₂ som bindes, kan 1 G3P gå ut av syklusen. To G3P kan settes sammen til én glukose.'},
 {t:'<b>4 · Regenerering.</b> De andre 5 G3P bygges om til 3 RuBP. Det koster 3 ATP. Syklusen er klar til å binde mer CO₂.'},
 {t:'<b>For én glukose:</b> 6 CO₂, 18 ATP og 12 NADPH – syklusen går seks runder. Uten lys stopper tilførselen av ATP og NADPH, og da stopper også Calvinsyklusen.',all:1}]);

LIVE.transkripsjon={pos:'br',ctrl:`<div style="width:250px"><div class="cx-title">RNA-polymerase i arbeid</div><div class="cx-row"><button class="cbtn" id="tPlay">Pause</button><label class="cx-sl">Fart<input type="range" id="tSpd" min="0.4" max="3" step="0.1" value="1.4"></label></div><div class="cx-note" id="tRead"></div></div>`,
init(){
 const mR='AUGGCCAUUGUAAUGGGCCGCUGAAAGG',N=mR.length,tpl=mR.split('').map(b=>({A:'T',U:'A',G:'C',C:'G'})[b]),cod=mR.replace(/U/g,'T').split('');
 const X=i=>30+i*27.5,gc=q('#tCod'),gt=q('#tTpl'),gm=q('#tM'),gp=q('#tPol'),rd=cq('#tRead');let p=7,playing=true,spd=1.4;
 const lb=(x,y,b,sz=16)=>`<rect x="${f1(x-sz/2)}" y="${f1(y-sz/2)}" width="${sz}" height="${sz}" rx="3.5" fill="${col[b]}"/><text x="${f1(x)}" y="${f1(y+4.2)}" text-anchor="middle" style="font-size:11px;font-weight:700;fill:#fff">${b}</text>`;
 function draw(){const c=p-2.5,bump=i=>Math.exp(-(((i-c)/3.4)**4));const yT=i=>238-50*bump(i),yB=i=>334+50*bump(i);
  let top='',bot='',m='',rungs='';const pT=[],pB=[];for(let i=0;i<N;i++){pT.push([X(i),yT(i)]);pB.push([X(i),yB(i)])}
  for(let i=0;i<N;i++){const b=bump(i);if(b<.35){rungs+=`<line x1="${f1(X(i))}" y1="${f1(yT(i)+4)}" x2="${f1(X(i))}" y2="${f1((yT(i)+yB(i))/2)}" stroke="${col[cod[i]]}" stroke-width="7"/><line x1="${f1(X(i))}" y1="${f1((yT(i)+yB(i))/2)}" x2="${f1(X(i))}" y2="${f1(yB(i)-4)}" stroke="${col[tpl[i]]}" stroke-width="7"/>`}else{top+=lb(X(i),yT(i)+18,cod[i]);bot+=lb(X(i),yB(i)-18,tpl[i])}}
  gc.innerHTML=`<path d="${smooth(pT,false)}" fill="none" stroke="#586579" stroke-width="7" stroke-linecap="round"/>`+top+`<text x="14" y="232" class="rl" style="font-size:12px">5'</text><text x="786" y="232" text-anchor="end" class="rl" style="font-size:12px">3'</text><text x="22" y="200" class="pt" style="fill:#586579">Kodende tråd</text>`;
  gt.innerHTML=rungs+`<path d="${smooth(pB,false)}" fill="none" stroke="#3c4657" stroke-width="7" stroke-linecap="round"/>`+bot+`<text x="14" y="352" class="rl" style="font-size:12px">3'</text><text x="786" y="352" text-anchor="end" class="rl" style="font-size:12px">5'</text><text x="22" y="398" class="pt" style="fill:#3c4657">Malstreng (leses)</text>`;
  const n=Math.floor(p),pts=[];for(let j=n-1;j>=0;j--){const k=(p-6)-j;if(k<=0)pts.push([X(j),yB(j)-46]);else{const sx=X(p-6),sy=yB(p-6)-46,s=k*24,Lv=sy-112;pts.push(s<=Lv?[sx-k*9,sy-s]:[sx-Lv/24*9-(s-Lv),112])}}
  pts.reverse();m=(pts.length>1?`<path d="${smooth(pts,false)}" fill="none" stroke="#2f9e8f" stroke-width="5" stroke-linecap="round"/>`:'');
  pts.forEach(([x,y],j)=>{const inB=(p-6)-j<=0;if(inB)m+=`<line x1="${f1(x)}" y1="${f1(y+8)}" x2="${f1(x)}" y2="${f1(yB(j)-26)}" stroke="#2f9e8f" stroke-width="2" stroke-dasharray="2 3"/>`;m+=lb(x,y,mR[j],17)});
  if(pts.length)m+=`<text x="${f1(pts[0][0]-14)}" y="${f1(pts[0][1]-10)}" text-anchor="end" class="rl" style="font-size:12px">5'</text>`;
  gm.innerHTML=m;
  gp.innerHTML=`<g filter="url(#sh)"><ellipse cx="${f1(X(c))}" cy="286" rx="132" ry="96" fill="url(#gPol)" opacity=".5" stroke="#2f8f7f" stroke-width="2.5"/></g><text x="${f1(X(c))}" y="414" text-anchor="middle" class="pt" style="fill:#1d5c52">RNA-polymerase</text><path d="M${f1(X(c)+70)},286 h40" stroke="#2f8f7f" stroke-width="3" marker-end="url(#arT)"/>`;
  const j=Math.max(0,n-1);rd.innerHTML=`Malstreng <b class="cod">${tpl[j]}</b> → mRNA <b class="cod">${mR[j]}</b> (${mR[j]==='U'?'U i stedet for T':'komplementær base'})<br>mRNA så langt: <b class="cod">${mR.slice(0,n).replace(/(...)/g,'$1 ')}</b>`}
 draw();const pb=cq('#tPlay');pb.onclick=()=>{playing=!playing;pb.textContent=playing?'Pause':'Spill av';pb.classList.toggle('on',!playing)};cq('#tSpd').oninput=e=>spd=+e.target.value;
 let last=-1;return loop(dt=>{if(!(ANIM&&playing))return;p+=dt*spd;if(p>N+2)p=7;if(Math.abs(p-last)>.03){last=p;draw()}});
}};

LIVE.atp={pos:'br',ctrl:`<div style="width:240px"><div class="cx-title" id="aT">ATP → ADP + Pᵢ</div><div class="cx-note" id="aN"></div></div>`,
init(){const w=q('#wat'),g=q('#gam'),bg=q('#bg'),bu=q('#burst'),T=q('#atpT'),nt=cq('#aN');let t=0;const TOT=10;
 const set=()=>{const u=t;const e1=ez(cl(u/1.6)),e2=ez(cl((u-1.6)/1.2)),e3=ez(cl((u-5.5)/1.6));
  const wx=690+(578-690)*e1,wy=500+(352-500)*e1;w.setAttribute('transform',`translate(${f1(wx)},${f1(wy)})`);w.style.opacity=u<1.6?1:u<2.8?1-e2:0;
  const away=e2*(1-e3);g.setAttribute('transform',`translate(${f1(110*away)},${f1(-120*away)})`);bg.style.opacity=u<1.6||u>7.1?1:0;
  bu.style.opacity=(u>1.6&&u<2.8)?Math.sin((u-1.6)/1.2*Math.PI):0;bu.setAttribute('transform',`translate(580,300) scale(${f1(.6+.6*cl((u-1.6)/1.2))}) translate(-580,-300)`);
  const hyd=u>=1.8&&u<6.8;T.textContent=hyd?'ADP + Pᵢ':'ATP';cq('#aT').textContent=u<5.5?'ATP → ADP + Pᵢ + energi':'ADP + Pᵢ + energi → ATP';
  nt.innerHTML=u<1.6?'Et vannmolekyl angriper bindingen mellom β- og γ-fosfat (hydrolyse).':u<5.5?'Bindingen brytes, og energi frigjøres. Den brukes til muskelarbeid, aktiv transport og oppbygging av molekyler.':'I mitokondriene (og kloroplastene) lades ADP opp igjen: ATP-syntase fester fosfatet på nytt med energi fra H⁺-strømmen.'};
 set();if(!ANIM){t=3;set()}return loop(dt=>{if(!ANIM)return;t=(t+dt)%TOT;set()});}};

LIVE.peptidbinding={pos:'br',ctrl:`<div style="width:240px"><div class="cx-title">Kondensasjonsreaksjon</div><div class="cx-row"><button class="cbtn" id="ppPlay">Pause</button><button class="cbtn" id="ppRe">Start på nytt</button></div><div class="cx-note" id="ppN"></div></div>`,
init(){const O=q('#mO'),H1=q('#mH1'),H2=q('#mH2'),A2=q('#aa2'),bCO=q('#bCO'),bNH=q('#bNH'),pb=q('#pb'),h2o=q('#h2o'),nt=cq('#ppN'),T=q('#ppT');let t=0,playing=true;const TOT=10;
 const tr=(el,x,y)=>el.setAttribute('transform',`translate(${f1(x)},${f1(y)})`);
 const set=()=>{const a=ez(cl((t-1.4)/1.6)),b=ez(cl((t-3.2)/1.6)),c=cl((t-4.8)/.6),z=cl((t-8.6)/.8);const fade=1-z;
  tr(O,(400-335)*a,(470-290)*a);tr(H1,(432-385)*a,(492-290)*a);tr(H2,(368-440)*a,(492-290)*a);[O,H1,H2].forEach(e=>e.style.opacity=fade);
  bCO.style.opacity=1-a;bNH.style.opacity=1-a;h2o.style.opacity=a*fade;tr(A2,-155*b,0);pb.style.opacity=c*fade;
  const glow=t<1.4?.5+.5*Math.sin(t*6):0;[O,H1,H2].forEach(e=>e.style.filter=glow>0?'url(#glow)':'');
  const msg=t<1.4?'OH fra karboksylgruppen og H fra aminogruppen er markert.':t<3.2?'De tre atomene spaltes av og danner et vannmolekyl (H₂O).':t<4.8?'Aminosyrene nærmer seg hverandre …':'C fra den ene og N fra den andre bindes sammen: en peptidbinding. Resultatet er et dipeptid.';nt.textContent=msg;T.textContent=t>=4.8?'Dipeptid + H₂O':'Aminosyre + aminosyre'};
 set();if(!ANIM){t=6;set()}
 const p2=cq('#ppPlay');p2.onclick=()=>{playing=!playing;p2.textContent=playing?'Pause':'Spill av';p2.classList.toggle('on',!playing)};cq('#ppRe').onclick=()=>{t=0;set()};
 return loop(dt=>{if(!(ANIM&&playing))return;t=(t+dt)%TOT;set()});}};
