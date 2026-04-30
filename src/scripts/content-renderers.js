(function () {
    'use strict';

    function create(options = {}) {
        const { onRendered } = options;

        function renderResearchGroup(researchGroup) {
            window.HazakuraResearchRenderer?.render(researchGroup);
        }

        function renderProcessFlow(items) {
            window.HazakuraProcessFlowRenderer?.render(items);
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
            renderProjects(content.projectsGroup);
            renderVisions(content.visionsGroup || content.visions);
            renderProcessFlow(content.process);
            renderResearchGroup(content.researchGroup);
            renderQuotePrelude(content.quotePrelude);
            onRendered?.();
        }

        return { render };
    }

    window.HazakuraContentRenderers = { create };
})();
