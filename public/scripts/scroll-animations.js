(function () {
    'use strict';

    const revealSelector = '[data-reveal]';
    const staggeredSelector = '[data-reveal-stagger]';

    function revealAll() {
        document.querySelectorAll(revealSelector).forEach((el) => el.classList.add('visible'));
        document.querySelectorAll(staggeredSelector).forEach((el) => {
            el.classList.add('visible');
            Array.from(el.children).forEach((child) => child.classList.add('visible'));
        });
    }

    function revealStaggered(el) {
        const children = Array.from(el.children);
        children.forEach((child, index) => {
            setTimeout(() => { child.classList.add('visible'); }, index * 100);
        });
    }

    function init(options = {}) {
        const {
            getPrefersReducedMotion = () => false
        } = options;

        if (getPrefersReducedMotion()) {
            revealAll();
            return {
                revealAll,
                disconnect() {}
            };
        }

        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -30px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;

                if (el.matches(staggeredSelector)) {
                    revealStaggered(el);
                } else {
                    el.classList.add('visible');
                }

                observer.unobserve(el);
            });
        }, observerOptions);

        document.querySelectorAll(revealSelector).forEach((el) => observer.observe(el));
        document.querySelectorAll(staggeredSelector).forEach((el) => observer.observe(el));

        return {
            revealAll,
            disconnect() {
                observer.disconnect();
            }
        };
    }

    window.HazakuraScrollAnimations = { init };
})();
