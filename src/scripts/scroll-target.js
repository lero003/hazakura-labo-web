(function () {
    'use strict';

    function getTop(target, offset = 72) {
        if (!target) return null;
        const scrollOffset = window.HazakuraScrollOffset?.get(offset) || offset;
        const top = target.getBoundingClientRect().top + window.scrollY - scrollOffset;
        return Math.max(0, top);
    }

    function scrollTo(target, options = {}) {
        const {
            offset = 72,
            getPrefersReducedMotion = () => false,
            behavior
        } = options;
        const top = getTop(target, offset);
        if (top === null) return false;

        window.scrollTo({
            top,
            behavior: behavior || (getPrefersReducedMotion() ? 'auto' : 'smooth')
        });
        return true;
    }

    window.HazakuraScrollTarget = { getTop, scrollTo };
})();
