import fs from 'node:fs';
import vm from 'node:vm';
import { hazakuraContent } from '../src/data/content.js';
import { scriptLoadGroups, scriptLoadOrder } from '../src/data/script-load-order.js';
import { libraryBooks } from '../src/data/library-books.js';

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
const indexSource = readFile('src/pages/index.astro');
const rendererScriptPaths = [
  '/project-renderer.js',
  '/quote-prelude.js',
  '/vision-renderer.js',
  '/research-renderer.js',
  '/content-renderers.js'
];
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
  'library to projects bridge follows book shelf and appears before projects',
  html.indexOf('class="library-projects-bridge"') > html.indexOf('class="book-shelf"')
    && html.indexOf('class="library-projects-bridge"') < html.indexOf('id="projects"'),
  JSON.stringify({
    bookShelf: html.indexOf('class="book-shelf"'),
    bridge: html.indexOf('class="library-projects-bridge"'),
    projects: html.indexOf('id="projects"')
  })
);
const scriptPositions = scriptLoadOrder.map((path) => [path, html.indexOf(`src="${path}"`)]);
const scriptGroupNames = scriptLoadGroups.map((group) => group.name);
const groupedScriptPaths = scriptLoadGroups.flatMap((group) => group.scripts);
const duplicateScriptPaths = groupedScriptPaths.filter((path, index) => groupedScriptPaths.indexOf(path) !== index);
assert(
  'script load manifest stays grouped by responsibility',
  ['content-data', 'content-renderers', 'navigation-scroll', 'interaction-foundation', 'garden-effects', 'bootstrap'].every((name) => scriptGroupNames.includes(name))
    && scriptLoadGroups.every((group) => group.description && Array.isArray(group.scripts) && group.scripts.length > 0)
    && JSON.stringify(groupedScriptPaths) === JSON.stringify(scriptLoadOrder)
    && duplicateScriptPaths.length === 0
    && scriptLoadOrder.at(-1) === '/app-controller.js',
  JSON.stringify({
    groups: scriptGroupNames,
    hasDescriptions: scriptLoadGroups.every((group) => Boolean(group.description)),
    duplicateScriptPaths,
    finalScript: scriptLoadOrder.at(-1)
  })
);
assert(
  'script load order is stable',
  scriptPositions.every(([, index], itemIndex) => index >= 0 && (itemIndex === 0 || scriptPositions[itemIndex - 1][1] < index)),
  JSON.stringify(scriptPositions)
);

