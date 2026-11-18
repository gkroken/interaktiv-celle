/* ---------- celledeling som sammenhengende film ---------- */
// Hver fase er en nøkkeltilstand: et objekt med bare tall (posisjoner,
// kondensering, kjernemembran, spoletråder …). Mellom fasene interpoleres
// alt, og cellens omriss tegnes som «metaballs», slik at én celle strekkes,
// snøres og deles i to uten hopp. Mitose og meiose bruker samme motor.

const FF={TR:.58,RR:1.25};
FF.T=(1-1/(FF.RR*FF.RR))**2;               // terskel slik at én blob får nøyaktig radius rx/ry
FF.sm=t=>t*t*(3-2*t);
// interpolasjon av like strukturer; tm = {nøkkel:[start,slutt]} gir egne tidsvinduer
// (et vindu på en container, f.eks. «blobs», gjelder alt inni den)
FF.lerp=(a,b,e0,tm={},eff=e0,key,lock=false)=>{
 if(!lock&&key&&tm[key]){const [x,y]=tm[key];eff=FF.sm(cl((e0-x)/(y-x)));if(typeof b==='object')lock=true}
 if(typeof b==='number')return typeof a==='number'?a+(b-a)*eff:b;
 if(Array.isArray(b))return b.map((v,i)=>FF.lerp(a&&a[i],v,e0,tm,eff,key,lock));
 if(b&&typeof b==='object'){const o={};for(const k in b)o[k]=FF.lerp(a&&a[k],b[k],e0,tm,eff,k,lock);return o}
 return b};
FF.copy=o=>JSON.parse(JSON.stringify(o));

// cellens omriss: marching squares over et metaball-felt
FF.blobPath=blobs=>{
 const bl=blobs.filter(b=>b.w>.003);if(!bl.length)return'';const K=FF.RR,T=FF.T,G=5;
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
 bl.forEach(b=>{x0=Math.min(x0,b.x-b.rx*K);x1=Math.max(x1,b.x+b.rx*K);y0=Math.min(y0,b.y-b.ry*K);y1=Math.max(y1,b.y+b.ry*K)});
 x0=Math.floor(x0/G)*G-G;y0=Math.floor(y0/G)*G-G;const nx=Math.ceil((x1-x0)/G)+3,ny=Math.ceil((y1-y0)/G)+3,F=new Float32Array(nx*ny);
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const x=x0+i*G,y=y0+j*G;let f=0;
  for(const b of bl){const dx=(x-b.x)/(b.rx*K),dy=(y-b.y)/(b.ry*K),d=dx*dx+dy*dy;if(d<1){const t=1-d;f+=b.w*t*t}}F[j*nx+i]=f}
 const V=(i,j)=>F[j*nx+i],P_={},A={};
 const pt=k=>{if(P_[k])return;const [t,i,j]=k.split(',').map((v,n)=>n?+v:v);let a,b,x,y;
  if(t==='h'){a=V(i,j);b=V(i+1,j);x=x0+(i+(T-a)/(b-a))*G;y=y0+j*G}else{a=V(i,j);b=V(i,j+1);x=x0+i*G;y=y0+(j+(T-a)/(b-a))*G}P_[k]=[x,y]};
 const seg=(p,q)=>{pt(p);pt(q);(A[p]=A[p]||[]).push(q);(A[q]=A[q]||[]).push(p)};
 for(let j=0;j<ny-1;j++)for(let i=0;i<nx-1;i++){
  const c=(V(i,j)>T)*8+(V(i+1,j)>T)*4+(V(i+1,j+1)>T)*2+(V(i,j+1)>T);if(!c||c===15)continue;
  const t=`h,${i},${j}`,r=`v,${i+1},${j}`,b=`h,${i},${j+1}`,l=`v,${i},${j}`;
  const mid=(V(i,j)+V(i+1,j)+V(i+1,j+1)+V(i,j+1))/4>T;
  switch(c){case 1:case 14:seg(l,b);break;case 2:case 13:seg(b,r);break;case 3:case 12:seg(l,r);break;case 4:case 11:seg(t,r);break;
   case 6:case 9:seg(t,b);break;case 7:case 8:seg(t,l);break;
   case 5:if(mid){seg(t,l);seg(b,r)}else{seg(t,r);seg(l,b)}break;
   case 10:if(mid){seg(t,r);seg(l,b)}else{seg(t,l);seg(b,r)}break}}
 const seen=new Set();let d='';
 for(const s in A){if(seen.has(s))continue;let cur=s,prev=null,pts=[];
  while(cur&&!seen.has(cur)){seen.add(cur);pts.push(P_[cur]);const nb=A[cur].find(n=>n!==prev&&!seen.has(n));prev=cur;cur=nb}
  if(pts.length>2)d+='M'+pts.map(p=>f1(p[0])+','+f1(p[1])).join('L')+'Z'}
 return d};

