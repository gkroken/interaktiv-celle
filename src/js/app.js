/* ---------- state & rendering ---------- */
const svg=document.getElementById('svg'),stage=document.getElementById('stage'),tip=document.getElementById('tip'),ctrl=document.getElementById('ctrl');
let cleanup=null,onSel=null,deepOpen=false;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let path=['dyrecelle'],sel=null,busy=false;
const top_=()=>path[path.length-1];

function draw(){if(cleanup){cleanup();cleanup=null}blocked=false;onSel=null;svg.setAttribute('viewBox','0 0 800 600');svg.innerHTML=DEFS+upgrade(S[top_()]());const L=LIVE[top_()];ctrl.innerHTML=L&&L.ctrl||'';ctrl.dataset.pos=L&&L.pos||'';ctrl.hidden=!(L&&L.ctrl);ctrl.style.opacity=1;if(L&&L.init)cleanup=L.init()||null;syncSMIL();if(document.getElementById('lbls').checked)drawLabels();mark()}
function svgRect(el){const r=el.getBoundingClientRect(),m=svg.getScreenCTM().inverse();const a=new DOMPoint(r.left,r.top).matrixTransform(m),b=new DOMPoint(r.right,r.bottom).matrixTransform(m);return{x:a.x,y:a.y,w:b.x-a.x,h:b.y-a.y}}
function drawLabels(){const seen={};let g='<g id="labs">';svg.querySelectorAll('.part').forEach(p=>{const id=p.dataset.go;if(seen[id]||p.dataset.nl)return;seen[id]=1;let x,y;if(p.dataset.lx!=null){x=+p.dataset.lx;y=+p.dataset.ly}else{const el=p.querySelector(':scope > :not(.hit):not(.hitc)')||p;const r=svgRect(el);x=r.x+r.w/2;y=r.y+r.h/2}g+=`<text x="${f1(x)}" y="${f1(y+5)}" text-anchor="middle" class="lab">${N[id].t}</text>`});svg.insertAdjacentHTML('beforeend',g+'</g>')}
function mark(){svg.querySelectorAll('.part').forEach(p=>p.classList.toggle('sel',p.dataset.go===sel))}
function enter(from){svg.style.transition='none';svg.style.opacity=0;svg.style.transform=`scale(${from})`;svg.getBoundingClientRect();svg.style.transition='opacity .35s ease, transform .5s cubic-bezier(.2,.8,.2,1)';svg.style.opacity=1;svg.style.transform='none'}
function render(mode){draw();renderInfo();if(!reduce&&mode)enter(mode==='in'?.86:1.18)}
function anim(from,to,ms,step,done){const t0=performance.now();const e=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;(function f(now){const t=Math.min(1,(now-t0)/ms),k=e(t);const v=from.map((a,i)=>a+(to[i]-a)*k);svg.setAttribute('viewBox',v.map(f1).join(' '));step(t);if(t<1)requestAnimationFrame(f);else done()})(t0)}
function go(id,el){if(busy||!N[id])return;
 if(!N[id].s){sel=id;mark();renderInfo();if(onSel)onSel(id);return}
 sel=null;
 if(reduce||!el){path.push(id);render('in');return}
 busy=true;tip.style.opacity=0;ctrl.style.opacity=0;const b=svgRect(el);const w=Math.max(b.w*1.7,b.h*1.7*4/3,90),h=w*.75,cx=b.x+b.w/2,cy=b.y+b.h/2;
 svg.style.transition='none';svg.style.transform='none';
 anim([0,0,800,600],[cx-w/2,cy-h/2,w,h],620,t=>{svg.style.opacity=t>.55?1-(t-.55)/.45:1},()=>{path.push(id);render('in');busy=false})}
function up(n){if(busy)return;if(n==null){if(sel){sel=null;mark();renderInfo();return}if(path.length<2)return;n=path.length-2}
 if(n>=path.length-1&&!sel)return;
 sel=null;if(n===path.length-1){mark();renderInfo();return}
 if(reduce){path=path.slice(0,n+1);render();return}
 busy=true;ctrl.style.opacity=0;svg.style.transition='opacity .22s ease, transform .22s ease';svg.style.opacity=0;svg.style.transform='scale(.8)';
 setTimeout(()=>{path=path.slice(0,n+1);render('out');busy=false},220)}

