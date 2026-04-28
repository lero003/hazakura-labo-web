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
        window.HazakuraVisionRenderer?.render(visionsGroup);
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
        window.HazakuraProjectRenderer?.render(projectsGroup);
    }

    function render(content) {
        if (!content) return;
        renderPhilosophy(content.philosophy);
        renderExperienceLayers(content.experienceLayers);
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
