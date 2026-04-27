(function () {
  'use strict';

  function create(zones) {
    const root = document.createElement('div');
    root.className = 'zone-atmosphere';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = zones.slice(1).map((zoneName) => (
      `<span class="zone-atmosphere__pane zone-atmosphere__pane--${zoneName}"></span>`
    )).join('');
    document.body.appendChild(root);

    return {
      root,
      setOpacity(zoneName, value) {
        root.style.setProperty(`--zone-atmosphere-${zoneName}`, value.toFixed(3));
      }
    };
  }

  window.HazakuraZoneAtmosphere = { create };
})();