function renderInfo(){
 const cur=N[top_()],shown=sel?N[sel]:cur,lv=shown.l;
 document.getElementById('ladder').innerHTML=LV.map((n,i)=>`<li class="${i===lv?'on':i<lv?'past':''}">${n}</li>`).join('');
 let h='';
 if(sel)h+=`<button class="backlink" data-up="1">← ${cur.t}</button>`;
 h+=`<div class="kicker">${LV[lv]}${sel?' · del av '+cur.t.toLowerCase():''}</div><h2>${shown.t}</h2><p>${shown.x}</p>`;
 if(shown.f)h+=`<h3>Viktig å vite</h3><ul>${shown.f.map(x=>`<li>${x}</li>`).join('')}</ul>`;
 if(shown.v)h+=`<div class="fun"><b>Visste du?</b> ${shown.v}</div>`;
 if(shown.d)h+=`<details class="deep"${deepOpen?' open':''}><summary>Fordypning</summary><p>${shown.d}</p></details>`;
 if(sel&&!N[sel].s)h+=`<p style="margin-top:12px;color:var(--mut);font-size:14px">Dette er det dypeste nivået vi går for denne delen.</p>`;
 h+=`<h3>${sel?'Andre deler her':'Klikk deg videre'}</h3><div class="kids">${cur.k.map(k=>{const z=!!N[k].s;return `<button class="kid${z?' zoom':''}${k===sel?' sel':''}" data-k="${k}"><span class="ic">${z?'+':'i'}</span><span class="t">${N[k].t}</span>${z?'<span class="z">Zoom inn →</span>':''}</button>`}).join('')}</div>`;
 if(['dna','nukleotid'].includes(top_()))h+=`<div class="legend">${['A','T','C','G'].map(b=>`<span><i style="background:${col[b]};color:#fff">${b}</i>${{A:'adenin',T:'tymin',C:'cytosin',G:'guanin'}[b]}</span>`).join('')}</div>`;
 document.getElementById('info').innerHTML=h;
 // crumbs
 let c='';path.forEach((p,i)=>{const last=i===path.length-1&&!sel;c+=(i?'<span class="sep">›</span>':'')+(last?`<span class="cur">${N[p].t}</span>`:`<button data-i="${i}">${N[p].t}</button>`)});
 if(sel)c+=`<span class="sep">›</span><span class="leaf">${N[sel].t}</span>`;
 document.getElementById('crumbs').innerHTML=c;
 document.getElementById('back').disabled=path.length<2&&!sel;
 document.querySelectorAll('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.root===path[0]));
 syncHash();
}
function hov(id){svg.querySelectorAll('.part').forEach(p=>p.classList.toggle('hov',p.dataset.go===id));document.querySelectorAll('.kid').forEach(b=>b.classList.toggle('hov',b.dataset.k===id))}

/* ---------- events ---------- */
svg.addEventListener('click',e=>{const p=e.target.closest('.part');if(!p)return;go(p.dataset.go,e.target)});
svg.addEventListener('mousemove',e=>{const p=e.target.closest('.part');if(!p||busy){tip.style.opacity=0;hov(null);return}const id=p.dataset.go;hov(id);const r=stage.getBoundingClientRect();tip.innerHTML=`${N[id].t}<small>${N[id].s?'Klikk for å zoome inn':'Klikk for å lese mer'}</small>`;let x=e.clientX-r.left+14,y=e.clientY-r.top+14;if(x>r.width-190)x-=200;tip.style.left=x+'px';tip.style.top=y+'px';tip.style.opacity=1});
svg.addEventListener('mouseleave',()=>{tip.style.opacity=0;hov(null)});
document.getElementById('info').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){const k=b.dataset.k;const p=svg.querySelector(`.part[data-go="${k}"]`);const el=p?(p.querySelector(':scope > :not(.hit):not(.hitc)')||p):null;go(k,el);return}if(e.target.closest('[data-up]'))up()});
document.getElementById('info').addEventListener('toggle',e=>{if(e.target.classList&&e.target.classList.contains('deep'))deepOpen=e.target.open},true);
document.getElementById('info').addEventListener('mouseover',e=>{const b=e.target.closest('[data-k]');hov(b?b.dataset.k:null)});
document.getElementById('crumbs').addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)up(+b.dataset.i)});
document.getElementById('back').addEventListener('click',()=>up());
document.getElementById('lbls').addEventListener('change',e=>{if(e.target.checked)drawLabels();else{const g=document.getElementById('labs');g&&g.remove()}});
document.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{if(busy)return;path=[b.dataset.root];sel=null;render('in')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')up()});
const animBtn=document.getElementById('animBtn');const setAB=()=>{animBtn.innerHTML=ANIM?'❚❚ Stopp bevegelse':'▶ Start bevegelse'};setAB();animBtn.addEventListener('click',()=>{ANIM=!ANIM;setAB();syncSMIL()});

/* ---------- lenker til en bestemt visning (#nervecelle/synapse) ---------- */
// Adressen oppdateres når man navigerer, slik at en lenke eller et bokmerke
// åpner akkurat samme del – også i den nedlastede fila.
function syncHash(){const h='#'+path.concat(sel?[sel]:[]).join('/');if(location.hash!==h)try{history.replaceState(null,'',h)}catch(e){}}
function fromHash(){
 const ids=decodeURIComponent(location.hash.slice(1)).split('/').filter(Boolean);
 if(!ids.length||!N[ids[0]]||!N[ids[0]].s||N[ids[0]].l!==0)return false;
 const p=[ids[0]];let s=null;
 for(const id of ids.slice(1)){const cur=N[p[p.length-1]];if(s||!N[id]||!cur.k||!cur.k.includes(id))break;if(N[id].s)p.push(id);else s=id}
 path=p;sel=s;return true}
addEventListener('hashchange',()=>{if(!busy&&fromHash())render()});

/* nedlastingsknappen gir ingen mening når siden allerede er lastet ned */
if(location.protocol==='file:')document.getElementById('foot').hidden=true;

fromHash();
render();
