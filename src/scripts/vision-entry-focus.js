(function () {
  'use strict';

  function init(root) {
    if (!root || root.dataset.visionEntryFocusReady === 'true') return;
    const guideItems = Array.from(root.querySelectorAll('.vision-entry-guide__kind[data-entry-kind]'));
    const cards = Array.from(root.querySelectorAll('.vision-card'));
    if (!guideItems.length || !cards.length) return;

    root.dataset.visionEntryFocusReady = 'true';
    let pinnedKind = '';
    let jumpTimer = 0;

    const getScrollOffset = () => window.HazakuraScrollOffset?.get(72) || 72;

    const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;

    const isMostlyVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const topLimit = getScrollOffset() + 16;
      const bottomLimit = window.innerHeight - Math.min(96, window.innerHeight * 0.14);
      return rect.top >= topLimit && rect.top <= bottomLimit;
    };

    const findMatchingCard = (kind) => cards.find((card) => card.dataset.entryKind === kind);

    const nudgeMatchingCard = (kind) => {
      const card = findMatchingCard(kind);
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
      const y = card.getBoundingClientRect().top + window.scrollY - getScrollOffset();
      window.scrollTo({
        top: Math.max(0, y),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    };

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
        if (nextKind) nudgeMatchingCard(nextKind);
      });
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const nextKind = pinnedKind === kind ? '' : kind;
          applyKind(nextKind, true);
          if (nextKind) nudgeMatchingCard(nextKind);
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
