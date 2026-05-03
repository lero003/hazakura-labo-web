(function () {
    'use strict';

    function create(options = {}) {
        const {
            navSelector = '#nav-main',
            progressSelector = '#scroll-progress',
            scrolledThreshold = 80
        } = options;

        const nav = document.querySelector(navSelector);
        const progressBar = document.querySelector(progressSelector);

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

        function update() {
            updateNav();
            updateProgress();
        }

        return { update };
    }

    window.HazakuraScrollIndicators = { create };
})();
