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

  window.HazakuraDom = {
    escapeHtml,
    formatExternalDestination
  };
})();
