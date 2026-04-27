import fs from 'node:fs';
import vm from 'node:vm';
import { hazakuraContent } from '../src/data/content.js';
import { scriptLoadOrder } from '../src/data/script-load-order.js';

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
assert('legacy script is not loaded', !html.includes('/script.js'));
assert(
  'vision entry appears before process flow',
  html.indexOf('id="vision-grid"') >= 0
    && html.indexOf('id="process-flow"') > html.indexOf('id="vision-grid"')
    && html.indexOf('id="process-flow"') < html.indexOf('id="research-log-strip"'),
  JSON.stringify({
    visionGrid: html.indexOf('id="vision-grid"'),
    processFlow: html.indexOf('id="process-flow"'),
    researchLogStrip: html.indexOf('id="research-log-strip"')
  })
);
assert(
  'library to projects bridge appears before projects',
  html.indexOf('class="library-projects-bridge"') > html.indexOf('id="stats-grid"')
    && html.indexOf('class="library-projects-bridge"') < html.indexOf('id="projects"'),
  JSON.stringify({
    statsGrid: html.indexOf('id="stats-grid"'),
    bridge: html.indexOf('class="library-projects-bridge"'),
    projects: html.indexOf('id="projects"')
  })
);

const scriptPositions = scriptLoadOrder.map((path) => [path, html.indexOf(`src="${path}"`)]);
assert(
  'script load order is stable',
  scriptPositions.every(([, index], itemIndex) => index >= 0 && (itemIndex === 0 || scriptPositions[itemIndex - 1][1] < index)),
  JSON.stringify(scriptPositions)
);

const requiredAssets = [
  'dist/style.css',
  ...scriptLoadOrder.map((path) => `dist${path}`),
  'dist/img/hero.png',
  'dist/downloads/SakuraSky.dmg'
];
assert(
  'required assets are emitted',
  requiredAssets.every((path) => fs.existsSync(path)),
  requiredAssets.filter((path) => !fs.existsSync(path)).join(', ')
);
assert('legacy public script is not emitted', !fs.existsSync('dist/script.js'));
assert('legacy public stylesheet source is not used', !fs.existsSync('public/style.css'));
assert('legacy onepage archive is removed', !fs.existsSync('hazakura-onepage-lab'));

const contentJs = readFile('dist/content.js');
const contentSandbox = { window: {} };
vm.runInNewContext(contentJs, contentSandbox);
assert(
  'generated content matches source data',
  JSON.stringify(contentSandbox.window.HAZAKURA_CONTENT) === JSON.stringify(hazakuraContent)
);
assert(
  'quote prelude folds back to main anchors',
  ['#library', '#projects', '#vision'].every((href) => hazakuraContent.quotePrelude?.steps?.some((step) => step.href === href)),
  JSON.stringify(hazakuraContent.quotePrelude?.steps || [])
);

