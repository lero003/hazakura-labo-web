(function () {
    'use strict';

    const { escapeHtml } = window.HazakuraDom;

    function renderPhilosophy(items) {
        const root = document.querySelector('[data-render="philosophy"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => `
            <article class="philosophy-card" data-reveal data-reveal-stagger data-tilt>
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
            <article class="layer-card" data-reveal data-reveal-stagger data-tilt style="--layer-index: ${index + 1}">
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

    function render(content) {
        if (!content) return;
        renderPhilosophy(content.philosophy);
        renderExperienceLayers(content.experienceLayers);
    }

    window.HazakuraSectionFoundationRenderer = { render };
})();
