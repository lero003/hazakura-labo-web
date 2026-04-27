(function () {
    'use strict';

    const revealSelectors = '.philosophy-card, .vision-card, .layer-card, .research-log-handoff, .research-log-card, .cycle-bridge-card, .quote-prelude-card, .section-title, .project-threshold, .project-card, .book-showcase, .quote-block';
    const staggeredSelectors = '.philosophy-card, .vision-card, .layer-card, .research-log-card';

    function setCounterValue(el) {
        if (!el) return;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        el.textContent = target.toLocaleString() + suffix;
    }

    function setAllCounters() {
        document.querySelectorAll('.stat-number').forEach(setCounterValue);
    }

    function animateCounter(el, prefersReducedMotion) {
        if (!el) return;
        const targetEl = el.classList && el.classList.contains('stat-number') ? el : el.querySelector('.stat-number');
        if (!targetEl) return;
        if (prefersReducedMotion) {
            setCounterValue(targetEl);
            return;
        }

        const target = parseInt(targetEl.dataset.target, 10);
        const suffix = targetEl.dataset.suffix || '';
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * target);
            targetEl.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function revealReducedMotion() {
        document.querySelectorAll(revealSelectors).forEach((el) => el.classList.add('visible'));
        document.querySelectorAll('.process-step, .process-connector, .stat-item').forEach((el) => el.classList.add('visible'));
        setAllCounters();
    }

    function revealStaggered(el) {
        const parent = el.parentElement;
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(el);
        setTimeout(() => { el.classList.add('visible'); }, index * 120);
    }

    function revealStats(el, prefersReducedMotion) {
        el.querySelectorAll('.stat-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
                animateCounter(item.querySelector('.stat-number'), prefersReducedMotion);
            }, index * 120);
        });
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
            return { setAllCounters };
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
                } else if (el.id === 'stats-grid') {
                    revealStats(el, getPrefersReducedMotion());
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
        document.querySelectorAll('.stats-grid').forEach((el) => observer.observe(el));
        document.querySelectorAll('.process-flow').forEach((el) => observer.observe(el));

        return {
            setAllCounters,
            disconnect() {
                observer.disconnect();
            }
        };
    }

    window.HazakuraScrollAnimations = { init, setAllCounters };
})();
