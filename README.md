# Cellen – zoom deg inn

Interaktiv celle-utforsker for biologiundervisning (norsk bokmål). Velg en celletype og klikk deg nedover – fra hel celle via organeller og strukturer til makromolekyler og molekyler.

**Celletyper:** dyrecelle, plantecelle, nervecelle, muskelcelle, rød blodcelle, sædcelle og bakterie.

**Levende modeller blant annet:**
- Nerveimpuls med og uten myelin, synapsen trinn for trinn og aksjonspotensialet med mV-graf
- Sarkomer med aktin/myosin, Ca²⁺ og rigor mortis
- Hemoglobin med metningskurve og Bohr-effekt
- Proteinfolding fra primær- til kvartærstruktur, med denaturering
- Enzymaktivitet og temperatur, translasjon, transkripsjon, DNA-replikasjon
- Celleånding, fotosyntese (Z-skjema, C3/C4/CAM), mitose, meiose, osmose og gjæring

## For elever og lærere

- **Last ned:** Knappen «⬇ Last ned siden» nederst gir deg `cellen.html` – én fil som virker uten nett. Den kan legges i Teams/itslearning/OneDrive eller på en minnepinne og åpnes i hvilken som helst nettleser.
- **Lenke rett til en del:** Adresselinja viser hvilket lag du er på, f.eks. `…/#nervecelle/synapse` eller `…/#plantecelle/kloroplast/tylakoid`. Kopier lenken for å sende elevene rett dit. Det virker også i den nedlastede fila.
- **Frem og tilbake mellom lag:** Nettleserens tilbake/frem (knappene, Alt+←/→, museknapper, sveip på mobil) og **Backspace** / **Shift+Backspace** hopper mellom visningslagene. Å klikke på en del for å lese om den lager ikke et nytt steg.
- Ingen sporing, ingen eksterne kall – fontene ligger i prosjektet.

## Mappestruktur

```
src/
  index.html            Sideskallet. Lista med <script>-tagger bestemmer rekkefølgen.
  css/stil.css          Alt utseende + lokale fonter
  fonts/                Fraunces og Source Sans 3 (SIL OFL, se LISENS.txt)
  js/
    kjerne/             Hjelpefunksjoner, farger, gradienter og tegneprimitiver
    scener/             Tegningene (S.<id>) for de opprinnelige nivåene
    levende/            Levende modeller og trinnvise animasjoner (LIVE.<id>)
    innhold/            Tekstene: N (noder/forklaringer) og DEEP (fordypning)
    celletyper/         Én fil per nyere celletype – scene, modell og alt samlet
    app.js              Navigasjon, sidepanel, hendelser, lenker (#…)
bygg.mjs                Slår alt sammen til én fil i dist/
test/roeyktest.mjs      Åpner siden i en nettleser og tegner hver eneste scene
```

Alt deler tre globale tabeller med samme nøkler:

| Tabell | Hva | Eksempel |
|---|---|---|
| `N[id]` | Innhold: tittel `t`, nivå `l` (0–4), tekst `x`, punkter `f`, «visste du» `v`, barn `k`, `s:1` hvis man kan zoome inn | `N.mitokondrie` |
| `S[id]` | Funksjon som returnerer SVG-en for scenen | `S.mitokondrie` |
| `LIVE[id]` | Valgfritt: kontroller og animasjon for en levende scene | `LIVE.synapse` |
| `DEEP[id]` | Valgfritt: fordypningstekst | `DEEP.atpsyntase` |

**Rette en tekst?** Finn id-en i `src/js/innhold/` (eller `src/js/celletyper/innhold.js`) og endre teksten.
**Legge til en ny celletype?** Lag en ny fil i `src/js/celletyper/`, legg den inn i `src/index.html` før `innhold.js`, legg til knappen i `.seg`-lista, og skriv innholdet i `N`.

## Utvikle

Ingen bygging trengs for å jobbe: åpne `src/index.html` direkte i nettleseren og last siden på nytt etter endringer.

Bygg den nedlastbare fila (krever bare [Node](https://nodejs.org)):

```sh
node bygg.mjs          # → dist/index.html og dist/cellen.html
```

Kjør røyktesten (installerer Playwright første gang):

```sh
npm install
npx playwright install chromium
npm test
```

## Publisering

`.github/workflows/pages.yml` bygger, tester og publiserer `dist/` til GitHub Pages ved hver push til `main`. Pull requests blir bygd og testet, men ikke publisert.

Første gang: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
