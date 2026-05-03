(function () {
    'use strict';

    function init(options = {}) {
        const {
            onHidden = () => {},
            onVisible = () => {}
        } = options;

        function handleVisibilityChange() {
            if (document.hidden) onHidden();
            else onVisible();
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return {
            destroy() {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };
    }

    window.HazakuraVisibilityPlayback = { init };
})();
