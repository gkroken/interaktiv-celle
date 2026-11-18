/* ---------- live: photosynthesis, division, osmosis ---------- */
LIVE.klorofyll={pos:'tr',ctrl:`<div style="width:250px"><div class="cx-title">Prøv ulike farger av lys</div><label class="cx-sl wide">Bølgelengde <b id="wlV"></b><input type="range" id="wlS" min="400" max="700" value="550"></label><div class="cx-note" id="wlN"></div><label class="cx-tog" style="margin-top:6px;font-size:13px"><input type="checkbox" id="vsC" checked> Vis virkningsspekter</label></div>`,
init(){const X0=440,X1=775,Y0=470,Y1=235,X=w=>X0+(w-400)/300*(X1-X0),Yv=v=>Y0-v*(Y0-Y1);
 const upd=w=>{q('#wlL').setAttribute('x1',f1(X(w)));q('#wlL').setAttribute('x2',f1(X(w)));[['#wlA','a'],['#wlB','b'],['#wlC','c']].forEach(([id,k])=>{const e=q(id);e.setAttribute('cx',f1(X(w)));e.setAttribute('cy',f1(Yv(SPEC[k](w))))});
  const pc=k=>Math.round(Math.min(1,SPEC[k](w))*100);cq('#wlV').innerHTML=`<span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:${wlCol(w)};vertical-align:-1px"></span> ${w} nm`;
  const tot=Math.max(pc('a'),pc('b'),pc('c'));cq('#wlN').innerHTML=`<b>${wlName(w)[0].toUpperCase()+wlName(w).slice(1)} lys:</b> klorofyll a ${pc('a')} %, b ${pc('b')} %, karotenoider ${pc('c')} %. ${tot<25?'Lite absorberes – lyset reflekteres eller går gjennom bladet.':tot>65?'Absorberes godt – gir mye energi til fotosyntesen.':'Absorberes delvis.'}`};
 const sl=cq('#wlS');sl.oninput=e=>upd(+e.target.value);upd(550);cq('#vsC').onchange=e=>q('#vsp').style.display=e.target.checked?'':'none';}};

