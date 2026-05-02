export const scriptLoadGroups = [
  {
    name: 'content-data',
    description: 'Static content and shared DOM string helpers.',
    scripts: [
      '/content.js',
      '/dom-helpers.js'
    ]
  },
  {
    name: 'content-renderers',
    description: 'Section renderers that must exist before the content orchestrator runs.',
    scripts: [
      '/section-foundation-renderer.js',
      '/process-flow-renderer.js',
      '/project-filter.js',
      '/project-renderer.js',
      '/quote-prelude.js',
      '/vision-renderer.js',
      '/research-renderer.js',
      '/content-renderers.js'
    ]
  },
  {
    name: 'navigation-scroll',
    description: 'Zone navigation, measured anchor offsets, and scroll-linked page state.',
    scripts: [
      '/zone-nav.js',
      '/zone-atmosphere.js',
      '/scroll-offset.js',
      '/scroll-target.js',
      '/interaction-environment.js',
      '/zone-performance.js',
      '/vision-entry-focus.js',
      '/hero-aurora-overlay.js',
      '/hero-image-loader.js',
      '/motion-preferences.js',
      '/smooth-scroll.js',
      '/scroll-indicators.js',
      '/text-reveal.js',
      '/hero-parallax.js',
      '/scroll-animations.js'
    ]
  },
  {
    name: 'interaction-foundation',
    description: 'Shared viewport, input, hover, lifecycle, and frame utilities.',
    scripts: [
      '/canvas-size.js',
      '/visibility-playback.js',
      '/resize-listener.js',
      '/animation-frames.js',
      '/canvas-clear.js',
      '/cursor-hover.js',
      '/card-hover-fields.js',
      '/book-tilt.js',
      '/pointer-input.js',
      '/scroll-ticker.js',
      '/effects-lifecycle.js'
    ]
  },
  {
    name: 'garden-effects',
    description: 'Canvas and cursor engines started by the app controller.',
    scripts: [
      '/aurora-canvas.js',
      '/shooting-stars.js',
      '/cursor-follow.js',
      '/sakura-petals.js'
    ]
  },
  {
    name: 'bootstrap',
    description: 'Final controller; depends on every earlier island global.',
    scripts: [
      '/app-controller.js'
    ]
  }
];

export const scriptLoadOrder = scriptLoadGroups.flatMap((group) => group.scripts);
