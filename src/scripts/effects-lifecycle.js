// ============================================================
// Hazakura Effects Lifecycle
// Tiny registry for motion effects that share page lifecycle hooks.
// ============================================================

(function () {
    'use strict';

    function create(initialEffects = []) {
        const effects = [];

        function add(name, effect) {
            if (!name || !effect) return;
            effects.push({ name, effect });
        }

        function run(method, ...args) {
            effects.forEach(({ effect }) => {
                const action = effect?.[method];
                if (typeof action === 'function') action(...args);
            });
        }

        initialEffects.forEach(({ name, effect }) => add(name, effect));

        return {
            add,
            startAll: (...args) => run('start', ...args),
            stopAll: (...args) => run('stop', ...args),
            resizeAll: (...args) => run('resize', ...args),
            clearAll: (...args) => run('clear', ...args),
            names: () => effects.map(({ name }) => name)
        };
    }

    window.HazakuraEffectsLifecycle = { create };
})();
