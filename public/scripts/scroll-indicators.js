(function () {
    'use strict';

    function create(options = {}) {
        const {
            navSelector = '#nav-main',
            progressSelector = '#scroll-progress',
            routeLinkSelector = '.nav-logo[href^="#"], .nav-links a[href^="#"], .footer-garden-close__link[href^="#"], .footer-nav a[href^="#"]',
            scrolledThreshold = 80
        } = options;

        const nav = document.querySelector(navSelector);
        const progressBar = document.querySelector(progressSelector);
        const routeLinks = Array.from(document.querySelectorAll(routeLinkSelector));
        const routeTargets = Array.from(new Map(routeLinks
            .map((link) => {
                const href = link.getAttribute('href');
                return [href, {
                    href,
                    element: findRouteTarget(href)
                }];
            })
            .filter(([, route]) => route.href && route.element)).values());

        function updateNav() {
            if (!nav) return;
            nav.classList.toggle('scrolled', window.scrollY > scrolledThreshold);
        }

        function updateProgress() {
            if (!progressBar) return;
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }

        function findRouteTarget(href) {
            if (!href) return null;
            try {
                return document.querySelector(href);
            } catch (error) {
                return null;
            }
        }

        function getRouteAtProbe() {
            const sectionsAtProbe = Array.from(document.querySelectorAll('section[id]')).filter((section) => {
                const rect = section.getBoundingClientRect();
                return rect.top <= window.innerHeight * 0.42 && rect.bottom > window.innerHeight * 0.42;
            });
            const sectionAtProbe = sectionsAtProbe.at(-1);

            return routeTargets.find((route) => route.element === sectionAtProbe) || null;
        }

        function getActiveRouteHref() {
            return getRouteAtProbe()?.href || '';
        }

        function updateActiveRoutes() {
            const activeHref = getActiveRouteHref();
            routeLinks.forEach((link) => {
                const isActive = Boolean(activeHref) && link.getAttribute('href') === activeHref;
                if (isActive) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        function update() {
            updateNav();
            updateProgress();
            updateActiveRoutes();
        }

        return { update };
    }

    window.HazakuraScrollIndicators = { create };
})();
