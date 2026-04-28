(function () {
    'use strict';

    function init(options = {}) {
        const {
            selector = '.nav-links a[href^="#"], .footer-nav a[href^="#"], .footer-garden-close__link[href^="#"], .hero-cta[href^="#"], .library-projects-bridge__link[href^="#"], .quote-prelude-step[href^="#"]',
            offset = 72,
            getPrefersReducedMotion = () => false
        } = options;

        document.querySelectorAll(selector).forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                if (!href) return;

                const target = document.querySelector(href);
                if (!target) return;

                const scrollOffset = window.HazakuraScrollOffset?.get(offset) || offset;
                const y = target.getBoundingClientRect().top + window.scrollY - scrollOffset;
                window.scrollTo({
                    top: Math.max(0, y),
                    behavior: getPrefersReducedMotion() ? 'auto' : 'smooth'
                });

                if (link.matches('.library-projects-bridge__link')) {
                    markHandoffArrival(target, getPrefersReducedMotion());
                }

                if (link.matches('.quote-prelude-step')) {
                    markQuoteReturnArrival(target, getPrefersReducedMotion());
                }

                if (link.matches('.footer-garden-close__link')) {
                    markFooterReturnArrival(target, getPrefersReducedMotion());
                }
            });
        });
    }

    function markHandoffArrival(target, isReducedMotion) {
        markArrival(target, 'is-handoff-arrival', 1800, isReducedMotion);
    }

    function markQuoteReturnArrival(target, isReducedMotion) {
        markArrival(target, 'is-quote-return-arrival', 1600, isReducedMotion);
    }

    function markFooterReturnArrival(target, isReducedMotion) {
        markArrival(target, 'is-footer-return-arrival', 1700, isReducedMotion);
    }

    function markArrival(target, className, duration, isReducedMotion) {
        if (!target || isReducedMotion) return;

        target.classList.remove(className);
        window.requestAnimationFrame(() => {
            target.classList.add(className);
            window.setTimeout(() => {
                target.classList.remove(className);
            }, duration);
        });
    }

    window.HazakuraSmoothScroll = { init };
})();
