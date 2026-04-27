// ============================================================
// 叶桜ラボ — Script
// Sakura petals, mouse avoid, scroll, 5 layered zone performance
// ============================================================

(function () {
    'use strict';

    const motionPreferences = window.HazakuraMotionPreferences?.create();
    let prefersReducedMotion = motionPreferences?.matches || false;

    // ===== Sakura/Firefly Canvas =====
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;

    // ===== Aurora Canvas =====
    const auroraEngine = window.HazakuraAuroraCanvas?.create();

    // ===== Shooting stars =====
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

    // ===== Custom Cursor =====
    const cursorFollow = window.HazakuraCursorFollow?.create({
        getPrefersReducedMotion: () => prefersReducedMotion
    });

    // ===== Mouse tracking =====
    const cardHoverFields = window.HazakuraCardHoverFields?.create();
    const bookTilt = window.HazakuraBookTilt?.create();

    const contentRenderers = window.HazakuraContentRenderers?.create({
        onRendered: () => cardHoverFields?.refresh()
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

    // ===== Initialization =====
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
        if (!prefersReducedMotion) {
            sakuraEngine?.start();
            auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
            cursorFollow?.start();
        }
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
                auroraEngine?.resize();
                sakuraEngine?.initPetals();
                auroraEngine?.initWaves();
                if (shootingStars?.hasStars()) shootingStars.init(canvas.width, canvas.height);
                if (!prefersReducedMotion) heroParallax?.update();
                scrollIndicators?.update();
                zonePerformance?.update();
            }
        });

        window.HazakuraVisibilityPlayback?.init({
            onHidden() {
                sakuraEngine?.stop();
                auroraEngine?.stop();
            },
            onVisible() {
                if (prefersReducedMotion) return;
                sakuraEngine?.start();
                auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
            }
        });

        motionPreferences?.onChange((event) => {
            prefersReducedMotion = event.matches;
            motionPreferences.syncBodyClass();
            if (prefersReducedMotion) {
                sakuraEngine?.stop();
                auroraEngine?.stop();
                cursorFollow?.stop();
                sakuraEngine?.clear();
                auroraEngine?.clear();
                scrollAnimations?.setAllCounters();
            } else {
                sakuraEngine?.start();
                auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
                cursorFollow?.start();
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
