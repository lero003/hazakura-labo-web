(function () {
    'use strict';

    const defaultSelector = [
        '.nav-logo[href^="#"]',
        '.nav-links a[href^="#"]',
        '.footer-nav a[href^="#"]',
        '.footer-garden-close__link[href^="#"]',
        '.hero-cta[href^="#"]',
        '.library-projects-bridge__link[href^="#"]',
        '.quote-prelude-step[href^="#"]'
    ].join(', ');

    const arrivalRules = [
        {
            selector: '.library-projects-bridge__link',
            className: 'is-handoff-arrival',
            duration: 1800
        },
        {
            selector: '.quote-prelude-step',
            className: 'is-quote-return-arrival',
            duration: 1600
        },
        {
            selector: '.nav-logo, .footer-garden-close__link',
            className: 'is-garden-return-arrival',
            duration: 1700
        }
    ];

    function init(options = {}) {
        const {
            selector = defaultSelector,
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

                markMatchingArrival(link, target, getPrefersReducedMotion());
            });
        });
    }

    function markMatchingArrival(link, target, isReducedMotion) {
        const rule = arrivalRules.find(({ selector }) => link.matches(selector));
        if (!rule) return;
        markArrival(target, rule.className, rule.duration, isReducedMotion);
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
