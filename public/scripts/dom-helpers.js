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

  window.HazakuraDom = {
    escapeHtml,
    formatExternalDestination,
    toCssToken
  };
})();
