(function () {
  'use strict';

  function init(root, projectsGroup) {
    const controls = Array.from(root.querySelectorAll('[data-lane-filter]'));
    const cards = Array.from(root.querySelectorAll('[data-project-card]'));
    const laneGuides = Array.from(root.querySelectorAll('[data-lane-guide]'));
    const status = root.querySelector('[data-project-lane-status]');
    if (!controls.length || !cards.length) return;

    const projectLanes = projectsGroup.lanes || [];
    const laneCopy = projectLanes.reduce((copy, lane) => {
      copy[lane.label] = lane.filterText || lane.text || '';
      return copy;
    }, {});
    const actionTypes = Array.isArray(projectsGroup.actionTypes) ? projectsGroup.actionTypes : [];
    const actionLabels = actionTypes.reduce((labels, guide) => {
      if (guide.type) labels[guide.type] = guide.label || guide.type;
      return labels;
    }, {});
    const actionOrder = actionTypes.length ? actionTypes.map((guide) => guide.type).filter(Boolean) : ['external', 'download', 'status'];
    const overview = projectsGroup.overview || '制作物を棚ごとに眺められます。';

    const buildLaneStatus = (selectedLane, selectedTarget = '') => {
      const base = selectedLane === 'all' ? overview : laneCopy[selectedLane] || overview;
      const visibleCards = cards.filter((card) => selectedLane === 'all' || card.dataset.lane === selectedLane);
      const targetCard = selectedTarget
        ? visibleCards.find((card) => card.dataset.projectId === selectedTarget)
        : null;
      const targetTitle = targetCard?.querySelector('.project-title')?.textContent?.trim() || '';
      const actionCounts = visibleCards.reduce((counts, card) => {
        const actionType = card.dataset.actionType || 'status';
        counts[actionType] = (counts[actionType] || 0) + 1;
        return counts;
      }, {});
      const actionSummary = actionOrder
        .filter((type) => actionCounts[type])
        .map((type) => `${actionLabels[type] || type}${actionCounts[type]}件`)
        .join(' / ');

      const countSummary = actionSummary
        ? `${base} 表示中は${visibleCards.length}件（${actionSummary}）。`
        : `${base} 表示中は${visibleCards.length}件です。`;
      return targetTitle ? `${countSummary} 入口灯は「${targetTitle}」へ届いています。` : countSummary;
    };

    const clearEntryTarget = () => {
      cards.forEach((card) => {
        card.classList.remove('is-entry-target');
      });
    };

    const focusEntryTarget = (card) => {
      if (!card) return;
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '-1');
      requestAnimationFrame(() => {
        window.HazakuraScrollTarget?.scrollTo(card, { offset: 92 });
        card.focus({ preventScroll: true });
      });
    };

    const setSelectedLane = (selectedLane, options = {}) => {
      const selectedTarget = options.target || '';
      const shouldFocusTarget = Boolean(options.focusTarget);
      let targetCard = null;
      controls.forEach((control) => {
        const isActive = control.dataset.laneFilter === selectedLane;
        const isEntryControl = control.dataset.projectFilterControl === 'entry';
        const targetMatches = !selectedTarget || !isEntryControl || control.dataset.projectEntryTarget === selectedTarget;
        const shouldMarkActive = isActive && targetMatches;
        control.classList.toggle('is-active', shouldMarkActive);
        control.setAttribute('aria-pressed', String(shouldMarkActive));
      });
      clearEntryTarget();
      cards.forEach((card) => {
        const shouldShow = selectedLane === 'all' || card.dataset.lane === selectedLane;
        card.hidden = !shouldShow;
        if (selectedTarget && shouldShow && card.dataset.projectId === selectedTarget) {
          card.classList.add('is-entry-target');
          targetCard = card;
        }
      });
      laneGuides.forEach((guide) => {
        const isSelected = selectedLane !== 'all' && guide.dataset.laneGuide === selectedLane;
        guide.classList.toggle('is-selected', isSelected);
        guide.classList.toggle('is-muted', selectedLane !== 'all' && !isSelected);
      });
      if (status) status.textContent = buildLaneStatus(selectedLane, selectedTarget);
      if (shouldFocusTarget) focusEntryTarget(targetCard);
    };

    controls.forEach((control) => {
      control.addEventListener('click', () => {
        const isEntryControl = control.dataset.projectFilterControl === 'entry';
        const target = isEntryControl ? control.dataset.projectEntryTarget || '' : '';
        setSelectedLane(control.dataset.laneFilter, { target, focusTarget: isEntryControl });
      });
    });

    setSelectedLane('all');
  }

  window.HazakuraProjectFilter = { init };
})();
