/* ---------------- BAKTERIE ---------------- */
const rrect=(x,y,w,h,r)=>`M${x+r},${y} H${x+w-r} A${r},${r} 0 0 1 ${x+w-r},${y+h} H${x+r} A${r},${r} 0 0 1 ${x+r},${y}Z`;
S.bakterie=()=>{
 let s=`<rect width="800" height="600" fill="#eef5ea"/><rect width="800" height="600" fill="url(#pGranG)" opacity=".5"/><g id="bBody">`;
 const fl=ph=>{let d='M650,300';for(let x=656;x<=796;x+=6){const a=(x-650)/146;d+=` L${x},${f1(300+a*26*Math.sin((x-650)/22-ph))}`}return d};
 s+=P('flagell',`<circle cx="636" cy="300" r="7" fill="#c9a96e" stroke="#8a6d3b" stroke-width="1.5"/><path d="${fl(0)}" fill="none" stroke="#8a6d3b" stroke-width="3.4" stroke-linecap="round"><animate attributeName="d" values="${[0,1.57,3.14,4.71,6.283].map(fl).join(';')}" dur=".7s" repeatCount="indefinite"/></path><path d="${fl(0)}" class="hit"/>`,{lx:730,ly:248});
 let pi='';[[190,194,-1],[262,194,-1],[340,194,-1],[420,194,-1],[500,194,-1],[575,194,-1],[220,406,1],[300,406,1],[380,406,1],[460,406,1],[540,406,1],[600,406,1]].forEach(([x,y,d],i)=>{const x2=x+(i%3-1)*8,y2=y+d*48;pi+=`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#8a9a5a" stroke-width="2.2" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="2.4" fill="#6f7f3f"/>`});
 pi+=`<line x1="118" y1="268" x2="74" y2="252" stroke="#8a9a5a" stroke-width="2.2" stroke-linecap="round"/><line x1="118" y1="332" x2="74" y2="350" stroke="#8a9a5a" stroke-width="2.2" stroke-linecap="round"/>`;
 s+=P('pili',pi,{lx:300,ly:132});
 s+=P('kapsel',`<path d="${rrect(96,176,568,248,124)}" fill="#e3f0d6" fill-opacity=".85" stroke="#9fbf7a" stroke-width="2" stroke-dasharray="6 5"/>`,{lx:380,ly:440});
 s+=P('bakterievegg',`<g id="bWall"><path d="${rrect(114,194,532,212,106)}" fill="none" stroke="#6f8f3e" stroke-width="11"/><path d="${rrect(114,194,532,212,106)}" fill="none" stroke="#c6dca0" stroke-width="4" stroke-dasharray="3 4"/></g>`,{lx:610,ly:196});
 s+=P('cytoplasma',`<path d="${rrect(130,210,500,180,90)}" fill="url(#gBact)"/>`,{lx:196,ly:300});
 const R=rng(23),lp=[];for(let i=0;i<30;i++){const a=i/30*6.283,k=1+(R()-.5)*.5;lp.push([380+150*k*Math.cos(a),300+52*k*Math.sin(a)])}
 let nu=`<path d="${smooth(lp)}" fill="#e6dcf3" opacity=".55"/><path d="${smooth(lp)}" fill="none" stroke="#7d5ba6" stroke-width="2.2"/>`;
 for(let k=0;k<6;k++){let x=300+R()*160,y=280+R()*40;const p=[[x,y]];for(let j=0;j<6;j++){x=Math.max(255,Math.min(505,x+(R()-.5)*60));y=Math.max(264,Math.min(336,y+(R()-.5)*34));p.push([x,y])}nu+=`<path d="${smooth(p,false)}" fill="none" stroke="#9a7bcb" stroke-width="1.8"/>`}
 s+=P('nukleoid',nu,{lx:380,ly:304});
 const PL=[[190,262],[578,342],[572,262],[204,342]];
 s+=P('plasmid',PL.map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="13" ry="9" fill="none" stroke="#9a7bcb" stroke-width="2.4"/><path d="M${x-8},${y-3} Q${x},${y+5} ${x+8},${y-3}" fill="none" stroke="#9a7bcb" stroke-width="1.2"/>`).join(''),{lx:578,ly:236});
 const inR=(x,y)=>{const c=Math.max(222,Math.min(538,x));return Math.hypot(x-c,y-300)<80};
 s+=P('ribosom',scatter(9,60,(x,y)=>inR(x,y)&&((x-380)/162)**2+((y-300)/62)**2>1&&PL.every(([a,b])=>Math.hypot(x-a,y-b)>20)).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" class="hitc"/><circle cx="${x}" cy="${y}" r="2.5" fill="#3a5a92"/>`).join(''),{lx:250,ly:372});
 s+=P('membran',`<path id="bMem" d="${rrect(130,210,500,180,90)}" fill="none" stroke="#b77945" stroke-width="4"/>`,{lx:470,ly:226});
 s+=`</g><g id="bBurst" opacity="0" style="pointer-events:none">${[[650,210,26],[680,392,22],[118,400,20],[560,170,18]].map(([x,y,r],i)=>`<path d="${blob(x,y,r,rng(i+3),7,.4)}" fill="url(#gBact)" stroke="#b77945" stroke-width="1.5" stroke-dasharray="4 4"/>`+scatter(30+i,5,(a,b)=>Math.hypot(a-x,b-y)<r*.7).map(([a,b])=>`<circle cx="${a}" cy="${b}" r="2.4" fill="#3a5a92"/>`).join('')).join('')}</g>`;
 s+=`<text x="24" y="560" class="rl" style="font-size:12.5px;font-weight:600">Prokaryot celle: ingen kjerne og ingen membranomsluttede organeller.</text><text x="24" y="578" class="rl" style="font-size:12.5px;font-weight:600">En typisk bakterie er ca. 2 µm – omtrent en tidel av en dyrecelle.</text>`;
 return s};
LIVE.bakterie={pos:'tr',ctrl:`<div style="width:236px"><div class="cx-title">Antibiotika</div><label class="cx-tog"><input type="checkbox" id="bPen"> Gi penicillin</label><div class="cx-note" id="bN"></div></div>`,
init(){const w=q('#bWall'),b=q('#bBody'),m=q('#bMem'),bu=q('#bBurst'),nt=cq('#bN');let on=false,u=0;
 const set=()=>{const sw=1+.07*ez(cl(u/2));b.setAttribute('transform',`translate(380,300) scale(${sw.toFixed(3)}) translate(-380,-300)`);w.style.opacity=1-.8*cl(u/1.5);const br=u>2.2;m.setAttribute('stroke-dasharray',br?'14 10':'none');bu.setAttribute('opacity',br?f1(cl((u-2.2)/.6)):0);
  nt.innerHTML=!on?'Bakterien har en sterk vegg av peptidoglykan som tåler vanntrykket inne i cellen.':br?'<b>Cellen sprekker.</b> Uten en hel vegg presses vann inn ved osmose til membranen revner. Våre celler har ikke peptidoglykan – derfor tåler vi penicillin.':'<b>Penicillin</b> hindrer bakterien i å bygge nye bånd i peptidoglykanet. Veggen svekkes mens bakterien vokser, og vann strømmer inn.'};
 cq('#bPen').onchange=e=>{on=e.target.checked;if(!on)u=0;set()};set();
 return loop(dt=>{if(on&&u<3){u+=dt*(ANIM?1:10);set()}})}};
