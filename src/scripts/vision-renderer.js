(function () {
    'use strict';

    const { escapeHtml, renderDrawerSummary, toCssToken } = window.HazakuraDom;

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

    function getVisionEntryCardId(kind, index) {
        return kind ? `vision-entry-${kind}-${index + 1}` : '';
    }

    function renderVisionSigil(item) {
        const sigil = toCssToken(item.sigil, 'seed');
        const mark = item.mark || item.title?.slice(0, 1) || '種';
        return `
            <span class="vision-sigil vision-sigil--${escapeHtml(sigil)}" data-vision-sigil="${escapeHtml(sigil)}" aria-hidden="true">
                <span class="vision-sigil__mark">${escapeHtml(mark)}</span>
            </span>
        `;
    }

    function renderVisionEntryFields(fields) {
        if (!Array.isArray(fields) || !fields.length) return '';
        return `
            <details class="garden-drawer vision-entry-guide__field-drawer">
                ${renderDrawerSummary({
                    className: 'vision-entry-guide__field-drawer',
                    label: '受付メモ',
                    hint: '入口で聞くこと',
                    note: `${fields.length}つ`,
                    sigil: 'i'
                })}
                <ul class="garden-drawer__body vision-entry-guide__fields" aria-label="受付メモ">
                    ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}
                </ul>
            </details>
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

    function renderVisionEntryGuide(guide, visionItems) {
        const kinds = Array.isArray(guide.kinds) ? guide.kinds : [];
        const kindCounts = Array.isArray(visionItems)
            ? visionItems.reduce((counts, item) => {
                const kind = item.entry && item.entry.kind;
                if (kind) counts[kind] = (counts[kind] || 0) + 1;
                return counts;
            }, {})
            : {};
        const kindCardIds = Array.isArray(visionItems)
            ? visionItems.reduce((ids, item, index) => {
                const kind = getVisionEntryKind(item);
                if (!kind) return ids;
                ids[kind] = ids[kind] || [];
                ids[kind].push(getVisionEntryCardId(kind, index));
                return ids;
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
                        ${kinds.map((item) => {
                            const kind = item.kind || 'seed';
                            const controlledIds = (kindCardIds[kind] || []).join(' ');
                            const controlsAttribute = controlledIds
                                ? ` data-entry-card-targets="${escapeHtml(controlledIds)}" aria-controls="${escapeHtml(controlledIds)}"`
                                : '';
                            return `
                            <div class="vision-entry-guide__kind" data-entry-kind="${escapeHtml(kind)}"${controlsAttribute}>
                                <span>${escapeHtml(item.label || item.kind || '種')}</span>
                                <p>${escapeHtml(item.text || '')}</p>
                                <small>
                                    <span>${escapeHtml(String(kindCounts[item.kind] || 0))}件の入口</span>
                                    ${item.target ? `<span>${escapeHtml(item.target)}へ接続</span>` : ''}
                                </small>
                                ${item.flow ? `<span class="vision-entry-guide__flow">${escapeHtml(item.flow)}</span>` : ''}
                                ${renderVisionEntryFields(item.fields)}
                            </div>
                        `;
                        }).join('')}
                    </div>
                ` : ''}
            </article>
        `;
    }

    function render(visionsGroup) {
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
        const cards = items.map((item, index) => {
            const entryKind = getVisionEntryKind(item);
            const entryKindAttribute = entryKind ? ` data-entry-kind="${escapeHtml(entryKind)}"` : '';
            const entryCardId = getVisionEntryCardId(entryKind, index);
            const entryCardIdAttribute = entryCardId ? ` id="${escapeHtml(entryCardId)}"` : '';
            const entryKindBadge = entryKind ? renderVisionEntryKindBadge(entryKind, entryKinds[entryKind]) : '';
            return `
            <article class="vision-card"${entryKindAttribute}${entryCardIdAttribute} data-reveal data-reveal-stagger data-tilt>
                ${renderVisionSigil(item)}
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

    window.HazakuraVisionRenderer = { render };
})();
