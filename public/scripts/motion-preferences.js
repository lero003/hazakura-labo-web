(function () {
  'use strict';

  function create() {
    const query = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false, addEventListener() {} };

    return {
      get matches() {
        return query.matches;
      },
      syncBodyClass() {
        document.body.classList.toggle('motion-reduced', query.matches);
      },
      onChange(callback) {
        query.addEventListener('change', callback);
      }
    };
  }

  window.HazakuraMotionPreferences = { create };
})();
