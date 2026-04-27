(function () {
    'use strict';

    function cancelAll(...frameIds) {
        frameIds.forEach((frameId) => {
            if (frameId) cancelAnimationFrame(frameId);
        });
    }

    window.HazakuraAnimationFrames = { cancelAll };
})();
