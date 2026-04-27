// ============================================================
// 叶桜ラボ — Script
// Sakura petals, mouse avoid, scroll, 5 layered zone performance
// ============================================================

(function () {
    'use strict';

    const motionPreferences = window.HazakuraMotionPreferences?.create();
    let prefersReducedMotion = motionPreferences?.matches || false;

    // ===== Sakura/Firefly Canvas =====
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;

    // ===== Aurora Canvas =====
    const auroraEngine = window.HazakuraAuroraCanvas?.create();

    // ===== Shooting stars =====
    const shootingStars = window.HazakuraShootingStars?.create();

    const sakuraEngine = window.HazakuraSakuraPetals?.create({
        canvas,
        getZone: () => currentZone,
        getPrefersReducedMotion: () => prefersReducedMotion,
        onMoonFrame(context, sourceCanvas) {
            shootingStars?.ensure(sourceCanvas.width, sourceCanvas.height);
            shootingStars?.update(context);
        }
    });

    // ===== Custom Cursor =====
    const cursorFollow = window.HazakuraCursorFollow?.create({
        getPrefersReducedMotion: () => prefersReducedMotion
    });

    // ===== Mouse tracking =====
    const cardHoverFields = window.HazakuraCardHoverFields?.create();
    const bookTilt = window.HazakuraBookTilt?.create();

    function refreshHoverTargets() {
        cardHoverFields?.refresh();
    }

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

    function renderResearchLogs(items) {
        const root = document.querySelector('[data-render="researchLogs"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => {
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
            <ul class="vision-entry-guide__fields" aria-label="受付メモ">
                ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}
            </ul>
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
        renderResearchLogs(researchGroup.logs);
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
            const actionIcon = actionType === 'download' ? '↓' : (actionType === 'status' ? '・' : '↗');
            const actionLabel = item.actionLabel || (actionType === 'download' ? 'DL' : (actionType === 'status' ? '準備' : '外部'));
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
            const origin = item.origin
                ? `<p class="project-note project-origin"><span>Origin</span>${escapeHtml(item.origin)}</p>`
                : '';
            const surprise = item.surprise
                ? `<p class="project-note project-surprise"><span>Surprise</span>${escapeHtml(item.surprise)}</p>`
                : '';
            const nextStep = item.nextStep
                ? `<p class="project-note project-next"><span>Next</span>${escapeHtml(item.nextStep)}</p>`
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
            const cycle = item.cycle ? `
                <dl class="project-cycle" aria-label="${escapeHtml(item.title)}の問い、実験、発見">
                    ${[
                        ['問い', item.cycle.question],
                        ['実験', item.cycle.experiment],
                        ['発見', item.cycle.finding]
                    ].filter(([, value]) => value).map(([label, value]) => `
                        <div>
                            <dt>${escapeHtml(label)}</dt>
                            <dd>${escapeHtml(value)}</dd>
                        </div>
                    `).join('')}
                </dl>
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
                        ${origin}
                        ${surprise}
                        ${nextStep}
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

    function renderContent() {
        const content = window.HAZAKURA_CONTENT;
        if (!content) return;
        renderPhilosophy(content.philosophy);
        renderExperienceLayers(content.experienceLayers);
        renderStats(content.stats);
        renderProcess(content.process);
        renderResearchGroup(content.researchGroup);
        renderVisions(content.visionsGroup || content.visions);
        renderProjects(content.projectsGroup);
        renderQuotePrelude(content.quotePrelude);
        refreshHoverTargets();
    }

    window.HazakuraPointerInput?.init({
        getDisabled: () => prefersReducedMotion,
        onMove(event) {
            cursorFollow?.setPosition(event.clientX, event.clientY);
            sakuraEngine?.setPointer(event.clientX, event.clientY, event.movementX || 0);

            cardHoverFields?.update(event);
            bookTilt?.update(event);
        }
    });

    // ===== 5-zone scroll theme: Day → Dusk → Night → Moon → Aurora =====
    let currentZone = 1;

    const zoneNameToIndex = { day: 1, dusk: 2, night: 3, moon: 4, aurora: 5 };
    const zoneIndexToName = ['', 'day', 'dusk', 'night', 'moon', 'aurora'];

    const zoneNav = window.HazakuraZoneNav?.create({
        zones: zoneIndexToName,
        onSelect(targetZone) {
            const zoneName = zoneIndexToName[targetZone];
            const target = document.querySelector(`section[data-zone="${zoneName}"]`);
            if (!target) return;
            const offset = 72;
            const y = target.getBoundingClientRect().top + window.scrollY - offset;
            setActiveZone(targetZone, true);
            updateBackgroundZones(targetZone, 0);
            updateSectionZones(targetZone);
            updateAtmosphereBlend(targetZone);
            window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
    });

    const zoneAtmosphere = window.HazakuraZoneAtmosphere?.create(zoneIndexToName);
    updateZoneIndicator();

    function setAtmosphereOpacity(zoneName, value) {
        if (!zoneAtmosphere) return;
        zoneAtmosphere.setOpacity(zoneName, value);
    }

    function updateAtmosphereBlend(zone) {
        if (!zoneAtmosphere) return;
        const activeName = zoneIndexToName[zone];
        const sections = Array.from(document.querySelectorAll('section[data-zone]'));
        const activeSection = sections.find((section) => section.dataset.zone === activeName);
        const weights = { day: 0, dusk: 0, night: 0, moon: 0, aurora: 0 };
        weights[activeName] = 1;

        if (activeSection) {
            const rect = activeSection.getBoundingClientRect();
            const probeY = window.innerHeight * 0.42;
            const softness = Math.min(420, Math.max(220, window.innerHeight * 0.28));
            const activeIndex = sections.indexOf(activeSection);
            const previous = sections[activeIndex - 1];
            const next = sections[activeIndex + 1];
            const previousBlend = previous
                ? Math.max(0, Math.min(1, (softness - (probeY - rect.top)) / softness))
                : 0;
            const nextBlend = next
                ? Math.max(0, Math.min(1, (softness - (rect.bottom - probeY)) / softness))
                : 0;

            if (previousBlend > 0) {
                weights[previous.dataset.zone] = previousBlend;
                weights[activeName] = Math.max(weights[activeName] - previousBlend * 0.35, 0.45);
            }
            if (nextBlend > 0) {
                weights[next.dataset.zone] = Math.max(weights[next.dataset.zone], nextBlend);
                weights[activeName] = Math.max(weights[activeName] - nextBlend * 0.35, 0.45);
            }
        }

        const zoneCaps = { day: 0.08, dusk: 0.16, night: 0.2, moon: 0.18, aurora: 0.22 };
        Object.keys(weights).forEach((zoneName) => {
            setAtmosphereOpacity(zoneName, weights[zoneName] * zoneCaps[zoneName]);
        });
    }

    function createHeroAuroraOverlay() {
        window.HazakuraHeroAuroraOverlay?.create();
    }

    function updateZoneIndicator() {
        zoneNav?.setActive(currentZone);
    }

    function updateZoneBorders(progress) {
        const duskNightBorder = document.querySelector('.zone-border--dusk-night');
        const nightMoonBorder = document.querySelector('.zone-border--night-moon');

        const duskNightProgress = Math.abs(progress * 5 - 3);
        const duskNightOpacity = Math.max(0, 0.6 - duskNightProgress * 0.3);
        if (duskNightBorder) {
            duskNightBorder.style.opacity = duskNightOpacity;
            const posOffset = Math.min(progress * 1000, window.innerHeight);
            duskNightBorder.style.setProperty('--zone-border-offset', posOffset + 'px');
        }

        const nightMoonProgress = Math.abs(progress * 5 - 4);
        const nightMoonOpacity = Math.max(0, 0.5 - nightMoonProgress * 0.25);
        if (nightMoonBorder) {
            nightMoonBorder.style.opacity = nightMoonOpacity;
            const posOffset = Math.min(progress * 1200, window.innerHeight);
            nightMoonBorder.style.setProperty('--zone-border-offset', posOffset + 'px');
        }
    }

    // ===== Particle layer management =====
    const defaultBlobColors = [
        'radial-gradient(circle, var(--sakura-500), transparent 70%)',
        'radial-gradient(circle, var(--purple-400), transparent 70%)',
        'radial-gradient(circle, var(--green-400), transparent 70%)',
        'radial-gradient(circle, var(--sakura-300), transparent 70%)'
    ];

    function updateScrollZones() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
        const zone = getActiveZoneFromSections();
        const zoneProgress = getZoneProgress(zone);

        setActiveZone(zone);

        // Cursor color
        const cursorRing = document.getElementById('cursor-ring');
        if (cursorRing) {
            const colors = [
                '',
                'rgba(255,255,255,0.5)',
                'rgba(232,168,124,0.6)',
                'rgba(133,129,231,0.6)',
                'rgba(167,139,250,0.6)',
                'rgba(52,211,153,0.6)'
            ];
            cursorRing.style.borderColor = colors[zone] || colors[1];
        }

        // Hero content reappears at night
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            if (zone >= 3) {
                heroContent.style.opacity = 1;
            } else {
                heroContent.style.opacity = Math.max(0, 1 - scrollTop / (window.innerHeight * 0.7));
            }
        }

        // Particle layer evolution
        sakuraEngine?.updateParticleEvolution(zone);

        // Aurora canvas visibility
        if (zone === 4) {
            auroraEngine?.setOpacity('0.15');
        } else if (zone === 5) {
            auroraEngine?.setOpacity('0.5');
        } else if (zone === 3) {
            auroraEngine?.setOpacity('0.3');
        } else {
            auroraEngine?.setOpacity('0');
        }

        // Shooting stars at moon zone
        if (zone === 4) shootingStars?.ensure(canvas.width, canvas.height);
        else shootingStars?.deactivate();

        // Background gradient transitions
        updateBackgroundZones(zone, zoneProgress);

        // Section background per zone
        updateSectionZones(zone);

        // Crossfade the atmosphere near section boundaries.
        updateAtmosphereBlend(zone);

        // Zone borders
        updateZoneBorders(progress);
    }

    function getActiveZoneFromSections() {
        const sections = Array.from(document.querySelectorAll('section[data-zone]'));
        if (sections.length === 0) return currentZone;
        const probeY = window.innerHeight * 0.42;
        let active = sections[0];
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= probeY) active = section;
            else break;
        }
        return zoneNameToIndex[active.dataset.zone] || 1;
    }

    function setActiveZone(zone, force = false) {
        if (!force && zone === currentZone) return;
        currentZone = zone;
        const bodyEl = document.body;
        bodyEl.classList.remove('zone-dusk', 'zone-night', 'zone-moon', 'zone-aurora', 'theme-night');
        switch (zone) {
            case 2: bodyEl.classList.add('zone-dusk'); break;
            case 3: bodyEl.classList.add('theme-night', 'zone-night'); break;
            case 4: bodyEl.classList.add('theme-night', 'zone-moon'); break;
            case 5: bodyEl.classList.add('theme-night', 'zone-aurora'); break;
        }
        updateZoneIndicator();
    }

    function getZoneProgress(zone) {
        const zoneName = zoneIndexToName[zone];
        const section = document.querySelector(`section[data-zone="${zoneName}"]`);
        if (!section) return 0;
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, rect.height + window.innerHeight);
        return Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
    }

    // ===== Dynamic background changes per zone =====
    function updateBackgroundZones(zone, zoneProgress) {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const heroMesh = hero.querySelector('.hero-mesh');
        if (heroMesh) {
            switch(zone) {
                case 1:
                    heroMesh.style.filter = '';
                    revertBlobColors();
                    break;
                case 2:
                    heroMesh.style.filter = 'saturate(1.3) brightness(0.85)';
                    setDuskBlobs();
                    break;
                case 3:
                    heroMesh.style.filter = 'saturate(0.5) brightness(0.5)';
                    break;
                case 4:
                    heroMesh.style.filter = 'saturate(0.3) brightness(0.4) hue-rotate(60deg)';
                    break;
                case 5:
                    heroMesh.style.filter = 'saturate(1.2) brightness(0.6) hue-rotate(120deg)';
                    break;
            }
        }

        // Hero overlay
        const heroOverlay = hero.querySelector('.hero-overlay');
        if (heroOverlay) {
            switch(zone) {
                case 1:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(26,26,46,0.1) 0%, rgba(26,26,46,0.2) 40%, rgba(254,252,250,0.3) 70%, var(--warm-50) 100%)';
                    break;
                case 2:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(120,40,20,0.2) 0%, rgba(232,100,50,0.15) 35%, rgba(240,180,100,0.2) 60%, var(--warm-50) 100%)';
                    break;
                case 3:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(10,10,30,0.8) 0%, rgba(26,26,46,0.6) 40%, rgba(10,10,30,0.3) 70%, #0b0c10 100%)';
                    break;
                case 4:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(30,20,60,0.7) 0%, rgba(50,30,80,0.5) 40%, rgba(20,15,50,0.3) 70%, #141028 100%)';
                    break;
                case 5:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(10,40,30,0.6) 0%, rgba(20,60,50,0.4) 40%, rgba(30,50,80,0.3) 70%, #0b1a1a 100%)';
                    break;
            }
        }
    }

    function revertBlobColors() {
        const heroMesh = document.querySelector('.hero-mesh');
        if (!heroMesh) return;
        const blobs = heroMesh.querySelectorAll('.mesh-blob');
        blobs.forEach((blob, i) => {
            blob.style.background = defaultBlobColors[i] || '';
        });
    }

    function setDuskBlobs() {
        const heroMesh = document.querySelector('.hero-mesh');
        if (!heroMesh) return;
        const blobs = heroMesh.querySelectorAll('.mesh-blob');
        if (blobs[0]) blobs[0].style.background = 'radial-gradient(circle, #e8583a, transparent 70%)';
        if (blobs[1]) blobs[1].style.background = 'radial-gradient(circle, #f7a87c, transparent 70%)';
        if (blobs[2]) blobs[2].style.background = 'radial-gradient(circle, #d44a5a, transparent 70%)';
        if (blobs[3]) blobs[3].style.background = 'radial-gradient(circle, #e8a87c, transparent 70%)';
    }

    function updateSectionZones(zone) {
        const philosophy = document.querySelector('.section-philosophy');
        if (philosophy) {
            switch(zone) {
                case 2: philosophy.style.background = 'linear-gradient(180deg, var(--warm-50) 0%, #fdf2e0 40%, #fce8d0 60%, var(--warm-50) 100%)'; break;
                default: philosophy.style.background = ''; break;
            }
        }
        const library = document.querySelector('.section-library');
        if (library) {
            switch(zone) {
                case 2:
                    library.style.background = 'linear-gradient(180deg, var(--warm-50) 0%, #fdf0dd 40%, #fce2cc 60%, var(--warm-50) 100%)';
                    break;
                default:
                    library.style.background = '';
                    break;
            }
        }
    }

    // ===== Initialization =====
    function init() {
        renderContent();
        motionPreferences?.syncBodyClass();
        window.HazakuraCanvasSize?.resize(canvas);
        sakuraEngine?.initPetals();
        auroraEngine?.mount();
        auroraEngine?.resize();
        auroraEngine?.initWaves();
        createHeroAuroraOverlay();
        if (!prefersReducedMotion) {
            sakuraEngine?.start();
            auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
            cursorFollow?.start();
        }
        window.HazakuraTextReveal?.prepare();
        const scrollAnimations = window.HazakuraScrollAnimations?.init({
            getPrefersReducedMotion: () => prefersReducedMotion
        });
        window.HazakuraSmoothScroll?.init({
            getPrefersReducedMotion: () => prefersReducedMotion
        });
        const scrollIndicators = window.HazakuraScrollIndicators?.create();
        const heroParallax = window.HazakuraHeroParallax?.create();
        scrollIndicators?.update();
        if (!prefersReducedMotion) heroParallax?.update();
        updateScrollZones();
        window.HazakuraCursorHover?.init();

        window.HazakuraScrollTicker?.init({
            onTick() {
                scrollIndicators?.update();
                if (!prefersReducedMotion) heroParallax?.update();
                updateScrollZones();
            }
        });

        window.HazakuraResizeListener?.init({
            onResize() {
                window.HazakuraCanvasSize?.resize(canvas);
                auroraEngine?.resize();
                sakuraEngine?.initPetals();
                auroraEngine?.initWaves();
                if (shootingStars?.hasStars()) shootingStars.init(canvas.width, canvas.height);
                if (!prefersReducedMotion) heroParallax?.update();
                scrollIndicators?.update();
                updateScrollZones();
            }
        });

        window.HazakuraVisibilityPlayback?.init({
            onHidden() {
                sakuraEngine?.stop();
                auroraEngine?.stop();
            },
            onVisible() {
                if (prefersReducedMotion) return;
                sakuraEngine?.start();
                auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
            }
        });

        motionPreferences?.onChange((event) => {
            prefersReducedMotion = event.matches;
            motionPreferences.syncBodyClass();
            if (prefersReducedMotion) {
                sakuraEngine?.stop();
                auroraEngine?.stop();
                cursorFollow?.stop();
                sakuraEngine?.clear();
                auroraEngine?.clear();
                scrollAnimations?.setAllCounters();
            } else {
                sakuraEngine?.start();
                auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
                cursorFollow?.start();
            }
        });

        window.HazakuraHeroImageLoader?.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