const appControllerJs = readFile('dist/app-controller.js');
const styleCss = readFile('dist/style.css');
const contentRenderersJs = readFile('dist/content-renderers.js');
const projectFilterJs = readFile('dist/project-filter.js');
const quotePreludeJs = readFile('dist/quote-prelude.js');
const visionEntryFocusJs = readFile('dist/vision-entry-focus.js');
const zoneNavJs = readFile('dist/zone-nav.js');
const zoneAtmosphereJs = readFile('dist/zone-atmosphere.js');
const zonePerformanceJs = readFile('dist/zone-performance.js');
const heroAuroraOverlayJs = readFile('dist/hero-aurora-overlay.js');
const heroImageLoaderJs = readFile('dist/hero-image-loader.js');
const motionPreferencesJs = readFile('dist/motion-preferences.js');
const smoothScrollJs = readFile('dist/smooth-scroll.js');
const scrollOffsetJs = readFile('dist/scroll-offset.js');
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
const effectsLifecycleJs = readFile('dist/effects-lifecycle.js');
const auroraCanvasJs = readFile('dist/aurora-canvas.js');
const shootingStarsJs = readFile('dist/shooting-stars.js');
const cursorFollowJs = readFile('dist/cursor-follow.js');
const sakuraPetalsJs = readFile('dist/sakura-petals.js');
assert('app controller delegates content renderers', appControllerJs.includes('HazakuraContentRenderers?.create'));
assert('app controller delegates vision entry focus', appControllerJs.includes('HazakuraVisionEntryFocus?.init'));
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
assert('app controller delegates effects lifecycle', appControllerJs.includes('HazakuraEffectsLifecycle?.create'));
assert('app controller delegates aurora canvas', appControllerJs.includes('HazakuraAuroraCanvas?.create'));
assert('app controller delegates shooting stars', appControllerJs.includes('HazakuraShootingStars?.create'));
assert('app controller delegates cursor follow', appControllerJs.includes('HazakuraCursorFollow?.create'));
assert('app controller delegates sakura petals', appControllerJs.includes('HazakuraSakuraPetals?.create'));
assert('style sheet contains design tokens', styleCss.includes('--sakura-500') && styleCss.includes('.hero'));
assert(
  'style sheet contains shared anchor offset',
  styleCss.includes('--hazakura-anchor-offset: 84px')
    && styleCss.includes('--hazakura-anchor-offset: 116px')
    && styleCss.includes('scroll-padding-top: var(--hazakura-anchor-offset)')
);
assert('style sheet contains library projects bridge', styleCss.includes('.library-projects-bridge'));
assert(
  'library projects bridge keeps handoff path styling',
  ['.library-projects-bridge::after', '.library-projects-bridge__steps::before', '.library-projects-bridge__steps li::before', 'bridgeSeedFloat'].every((snippet) => styleCss.includes(snippet)),
  JSON.stringify({
    hasSeed: styleCss.includes('.library-projects-bridge::after'),
    hasStepPath: styleCss.includes('.library-projects-bridge__steps::before'),
    hasStepDots: styleCss.includes('.library-projects-bridge__steps li::before')
  })
);
assert(
  'small mobile library bridge keeps step path spacing',
  styleCss.includes('padding: 0.62rem 0.72rem 0.64rem 1.7rem')
    && styleCss.includes('min-height: 4.15rem')
    && styleCss.includes('font-size: 0.74rem'),
  JSON.stringify({
    hasMobileStepPadding: styleCss.includes('padding: 0.62rem 0.72rem 0.64rem 1.7rem'),
    hasMobileStepHeight: styleCss.includes('min-height: 4.15rem'),
    hasCompactStepText: styleCss.includes('font-size: 0.74rem')
  })
);
assert('vision process interlude style is emitted', styleCss.includes('.process-flow--vision'));
assert(
  'research log handoff bridges vision entries to logs',
  Array.isArray(hazakuraContent.researchGroup?.handoff?.steps)
    && hazakuraContent.researchGroup.handoff.steps.length === 3
    && contentRenderersJs.includes('class="research-log-handoff"')
    && styleCss.includes('.research-log-handoff')
    && scrollAnimationsJs.includes('.research-log-handoff'),
  JSON.stringify({
    steps: hazakuraContent.researchGroup?.handoff?.steps?.length || 0,
    hasRenderer: contentRenderersJs.includes('class="research-log-handoff"'),
    hasStyles: styleCss.includes('.research-log-handoff'),
    hasReveal: scrollAnimationsJs.includes('.research-log-handoff')
  })
);
assert(
  'vision entry fields stay folded',
  contentRenderersJs.includes('class="vision-entry-guide__field-drawer"')
    && contentRenderersJs.includes('<summary>')
    && contentRenderersJs.includes('受付メモ')
    && styleCss.includes('.vision-entry-guide__field-drawer')
    && styleCss.includes('.vision-entry-guide__field-drawer[open] summary::after'),
  JSON.stringify({
    hasDrawerRenderer: contentRenderersJs.includes('class="vision-entry-guide__field-drawer"'),
    hasDrawerStyles: styleCss.includes('.vision-entry-guide__field-drawer')
  })
);
assert('content renderers script exposes global', contentRenderersJs.includes('window.HazakuraContentRenderers'));
assert('content renderers delegates project filter', contentRenderersJs.includes('HazakuraProjectFilter?.init'));
assert('content renderers delegates quote prelude', contentRenderersJs.includes('HazakuraQuotePrelude?.render'));
assert(
  'projects entry keeps library handoff threshold',
  hazakuraContent.projectsGroup?.threshold?.title
    && contentRenderersJs.includes('class="project-threshold"')
    && styleCss.includes('.project-threshold__rail')
    && scrollAnimationsJs.includes('.project-threshold'),
  JSON.stringify({
    hasData: Boolean(hazakuraContent.projectsGroup?.threshold?.title),
    hasRenderer: contentRenderersJs.includes('class="project-threshold"'),
    hasStyles: styleCss.includes('.project-threshold__rail'),
    hasReveal: scrollAnimationsJs.includes('.project-threshold')
  })
);
assert(
  'projects controls stay compact before cards',
  contentRenderersJs.includes('class="project-control-deck"')
    && styleCss.includes('grid-template-columns: minmax(0, 1.22fr) minmax(17rem, 0.62fr)')
    && styleCss.includes('scroll-snap-type: x proximity')
    && styleCss.includes('.project-lane-guide::before'),
  JSON.stringify({
    hasControlDeck: contentRenderersJs.includes('class="project-control-deck"'),
    hasDesktopGrid: styleCss.includes('grid-template-columns: minmax(0, 1.22fr) minmax(17rem, 0.62fr)'),
    hasMobileScroller: styleCss.includes('scroll-snap-type: x proximity'),
    hasPathRail: styleCss.includes('.project-lane-guide::before')
  })
);
assert(
  'project cards compress trail notes',
  contentRenderersJs.includes('class="project-trail"')
    && styleCss.includes('.project-trail')
    && ["['origin', 'Origin'", "['surprise', 'Surprise'", "['next', 'Next'"].every((snippet) => contentRenderersJs.includes(snippet))
    && contentRenderersJs.includes('data-trail-kind="${escapeHtml(kind)}"'),
  JSON.stringify({
    hasTrailRenderer: contentRenderersJs.includes('class="project-trail"'),
    hasTrailStyles: styleCss.includes('.project-trail')
  })
);
assert(
  'project cycles are folded behind a drawer',
  contentRenderersJs.includes('class="project-cycle-drawer"')
    && contentRenderersJs.includes('class="project-cycle-drawer__sigil"')
    && contentRenderersJs.includes('小径をひらく')
    && styleCss.includes('.project-cycle-drawer')
    && styleCss.includes('.project-cycle-drawer__sigil')
    && styleCss.includes('.project-cycle-drawer[open] summary::after'),
  JSON.stringify({
    hasDrawerRenderer: contentRenderersJs.includes('class="project-cycle-drawer"'),
    hasDrawerStyles: styleCss.includes('.project-cycle-drawer')
  })
);
assert('project filter script exposes global', projectFilterJs.includes('window.HazakuraProjectFilter'));
assert(
  'projects action types back filter status labels',
  Array.isArray(hazakuraContent.projectsGroup?.actionTypes)
    && ['external', 'download', 'status'].every((type) => hazakuraContent.projectsGroup.actionTypes.some((item) => item.type === type))
    && !Object.prototype.hasOwnProperty.call(hazakuraContent.projectsGroup || {}, 'actionGuide')
    && projectFilterJs.includes('projectsGroup.actionTypes')
    && contentRenderersJs.includes('projectsGroup.actionTypes'),
  JSON.stringify({
    actionTypes: hazakuraContent.projectsGroup?.actionTypes?.map((item) => item.type) || [],
    hasActionGuide: Object.prototype.hasOwnProperty.call(hazakuraContent.projectsGroup || {}, 'actionGuide')
  })
);
assert('quote prelude script exposes global', quotePreludeJs.includes('window.HazakuraQuotePrelude'));
assert(
  'footer keeps final return path to hero',
  html.includes('class="footer-garden-close"')
    && html.includes('href="#hero" class="footer-garden-close__link"')
    && styleCss.includes('.footer-garden-close')
    && styleCss.includes('.footer-garden-close__link'),
  JSON.stringify({
    hasMarkup: html.includes('class="footer-garden-close"'),
    hasHeroLink: html.includes('href="#hero" class="footer-garden-close__link"'),
    hasStyles: styleCss.includes('.footer-garden-close')
  })
);
assert(
  'vision entry focus links guide kinds to cards',
  visionEntryFocusJs.includes('window.HazakuraVisionEntryFocus')
    && visionEntryFocusJs.includes('.vision-entry-guide__kind[data-entry-kind]')
    && visionEntryFocusJs.includes('is-entry-match')
    && styleCss.includes('.vision-grid.is-entry-focus')
    && styleCss.includes('.vision-card.is-entry-match'),
  JSON.stringify({
    hasScript: visionEntryFocusJs.includes('window.HazakuraVisionEntryFocus'),
    hasGuideSelector: visionEntryFocusJs.includes('.vision-entry-guide__kind[data-entry-kind]'),
    hasStyles: styleCss.includes('.vision-grid.is-entry-focus')
  })
);
assert(
  'vision entry focus can nudge selected cards into view',
  visionEntryFocusJs.includes('nudgeMatchingCard')
    && visionEntryFocusJs.includes('HazakuraScrollOffset?.get')
    && visionEntryFocusJs.includes('is-entry-jump')
    && styleCss.includes('.vision-card.visible.is-entry-match')
    && styleCss.includes('@keyframes visionEntryNudge'),
  JSON.stringify({
    hasNudge: visionEntryFocusJs.includes('nudgeMatchingCard'),
    usesMeasuredOffset: visionEntryFocusJs.includes('HazakuraScrollOffset?.get'),
    hasJumpClass: visionEntryFocusJs.includes('is-entry-jump'),
    hasVisibleMatchStyle: styleCss.includes('.vision-card.visible.is-entry-match'),
    hasNudgeKeyframes: styleCss.includes('@keyframes visionEntryNudge')
  })
);
assert('zone nav script exposes global', zoneNavJs.includes('window.HazakuraZoneNav'));
assert('zone atmosphere script exposes global', zoneAtmosphereJs.includes('window.HazakuraZoneAtmosphere'));
assert('zone performance script exposes global', zonePerformanceJs.includes('window.HazakuraZonePerformance'));
assert('hero aurora overlay script exposes global', heroAuroraOverlayJs.includes('window.HazakuraHeroAuroraOverlay'));
assert('hero image loader script exposes global', heroImageLoaderJs.includes('window.HazakuraHeroImageLoader'));
assert('motion preferences script exposes global', motionPreferencesJs.includes('window.HazakuraMotionPreferences'));
assert('scroll offset script exposes global', scrollOffsetJs.includes('window.HazakuraScrollOffset'));
assert(
  'scroll offset loads before scroll consumers',
  html.indexOf('src="/scroll-offset.js"') >= 0
    && html.indexOf('src="/scroll-offset.js"') < html.indexOf('src="/smooth-scroll.js"')
    && html.indexOf('src="/scroll-offset.js"') < html.indexOf('src="/zone-performance.js"'),
  JSON.stringify({
    scrollOffset: html.indexOf('src="/scroll-offset.js"'),
    smoothScroll: html.indexOf('src="/smooth-scroll.js"'),
    zonePerformance: html.indexOf('src="/zone-performance.js"')
  })
);
assert('smooth scroll script exposes global', smoothScrollJs.includes('window.HazakuraSmoothScroll'));
assert('smooth scroll uses measured offset', smoothScrollJs.includes('HazakuraScrollOffset?.get'));
assert('zone performance uses measured offset', zonePerformanceJs.includes('HazakuraScrollOffset?.get'));
assert('smooth scroll includes library projects bridge', smoothScrollJs.includes('.library-projects-bridge__link'));
assert(
  'library bridge click marks projects handoff arrival',
  smoothScrollJs.includes('markHandoffArrival')
    && smoothScrollJs.includes('is-handoff-arrival')
    && styleCss.includes('.section-projects.is-handoff-arrival .project-threshold__sigil')
    && styleCss.includes('@keyframes projectHandoffSeed'),
  JSON.stringify({
    hasHandler: smoothScrollJs.includes('markHandoffArrival'),
    hasArrivalClass: smoothScrollJs.includes('is-handoff-arrival'),
    hasSigilStyle: styleCss.includes('.section-projects.is-handoff-arrival .project-threshold__sigil'),
    hasSeedKeyframes: styleCss.includes('@keyframes projectHandoffSeed')
  })
);
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
assert('effects lifecycle script exposes global', effectsLifecycleJs.includes('window.HazakuraEffectsLifecycle'));
assert('effects lifecycle supports shared hooks', ['startAll', 'stopAll', 'resizeAll', 'clearAll'].every((hook) => effectsLifecycleJs.includes(hook)));
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
