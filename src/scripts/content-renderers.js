(function () {
    'use strict';

    function create(options = {}) {
        const { onRendered } = options;

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[char]);
    }

    function renderPhilosophy(items) {
        const root = document.querySelector('[data-render="philosophy"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => `
            <article class="philosophy-card" data-tilt>
                <div class="card-icon-wrap">
                    <span class="card-icon">${escapeHtml(item.icon)}</span>
                </div>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-subtitle">${escapeHtml(item.subtitle)}</p>
                <p class="card-text">${escapeHtml(item.text)}</p>
                <div class="card-flutter"><span>❋</span></div>
            </article>
        `).join('');
    }

    function renderExperienceLayers(items) {
        const root = document.querySelector('[data-render="experienceLayers"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item, index) => `
            <article class="layer-card" data-tilt style="--layer-index: ${index + 1}">
                <span class="layer-sequence" aria-hidden="true">
                    <span class="layer-sequence__dot"></span>
                    <span class="layer-sequence__beam"></span>
                </span>
                <span class="layer-label">${escapeHtml(item.label)}</span>
                ${item.cadence ? `<span class="layer-cadence">${escapeHtml(item.cadence)}</span>` : ''}
                ${item.phase ? `<span class="layer-phase"><strong>${escapeHtml(item.phase)}</strong>${item.phaseNote ? `<em>${escapeHtml(item.phaseNote)}</em>` : ''}</span>` : ''}
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
            </article>
        `).join('');
    }

    function renderStats(items) {
        const root = document.querySelector('[data-render="stats"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => `
            <div class="stat-item">
                <div class="stat-number-wrap">
                    <span class="stat-number" data-target="${escapeHtml(item.target)}" data-suffix="${escapeHtml(item.suffix)}">0</span>
                </div>
                <p class="stat-label">${escapeHtml(item.label)}</p>
                <p class="stat-sub">${escapeHtml(item.sub)}</p>
            </div>
        `).join('');
    }

    function renderProcess(items) {
        const root = document.querySelector('[data-render="process"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item, index) => `
            ${index > 0 ? '<div class="process-connector"></div>' : ''}
            <div class="process-step">
                <div class="process-icon">${escapeHtml(item.icon)}</div>
                <span class="process-label">${escapeHtml(item.label)}</span>
            </div>
        `).join('');
    }

    function formatExternalDestination(url) {
        if (!url) return '';
        try {
            return new URL(url, window.location.href).hostname.replace(/^www\./, '');
        } catch {
            return url;
        }
    }

    function renderResearchLogHandoff(handoff, items) {
        if (!handoff) return '';
        const steps = Array.isArray(handoff.steps) ? handoff.steps : [];
        const count = Array.isArray(items) ? items.length : 0;
        return `
            <article class="research-log-handoff" data-tilt>
                <div class="research-log-handoff__copy">
                    <p class="research-log-handoff__eyebrow">${escapeHtml(handoff.eyebrow || 'Return path')}</p>
                    <h3>${escapeHtml(handoff.title || '')}</h3>
                    <p>${escapeHtml(handoff.text || '')}</p>
                </div>
                ${steps.length ? `
                    <ol class="research-log-handoff__steps" aria-label="入口を研究ログへ戻す流れ">
                        ${steps.map((step) => `
                            <li>
                                <span>${escapeHtml(step.label || '')}</span>
                                <p>${escapeHtml(step.text || '')}</p>
                            </li>
                        `).join('')}
                    </ol>
                ` : ''}
                <p class="research-log-handoff__count" aria-label="${escapeHtml(String(count))}件の研究ログ">
                    <strong>${escapeHtml(String(count))}</strong>
                    <span>logs</span>
                </p>
            </article>
        `;
    }

    function renderResearchLogs(researchGroup) {
        const root = document.querySelector('[data-render="researchLogs"]');
        if (!root || !researchGroup) return;
        const items = Array.isArray(researchGroup) ? researchGroup : researchGroup.logs;
        if (!items) return;
        const handoff = Array.isArray(researchGroup) ? '' : renderResearchLogHandoff(researchGroup.handoff, items);
        const cards = items.map((item) => {
            const cardId = item.id ? ` id="${escapeHtml(item.id)}"` : '';
            const wisdomTrail = Array.isArray(item.wisdomTrail) && item.wisdomTrail.length
                ? `<dl class="research-wisdom-trail" aria-label="${escapeHtml(item.title)}の知恵断片">
                    ${item.wisdomTrail.map((trail) => `
                        <div>
                            <dt>${escapeHtml(trail.label || '')}</dt>
                            <dd>${escapeHtml(trail.text || '')}</dd>
                        </div>
                    `).join('')}
                </dl>`
                : '';
            const sourceProject = item.sourceProject
                ? `<p class="research-source">
                    <span>${escapeHtml(item.sourceProject.label || 'Source')}</span>
                    <strong>${escapeHtml(item.sourceProject.title || '')}</strong>
                    ${escapeHtml(item.sourceProject.text || '')}
                </p>`
                : '';
            const paperSample = item.paperSample
                ? (() => {
                    const source = item.paperSample.source;
                    const destination = source ? (source.destination || formatExternalDestination(source.url)) : '';
                    return `<div class="research-paper-sample" aria-label="${escapeHtml(item.paperSample.title || '論文メモサンプル')}">
                    <div class="research-paper-sample__copy">
                        <span>${escapeHtml(item.paperSample.eyebrow || 'Paper memo')}</span>
                        <strong>${escapeHtml(item.paperSample.title || '')}</strong>
                        <p>${escapeHtml(item.paperSample.text || '')}</p>
                        ${source ? `
                            <a class="research-paper-source" href="${escapeHtml(source.url || '#')}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml((source.title || source.label || '論文') + 'を開く')}">
                                <span class="research-paper-source__label">${escapeHtml(source.actionLabel || '外部')}</span>
                                <span class="research-paper-source__copy">
                                    <span class="research-paper-source__hint">${escapeHtml(source.actionHint || source.label || 'Source')}</span>
                                    <strong>${escapeHtml(source.title || '')}</strong>
                                    ${source.note ? `<em>${escapeHtml(source.note)}</em>` : ''}
                                    ${destination ? `<span class="research-paper-source__destination">${escapeHtml(destination)}</span>` : ''}
                                </span>
                                <span class="research-paper-source__icon" aria-hidden="true">↗</span>
                            </a>
                        ` : ''}
                    </div>
                    ${Array.isArray(item.paperSample.notes) && item.paperSample.notes.length ? `
                        <dl class="research-paper-sample__notes">
                            ${item.paperSample.notes.map((note) => `
                                <div>
                                    <dt>${escapeHtml(note.label || '')}</dt>
                                    <dd>${escapeHtml(note.text || '')}</dd>
                                </div>
                            `).join('')}
                        </dl>
                    ` : ''}
                </div>`;
                })()
                : '';
            return `
            <article class="research-log-card"${cardId} data-tilt>
                <div class="research-log-meta">
                    <p class="research-log-eyebrow">${escapeHtml(item.eyebrow)}</p>
                    ${item.theme ? `<span class="research-log-theme">${escapeHtml(item.theme)}</span>` : ''}
                </div>
                <h3 class="research-log-title">${escapeHtml(item.title)}</h3>
                <dl class="research-log-cycle">
                    <div>
                        <dt>問い</dt>
                        <dd>${escapeHtml(item.question)}</dd>
                    </div>
                    <div>
                        <dt>実験</dt>
                        <dd>${escapeHtml(item.experiment)}</dd>
                    </div>
                    <div>
                        <dt>発見</dt>
                        <dd>${escapeHtml(item.finding)}</dd>
                    </div>
                </dl>
                ${wisdomTrail}
                ${sourceProject}
                ${paperSample}
            </article>
        `;
        }).join('');
        root.innerHTML = `${handoff}${cards}`;
    }

    function renderVisions(visionsGroup) {
        const root = document.querySelector('[data-render="visions"]');
        if (!root || !visionsGroup) return;
        const items = Array.isArray(visionsGroup) ? visionsGroup : visionsGroup.items;
        if (!items) return;
        const entryGuide = !Array.isArray(visionsGroup) && visionsGroup.entryGuide
            ? renderVisionEntryGuide(visionsGroup.entryGuide, items)
            : '';
        const entryKinds = !Array.isArray(visionsGroup) && visionsGroup.entryGuide
            ? getVisionEntryKinds(visionsGroup.entryGuide)
            : {};
        const cards = items.map((item) => {
            const entryKind = getVisionEntryKind(item);
            const entryKindAttribute = entryKind ? ` data-entry-kind="${escapeHtml(entryKind)}"` : '';
            const entryKindBadge = entryKind ? renderVisionEntryKindBadge(entryKind, entryKinds[entryKind]) : '';
            return `
            <article class="vision-card"${entryKindAttribute} data-tilt>
                <div class="vision-icon">${escapeHtml(item.icon)}</div>
                ${entryKindBadge}
                <h3>${escapeHtml(item.title)}</h3>
                <p class="vision-jp">${escapeHtml(item.jp)}</p>
                <p class="vision-text">${escapeHtml(item.text)}</p>
                ${renderVisionEntry(item.entry || item.entryQuestion)}
                ${item.tag ? `<span class="vision-tag">${escapeHtml(item.tag)}</span>` : ''}
            </article>
        `;
        }).join('');
        root.innerHTML = `${entryGuide}${cards}`;
    }

    function getVisionEntryKinds(guide) {
        const kinds = Array.isArray(guide.kinds) ? guide.kinds : [];
        return kinds.reduce((map, item) => {
            if (item.kind) map[item.kind] = item;
            return map;
        }, {});
    }

    function getVisionEntryKind(item) {
        const entry = item && item.entry;
        return entry && typeof entry === 'object' && entry.kind ? entry.kind : '';
    }

    function renderVisionEntryGuide(guide, visionItems) {
        const kinds = Array.isArray(guide.kinds) ? guide.kinds : [];
        const kindCounts = Array.isArray(visionItems)
            ? visionItems.reduce((counts, item) => {
                const kind = item.entry && item.entry.kind;
                if (kind) counts[kind] = (counts[kind] || 0) + 1;
                return counts;
            }, {})
            : {};
        return `
            <article class="vision-entry-guide" aria-label="${escapeHtml(guide.title || 'コミュニティ入力種別')}">
                <div class="vision-entry-guide__copy">
                    <p class="vision-entry-guide__eyebrow">${escapeHtml(guide.eyebrow || 'Community interface')}</p>
                    <h3>${escapeHtml(guide.title || '')}</h3>
                    <p>${escapeHtml(guide.text || '')}</p>
                </div>
                ${kinds.length ? `
                    <div class="vision-entry-guide__kinds">
                        ${kinds.map((item) => `
                            <div class="vision-entry-guide__kind" data-entry-kind="${escapeHtml(item.kind || 'seed')}">
                                <span>${escapeHtml(item.label || item.kind || '種')}</span>
                                <p>${escapeHtml(item.text || '')}</p>
                                <small>
                                    <span>${escapeHtml(String(kindCounts[item.kind] || 0))}件の入口</span>
                                    ${item.target ? `<span>${escapeHtml(item.target)}へ接続</span>` : ''}
                                </small>
                                ${item.flow ? `<span class="vision-entry-guide__flow">${escapeHtml(item.flow)}</span>` : ''}
                                ${renderVisionEntryFields(item.fields)}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </article>
        `;
    }

    function renderVisionEntryFields(fields) {
        if (!Array.isArray(fields) || !fields.length) return '';
        return `
            <details class="vision-entry-guide__field-drawer">
                <summary>
                    <span>受付メモ</span>
                    <small>${escapeHtml(String(fields.length))}つ</small>
                </summary>
                <ul class="vision-entry-guide__fields" aria-label="受付メモ">
                    ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}
                </ul>
            </details>
        `;
    }

    function renderVisionEntryKindBadge(kind, detail) {
        const label = detail && detail.label ? detail.label : kind;
        const target = detail && detail.target ? detail.target : '';
        return `
            <span class="vision-entry-kind-badge" data-entry-kind="${escapeHtml(kind)}">
                <span>${escapeHtml(label)}の入口</span>
                ${target ? `<small>${escapeHtml(target)}</small>` : ''}
            </span>
        `;
    }

    function renderVisionEntry(entry) {
        if (!entry) return '';
        if (typeof entry === 'string') return `<p class="vision-entry-question">${escapeHtml(entry)}</p>`;
        return `
            <div class="vision-entry-question" data-entry-kind="${escapeHtml(entry.kind || 'seed')}">
                <span class="vision-entry-question__label">${escapeHtml(entry.label || 'まず預けたいこと')}</span>
                <span class="vision-entry-question__prompt">${escapeHtml(entry.prompt || '')}</span>
                ${renderVisionEntryQuestionFields(entry.fields)}
                ${renderVisionEntryHandoff(entry.handoff)}
            </div>
        `;
    }

    function renderVisionEntryQuestionFields(fields) {
        if (!Array.isArray(fields) || !fields.length) return '';
        return `
            <ul class="vision-entry-question__fields" aria-label="受付メモ">
                ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}
            </ul>
        `;
    }

    function renderVisionEntryHandoff(handoff) {
        if (!handoff) return '';
        return `
            <p class="vision-entry-question__handoff">
                <span>${escapeHtml(handoff.label || '預けたあと')}</span>
                ${escapeHtml(handoff.text || '')}
            </p>
        `;
    }

    function renderCycleBridge(item) {
        const root = document.querySelector('[data-render="cycleBridge"]');
        if (!root || !item) return;
        root.innerHTML = `
            <article class="cycle-bridge-card" data-tilt>
                <p class="cycle-bridge-eyebrow">${escapeHtml(item.eyebrow)}</p>
                <h3 class="cycle-bridge-title">${escapeHtml(item.title)}</h3>
                <p class="cycle-bridge-text">${escapeHtml(item.text)}</p>
            </article>
        `;
    }

    function renderResearchGroup(researchGroup) {
        if (!researchGroup) return;
        renderResearchLogs(researchGroup);
        renderCycleBridge(researchGroup.cycleBridge);
    }

    function renderQuotePrelude(item) {
        window.HazakuraQuotePrelude?.render(item);
    }

    function renderProjects(projectsGroup) {
        const root = document.querySelector('[data-render="projects"]');
        if (!root || !projectsGroup) return;
        const items = Array.isArray(projectsGroup.items) ? projectsGroup.items : [];
        const projectLanes = projectsGroup.lanes || [];
        const actionTypes = Array.isArray(projectsGroup.actionTypes) ? projectsGroup.actionTypes : [];
        const actionTypeDetails = actionTypes.reduce((details, actionType) => {
            if (actionType.type) details[actionType.type] = actionType;
            return details;
        }, {});
        const getProjectActionType = (item) => {
            if (!item.href) return 'status';
            return item.actionType || (item.download ? 'download' : 'external');
        };
        const formatProjectDestination = (item) => {
            if (!item.href) return '';
            if (item.actionDestination) return item.actionDestination;
            if (item.download) return item.href.split('/').pop() || item.href;
            try {
                return new URL(item.href, window.location.href).hostname || item.href;
            } catch (error) {
                return item.href;
            }
        };
        const laneCounts = items.reduce((counts, item) => {
            if (item.lane) counts[item.lane] = (counts[item.lane] || 0) + 1;
            return counts;
        }, {});
        const laneFilters = projectLanes.length
            ? `<div class="project-lane-filter" aria-label="制作物の棚で絞り込む">
                <button class="project-lane-filter__button is-active" type="button" data-lane-filter="all" aria-pressed="true">
                    <span>すべて</span>
                    <strong>${escapeHtml(String(items.length))}</strong>
                </button>
                ${projectLanes.map((lane) => `
                    <button class="project-lane-filter__button" type="button" data-lane-filter="${escapeHtml(lane.label)}" aria-pressed="false">
                        <span>${escapeHtml(lane.jp)}</span>
                        <strong>${escapeHtml(String(laneCounts[lane.label] || 0))}</strong>
                    </button>
                `).join('')}
            </div>`
            : '';
        const laneGuide = projectLanes.length
            ? `<div class="project-lane-guide" aria-label="制作物の棚">
                ${projectLanes.map((lane) => `
                    <div class="project-lane-guide__item" data-lane-guide="${escapeHtml(lane.label)}">
                        <span class="project-lane-guide__label">${escapeHtml(lane.label)}</span>
                        <span class="project-lane-guide__count">${escapeHtml(String(laneCounts[lane.label] || 0))}</span>
                        <strong>${escapeHtml(lane.jp)}</strong>
                        <p>${escapeHtml(lane.text)}</p>
                    </div>
                `).join('')}
            </div>`
            : '';
        const laneStatus = projectLanes.length
            ? `<p class="project-lane-status" data-project-lane-status aria-live="polite">${escapeHtml(projectsGroup.overview || '制作物を棚ごとに眺められます。')}</p>`
            : '';
        const cards = items.map((item) => {
            const actionType = getProjectActionType(item);
            const actionDetail = actionTypeDetails[actionType] || {};
            const actionIcon = actionDetail.icon || (actionType === 'download' ? '↓' : (actionType === 'status' ? '・' : '↗'));
            const actionLabel = item.actionLabel || actionDetail.shortLabel || (actionType === 'download' ? 'DL' : (actionType === 'status' ? '準備' : '外部'));
            const actionClass = `project-action project-action--${escapeHtml(actionType)}`;
            const actionText = escapeHtml(item.action || item.status || (actionType === 'download' ? 'Download' : 'Open'));
            const actionHintText = item.actionHint || (actionType === 'status' ? item.statusHint : '');
            const actionHint = actionHintText
                ? `<span class="project-action__hint">${escapeHtml(actionHintText)}</span>`
                : '';
            const actionDestination = formatProjectDestination(item);
            const actionDestinationText = actionDestination
                ? `<span class="project-action__destination">${escapeHtml(actionDestination)}</span>`
                : '';
            const actionAria = actionType === 'download'
                ? `${item.title}をダウンロードする`
                : (actionType === 'status' ? `${item.title}は${item.status || '準備中'}です` : `${item.title}を外部サイトで開く`);
            const thumb = item.image
                ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" class="project-img" loading="lazy" decoding="async">`
                : `<div class="project-thumb-placeholder" ${item.placeholderAlt ? `role="img" aria-label="${escapeHtml(item.placeholderAlt)}"` : 'aria-hidden="true"'}>
                    <span class="placeholder-icon">${escapeHtml(item.placeholderIcon || '🌸')}</span>
                    <span class="placeholder-text">${escapeHtml(item.placeholderText || item.title)}</span>
                </div>`;
            const live = item.href
                ? `<a href="${escapeHtml(item.href)}" class="${actionClass}" aria-label="${escapeHtml(actionAria)}" ${item.download ? 'download' : 'target="_blank" rel="noopener noreferrer"'}><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}${actionDestinationText}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></a>`
                : `<span class="${actionClass} project-action--inactive" role="status" aria-label="${escapeHtml(actionAria)}"><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></span>`;
            const lane = item.lane
                ? `<span class="project-lane">${escapeHtml(item.lane)}</span>`
                : '';
            const why = item.why
                ? `<p class="project-note project-why"><span>Why</span>${escapeHtml(item.why)}</p>`
                : '';
            const trailItems = [
                ['origin', 'Origin', item.origin],
                ['surprise', 'Surprise', item.surprise],
                ['next', 'Next', item.nextStep]
            ].filter(([, , value]) => value);
            const trail = trailItems.length
                ? `<div class="project-trail" aria-label="${escapeHtml(item.title)}の実験の道筋">
                    ${trailItems.map(([kind, label, value]) => `
                        <p class="project-trail__item" data-trail-kind="${escapeHtml(kind)}">
                            <span>${escapeHtml(label)}</span>
                            ${escapeHtml(value)}
                        </p>
                    `).join('')}
                </div>`
                : '';
            const actionNote = item.actionNote
                ? `<p class="project-action-note"><span>${escapeHtml(item.actionNote.label || 'Note')}</span>${escapeHtml(item.actionNote.text || '')}</p>`
                : '';
            const returnLink = item.returnLink
                ? `<a class="project-return-link" href="${escapeHtml(item.returnLink.href || '#')}">
                    <span>${escapeHtml(item.returnLink.label || 'Research Log')}</span>
                    ${escapeHtml(item.returnLink.text || '')}
                </a>`
                : '';
            const cycleSteps = item.cycle
                ? [
                    ['問い', item.cycle.question],
                    ['実験', item.cycle.experiment],
                    ['発見', item.cycle.finding]
                ].filter(([, value]) => value)
                : [];
            const cycle = cycleSteps.length ? `
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
            ` : '';
            const cardClass = item.image ? 'project-card' : 'project-card project-card--placeholder';
            return `
                <article class="${cardClass}" data-project-card data-lane="${escapeHtml(item.lane || '')}" data-action-type="${escapeHtml(actionType)}" data-tilt>
                    <div class="project-thumb">${thumb}</div>
                    <div class="project-info">
                        <div class="project-meta-row">
                            ${lane}
                            <span class="project-type">${escapeHtml(item.type)}</span>
                            <span class="project-live">${live}</span>
                        </div>
                        <h3 class="project-title">${escapeHtml(item.title)}</h3>
                        <p class="project-desc">${escapeHtml(item.text)}</p>
                        ${why}
                        ${trail}
                        ${actionNote}
                        ${returnLink}
                        ${cycle}
                        <div class="project-tags">
                            ${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                        </div>
                    </div>
                </article>
            `;
        }).join('');
        root.innerHTML = `${laneGuide}${laneFilters}${laneStatus}${cards}`;
        initProjectLaneFilter(root, projectsGroup);
    }

    function initProjectLaneFilter(root, projectsGroup) {
        window.HazakuraProjectFilter?.init(root, projectsGroup);
    }

    function render(content) {
        if (!content) return;
        renderPhilosophy(content.philosophy);
        renderExperienceLayers(content.experienceLayers);
        renderStats(content.stats);
        renderProcess(content.process);
        renderResearchGroup(content.researchGroup);
        renderVisions(content.visionsGroup || content.visions);
        renderProjects(content.projectsGroup);
        renderQuotePrelude(content.quotePrelude);
        onRendered?.();
    }

        return { render };
    }

    window.HazakuraContentRenderers = { create };
})();
