// Røyktest: åpner både kildeversjonen (src/) og den bygde fila (dist/) i en
// ekte nettleser, tegner hver eneste scene, kjører de levende modellene litt,
// og sjekker at ingenting kaster feil.
//
//   npm test
//
// Lokalt kan du peke på en Chrome du allerede har: CHROME=/sti/til/chrome npm test

import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sider = {
  'src/index.html': pathToFileURL(join(ROT, 'src/index.html')).href,
  'dist/cellen.html': pathToFileURL(join(ROT, 'dist/cellen.html')).href,
};

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
let feil = 0;

for (const [navn, url] of Object.entries(sider)) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const problemer = [];
  page.on('pageerror', (e) => problemer.push(`pageerror: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && problemer.push(`console: ${m.text()}`));
  await page.goto(url);

  const res = await page.evaluate(async () => {
    const vent = (ms) => new Promise((r) => setTimeout(r, ms));
    const ut = { scener: 0, levende: 0, deler: 0, mangler: [] };
    // alle noder som har en scene, må ha en tegnefunksjon – og omvendt
    for (const [id, n] of Object.entries(N)) {
      if (n.s && !S[id]) ut.mangler.push(`N.${id} er zoombar, men S.${id} finnes ikke`);
      for (const k of n.k || []) if (!N[k]) ut.mangler.push(`N.${id}.k peker på ukjent «${k}»`);
    }
    for (const id of Object.keys(S)) {
      if (!N[id]) { ut.mangler.push(`S.${id} har ikke innhold i N`); continue; }
      path = [id]; sel = null; render();
      ut.scener++;
      if (LIVE[id]) { ut.levende++; await vent(120); }
      // klikk på hver del i sidepanelet som ikke er zoombar
      for (const k of N[id].k || []) if (N[k] && !N[k].s) { go(k); ut.deler++; }
    }
    return ut;
  });

  // lenke rett til en dyp visning skal virke
  await page.goto(url + '#nervecelle/synapse');
  const sti = await page.evaluate(() => path.join('/'));
  if (sti !== 'nervecelle/synapse') problemer.push(`hash-lenke ga «${sti}», ventet «nervecelle/synapse»`);

  // nettleserhistorikk: bare lag-bytter skal bli steg, ikke valg av deler
  await page.goto(url + '#nervecelle');
  const hist = async () => page.evaluate(() => [location.hash, path.join('/'), history.length]);
  const sjekk = async (hva, ventetHash) => {
    await page.waitForFunction(() => !busy);
    await page.waitForTimeout(80);
    const [h, p] = await hist();
    if (h !== ventetHash || '#' + p !== ventetHash) problemer.push(`historikk – ${hva}: adresse ${h}, visning #${p}, ventet ${ventetHash}`);
  };
  await page.evaluate(() => go('synapse'));
  await sjekk('zoom inn', '#nervecelle/synapse');
  const [, , lengdeFør] = await hist();
  await page.evaluate(() => { const k = N.synapse.k.find((k) => !N[k].s); go(k); });
  const [, , lengdeEtter] = await hist();
  await sjekk('velg del', '#nervecelle/synapse');
  if (lengdeEtter !== lengdeFør) problemer.push('historikk – å velge en del la til et steg');
  await page.goBack(); await sjekk('nettleser tilbake', '#nervecelle');
  await page.goForward(); await sjekk('nettleser frem', '#nervecelle/synapse');
  await page.keyboard.press('Backspace'); await sjekk('Backspace', '#nervecelle');
  await page.keyboard.press('Shift+Backspace'); await sjekk('Shift+Backspace', '#nervecelle/synapse');
  await page.click('#back'); await sjekk('Tilbake-knappen', '#nervecelle');
  const [, , lengdeTilbake] = await hist();
  if (lengdeTilbake !== lengdeFør) problemer.push('historikk – Tilbake-knappen la til et nytt steg i stedet for å gå tilbake');

  problemer.push(...res.mangler);
  console.log(`${problemer.length ? '✘' : '✔'} ${navn}: ${res.scener} scener, ${res.levende} levende modeller, ${res.deler} deler klikket`);
  for (const p of problemer) console.log('   ' + p);
  feil += problemer.length;
  await page.close();
}

await browser.close();
process.exit(feil ? 1 : 0);
