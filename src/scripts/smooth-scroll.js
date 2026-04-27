(function () {
    'use strict';

    function init(options = {}) {
        const {
            selector = '.nav-links a[href^="#"], .footer-nav a[href^="#"], .hero-cta[href^="#"]',
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

                const y = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: y,
                    behavior: getPrefersReducedMotion() ? 'auto' : 'smooth'
                });
            });
        });
    }

    window.HazakuraSmoothScroll = { init };
})();
