(function () {
    'use strict';

    const defaultSelector = [
        '.nav-logo[href^="#"]',
        '.nav-links a[href^="#"]',
        '.footer-nav a[href^="#"]',
        '.hero-cta[href^="#"]'
    ].join(', ');

    function init(options = {}) {
        const {
            selector = defaultSelector,
            offset = 72,
            getPrefersReducedMotion = () => false
        } = options;

        document.addEventListener('click', function (event) {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            var targetElement = event.target instanceof Element ? event.target : event.target?.parentElement;
            var link = targetElement?.closest(selector);
            if (!link || !document.contains(link)) return;

            var href = link.getAttribute('href');
            var target;
            try { target = document.querySelector(href); } catch { return; }
            if (!target) return;

            event.preventDefault();

            window.HazakuraScrollTarget?.scrollTo(target, {
                offset,
                getPrefersReducedMotion
            });

            if (href && href.startsWith('#') && window.location.hash !== href) {
                window.history.pushState(null, '', href);
            }

            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            if (!getPrefersReducedMotion()) {
                setTimeout(function () { target.focus({ preventScroll: true }); }, 420);
            }
        });
    }

    window.HazakuraSmoothScroll = { init };
})();
