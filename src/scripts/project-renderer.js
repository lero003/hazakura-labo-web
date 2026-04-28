(function () {
  'use strict';

  const { escapeHtml } = window.HazakuraDom;

  function getProjectActionType(item) {
    if (!item.href) return 'status';
    return item.actionType || (item.download ? 'download' : 'external');
  }

  function formatProjectDestination(item) {
    if (!item.href) return '';
    if (item.actionDestination) return item.actionDestination;
    if (item.download) return item.href.split('/').pop() || item.href;
    try {
      return new URL(item.href, window.location.href).hostname || item.href;
    } catch (error) {
      return item.href;
    }
  }

  function getActionTypeDetails(projectsGroup) {
    const actionTypes = Array.isArray(projectsGroup.actionTypes) ? projectsGroup.actionTypes : [];
    return actionTypes.reduce((details, actionType) => {
      if (actionType.type) details[actionType.type] = actionType;
      return details;
    }, {});
  }

  function getLaneCounts(items) {
    return items.reduce((counts, item) => {
      if (item.lane) counts[item.lane] = (counts[item.lane] || 0) + 1;
      return counts;
    }, {});
  }

  function renderLaneFilters(projectLanes, laneCounts, totalCount) {
    if (!projectLanes.length) return '';
    return `<div class="project-lane-filter" aria-label="制作物の棚で絞り込む">
      <button class="project-lane-filter__button is-active" type="button" data-lane-filter="all" aria-pressed="true">
        <span>すべて</span>
        <strong>${escapeHtml(String(totalCount))}</strong>
      </button>
      ${projectLanes.map((lane) => `
        <button class="project-lane-filter__button" type="button" data-lane-filter="${escapeHtml(lane.label)}" aria-pressed="false">
          <span>${escapeHtml(lane.jp)}</span>
          <strong>${escapeHtml(String(laneCounts[lane.label] || 0))}</strong>
        </button>
      `).join('')}
    </div>`;
  }

  function renderLaneGuide(projectLanes, laneCounts) {
    if (!projectLanes.length) return '';
    return `<div class="project-lane-guide" aria-label="制作物の棚">
      ${projectLanes.map((lane) => `
        <div class="project-lane-guide__item" data-lane-guide="${escapeHtml(lane.label)}">
          <span class="project-lane-guide__label">${escapeHtml(lane.label)}</span>
          <span class="project-lane-guide__count">${escapeHtml(String(laneCounts[lane.label] || 0))}</span>
          <strong>${escapeHtml(lane.jp)}</strong>
          <p>${escapeHtml(lane.text)}</p>
        </div>
      `).join('')}
    </div>`;
  }

  function renderLaneStatus(projectLanes, overview) {
    if (!projectLanes.length) return '';
    return `<p class="project-lane-status" data-project-lane-status aria-live="polite">${escapeHtml(overview || '制作物を棚ごとに眺められます。')}</p>`;
  }

  function renderThreshold(threshold) {
    if (!threshold) return '';
    return `<div class="project-threshold" data-project-threshold>
      <span class="project-threshold__sigil" aria-hidden="true">✧</span>
      <div class="project-threshold__copy">
        <p class="project-threshold__eyebrow">${escapeHtml(threshold.eyebrow || 'Library handoff')}</p>
        <h3>${escapeHtml(threshold.title || '')}</h3>
        <p>${escapeHtml(threshold.text || '')}</p>
      </div>
      <span class="project-threshold__rail" aria-hidden="true"></span>
    </div>`;
  }

  function renderProjectAction(item, actionType, actionDetail) {
    const actionIcon = actionDetail.icon || (actionType === 'download' ? '↓' : (actionType === 'status' ? '・' : '↗'));
    const actionLabel = item.actionLabel || actionDetail.shortLabel || (actionType === 'download' ? 'DL' : (actionType === 'status' ? '準備' : '外部'));
    const actionClass = `project-action project-action--${escapeHtml(actionType)}`;
    const actionText = escapeHtml(item.action || item.status || (actionType === 'download' ? 'Download' : 'Open'));
    const actionHintText = item.actionHint || (actionType === 'status' ? item.statusHint : '');
    const actionHint = actionHintText ? `<span class="project-action__hint">${escapeHtml(actionHintText)}</span>` : '';
    const actionDestination = formatProjectDestination(item);
    const actionDestinationText = actionDestination ? `<span class="project-action__destination">${escapeHtml(actionDestination)}</span>` : '';
    const actionAria = actionType === 'download'
      ? `${item.title}をダウンロードする`
      : (actionType === 'status' ? `${item.title}は${item.status || '準備中'}です` : `${item.title}を外部サイトで開く`);

    if (!item.href) {
      return `<span class="${actionClass} project-action--inactive" role="status" aria-label="${escapeHtml(actionAria)}"><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></span>`;
    }

    return `<a href="${escapeHtml(item.href)}" class="${actionClass}" aria-label="${escapeHtml(actionAria)}" ${item.download ? 'download' : 'target="_blank" rel="noopener noreferrer"'}><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}${actionDestinationText}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></a>`;
  }

  function renderProjectThumb(item) {
    if (item.image) {
      return `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" class="project-img" loading="lazy" decoding="async">`;
    }

    return `<div class="project-thumb-placeholder" ${item.placeholderAlt ? `role="img" aria-label="${escapeHtml(item.placeholderAlt)}"` : 'aria-hidden="true"'}>
      <span class="placeholder-icon">${escapeHtml(item.placeholderIcon || '🌸')}</span>
      <span class="placeholder-text">${escapeHtml(item.placeholderText || item.title)}</span>
    </div>`;
  }

  function renderTrail(item) {
    const trailItems = [
      ['origin', 'Origin', item.origin],
      ['surprise', 'Surprise', item.surprise],
      ['next', 'Next', item.nextStep]
    ].filter(([, , value]) => value);

    if (!trailItems.length) return '';
    return `<div class="project-trail" aria-label="${escapeHtml(item.title)}の実験の道筋">
      ${trailItems.map(([kind, label, value]) => `
        <p class="project-trail__item" data-trail-kind="${escapeHtml(kind)}">
          <span>${escapeHtml(label)}</span>
          ${escapeHtml(value)}
        </p>
      `).join('')}
    </div>`;
  }

  function renderCycle(item) {
    const cycleSteps = item.cycle
      ? [
        ['問い', item.cycle.question],
        ['実験', item.cycle.experiment],
        ['発見', item.cycle.finding]
      ].filter(([, value]) => value)
      : [];

    if (!cycleSteps.length) return '';
    return `
      <details class="project-cycle-drawer">
        <summary>
          <span class="project-cycle-drawer__sigil" aria-hidden="true">✧</span>
          <span class="project-cycle-drawer__copy">
            <span class="project-cycle-drawer__label">問い → 実験 → 発見</span>
            <span class="project-cycle-drawer__hint">小径をひらく</span>
          </span>
        </summary>
        <dl class="project-cycle" aria-label="${escapeHtml(item.title)}の問い、実験、発見">
          ${cycleSteps.map(([label, value]) => `
            <div>
              <dt>${escapeHtml(label)}</dt>
              <dd>${escapeHtml(value)}</dd>
            </div>
          `).join('')}
        </dl>
      </details>
    `;
  }

  function renderProjectCard(item, actionTypeDetails) {
    const actionType = getProjectActionType(item);
    const actionDetail = actionTypeDetails[actionType] || {};
    const lane = item.lane ? `<span class="project-lane">${escapeHtml(item.lane)}</span>` : '';
    const why = item.why ? `<p class="project-note project-why"><span>Why</span>${escapeHtml(item.why)}</p>` : '';
    const actionNote = item.actionNote
      ? `<p class="project-note project-action-note"><span>${escapeHtml(item.actionNote.label || 'Note')}</span>${escapeHtml(item.actionNote.text || '')}</p>`
      : '';
    const returnLink = item.returnLink
      ? `<a class="project-return-link" href="${escapeHtml(item.returnLink.href || '#')}">
        <span>${escapeHtml(item.returnLink.label || 'Research Log')}</span>
        ${escapeHtml(item.returnLink.text || '')}
      </a>`
      : '';
    const cardClass = item.image ? 'project-card' : 'project-card project-card--placeholder';

    return `
      <article class="${cardClass}" data-project-card data-lane="${escapeHtml(item.lane || '')}" data-action-type="${escapeHtml(actionType)}" data-tilt>
        <div class="project-thumb">${renderProjectThumb(item)}</div>
        <div class="project-info">
          <div class="project-meta-row">
            ${lane}
            <span class="project-type">${escapeHtml(item.type)}</span>
            <span class="project-live">${renderProjectAction(item, actionType, actionDetail)}</span>
          </div>
          <h3 class="project-title">${escapeHtml(item.title)}</h3>
          <p class="project-desc">${escapeHtml(item.text)}</p>
          ${why}
          ${renderTrail(item)}
          ${actionNote}
          ${returnLink}
          ${renderCycle(item)}
          <div class="project-tags">
            ${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }

  function render(projectsGroup) {
    const root = document.querySelector('[data-render="projects"]');
    if (!root || !projectsGroup) return;

    const items = Array.isArray(projectsGroup.items) ? projectsGroup.items : [];
    const projectLanes = projectsGroup.lanes || [];
    const actionTypeDetails = getActionTypeDetails(projectsGroup);
    const laneCounts = getLaneCounts(items);
    const laneGuide = renderLaneGuide(projectLanes, laneCounts);
    const laneFilters = renderLaneFilters(projectLanes, laneCounts, items.length);
    const laneStatus = renderLaneStatus(projectLanes, projectsGroup.overview);
    const controlDeck = laneGuide || laneFilters || laneStatus
      ? `<div class="project-control-deck">${laneGuide}${laneFilters}${laneStatus}</div>`
      : '';
    const cards = items.map((item) => renderProjectCard(item, actionTypeDetails)).join('');

    root.innerHTML = `${renderThreshold(projectsGroup.threshold)}${controlDeck}${cards}`;
    window.HazakuraProjectFilter?.init(root, projectsGroup);
  }

  window.HazakuraProjectRenderer = { render };
})();
