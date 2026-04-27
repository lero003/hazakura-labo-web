(function () {
  'use strict';

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value ?? '';
    return div.innerHTML;
  }

  function render(item) {
    const root = document.querySelector('[data-render="quotePrelude"]');
    if (!root || !item) return;

    const steps = Array.isArray(item.steps) && item.steps.length
      ? `<ol class="quote-prelude-steps">
          ${item.steps.map((step) => `
            <li>
              ${step.href ? `<a class="quote-prelude-step" href="${escapeHtml(step.href)}">` : '<span class="quote-prelude-step">'}
                <span>${escapeHtml(step.label || '')}</span>
                ${escapeHtml(step.text || '')}
              ${step.href ? '</a>' : '</span>'}
            </li>
          `).join('')}
        </ol>`
      : '';

    root.innerHTML = `
      <article class="quote-prelude-card" data-tilt>
        <p class="quote-prelude-eyebrow">${escapeHtml(item.eyebrow || 'Circulation note')}</p>
        <h3 class="quote-prelude-title">${escapeHtml(item.title || '')}</h3>
        <p class="quote-prelude-text">${escapeHtml(item.text || '')}</p>
        ${steps}
      </article>
    `;
  }

  window.HazakuraQuotePrelude = { render };
})();
