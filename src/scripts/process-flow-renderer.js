(function () {
    'use strict';

    const { escapeHtml, toCssToken } = window.HazakuraDom;

    function render(items) {
        const root = document.querySelector('[data-render="process"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item, index) => {
            const sigil = toCssToken(item.sigil, 'question');
            const mark = item.mark || item.label;
            return `
            ${index > 0 ? '<div class="process-connector"></div>' : ''}
            <div class="process-step" style="--process-sigil-delay: ${(index * 0.15).toFixed(2)}s">
                <div class="process-sigil process-sigil--${escapeHtml(sigil)}" data-process-sigil="${escapeHtml(sigil)}" aria-hidden="true">
                    <span class="process-sigil__mark">${escapeHtml(mark)}</span>
                </div>
                <span class="process-label">${escapeHtml(item.label)}</span>
            </div>
        `;
        }).join('');
    }

    window.HazakuraProcessFlowRenderer = { render };
})();
