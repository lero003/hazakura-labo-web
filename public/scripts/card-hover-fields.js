(function () {
    'use strict';

    const defaultSelector = '[data-tilt]';

    function create(options = {}) {
        const {
            selector = defaultSelector
        } = options;

        let targets = [];

        function refresh() {
            targets = Array.from(document.querySelectorAll(selector));
        }

        function update(event) {
            const element = document.elementFromPoint(event.clientX, event.clientY);
            const hoverCard = element?.closest(selector);

            for (const card of targets) {
                if (card === hoverCard) {
                    const rect = card.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
                    const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);
                    card.style.setProperty('--mouse-x', `${x}%`);
                    card.style.setProperty('--mouse-y', `${y}%`);
                } else {
                    card.style.removeProperty('--mouse-x');
                    card.style.removeProperty('--mouse-y');
                }
            }
        }

        refresh();

        return { refresh, update };
    }

    window.HazakuraCardHoverFields = { create };
})();
