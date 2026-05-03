(function () {
    'use strict';

    function resize(canvas, size = {}) {
        if (!canvas) return;
        const width = size.width || window.innerWidth;
        const height = size.height || window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.HazakuraCanvasSize = { resize };
})();
