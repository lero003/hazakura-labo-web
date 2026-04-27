(function () {
    'use strict';

    function init(options = {}) {
        const {
            selector = '.nav-links a[href^="#"], .footer-nav a[href^="#"], .hero-cta[href^="#"], .library-projects-bridge__link[href^="#"]',
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
            });
        });
    }

    function markHandoffArrival(target, isReducedMotion) {
        if (!target || isReducedMotion) return;

        target.classList.remove('is-handoff-arrival');
        window.requestAnimationFrame(() => {
            target.classList.add('is-handoff-arrival');
            window.setTimeout(() => {
                target.classList.remove('is-handoff-arrival');
            }, 1800);
        });
    }

    window.HazakuraSmoothScroll = { init };
})();
