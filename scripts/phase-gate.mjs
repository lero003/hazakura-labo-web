import fs from 'node:fs';
import vm from 'node:vm';
import { hazakuraContent } from '../src/data/content.js';

const checks = [];

function pass(label) {
  checks.push({ label, ok: true });
}

function fail(label, details = '') {
  checks.push({ label, ok: false, details });
}

function assert(label, condition, details = '') {
  if (condition) pass(label);
  else fail(label, details);
}

function readFile(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
}

const html = readFile('dist/index.html');
assert('dist/index.html exists', Boolean(html));

const sections = ['hero', 'philosophy', 'layers', 'library', 'projects', 'vision', 'quote'];
const sectionPositions = sections.map((id) => [id, html.indexOf(`id="${id}"`)]);
assert(
  'major sections exist',
  sectionPositions.every(([, index]) => index >= 0),
  JSON.stringify(sectionPositions)
);
assert(
  'major section order is stable',
  sectionPositions.every(([, index], itemIndex) => itemIndex === 0 || sectionPositions[itemIndex - 1][1] < index),
  JSON.stringify(sectionPositions)
);

const requiredAssets = [
  'dist/style.css',
  'dist/script.js',
  'dist/content.js',
  'dist/project-filter.js',
  'dist/quote-prelude.js',
  'dist/zone-nav.js',
  'dist/zone-atmosphere.js',
  'dist/hero-aurora-overlay.js',
  'dist/img/hero.png',
  'dist/downloads/SakuraSky.dmg'
];
assert(
  'required assets are emitted',
  requiredAssets.every((path) => fs.existsSync(path)),
  requiredAssets.filter((path) => !fs.existsSync(path)).join(', ')
);

const contentJs = readFile('dist/content.js');
const contentSandbox = { window: {} };
vm.runInNewContext(contentJs, contentSandbox);
assert(
  'generated content matches source data',
  JSON.stringify(contentSandbox.window.HAZAKURA_CONTENT) === JSON.stringify(hazakuraContent)
);

const scriptJs = readFile('dist/script.js');
const projectFilterJs = readFile('dist/project-filter.js');
const quotePreludeJs = readFile('dist/quote-prelude.js');
const zoneNavJs = readFile('dist/zone-nav.js');
const zoneAtmosphereJs = readFile('dist/zone-atmosphere.js');
const heroAuroraOverlayJs = readFile('dist/hero-aurora-overlay.js');
assert('legacy script delegates project filter', scriptJs.includes('HazakuraProjectFilter?.init'));
assert('legacy script delegates quote prelude', scriptJs.includes('HazakuraQuotePrelude?.render'));
assert('legacy script delegates zone nav', scriptJs.includes('HazakuraZoneNav?.create'));
assert('legacy script delegates zone atmosphere', scriptJs.includes('HazakuraZoneAtmosphere?.create'));
assert('legacy script delegates hero aurora overlay', scriptJs.includes('HazakuraHeroAuroraOverlay?.create'));
assert('project filter script exposes global', projectFilterJs.includes('window.HazakuraProjectFilter'));
assert('quote prelude script exposes global', quotePreludeJs.includes('window.HazakuraQuotePrelude'));
assert('zone nav script exposes global', zoneNavJs.includes('window.HazakuraZoneNav'));
assert('zone atmosphere script exposes global', zoneAtmosphereJs.includes('window.HazakuraZoneAtmosphere'));
assert('hero aurora overlay script exposes global', heroAuroraOverlayJs.includes('window.HazakuraHeroAuroraOverlay'));

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  const icon = check.ok ? 'PASS' : 'FAIL';
  console.log(`${icon} ${check.label}${check.details ? `: ${check.details}` : ''}`);
}

if (failed.length) {
  process.exitCode = 1;
}
