(function () {
    'use strict';

    function init(options = {}) {
        const {
            ringSelector = '#cursor-ring',
            targetSelector = 'a, button, input, textarea, [data-tilt]',
            activeClass = 'hovering'
        } = options;

        const ring = document.querySelector(ringSelector);
        if (!ring) return;

        function handleMouseOver(event) {
            if (event.target.closest(targetSelector)) {
                ring.classList.add(activeClass);
            }
        }

        function handleMouseOut(event) {
            if (event.target.closest(targetSelector)) {
                ring.classList.remove(activeClass);
            }
        }

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return {
            destroy() {
                document.removeEventListener('mouseover', handleMouseOver);
                document.removeEventListener('mouseout', handleMouseOut);
            }
        };
    }

    window.HazakuraCursorHover = { init };
})();
