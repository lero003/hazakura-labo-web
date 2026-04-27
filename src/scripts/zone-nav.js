(function () {
  'use strict';

  const zoneDetails = {
    1: { className: 'zone-btn-1', title: 'Day — 桜', icon: '🌸' },
    2: { className: 'zone-btn-2', title: 'Dusk — 夕景', icon: '🌅' },
    3: { className: 'zone-btn-3', title: 'Night — 夜', icon: '🌙' },
    4: { className: 'zone-btn-4', title: 'Moon — 月明', icon: '⭐' },
    5: { className: 'zone-btn-5', title: 'Aurora — 瑠璃', icon: '🌌' }
  };

  function create({ zones, onSelect }) {
    const root = document.createElement('div');
    root.className = 'zone-nav';
    root.innerHTML = zones.slice(1).map((zoneName, index) => {
      const zone = index + 1;
      const detail = zoneDetails[zone];
      return `<div class="zone-btn ${detail.className}" data-zone="${zone}" data-zone-name="${zoneName}" title="${detail.title}">${detail.icon}</div>`;
    }).join('');
    document.body.appendChild(root);

    root.querySelectorAll('.zone-btn').forEach((button) => {
      button.addEventListener('click', () => {
        onSelect?.(parseInt(button.dataset.zone, 10));
      });
    });

    return {
      root,
      setActive(zone) {
        root.querySelectorAll('.zone-btn').forEach((button) => {
          button.classList.toggle('active', parseInt(button.dataset.zone, 10) === zone);
        });
      }
    };
  }

  window.HazakuraZoneNav = { create };
})();
