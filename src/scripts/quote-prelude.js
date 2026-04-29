(function () {
  'use strict';

  const { escapeHtml } = window.HazakuraDom;

  function render(item) {
    const root = document.querySelector('[data-render="quotePrelude"]');
    if (!root || !item) return;

    const steps = Array.isArray(item.steps) && item.steps.length
      ? `<ol class="quote-prelude-steps">
          ${item.steps.map((step, index) => `
            <li style="--quote-prelude-step-delay: ${index + 1};">
              ${step.href ? `<a class="quote-prelude-step" href="${escapeHtml(step.href)}">` : '<span class="quote-prelude-step">'}
                <span class="quote-prelude-step__label">${escapeHtml(step.label || '')}</span>
                <span class="quote-prelude-step__text">${escapeHtml(step.text || '')}</span>
              ${step.href ? '</a>' : '</span>'}
            </li>
          `).join('')}
        </ol>`
      : '';

    root.innerHTML = `
      <article class="quote-prelude-card" data-reveal data-tilt>
        <p class="quote-prelude-eyebrow">${escapeHtml(item.eyebrow || 'Circulation note')}</p>
        <h3 class="quote-prelude-title">${escapeHtml(item.title || '')}</h3>
        <p class="quote-prelude-text">${escapeHtml(item.text || '')}</p>
        ${steps}
      </article>
    `;
  }

  window.HazakuraQuotePrelude = { render };
})();
