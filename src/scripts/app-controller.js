// ============================================================
// 叶桜ラボ — App Controller
// Connects content renderers and animation islands.
// ============================================================

(function () {
    'use strict';

    const motionPreferences = window.HazakuraMotionPreferences?.create();
    let prefersReducedMotion = motionPreferences?.matches || false;

    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;

    const auroraEngine = window.HazakuraAuroraCanvas?.create();
    const shootingStars = window.HazakuraShootingStars?.create();
    let zonePerformance;

    const sakuraEngine = window.HazakuraSakuraPetals?.create({
        canvas,
        getZone: () => zonePerformance?.getCurrentZone() || 1,
        getPrefersReducedMotion: () => prefersReducedMotion,
        onMoonFrame(context, sourceCanvas) {
            shootingStars?.ensure(sourceCanvas.width, sourceCanvas.height);
            shootingStars?.update(context);
        }
    });

    const cursorFollow = window.HazakuraCursorFollow?.create({
        getPrefersReducedMotion: () => prefersReducedMotion
    });
    const motionEffects = window.HazakuraEffectsLifecycle?.create();

    const cardHoverFields = window.HazakuraCardHoverFields?.create();
    const bookTilt = window.HazakuraBookTilt?.create();

    const contentRenderers = window.HazakuraContentRenderers?.create({
        onRendered: () => {
            cardHoverFields?.refresh();
            window.HazakuraVisionEntryFocus?.init(document.querySelector('[data-render="visions"]'), {
                getPrefersReducedMotion: () => prefersReducedMotion
            });
        }
    });

    window.HazakuraPointerInput?.init({
        getDisabled: () => prefersReducedMotion,
        onMove(event) {
            cursorFollow?.setPosition(event.clientX, event.clientY);
            sakuraEngine?.setPointer(event.clientX, event.clientY, event.movementX || 0);

            cardHoverFields?.update(event);
            bookTilt?.update(event);
        }
    });

    motionEffects?.add('sakura-petals', {
        start: () => sakuraEngine?.start(),
        stop: () => sakuraEngine?.stop(),
        resize: () => sakuraEngine?.initPetals(),
        clear: () => sakuraEngine?.clear()
    });
    motionEffects?.add('aurora-canvas', {
        start: () => auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion }),
        stop: () => auroraEngine?.stop(),
        resize() {
            auroraEngine?.resize();
            auroraEngine?.initWaves();
        },
        clear: () => auroraEngine?.clear()
    });
    motionEffects?.add('cursor-follow', {
        start: () => cursorFollow?.start(),
        stop: () => cursorFollow?.stop()
    });

    function startMotionEffects() {
        if (!prefersReducedMotion) motionEffects?.startAll();
    }

    function init() {
        contentRenderers?.render(window.HAZAKURA_CONTENT);
        motionPreferences?.syncBodyClass();
        window.HazakuraCanvasSize?.resize(canvas);
        sakuraEngine?.initPetals();
        auroraEngine?.mount();
        auroraEngine?.resize();
        auroraEngine?.initWaves();
        window.HazakuraHeroAuroraOverlay?.create();
        zonePerformance = window.HazakuraZonePerformance?.create({
            canvas,
            getPrefersReducedMotion: () => prefersReducedMotion,
            sakuraEngine,
            auroraEngine,
            shootingStars
        });
        startMotionEffects();
        window.HazakuraTextReveal?.prepare();
        const scrollAnimations = window.HazakuraScrollAnimations?.init({
            getPrefersReducedMotion: () => prefersReducedMotion
        });
        window.HazakuraSmoothScroll?.init({
            getPrefersReducedMotion: () => prefersReducedMotion
        });
        const scrollIndicators = window.HazakuraScrollIndicators?.create();
        const heroParallax = window.HazakuraHeroParallax?.create();
        scrollIndicators?.update();
        if (!prefersReducedMotion) heroParallax?.update();
        zonePerformance?.update();
        window.HazakuraCursorHover?.init();

        window.HazakuraScrollTicker?.init({
            onTick() {
                scrollIndicators?.update();
                if (!prefersReducedMotion) heroParallax?.update();
                zonePerformance?.update();
            }
        });

        window.HazakuraResizeListener?.init({
            onResize() {
                window.HazakuraCanvasSize?.resize(canvas);
                motionEffects?.resizeAll();
                if (shootingStars?.hasStars()) shootingStars.init(canvas.width, canvas.height);
                if (!prefersReducedMotion) heroParallax?.update();
                scrollIndicators?.update();
                zonePerformance?.update();
            }
        });

        window.HazakuraVisibilityPlayback?.init({
            onHidden() {
                motionEffects?.stopAll();
            },
            onVisible() {
                startMotionEffects();
            }
        });

        motionPreferences?.onChange((event) => {
            prefersReducedMotion = event.matches;
            motionPreferences.syncBodyClass();
            if (prefersReducedMotion) {
                motionEffects?.stopAll();
                motionEffects?.clearAll();
                scrollAnimations?.setAllCounters();
            } else {
                startMotionEffects();
            }
        });

        window.HazakuraHeroImageLoader?.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
