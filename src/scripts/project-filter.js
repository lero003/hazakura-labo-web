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

    const buildLaneStatus = (selectedLane) => {
      const base = selectedLane === 'all' ? overview : laneCopy[selectedLane] || overview;
      const visibleCards = cards.filter((card) => selectedLane === 'all' || card.dataset.lane === selectedLane);
      const actionCounts = visibleCards.reduce((counts, card) => {
        const actionType = card.dataset.actionType || 'status';
        counts[actionType] = (counts[actionType] || 0) + 1;
        return counts;
      }, {});
      const actionSummary = actionOrder
        .filter((type) => actionCounts[type])
        .map((type) => `${actionLabels[type] || type}${actionCounts[type]}件`)
        .join(' / ');

      return actionSummary
        ? `${base} 表示中は${visibleCards.length}件（${actionSummary}）。`
        : `${base} 表示中は${visibleCards.length}件です。`;
    };

    const setSelectedLane = (selectedLane) => {
      controls.forEach((control) => {
        const isActive = control.dataset.laneFilter === selectedLane;
        control.classList.toggle('is-active', isActive);
        control.setAttribute('aria-pressed', String(isActive));
      });
      cards.forEach((card) => {
        const shouldShow = selectedLane === 'all' || card.dataset.lane === selectedLane;
        card.hidden = !shouldShow;
      });
      laneGuides.forEach((guide) => {
        const isSelected = selectedLane !== 'all' && guide.dataset.laneGuide === selectedLane;
        guide.classList.toggle('is-selected', isSelected);
        guide.classList.toggle('is-muted', selectedLane !== 'all' && !isSelected);
      });
      if (status) status.textContent = buildLaneStatus(selectedLane);
    };

    controls.forEach((control) => {
      control.addEventListener('click', () => {
        setSelectedLane(control.dataset.laneFilter);
      });
    });

    setSelectedLane('all');
  }

  window.HazakuraProjectFilter = { init };
})();
