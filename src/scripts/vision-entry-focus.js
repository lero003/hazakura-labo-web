(function () {
  'use strict';

  function init(root, options = {}) {
    if (!root || root.dataset.visionEntryFocusReady === 'true') return;
    const { getPrefersReducedMotion = () => false } = options;
    const guideItems = Array.from(root.querySelectorAll('.vision-entry-guide__kind[data-entry-kind]'));
    const cards = Array.from(root.querySelectorAll('.vision-card'));
    if (!guideItems.length || !cards.length) return;

    root.dataset.visionEntryFocusReady = 'true';
    let pinnedKind = '';
    let jumpTimer = 0;
    const activationKeys = new Set(['Enter', ' ']);

    const getScrollOffset = () => window.HazakuraScrollOffset?.get(72) || 72;

    const isMostlyVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const topLimit = getScrollOffset() + 16;
      const bottomLimit = window.innerHeight - Math.min(96, window.innerHeight * 0.14);
      return rect.top >= topLimit && rect.top <= bottomLimit;
    };

    const getControlledCards = (item) => {
      const ids = (item.dataset.entryCardTargets || '')
        .split(/\s+/)
        .filter(Boolean);
      return ids
        .map((id) => document.getElementById(id))
        .filter((card) => card && cards.includes(card));
    };

    const findMatchingCard = (kind, item) => {
      const controlledCards = item ? getControlledCards(item) : [];
      return controlledCards[0] || cards.find((card) => card.dataset.entryKind === kind);
    };

    const nudgeMatchingCard = (kind, item) => {
      const card = findMatchingCard(kind, item);
      if (!card) return;

      card.classList.remove('is-entry-jump');
      window.requestAnimationFrame(() => {
        card.classList.add('is-entry-jump');
        window.clearTimeout(jumpTimer);
        jumpTimer = window.setTimeout(() => {
          card.classList.remove('is-entry-jump');
        }, 900);
      });

      if (isMostlyVisible(card)) return;
      window.HazakuraScrollTarget?.scrollTo(card, {
        getPrefersReducedMotion
      });
    };

    const applyKind = (kind, pinned = false) => {
      const activeKind = kind || '';
      root.classList.toggle('is-entry-focus', Boolean(activeKind));
      root.dataset.entryFocus = activeKind;
      if (pinned) pinnedKind = activeKind;

      guideItems.forEach((item) => {
        const isActive = Boolean(activeKind) && item.dataset.entryKind === activeKind;
        const isPinned = Boolean(pinnedKind) && item.dataset.entryKind === pinnedKind;
        item.classList.toggle('is-entry-active', isActive);
        item.setAttribute('aria-current', isActive ? 'true' : 'false');
        item.setAttribute('aria-pressed', isPinned ? 'true' : 'false');
      });
      cards.forEach((card) => {
        const isMatch = Boolean(activeKind) && card.dataset.entryKind === activeKind;
        card.classList.toggle('is-entry-match', isMatch);
        card.classList.toggle('is-entry-muted', Boolean(activeKind) && !isMatch);
      });
    };

    const clearTransient = () => {
      applyKind(pinnedKind || '');
    };

    const isFromNestedSummary = (event) => event.target instanceof Element
      && Boolean(event.target.closest('summary'));

    const togglePinnedKind = (kind, item) => {
      const nextKind = pinnedKind === kind ? '' : kind;
      applyKind(nextKind, true);
      if (nextKind) nudgeMatchingCard(nextKind, item);
    };

    guideItems.forEach((item) => {
      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.setAttribute('aria-current', 'false');
      item.setAttribute('aria-pressed', 'false');
      const kind = item.dataset.entryKind || '';

      item.addEventListener('mouseenter', () => applyKind(kind));
      item.addEventListener('focusin', () => applyKind(kind));
      item.addEventListener('mouseleave', clearTransient);
      item.addEventListener('focusout', clearTransient);
      item.addEventListener('click', (event) => {
        if (isFromNestedSummary(event)) return;
        togglePinnedKind(kind, item);
      });
      item.addEventListener('keydown', (event) => {
        if (isFromNestedSummary(event)) return;
        if (activationKeys.has(event.key)) {
          event.preventDefault();
          togglePinnedKind(kind, item);
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
