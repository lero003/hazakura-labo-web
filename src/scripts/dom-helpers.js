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

  function renderDrawerSummary(options = {}) {
    const {
      className,
      label,
      hint = '小径をひらく',
      sigil = '✧'
    } = options;
    const baseClass = escapeHtml(className || 'garden-drawer');

    return `
      <summary>
        <span class="${baseClass}__sigil" aria-hidden="true">${escapeHtml(sigil)}</span>
        <span class="${baseClass}__copy">
          <span class="${baseClass}__label">${escapeHtml(label || '')}</span>
          <span class="${baseClass}__hint">${escapeHtml(hint)}</span>
        </span>
      </summary>
    `;
  }

  window.HazakuraDom = {
    escapeHtml,
    formatExternalDestination,
    renderDrawerSummary
  };
})();
