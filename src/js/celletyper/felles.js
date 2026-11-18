/* ====================== NYE CELLETYPER + PROTEINFOLDING ====================== */
DEFS=DEFS.replace('</defs>',[
 ['gNeur','#fdeedd','#f3cfa6','#d39a68'],['gNeur2','#eef3fb','#cfdcf0','#93acd3'],['gHbA','#fde0dc','#f2a7a0','#cf6e66'],
 ['gAaH','#fff1c4','#f2c14e','#c48a12'],['gAaP','#d6f3ef','#5fc4b8','#2b8c80'],['gAaPos','#d2e3f8','#5b93d6','#2c5c9e'],['gAaNeg','#fbd3cf','#e66a5e','#a8352c'],['gAaC','#fdf6b8','#e2cc3a','#9c8814'],
 ['gBact','#fdfbef','#f1ecd0','#d8cc9c'],['gEgg','#fffaf0','#fbefd2','#ecd9a8'],['gSperm','#f4ecfb','#d9c6ef','#a98bd0'],['gMid','#fde7d4','#f2b58a','#c97a45']
].map(([k,a,b,c])=>RG(k,a,b,c)).join('')+
 `<radialGradient id="gRBC2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f7c3bb"/><stop offset=".5" stop-color="#ea7e72"/><stop offset=".86" stop-color="#d2493f"/><stop offset="1" stop-color="#a8352c"/></radialGradient>`+
 `<radialGradient id="gCore" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd54a" stop-opacity=".6"/><stop offset=".7" stop-color="#ffd54a" stop-opacity=".25"/><stop offset="1" stop-color="#ffd54a" stop-opacity="0"/></radialGradient>`+
 LGv('gMusL','#d98a82','#f6cdc7','#c4706a')+LGv('gFib','#f3b3ab','#fbe0dc','#dc8b83')+LGv('gRBCs','#c94035','#f19a90','#b8382e')+'</defs>');
const mov2=(path,dur,beg,inner)=>`<g opacity="0"><animateMotion path="${path}" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>${inner}</g>`;
const pl=p=>'M'+p.map(q=>f1(q[0])+','+f1(q[1])).join(' L');
