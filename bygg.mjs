#!/usr/bin/env node
// Bygger én selvstendig HTML-fil av kildene i src/.
//
//   node bygg.mjs            → dist/index.html og dist/cellen.html
//
// Ingen avhengigheter utover Node. Skriptet leser src/index.html, legger inn
// CSS-en (med fontene som data-URL-er) og slår sammen alle <script src="…">
// til ett <script> i samme rekkefølge. Resultatet virker uten nett, også når
// det åpnes direkte fra disk.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROT, 'src');
const DIST = join(ROT, 'dist');

const les = (p) => readFileSync(p, 'utf8');

function innebyggCss(cssFil) {
  const css = les(cssFil);
  return css.replace(/url\((['"]?)([^'")]+\.woff2)\1\)/g, (_, _q, rel) => {
    const data = readFileSync(resolve(dirname(cssFil), rel)).toString('base64');
    return `url(data:font/woff2;base64,${data})`;
  });
}

let html = les(join(SRC, 'index.html'));

// 1) stilark
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) =>
  `<style>\n${innebyggCss(join(SRC, href))}</style>`);

// 2) skript – alle samles i ett <script>, slik at oppførselen blir identisk
//    med den opprinnelige én-fils-versjonen.
const skriptRe = /<script src="([^"]+)"><\/script>\n?/g;
const filer = [...html.matchAll(skriptRe)].map((m) => m[1]);
if (!filer.length) throw new Error('Fant ingen <script src> i src/index.html');
const js = filer.map((f) => {
  const kode = les(join(SRC, f));
  if (/<\/script/i.test(kode)) throw new Error(`${f} inneholder "</script" – det vil ødelegge den innebygde fila`);
  return `/* ===== ${f} ===== */\n${kode}`;
}).join('\n');
let førsteSkript = true;
html = html.replace(skriptRe, () => {
  if (!førsteSkript) return '';
  førsteSkript = false;
  return `<script>\n${js}</script>\n`;
});

// 3) fjern kommentaren om skriptrekkefølge – den gjelder bare kildene
html = html.replace(/<!--\s*Rekkefølgen her[\s\S]*?-->\n?/, '');

mkdirSync(DIST, { recursive: true });
writeFileSync(join(DIST, 'index.html'), html);
writeFileSync(join(DIST, 'cellen.html'), html);

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`✔ dist/index.html og dist/cellen.html (${kb} kB, ${filer.length} skriptfiler)`);
