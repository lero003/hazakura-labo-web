(function () {
    'use strict';

    const { escapeHtml, formatExternalDestination, renderDrawerSummary } = window.HazakuraDom;

    function renderResearchLogHandoff(handoff, items) {
        if (!handoff) return '';
        const steps = Array.isArray(handoff.steps) ? handoff.steps : [];
        const count = Array.isArray(items) ? items.length : 0;
        return `
            <article class="research-log-handoff" data-reveal data-tilt>
                <div class="research-log-handoff__copy">
                    <p class="research-log-handoff__eyebrow">${escapeHtml(handoff.eyebrow || 'Return path')}</p>
                    <h3>${escapeHtml(handoff.title || '')}</h3>
                    <p>${escapeHtml(handoff.text || '')}</p>
                </div>
                ${steps.length ? `
                    <ol class="research-log-handoff__steps garden-handoff-steps" aria-label="入口を研究ログへ戻す流れ">
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

    function renderWisdomTrail(item) {
        if (!Array.isArray(item.wisdomTrail) || !item.wisdomTrail.length) return '';
        return `<dl class="research-wisdom-trail" aria-label="${escapeHtml(item.title)}の知恵断片">
            ${item.wisdomTrail.map((trail) => `
                <div>
                    <dt>${escapeHtml(trail.label || '')}</dt>
                    <dd>${escapeHtml(trail.text || '')}</dd>
                </div>
            `).join('')}
        </dl>`;
    }

    function renderSourceProject(item) {
        if (!item.sourceProject) return '';
        return `<p class="research-source">
            <span>${escapeHtml(item.sourceProject.label || 'Source')}</span>
            <strong>${escapeHtml(item.sourceProject.title || '')}</strong>
            ${escapeHtml(item.sourceProject.text || '')}
        </p>`;
    }

    function renderPaperSource(source) {
        if (!source) return '';
        const destination = source.destination || formatExternalDestination(source.url);
        return `
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
        `;
    }

    function renderPaperSample(item) {
        if (!item.paperSample) return '';
        return `<div class="research-paper-sample" aria-label="${escapeHtml(item.paperSample.title || '論文メモサンプル')}">
            <div class="research-paper-sample__copy">
                <span>${escapeHtml(item.paperSample.eyebrow || 'Paper memo')}</span>
                <strong>${escapeHtml(item.paperSample.title || '')}</strong>
                <p>${escapeHtml(item.paperSample.text || '')}</p>
                ${renderPaperSource(item.paperSample.source)}
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
    }

    function renderResearchAddons(item) {
        const addons = [
            renderWisdomTrail(item),
            renderSourceProject(item),
            renderPaperSample(item)
        ].filter(Boolean);

        if (!addons.length) return '';
        return `
            <details class="garden-drawer research-extra-drawer">
                ${renderDrawerSummary({
                    className: 'research-extra-drawer',
                    label: '由来・断片・論文メモ'
                })}
                <div class="research-extra-drawer__body">
                    ${addons.join('')}
                </div>
            </details>
        `;
    }

    function renderResearchLogCard(item) {
        const cardId = item.id ? ` id="${escapeHtml(item.id)}"` : '';
        return `
            <article class="research-log-card"${cardId} data-reveal data-reveal-stagger data-tilt>
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
                ${renderResearchAddons(item)}
            </article>
        `;
    }

    function renderResearchLogs(researchGroup) {
        const root = document.querySelector('[data-render="researchLogs"]');
        if (!root || !researchGroup) return;
        const items = Array.isArray(researchGroup) ? researchGroup : researchGroup.logs;
        if (!items) return;
        const handoff = Array.isArray(researchGroup) ? '' : renderResearchLogHandoff(researchGroup.handoff, items);
        const cards = items.map((item) => renderResearchLogCard(item)).join('');
        root.innerHTML = `
            <h2 class="visually-hidden" id="research-log-strip-title">Research Log</h2>
            ${handoff}
            ${cards}
        `;
    }

    function renderCycleBridge(item) {
        const root = document.querySelector('[data-render="cycleBridge"]');
        if (!root || !item) return;
        root.innerHTML = `
            <article class="cycle-bridge-card" data-reveal data-tilt>
                <p class="cycle-bridge-eyebrow">${escapeHtml(item.eyebrow)}</p>
                <h3 class="cycle-bridge-title">${escapeHtml(item.title)}</h3>
                <p class="cycle-bridge-text">${escapeHtml(item.text)}</p>
            </article>
        `;
    }

    function render(researchGroup) {
        if (!researchGroup) return;
        renderResearchLogs(researchGroup);
        renderCycleBridge(researchGroup.cycleBridge);
    }

    window.HazakuraResearchRenderer = { render };
})();
