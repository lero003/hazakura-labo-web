(function () {
    'use strict';

    function readCssOffset() {
        const value = getComputedStyle(document.documentElement).getPropertyValue('--hazakura-anchor-offset');
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    function get(defaultOffset = 72) {
        const nav = document.getElementById('nav-main');
        const measuredOffset = nav
            ? Math.ceil(nav.getBoundingClientRect().height + 12)
            : 0;
        return Math.max(defaultOffset, readCssOffset(), measuredOffset);
    }

    window.HazakuraScrollOffset = { get };
})();
