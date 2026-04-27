(function () {
    'use strict';

    function create(options = {}) {
        const {
            dotSelector = '#cursor-dot',
            ringSelector = '#cursor-ring',
            getPrefersReducedMotion = () => false
        } = options;

        const dot = document.querySelector(dotSelector);
        const ring = document.querySelector(ringSelector);
        let cursorX = 0;
        let cursorY = 0;
        let ringX = 0;
        let ringY = 0;
        let frameId;

        function setPosition(x, y) {
            cursorX = x;
            cursorY = y;
        }

        function update() {
            if (getPrefersReducedMotion()) return;

            ringX += (cursorX - ringX) * 0.12;
            ringY += (cursorY - ringY) * 0.12;
            if (dot) dot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
            if (ring) ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            frameId = requestAnimationFrame(update);
        }

        function start() {
            stop();
            if (!getPrefersReducedMotion()) update();
        }

        function stop() {
            window.HazakuraAnimationFrames?.cancelAll(frameId);
            frameId = undefined;
        }

        return { setPosition, start, stop };
    }

    window.HazakuraCursorFollow = { create };
})();
