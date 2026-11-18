/* ---------------- SÆDCELLE ---------------- */
S.saedcelle=()=>{let s=`<rect width="800" height="600" fill="#f6f1f7"/>`;
 let eg=`<circle cx="1060" cy="300" r="394" fill="#efe1f3" opacity=".85"/><circle cx="1060" cy="300" r="372" fill="url(#gEgg)" stroke="#d8c08a" stroke-width="3"/>`;
 const R=rng(5);for(let i=0;i<9;i++){const a=(141+i*10)*Math.PI/180,r=424+R()*12;eg+=`<path d="${blob(1060+r*Math.cos(a),300+r*Math.sin(a),17,R,7,.3)}" fill="#f6dcc1" stroke="#c9895a" stroke-width="1.5"/>`}
 s+=P('eggcelle',eg,{lx:744,ly:300});
 const tl=ph=>{let d='M330,300';for(let x=324;x>=24;x-=6){const a=(330-x)/306;d+=` L${x},${f1(300+(2+a*30)*Math.sin((330-x)/30+ph))}`}return d};
 const tv=[0,1.57,3.14,4.71,6.283].map(p=>tl(-p)).join(';');
 s+=`<g><animateTransform attributeName="transform" type="translate" values="0,0;4,-2;0,0;4,2;0,0" dur="1.2s" repeatCount="indefinite"/>`;
 s+=P('hale',`<path d="${tl(0)}" fill="none" stroke="#6a4c98" stroke-width="7" stroke-linecap="round"><animate attributeName="d" values="${tv}" dur=".6s" repeatCount="indefinite"/></path><path d="${tl(0)}" fill="none" stroke="#d9c6ef" stroke-width="2.6" stroke-linecap="round"><animate attributeName="d" values="${tv}" dur=".6s" repeatCount="indefinite"/></path><path d="${tl(0)}" class="hit"/>`,{lx:150,ly:240});
 let mp=`<rect x="326" y="288" width="106" height="24" rx="11" fill="url(#gMid)" stroke="#a9541f" stroke-width="2"/>`;for(let x=332;x<428;x+=8)mp+=`<path d="M${x},289.5 L${x+7},310.5" stroke="#a9541f" stroke-width="1.6" opacity=".7"/>`;
 s+=P('midtstykke',mp,{lx:378,ly:340});
 s+=P('sentrioler',`<rect x="429" y="293" width="13" height="14" rx="3" fill="url(#gCent)" stroke="#5b4a9a" stroke-width="1.2"/>`,{nl:1});
 s+=`<g filter="url(#sh)"><path d="M440,300 C440,270 470,262 512,266 C550,270 572,284 572,300 C572,316 550,330 512,334 C470,338 440,330 440,300Z" fill="url(#gSperm)" stroke="#5b3f86" stroke-width="2.4"/></g>`;
 s+=P('kjerne',`<ellipse cx="494" cy="300" rx="44" ry="26" fill="url(#gChrom)" stroke="#4a2f73" stroke-width="1.5"/>${[[470,292,500,300,486,310],[488,288,516,296,508,312],[476,306,498,316,520,304]].map(([a,b,c,d,e,f])=>`<path d="M${a},${b} Q${c},${d} ${e},${f}" fill="none" stroke="#c9b3e6" stroke-width="1.4" opacity=".7"/>`).join('')}`,{lx:492,ly:305});
 s+=P('akrosom',`<path d="M520,266.6 C553,271 572,285 572,300 C572,315 553,329 520,333.4 C536,322 544,312 544,300 C544,288 536,278 520,266.6Z" fill="#bfe3e0" stroke="#2f8f7f" stroke-width="2" opacity=".95"/>`,{lx:566,ly:252});
 s+=`</g>`;
 s+=`<text x="24" y="560" class="rl" style="font-size:12.5px;font-weight:600">Hodet er ca. 5 µm, hele sædcellen ca. 55 µm. Eggcellen er ca. 100 µm – i virkeligheten</text><text x="24" y="578" class="rl" style="font-size:12.5px;font-weight:600">omtrent 20 ganger så bred som sædcellehodet (figuren er ikke i målestokk).</text>`;
 s+=badge(92,40,'Meiose ›','meiose',100);
 return s};
