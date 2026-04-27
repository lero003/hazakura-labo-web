(function () {
    'use strict';

    const revealSelectors = '.philosophy-card, .vision-card, .layer-card, .research-log-handoff, .research-log-card, .cycle-bridge-card, .quote-prelude-card, .section-title, .project-threshold, .project-card, .book-showcase, .quote-block';
    const staggeredSelectors = '.philosophy-card, .vision-card, .layer-card, .research-log-card';

    function revealReducedMotion() {
        document.querySelectorAll(revealSelectors).forEach((el) => el.classList.add('visible'));
        document.querySelectorAll('.process-step, .process-connector').forEach((el) => el.classList.add('visible'));
    }

    function revealStaggered(el) {
        const parent = el.parentElement;
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(el);
        setTimeout(() => { el.classList.add('visible'); }, index * 120);
    }

    function revealProcess(el) {
        el.querySelectorAll('.process-step').forEach((step, index) => {
            setTimeout(() => { step.classList.add('visible'); }, index * 200);
        });
        el.querySelectorAll('.process-connector').forEach((connector, index) => {
            setTimeout(() => { connector.classList.add('visible'); }, index * 200 + 100);
        });
    }

    function init(options = {}) {
        const {
            getPrefersReducedMotion = () => false
        } = options;

        if (getPrefersReducedMotion()) {
            revealReducedMotion();
            return {};
        }

        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -30px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;

                if (el.classList.contains('section-title')) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                    return;
                }

                if (el.matches(staggeredSelectors)) {
                    revealStaggered(el);
                } else if (el.id === 'process-flow') {
                    revealProcess(el);
                } else {
                    el.classList.add('visible');
                }

                observer.unobserve(el);
            });
        }, observerOptions);

        document.querySelectorAll('.philosophy-card, .vision-card, .layer-card, .research-log-handoff, .research-log-card, .cycle-bridge-card, .quote-prelude-card, .section-title, .project-threshold, .project-card').forEach((el) => observer.observe(el));
        document.querySelectorAll('.book-showcase, .quote-block').forEach((el) => observer.observe(el));
        document.querySelectorAll('.process-flow').forEach((el) => observer.observe(el));

        return {
            disconnect() {
                observer.disconnect();
            }
        };
    }

    window.HazakuraScrollAnimations = { init };
})();
