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
  'dist/app-controller.js',
  'dist/content.js',
  'dist/content-renderers.js',
  'dist/project-filter.js',
  'dist/quote-prelude.js',
  'dist/zone-nav.js',
  'dist/zone-atmosphere.js',
  'dist/zone-performance.js',
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
  'dist/animation-frames.js',
  'dist/canvas-clear.js',
  'dist/cursor-hover.js',
  'dist/card-hover-fields.js',
  'dist/book-tilt.js',
  'dist/pointer-input.js',
  'dist/scroll-ticker.js',
  'dist/aurora-canvas.js',
  'dist/shooting-stars.js',
  'dist/cursor-follow.js',
  'dist/sakura-petals.js',
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

const appControllerJs = readFile('dist/app-controller.js');
const contentRenderersJs = readFile('dist/content-renderers.js');
const projectFilterJs = readFile('dist/project-filter.js');
const quotePreludeJs = readFile('dist/quote-prelude.js');
const zoneNavJs = readFile('dist/zone-nav.js');
const zoneAtmosphereJs = readFile('dist/zone-atmosphere.js');
const zonePerformanceJs = readFile('dist/zone-performance.js');
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
const animationFramesJs = readFile('dist/animation-frames.js');
const canvasClearJs = readFile('dist/canvas-clear.js');
const cursorHoverJs = readFile('dist/cursor-hover.js');
const cardHoverFieldsJs = readFile('dist/card-hover-fields.js');
const bookTiltJs = readFile('dist/book-tilt.js');
const pointerInputJs = readFile('dist/pointer-input.js');
const scrollTickerJs = readFile('dist/scroll-ticker.js');
const auroraCanvasJs = readFile('dist/aurora-canvas.js');
const shootingStarsJs = readFile('dist/shooting-stars.js');
const cursorFollowJs = readFile('dist/cursor-follow.js');
const sakuraPetalsJs = readFile('dist/sakura-petals.js');
assert('app controller delegates content renderers', appControllerJs.includes('HazakuraContentRenderers?.create'));
assert('app controller delegates zone performance', appControllerJs.includes('HazakuraZonePerformance?.create'));
assert('app controller delegates hero aurora overlay', appControllerJs.includes('HazakuraHeroAuroraOverlay?.create'));
assert('app controller delegates hero image loader', appControllerJs.includes('HazakuraHeroImageLoader?.init'));
assert('app controller delegates motion preferences', appControllerJs.includes('HazakuraMotionPreferences?.create'));
assert('app controller delegates smooth scroll', appControllerJs.includes('HazakuraSmoothScroll?.init'));
assert('app controller delegates scroll indicators', appControllerJs.includes('HazakuraScrollIndicators?.create'));
assert('app controller delegates text reveal', appControllerJs.includes('HazakuraTextReveal?.prepare'));
assert('app controller delegates hero parallax', appControllerJs.includes('HazakuraHeroParallax?.create'));
assert('app controller delegates scroll animations', appControllerJs.includes('HazakuraScrollAnimations?.init'));
assert('app controller delegates canvas size', appControllerJs.includes('HazakuraCanvasSize?.resize'));
assert('app controller delegates visibility playback', appControllerJs.includes('HazakuraVisibilityPlayback?.init'));
assert('app controller delegates resize listener', appControllerJs.includes('HazakuraResizeListener?.init'));
assert('app controller delegates cursor hover', appControllerJs.includes('HazakuraCursorHover?.init'));
assert('app controller delegates card hover fields', appControllerJs.includes('HazakuraCardHoverFields?.create'));
assert('app controller delegates book tilt', appControllerJs.includes('HazakuraBookTilt?.create'));
assert('app controller delegates pointer input', appControllerJs.includes('HazakuraPointerInput?.init'));
assert('app controller delegates scroll ticker', appControllerJs.includes('HazakuraScrollTicker?.init'));
assert('app controller delegates aurora canvas', appControllerJs.includes('HazakuraAuroraCanvas?.create'));
assert('app controller delegates shooting stars', appControllerJs.includes('HazakuraShootingStars?.create'));
assert('app controller delegates cursor follow', appControllerJs.includes('HazakuraCursorFollow?.create'));
assert('app controller delegates sakura petals', appControllerJs.includes('HazakuraSakuraPetals?.create'));
assert('content renderers script exposes global', contentRenderersJs.includes('window.HazakuraContentRenderers'));
assert('content renderers delegates project filter', contentRenderersJs.includes('HazakuraProjectFilter?.init'));
assert('content renderers delegates quote prelude', contentRenderersJs.includes('HazakuraQuotePrelude?.render'));
assert('project filter script exposes global', projectFilterJs.includes('window.HazakuraProjectFilter'));
assert('quote prelude script exposes global', quotePreludeJs.includes('window.HazakuraQuotePrelude'));
assert('zone nav script exposes global', zoneNavJs.includes('window.HazakuraZoneNav'));
assert('zone atmosphere script exposes global', zoneAtmosphereJs.includes('window.HazakuraZoneAtmosphere'));
assert('zone performance script exposes global', zonePerformanceJs.includes('window.HazakuraZonePerformance'));
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
assert('animation frames script exposes global', animationFramesJs.includes('window.HazakuraAnimationFrames'));
assert('canvas clear script exposes global', canvasClearJs.includes('window.HazakuraCanvasClear'));
assert('cursor hover script exposes global', cursorHoverJs.includes('window.HazakuraCursorHover'));
assert('card hover fields script exposes global', cardHoverFieldsJs.includes('window.HazakuraCardHoverFields'));
assert('book tilt script exposes global', bookTiltJs.includes('window.HazakuraBookTilt'));
assert('pointer input script exposes global', pointerInputJs.includes('window.HazakuraPointerInput'));
assert('scroll ticker script exposes global', scrollTickerJs.includes('window.HazakuraScrollTicker'));
assert('aurora canvas script exposes global', auroraCanvasJs.includes('window.HazakuraAuroraCanvas'));
assert('shooting stars script exposes global', shootingStarsJs.includes('window.HazakuraShootingStars'));
assert('cursor follow script exposes global', cursorFollowJs.includes('window.HazakuraCursorFollow'));
assert('sakura petals script exposes global', sakuraPetalsJs.includes('window.HazakuraSakuraPetals'));

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  const icon = check.ok ? 'PASS' : 'FAIL';
  console.log(`${icon} ${check.label}${check.details ? `: ${check.details}` : ''}`);
}

if (failed.length) {
  process.exitCode = 1;
}
