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

  window.HazakuraDom = {
    escapeHtml,
    formatExternalDestination,
    renderDrawerSummary
  };
})();
