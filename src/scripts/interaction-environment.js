(function () {
  'use strict';

  const matches = (query) => Boolean(window.matchMedia?.(query).matches);

  const isCompactGardenInteraction = () => matches('(hover: none), (pointer: coarse), (max-width: 720px)');

  const getEntryLandingOffset = () => (matches('(max-width: 720px)') ? 116 : 92);

  window.HazakuraInteractionEnvironment = {
    getEntryLandingOffset,
    isCompactGardenInteraction
  };
})();
