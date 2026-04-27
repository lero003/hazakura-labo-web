(function () {
    'use strict';

    function init(options = {}) {
        const {
            onTick = () => {}
        } = options;

        let ticking = false;

        function handleScroll() {
            if (ticking) return;

            requestAnimationFrame(() => {
                onTick();
                ticking = false;
            });
            ticking = true;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return {
            destroy() {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }

    window.HazakuraScrollTicker = { init };
})();
