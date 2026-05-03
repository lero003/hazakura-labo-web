(function () {
    'use strict';

    function create(options = {}) {
        const {
            contentSelector = '.hero-content'
        } = options;

        const content = document.querySelector(contentSelector);

        function update() {
            if (!content) return;
            const scrollY = window.scrollY;
            content.style.transform = `translateY(${scrollY * 0.15}px)`;
            content.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
        }

        return { update };
    }

    window.HazakuraHeroParallax = { create };
})();
