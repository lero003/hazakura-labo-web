(function () {
  'use strict';

  function init(root) {
    if (!root || root.dataset.visionEntryFocusReady === 'true') return;
    const guideItems = Array.from(root.querySelectorAll('.vision-entry-guide__kind[data-entry-kind]'));
    const cards = Array.from(root.querySelectorAll('.vision-card'));
    if (!guideItems.length || !cards.length) return;

    root.dataset.visionEntryFocusReady = 'true';
    let pinnedKind = '';

    const applyKind = (kind, pinned = false) => {
      const activeKind = kind || '';
      root.classList.toggle('is-entry-focus', Boolean(activeKind));
      root.dataset.entryFocus = activeKind;
      if (pinned) pinnedKind = activeKind;

      guideItems.forEach((item) => {
        const isActive = Boolean(activeKind) && item.dataset.entryKind === activeKind;
        item.classList.toggle('is-entry-active', isActive);
        item.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
      cards.forEach((card) => {
        const isMatch = Boolean(activeKind) && card.dataset.entryKind === activeKind;
        card.classList.toggle('is-entry-match', isMatch);
        card.classList.toggle('is-entry-muted', Boolean(activeKind) && !isMatch);
      });
    };

    const clearTransient = () => {
      if (!pinnedKind) applyKind('');
    };

    guideItems.forEach((item) => {
      item.tabIndex = 0;
      item.setAttribute('aria-current', 'false');
      const kind = item.dataset.entryKind || '';

      item.addEventListener('mouseenter', () => applyKind(kind));
      item.addEventListener('focusin', () => applyKind(kind));
      item.addEventListener('mouseleave', clearTransient);
      item.addEventListener('focusout', clearTransient);
      item.addEventListener('click', (event) => {
        if (event.target.closest('summary')) return;
        const nextKind = pinnedKind === kind ? '' : kind;
        applyKind(nextKind, true);
      });
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const nextKind = pinnedKind === kind ? '' : kind;
          applyKind(nextKind, true);
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && pinnedKind) {
        pinnedKind = '';
        applyKind('');
      }
    });
  }

  window.HazakuraVisionEntryFocus = { init };
})();
