import fs from 'node:fs';
import vm from 'node:vm';
import { hazakuraContent } from '../src/data/content.js';
import { scriptLoadGroups, scriptLoadOrder } from '../src/data/script-load-order.js';
import { libraryBooks } from '../src/data/library-books.js';
import { siteNavigation } from '../src/data/site-navigation.js';
import { siteMeta, siteSocialImageUrl } from '../src/data/site-meta.js';

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
const heroSectionSource = readFile('src/components/HeroSection.astro');
const foundationSectionsSource = readFile('src/components/FoundationSections.astro');
const librarySectionSource = readFile('src/components/LibrarySection.astro');
const projectsSectionSource = readFile('src/components/ProjectsSection.astro');
const visionSectionSource = readFile('src/components/VisionSection.astro');
const mainNavigationSource = readFile('src/components/MainNavigation.astro');
const footerSectionSource = readFile('src/components/FooterSection.astro');
const quoteSectionSource = readFile('src/components/QuoteSection.astro');
const logoMarkSource = readFile('src/components/LogoMark.astro');
const routeHelperSource = readFile('src/route-responses.ts');
const pageEndpointFiles = fs.readdirSync('src/pages')
  .filter((file) => file.endsWith('.js.ts') || file === 'style.css.ts')
  .sort();
const sourceScriptPaths = fs.readdirSync('src/scripts')
  .filter((file) => file.endsWith('.js'))
  .sort()
  .map((file) => `/${file}`);
const manifestScriptPaths = scriptLoadOrder.filter((path) => path !== '/content.js');
const manifestScriptEndpointFiles = manifestScriptPaths.map((path) => `${path.slice(1)}.ts`);
const staleScriptEndpointFiles = pageEndpointFiles
  .filter((file) => file.endsWith('.js.ts') && file !== 'content.js.ts' && !manifestScriptEndpointFiles.includes(file));
const missingScriptEndpointFiles = manifestScriptEndpointFiles
  .filter((file) => !pageEndpointFiles.includes(file));
const missingScriptSources = manifestScriptPaths
  .filter((path) => !sourceScriptPaths.includes(path));
const unlistedScriptSources = sourceScriptPaths
  .filter((path) => !manifestScriptPaths.includes(path));