// faste «krøller» per kromatid, så kromatinet ser likt ut fra bilde til bilde
FF.ph=(()=>{const R=rng(314);return Array.from({length:16},()=>[3+R()*3,R()*6.28,6+R()*5,R()*6.28,4+R()*4])})();
FF.chrom=(k,ch)=>{
 if(ch.op<.01)return'';const sc=ch.sc,c=cl(ch.c),len=ch.L*sc*(1+.55*(1-c)),A=(1-c)*15*sc,ar=ch.a*Math.PI/180,dx=Math.cos(ar),dy=Math.sin(ar),px=-dy,py=dx,R=FF.ph[k%16],n=26;
 const w=s=>A*(Math.sin(s*R[0]+R[1])*.8+Math.sin(s*R[2]+R[3])*.5),w2=s=>A*.6*Math.cos(s*R[4]+R[1]),w0=w(0),w20=w2(0);
 const pts=[];for(let m=0;m<=n;m++){const s=m/n*2-1,a=s*len/2+w2(s)-w20,b=w(s)-w0;pts.push([ch.x+dx*a+px*b+ch.bx*s*s,ch.y+dy*a+py*b+ch.by*s*s])}
 const d=smooth(pts,false),wd=(1.8+10.5*c)*sc;
 let o=`<path d="${d}" fill="none" stroke="rgba(0,0,0,.33)" stroke-width="${f1(wd+2.4*sc)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${ch.col}" stroke-width="${f1(wd)}" stroke-linecap="round" stroke-linejoin="round"/>`;
 if(ch.seg&&ch.xo>.01)o+=`<path d="${smooth(pts.slice(0,10),false)}" fill="none" stroke="${ch.seg}" stroke-width="${f1(wd)}" stroke-linecap="round" opacity="${f1(cl(ch.xo))}"/>`;
 if(c>.3)o+=`<circle cx="${f1(ch.x)}" cy="${f1(ch.y)}" r="${f1(4.8*sc)}" fill="#3a2a55" opacity="${f1(cl((c-.3)*2.5))}"/>`;
 return `<g opacity="${f1(cl(ch.op))}">${o}</g>`};
FF.cen=c=>c.op<.01?'':`<g opacity="${f1(cl(c.op))}" transform="translate(${f1(c.x)},${f1(c.y)}) scale(${f1(c.sc)})"><circle r="15" fill="#d6c9f0" opacity=".6" filter="url(#soft)"/>${Array.from({length:10},(_,k)=>{const a=k/10*6.283,r=8+22*c.ast;return `<line x2="${f1(r*Math.cos(a))}" y2="${f1(r*Math.sin(a))}" stroke="#9d8bd0" stroke-width="1.3"/>`}).join('')}<rect x="-8" y="-4" width="16" height="8" rx="2" fill="url(#gCent)" stroke="#5b4a9a"/></g>`;
FF.nuc=n=>n.op<.01?'':`<g opacity="${f1(cl(n.op))}"><circle cx="${f1(n.x)}" cy="${f1(n.y)}" r="${f1(n.r)}" fill="url(#gNuc)" opacity=".85"/><circle cx="${f1(n.x)}" cy="${f1(n.y)}" r="${f1(n.r)}" fill="none" stroke="#6a4c98" stroke-width="3" stroke-dasharray="${f1(2+18*cl(n.wh))} ${f1(14*(1-cl(n.wh)))}"/>${n.nl>.01?`<circle cx="${f1(n.x+.09*n.r)}" cy="${f1(n.y-.27*n.r)}" r="${f1(.2*n.r)}" fill="url(#gNucl)" opacity="${f1(cl(n.nl))}"/>`:''}</g>`;
FF.fib=(a,b,g,op)=>{const x=a.x+(b.x-a.x)*g,y=a.y+(b.y-a.y)*g,mx=(a.x+x)/2,my=(a.y+y)/2+(y-a.y)*.12;return `<path d="M${f1(a.x)},${f1(a.y)} Q${f1(mx)},${f1(my)} ${f1(x)},${f1(y)}" fill="none" stroke="#9d8bd0" stroke-width="1.5" opacity="${f1(op)}"/>`};
// hele bildet for én tilstand
FF.svg=(st,id,lab)=>{
 const cell=`<path d="${FF.blobPath(st.blobs)}" fill="url(#gCyto)" stroke="#b77945" stroke-width="5" stroke-linejoin="round" filter="url(#sh)"/><path d="${FF.blobPath(st.blobs)}" fill="url(#pGran)"/>`;
 const g=cl(st.sp),fo=.8*cl(st.sp*2);let fib='';
 if(fo>.01){st.chr.forEach(ch=>{const c=st.cen[+ch.pl];if(c&&ch.op>.05)fib+=FF.fib(c,ch,g,fo*cl(c.op)*cl(ch.op))});
  st.pf.forEach(([i,j,s])=>{if(s>.01){const a=st.cen[i],b=st.cen[j];fib+=FF.fib(a,b,1,.7*cl(s)*cl(st.sp*2))}})}
 return P(id,cell+st.nuc.map(FF.nuc).join('')+st.chr.map((c,k)=>FF.chrom(k,c)).join(''))+P('spoletrader',`<g>${fib}</g>`,{nl:1})+P('sentrioler',st.cen.map(FF.cen).join(''),{nl:1})+(lab?lab(st):'')};

