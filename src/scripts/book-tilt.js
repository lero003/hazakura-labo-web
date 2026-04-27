(function () {
    'use strict';

    function create(options = {}) {
        const {
            bookSelector = '#book-3d',
            glareSelector = '.book-glare',
            hoverPadding = 50
        } = options;

        const book = document.querySelector(bookSelector);
        const glare = document.querySelector(glareSelector);

        function reset() {
            if (book) book.style.transform = 'rotateY(-20deg) rotateX(5deg)';
            if (glare) glare.style.transform = 'translateX(-150%)';
        }

        function update(event) {
            if (!book) return;

            const rect = book.getBoundingClientRect();
            const isNear =
                event.clientX >= rect.left - hoverPadding &&
                event.clientX <= rect.right + hoverPadding &&
                event.clientY >= rect.top - hoverPadding &&
                event.clientY <= rect.bottom + hoverPadding;

            if (!isNear) {
                reset();
                return;
            }

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rx = ((y - cy) / cy) * -12;
            const ry = ((x - cx) / cx) * 12;
            book.style.transform = `rotateY(${ry - 10}deg) rotateX(${rx}deg) scale(1.05)`;
            if (glare) glare.style.transform = `translateX(${(x / rect.width) * 120 - 100}%)`;
        }

        return { update, reset };
    }

    window.HazakuraBookTilt = { create };
})();