LIVE.fotosystem={pos:'br',ctrl:`<div style="width:236px"><div class="cx-title">Energien vandrer innover</div><div class="cx-note" id="fsN">Et foton treffer et pigment i antennen …</div></div>`,
init(){const pg=[...svg.querySelectorAll('[data-pi]')].map(e=>({e,x:+e.dataset.x,y:+e.dataset.y}));const C=[400,340],nOut=pg.filter(p=>Math.hypot(p.x-C[0],(p.y-C[1])*1.3)>200).length;
 const fx=q('#fx'),ph=q('#phot'),p1=q('#p1'),p2=q('#p2'),nt=cq('#fsN'),R=rng(7);let seq=[],t=0,k=0,phase='photon',st,dur=.5;
 const dist=p=>Math.hypot(p.x-C[0],(p.y-C[1])*1.3);
 function plan(){const outer=pg.filter(p=>dist(p)>200);let cur=outer[Math.floor(R()*outer.length)];seq=[cur];while(dist(cur)>95){const nx=pg.filter(p=>dist(p)<dist(cur)-12).sort((a,b)=>Math.hypot(a.x-cur.x,a.y-cur.y)-Math.hypot(b.x-cur.x,b.y-cur.y))[0];if(!nx)break;seq.push(nx);cur=nx}st=seq[0];const a=Math.atan2(st.y-C[1],st.x-C[0]);ph.dataset.sx=f1(st.x+170*Math.cos(a-.4));ph.dataset.sy=f1(st.y+170*Math.sin(a-.4))}
 const hl=(p,on)=>{if(!p)return;p.e.setAttribute('transform',`translate(${p.x},${p.y}) scale(${on?1.6:1})`);p.e.querySelector('circle').setAttribute('fill',on?'#ffe066':'url(#gPS)')};
 const wave=(x1,y1,x2,y2,u)=>{const L=Math.hypot(x2-x1,y2-y1),n=Math.floor(L/12);let d=`M${x1},${y1}`;for(let i=1;i<=n*u;i++){const tt=i/n,px=x1+(x2-x1)*tt,py=y1+(y2-y1)*tt,o=(i%2?1:-1)*6;d+=` L${f1(px-o*(y2-y1)/L)},${f1(py+o*(x2-x1)/L)}`}return d};
 const dot=(x,y,c)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="7" fill="${c}" stroke="#a86a00" stroke-width="1.5"/>`;
 function step(dt){t+=dt;
  if(phase==='photon'){const u=cl(t/.6);ph.setAttribute('d',wave(+ph.dataset.sx,+ph.dataset.sy,st.x,st.y,u));nt.innerHTML='<b>1.</b> Et foton treffer et pigment i antennen og eksiterer et elektron.';if(u>=1){phase='hop';t=0;k=0;ph.setAttribute('d','');hl(seq[0],1)}}
  else if(phase==='hop'){nt.innerHTML='<b>2.</b> Energien (ikke selve elektronet) hopper fra pigment til pigment mot reaksjonssenteret.';if(t>.17){hl(seq[k],0);k++;t=0;if(k>=seq.length){phase='rc';[p1,p2].forEach(e=>e.setAttribute('fill','#ffe066'))}else hl(seq[k],1)}}
  else if(phase==='rc'){const u=cl(t/.8);nt.innerHTML='<b>3.</b> I reaksjonssenteret (P680) blir et elektron sendt videre til den primære elektronakseptoren.';const b=bez([[440,320],[520,240],[560,160],[600,120]],u);fx.innerHTML=dot(b[0],b[1],'#f2a516');if(u>=1){phase='refill';t=0;[p1,p2].forEach(e=>e.setAttribute('fill','#c9a4a4'))}}
  else if(phase==='refill'){const u=cl(t/.8);nt.innerHTML='<b>4.</b> P680 mangler nå et elektron. Det hentes fra vann, som spaltes: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻.';fx.innerHTML=dot(400,518-136*u,'#8fc0e0');if(u>=1){phase='rest';t=0;fx.innerHTML='';[p1,p2].forEach(e=>e.setAttribute('fill','#9be070'))}}
  else if(phase==='rest'){if(t>.5){phase='photon';t=0;plan()}}}
 plan();if(!ANIM){phase='hop';hl(seq[0],1)}
 return loop(dt=>{if(ANIM)step(dt)});}};

LIVE.zskjema={pos:'br',ctrl:`<div style="width:250px"><label class="cx-tog"><input type="checkbox" id="cyC"> Syklisk elektrontransport</label><div class="cx-note" id="cyN"></div></div>`,
init(){const n=cq('#cyN'),set=on=>{q('#cyc').style.display=on?'':'none';q('#ncy').style.display=on?'none':'';q('#zp').style.opacity=on?.25:.75;svg.querySelectorAll('.part[data-go=nadph],.part[data-go=vannspalting],.part[data-go=p680],.part[data-go=plastokinon]').forEach(p=>p.classList.toggle('dim',on));
 n.innerHTML=on?'<b>Syklisk:</b> elektronene fra fotosystem I går tilbake til cyt b₆f. Det pumpes H⁺ og lages ATP, men <b>ikke</b> NADPH og <b>ikke</b> O₂. Calvinsyklusen trenger mer ATP enn NADPH – dette fyller på.':'<b>Ikke-syklisk:</b> elektronene går fra vann, via begge fotosystemene, til NADPH. Lys gir elektronene to «løft». Underveis pumpes H⁺ som driver ATP-syntase.'};cq('#cyC').onchange=e=>set(e.target.checked);set(false)}};

LIVE.fotosynteseformer={pos:'tr',ctrl:`<div class="cx-row"><button class="cbtn on" data-t="c3">C3</button><button class="cbtn" data-t="c4">C4</button><button class="cbtn" data-t="cam">CAM</button></div>`,
init(){const map={c3:'c3',c4:'c4',cam:'cam',fotorespirasjon:'c3',buntskjede:'c4',malat:null,pepkarboksylase:null};const set=t=>{svg.querySelectorAll('[data-tab]').forEach(g=>g.style.display=g.dataset.tab===t?'':'none');ctrl.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===t))};
 ctrl.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>set(b.dataset.t));onSel=id=>{if(map[id])set(map[id])};set('c3')}};

LIVE.cellesyklus=null;
LIVE.gjaering=stepper('Gjæring trinn for trinn',[
 {t:'<b>1 · Glykolyse.</b> Glukose spaltes til 2 pyruvat. Det gir 2 ATP – men bruker NAD⁺, som blir til NADH.'},
 {t:'<b>2 · Problemet.</b> Uten oksygen kan ikke NADH leveres til elektrontransportkjeden. NAD⁺ går tomt, og glykolysen stopper – med mindre NAD⁺ gjenvinnes.'},
 {t:'<b>3 · Melkesyregjæring.</b> Pyruvat tar imot elektronene fra NADH og blir laktat. NAD⁺ er tilbake, og glykolysen kan fortsette. Skjer i muskler og i melkesyrebakterier.'},
 {t:'<b>4 · Alkoholgjæring.</b> Gjærsopp spalter av CO₂ og gjør resten om til etanol. Også her gjenvinnes NAD⁺. CO₂ får brøddeigen til å heve.'},
 {t:'<b>5 · Energiregnskap.</b> Gjæring gir bare 2 ATP per glukose, mot ca. 30–32 med oksygen.'}],{dur:4.8,map:{melkesyregjaering:2,alkoholgjaering:3,energiutbytte:4,nadretur:1}});

LIVE.osmose={pos:'bl',ctrl:`<div style="width:260px"><div class="cx-row"><button class="cbtn on" data-o="dyr">Rød blodcelle</button><button class="cbtn" data-o="plante">Plantecelle</button></div><label class="cx-sl wide" style="margin-top:8px">Saltkonsentrasjon utenfor <b id="oC"></b><input type="range" id="oS" min="0" max="250" value="90"></label><div class="cx-note" id="oN"></div></div>`,
init(){const go_=q('#osOut'),gc=q('#osCell'),gw=q('#osW'),nt=cq('#oN');let mode='dyr',c=1,k=1,drops=Array.from({length:16},(_,i)=>({a:i/16*6.283,u:Math.random()}));const CX=400,CY=360;
 function outside(){const R=rng(5),n=Math.round(c*34);let s='';let m=0,g=0;while(m<n&&g++<3000){const x=40+R()*720,y=140+R()*440;if(mode==='dyr'?Math.hypot(x-CX,y-CY)<175:(Math.abs(x-CX)<190&&Math.abs(y-CY)<150))continue;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="#e0a020" stroke="#a86a00" stroke-width="1"/>`;m++}go_.innerHTML=s}
 function cell(){let s='';if(mode==='dyr'){const R0=105;const burst=c<.32;const r=R0*k,amp=c>1.12?Math.min(.1,(c-1.12)*.14):0;const p=[];for(let i=0;i<48;i++){const a=i/48*6.283;const rr=r*(1+amp*Math.sin(a*12))*(burst?(1+.12*Math.sin(a*7)):1);p.push([CX+rr*Math.cos(a),CY+rr*Math.sin(a)])}
   s=`<defs><radialGradient id="gRBC" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f6a4a0"/><stop offset=".45" stop-color="#e86a60"/><stop offset="1" stop-color="#c0392b"/></radialGradient></defs><path d="${smooth(p)}" fill="url(#gRBC)" stroke="#8e2a20" stroke-width="3" ${burst?'stroke-dasharray="10 8" opacity=".55"':''} filter="url(#sh)"/>${burst?'':`<ellipse cx="${CX}" cy="${CY}" rx="${f1(r*.42*(k>1.1?.5:1))}" ry="${f1(r*.42*(k>1.1?.5:1))}" fill="#f6b0aa" opacity=".7"/>`}`;
   const R=rng(2);for(let i=0;i<14;i++){const a=R()*6.283,d=R()*r*.75;s+=`<circle cx="${f1(CX+d*Math.cos(a))}" cy="${f1(CY+d*Math.sin(a))}" r="4.5" fill="#e0a020" stroke="#a86a00" stroke-width="1"/>`}
   s+=`<text x="${CX}" y="156" text-anchor="middle" class="pt" style="font-size:14px">${burst?'Cellen sprekker (hemolyse)':k>1.08?'Cellen sveller':amp>0?'Cellen skrumper (tornet form)':'Normal form'}</text>`}
  else{const W=170,H=125,f=c<=1?1:Math.max(.5,1-.45*(c-1));const w=(W-10)*f,h=(H-10)*f*(c>1?.92:1);
   s=`<rect x="${CX-W-10}" y="${CY-H-10}" width="${2*W+20}" height="${2*H+20}" rx="34" fill="url(#gWall)" stroke="#7d9a4e" stroke-width="4" filter="url(#sh)"/><rect x="${CX-W}" y="${CY-H}" width="${2*W}" height="${2*H}" rx="28" fill="#eef6fb"/><rect x="${f1(CX-w)}" y="${f1(CY-h)}" width="${f1(2*w)}" height="${f1(2*h)}" rx="${f1(26*f)}" fill="url(#gCytoP)" stroke="#b77945" stroke-width="3"/><rect x="${f1(CX-w*.78)}" y="${f1(CY-h*.7)}" width="${f1(1.56*w)}" height="${f1(1.4*h)}" rx="${f1(22*f)}" fill="url(#gVac)" stroke="#3f86b5" stroke-width="2"/>`;
   [[-.88,-.4],[-.88,.3],[.88,-.2],[.88,.45],[-.3,-.86],[.35,.86]].forEach(([a,b])=>s+=chloroD(f1(CX+a*w),f1(CY+b*h),Math.abs(a)>.8?90:0,.42*Math.max(.7,f)));
   const R=rng(2);for(let i=0;i<12;i++)s+=`<circle cx="${f1(CX+(R()-.5)*1.3*w)}" cy="${f1(CY+(R()-.5)*1.2*h)}" r="4.5" fill="#e0a020" stroke="#a86a00" stroke-width="1"/>`;
   s+=`<text x="${CX}" y="156" text-anchor="middle" class="pt" style="font-size:14px">${c<.9?'Full spenning (turgor) – celleveggen hindrer at cellen sprekker':c<=1.1?'Slapp (ingen netto vannbevegelse)':'Plasmolyse – innholdet slipper celleveggen'}</text>`}
  gc.innerHTML=s}
 function water(dt){const dir=c<.9?-1:c>1.1?1:0;const r0=mode==='dyr'?105*k:150;let s='';drops.forEach(d=>{d.u+=dt*.45*(dir===0?.0:1);if(d.u>1)d.u-=1;const u=dir===-1?1-d.u:d.u;const rr=dir===0?r0*(1+.25*Math.sin(d.a*3+performance.now()/700)):r0*(.55+u*.85);const x=CX+rr*Math.cos(d.a)*(mode==='dyr'?1:1.2),y=CY+rr*Math.sin(d.a)*(mode==='dyr'?1:.85);s+=`<g transform="translate(${f1(x)},${f1(y)})"><path d="M0,-7 C4,-2 6,2 0,7 C-6,2 -4,-2 0,-7Z" fill="#3e9de0" opacity=".85"/></g>`});gw.innerHTML=s}
 function ui(){const pct=(c*.9).toFixed(2).replace('.',',');cq('#oC').textContent=pct+' % NaCl';const typ=c<.9?'hypoton':c<=1.1?'isoton':'hyperton';svg.querySelectorAll('.part[data-go=hypoton],.part[data-go=isoton],.part[data-go=hyperton]').forEach(p=>p.classList.toggle('dim',p.dataset.go!==typ));
  nt.innerHTML=typ==='hypoton'?'<b>Hypotonisk løsning:</b> lavere konsentrasjon ute enn inne. Vann strømmer <b>inn</b> i cellen.':typ==='isoton'?'<b>Isotonisk løsning:</b> samme konsentrasjon ute og inne (0,9 % NaCl for blodceller). Like mye vann går inn som ut.':'<b>Hypertonisk løsning:</b> høyere konsentrasjon ute. Vann strømmer <b>ut</b> av cellen.'}
 const sl=cq('#oS');sl.oninput=e=>{c=+e.target.value/90;outside();ui()};
 ctrl.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{mode=b.dataset.o;ctrl.querySelectorAll('[data-o]').forEach(x=>x.classList.toggle('on',x===b));outside();cell()});
 onSel=id=>{const v={hypoton:40,isoton:90,hyperton:180,turgor:40,plasmolyse:200}[id];if(v!=null){if(id==='turgor'||id==='plasmolyse'){mode='plante';ctrl.querySelectorAll('[data-o]').forEach(x=>x.classList.toggle('on',x.dataset.o==='plante'))}sl.value=v;c=v/90;outside();ui()}};
 outside();ui();k=1;cell();water(0);
 let dirty=true;sl.addEventListener('input',()=>dirty=true);ctrl.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>dirty=true));const _os=onSel;onSel=id=>{_os(id);dirty=true};
 return loop(dt=>{const tk=c<.32?1.26:Math.max(.8,Math.min(1.26,1+.3*(1-c)));const pk=k;k+=(tk-k)*Math.min(1,dt*2.5);if(dirty||Math.abs(k-pk)>.001){cell();dirty=false}if(ANIM)water(dt)});}};