// spiller: samme kontrollpanel som de andre trinnvise modellene
// svg: egen tegnefunksjon (st,id,lab) → SVG; standard er cellebildet FF.svg
function fasefilm({tittel,steps,keys,tm=[],hold,loopFx,lab,map={},dur=5.8,pos='bl',w=300,svg:tegn=FF.svg}){
 return{pos,ctrl:`<div style="width:${w}px;max-width:100%"><div class="cx-title">${tittel}</div><div class="cx-row"><button class="cbtn" data-a="prev" aria-label="Forrige">‹</button><button class="cbtn" data-a="play">Pause</button><button class="cbtn" data-a="next" aria-label="Neste">›</button><span class="stepn"></span></div><div class="dots">${steps.map((_,i)=>`<i data-i="${i}"></i>`).join('')}</div><div class="cx-note stx"></div></div>`,
 init(){
  const n=steps.length,TR=FF.TR,g=q('#ff'),pb=cq('[data-a=play]');
  let T=ANIM?TR:TR+.999*(1-TR),playing=ANIM,from=null,natural=true,shown=-1,cur=null,lastKey='';
  function state(){const i=Math.floor(T),u=T-i;
   if(u<TR){const e=u/TR;
    if(from)return{st:FF.lerp(from,keys[i],e,tm[i])};
    if(i===0&&loopFx)return loopFx(e,keys);
    return{st:FF.lerp(keys[(i+n-1)%n],keys[i],e,tm[i])}}
   const st=FF.copy(keys[i]);if(hold)hold(i,st,(u-TR)/(1-TR),natural);return{st}}
  function render(){const i=Math.floor(T),r=state();cur=r.st;
   g.innerHTML=(r.pre||'')+`<g${r.tf?` transform="${r.tf}"`:''}${r.op!=null?` opacity="${f1(r.op)}"`:''}>${tegn(r.st,steps[i].id,lab)}</g>`;
   if(typeof mark==='function')mark();
   if(i!==shown){shown=i;cq('.stx').innerHTML=steps[i].t;cq('.stepn').textContent=`Trinn ${i+1} av ${n}`;ctrl.querySelectorAll('.dots i').forEach((d,k)=>d.classList.toggle('on',k===i))}}
  const setPB=()=>{pb.textContent=playing?'Pause':'Spill av';pb.classList.toggle('on',!playing)};
  function jump(i){i=(i+n)%n;from=FF.copy(cur);natural=false;T=ANIM?i:i+TR+.999*(1-TR);render()}
  cq('[data-a=prev]').onclick=()=>{playing=false;setPB();jump(Math.floor(T)-1)};
  cq('[data-a=next]').onclick=()=>{playing=false;setPB();const i=Math.floor(T);if(T-i>=TR&&ANIM){T=i+1>=n?0:i+1;from=null;natural=true;render()}else jump(i+1)};
  pb.onclick=()=>{playing=!playing;setPB()};setPB();
  ctrl.querySelectorAll('.dots i').forEach(d=>d.onclick=()=>{playing=false;setPB();jump(+d.dataset.i)});
  onSel=id=>{if(map[id]!=null&&map[id]!==Math.floor(T)){playing=false;setPB();jump(map[id])}};
  render();
  return loop(dt=>{if(!ANIM)return;const i=Math.floor(T),u=T-i;
   if(!playing&&u>=.999)return;                       // pause: fullfør pågående overgang, så stopp
   let t=T+dt/dur;if(!playing)t=Math.min(t,i+.999);
   if(Math.floor(t)!==i){from=null;natural=true}if(t>=n)t-=n;T=t;
   const key=T.toFixed(4);if(key!==lastKey){lastKey=key;render()}})}}}

