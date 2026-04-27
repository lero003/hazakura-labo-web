(function () {
    'use strict';

    function create(options = {}) {
        const {
            bookSelector = '.book-3d',
            glareSelector = '.book-glare',
            hoverPadding = 50
        } = options;

        const books = Array.from(document.querySelectorAll(bookSelector)).map((book) => ({
            book,
            glare: book.querySelector(glareSelector)
        }));

        function resetBook({ book, glare }) {
            if (book) book.style.transform = 'rotateY(-20deg) rotateX(5deg)';
            if (glare) glare.style.transform = 'translateX(-150%)';
        }

        function isNearBook(book, event) {
            const rect = book.getBoundingClientRect();
            return (
                event.clientX >= rect.left - hoverPadding &&
                event.clientX <= rect.right + hoverPadding &&
                event.clientY >= rect.top - hoverPadding &&
                event.clientY <= rect.bottom + hoverPadding
            );
        }

        function reset() {
            books.forEach(resetBook);
        }

        function update(event) {
            if (!books.length) return;

            const activeBook = books.find(({ book }) => isNearBook(book, event));
            books.forEach((book) => {
                if (book !== activeBook) resetBook(book);
            });

            if (!activeBook) {
                return;
            }

            const { book, glare } = activeBook;
            const rect = book.getBoundingClientRect();
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
