(function () {
    'use strict';

    class AuroraWave {
        constructor(index, total) {
            this.index = index;
            this.total = total;
        }

        update() {
            this.phase += this.speed;
        }

        draw(ctx, width, height, time) {
            const layerIndex = this.index;
            const baseY = height * 0.35 + (layerIndex / Math.max(this.total - 1, 1)) * height * 0.35;
            const timeFactor = Math.sin(time * 0.0007 + layerIndex * 1.5) * 0.5 + 0.5;

            const colors = [
                [52, 181, 153],
                [59, 213, 209],
                [56, 189, 248],
                [134, 239, 172],
                [167, 139, 250],
                [236, 72, 153]
            ];
            const colorIndex = layerIndex % colors.length;
            const nextColorIndex = (layerIndex + 1) % colors.length;
            const [r1, g1, b1] = colors[colorIndex];
            const [r2, g2, b2] = colors[nextColorIndex];
            const r = r1 + (r2 - r1) * timeFactor;
            const g = g1 + (g2 - g1) * timeFactor;
            const b = b1 + (b2 - b1) * timeFactor;
            const amplitude = this.amplitude * (0.7 + timeFactor * 0.3);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(-10, height);
            ctx.lineTo(-10, baseY);

            for (let x = -10; x <= width + 10; x += 4) {
                const waveY = baseY
                    + Math.sin(x * this.freq + this.phase) * amplitude
                    + Math.sin(x * this.freq2 + this.phase * 1.7) * amplitude * 0.4
                    + Math.cos(x * this.freq3 - this.phase * 0.5) * amplitude * 0.2;
                ctx.lineTo(x, waveY);
            }

            ctx.lineTo(width + 10, height);
            ctx.closePath();

            const bandHeight = this.bandHeight;
            const gradient = ctx.createLinearGradient(0, baseY - bandHeight, 0, baseY + bandHeight + 80);
            const alpha = this.baseAlpha * (0.4 + timeFactor * 0.6);
            gradient.addColorStop(0, `rgba(${r|0},${g|0},${b|0},0)`);
            gradient.addColorStop(0.15, `rgba(${r|0},${g|0},${b|0},${alpha * 0.3})`);
            gradient.addColorStop(0.4, `rgba(${r|0},${g|0},${b|0},${alpha})`);
            gradient.addColorStop(0.6, `rgba(${r|0},${g|0},${b|0},${alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(${r|0},${g|0},${b|0},0)`);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
        }
    }

    function create() {
        let canvas;
        let context;
        let frameId;
        let waves = [];

        function mount() {
            if (canvas) return canvas;
            canvas = document.createElement('canvas');
            canvas.id = 'aurora-canvas';
            canvas.style.cssText = 'position:fixed;inset:0;z-index:9995;pointer-events:none;opacity:0;transition:opacity 3s ease;';
            document.body.appendChild(canvas);
            context = canvas.getContext('2d');
            return canvas;
        }

        function resize() {
            if (!canvas) return;
            window.HazakuraCanvasSize?.resize(canvas);
        }

        function initWaves() {
            if (!canvas) return;
            waves = [];
            for (let index = 0; index < 10; index++) {
                const wave = new AuroraWave(index, 10);
                wave.freq = 0.0008 + Math.random() * 0.0015;
                wave.freq2 = 0.0015 + Math.random() * 0.002;
                wave.freq3 = 0.002 + Math.random() * 0.003;
                wave.amplitude = 30 + Math.random() * 80;
                wave.speed = 0.003 + Math.random() * 0.006;
                wave.phase = Math.random() * Math.PI * 2;
                wave.bandHeight = 25 + Math.random() * 40;
                wave.baseAlpha = 0.08 + Math.random() * 0.12;
                waves.push(wave);
            }
        }

        function clear() {
            window.HazakuraCanvasClear?.clear(context, canvas);
        }

        function stop() {
            window.HazakuraAnimationFrames?.cancelAll(frameId);
            frameId = undefined;
        }

        function start(options = {}) {
            const { getPrefersReducedMotion = () => false } = options;
            if (getPrefersReducedMotion()) return;
            if (!canvas || !context) return;

            stop();

            function animate() {
                if (getPrefersReducedMotion()) return;
                const time = Date.now();
                context.clearRect(0, 0, canvas.width, canvas.height);
                waves.forEach((wave) => {
                    wave.update(time);
                    wave.draw(context, canvas.width, canvas.height, time);
                });
                frameId = requestAnimationFrame(animate);
            }

            animate();
        }

        function setOpacity(value) {
            if (canvas) canvas.style.opacity = value;
        }

        return {
            clear,
            initWaves,
            mount,
            resize,
            setOpacity,
            start,
            stop
        };
    }

    window.HazakuraAuroraCanvas = { create };
})();
