# Notater for AI-assistenter

- Språket i grensesnitt og innhold er norsk bokmål. Faglig nivå: videregående biologi.
- Kildene ligger i `src/`. `dist/` er generert av `node bygg.mjs` og sjekkes ikke inn.
- JS-filene er klassiske skript (ikke ES-moduler) som deler globale navn (`S`, `LIVE`, `N`, `DEEP`, hjelpefunksjoner). Rekkefølgen i `src/index.html` er den eneste kilden til lastrekkefølge; bygget slår dem sammen til ett `<script>` i samme rekkefølge. Ikke bruk `import`/`export` – siden skal virke fra `file://`.
- Ingen eksterne avhengigheter i selve siden (ingen CDN, ingen Google Fonts) – den nedlastede fila må virke uten nett.
- Noen scener i `scener/grunnscener.js` overskrives av nyere versjoner i `scener/detaljerte.js` (siste tilordning til `S.<id>` vinner).
- Kjør `npm test` etter endringer: den tegner alle scener i både `src/` og `dist/` og feiler på JS-feil eller brutte `k`-referanser.
- Mitose og meiose (`levende/celledeling-film.js`) er «faser som film»: hver fase er en nøkkeltilstand med bare tall, og `fasefilm()` interpolerer mellom dem. Cellens omriss er metaballs (`FF.blobPath`). Vil du endre en fase, endre nøkkeltilstanden – ikke tegn egne SVG-bilder per fase.
- Øyet (`celletyper/oye*.js`): `oye.js` har øye, netthinne, stav og tapp; `oye-kaskade.js` har fototransduksjonssimuleringen og fasefilmene for rodopsin og G-proteinsyklusen (`fasefilm({svg:…})` med egen tegnefunksjon); `oye-innhold.js` har tekstene. Feltet `kt` på en node overstyrer nivåteksten (f.eks. «Organ»).
