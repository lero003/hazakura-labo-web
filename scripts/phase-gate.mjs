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
  'dist/hero-image-loader.js',
  'dist/motion-preferences.js',
  'dist/smooth-scroll.js',
  'dist/scroll-indicators.js',
  'dist/text-reveal.js',
  'dist/hero-parallax.js',
  'dist/scroll-animations.js',
  'dist/canvas-size.js',
  'dist/visibility-playback.js',
  'dist/resize-listener.js',
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
const heroImageLoaderJs = readFile('dist/hero-image-loader.js');
const motionPreferencesJs = readFile('dist/motion-preferences.js');
const smoothScrollJs = readFile('dist/smooth-scroll.js');
const scrollIndicatorsJs = readFile('dist/scroll-indicators.js');
const textRevealJs = readFile('dist/text-reveal.js');
const heroParallaxJs = readFile('dist/hero-parallax.js');
const scrollAnimationsJs = readFile('dist/scroll-animations.js');
const canvasSizeJs = readFile('dist/canvas-size.js');
const visibilityPlaybackJs = readFile('dist/visibility-playback.js');
const resizeListenerJs = readFile('dist/resize-listener.js');
assert('legacy script delegates project filter', scriptJs.includes('HazakuraProjectFilter?.init'));
assert('legacy script delegates quote prelude', scriptJs.includes('HazakuraQuotePrelude?.render'));
assert('legacy script delegates zone nav', scriptJs.includes('HazakuraZoneNav?.create'));
assert('legacy script delegates zone atmosphere', scriptJs.includes('HazakuraZoneAtmosphere?.create'));
assert('legacy script delegates hero aurora overlay', scriptJs.includes('HazakuraHeroAuroraOverlay?.create'));
assert('legacy script delegates hero image loader', scriptJs.includes('HazakuraHeroImageLoader?.init'));
assert('legacy script delegates motion preferences', scriptJs.includes('HazakuraMotionPreferences?.create'));
assert('legacy script delegates smooth scroll', scriptJs.includes('HazakuraSmoothScroll?.init'));
assert('legacy script delegates scroll indicators', scriptJs.includes('HazakuraScrollIndicators?.create'));
assert('legacy script delegates text reveal', scriptJs.includes('HazakuraTextReveal?.prepare'));
assert('legacy script delegates hero parallax', scriptJs.includes('HazakuraHeroParallax?.create'));
assert('legacy script delegates scroll animations', scriptJs.includes('HazakuraScrollAnimations?.init'));
assert('legacy script delegates canvas size', scriptJs.includes('HazakuraCanvasSize?.resize'));
assert('legacy script delegates visibility playback', scriptJs.includes('HazakuraVisibilityPlayback?.init'));
assert('legacy script delegates resize listener', scriptJs.includes('HazakuraResizeListener?.init'));
assert('project filter script exposes global', projectFilterJs.includes('window.HazakuraProjectFilter'));
assert('quote prelude script exposes global', quotePreludeJs.includes('window.HazakuraQuotePrelude'));
assert('zone nav script exposes global', zoneNavJs.includes('window.HazakuraZoneNav'));
assert('zone atmosphere script exposes global', zoneAtmosphereJs.includes('window.HazakuraZoneAtmosphere'));
assert('hero aurora overlay script exposes global', heroAuroraOverlayJs.includes('window.HazakuraHeroAuroraOverlay'));
assert('hero image loader script exposes global', heroImageLoaderJs.includes('window.HazakuraHeroImageLoader'));
assert('motion preferences script exposes global', motionPreferencesJs.includes('window.HazakuraMotionPreferences'));
assert('smooth scroll script exposes global', smoothScrollJs.includes('window.HazakuraSmoothScroll'));
assert('scroll indicators script exposes global', scrollIndicatorsJs.includes('window.HazakuraScrollIndicators'));
assert('text reveal script exposes global', textRevealJs.includes('window.HazakuraTextReveal'));
assert('hero parallax script exposes global', heroParallaxJs.includes('window.HazakuraHeroParallax'));
assert('scroll animations script exposes global', scrollAnimationsJs.includes('window.HazakuraScrollAnimations'));
assert('canvas size script exposes global', canvasSizeJs.includes('window.HazakuraCanvasSize'));
assert('visibility playback script exposes global', visibilityPlaybackJs.includes('window.HazakuraVisibilityPlayback'));
assert('resize listener script exposes global', resizeListenerJs.includes('window.HazakuraResizeListener'));

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  const icon = check.ok ? 'PASS' : 'FAIL';
  console.log(`${icon} ${check.label}${check.details ? `: ${check.details}` : ''}`);
}

if (failed.length) {
  process.exitCode = 1;
}
