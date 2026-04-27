(function () {
    'use strict';

    function prepare(options = {}) {
        const {
            selector = '.section-title, .title-accent-line',
            delayStep = 0.05
        } = options;

        document.querySelectorAll(selector).forEach((title) => {
            const text = title.textContent.trim();
            title.textContent = '';

            const wrapper = document.createElement('span');
            wrapper.className = 'reveal-text';

            for (let index = 0; index < text.length; index++) {
                const char = text[index];
                const span = document.createElement('span');
                span.className = 'reveal-item';
                if (char === ' ') span.innerHTML = '&nbsp;';
                else span.textContent = char;
                span.style.transitionDelay = `${index * delayStep}s`;
                wrapper.appendChild(span);
            }

            title.appendChild(wrapper);
        });
    }

    window.HazakuraTextReveal = { prepare };
})();
