/* ---------- osmosis & fermentation ---------- */
S.osmose=()=>{
 let s=`<rect width="800" height="600" fill="#eef6fb"/>${title('Osmose','Vann går gjennom membranen mot siden med høyest konsentrasjon av løste stoffer')}`;
 s+=`<g id="osOut"></g><g id="osCell"></g><g id="osW"></g>`;
 const chip=(x,id,t,c)=>P(id,`<g transform="translate(${x},104)"><rect x="-82" y="-16" width="164" height="32" rx="16" fill="#fff" stroke="${c}" stroke-width="2"/><text y="5" text-anchor="middle" class="pt" style="fill:${c}">${t}</text></g>`,{nl:1});
 s+=chip(170,'hypoton','Hypotonisk','#3e7cc4')+chip(400,'isoton','Isotonisk','#5d6472')+chip(630,'hyperton','Hypertonisk','#c0453b');
 s+=P('turgor',`<rect x="0" y="0" width="1" height="1" class="hitc"/>`,{nl:1})+P('plasmolyse',`<rect x="0" y="0" width="1" height="1" class="hitc"/>`,{nl:1});
 return s};

S.gjaering=()=>{
 let s=`<rect width="800" height="600" fill="url(#gCyto)"/><rect width="800" height="600" fill="url(#pGran)"/>${title('Gjæring – energi uten oksygen','Anaerob respirasjon: glykolysen fortsetter fordi NAD⁺ blir gjenvunnet')}`;
 s+=P('cytoplasma',SP('1 2 3 4',`<g transform="translate(400,120)" filter="url(#sh)"><rect x="-130" y="-30" width="260" height="60" rx="16" fill="#fff" stroke="#c4683a" stroke-width="2.5"/><text y="-6" text-anchor="middle" class="pt" style="font-size:14px">Glukose → 2 pyruvat</text><text y="13" text-anchor="middle" class="rl" style="font-size:12px">glykolysen ›  (+2 ATP)</text></g>`),{nl:1});
 s+=P('nadretur',SP('1 2',pillP(620,120,'NAD⁺ → NADH','#4c74a8'))+SP('2',`<text x="620" y="160" text-anchor="middle" style="font-size:12.5px;font-weight:700;fill:#c0453b">Uten O₂: NAD⁺ går tomt!</text>`)+SP('3 4',`<path d="M150,470 C40,420 60,140 268,128" fill="none" stroke="#4c74a8" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#arD)"><animate attributeName="stroke-dashoffset" values="26;0" dur="1s" repeatCount="indefinite"/></path><path d="M650,470 C760,420 740,140 532,128" fill="none" stroke="#4c74a8" stroke-width="3" stroke-dasharray="8 5" marker-end="url(#arD)"><animate attributeName="stroke-dashoffset" values="26;0" dur="1s" repeatCount="indefinite"/></path><text x="56" y="300" class="pt" style="fill:#2c4f80;font-size:12px">NAD⁺</text><text x="744" y="300" text-anchor="end" class="pt" style="fill:#2c4f80;font-size:12px">NAD⁺</text>`),{nl:1});
 s+=P('pyruvat',SP('1 2 3 4',chainM(400,215,3)+molLabel(400,255,'Pyruvat','3 C')),{nl:1});
 s+=SP('3 4',flowArrow('M360,230 Q260,270 220,315')+flowArrow('M440,230 Q540,270 580,315'));
 s+=P('melkesyregjaering',SP('3',`<g transform="translate(200,400)"><rect x="-150" y="-80" width="300" height="160" rx="18" fill="#fff" stroke="#c0453b" stroke-width="2.5" filter="url(#sh)"/><text y="-52" text-anchor="middle" class="pt" style="fill:#a8352c;font-size:14.5px">Melkesyregjæring</text>${chainM(-60,-10,3)}<text x="0" y="-6" text-anchor="middle" style="font-size:18px">→</text>${chainM(62,-10,3)}<text x="-60" y="28" text-anchor="middle" class="rl" style="font-size:12px">pyruvat</text><text x="62" y="28" text-anchor="middle" class="rl" style="font-size:12px">laktat (melkesyre)</text><text y="54" text-anchor="middle" class="rl" style="font-size:12px">NADH → NAD⁺ · muskler, yoghurtbakterier</text></g>`),{nl:1});
 s+=P('alkoholgjaering',SP('4',`<g transform="translate(600,400)"><rect x="-150" y="-80" width="300" height="160" rx="18" fill="#fff" stroke="#7d5ba6" stroke-width="2.5" filter="url(#sh)"/><text y="-52" text-anchor="middle" class="pt" style="fill:#5b3f86;font-size:14.5px">Alkoholgjæring</text>${chainM(-75,-10,3,{dx:20})}<text x="-22" y="-6" text-anchor="middle" style="font-size:18px">→</text>${chainM(30,-10,2)}<text x="88" y="-4" class="pt" style="font-size:12.5px">+ CO₂</text><text x="-75" y="28" text-anchor="middle" class="rl" style="font-size:12px">pyruvat</text><text x="30" y="28" text-anchor="middle" class="rl" style="font-size:12px">etanol (2 C)</text><text y="54" text-anchor="middle" class="rl" style="font-size:12px">NADH → NAD⁺ · gjær: brød, øl, vin</text></g>`),{nl:1});
 s+=P('energiutbytte',`<g data-s="5" data-hide="1"><g transform="translate(400,330)"><rect x="-230" y="-120" width="460" height="230" rx="18" fill="#fff" stroke="#e3dccd" stroke-width="2" filter="url(#sh)"/><text x="-206" y="-88" class="pt" style="font-size:15px">ATP per glukose</text><rect x="-206" y="-60" width="${f1(380*30/32)}" height="34" rx="8" fill="url(#gProtG)"/><text x="-196" y="-37" class="pt">Med O₂ (aerob): ca. 30–32 ATP</text><rect x="-206" y="-10" width="${f1(380*2/32)}" height="34" rx="8" fill="#c0453b"/><text x="-176" y="13" class="pt">Gjæring (anaerob): 2 ATP</text><text x="-206" y="60" class="rl" style="font-size:12.5px">Gjæring er rask, men gir bare en liten del av energien.</text><text x="-206" y="80" class="rl" style="font-size:12.5px">Resten sitter igjen i laktat eller etanol.</text></g></g>`,{nl:1});
 return s};

{const w=(k,f)=>{const o=S[k];S[k]=()=>o()+f()};
 w('dyrecelle',()=>badge(92,40,'Celledeling ›','cellesyklus',130));
 w('plantecelle',()=>badge(110,24,'Celledeling ›','cellesyklus',130));
 w('kjerne',()=>badge(92,40,'Celledeling ›','cellesyklus',130));
 w('membran',()=>badge(718,560,'Osmose ›','osmose',100));
 w('cytoplasma',()=>badge(690,582,'Uten O₂: gjæring ›','gjaering',170));
 w('kloroplast',()=>badge(110,36,'C3, C4 og CAM ›','fotosynteseformer',160));
 w('tylakoid',()=>badge(300,28,'Z-skjemaet ›','zskjema',124));}
