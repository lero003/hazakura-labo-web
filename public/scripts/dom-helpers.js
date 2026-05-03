(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function formatExternalDestination(url) {
    if (!url) return '';
    try {
      return new URL(url, window.location.href).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  function toCssToken(value, fallback = 'seed') {
    const token = String(value || fallback).toLowerCase().replace(/[^a-z0-9-]/g, '');
    return token || fallback;
  }

  function renderDrawerSummary(options = {}) {
    const {
      className,
      label,
      hint = '小径をひらく',
      sigil = '✧',
      note = ''
    } = options;
    const baseClass = escapeHtml(className || 'garden-drawer');
    const sigilMarkup = sigil
      ? `<span class="garden-drawer__sigil ${baseClass}__sigil" aria-hidden="true">${escapeHtml(sigil)}</span>`
      : '';
    const hintMarkup = hint
      ? `<span class="garden-drawer__hint ${baseClass}__hint">${escapeHtml(hint)}</span>`
      : '';
    const noteMarkup = note
      ? `<small class="garden-drawer__note ${baseClass}__note">${escapeHtml(note)}</small>`
      : '';

    return `
      <summary>
        ${sigilMarkup}
        <span class="garden-drawer__copy ${baseClass}__copy">
          <span class="garden-drawer__label ${baseClass}__label">${escapeHtml(label || '')}</span>
          ${hintMarkup}
        </span>
        ${noteMarkup}
      </summary>
    `;
  }

  function renderHandoffSteps(options = {}) {
    const {
      steps = [],
      className = '',
      ariaLabel = '巡りの流れ',
      itemStyle,
      renderStep
    } = options;
    if (!Array.isArray(steps) || !steps.length) return '';

    const classNames = [className, 'garden-handoff-steps'].filter(Boolean).map(escapeHtml).join(' ');
    return `
      <ol class="${classNames}" aria-label="${escapeHtml(ariaLabel)}">
        ${steps.map((step, index) => {
          const styleAttribute = typeof itemStyle === 'function' ? itemStyle(step, index) : '';
          const safeStyle = styleAttribute ? ` style="${escapeHtml(styleAttribute)}"` : '';
          const inner = typeof renderStep === 'function'
            ? renderStep(step, index)
            : `
              <span>${escapeHtml(step.label || '')}</span>
              <p>${escapeHtml(step.text || '')}</p>
            `;
          return `<li${safeStyle}>${inner}</li>`;
        }).join('')}
      </ol>
    `;
  }

  window.HazakuraDom = {
    escapeHtml,
    formatExternalDestination,
    toCssToken,
    renderDrawerSummary,
    renderHandoffSteps
  };
})();