const rendererScriptPaths = [
  '/section-foundation-renderer.js',
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
  'site metadata uses canonical absolute social routes',
  siteMeta.siteUrl === 'https://hazakura-labo-web.pages.dev/'
    && siteMeta.imagePath === '/img/hero.png'
    && siteSocialImageUrl === 'https://hazakura-labo-web.pages.dev/img/hero.png'
    && indexSource.includes("import { siteMeta, siteSocialImageUrl }")
    && html.includes(`<link rel="canonical" href="${siteMeta.siteUrl}">`)
    && html.includes(`<meta property="og:url" content="${siteMeta.siteUrl}">`)
    && html.includes(`<meta property="og:image" content="${siteSocialImageUrl}">`)
    && html.includes(`<meta name="twitter:image" content="${siteSocialImageUrl}">`)
    && html.includes(`<link rel="icon" type="image/png" href="${siteMeta.imagePath}">`)
    && html.includes(`src="${siteMeta.imagePath}"`)
    && !html.includes('property="og:image" content="./img/hero.png"')
    && !html.includes('name="twitter:image" content="./img/hero.png"'),
  JSON.stringify({
    siteUrl: siteMeta.siteUrl,
    imagePath: siteMeta.imagePath,
    socialImage: siteSocialImageUrl,
    importsMeta: indexSource.includes("import { siteMeta, siteSocialImageUrl }"),
    hasCanonical: html.includes(`<link rel="canonical" href="${siteMeta.siteUrl}">`),
    hasOgUrl: html.includes(`<meta property="og:url" content="${siteMeta.siteUrl}">`),
    hasOgImage: html.includes(`<meta property="og:image" content="${siteSocialImageUrl}">`),
    hasTwitterImage: html.includes(`<meta name="twitter:image" content="${siteSocialImageUrl}">`)
  })
);
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
const expectedNavigationHrefs = ['#philosophy', '#layers', '#library', '#projects', '#research-log-strip', '#vision'];
assert(
  'persistent garden routes are data-backed',
  mainNavigationSource.includes("import { siteNavigation }")
    && mainNavigationSource.includes('siteNavigation.map')
    && mainNavigationSource.includes('aria-label="葉桜ラボの主要巡回路"')
    && footerSectionSource.includes('aria-label="葉桜ラボの終端巡回路"')
    && !indexSource.includes('<li><a href="#philosophy">')
    && !indexSource.includes('<a href="#philosophy">哲学</a>')
    && JSON.stringify(siteNavigation.map((item) => item.href)) === JSON.stringify(expectedNavigationHrefs)
    && siteNavigation.every((item) => item.navLabel && item.footerLabel)
    && siteNavigation.every((item) => html.includes(`href="${item.href}">${item.navLabel}</a>`))
    && siteNavigation.every((item) => html.includes(`href="${item.href}">${item.footerLabel}</a>`)),
  JSON.stringify({
    importsNavigation: mainNavigationSource.includes("import { siteNavigation }"),
    mapsNavigation: mainNavigationSource.includes('siteNavigation.map'),
    hasMainRouteLabel: mainNavigationSource.includes('aria-label="葉桜ラボの主要巡回路"'),
    hasFooterRouteLabel: footerSectionSource.includes('aria-label="葉桜ラボの終端巡回路"'),
    hardcodedNavPhilosophy: indexSource.includes('<li><a href="#philosophy">'),
    hardcodedFooterPhilosophy: indexSource.includes('<a href="#philosophy">哲学</a>'),
    hrefs: siteNavigation.map((item) => item.href),
    navLabels: siteNavigation.map((item) => item.navLabel),
    footerLabels: siteNavigation.map((item) => item.footerLabel)
  })
);
assert(
  'main navigation stays componentized and data-backed',
  indexSource.includes("import MainNavigation from '../components/MainNavigation.astro'")
    && indexSource.includes('<MainNavigation />')
    && !indexSource.includes('class="nav-inner"')
    && !indexSource.includes('id="nav-links"')
    && !indexSource.includes("import { siteNavigation }")
    && mainNavigationSource.includes("import LogoMark from './LogoMark.astro'")
    && mainNavigationSource.includes("import { siteNavigation }")
    && mainNavigationSource.includes('id="nav-main"')
    && mainNavigationSource.includes('id="nav-logo"')
    && mainNavigationSource.includes('id="nav-links"')
    && mainNavigationSource.includes('siteNavigation.map')
    && html.includes('id="nav-main"')
    && html.includes('id="nav-links"'),
  JSON.stringify({
    importsComponent: indexSource.includes("import MainNavigation from '../components/MainNavigation.astro'"),
    usesComponent: indexSource.includes('<MainNavigation />'),
    indexContainsNavInner: indexSource.includes('class="nav-inner"'),
    indexContainsNavLinks: indexSource.includes('id="nav-links"'),
    indexImportsNavigation: indexSource.includes("import { siteNavigation }"),
    componentImportsLogo: mainNavigationSource.includes("import LogoMark from './LogoMark.astro'"),
    componentImportsNavigation: mainNavigationSource.includes("import { siteNavigation }"),
    componentHasMainNav: mainNavigationSource.includes('id="nav-main"'),
    componentHasLogoTarget: mainNavigationSource.includes('id="nav-logo"'),
    componentHasRouteList: mainNavigationSource.includes('id="nav-links"'),
    componentMapsRoutes: mainNavigationSource.includes('siteNavigation.map')
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
assert(
  'script manifest mirrors source files and route endpoints',
  missingScriptSources.length === 0
    && unlistedScriptSources.length === 0
    && missingScriptEndpointFiles.length === 0
    && staleScriptEndpointFiles.length === 0
    && manifestScriptPaths.every((path) => {
      const endpointSource = readFile(`src/pages/${path.slice(1)}.ts`);
      return endpointSource.includes(`import source from '../scripts/${path.slice(1)}?raw'`)
        && endpointSource.includes('javascriptResponse(source)');
    }),
  JSON.stringify({
    missingScriptSources,
    unlistedScriptSources,
    missingScriptEndpointFiles,
    staleScriptEndpointFiles
  })
);
assert(
  'compatible asset routes share response helper',
  routeHelperSource.includes('javascriptResponse')
    && routeHelperSource.includes('stylesheetResponse')
    && routeHelperSource.includes('new Response')
    && pageEndpointFiles.every((file) => readFile(`src/pages/${file}`).includes("../route-responses"))
    && pageEndpointFiles.every((file) => !readFile(`src/pages/${file}`).includes('new Response'))
    && readFile('src/pages/style.css.ts').includes('stylesheetResponse(source)')
    && pageEndpointFiles.filter((file) => file.endsWith('.js.ts')).every((file) => readFile(`src/pages/${file}`).includes('javascriptResponse(')),
  JSON.stringify({
    endpointCount: pageEndpointFiles.length,
    missingHelperImport: pageEndpointFiles.filter((file) => !readFile(`src/pages/${file}`).includes("../route-responses")),
    localResponses: pageEndpointFiles.filter((file) => readFile(`src/pages/${file}`).includes('new Response'))
  })
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
  'hero section stays componentized and data-backed',
  indexSource.includes("import HeroSection from '../components/HeroSection.astro'")
    && indexSource.includes('<HeroSection />')
    && !indexSource.includes('class="hero-mesh"')
    && !indexSource.includes('id="hero-title"')
    && heroSectionSource.includes("import { siteMeta }")
    && heroSectionSource.includes('id="hero"')
    && heroSectionSource.includes('class="hero-mesh"')
    && heroSectionSource.includes('siteMeta.imagePath')
    && heroSectionSource.includes('siteMeta.imageAlt')
    && heroSectionSource.includes('AIと、語ろう。')
    && html.includes('id="hero"')
    && html.includes('id="hero-title"')
    && html.includes(`src="${siteMeta.imagePath}"`),
  JSON.stringify({
    importsComponent: indexSource.includes("import HeroSection from '../components/HeroSection.astro'"),
    usesComponent: indexSource.includes('<HeroSection />'),
    indexContainsHeroMesh: indexSource.includes('class="hero-mesh"'),
    indexContainsHeroTitle: indexSource.includes('id="hero-title"'),
    componentImportsMeta: heroSectionSource.includes("import { siteMeta }"),
    componentHasHero: heroSectionSource.includes('id="hero"'),
    componentHasMesh: heroSectionSource.includes('class="hero-mesh"'),
    componentUsesImagePath: heroSectionSource.includes('siteMeta.imagePath'),
    componentUsesImageAlt: heroSectionSource.includes('siteMeta.imageAlt'),
    htmlHasHero: html.includes('id="hero"'),
    htmlHasHeroTitle: html.includes('id="hero-title"')
  })
);
assert(
  'foundation sections stay componentized as the opening garden layers',
  indexSource.includes("import FoundationSections from '../components/FoundationSections.astro'")
    && indexSource.includes('<FoundationSections />')
    && !indexSource.includes('id="philosophy"')
    && !indexSource.includes('id="layers"')
    && !indexSource.includes('data-render="philosophy"')
    && !indexSource.includes('data-render="experienceLayers"')
    && foundationSectionsSource.includes('id="philosophy"')
    && foundationSectionsSource.includes('data-zone="day"')
    && foundationSectionsSource.includes('id="philosophy-grid"')
    && foundationSectionsSource.includes('data-render="philosophy"')
    && foundationSectionsSource.includes('id="layers"')
    && foundationSectionsSource.includes('data-zone="dusk"')
    && foundationSectionsSource.includes('id="layer-grid"')
    && foundationSectionsSource.includes('data-render="experienceLayers"')
    && html.indexOf('id="philosophy"') > html.indexOf('id="hero"')
    && html.indexOf('id="layers"') > html.indexOf('id="philosophy"')
    && html.indexOf('id="library"') > html.indexOf('id="layers"'),
  JSON.stringify({
    importsComponent: indexSource.includes("import FoundationSections from '../components/FoundationSections.astro'"),
    usesComponent: indexSource.includes('<FoundationSections />'),
    indexContainsPhilosophy: indexSource.includes('id="philosophy"'),
    indexContainsLayers: indexSource.includes('id="layers"'),
    indexContainsPhilosophyRenderHook: indexSource.includes('data-render="philosophy"'),
    indexContainsLayersRenderHook: indexSource.includes('data-render="experienceLayers"'),
    componentHasPhilosophy: foundationSectionsSource.includes('id="philosophy"'),
    componentHasPhilosophyRenderHook: foundationSectionsSource.includes('data-render="philosophy"'),
    componentHasLayers: foundationSectionsSource.includes('id="layers"'),
    componentHasLayersRenderHook: foundationSectionsSource.includes('data-render="experienceLayers"'),
    heroPosition: html.indexOf('id="hero"'),
    philosophyPosition: html.indexOf('id="philosophy"'),
    layersPosition: html.indexOf('id="layers"'),
    libraryPosition: html.indexOf('id="library"')
  })
);
assert(
  'library section stays componentized and data-backed',
  indexSource.includes("import LibrarySection from '../components/LibrarySection.astro'")
    && indexSource.includes('<LibrarySection />')
    && !indexSource.includes("import { libraryBooks }")
    && !indexSource.includes('libraryBooks.map')
    && !indexSource.includes('class="library-projects-bridge"')
    && librarySectionSource.includes("import { libraryBooks }")
    && librarySectionSource.includes("import { libraryProjectsBridge }")
    && librarySectionSource.includes('libraryBooks.map')
    && librarySectionSource.includes('libraryProjectsBridge.steps.map')
    && !librarySectionSource.includes('<h3 class="book-info-title">チカちゃんの哲学冒険譚</h3>')
    && Array.isArray(libraryBooks)
    && libraryBooks.length === 2
    && libraryBooks.every((book) => book.title && book.image?.src && book.action?.href),
  JSON.stringify({
    importsComponent: indexSource.includes("import LibrarySection from '../components/LibrarySection.astro'"),
    usesComponent: indexSource.includes('<LibrarySection />'),
    indexImportsLibraryData: indexSource.includes("import { libraryBooks }"),
    indexMapsBooks: indexSource.includes('libraryBooks.map'),
    indexContainsBridgeMarkup: indexSource.includes('class="library-projects-bridge"'),
    componentImportsBooks: librarySectionSource.includes("import { libraryBooks }"),
    componentImportsBridge: librarySectionSource.includes("import { libraryProjectsBridge }"),
    componentMapsBooks: librarySectionSource.includes('libraryBooks.map'),
    componentMapsBridgeSteps: librarySectionSource.includes('libraryProjectsBridge.steps.map'),
    hasHardcodedFirstTitle: librarySectionSource.includes('<h3 class="book-info-title">チカちゃんの哲学冒険譚</h3>'),
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
assert(
  'projects section stays componentized as the night experiment shelf',
  indexSource.includes("import ProjectsSection from '../components/ProjectsSection.astro'")
    && indexSource.includes('<ProjectsSection />')
    && !indexSource.includes('id="project-list"')
    && !indexSource.includes('data-render="projects"')
    && projectsSectionSource.includes('id="projects"')
    && projectsSectionSource.includes('data-zone="night"')
    && projectsSectionSource.includes('id="project-list"')
    && projectsSectionSource.includes('data-render="projects"')
    && projectsSectionSource.includes('Projects — 実験の棚')
    && html.indexOf('id="projects"') > html.indexOf('id="library"')
    && html.indexOf('id="vision"') > html.indexOf('id="projects"')
    && html.includes('id="project-list"')
    && html.includes('data-render="projects"'),
  JSON.stringify({
    importsComponent: indexSource.includes("import ProjectsSection from '../components/ProjectsSection.astro'"),
    usesComponent: indexSource.includes('<ProjectsSection />'),
    indexContainsProjectList: indexSource.includes('id="project-list"'),
    indexContainsProjectsRenderHook: indexSource.includes('data-render="projects"'),
    componentHasProjects: projectsSectionSource.includes('id="projects"'),
    componentHasNightZone: projectsSectionSource.includes('data-zone="night"'),
    componentHasRenderHook: projectsSectionSource.includes('data-render="projects"'),
    libraryPosition: html.indexOf('id="library"'),
    projectsPosition: html.indexOf('id="projects"'),
    visionPosition: html.indexOf('id="vision"')
  })
);
assert(
  'vision section stays componentized with its moon garden and nested log targets',
  indexSource.includes("import VisionSection from '../components/VisionSection.astro'")
    && indexSource.includes('<VisionSection />')
    && !indexSource.includes('class="star-layer')
    && !indexSource.includes('class="night-moon"')
    && !indexSource.includes('id="vision-grid"')
    && !indexSource.includes('id="research-log-strip"')
    && visionSectionSource.includes('id="vision"')
    && visionSectionSource.includes('data-zone="moon"')
    && visionSectionSource.includes('class="star-layer star-layer--large"')
    && visionSectionSource.includes('class="night-moon"')
    && visionSectionSource.includes('id="vision-grid"')
    && visionSectionSource.includes('data-render="visions"')
    && visionSectionSource.includes('id="process-flow"')
    && visionSectionSource.includes('data-render="process"')
    && visionSectionSource.includes('id="research-log-strip"')
    && visionSectionSource.includes('data-render="researchLogs"')
    && visionSectionSource.includes('id="cycle-bridge"')
    && visionSectionSource.includes('data-render="cycleBridge"')
    && html.indexOf('id="vision"') > html.indexOf('id="projects"')
    && html.indexOf('id="quote"') > html.indexOf('id="vision"'),
  JSON.stringify({
    importsComponent: indexSource.includes("import VisionSection from '../components/VisionSection.astro'"),
    usesComponent: indexSource.includes('<VisionSection />'),
    indexContainsStars: indexSource.includes('class="star-layer'),
    indexContainsMoon: indexSource.includes('class="night-moon"'),
    indexContainsVisionGrid: indexSource.includes('id="vision-grid"'),
    indexContainsResearchLog: indexSource.includes('id="research-log-strip"'),
    componentHasVision: visionSectionSource.includes('id="vision"'),
    componentHasMoonZone: visionSectionSource.includes('data-zone="moon"'),
    componentHasStars: visionSectionSource.includes('class="star-layer star-layer--large"'),
    componentHasMoon: visionSectionSource.includes('class="night-moon"'),
    componentHasVisionHook: visionSectionSource.includes('data-render="visions"'),
    componentHasResearchHook: visionSectionSource.includes('data-render="researchLogs"'),
    projectsPosition: html.indexOf('id="projects"'),
    visionPosition: html.indexOf('id="vision"'),
    quotePosition: html.indexOf('id="quote"')
  })
);
assert(
  'quote section stays componentized as the final echo',
  indexSource.includes("import QuoteSection from '../components/QuoteSection.astro'")
    && indexSource.includes('<QuoteSection />')
    && !indexSource.includes('class="quote-prelude"')
    && !indexSource.includes('id="quote-block"')
    && quoteSectionSource.includes('id="quote"')
    && quoteSectionSource.includes('data-zone="aurora"')
    && quoteSectionSource.includes('id="quote-prelude"')
    && quoteSectionSource.includes('data-render="quotePrelude"')
    && quoteSectionSource.includes('id="quote-block"')
    && quoteSectionSource.includes('佐久間象山')
    && html.includes('id="quote"')
    && html.includes('id="quote-prelude"')
    && html.includes('id="quote-block"'),
  JSON.stringify({
    importsComponent: indexSource.includes("import QuoteSection from '../components/QuoteSection.astro'"),
    usesComponent: indexSource.includes('<QuoteSection />'),
    indexContainsPreludeMarkup: indexSource.includes('class="quote-prelude"'),
    indexContainsQuoteBlock: indexSource.includes('id="quote-block"'),
    componentHasQuote: quoteSectionSource.includes('id="quote"'),
    componentHasAuroraZone: quoteSectionSource.includes('data-zone="aurora"'),
    componentHasPreludeTarget: quoteSectionSource.includes('id="quote-prelude"'),
    componentHasPreludeRenderHook: quoteSectionSource.includes('data-render="quotePrelude"'),
    componentHasQuoteBlock: quoteSectionSource.includes('id="quote-block"'),
    htmlHasQuote: html.includes('id="quote"'),
    htmlHasPrelude: html.includes('id="quote-prelude"'),
    htmlHasQuoteBlock: html.includes('id="quote-block"')
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
  ['#library', '#projects', '#research-log-strip', '#vision'].every((href) => hazakuraContent.quotePrelude?.steps?.some((step) => step.href === href)),
  JSON.stringify(hazakuraContent.quotePrelude?.steps || [])
);

const appControllerJs = readFile('dist/app-controller.js');
const styleCss = readFile('dist/style.css');
const domHelpersJs = readFile('dist/dom-helpers.js');
const contentRenderersJs = readFile('dist/content-renderers.js');
const sectionFoundationRendererJs = readFile('dist/section-foundation-renderer.js');
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
const scrollTargetJs = readFile('dist/scroll-target.js');
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
  'research log strip is a named landmark target',
  html.includes('class="research-log-strip" id="research-log-strip"')
    && html.includes('aria-labelledby="research-log-strip-title"')
    && researchRendererJs.includes('id="research-log-strip-title"')
    && researchRendererJs.includes('Research Log'),
  JSON.stringify({
    hasSectionTarget: html.includes('class="research-log-strip" id="research-log-strip"'),
    hasLabelReference: html.includes('aria-labelledby="research-log-strip-title"'),
    rendererOwnsHeading: researchRendererJs.includes('id="research-log-strip-title"')
  })
);
assert(
  'research log is reachable from persistent garden routes',
  html.includes('href="#research-log-strip">記 録</a>')
    && html.includes('href="#research-log-strip">記録</a>')
    && styleCss.includes('grid-template-columns: repeat(6, minmax(0, 1fr))')
    && styleCss.includes('.nav-logo:focus-visible')
    && styleCss.includes('.footer-nav a:focus-visible')
    && styleCss.includes('--garden-route-focus-outline')
    && styleCss.includes('outline-offset: var(--garden-route-focus-offset, 4px)')
    && styleCss.includes('body.theme-night :is(.nav, .footer-nav)')
    && styleCss.includes('--garden-route-focus-offset: 2px')
    && styleCss.includes('--garden-nav-link-color')
    && styleCss.includes('--garden-nav-mobile-link-hover-bg')
    && styleCss.includes('.nav-logo[aria-current="location"]')
    && styleCss.includes('.nav-links a[aria-current="location"]')
    && styleCss.includes('.footer-garden-close__link[aria-current="location"]')
    && styleCss.includes('.footer-nav a[aria-current="location"]')
    && styleCss.includes('body.theme-night .nav {')
    && styleCss.includes('body.theme-night .nav:not(.scrolled) .nav-links a')
    && !styleCss.includes('body.theme-night .nav-links a {')
    && !styleCss.includes('body.theme-night .nav-links a:hover {')
    && scrollIndicatorsJs.includes("routeLinkSelector = '.nav-logo[href^=\"#\"], .nav-links a[href^=\"#\"], .footer-garden-close__link[href^=\"#\"], .footer-nav a[href^=\"#\"]'")
    && scrollIndicatorsJs.includes('const sectionsAtProbe = Array.from(document.querySelectorAll(\'section[id]\')).filter')
    && scrollIndicatorsJs.includes('const sectionAtProbe = sectionsAtProbe.at(-1)')
    && scrollIndicatorsJs.includes('function getRouteAtProbe()')
    && scrollIndicatorsJs.includes('return routeTargets.find((route) => route.element === sectionAtProbe) || null')
    && !scrollIndicatorsJs.includes('routeTargets.forEach((route) =>')
    && !scrollIndicatorsJs.includes('offsetTop')
    && scrollIndicatorsJs.includes("link.setAttribute('aria-current', 'location')")
    && scrollIndicatorsJs.includes("link.removeAttribute('aria-current')")
    && smoothScrollJs.includes('.nav-links a[href="#research-log-strip"], .footer-nav a[href="#research-log-strip"]')
    && smoothScrollJs.includes('is-research-route-arrival')
    && styleCss.includes('.research-log-strip:is(.is-quote-return-arrival, .is-research-route-arrival) .research-log-handoff'),
  JSON.stringify({
    hasNavLink: html.includes('href="#research-log-strip">記 録</a>'),
    hasFooterLink: html.includes('href="#research-log-strip">記録</a>'),
    hasSixColumnMobileNav: styleCss.includes('grid-template-columns: repeat(6, minmax(0, 1fr))'),
    hasMainRouteFocus: styleCss.includes('.nav-logo:focus-visible'),
    hasFooterRouteFocus: styleCss.includes('.footer-nav a:focus-visible'),
    hasFocusToken: styleCss.includes('--garden-route-focus-outline'),
    hasFocusOffsetToken: styleCss.includes('outline-offset: var(--garden-route-focus-offset, 4px)'),
    hasSharedNightRouteTokens: styleCss.includes('body.theme-night :is(.nav, .footer-nav)'),
    hasCompactMobileFocusOffset: styleCss.includes('--garden-route-focus-offset: 2px'),
    hasNavToneToken: styleCss.includes('--garden-nav-link-color'),
    hasMobileRouteToneToken: styleCss.includes('--garden-nav-mobile-link-hover-bg'),
    hasCurrentLogoStyle: styleCss.includes('.nav-logo[aria-current="location"]'),
    hasCurrentNavStyle: styleCss.includes('.nav-links a[aria-current="location"]'),
    hasCurrentReturnStyle: styleCss.includes('.footer-garden-close__link[aria-current="location"]'),
    hasCurrentFooterStyle: styleCss.includes('.footer-nav a[aria-current="location"]'),
    hasNightNavTokenScope: styleCss.includes('body.theme-night .nav {'),
    hasHeroNavState: styleCss.includes('body.theme-night .nav:not(.scrolled) .nav-links a'),
    hasDirectNightNavColor: styleCss.includes('body.theme-night .nav-links a {'),
    hasDirectNightNavHover: styleCss.includes('body.theme-night .nav-links a:hover {'),
    hasRouteCurrentSelector: scrollIndicatorsJs.includes("routeLinkSelector = '.nav-logo[href^=\"#\"], .nav-links a[href^=\"#\"], .footer-garden-close__link[href^=\"#\"], .footer-nav a[href^=\"#\"]'"),
    hasNestedSectionProbeList: scrollIndicatorsJs.includes('const sectionsAtProbe = Array.from(document.querySelectorAll(\'section[id]\')).filter'),
    hasNestedSectionPreference: scrollIndicatorsJs.includes('const sectionAtProbe = sectionsAtProbe.at(-1)'),
    hasProbeRouteHelper: scrollIndicatorsJs.includes('function getRouteAtProbe()'),
    mapsProbeSectionDirectly: scrollIndicatorsJs.includes('return routeTargets.find((route) => route.element === sectionAtProbe) || null'),
    hasRouteScanFallback: scrollIndicatorsJs.includes('routeTargets.forEach((route) =>'),
    hasOffsetSort: scrollIndicatorsJs.includes('offsetTop'),
    setsRouteCurrent: scrollIndicatorsJs.includes("link.setAttribute('aria-current', 'location')"),
    clearsRouteCurrent: scrollIndicatorsJs.includes("link.removeAttribute('aria-current')"),
    hasSmoothScrollSelector: smoothScrollJs.includes('.nav-links a[href="#research-log-strip"], .footer-nav a[href="#research-log-strip"]'),
    hasArrivalClass: smoothScrollJs.includes('is-research-route-arrival'),
    hasArrivalStyle: styleCss.includes('.research-log-strip:is(.is-quote-return-arrival, .is-research-route-arrival) .research-log-handoff')
  })
);
assert(
  'quote prelude theme is tokenized',
  [
    '--quote-prelude-bg',
    '--quote-prelude-accent',
    '--quote-prelude-step-rail',
    '--quote-prelude-step-rail-vertical',
    '--quote-prelude-step-marker-bg',
    '--quote-prelude-step-hover-bg'
  ].every((snippet) => styleCss.includes(snippet))
    && styleCss.includes('body.theme-night .quote-prelude-card')
    && !styleCss.includes('body.theme-night .quote-prelude-eyebrow')
    && !styleCss.includes('body.theme-night .quote-prelude-title')
    && !styleCss.includes('body.theme-night .quote-prelude-text')
    && !styleCss.includes('body.theme-night .quote-prelude-step {')
    && !styleCss.includes('body.theme-night .quote-prelude-step[href]:hover')
    && !styleCss.includes('body.theme-night .quote-prelude-step::before')
    && !styleCss.includes('body.theme-night .quote-prelude-step__label')
    && !styleCss.includes('body.theme-night .quote-prelude-step__text'),
  JSON.stringify({
    hasBackgroundToken: styleCss.includes('--quote-prelude-bg'),
    hasAccentToken: styleCss.includes('--quote-prelude-accent'),
    hasRailToken: styleCss.includes('--quote-prelude-step-rail'),
    hasVerticalRailToken: styleCss.includes('--quote-prelude-step-rail-vertical'),
    hasMarkerBgToken: styleCss.includes('--quote-prelude-step-marker-bg'),
    hasHoverToken: styleCss.includes('--quote-prelude-step-hover-bg'),
    hasNightCardTokenScope: styleCss.includes('body.theme-night .quote-prelude-card'),
    hasDirectNightEyebrow: styleCss.includes('body.theme-night .quote-prelude-eyebrow'),
    hasDirectNightTitle: styleCss.includes('body.theme-night .quote-prelude-title'),
    hasDirectNightText: styleCss.includes('body.theme-night .quote-prelude-text'),
    hasDirectNightStep: styleCss.includes('body.theme-night .quote-prelude-step {'),
    hasDirectNightStepHover: styleCss.includes('body.theme-night .quote-prelude-step[href]:hover'),
    hasDirectNightMarker: styleCss.includes('body.theme-night .quote-prelude-step::before'),
    hasDirectNightStepLabel: styleCss.includes('body.theme-night .quote-prelude-step__label'),
    hasDirectNightStepText: styleCss.includes('body.theme-night .quote-prelude-step__text')
  })
);
assert(
  'quote prelude steps keep a compact route marker structure',
  quotePreludeJs.includes('quote-prelude-step__label')
    && quotePreludeJs.includes('quote-prelude-step__text')
    && styleCss.includes('counter-increment: quote-prelude')
    && styleCss.includes('.quote-prelude-step::before')
    && styleCss.includes('counter(quote-prelude, decimal-leading-zero)')
    && styleCss.includes('grid-template-columns: 1.75rem minmax(0, 1fr)'),
  JSON.stringify({
    hasLabelSpan: quotePreludeJs.includes('quote-prelude-step__label'),
    hasTextSpan: quotePreludeJs.includes('quote-prelude-step__text'),
    hasCounterIncrement: styleCss.includes('counter-increment: quote-prelude'),
    hasMarkerPseudo: styleCss.includes('.quote-prelude-step::before'),
    hasDecimalMarker: styleCss.includes('counter(quote-prelude, decimal-leading-zero)'),
    hasMobileMarkerGrid: styleCss.includes('grid-template-columns: 1.75rem minmax(0, 1fr)')
  })
);
assert(
  'quote prelude route markers reveal in order',
  styleCss.includes('.quote-prelude-card.visible .quote-prelude-steps li')
    && styleCss.includes('--quote-prelude-step-delay')
    && styleCss.includes('transition-delay: calc(var(--quote-prelude-step-delay, 0) * 82ms)')
    && quotePreludeJs.includes('item.steps.map((step, index)')
    && quotePreludeJs.includes('style="--quote-prelude-step-delay: ${index + 1};"')
    && !styleCss.includes('.quote-prelude-steps li:nth-child('),
  JSON.stringify({
    hasVisibleStepRule: styleCss.includes('.quote-prelude-card.visible .quote-prelude-steps li'),
    hasDelayToken: styleCss.includes('--quote-prelude-step-delay'),
    hasDelayFormula: styleCss.includes('transition-delay: calc(var(--quote-prelude-step-delay, 0) * 82ms)'),
    rendererSetsDelay: quotePreludeJs.includes('style="--quote-prelude-step-delay: ${index + 1};"'),
    fixedStepSelectors: styleCss.includes('.quote-prelude-steps li:nth-child(')
  })
);
assert(
  'library reading access row stays quieter than a sales block',
  libraryBooks.every((book) => book.price?.label === '読書入口')
    && ['--book-access-bg', '--book-access-label-bg', '--book-access-buy'].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-library .price-label')
    && !/\.price-buy\s*{[^}]*font-size:\s*1\.4rem/s.test(styleCss),
  JSON.stringify({
    priceLabels: libraryBooks.map((book) => book.price?.label),
    hasAccessBgToken: styleCss.includes('--book-access-bg'),
    hasAccessLabelBgToken: styleCss.includes('--book-access-label-bg'),
    hasAccessBuyToken: styleCss.includes('--book-access-buy'),
    hasDirectNightPriceLabel: styleCss.includes('body.theme-night .section-library .price-label'),
    hasLargePriceFont: /\.price-buy\s*{[^}]*font-size:\s*1\.4rem/s.test(styleCss)
  })
);
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
assert(
  'app controller delegates scroll animations with reduced-motion reveal fallback',
  appControllerJs.includes('HazakuraScrollAnimations?.init')
    && appControllerJs.includes('scrollAnimations?.revealAll()')
    && !appControllerJs.includes('scrollAnimations?.setAllCounters()'),
  JSON.stringify({
    initializesScrollAnimations: appControllerJs.includes('HazakuraScrollAnimations?.init'),
    revealsOnReducedMotionChange: appControllerJs.includes('scrollAnimations?.revealAll()'),
    hasStaleCounterFallback: appControllerJs.includes('scrollAnimations?.setAllCounters()')
  })
);
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
  [sectionFoundationRendererJs, projectRendererJs, quotePreludeJs, researchRendererJs, visionRendererJs].every((source) => source.includes('window.HazakuraDom'))
    && [contentRenderersJs, sectionFoundationRendererJs, projectRendererJs, quotePreludeJs, researchRendererJs, visionRendererJs].every((source) => !source.includes('function escapeHtml')),
  JSON.stringify({
    foundationUsesHelper: sectionFoundationRendererJs.includes('window.HazakuraDom'),
    projectUsesHelper: projectRendererJs.includes('window.HazakuraDom'),
    quoteUsesHelper: quotePreludeJs.includes('window.HazakuraDom'),
    researchUsesHelper: researchRendererJs.includes('window.HazakuraDom'),
    visionUsesHelper: visionRendererJs.includes('window.HazakuraDom'),
    duplicateEscapeFunctions: [
      ['content-renderers', contentRenderersJs.includes('function escapeHtml')],
      ['section-foundation-renderer', sectionFoundationRendererJs.includes('function escapeHtml')],
      ['project-renderer', projectRendererJs.includes('function escapeHtml')],
      ['quote-prelude', quotePreludeJs.includes('function escapeHtml')],
      ['research-renderer', researchRendererJs.includes('function escapeHtml')],
      ['vision-renderer', visionRendererJs.includes('function escapeHtml')]
    ].filter(([, hasDuplicate]) => hasDuplicate).map(([name]) => name)
  })
);
assert(
  'project action destinations share DOM helper formatting',
  projectRendererJs.includes('formatExternalDestination')
    && !projectRendererJs.includes('new URL(item.href')
    && researchRendererJs.includes('formatExternalDestination(source.url)')
    && domHelpersJs.includes('formatExternalDestination'),
  JSON.stringify({
    projectUsesHelper: projectRendererJs.includes('formatExternalDestination'),
    projectHasInlineUrlParser: projectRendererJs.includes('new URL(item.href'),
    researchUsesHelper: researchRendererJs.includes('formatExternalDestination(source.url)'),
    helperExposesFormatter: domHelpersJs.includes('formatExternalDestination')
  })
);
assert('style sheet contains design tokens', styleCss.includes('--sakura-500') && styleCss.includes('.hero'));
assert(
  'site logo mark is CSS-rendered rather than emoji-rendered',
  mainNavigationSource.includes("import LogoMark from './LogoMark.astro'")
    && footerSectionSource.includes("import LogoMark from './LogoMark.astro'")
    && (mainNavigationSource.match(/<LogoMark \/>/g) || []).length === 1
    && (footerSectionSource.match(/<LogoMark \/>/g) || []).length === 1
    && logoMarkSource.includes("['logo-icon', 'logo-mark', className]")
    && logoMarkSource.includes('class="logo-mark__petal logo-mark__petal--top"')
    && logoMarkSource.includes('class="logo-mark__leaf"')
    && logoMarkSource.includes('class="logo-mark__core"')
    && !indexSource.includes('class="logo-mark__petal')
    && !mainNavigationSource.includes('class="logo-mark__petal')
    && !footerSectionSource.includes('class="logo-mark__petal')
    && !indexSource.includes('<span class="logo-icon">🌸</span>')
    && !mainNavigationSource.includes('<span class="logo-icon">🌸</span>')
    && !footerSectionSource.includes('<span class="logo-icon">🌸</span>')
    && (html.match(/class="logo-icon logo-mark"/g) || []).length === 2
    && ['.logo-mark__petal', '.logo-mark__leaf', '.logo-mark__core'].every((snippet) => styleCss.includes(snippet))
    && styleCss.includes('body.theme-night .logo-icon'),
  JSON.stringify({
    importsLogoMark: mainNavigationSource.includes("import LogoMark from './LogoMark.astro'"),
    footerImportsLogoMark: footerSectionSource.includes("import LogoMark from './LogoMark.astro'"),
    mainNavigationLogoMarkUsages: (mainNavigationSource.match(/<LogoMark \/>/g) || []).length,
    footerLogoMarkUsages: (footerSectionSource.match(/<LogoMark \/>/g) || []).length,
    componentHasBaseClasses: logoMarkSource.includes("['logo-icon', 'logo-mark', className]"),
    componentHasPetalMarkup: logoMarkSource.includes('class="logo-mark__petal logo-mark__petal--top"'),
    componentHasLeafMarkup: logoMarkSource.includes('class="logo-mark__leaf"'),
    componentHasCoreMarkup: logoMarkSource.includes('class="logo-mark__core"'),
    indexHasInlineMarkPetals: indexSource.includes('class="logo-mark__petal'),
    mainNavigationHasInlineMarkPetals: mainNavigationSource.includes('class="logo-mark__petal'),
    footerHasInlineMarkPetals: footerSectionSource.includes('class="logo-mark__petal'),
    hasEmojiLogo: indexSource.includes('<span class="logo-icon">🌸</span>')
      || mainNavigationSource.includes('<span class="logo-icon">🌸</span>')
      || footerSectionSource.includes('<span class="logo-icon">🌸</span>'),
    renderedMarkCount: (html.match(/class="logo-icon logo-mark"/g) || []).length,
    hasPetalStyle: styleCss.includes('.logo-mark__petal'),
    hasLeafStyle: styleCss.includes('.logo-mark__leaf'),
    hasCoreStyle: styleCss.includes('.logo-mark__core'),
    hasNightLogoTokens: styleCss.includes('body.theme-night .logo-icon')
  })
);
assert(
  'footer section stays componentized and data-backed',
  indexSource.includes("import FooterSection from '../components/FooterSection.astro'")
    && indexSource.includes('<FooterSection />')
    && !indexSource.includes('class="footer-garden-close"')
    && !indexSource.includes('class="footer-nav"')
    && !indexSource.includes('https://www.amazon.co.jp/dp/B0GSWNNZL7')
    && footerSectionSource.includes("import { siteNavigation }")
    && footerSectionSource.includes("import { libraryBooks }")
    && footerSectionSource.includes('siteNavigation.map')
    && footerSectionSource.includes('primaryBookHref')
    && footerSectionSource.includes('class="footer-garden-close"')
    && footerSectionSource.includes('class="footer-nav"')
    && html.includes('class="footer-garden-close"')
    && html.includes(`href="${libraryBooks[0].action.href}" target="_blank" rel="noopener noreferrer">Kindleで読む</a>`),
  JSON.stringify({
    importsComponent: indexSource.includes("import FooterSection from '../components/FooterSection.astro'"),
    usesComponent: indexSource.includes('<FooterSection />'),
    indexContainsFooterClose: indexSource.includes('class="footer-garden-close"'),
    indexContainsFooterNav: indexSource.includes('class="footer-nav"'),
    indexContainsHardcodedKindleUrl: indexSource.includes('https://www.amazon.co.jp/dp/B0GSWNNZL7'),
    componentImportsNavigation: footerSectionSource.includes("import { siteNavigation }"),
    componentImportsBooks: footerSectionSource.includes("import { libraryBooks }"),
    componentMapsRoutes: footerSectionSource.includes('siteNavigation.map'),
    componentHasBookHref: footerSectionSource.includes('primaryBookHref'),
    renderedFooterClose: html.includes('class="footer-garden-close"'),
    renderedKindleLink: html.includes(`href="${libraryBooks[0].action.href}" target="_blank" rel="noopener noreferrer">Kindleで読む</a>`)
  })
);
assert(
  'style sheet contains shared anchor offset',
  styleCss.includes('--hazakura-anchor-offset: 84px')
    && styleCss.includes('--hazakura-anchor-offset: 116px')
    && styleCss.includes('scroll-padding-top: var(--hazakura-anchor-offset)')
);
assert(
  'hero viewport rhythm is tokenized for mobile browser chrome',
  styleCss.includes('--hero-min-block-size: 100vh')
    && styleCss.includes('@supports (min-height: 100dvh)')
    && styleCss.includes('--hero-min-block-size: 100dvh')
    && styleCss.includes('min-height: var(--hero-min-block-size)')
    && styleCss.includes('--hero-content-bottom: clamp(5.5rem, 12vh, 7rem)')
    && styleCss.includes('--hero-content-bottom: clamp(4rem, 9vh, 4.75rem)')
    && styleCss.includes('bottom: var(--hero-scroll-hint-bottom)'),
  JSON.stringify({
    hasFallbackViewport: styleCss.includes('--hero-min-block-size: 100vh'),
    hasDynamicViewportSupport: styleCss.includes('@supports (min-height: 100dvh)'),
    heroUsesToken: styleCss.includes('min-height: var(--hero-min-block-size)'),
    hasDesktopBottomToken: styleCss.includes('--hero-content-bottom: clamp(5.5rem, 12vh, 7rem)'),
    hasMobileBottomToken: styleCss.includes('--hero-content-bottom: clamp(4rem, 9vh, 4.75rem)'),
    scrollHintUsesToken: styleCss.includes('bottom: var(--hero-scroll-hint-bottom)')
  })
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
  ['.library-projects-bridge::after', '.garden-handoff-steps::before', '.garden-handoff-steps li::before', '--handoff-step-label-margin-bottom', 'bridgeSeedFloat'].every((snippet) => styleCss.includes(snippet))
    && librarySectionSource.includes('class="library-projects-bridge__steps garden-handoff-steps"')
    && researchRendererJs.includes('class="research-log-handoff__steps garden-handoff-steps"')
    && !styleCss.includes('.library-projects-bridge__steps li {')
    && !styleCss.includes('.library-projects-bridge__steps span {'),
  JSON.stringify({
    hasSeed: styleCss.includes('.library-projects-bridge::after'),
    hasStepPath: styleCss.includes('.garden-handoff-steps::before'),
    hasStepDots: styleCss.includes('.garden-handoff-steps li::before'),
    hasLabelSpacingToken: styleCss.includes('--handoff-step-label-margin-bottom'),
    libraryUsesSharedSteps: librarySectionSource.includes('class="library-projects-bridge__steps garden-handoff-steps"'),
    researchUsesSharedSteps: researchRendererJs.includes('class="research-log-handoff__steps garden-handoff-steps"'),
    hasDirectLibraryStepItemRule: styleCss.includes('.library-projects-bridge__steps li {'),
    hasDirectLibraryStepLabelRule: styleCss.includes('.library-projects-bridge__steps span {')
  })
);
assert(
  'small mobile library bridge keeps step path spacing',
  styleCss.includes('padding: 0.62rem 0.72rem 0.64rem 1.7rem')
    && styleCss.includes('min-height: 4.15rem')
    && styleCss.includes('--handoff-step-label-margin-bottom: 0.12rem')
    && styleCss.includes('font-size: 0.74rem'),
  JSON.stringify({
    hasMobileStepPadding: styleCss.includes('padding: 0.62rem 0.72rem 0.64rem 1.7rem'),
    hasMobileStepHeight: styleCss.includes('min-height: 4.15rem'),
    hasCompactLabelSpacing: styleCss.includes('--handoff-step-label-margin-bottom: 0.12rem'),
    hasCompactStepText: styleCss.includes('font-size: 0.74rem')
  })
);
assert('vision process interlude style is emitted', styleCss.includes('.process-flow--vision'));
assert(
  'research log handoff bridges vision entries to logs',
  Array.isArray(hazakuraContent.researchGroup?.handoff?.steps)
    && hazakuraContent.researchGroup.handoff.steps.length === 3
    && researchRendererJs.includes('class="research-log-handoff"')
    && researchRendererJs.includes('class="research-log-handoff" data-reveal')
    && styleCss.includes('.research-log-handoff')
    && scrollAnimationsJs.includes("const revealSelector = '[data-reveal]'"),
  JSON.stringify({
    steps: hazakuraContent.researchGroup?.handoff?.steps?.length || 0,
    hasRenderer: researchRendererJs.includes('class="research-log-handoff"'),
    hasRevealAttribute: researchRendererJs.includes('class="research-log-handoff" data-reveal'),
    hasStyles: styleCss.includes('.research-log-handoff'),
    hasRevealContract: scrollAnimationsJs.includes("const revealSelector = '[data-reveal]'")
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
    && styleCss.includes('--vision-entry-drawer-note-display')
    && styleCss.includes('--vision-entry-drawer-note-white-space')
    && styleCss.includes(':is(.research-extra-drawer, .project-cycle-drawer, .vision-entry-guide__field-drawer)[open] summary::after'),
  JSON.stringify({
    hasDrawerRenderer: visionRendererJs.includes('class="vision-entry-guide__field-drawer"'),
    hasDrawerStyles: styleCss.includes('.vision-entry-guide__field-drawer'),
    hasNoteDisplayToken: styleCss.includes('--vision-entry-drawer-note-display'),
    hasNoteWhitespaceToken: styleCss.includes('--vision-entry-drawer-note-white-space')
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
assert(
  'vision entry kind accent selectors stay shared',
  styleCss.includes(':is(.vision-card, .vision-entry-guide__kind, .vision-entry-question, .vision-entry-kind-badge)[data-entry-kind]')
    && styleCss.includes(':is(.vision-card, .vision-entry-guide__kind, .vision-entry-question, .vision-entry-kind-badge)[data-entry-kind="memory"]')
    && styleCss.includes(':is(.vision-card, .vision-entry-guide__kind, .vision-entry-question, .vision-entry-kind-badge)[data-entry-kind="object"]')
    && styleCss.includes(':is(.vision-card, .vision-entry-guide__kind, .vision-entry-question, .vision-entry-kind-badge)[data-entry-kind="knowledge"]')
    && styleCss.includes('body.theme-night .section-vision :is(.vision-card, .vision-entry-question, .vision-entry-guide__kind, .vision-entry-kind-badge)[data-entry-kind]')
    && !styleCss.includes('.vision-card[data-entry-kind],\n.vision-entry-guide__kind[data-entry-kind]')
    && !styleCss.includes('body.theme-night .section-vision .vision-card[data-entry-kind],\nbody.theme-night .section-vision .vision-entry-question[data-entry-kind]'),
  JSON.stringify({
    hasSharedDaySelector: styleCss.includes(':is(.vision-card, .vision-entry-guide__kind, .vision-entry-question, .vision-entry-kind-badge)[data-entry-kind]'),
    hasSharedNightSelector: styleCss.includes('body.theme-night .section-vision :is(.vision-card, .vision-entry-question, .vision-entry-guide__kind, .vision-entry-kind-badge)[data-entry-kind]'),
    hasLegacyDayList: styleCss.includes('.vision-card[data-entry-kind],\n.vision-entry-guide__kind[data-entry-kind]'),
    hasLegacyNightList: styleCss.includes('body.theme-night .section-vision .vision-card[data-entry-kind],\nbody.theme-night .section-vision .vision-entry-question[data-entry-kind]')
  })
);
assert('content renderers script exposes global', contentRenderersJs.includes('window.HazakuraContentRenderers'));
assert('content renderers delegates foundation renderer', contentRenderersJs.includes('HazakuraSectionFoundationRenderer?.render'));
assert('content renderers delegates project renderer', contentRenderersJs.includes('HazakuraProjectRenderer?.render'));
assert('content renderers delegates quote prelude', contentRenderersJs.includes('HazakuraQuotePrelude?.render'));
assert('content renderers delegates vision renderer', contentRenderersJs.includes('HazakuraVisionRenderer?.render'));
assert('content renderers delegates research renderer', contentRenderersJs.includes('HazakuraResearchRenderer?.render'));
assert(
  'content renderers keeps foundation markup out of the orchestrator',
  !contentRenderersJs.includes('class="philosophy-card"')
    && !contentRenderersJs.includes('class="layer-card"')
    && !contentRenderersJs.includes('class="process-step"')
    && !contentRenderersJs.includes('.innerHTML'),
  JSON.stringify({
    hasPhilosophyCard: contentRenderersJs.includes('class="philosophy-card"'),
    hasLayerCard: contentRenderersJs.includes('class="layer-card"'),
    hasProcessStep: contentRenderersJs.includes('class="process-step"'),
    writesHtml: contentRenderersJs.includes('.innerHTML')
  })
);
assert('foundation renderer script exposes global', sectionFoundationRendererJs.includes('window.HazakuraSectionFoundationRenderer'));
assert(
  'foundation renderer loads before content orchestrator',
  html.indexOf('src="/section-foundation-renderer.js"') >= 0
    && html.indexOf('src="/section-foundation-renderer.js"') < html.indexOf('src="/content-renderers.js"'),
  JSON.stringify({
    sectionFoundationRenderer: html.indexOf('src="/section-foundation-renderer.js"'),
    contentRenderers: html.indexOf('src="/content-renderers.js"')
  })
);
assert(
  'foundation renderer owns static section markup',
  sectionFoundationRendererJs.includes('class="philosophy-card"')
    && sectionFoundationRendererJs.includes('class="layer-card"')
    && sectionFoundationRendererJs.includes('class="process-step"'),
  JSON.stringify({
    hasPhilosophyCard: sectionFoundationRendererJs.includes('class="philosophy-card"'),
    hasLayerCard: sectionFoundationRendererJs.includes('class="layer-card"'),
    hasProcessStep: sectionFoundationRendererJs.includes('class="process-step"')
  })
);
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
  'cycle bridge theme is tokenized',
  [
    '--cycle-bridge-border',
    '--cycle-bridge-bg',
    '--cycle-bridge-orbit-border',
    '--cycle-bridge-accent',
    '--cycle-bridge-heading',
    '--cycle-bridge-copy'
  ].every((snippet) => styleCss.includes(snippet))
    && styleCss.includes('body.theme-night .section-vision .cycle-bridge-card')
    && !styleCss.includes('body.theme-night .section-vision .cycle-bridge-card::before')
    && !styleCss.includes('body.theme-night .section-vision .cycle-bridge-eyebrow')
    && !styleCss.includes('body.theme-night .section-vision .cycle-bridge-title')
    && !styleCss.includes('body.theme-night .section-vision .cycle-bridge-text'),
  JSON.stringify({
    hasBorderToken: styleCss.includes('--cycle-bridge-border'),
    hasBackgroundToken: styleCss.includes('--cycle-bridge-bg'),
    hasOrbitToken: styleCss.includes('--cycle-bridge-orbit-border'),
    hasAccentToken: styleCss.includes('--cycle-bridge-accent'),
    hasHeadingToken: styleCss.includes('--cycle-bridge-heading'),
    hasCopyToken: styleCss.includes('--cycle-bridge-copy'),
    hasNightCardTokenScope: styleCss.includes('body.theme-night .section-vision .cycle-bridge-card'),
    hasDirectNightOrbit: styleCss.includes('body.theme-night .section-vision .cycle-bridge-card::before'),
    hasDirectNightEyebrow: styleCss.includes('body.theme-night .section-vision .cycle-bridge-eyebrow'),
    hasDirectNightTitle: styleCss.includes('body.theme-night .section-vision .cycle-bridge-title'),
    hasDirectNightText: styleCss.includes('body.theme-night .section-vision .cycle-bridge-text')
  })
);
assert(
  'research optional notes are folded behind a drawer',
  researchRendererJs.includes('class="research-extra-drawer"')
    && researchRendererJs.includes('class="research-extra-drawer__sigil"')
    && researchRendererJs.includes('由来・断片・論文メモ')
    && researchRendererJs.includes('小径をひらく')
    && styleCss.includes('.research-extra-drawer')
    && styleCss.includes(':is(.research-extra-drawer, .project-cycle-drawer, .vision-entry-guide__field-drawer)[open] summary::after')
    && styleCss.includes('.research-extra-drawer__body'),
  JSON.stringify({
    hasDrawerRenderer: researchRendererJs.includes('class="research-extra-drawer"'),
    hasDrawerStyles: styleCss.includes('.research-extra-drawer'),
    hasDrawerBody: styleCss.includes('.research-extra-drawer__body')
  })
);
assert(
  'garden drawer chrome is shared between research, project, and vision entry drawers',
  [
    '--garden-drawer-bg',
    '--garden-drawer-summary-align',
    '--garden-drawer-summary-color',
    '--garden-drawer-summary-font-size',
    '--garden-drawer-toggle-bg',
    '--garden-drawer-toggle-margin-left',
    '--garden-drawer-focus-outline',
    '--garden-drawer-sigil-bg',
    '--garden-drawer-sigil-margin-top',
    'summary:focus-visible',
    ':is(.research-extra-drawer, .project-cycle-drawer, .vision-entry-guide__field-drawer)'
  ].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-vision .research-extra-drawer summary')
    && !styleCss.includes('body.theme-night .section-projects .project-cycle-drawer summary')
    && !styleCss.includes('.vision-entry-guide__field-drawer summary {')
    && !styleCss.includes('.vision-entry-guide__field-drawer[open] summary::after'),
  JSON.stringify({
    hasSharedSelector: styleCss.includes(':is(.research-extra-drawer, .project-cycle-drawer, .vision-entry-guide__field-drawer)'),
    hasBgToken: styleCss.includes('--garden-drawer-bg'),
    hasSummaryAlignToken: styleCss.includes('--garden-drawer-summary-align'),
    hasSummaryToken: styleCss.includes('--garden-drawer-summary-color'),
    hasSummaryFontSizeToken: styleCss.includes('--garden-drawer-summary-font-size'),
    hasToggleAlignmentToken: styleCss.includes('--garden-drawer-toggle-margin-left'),
    hasFocusToken: styleCss.includes('--garden-drawer-focus-outline'),
    hasSigilOffsetToken: styleCss.includes('--garden-drawer-sigil-margin-top'),
    hasFocusVisible: styleCss.includes('summary:focus-visible'),
    hasDirectResearchSummaryTheme: styleCss.includes('body.theme-night .section-vision .research-extra-drawer summary'),
    hasDirectProjectSummaryTheme: styleCss.includes('body.theme-night .section-projects .project-cycle-drawer summary'),
    hasDirectVisionSummaryRule: styleCss.includes('.vision-entry-guide__field-drawer summary {'),
    hasDirectVisionOpenToggleRule: styleCss.includes('.vision-entry-guide__field-drawer[open] summary::after')
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
    && projectRendererJs.includes('data-project-threshold data-reveal')
    && styleCss.includes('.project-threshold__rail')
    && scrollAnimationsJs.includes("const revealSelector = '[data-reveal]'"),
  JSON.stringify({
    hasData: Boolean(hazakuraContent.projectsGroup?.threshold?.title),
    hasRenderer: projectRendererJs.includes('class="project-threshold"'),
    hasRevealAttribute: projectRendererJs.includes('data-project-threshold data-reveal'),
    hasStyles: styleCss.includes('.project-threshold__rail'),
    hasRevealContract: scrollAnimationsJs.includes("const revealSelector = '[data-reveal]'")
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
  'projects control colors stay tokenized by section',
  [
    '--project-lane-guide-item-bg',
    '--project-lane-guide-title',
    '--project-lane-filter-button-hover-bg',
    '--project-lane-filter-button-active-color',
    '--project-lane-status-color'
  ].every((snippet) => styleCss.includes(snippet))
    && styleCss.includes('body.theme-night .section-projects {\n    --project-lane-guide-item-bg')
    && !styleCss.includes('body.theme-night .section-projects .project-lane-guide__item {')
    && !styleCss.includes('body.theme-night .section-projects .project-lane-filter {')
    && !styleCss.includes('body.theme-night .section-projects .project-lane-filter__button {')
    && !styleCss.includes('body.theme-night .section-projects .project-lane-status {'),
  JSON.stringify({
    hasGuideBgToken: styleCss.includes('--project-lane-guide-item-bg'),
    hasGuideTitleToken: styleCss.includes('--project-lane-guide-title'),
    hasFilterHoverToken: styleCss.includes('--project-lane-filter-button-hover-bg'),
    hasFilterActiveToken: styleCss.includes('--project-lane-filter-button-active-color'),
    hasStatusToken: styleCss.includes('--project-lane-status-color'),
    hasNightTokenScope: styleCss.includes('body.theme-night .section-projects {\n    --project-lane-guide-item-bg'),
    hasDirectNightGuide: styleCss.includes('body.theme-night .section-projects .project-lane-guide__item {'),
    hasDirectNightFilter: styleCss.includes('body.theme-night .section-projects .project-lane-filter {'),
    hasDirectNightButton: styleCss.includes('body.theme-night .section-projects .project-lane-filter__button {'),
    hasDirectNightStatus: styleCss.includes('body.theme-night .section-projects .project-lane-status {')
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
  'project side notes share note chrome',
  projectRendererJs.includes('class="project-note project-why"')
    && projectRendererJs.includes('class="project-note project-action-note"')
    && ['--project-note-bg', '--project-note-border-left', '--project-note-label-color'].every((snippet) => styleCss.includes(snippet))
    && styleCss.includes('.project-note > span')
    && !styleCss.includes('body.theme-night .section-projects .project-why span')
    && !styleCss.includes('body.theme-night .section-projects .project-action-note span'),
  JSON.stringify({
    hasWhyNoteClass: projectRendererJs.includes('class="project-note project-why"'),
    hasActionNoteClass: projectRendererJs.includes('class="project-note project-action-note"'),
    hasBgToken: styleCss.includes('--project-note-bg'),
    hasBorderToken: styleCss.includes('--project-note-border-left'),
    hasLabelToken: styleCss.includes('--project-note-label-color'),
    hasSharedLabelRule: styleCss.includes('.project-note > span'),
    hasDirectNightWhyLabel: styleCss.includes('body.theme-night .section-projects .project-why span'),
    hasDirectNightActionLabel: styleCss.includes('body.theme-night .section-projects .project-action-note span')
  })
);
assert(
  'project cycles are folded behind a drawer',
  projectRendererJs.includes('class="project-cycle-drawer"')
    && projectRendererJs.includes('class="project-cycle-drawer__sigil"')
    && projectRendererJs.includes('小径をひらく')
    && styleCss.includes('.project-cycle-drawer')
    && styleCss.includes('.project-cycle-drawer__sigil')
    && styleCss.includes(':is(.research-extra-drawer, .project-cycle-drawer, .vision-entry-guide__field-drawer)[open] summary::after'),
  JSON.stringify({
    hasDrawerRenderer: projectRendererJs.includes('class="project-cycle-drawer"'),
    hasDrawerStyles: styleCss.includes('.project-cycle-drawer')
  })
);
assert(
  'project cycle path theme is tokenized',
  [
    '--project-cycle-rail',
    '--project-cycle-rail-vertical',
    '--project-cycle-item-border',
    '--project-cycle-item-bg',
    '--project-cycle-label-color',
    '--project-cycle-copy-color'
  ].every((snippet) => styleCss.includes(snippet))
    && styleCss.includes('background: var(--project-cycle-rail)')
    && styleCss.includes('background: var(--project-cycle-rail-vertical)')
    && !styleCss.includes('body.theme-night .section-projects .project-cycle div')
    && !styleCss.includes('body.theme-night .section-projects .project-cycle dt')
    && !styleCss.includes('body.theme-night .section-projects .project-cycle dd'),
  JSON.stringify({
    hasRailToken: styleCss.includes('--project-cycle-rail'),
    hasVerticalRailToken: styleCss.includes('--project-cycle-rail-vertical'),
    hasItemBorderToken: styleCss.includes('--project-cycle-item-border'),
    hasItemBgToken: styleCss.includes('--project-cycle-item-bg'),
    hasLabelToken: styleCss.includes('--project-cycle-label-color'),
    hasCopyToken: styleCss.includes('--project-cycle-copy-color'),
    hasDirectNightItem: styleCss.includes('body.theme-night .section-projects .project-cycle div'),
    hasDirectNightLabel: styleCss.includes('body.theme-night .section-projects .project-cycle dt'),
    hasDirectNightCopy: styleCss.includes('body.theme-night .section-projects .project-cycle dd')
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
    && styleCss.includes('.footer-garden-close__link')
    && styleCss.includes('.footer-garden-close__link:focus-visible')
    && styleCss.includes('--garden-route-focus-outline: rgba(232, 88, 122, 0.36)')
    && !/\.footer-garden-close__link:focus-visible\s*{[^}]*outline:\s*2px solid rgba/s.test(styleCss),
  JSON.stringify({
    hasMarkup: html.includes('class="footer-garden-close"'),
    hasHeroLink: html.includes('href="#hero" class="footer-garden-close__link"'),
    hasStyles: styleCss.includes('.footer-garden-close'),
    usesSharedFocusSelector: styleCss.includes('.footer-garden-close__link:focus-visible'),
    hasLocalFocusToken: styleCss.includes('--garden-route-focus-outline: rgba(232, 88, 122, 0.36)'),
    hasHardcodedFocusOutline: /\.footer-garden-close__link:focus-visible\s*{[^}]*outline:\s*2px solid rgba/s.test(styleCss)
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
  'vision entry focus exposes a stable selection control',
  visionEntryFocusJs.includes("item.setAttribute('role', 'button')")
    && visionEntryFocusJs.includes("item.setAttribute('aria-pressed', 'false')")
    && visionEntryFocusJs.includes("item.setAttribute('aria-pressed', isPinned ? 'true' : 'false')")
    && visionEntryFocusJs.includes("applyKind(pinnedKind || '')")
    && visionEntryFocusJs.includes('isFromNestedSummary(event)')
    && visionEntryFocusJs.includes('togglePinnedKind(kind)'),
  JSON.stringify({
    hasButtonRole: visionEntryFocusJs.includes("item.setAttribute('role', 'button')"),
    initializesPressed: visionEntryFocusJs.includes("item.setAttribute('aria-pressed', 'false')"),
    syncsPressedState: visionEntryFocusJs.includes("item.setAttribute('aria-pressed', isPinned ? 'true' : 'false')"),
    restoresPinnedPreview: visionEntryFocusJs.includes("applyKind(pinnedKind || '')"),
    protectsNestedSummary: visionEntryFocusJs.includes('isFromNestedSummary(event)'),
    hasSharedToggle: visionEntryFocusJs.includes('togglePinnedKind(kind)')
  })
);
assert(
  'vision entry focus can nudge selected cards into view',
  visionEntryFocusJs.includes('nudgeMatchingCard')
    && visionEntryFocusJs.includes('HazakuraScrollTarget?.scrollTo')
    && visionEntryFocusJs.includes('is-entry-jump')
    && styleCss.includes('.vision-card.visible.is-entry-match')
    && styleCss.includes('@keyframes visionEntryNudge'),
  JSON.stringify({
    hasNudge: visionEntryFocusJs.includes('nudgeMatchingCard'),
    usesMeasuredScrollTarget: visionEntryFocusJs.includes('HazakuraScrollTarget?.scrollTo'),
    hasJumpClass: visionEntryFocusJs.includes('is-entry-jump'),
    hasVisibleMatchStyle: styleCss.includes('.vision-card.visible.is-entry-match'),
    hasNudgeKeyframes: styleCss.includes('@keyframes visionEntryNudge')
  })
);
assert('zone nav script exposes global', zoneNavJs.includes('window.HazakuraZoneNav'));
assert(
  'zone nav uses semantic buttons with keyboard-visible state',
  zoneNavJs.includes("document.createElement('nav')")
    && zoneNavJs.includes("aria-label', '季節のゾーン巡回'")
    && zoneNavJs.includes('<button type="button"')
    && zoneNavJs.includes('aria-pressed="false"')
    && zoneNavJs.includes("setAttribute('aria-pressed'")
    && zoneNavJs.includes('data-zone-label')
    && styleCss.includes('.zone-nav:focus-within')
    && styleCss.includes('.zone-btn:focus-visible')
    && styleCss.includes('content: attr(data-zone-label)'),
  JSON.stringify({
    createsNav: zoneNavJs.includes("document.createElement('nav')"),
    hasNavLabel: zoneNavJs.includes("aria-label', '季節のゾーン巡回'"),
    usesButtons: zoneNavJs.includes('<button type="button"'),
    hasPressedDefault: zoneNavJs.includes('aria-pressed="false"'),
    updatesPressed: zoneNavJs.includes("setAttribute('aria-pressed'"),
    hasPseudoLabelData: zoneNavJs.includes('data-zone-label'),
    hasFocusWithin: styleCss.includes('.zone-nav:focus-within'),
    hasFocusStyle: styleCss.includes('.zone-btn:focus-visible'),
    usesDataLabel: styleCss.includes('content: attr(data-zone-label)')
  })
);
const zoneEmojiIcons = [0x1f338, 0x1f305, 0x1f319, 0x2b50, 0x1f30c].map((codePoint) => String.fromCodePoint(codePoint));
const zoneSigilSelectors = [
  '.zone-sigil--petal::before',
  '.zone-sigil--dusk::before',
  '.zone-sigil--crescent::before',
  '.zone-sigil--star::before',
  '.zone-sigil--aurora::before'
];
assert(
  'zone nav sigils are CSS-rendered rather than emoji-rendered',
  zoneNavJs.includes('zone-sigil zone-sigil--')
    && ['petal', 'dusk', 'crescent', 'star', 'aurora'].every((sigil) => zoneNavJs.includes(`sigil: '${sigil}'`))
    && !zoneEmojiIcons.some((icon) => zoneNavJs.includes(icon))
    && zoneSigilSelectors.every((selector) => styleCss.includes(selector)),
  JSON.stringify({
    rendersSigilSpan: zoneNavJs.includes('zone-sigil zone-sigil--'),
    sigils: ['petal', 'dusk', 'crescent', 'star', 'aurora'].map((sigil) => [sigil, zoneNavJs.includes(`sigil: '${sigil}'`)]),
    hasEmojiIcons: zoneEmojiIcons.filter((icon) => zoneNavJs.includes(icon)),
    styledSigils: zoneSigilSelectors.map((selector) => [selector, styleCss.includes(selector)])
  })
);
assert('zone atmosphere script exposes global', zoneAtmosphereJs.includes('window.HazakuraZoneAtmosphere'));
assert('zone performance script exposes global', zonePerformanceJs.includes('window.HazakuraZonePerformance'));
assert('hero aurora overlay script exposes global', heroAuroraOverlayJs.includes('window.HazakuraHeroAuroraOverlay'));
assert('hero image loader script exposes global', heroImageLoaderJs.includes('window.HazakuraHeroImageLoader'));
assert('motion preferences script exposes global', motionPreferencesJs.includes('window.HazakuraMotionPreferences'));
assert('scroll offset script exposes global', scrollOffsetJs.includes('window.HazakuraScrollOffset'));
assert('scroll target script exposes global', scrollTargetJs.includes('window.HazakuraScrollTarget'));
assert('scroll target uses measured offset', scrollTargetJs.includes('HazakuraScrollOffset?.get'));
assert(
  'scroll target loads between offset and scroll consumers',
  html.indexOf('src="/scroll-offset.js"') >= 0
    && html.indexOf('src="/scroll-target.js"') > html.indexOf('src="/scroll-offset.js"')
    && html.indexOf('src="/scroll-target.js"') < html.indexOf('src="/smooth-scroll.js"')
    && html.indexOf('src="/scroll-target.js"') < html.indexOf('src="/zone-performance.js"')
    && html.indexOf('src="/scroll-target.js"') < html.indexOf('src="/vision-entry-focus.js"')
    && html.indexOf('src="/scroll-offset.js"') < html.indexOf('src="/smooth-scroll.js"')
    && html.indexOf('src="/scroll-offset.js"') < html.indexOf('src="/zone-performance.js"'),
  JSON.stringify({
    scrollOffset: html.indexOf('src="/scroll-offset.js"'),
    scrollTarget: html.indexOf('src="/scroll-target.js"'),
    smoothScroll: html.indexOf('src="/smooth-scroll.js"'),
    zonePerformance: html.indexOf('src="/zone-performance.js"'),
    visionEntryFocus: html.indexOf('src="/vision-entry-focus.js"')
  })
);
assert('smooth scroll script exposes global', smoothScrollJs.includes('window.HazakuraSmoothScroll'));
assert('smooth scroll uses shared scroll target', smoothScrollJs.includes('HazakuraScrollTarget?.scrollTo'));
assert(
  'smooth scroll hands focus to route targets',
  smoothScrollJs.includes('function focusRouteTarget(target, isReducedMotion)')
    && smoothScrollJs.includes("target.setAttribute('tabindex', '-1')")
    && smoothScrollJs.includes('target.focus({ preventScroll: true })')
    && smoothScrollJs.includes('isReducedMotion ? 0 : 420')
    && smoothScrollJs.includes('focusRouteTarget(target, isReducedMotion)')
    && smoothScrollJs.includes('markMatchingArrival(link, target, isReducedMotion)'),
  JSON.stringify({
    hasFocusHelper: smoothScrollJs.includes('function focusRouteTarget(target, isReducedMotion)'),
    addsTabIndex: smoothScrollJs.includes("target.setAttribute('tabindex', '-1')"),
    preventsFocusScroll: smoothScrollJs.includes('target.focus({ preventScroll: true })'),
    respectsReducedMotion: smoothScrollJs.includes('isReducedMotion ? 0 : 420'),
    callsFocusBeforeArrival: smoothScrollJs.includes('focusRouteTarget(target, isReducedMotion)'),
    reusesMotionStateForArrival: smoothScrollJs.includes('markMatchingArrival(link, target, isReducedMotion)')
  })
);
assert(
  'smooth scroll preserves addressable garden routes',
  smoothScrollJs.includes('updateRouteHash(href)')
    && smoothScrollJs.includes("href.startsWith('#')")
    && smoothScrollJs.includes('window.history.pushState(null, \'\', href)'),
  JSON.stringify({
    callsRouteHashSync: smoothScrollJs.includes('updateRouteHash(href)'),
    guardsHashRoutes: smoothScrollJs.includes("href.startsWith('#')"),
    pushesHistoryState: smoothScrollJs.includes('window.history.pushState(null, \'\', href)')
  })
);
assert(
  'smooth scroll delegates dynamic route clicks',
  smoothScrollJs.includes("document.addEventListener('click', handleRouteClick)")
    && smoothScrollJs.includes("document.removeEventListener('click', handleRouteClick)")
    && smoothScrollJs.includes('findRouteLink(event.target, selector)')
    && smoothScrollJs.includes('targetElement?.closest(selector)')
    && smoothScrollJs.includes("const href = link.getAttribute('href')")
    && smoothScrollJs.includes('findHashTarget(href)')
    && !smoothScrollJs.includes('document.querySelectorAll(selector).forEach'),
  JSON.stringify({
    hasDelegatedClick: smoothScrollJs.includes("document.addEventListener('click', handleRouteClick)"),
    hasCleanup: smoothScrollJs.includes("document.removeEventListener('click', handleRouteClick)"),
    findsClosestRoute: smoothScrollJs.includes('targetElement?.closest(selector)'),
    hasHashGuard: smoothScrollJs.includes("const href = link.getAttribute('href')")
      && smoothScrollJs.includes('findHashTarget(href)'),
    hasDirectBinding: smoothScrollJs.includes('document.querySelectorAll(selector).forEach')
  })
);
assert('zone performance uses shared scroll target', zonePerformanceJs.includes('HazakuraScrollTarget?.scrollTo'));
assert(
  'vision entry focus uses controller motion state for nudges',
  appControllerJs.includes('HazakuraVisionEntryFocus?.init')
    && appControllerJs.includes('getPrefersReducedMotion: () => prefersReducedMotion')
    && visionEntryFocusJs.includes('getPrefersReducedMotion')
    && !visionEntryFocusJs.includes('window.matchMedia?.('),
  JSON.stringify({
    appPassesMotionState: appControllerJs.includes('getPrefersReducedMotion: () => prefersReducedMotion'),
    focusAcceptsMotionState: visionEntryFocusJs.includes('getPrefersReducedMotion'),
    hasDirectMatchMedia: visionEntryFocusJs.includes('window.matchMedia?.(')
  })
);
assert('smooth scroll includes library projects bridge', smoothScrollJs.includes('.library-projects-bridge__link'));
assert(
  'handoff step chrome uses shared garden class',
  librarySectionSource.includes('library-projects-bridge__steps garden-handoff-steps')
    && researchRendererJs.includes('research-log-handoff__steps garden-handoff-steps')
    && styleCss.includes('.garden-handoff-steps')
    && styleCss.includes('.garden-handoff-steps::before')
    && styleCss.includes('.garden-handoff-steps li::before')
    && styleCss.includes('.library-projects-bridge__link:focus-visible'),
  JSON.stringify({
    libraryUsesSharedClass: librarySectionSource.includes('library-projects-bridge__steps garden-handoff-steps'),
    researchUsesSharedClass: researchRendererJs.includes('research-log-handoff__steps garden-handoff-steps'),
    hasSharedListStyle: styleCss.includes('.garden-handoff-steps'),
    hasSharedRailStyle: styleCss.includes('.garden-handoff-steps::before'),
    hasSharedDotStyle: styleCss.includes('.garden-handoff-steps li::before'),
    hasBridgeFocusStyle: styleCss.includes('.library-projects-bridge__link:focus-visible')
  })
);
assert(
  'hero return paths use measured smooth scroll arrival',
  smoothScrollJs.includes('.nav-logo[href^="#"]')
    && smoothScrollJs.includes('.footer-garden-close__link[href^="#"]')
    && smoothScrollJs.includes('markMatchingArrival')
    && smoothScrollJs.includes('is-garden-return-arrival')
    && styleCss.includes('.hero.is-garden-return-arrival::after')
    && styleCss.includes('@keyframes gardenReturnThread'),
  JSON.stringify({
    hasLogoSelector: smoothScrollJs.includes('.nav-logo[href^="#"]'),
    hasFooterSelector: smoothScrollJs.includes('.footer-garden-close__link[href^="#"]'),
    hasHandler: smoothScrollJs.includes('markMatchingArrival'),
    hasArrivalClass: smoothScrollJs.includes('is-garden-return-arrival'),
    hasStyle: styleCss.includes('.hero.is-garden-return-arrival::after'),
    hasKeyframes: styleCss.includes('@keyframes gardenReturnThread')
  })
);
assert(
  'quote prelude foldback uses smooth scroll arrival',
  smoothScrollJs.includes('.quote-prelude-step[href^="#"]')
    && smoothScrollJs.includes('markMatchingArrival')
    && smoothScrollJs.includes('is-quote-return-arrival')
    && styleCss.includes('.section.is-quote-return-arrival .section-header::after')
    && styleCss.includes('.research-log-strip:is(.is-quote-return-arrival, .is-research-route-arrival) .research-log-handoff')
    && styleCss.includes('@keyframes quoteReturnGlow'),
  JSON.stringify({
    hasSelector: smoothScrollJs.includes('.quote-prelude-step[href^="#"]'),
    hasHandler: smoothScrollJs.includes('markMatchingArrival'),
    hasArrivalClass: smoothScrollJs.includes('is-quote-return-arrival'),
    hasStyle: styleCss.includes('.section.is-quote-return-arrival .section-header::after'),
    hasResearchStyle: styleCss.includes('.research-log-strip:is(.is-quote-return-arrival, .is-research-route-arrival) .research-log-handoff'),
    hasKeyframes: styleCss.includes('@keyframes quoteReturnGlow')
  })
);
assert(
  'project research return links use measured smooth scroll arrival',
  smoothScrollJs.includes('.project-return-link[href^="#"]')
    && smoothScrollJs.includes('is-research-return-arrival')
    && styleCss.includes('.research-log-card.is-research-return-arrival')
    && styleCss.includes('@keyframes researchReturnGlow')
    && styleCss.includes('.project-return-link:focus-visible')
    && ['--project-return-bg', '--project-return-hover-bg', '--project-return-focus-outline', '--project-return-label-color'].every((snippet) => styleCss.includes(snippet))
    && !styleCss.includes('body.theme-night .section-projects .project-return-link:hover')
    && !styleCss.includes('body.theme-night .section-projects .project-return-link span')
    && hazakuraContent.projectsGroup.items
      .filter((item) => item.returnLink?.href?.startsWith('#'))
      .every((item) => hazakuraContent.researchGroup.logs.some((log) => item.returnLink.href === `#${log.id}`)),
  JSON.stringify({
    hasSelector: smoothScrollJs.includes('.project-return-link[href^="#"]'),
    hasArrivalClass: smoothScrollJs.includes('is-research-return-arrival'),
    hasArrivalStyle: styleCss.includes('.research-log-card.is-research-return-arrival'),
    hasKeyframes: styleCss.includes('@keyframes researchReturnGlow'),
    hasFocusStyle: styleCss.includes('.project-return-link:focus-visible'),
    hasReturnBgToken: styleCss.includes('--project-return-bg'),
    hasReturnHoverToken: styleCss.includes('--project-return-hover-bg'),
    hasReturnFocusToken: styleCss.includes('--project-return-focus-outline'),
    hasReturnLabelToken: styleCss.includes('--project-return-label-color'),
    hasDirectNightHover: styleCss.includes('body.theme-night .section-projects .project-return-link:hover'),
    hasDirectNightLabel: styleCss.includes('body.theme-night .section-projects .project-return-link span'),
    returnTargets: hazakuraContent.projectsGroup.items
      .filter((item) => item.returnLink?.href?.startsWith('#'))
      .map((item) => item.returnLink.href)
  })
);
assert(
  'library bridge click marks projects handoff arrival',
  smoothScrollJs.includes('markMatchingArrival')
    && smoothScrollJs.includes('is-handoff-arrival')
    && styleCss.includes('.section-projects.is-handoff-arrival .project-threshold__sigil')
    && styleCss.includes('@keyframes projectHandoffSeed'),
  JSON.stringify({
    hasHandler: smoothScrollJs.includes('markMatchingArrival'),
    hasArrivalClass: smoothScrollJs.includes('is-handoff-arrival'),
    hasSigilStyle: styleCss.includes('.section-projects.is-handoff-arrival .project-threshold__sigil'),
    hasSeedKeyframes: styleCss.includes('@keyframes projectHandoffSeed')
  })
);
assert('scroll indicators script exposes global', scrollIndicatorsJs.includes('window.HazakuraScrollIndicators'));
assert('text reveal script exposes global', textRevealJs.includes('window.HazakuraTextReveal'));
assert('hero parallax script exposes global', heroParallaxJs.includes('window.HazakuraHeroParallax'));
assert('scroll animations script exposes global', scrollAnimationsJs.includes('window.HazakuraScrollAnimations'));
assert(
  'scroll animations use the data reveal contract',
  scrollAnimationsJs.includes("const revealSelector = '[data-reveal]'")
    && scrollAnimationsJs.includes("const staggeredSelector = '[data-reveal-stagger]'")
    && scrollAnimationsJs.includes("const processSelector = '[data-reveal-process]'")
    && scrollAnimationsJs.includes('function revealAll()')
    && scrollAnimationsJs.includes('document.querySelectorAll(revealSelector).forEach')
    && scrollAnimationsJs.includes('document.querySelectorAll(processSelector).forEach')
    && !scrollAnimationsJs.includes('const revealTargetSelectors = [')
    && !scrollAnimationsJs.includes("'.project-threshold'")
    && scrollAnimationsJs.includes('window.HazakuraScrollAnimations = { init }')
    && !scrollAnimationsJs.includes('setAllCounters'),
  JSON.stringify({
    hasRevealSelector: scrollAnimationsJs.includes("const revealSelector = '[data-reveal]'"),
    hasStaggeredSelector: scrollAnimationsJs.includes("const staggeredSelector = '[data-reveal-stagger]'"),
    hasProcessSelector: scrollAnimationsJs.includes("const processSelector = '[data-reveal-process]'"),
    hasRevealAll: scrollAnimationsJs.includes('function revealAll()'),
    usesRevealSelectorForAll: scrollAnimationsJs.includes('document.querySelectorAll(revealSelector).forEach'),
    observesProcessSelector: scrollAnimationsJs.includes('document.querySelectorAll(processSelector).forEach'),
    hasLegacyTargetList: scrollAnimationsJs.includes('const revealTargetSelectors = ['),
    hasLegacyProjectSelector: scrollAnimationsJs.includes("'.project-threshold'"),
    exposesGlobal: scrollAnimationsJs.includes('window.HazakuraScrollAnimations = { init }'),
    hasStaleCounterName: scrollAnimationsJs.includes('setAllCounters')
  })
);
assert(
  'reduced motion css follows the data reveal contract',
  /@media \(prefers-reduced-motion: reduce\)[\s\S]*\[data-reveal\],[\s\S]*\[data-reveal-process\] \.process-step,[\s\S]*\[data-reveal-process\] \.process-connector,[\s\S]*opacity: 1 !important;[\s\S]*transform: none !important;/.test(styleCss)
    && !/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.project-threshold,[\s\S]*\.research-log-handoff,[\s\S]*\.quote-prelude-card,[\s\S]*\.section-title,[\s\S]*opacity: 1 !important;/.test(styleCss),
  JSON.stringify({
    hasDataRevealBlock: /@media \(prefers-reduced-motion: reduce\)[\s\S]*\[data-reveal\],[\s\S]*\[data-reveal-process\] \.process-step,[\s\S]*\[data-reveal-process\] \.process-connector,[\s\S]*opacity: 1 !important;[\s\S]*transform: none !important;/.test(styleCss),
    hasLegacyClassRevealBlock: /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.project-threshold,[\s\S]*\.research-log-handoff,[\s\S]*\.quote-prelude-card,[\s\S]*\.section-title,[\s\S]*opacity: 1 !important;/.test(styleCss)
  })
);
assert(
  'staged garden pieces opt into reveal in markup',
  [
    'class="section-title" data-reveal',
    'class="book-showcase',
    'data-project-threshold data-reveal',
    'class="vision-card"',
    'class="research-log-handoff" data-reveal',
    'class="quote-prelude-card" data-reveal',
    'id="quote-block" data-reveal'
  ].every((snippet) => html.includes(snippet) || projectRendererJs.includes(snippet) || visionRendererJs.includes(snippet) || researchRendererJs.includes(snippet) || quotePreludeJs.includes(snippet))
    && html.includes('data-reveal-process'),
  JSON.stringify({
    sectionTitles: (html.match(/class="section-title" data-reveal/g) || []).length,
    bookShowcases: (html.match(/class="book-showcase/g) || []).length,
    projectThreshold: projectRendererJs.includes('data-project-threshold data-reveal'),
    visionCards: visionRendererJs.includes('class="vision-card"') && visionRendererJs.includes('data-reveal data-reveal-stagger'),
    researchHandoff: researchRendererJs.includes('class="research-log-handoff" data-reveal'),
    quotePrelude: quotePreludeJs.includes('class="quote-prelude-card" data-reveal'),
    quoteBlock: html.includes('id="quote-block" data-reveal'),
    processFlow: html.includes('data-reveal-process')
  })
);
assert('canvas size script exposes global', canvasSizeJs.includes('window.HazakuraCanvasSize'));
assert('visibility playback script exposes global', visibilityPlaybackJs.includes('window.HazakuraVisibilityPlayback'));
assert('resize listener script exposes global', resizeListenerJs.includes('window.HazakuraResizeListener'));
assert('animation frames script exposes global', animationFramesJs.includes('window.HazakuraAnimationFrames'));
assert('canvas clear script exposes global', canvasClearJs.includes('window.HazakuraCanvasClear'));
assert('cursor hover script exposes global', cursorHoverJs.includes('window.HazakuraCursorHover'));
assert('card hover fields script exposes global', cardHoverFieldsJs.includes('window.HazakuraCardHoverFields'));
assert(
  'card hover fields follow the data tilt contract',
  cardHoverFieldsJs.includes("const defaultSelector = '[data-tilt]'")
    && cardHoverFieldsJs.includes('document.querySelectorAll(selector)')
    && cardHoverFieldsJs.includes('element?.closest(selector)')
    && [
      sectionFoundationRendererJs,
      projectRendererJs,
      researchRendererJs,
      quotePreludeJs,
      visionRendererJs
    ].every((source) => source.includes('data-tilt'))
    && !cardHoverFieldsJs.includes("'.vision-card, .philosophy-card"),
  JSON.stringify({
    usesDataTiltSelector: cardHoverFieldsJs.includes("const defaultSelector = '[data-tilt]'"),
    queriesConfiguredSelector: cardHoverFieldsJs.includes('document.querySelectorAll(selector)'),
    matchesConfiguredSelector: cardHoverFieldsJs.includes('element?.closest(selector)'),
    renderersExposeTilt: {
      foundation: sectionFoundationRendererJs.includes('data-tilt'),
      projects: projectRendererJs.includes('data-tilt'),
      research: researchRendererJs.includes('data-tilt'),
      quotePrelude: quotePreludeJs.includes('data-tilt'),
      vision: visionRendererJs.includes('data-tilt')
    },
    hasLegacyClassList: cardHoverFieldsJs.includes("'.vision-card, .philosophy-card")
  })
);
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