/* ================= MITOSE ================= */
{
const L=[86,86,52,52],COL=[CR,CB,CR,CB];
// to søsterkromatider side om side (avstand gap) rundt et sentromer
const pair=(j,x,y,a,c,gap,o={})=>{const r=a*Math.PI/180,px=-Math.sin(r),py=Math.cos(r);
 return [-1,1].map((s,k)=>Object.assign({x:x+px*gap/2*s,y:y+py*gap/2*s,a,c,L:L[j],col:COL[j],bx:0,by:0,sc:1,op:1,xo:0,seg:'',pl:String(k)},o))};
const cen=(x,y,o={})=>Object.assign({x,y,op:1,ast:.3,sc:1},o),nuc=(x,y,r,o={})=>Object.assign({x,y,r,op:1,wh:1,nl:1},o),blob=(x,y,rx,ry,w)=>({x,y,rx,ry,w});
const lab0={eq:0,fur:0,cap:0,sf:0};
const P0=[[372,268,-30],[432,282,20],[380,336,55],[424,334,-40]];
const mk=(chr,o)=>Object.assign({chr:[].concat(...chr),pf:[[0,1,0]],lab:{...lab0}},o);
const K=[
 // 0 interfase
 mk(P0.map(([x,y,a],j)=>pair(j,x,y,a,0,5)),{nuc:[nuc(400,300,110),nuc(400,300,110,{op:0})],cen:[cen(530,190),cen(548,206)],blobs:[blob(400,300,240,175,.5),blob(400,300,240,175,.5)],sp:0}),
 // 1 profase
 mk([[352,272,-20],[446,280,15],[372,352,40],[440,354,-30]].map(([x,y,a],j)=>pair(j,x,y,a,.9,14)),{nuc:[nuc(400,300,115,{op:.55,wh:.25,nl:0}),nuc(400,300,115,{op:0,nl:0})],cen:[cen(255,225,{ast:.6}),cen(555,385,{ast:.6})],blobs:[blob(400,300,240,175,.5),blob(400,300,240,175,.5)],sp:.35,pf:[[0,1,.4]]}),
 // 2 metafase
 mk([175,250,352,427].map((y,j)=>pair(j,400,y,90,1,14)),{nuc:[nuc(400,300,115,{op:0,wh:0,nl:0}),nuc(400,300,115,{op:0,wh:0,nl:0})],cen:[cen(160,300,{ast:.8}),cen(640,300,{ast:.8})],blobs:[blob(400,300,260,180,.5),blob(400,300,260,180,.5)],sp:1,pf:[[0,1,.9]],lab:{...lab0,eq:1}}),
 // 3 anafase: søsterkromatidene trekkes fra hverandre, armene henger etter
 mk([175,250,352,427].map((y,j)=>[{...pair(j,0,y,90,1,0)[0],x:275,bx:26},{...pair(j,0,y,90,1,0)[1],x:525,bx:-26}]),{nuc:[nuc(275,300,70,{op:0,wh:0,nl:0}),nuc(525,300,70,{op:0,wh:0,nl:0})],cen:[cen(130,300,{ast:.8}),cen(670,300,{ast:.8})],blobs:[blob(330,300,215,168,.55),blob(470,300,215,168,.55)],sp:1,pf:[[0,1,1]]}),
 // 4 telofase
 mk([[258,282,-60],[292,288,-25],[262,318,25],[296,322,60]].map(([x,y,a],j)=>{const p=pair(j,0,0,a,.55,0);return[{...p[0],x,y},{...p[1],x:800-x,y,a:180-a}]}),{nuc:[nuc(272,300,72,{op:.85,wh:.45,nl:.3}),nuc(528,300,72,{op:.85,wh:.45,nl:.3})],cen:[cen(175,300,{op:.6,ast:.4}),cen(625,300,{op:.6,ast:.4})],blobs:[blob(255,300,150,150,.9),blob(545,300,150,150,.9)],sp:.15,pf:[[0,1,.5]],lab:{...lab0,fur:1}}),
 // 5 cytokinese – venstre dattercelle er nøyaktig interfasecellen i 0,6× størrelse
 mk(P0.map(([x,y,a],j)=>{const p=pair(j,240+.6*(x-400),300+.6*(y-300),a,0,3,{sc:.6});return[p[0],{...p[1],x:p[0].x+320}]}),{nuc:[nuc(240,300,66),nuc(560,300,66)],cen:[cen(318,234,{sc:.6}),cen(638,234,{sc:.6})],blobs:[blob(240,300,144,105,1),blob(560,300,144,105,1)],sp:0,lab:{...lab0,cap:1}})];
const TM=[{},
 {c:[0,.85],wh:[0,.7],nl:[0,.5],op:[.2,1],sp:[.4,1],pf:[.4,1]},
 {op:[0,.35],x:[.15,1],y:[.15,1],a:[.15,1],sp:[.2,.8],eq:[.6,1]},
 {eq:[0,.25],x:[.05,1],bx:[0,.4],blobs:[.15,1]},
 {c:[.2,1],op:[.3,1],wh:[.4,1],bx:[0,.5],sp:[0,.6],fur:[.5,1]},
 {blobs:[0,.75],c:[.3,1],wh:[.3,.9],fur:[0,.4],cap:[.6,1],sc:[.2,1],r:[.2,1]}];
// interfase: DNA-et kopieres (S-fasen) – søsterkromatiden og sentrosom nr. 2 dukker opp
const hold=(i,st,h,nat)=>{if(i!==0)return;const dup=nat?FF.sm(cl((h-.12)/.55)):1;
 st.chr.forEach((c,k)=>{if(k%2)c.op=dup});const a=st.cen[0],b=st.cen[1];b.x=a.x+(b.x-a.x)*dup;b.y=a.y+(b.y-a.y)*dup;st.lab.sf=nat?cl(h/.12)*(1-cl((h-.85)/.15)):0};
// fra cytokinese til ny interfase: zoom inn på venstre dattercelle, den høyre glir ut
const loopFx=(e,K)=>{const st=FF.copy(K[0]);hold(0,st,0,true);const s=.6+.4*FF.sm(e),cx=240+160*FF.sm(e);
 const k5=K[5],gh={blobs:[k5.blobs[1]],nuc:[k5.nuc[1]],chr:k5.chr.filter((_,k)=>k%2),cen:[k5.cen[1]],sp:0,pf:[],lab:lab0};
 return{st,tf:`translate(${f1(cx)},300) scale(${s.toFixed(4)}) translate(-400,-300)`,pre:`<g opacity="${f1(1-cl(e*1.4))}" transform="translate(${f1(FF.sm(e)*380)},0)">${FF.svg(gh,'cytokinese')}</g>`}};
const lab=st=>{const L_=st.lab;let s='';
 if(L_.eq>.01)s+=`<g opacity="${f1(L_.eq)}"><line x1="400" y1="118" x2="400" y2="482" stroke="#5d6472" stroke-width="1.5" stroke-dasharray="4 6"/><text x="400" y="110" text-anchor="middle" class="rl" style="font-size:11.5px">ekvatorplanet</text></g>`;
 if(L_.fur>.01)s+=`<g opacity="${f1(L_.fur)}"><text x="400" y="132" text-anchor="middle" class="rl" style="font-size:11.5px">kløvningsfure</text><path d="M400,138 L400,156 M394,150 L400,157 L406,150" stroke="#c0453b" stroke-width="2" fill="none"/></g>`;
 if(L_.sf>.01)s+=`<g opacity="${f1(L_.sf)}"><rect x="250" y="94" width="300" height="26" rx="13" fill="#fff" stroke="#e9a923" stroke-width="2"/><text x="400" y="112" text-anchor="middle" class="pt" style="font-size:12.5px">S-fasen: DNA-et kopieres</text></g>`;
 if(L_.cap>.01)s+=`<text x="790" y="590" text-anchor="end" class="pt" style="font-size:15px" opacity="${f1(L_.cap)}">To datterceller – hver med 2n = 4, likt som morcellen</text>`;
 return s};
S.mitose=()=>`<rect width="800" height="600" fill="#f7f3ec"/>${title('Mitose','Én celle blir til to genetisk like datterceller – her med 2n = 4 kromosomer')}<g id="ff">${FF.svg(K[0],'interfase',lab)}</g>`;
LIVE.mitose=fasefilm({tittel:'Mitose – fase for fase',keys:K,tm:TM,hold,loopFx,lab,steps:[
 {id:'interfase',t:'<b>Interfase.</b> Cellen vokser, og i S-fasen kopieres DNA-et: hvert kromosom får en søsterkromatid. Kromosomene er lange og tynne (kromatin), og sentrosomet dobles.'},
 {id:'profase',t:'<b>Profase.</b> Kromatinet kveiles til synlige kromosomer – hvert med to søsterkromatider. Kjernemembranen brytes ned, og spoletråder vokser ut fra sentrosomene.'},
 {id:'metafase',t:'<b>Metafase.</b> Kromosomene stiller seg på rekke i ekvatorplanet. Spoletråder fra hver pol fester seg i sentromeren.'},
 {id:'anafase',t:'<b>Anafase.</b> Søsterkromatidene trekkes fra hverandre mot hver sin pol. Nå regnes hver kromatid som et eget kromosom.'},
 {id:'telofase',t:'<b>Telofase.</b> Kromosomene når polene og pakkes ut igjen. Nye kjernemembraner dannes, og cellen begynner å snøres av.'},
 {id:'cytokinese',t:'<b>Cytokinese.</b> Cytoplasmaet deles. Resultatet er to datterceller med nøyaktig samme arvestoff som morcellen – og hver av dem kan starte en ny syklus.'}],
 map:{interfase:0,sentrioler:0,profase:1,metafase:2,spoletrader:2,anafase:3,telofase:4,cytokinese:5}});
}

