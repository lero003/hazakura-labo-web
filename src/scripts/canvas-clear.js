(function () {
    'use strict';

    function clear(context, canvas) {
        if (!context || !canvas) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function clearAll(...targets) {
        targets.forEach((target) => {
            if (!target) return;
            clear(target.context, target.canvas);
        });
    }

    window.HazakuraCanvasClear = { clear, clearAll };
})();
