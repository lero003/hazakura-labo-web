(function () {
    'use strict';

    function create(options = {}) {
        const { onRendered } = options;

        function renderResearchGroup(researchGroup) {
            window.HazakuraResearchRenderer?.render(researchGroup);
        }

        function renderVisions(visionsGroup) {
            window.HazakuraVisionRenderer?.render(visionsGroup);
        }

        function renderQuotePrelude(item) {
            window.HazakuraQuotePrelude?.render(item);
        }

        function renderProjects(projectsGroup) {
            window.HazakuraProjectRenderer?.render(projectsGroup);
        }

        function render(content) {
            if (!content) return;
            window.HazakuraSectionFoundationRenderer?.render(content);
            renderResearchGroup(content.researchGroup);
            renderVisions(content.visionsGroup || content.visions);
            renderProjects(content.projectsGroup);
            renderQuotePrelude(content.quotePrelude);
            onRendered?.();
        }

        return { render };
    }

    window.HazakuraContentRenderers = { create };
})();
