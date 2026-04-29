(function () {
    'use strict';

    const defaultSelector = [
        '.nav-logo[href^="#"]',
        '.nav-links a[href^="#"]',
        '.footer-nav a[href^="#"]',
        '.footer-garden-close__link[href^="#"]',
        '.hero-cta[href^="#"]',
        '.library-projects-bridge__link[href^="#"]',
        '.quote-prelude-step[href^="#"]',
        '.project-return-link[href^="#"]'
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
            selector: '.project-return-link',
            className: 'is-research-return-arrival',
            duration: 1500
        },
        {
            selector: '.nav-links a[href="#research-log-strip"], .footer-nav a[href="#research-log-strip"]',
            className: 'is-research-route-arrival',
            duration: 1500
        },
        {
            selector: '.nav-logo, .footer-garden-close__link',
            className: 'is-garden-return-arrival',
            duration: 1700
        }
    ];

    let removeRouteClickHandler = null;
    let routeFocusTimer = 0;

    function init(options = {}) {
        const {
            selector = defaultSelector,
            offset = 72,
            getPrefersReducedMotion = () => false
        } = options;

        removeRouteClickHandler?.();

        const handleRouteClick = (event) => {
            if (shouldIgnoreClick(event)) return;

            const link = findRouteLink(event.target, selector);
            if (!link) return;

            const href = link.getAttribute('href');
            const target = findHashTarget(href);
            if (!target) return;

            event.preventDefault();

            window.HazakuraScrollTarget?.scrollTo(target, {
                offset,
                getPrefersReducedMotion
            });

            updateRouteHash(href);
            const isReducedMotion = getPrefersReducedMotion();
            focusRouteTarget(target, isReducedMotion);
            markMatchingArrival(link, target, isReducedMotion);
        };

        document.addEventListener('click', handleRouteClick);
        removeRouteClickHandler = () => {
            document.removeEventListener('click', handleRouteClick);
            removeRouteClickHandler = null;
        };
    }

    function shouldIgnoreClick(event) {
        return event.defaultPrevented
            || event.button !== 0
            || event.metaKey
            || event.ctrlKey
            || event.shiftKey
            || event.altKey;
    }

    function findRouteLink(eventTarget, selector) {
        const targetElement = eventTarget instanceof Element
            ? eventTarget
            : eventTarget?.parentElement;
        const link = targetElement?.closest(selector);
        return link && document.contains(link) ? link : null;
    }

    function findHashTarget(href) {
        if (!href) return null;
        try {
            return document.querySelector(href);
        } catch (error) {
            return null;
        }
    }

    function updateRouteHash(href) {
        if (!href || !href.startsWith('#') || window.location.hash === href) return;
        window.history.pushState(null, '', href);
    }

    function focusRouteTarget(target, isReducedMotion) {
        if (!target || typeof target.focus !== 'function') return;
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');

        window.clearTimeout(routeFocusTimer);
        routeFocusTimer = window.setTimeout(() => {
            target.focus({ preventScroll: true });
        }, isReducedMotion ? 0 : 420);
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
