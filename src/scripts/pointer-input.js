(function () {
    'use strict';

    function init(options = {}) {
        const {
            getDisabled = () => false,
            onMove = () => {}
        } = options;

        function handleMouseMove(event) {
            if (getDisabled()) return;
            onMove(event);
        }

        document.addEventListener('mousemove', handleMouseMove);

        return {
            destroy() {
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }

    window.HazakuraPointerInput = { init };
})();
