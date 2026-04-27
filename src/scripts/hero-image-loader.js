(function () {
  'use strict';

  function init(selector = '#hero-image') {
    const image = document.querySelector(selector);
    if (!image) return;

    const markLoaded = () => image.classList.add('loaded');
    if (image.complete) markLoaded();
    else image.addEventListener('load', markLoaded, { once: true });
  }

  window.HazakuraHeroImageLoader = { init };
})();