const requiredAssets = [
  'dist/style.css',
  ...scriptLoadOrder.map((path) => `dist${path}`),
  ...libraryBooks.map((book) => `dist/${book.image.src.replace(/^\.\//, '')}`),
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
assert(
  'library books are data-backed',
  indexSource.includes("import { libraryBooks }")
    && indexSource.includes('libraryBooks.map')
    && !indexSource.includes('<h3 class="book-info-title">チカちゃんの哲学冒険譚</h3>')
    && Array.isArray(libraryBooks)
    && libraryBooks.length === 2
    && libraryBooks.every((book) => book.title && book.image?.src && book.action?.href),
  JSON.stringify({
    importsData: indexSource.includes("import { libraryBooks }"),
    mapsBooks: indexSource.includes('libraryBooks.map'),
    hasHardcodedFirstTitle: indexSource.includes('<h3 class="book-info-title">チカちゃんの哲学冒険譚</h3>'),
    bookCount: libraryBooks.length
  })
);
assert(
  'library book markup renders all data books',
  libraryBooks.every((book) => html.includes(book.title) && html.includes(book.image.src) && html.includes(book.action.href))
    && (html.match(/class="book-showcase/g) || []).length === libraryBooks.length
    && (html.match(/class="book-3d"/g) || []).length === libraryBooks.length,
  JSON.stringify({
    titles: libraryBooks.map((book) => [book.title, html.includes(book.title)]),
    showcaseCount: (html.match(/class="book-showcase/g) || []).length,
    bookTiltTargets: (html.match(/class="book-3d"/g) || []).length
  })
);

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
const domHelpersJs = readFile('dist/dom-helpers.js');
const contentRenderersJs = readFile('dist/content-renderers.js');
const projectFilterJs = readFile('dist/project-filter.js');
const projectRendererJs = readFile('dist/project-renderer.js');
const researchRendererJs = readFile('dist/research-renderer.js');
const quotePreludeJs = readFile('dist/quote-prelude.js');
const visionRendererJs = readFile('dist/vision-renderer.js');
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
assert(
  'library handoff is not interrupted by legacy stats grid',
  !html.includes('id="stats-grid"')
    && !contentRenderersJs.includes('data-render="stats"')
    && !scrollAnimationsJs.includes('stat-number')
    && !styleCss.includes('.stats-grid'),
  JSON.stringify({
    hasStatsGridMarkup: html.includes('id="stats-grid"'),
    hasStatsRenderer: contentRenderersJs.includes('data-render="stats"'),
    hasCounterScript: scrollAnimationsJs.includes('stat-number'),
    hasStatsStyles: styleCss.includes('.stats-grid')
  })
);
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
assert('dom helpers script exposes global', domHelpersJs.includes('window.HazakuraDom'));
assert(
  'dom helpers load before DOM string renderers',
  html.indexOf('src="/dom-helpers.js"') >= 0
    && rendererScriptPaths.every((path) => html.indexOf(`src="${path}"`) > html.indexOf('src="/dom-helpers.js"')),
  JSON.stringify({
    domHelpers: html.indexOf('src="/dom-helpers.js"'),
    renderers: Object.fromEntries(rendererScriptPaths.map((path) => [path, html.indexOf(`src="${path}"`)]))
  })
);
assert(
  'DOM string renderers share escape helper',
  [contentRenderersJs, projectRendererJs, quotePreludeJs, researchRendererJs, visionRendererJs].every((source) => source.includes('window.HazakuraDom'))
    && [contentRenderersJs, projectRendererJs, quotePreludeJs, researchRendererJs, visionRendererJs].every((source) => !source.includes('function escapeHtml')),
  JSON.stringify({
    contentUsesHelper: contentRenderersJs.includes('window.HazakuraDom'),
    projectUsesHelper: projectRendererJs.includes('window.HazakuraDom'),
    quoteUsesHelper: quotePreludeJs.includes('window.HazakuraDom'),
    researchUsesHelper: researchRendererJs.includes('window.HazakuraDom'),
    visionUsesHelper: visionRendererJs.includes('window.HazakuraDom'),
    duplicateEscapeFunctions: [
      ['content-renderers', contentRenderersJs.includes('function escapeHtml')],
      ['project-renderer', projectRendererJs.includes('function escapeHtml')],
      ['quote-prelude', quotePreludeJs.includes('function escapeHtml')],
      ['research-renderer', researchRendererJs.includes('function escapeHtml')],
      ['vision-renderer', visionRendererJs.includes('function escapeHtml')]
    ].filter(([, hasDuplicate]) => hasDuplicate).map(([name]) => name)
  })
);
assert('style sheet contains design tokens', styleCss.includes('--sakura-500') && styleCss.includes('.hero'));
assert(
  'style sheet contains shared anchor offset',
  styleCss.includes('--hazakura-anchor-offset: 84px')
    && styleCss.includes('--hazakura-anchor-offset: 116px')
    && styleCss.includes('scroll-padding-top: var(--hazakura-anchor-offset)')
);
assert('style sheet contains library projects bridge', styleCss.includes('.library-projects-bridge'));
assert(
  'library projects bridge theme is tokenized',
  ['--bridge-step-rail', '--bridge-step-rail-vertical', '--bridge-link-hover-border'].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-library .library-projects-bridge__steps::before'),
  JSON.stringify({
    hasRailToken: styleCss.includes('--bridge-step-rail'),
    hasVerticalRailToken: styleCss.includes('--bridge-step-rail-vertical'),
    hasLinkHoverToken: styleCss.includes('--bridge-link-hover-border'),
    hasNightStepRailOverride: styleCss.includes('body.theme-night .section-library .library-projects-bridge__steps::before')
  })
);
assert(
  'project threshold theme is tokenized',
  ['--project-threshold-mist', '--project-threshold-sigil-bg', '--project-threshold-rail', '--project-threshold-node-bg'].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-projects .project-threshold__sigil {')
    && !styleCss.includes('body.theme-night .section-projects .project-threshold__rail {'),
  JSON.stringify({
    hasMistToken: styleCss.includes('--project-threshold-mist'),
    hasSigilToken: styleCss.includes('--project-threshold-sigil-bg'),
    hasRailToken: styleCss.includes('--project-threshold-rail'),
    hasNodeToken: styleCss.includes('--project-threshold-node-bg'),
    hasNightSigilOverride: styleCss.includes('body.theme-night .section-projects .project-threshold__sigil {'),
    hasNightRailOverride: styleCss.includes('body.theme-night .section-projects .project-threshold__rail {')
  })
);
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
    && researchRendererJs.includes('class="research-log-handoff"')
    && styleCss.includes('.research-log-handoff')
    && scrollAnimationsJs.includes('.research-log-handoff'),
  JSON.stringify({
    steps: hazakuraContent.researchGroup?.handoff?.steps?.length || 0,
    hasRenderer: researchRendererJs.includes('class="research-log-handoff"'),
    hasStyles: styleCss.includes('.research-log-handoff'),
    hasReveal: scrollAnimationsJs.includes('.research-log-handoff')
  })
);
assert(
  'research log handoff theme is tokenized',
  [
    '--research-handoff-bg',
    '--research-handoff-edge-rail',
    '--research-handoff-step-rail',
    '--research-handoff-step-rail-vertical',
    '--research-handoff-count-strong'
  ].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-vision .research-log-handoff::before')
    && !styleCss.includes('body.theme-night .section-vision .research-log-handoff__steps::before'),
  JSON.stringify({
    hasBackgroundToken: styleCss.includes('--research-handoff-bg'),
    hasEdgeRailToken: styleCss.includes('--research-handoff-edge-rail'),
    hasStepRailToken: styleCss.includes('--research-handoff-step-rail'),
    hasVerticalRailToken: styleCss.includes('--research-handoff-step-rail-vertical'),
    hasNightEdgeOverride: styleCss.includes('body.theme-night .section-vision .research-log-handoff::before'),
    hasNightStepOverride: styleCss.includes('body.theme-night .section-vision .research-log-handoff__steps::before')
  })
);
assert(
  'vision entry fields stay folded',
  visionRendererJs.includes('class="vision-entry-guide__field-drawer"')
    && visionRendererJs.includes('<summary>')
    && visionRendererJs.includes('受付メモ')
    && styleCss.includes('.vision-entry-guide__field-drawer')
    && styleCss.includes('.vision-entry-guide__field-drawer[open] summary::after'),
  JSON.stringify({
    hasDrawerRenderer: visionRendererJs.includes('class="vision-entry-guide__field-drawer"'),
    hasDrawerStyles: styleCss.includes('.vision-entry-guide__field-drawer')
  })
);
assert(
  'vision entry night theme is tokenized',
  [
    '--vision-entry-guide-bg',
    '--vision-entry-drawer-bg',
    '--vision-entry-field-color',
    '--vision-question-entry-bg',
    '--vision-question-handoff-text'
  ].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-vision .vision-entry-guide {')
    && !styleCss.includes('body.theme-night .section-vision .vision-entry-question {')
    && !styleCss.includes('body.theme-night .section-vision .vision-entry-guide__field-drawer {')
    && !styleCss.includes('body.theme-night .section-vision .vision-entry-guide__fields li {')
    && !styleCss.includes('body.theme-night .section-vision .vision-entry-question__fields li {'),
  JSON.stringify({
    hasGuideBgToken: styleCss.includes('--vision-entry-guide-bg'),
    hasDrawerBgToken: styleCss.includes('--vision-entry-drawer-bg'),
    hasFieldColorToken: styleCss.includes('--vision-entry-field-color'),
    hasQuestionBgToken: styleCss.includes('--vision-question-entry-bg'),
    hasNightGuideOverride: styleCss.includes('body.theme-night .section-vision .vision-entry-guide {'),
    hasNightQuestionOverride: styleCss.includes('body.theme-night .section-vision .vision-entry-question {'),
    hasNightGuideFieldOverride: styleCss.includes('body.theme-night .section-vision .vision-entry-guide__fields li {'),
    hasNightQuestionFieldOverride: styleCss.includes('body.theme-night .section-vision .vision-entry-question__fields li {')
  })
);
assert('content renderers script exposes global', contentRenderersJs.includes('window.HazakuraContentRenderers'));
assert('content renderers delegates project renderer', contentRenderersJs.includes('HazakuraProjectRenderer?.render'));
assert('content renderers delegates quote prelude', contentRenderersJs.includes('HazakuraQuotePrelude?.render'));
assert('content renderers delegates vision renderer', contentRenderersJs.includes('HazakuraVisionRenderer?.render'));
assert('content renderers delegates research renderer', contentRenderersJs.includes('HazakuraResearchRenderer?.render'));
assert(
  'content renderers keeps projects markup out of the orchestrator',
  !contentRenderersJs.includes('class="project-card"')
    && !contentRenderersJs.includes('class="project-control-deck"')
    && !contentRenderersJs.includes('class="project-cycle-drawer"'),
  JSON.stringify({
    hasProjectCard: contentRenderersJs.includes('class="project-card"'),
    hasProjectControlDeck: contentRenderersJs.includes('class="project-control-deck"'),
    hasProjectCycleDrawer: contentRenderersJs.includes('class="project-cycle-drawer"')
  })
);
assert(
  'content renderers keeps vision markup out of the orchestrator',
  !contentRenderersJs.includes('class="vision-card"')
    && !contentRenderersJs.includes('class="vision-entry-guide"')
    && !contentRenderersJs.includes('class="vision-entry-question"'),
  JSON.stringify({
    hasVisionCard: contentRenderersJs.includes('class="vision-card"'),
    hasVisionEntryGuide: contentRenderersJs.includes('class="vision-entry-guide"'),
    hasVisionEntryQuestion: contentRenderersJs.includes('class="vision-entry-question"')
  })
);
assert(
  'content renderers keeps research markup out of the orchestrator',
  !contentRenderersJs.includes('class="research-log-card"')
    && !contentRenderersJs.includes('class="research-log-handoff"')
    && !contentRenderersJs.includes('class="cycle-bridge-card"'),
  JSON.stringify({
    hasResearchCard: contentRenderersJs.includes('class="research-log-card"'),
    hasResearchHandoff: contentRenderersJs.includes('class="research-log-handoff"'),
    hasCycleBridge: contentRenderersJs.includes('class="cycle-bridge-card"')
  })
);
assert('research renderer script exposes global', researchRendererJs.includes('window.HazakuraResearchRenderer'));
assert(
  'research renderer loads before content orchestrator',
  html.indexOf('src="/research-renderer.js"') >= 0
    && html.indexOf('src="/research-renderer.js"') < html.indexOf('src="/content-renderers.js"'),
  JSON.stringify({
    researchRenderer: html.indexOf('src="/research-renderer.js"'),
    contentRenderers: html.indexOf('src="/content-renderers.js"')
  })
);
assert(
  'research renderer owns handoff cards and cycle bridge',
  researchRendererJs.includes('class="research-log-handoff"')
    && researchRendererJs.includes('class="research-log-card"')
    && researchRendererJs.includes('class="cycle-bridge-card"'),
  JSON.stringify({
    hasHandoff: researchRendererJs.includes('class="research-log-handoff"'),
    hasCard: researchRendererJs.includes('class="research-log-card"'),
    hasCycleBridge: researchRendererJs.includes('class="cycle-bridge-card"')
  })
);
assert(
  'research optional notes are folded behind a drawer',
  researchRendererJs.includes('class="research-extra-drawer"')
    && researchRendererJs.includes('class="research-extra-drawer__sigil"')
    && researchRendererJs.includes('由来・断片・論文メモ')
    && researchRendererJs.includes('小径をひらく')
    && styleCss.includes('.research-extra-drawer')
    && styleCss.includes('.research-extra-drawer[open] summary::after')
    && styleCss.includes('.research-extra-drawer__body'),
  JSON.stringify({
    hasDrawerRenderer: researchRendererJs.includes('class="research-extra-drawer"'),
    hasDrawerStyles: styleCss.includes('.research-extra-drawer'),
    hasDrawerBody: styleCss.includes('.research-extra-drawer__body')
  })
);
assert('project renderer script exposes global', projectRendererJs.includes('window.HazakuraProjectRenderer'));
assert(
  'project renderer loads between filter and content orchestrator',
  html.indexOf('src="/project-filter.js"') >= 0
    && html.indexOf('src="/project-renderer.js"') > html.indexOf('src="/project-filter.js"')
    && html.indexOf('src="/project-renderer.js"') < html.indexOf('src="/content-renderers.js"'),
  JSON.stringify({
    projectFilter: html.indexOf('src="/project-filter.js"'),
    projectRenderer: html.indexOf('src="/project-renderer.js"'),
    contentRenderers: html.indexOf('src="/content-renderers.js"')
  })
);
assert('project renderer delegates project filter', projectRendererJs.includes('HazakuraProjectFilter?.init'));
assert(
  'projects entry keeps library handoff threshold',
  hazakuraContent.projectsGroup?.threshold?.title
    && projectRendererJs.includes('class="project-threshold"')
    && styleCss.includes('.project-threshold__rail')
    && scrollAnimationsJs.includes('.project-threshold'),
  JSON.stringify({
    hasData: Boolean(hazakuraContent.projectsGroup?.threshold?.title),
    hasRenderer: projectRendererJs.includes('class="project-threshold"'),
    hasStyles: styleCss.includes('.project-threshold__rail'),
    hasReveal: scrollAnimationsJs.includes('.project-threshold')
  })
);
assert(
  'projects controls stay compact before cards',
  projectRendererJs.includes('class="project-control-deck"')
    && styleCss.includes('grid-template-columns: minmax(0, 1.22fr) minmax(17rem, 0.62fr)')
    && styleCss.includes('scroll-snap-type: x proximity')
    && styleCss.includes('.project-lane-guide::before'),
  JSON.stringify({
    hasControlDeck: projectRendererJs.includes('class="project-control-deck"'),
    hasDesktopGrid: styleCss.includes('grid-template-columns: minmax(0, 1.22fr) minmax(17rem, 0.62fr)'),
    hasMobileScroller: styleCss.includes('scroll-snap-type: x proximity'),
    hasPathRail: styleCss.includes('.project-lane-guide::before')
  })
);
assert(
  'project cards compress trail notes',
  projectRendererJs.includes('class="project-trail"')
    && styleCss.includes('.project-trail')
    && ["['origin', 'Origin'", "['surprise', 'Surprise'", "['next', 'Next'"].every((snippet) => projectRendererJs.includes(snippet))
    && projectRendererJs.includes('data-trail-kind="${escapeHtml(kind)}"'),
  JSON.stringify({
    hasTrailRenderer: projectRendererJs.includes('class="project-trail"'),
    hasTrailStyles: styleCss.includes('.project-trail')
  })
);
assert(
  'project cycles are folded behind a drawer',
  projectRendererJs.includes('class="project-cycle-drawer"')
    && projectRendererJs.includes('class="project-cycle-drawer__sigil"')
    && projectRendererJs.includes('小径をひらく')
    && styleCss.includes('.project-cycle-drawer')
    && styleCss.includes('.project-cycle-drawer__sigil')
    && styleCss.includes('.project-cycle-drawer[open] summary::after'),
  JSON.stringify({
    hasDrawerRenderer: projectRendererJs.includes('class="project-cycle-drawer"'),
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
    && projectRendererJs.includes('projectsGroup.actionTypes'),
  JSON.stringify({
    actionTypes: hazakuraContent.projectsGroup?.actionTypes?.map((item) => item.type) || [],
    hasActionGuide: Object.prototype.hasOwnProperty.call(hazakuraContent.projectsGroup || {}, 'actionGuide')
  })
);
assert('quote prelude script exposes global', quotePreludeJs.includes('window.HazakuraQuotePrelude'));
assert('vision renderer script exposes global', visionRendererJs.includes('window.HazakuraVisionRenderer'));
assert(
  'vision renderer loads before content orchestrator and focus script',
  html.indexOf('src="/vision-renderer.js"') >= 0
    && html.indexOf('src="/vision-renderer.js"') < html.indexOf('src="/vision-entry-focus.js"')
    && html.indexOf('src="/vision-renderer.js"') < html.indexOf('src="/content-renderers.js"'),
  JSON.stringify({
    visionRenderer: html.indexOf('src="/vision-renderer.js"'),
    visionEntryFocus: html.indexOf('src="/vision-entry-focus.js"'),
    contentRenderers: html.indexOf('src="/content-renderers.js"')
  })
);
assert(
  'vision renderer owns entry guide and card markup',
  visionRendererJs.includes('class="vision-card"')
    && visionRendererJs.includes('class="vision-entry-guide"')
    && visionRendererJs.includes('class="vision-entry-kind-badge"'),
  JSON.stringify({
    hasVisionCard: visionRendererJs.includes('class="vision-card"'),
    hasVisionEntryGuide: visionRendererJs.includes('class="vision-entry-guide"'),
    hasKindBadge: visionRendererJs.includes('class="vision-entry-kind-badge"')
  })
);
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
  'footer return path uses smooth scroll arrival',
  smoothScrollJs.includes('.footer-garden-close__link[href^="#"]')
    && smoothScrollJs.includes('markFooterReturnArrival')
    && smoothScrollJs.includes('is-footer-return-arrival')
    && styleCss.includes('.hero.is-footer-return-arrival::after')
    && styleCss.includes('@keyframes footerReturnThread'),
  JSON.stringify({
    hasSelector: smoothScrollJs.includes('.footer-garden-close__link[href^="#"]'),
    hasHandler: smoothScrollJs.includes('markFooterReturnArrival'),
    hasArrivalClass: smoothScrollJs.includes('is-footer-return-arrival'),
    hasStyle: styleCss.includes('.hero.is-footer-return-arrival::after'),
    hasKeyframes: styleCss.includes('@keyframes footerReturnThread')
  })
);
assert(
  'quote prelude foldback uses smooth scroll arrival',
  smoothScrollJs.includes('.quote-prelude-step[href^="#"]')
    && smoothScrollJs.includes('markQuoteReturnArrival')
    && smoothScrollJs.includes('is-quote-return-arrival')
    && styleCss.includes('.section.is-quote-return-arrival .section-header::after')
    && styleCss.includes('@keyframes quoteReturnGlow'),
  JSON.stringify({
    hasSelector: smoothScrollJs.includes('.quote-prelude-step[href^="#"]'),
    hasHandler: smoothScrollJs.includes('markQuoteReturnArrival'),
    hasArrivalClass: smoothScrollJs.includes('is-quote-return-arrival'),
    hasStyle: styleCss.includes('.section.is-quote-return-arrival .section-header::after'),
    hasKeyframes: styleCss.includes('@keyframes quoteReturnGlow')
  })
);
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
assert(
  'book tilt covers every library book',
  bookTiltJs.includes("bookSelector = '.book-3d'")
    && bookTiltJs.includes('document.querySelectorAll(bookSelector)')
    && bookTiltJs.includes('book.querySelector(glareSelector)')
    && bookTiltJs.includes('books.forEach(resetBook)'),
  JSON.stringify({
    targetsAllBooks: bookTiltJs.includes("bookSelector = '.book-3d'"),
    usesAllMatches: bookTiltJs.includes('document.querySelectorAll(bookSelector)'),
    scopesGlareToBook: bookTiltJs.includes('book.querySelector(glareSelector)')
  })
);
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
