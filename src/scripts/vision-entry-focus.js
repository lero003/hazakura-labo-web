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
    let releaseTimer = 0;

    const getScrollOffset = () => window.HazakuraScrollOffset?.get(72) || 72;
    const shouldAutoReleasePinned = () => window.matchMedia
      && window.matchMedia('(hover: none), (pointer: coarse), (max-width: 720px)').matches;

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
        const selectButton = getSelectButton(item);
        item.classList.toggle('is-entry-active', isActive);
        selectButton?.setAttribute('aria-pressed', isPinned ? 'true' : 'false');
      });
      cards.forEach((card) => {
        const isMatch = Boolean(activeKind) && card.dataset.entryKind === activeKind;
        card.classList.toggle('is-entry-match', isMatch);
        card.classList.toggle('is-entry-muted', Boolean(activeKind) && !isMatch);
      });
    };

    const releasePinnedKind = () => {
      window.clearTimeout(releaseTimer);
      pinnedKind = '';
      applyKind('');
    };

    const schedulePinnedRelease = (kind) => {
      window.clearTimeout(releaseTimer);
      if (!kind || !shouldAutoReleasePinned()) return;

      releaseTimer = window.setTimeout(() => {
        if (pinnedKind === kind) releasePinnedKind();
      }, 2200);
    };

    const clearTransient = () => {
      applyKind(pinnedKind || '');
    };

    const getSelectButton = (item) => item.querySelector('[data-entry-kind-select]');

    const togglePinnedKind = (kind, item) => {
      const nextKind = pinnedKind === kind ? '' : kind;
      applyKind(nextKind, true);
      if (nextKind) {
        nudgeMatchingCard(nextKind, item);
        schedulePinnedRelease(nextKind);
      } else {
        window.clearTimeout(releaseTimer);
      }
    };

    guideItems.forEach((item) => {
      const kind = item.dataset.entryKind || '';
      const selectButton = getSelectButton(item);
      if (!selectButton) return;

      item.addEventListener('mouseenter', () => applyKind(kind));
      item.addEventListener('focusin', (event) => {
        if (event.target instanceof Element && event.target.closest('details')) return;
        applyKind(kind);
      });
      item.addEventListener('mouseleave', clearTransient);
      item.addEventListener('focusout', clearTransient);

      selectButton.addEventListener('click', () => {
        togglePinnedKind(kind, item);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && pinnedKind) {
        releasePinnedKind();
      }
    });
  }

  window.HazakuraVisionEntryFocus = { init };
})();