/* ================= MEIOSE ================= */
{
// j0 = langt fra mor (rødt), j1 = langt fra far (blått), j2 = kort rødt, j3 = kort blått
const L=[86,86,52,52],COL=[CR,CB,CR,CB],SEG=[['',CB],[CR,''],['',''],['','']];
const ch=(j,k,x,y,a,c,o={})=>Object.assign({id:`${j}${k}`,x,y,a,c,L:L[j],col:COL[j],seg:SEG[j][k],xo:1,bx:0,by:0,sc:1,op:1,pl:'0'},o);
// et par søsterkromatider (dyade) rundt (x,y)
const dy=(j,x,y,a,c,gap,o={},pl=['0','0'])=>{const r=a*Math.PI/180,px=-Math.sin(r),py=Math.cos(r);return[0,1].map(k=>ch(j,k,x+px*gap/2*(k?-1:1),y+py*gap/2*(k?-1:1),a,c,{...o,pl:pl[k]}))};
// homologt par: fire kromatider på rad (ytre, indre, indre, ytre)
const tet=(jl,jr,x,y,a,c,pl)=>{const r=a*Math.PI/180,px=-Math.sin(r),py=Math.cos(r),o=[21,7,-7,-21];
 return[[jl,0],[jl,1],[jr,0],[jr,1]].map(([j,k],m)=>ch(j,k,x+px*o[m],y+py*o[m],a,c,{pl:pl[m<2?0:1]}))};
const cen=(x,y,o={})=>Object.assign({x,y,op:1,ast:.6,sc:1},o),nuc=(x,y,r,o={})=>Object.assign({x,y,r,op:1,wh:1,nl:0},o),blob=(x,y,rx,ry,w)=>({x,y,rx,ry,w});
const lab0={eq:0,ua:0,cap:0,xr:0,fur:0};
// rekkefølge i chr: j0A j0B j1A j1B j2A j2B j3A j3B
const order=list=>[...list].sort((a,b)=>a.id<b.id?-1:1);
const pf=(a,b,c)=>[[0,1,a],[0,2,b],[1,3,c]];
const K=[
 // 0 profase I: homologe par legger seg sammen (synapse) og bytter biter
 {chr:order([...tet(0,1,380,262,80,.85,['0','1']),...tet(3,2,500,350,110,.85,['0','1'])]),nuc:[nuc(440,300,132,{op:.65,wh:.45}),nuc(440,300,132,{op:0}),nuc(440,300,132,{op:0}),nuc(440,300,132,{op:0})],
  cen:[cen(330,170,{ast:.4}),cen(565,435,{ast:.4}),cen(330,170,{op:0}),cen(565,435,{op:0})],blobs:[0,1,2,3].map(()=>blob(440,300,250,175,.25)),sp:.25,pf:pf(.3,0,0),lab:{...lab0,xr:1}},
 // 1 metafase I: parene i ekvatorplanet – tilfeldig hvilken side mor/far havner på
 {chr:order([...tet(0,1,440,230,90,1,['0','1']),...tet(3,2,440,360,90,1,['0','1'])]),nuc:[0,1,2,3].map(()=>nuc(440,300,132,{op:0,wh:0})),
  cen:[cen(200,300,{ast:.8}),cen(680,300,{ast:.8}),cen(200,300,{op:0}),cen(680,300,{op:0})],blobs:[0,1,2,3].map(()=>blob(440,300,260,180,.25)),sp:1,pf:pf(1,0,0),lab:{...lab0,eq:1,ua:1}},
 // 2 anafase I: homologe skilles, søsterkromatidene henger sammen
 {chr:order([...dy(0,300,230,90,1,14),...dy(3,300,360,90,1,14),...dy(1,580,230,90,1,14,{},['1','1']),...dy(2,580,360,90,1,14,{},['1','1'])]),nuc:[0,1,2,3].map(k=>nuc(k%2?570:310,300,80,{op:0,wh:0})),
  cen:[cen(170,300,{ast:.8}),cen(710,300,{ast:.8}),cen(170,300,{op:0}),cen(710,300,{op:0})],blobs:[blob(370,300,215,168,.275),blob(510,300,215,168,.275),blob(370,300,215,168,.275),blob(510,300,215,168,.275)],sp:1,pf:pf(1,0,0),lab:{...lab0}},
 // 3 telofase I: to celler med n = 2, hvert kromosom har fortsatt to kromatider
 {chr:order([...dy(0,290,280,80,.8,14),...dy(3,335,312,100,.8,14),...dy(1,550,280,80,.8,14,{},['1','1']),...dy(2,595,312,100,.8,14,{},['1','1'])]),nuc:[nuc(310,295,82,{op:.45,wh:.4}),nuc(570,295,82,{op:.45,wh:.4}),nuc(310,295,82,{op:0}),nuc(570,295,82,{op:0})],
  cen:[cen(205,300,{op:.6,ast:.4}),cen(675,300,{op:.6,ast:.4}),cen(205,300,{op:0}),cen(675,300,{op:0})],blobs:[blob(310,295,140,140,.45),blob(570,295,140,140,.45),blob(310,295,140,140,.45),blob(570,295,140,140,.45)],sp:.15,pf:pf(.4,0,0),lab:{...lab0,fur:1}},
 // 4 meiose II: to celler, spolen står loddrett, søsterkromatidene skal fra hverandre
 {chr:order([...dy(0,272,290,180,1,14,{},['0','2']),...dy(3,360,290,180,1,14,{},['0','2']),...dy(1,532,290,180,1,14,{},['1','3']),...dy(2,620,290,180,1,14,{},['1','3'])]),nuc:[0,1,2,3].map(k=>nuc(k%2?570:310,290,70,{op:0,wh:0})),
  cen:[cen(310,178,{ast:.7}),cen(570,178,{ast:.7}),cen(310,402,{ast:.7}),cen(570,402,{ast:.7})],blobs:[blob(310,290,112,125,.5),blob(570,290,112,125,.5),blob(310,290,112,125,.5),blob(570,290,112,125,.5)],sp:1,pf:pf(0,1,1),lab:{...lab0}},
 // 5 resultat: fire haploide celler, alle forskjellige
 {chr:order([ch(0,0,290,168,70,.7,{sc:.75,pl:'0'}),ch(0,1,290,388,70,.7,{sc:.75,pl:'2'}),ch(1,0,550,168,70,.7,{sc:.75,pl:'1'}),ch(1,1,550,388,70,.7,{sc:.75,pl:'3'}),
   ch(2,0,590,180,110,.7,{sc:.75,pl:'1'}),ch(2,1,590,400,110,.7,{sc:.75,pl:'3'}),ch(3,0,330,180,110,.7,{sc:.75,pl:'0'}),ch(3,1,330,400,110,.7,{sc:.75,pl:'2'})]),
  nuc:[nuc(310,172,50,{nl:.5}),nuc(570,172,50,{nl:.5}),nuc(310,392,50,{nl:.5}),nuc(570,392,50,{nl:.5})],
  cen:[cen(310,178,{op:0}),cen(570,178,{op:0}),cen(310,402,{op:0}),cen(570,402,{op:0})],blobs:[blob(310,172,105,85,1),blob(570,172,105,85,1),blob(310,392,105,85,1),blob(570,392,105,85,1)],sp:0,pf:pf(0,0,0),lab:{...lab0,cap:1}}];
const TM=[{},
 {op:[0,.35],x:[.1,1],y:[.1,1],a:[.1,1],c:[0,.5],sp:[.2,.8],xr:[0,.3],eq:[.6,1],ua:[.7,1]},
 {eq:[0,.25],ua:[0,.25],x:[.05,1],blobs:[.15,1]},
 {c:[.2,1],op:[.3,1],wh:[.4,1],sp:[0,.6],blobs:[0,1],fur:[.5,1]},
 {blobs:[0,.6],op:[0,.5],wh:[0,.5],x:[.3,1],y:[.3,1],a:[.3,1],c:[.3,1],sp:[.35,.9],fur:[0,.3]},
 {x:[0,.5],y:[0,.5],a:[.3,.8],sp:[.3,.8],blobs:[.25,1],c:[.5,1],sc:[.5,1],op:[.6,1],wh:[.6,1],nl:[.7,1],cap:[.75,1]}];
// profase I: overkrysningen skjer mens vi ser på
const hold=(i,st,h,nat)=>{if(i!==0||!nat)return;const xo=FF.sm(cl((h-.25)/.4));st.chr.forEach(c=>{if(c.seg)c.xo=xo});st.lab.xr=cl(h/.25)};
// resultatet tones ut og en ny celle starter i profase I
const loopFx=(e,K)=>{if(e<.5)return{st:FF.copy(K[5]),op:1-e*2};const st=FF.copy(K[0]);hold(0,st,0,true);return{st,op:e*2-1}};
const lab=st=>{const L_=st.lab;let s='';
 if(L_.xr>.01)s+=P('overkrysning',`<g opacity="${f1(L_.xr)}"><circle cx="373" cy="230" r="26" fill="none" stroke="#f2b630" stroke-width="3" stroke-dasharray="5 4"/><text x="335" y="190" text-anchor="end" class="pt" style="fill:#a8761a">overkrysning</text><path d="M338,194 L356,212" stroke="#a8761a" stroke-width="2"/></g>`,{nl:1});
 if(L_.eq>.01)s+=`<g opacity="${f1(L_.eq)}"><line x1="440" y1="138" x2="440" y2="462" stroke="#5d6472" stroke-width="1.5" stroke-dasharray="4 6"/><text x="440" y="130" text-anchor="middle" class="rl" style="font-size:11.5px">ekvatorplanet</text></g>`;
 if(L_.ua>.01)s+=P('uavhengig',`<text x="790" y="590" text-anchor="end" class="rl" style="font-size:12.5px" opacity="${f1(L_.ua)}">Parene stiller seg tilfeldig: rød/blå kan havne på hver sin side</text>`,{nl:1});
 if(L_.fur>.01)s+=`<text x="440" y="150" text-anchor="middle" class="rl" style="font-size:11.5px" opacity="${f1(L_.fur)}">kløvningsfure</text>`;
 if(L_.cap>.01)s+=`<text x="790" y="590" text-anchor="end" class="pt" style="font-size:15px" opacity="${f1(L_.cap)}">Fire haploide celler (n = 2) – alle genetisk forskjellige</text>`;
 return s};
S.meiose=()=>`<rect width="800" height="600" fill="#f7f3ec"/>${title('Meiose','Reduksjonsdeling: 2n → n. Gir kjønnsceller som er genetisk ulike')}<g id="ff">${FF.svg(K[0],'homologe',lab)}</g>`;
LIVE.meiose=fasefilm({tittel:'Meiose – to delinger',keys:K,tm:TM,hold,loopFx,lab,steps:[
 {id:'homologe',t:'<b>Profase I.</b> Homologe kromosomer – ett fra mor (rødt) og ett fra far (blått) – legger seg sammen. Kromatider bytter biter: <b>overkrysning</b>.'},
 {id:'meioseI',t:'<b>Metafase I.</b> Parene stiller seg i ekvatorplanet. Hvilken side mors og fars kromosom havner på, er tilfeldig (uavhengig fordeling).'},
 {id:'meioseI',t:'<b>Anafase I.</b> De homologe kromosomene trekkes fra hverandre. Søsterkromatidene henger fortsatt sammen.'},
 {id:'meioseI',t:'<b>Telofase I.</b> To celler med halvt kromosomtall (n). Hvert kromosom består fortsatt av to kromatider.'},
 {id:'meioseII',t:'<b>Meiose II.</b> Begge cellene deler seg igjen, nesten som i mitose – spolen står nå på tvers. Søsterkromatidene skilles.'},
 {id:'haploid',t:'<b>Resultat.</b> Fire haploide celler (n), alle genetisk forskjellige. Hos mennesker har hver kjønnscelle 23 kromosomer.'}],
 map:{homologe:0,overkrysning:0,uavhengig:1,meioseI:1,meioseII:4,haploid:5}});
}
