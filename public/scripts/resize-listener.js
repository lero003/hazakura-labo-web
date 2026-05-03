(function () {
    'use strict';

    function init(options = {}) {
        const {
            delay = 150,
            onResize = () => {}
        } = options;

        let timer;

        function handleResize() {
            clearTimeout(timer);
            timer = setTimeout(onResize, delay);
        }

        window.addEventListener('resize', handleResize);

        return {
            destroy() {
                clearTimeout(timer);
                window.removeEventListener('resize', handleResize);
            }
        };
    }

    window.HazakuraResizeListener = { init };
})();
