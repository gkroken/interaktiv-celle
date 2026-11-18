/* ---------- cell division ---------- */
const CR='#d1495b',CB='#3e7cc4';
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

