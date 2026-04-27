(function () {
    'use strict';

    class ShootingStar {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.width;
            this.y = Math.random() * this.height * 0.4;
            this.length = 60 + Math.random() * 100;
            this.speed = 5 + Math.random() * 7;
            this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
            this.opacity = 0;
            this.life = 0;
            this.maxLife = 25 + Math.random() * 25;
            this.active = false;
        }

        activate() {
            this.reset();
            this.active = true;
            this.life = 0;
        }

        update() {
            if (!this.active) return;
            this.life++;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            if (this.life < 6) this.opacity = this.life / 6;
            else if (this.life > this.maxLife - 6) this.opacity = (this.maxLife - this.life) / 6;
            else this.opacity = 1;
            if (this.life >= this.maxLife) this.active = false;
        }

        draw(context) {
            if (!this.active) return;
            context.save();
            context.globalAlpha = this.opacity;
            const tailX = this.x - Math.cos(this.angle) * this.length;
            const tailY = this.y - Math.sin(this.angle) * this.length;
            const gradient = context.createLinearGradient(tailX, tailY, this.x, this.y);
            gradient.addColorStop(0, 'rgba(255,255,255,0)');
            gradient.addColorStop(0.7, 'rgba(200,200,255,0.4)');
            gradient.addColorStop(1, 'rgba(255,255,255,0.9)');
            context.strokeStyle = gradient;
            context.lineWidth = 2;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(tailX, tailY);
            context.lineTo(this.x, this.y);
            context.stroke();

            context.globalAlpha = this.opacity * 0.6;
            context.fillStyle = 'rgba(255,255,255,0.8)';
            context.beginPath();
            context.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    }

    function create(options = {}) {
        const {
            count = 5,
            activationChance = 0.008
        } = options;

        let stars = [];

        function init(width = window.innerWidth, height = window.innerHeight) {
            stars = [];
            for (let index = 0; index < count; index++) {
                stars.push(new ShootingStar(width, height));
            }
        }

        function ensure(width, height) {
            if (!stars.length) init(width, height);
        }

        function deactivate() {
            stars.forEach((star) => {
                star.active = false;
            });
        }

        function hasStars() {
            return stars.length > 0;
        }

        function update(context) {
            if (!stars.length || !context) return;
            stars.forEach((star) => {
                if (!star.active && Math.random() < activationChance) {
                    star.activate();
                }
                star.update();
            });
            stars.forEach((star) => star.draw(context));
        }

        return { deactivate, ensure, hasStars, init, update };
    }

    window.HazakuraShootingStars = { create };
})();
