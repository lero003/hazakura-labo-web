(function () {
    'use strict';

    function create(options = {}) {
        const {
            depthSelector = '.hero-depth-layer',
            contentSelector = '.hero-content'
        } = options;

        const depthLayer = document.querySelector(depthSelector);
        const content = document.querySelector(contentSelector);

        function update() {
            const scrollY = window.scrollY;
            if (depthLayer) {
                depthLayer.style.transform = `scale(1.1) translateY(${scrollY * 0.2}px)`;
            }
            if (content) {
                content.style.transform = `translateY(${scrollY * 0.15}px)`;
                content.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
            }
        }

        return { update };
    }

    window.HazakuraHeroParallax = { create };
})();
