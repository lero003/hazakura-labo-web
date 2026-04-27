(function () {
  'use strict';

  function create() {
    const hero = document.querySelector('.hero');
    if (!hero) return null;
    const existing = hero.querySelector('.hero-aurora-overlay');
    if (existing) return existing;

    const anchor = hero.querySelector('.hero-overlay');
    if (!anchor) return null;

    const overlay = document.createElement('div');
    overlay.className = 'hero-aurora-overlay';
    anchor.insertAdjacentElement('afterend', overlay);
    return overlay;
  }

  window.HazakuraHeroAuroraOverlay = { create };
})();
