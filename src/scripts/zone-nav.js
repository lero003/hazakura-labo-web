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
    const root = document.createElement('nav');
    root.className = 'zone-nav';
    root.setAttribute('aria-label', '季節のゾーン巡回');
    root.innerHTML = zones.slice(1).map((zoneName, index) => {
      const zone = index + 1;
      const detail = zoneDetails[zone];
      return `<button type="button" class="zone-btn ${detail.className}" data-zone="${zone}" data-zone-name="${zoneName}" data-zone-label="${detail.title}" title="${detail.title}" aria-label="${detail.title}へ移動" aria-pressed="false"><span aria-hidden="true">${detail.icon}</span></button>`;
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
          const isActive = parseInt(button.dataset.zone, 10) === zone;
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });
      }
    };
  }

  window.HazakuraZoneNav = { create };
})();
