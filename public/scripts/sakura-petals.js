(function () {
    'use strict';

    function create(options = {}) {
        const {
            canvas,
            getZone = () => 1,
            getPrefersReducedMotion = () => false,
            onMoonFrame = () => {}
        } = options;

        if (!canvas) return undefined;

        const context = canvas.getContext('2d');
        let petals = [];
        let frameId;
        let pointerX = 0;
        let pointerY = 0;
        let targetWindX = 0;
        let windX = 0;
        let startTime = Date.now();

        class Petal {
            constructor(layer) {
                this.layer = layer || (Math.random() < 0.4 ? 0 : (Math.random() < 0.65 ? 1 : 2));
                this.reset();
                this.y = Math.random() * canvas.height;
                this.isFirefly = false;
                this.fireflyGlow = 0;
                this.fireflyGlowDir = 1;
                this.fireflyHue = 60 + Math.random() * 30;
                this.fireflyPhase = Math.random() * Math.PI * 2;
                this.isMicro = false;
                this.microAlpha = 0;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -20 - Math.random() * 50;
                this.size = 3 + Math.random() * 5 + this.layer * 1.5;
                this.speedY = 0.3 + Math.random() * 0.6 + this.layer * 0.15;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.03;
                this.swing = 0.5 + Math.random() * 2;
                this.swingSpeed = 0.003 + Math.random() * 0.008;
                this.swingOffset = Math.random() * Math.PI * 2;
                this.opacity = 0.15 + Math.random() * 0.35 + this.layer * 0.08;
                this.depth = 0.5 + this.layer * 0.3;
                const hue = 340 + Math.random() * 30;
                const saturation = 50 + Math.random() * 40;
                const lightness = 75 + Math.random() * 20;
                this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`;
                this.hue = hue;
                this.sat = saturation;
                this.light = lightness;
                this.targetHue = hue;
                this.targetSat = saturation;
                this.targetLight = lightness;
                this.targetOpacity = this.opacity;
                this.targetSize = this.size;
            }

            update(time, zone) {
                if (this.isFirefly) {
                    this.fireflyGlow += this.fireflyGlowDir * 0.015;
                    if (this.fireflyGlow >= 1) this.fireflyGlowDir = -1;
                    if (this.fireflyGlow <= 0) this.fireflyGlowDir = 1;
                    this.x += Math.sin(time * 0.5 + this.fireflyPhase) * 0.3;
                    this.y -= 0.05 + Math.sin(time * 0.8 + this.fireflyPhase) * 0.1;
                    if (this.y < -30) this.y = canvas.height + 30;
                    if (this.y > canvas.height + 30) this.y = -30;
                    if (this.x < -30) this.x = canvas.width + 30;
                    if (this.x > canvas.width + 30) this.x = -30;
                    return;
                }

                if (this.isMicro) {
                    this.fireflyGlow += this.fireflyGlowDir * 0.02;
                    if (this.fireflyGlow >= 1) this.fireflyGlowDir = -1;
                    if (this.fireflyGlow <= 0) this.fireflyGlowDir = 1;
                    this.x += Math.sin(time * 0.3 + this.fireflyPhase) * 0.6;
                    this.y += Math.sin(time * 0.4 + time * 0.2) * 0.05;
                    if (this.x < -20) this.x = canvas.width + 20;
                    if (this.x > canvas.width + 20) this.x = -20;
                    return;
                }

                this.y += this.speedY;
                windX += (targetWindX - windX) * 0.02;
                this.x += this.speedX + windX * this.depth +
                    Math.sin(time * this.swingSpeed + this.swingOffset) * this.swing * 0.3;

                const dx = this.x - pointerX;
                const dy = this.y - pointerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0 && distance < 120) {
                    const force = (120 - distance) / 120;
                    this.x += (dx / distance) * force * 6;
                    this.y += (dy / distance) * force * 6;
                }

                this.rotation += this.rotationSpeed;
                this.applyZoneColors(zone);

                if (this.y > canvas.height + 30) this.reset();
                if (this.x < -30) this.x = canvas.width + 30;
                if (this.x > canvas.width + 30) this.x = -30;
            }

            applyZoneColors(zone) {
                let targetHue;
                let targetSaturation;
                let targetLightness;
                let targetOpacity;

                if (this.layer <= 1) {
                    switch (zone) {
                        case 1:
                            targetHue = 345;
                            targetSaturation = 65;
                            targetLightness = 85;
                            targetOpacity = this.opacity;
                            break;
                        case 2:
                            targetHue = 15;
                            targetSaturation = 70;
                            targetLightness = 70;
                            targetOpacity = this.opacity * 0.9;
                            break;
                        case 3:
                            targetHue = 210;
                            targetSaturation = 30;
                            targetLightness = 65;
                            targetOpacity = this.opacity * 0.6;
                            break;
                        case 4:
                            targetHue = 260;
                            targetSaturation = 20;
                            targetLightness = 60;
                            targetOpacity = this.opacity * 0.4;
                            break;
                        case 5:
                            targetHue = 345;
                            targetSaturation = 50;
                            targetLightness = 80;
                            targetOpacity = this.opacity;
                            break;
                        default:
                            targetHue = 350;
                            targetSaturation = 70;
                            targetLightness = 85;
                            targetOpacity = this.opacity;
                    }
                } else {
                    switch (zone) {
                        case 1:
                            targetHue = 340 + this.layer * 5;
                            targetSaturation = 55 + this.layer * 5;
                            targetLightness = 80 + this.layer * 5;
                            targetOpacity = this.opacity;
                            break;
                        case 2:
                            targetHue = -5 + this.layer * 15;
                            targetSaturation = 60 + this.layer * 10;
                            targetLightness = 55 + this.layer * 10;
                            targetOpacity = this.opacity * 0.85;
                            break;
                        case 3:
                            targetHue = 200;
                            targetSaturation = 40;
                            targetLightness = 75;
                            targetOpacity = this.opacity * 0.7;
                            break;
                        case 4:
                            targetHue = 270 + this.layer * 10;
                            targetSaturation = 25;
                            targetLightness = 70;
                            targetOpacity = this.opacity * 0.5;
                            break;
                        case 5:
                            targetHue = 160;
                            targetSaturation = 70;
                            targetLightness = 70;
                            targetOpacity = this.opacity * 0.9;
                            break;
                        default:
                            targetHue = 350;
                            targetSaturation = 70;
                            targetLightness = 85;
                            targetOpacity = this.opacity;
                    }
                }

                const lerp = 0.08;
                this.targetHue += (targetHue - this.targetHue) * lerp;
                this.targetSat += (targetSaturation - this.targetSat) * lerp;
                this.targetLight += (targetLightness - this.targetLight) * lerp;
                this.targetOpacity += (targetOpacity - this.targetOpacity) * lerp;

                this.color = `hsla(${this.targetHue|0}, ${this.targetSat|0}%, ${this.targetLight|0}%, ${this.targetOpacity})`;
            }

            draw() {
                if (this.isFirefly) {
                    context.save();
                    context.globalAlpha = this.fireflyGlow * this.opacity * 0.8;
                    const glowRadius = this.size * 3;
                    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
                    gradient.addColorStop(0, `hsla(${this.fireflyHue}, 100%, 85%, 1)`);
                    gradient.addColorStop(0.2, `hsla(${this.fireflyHue}, 100%, 70%, 0.6)`);
                    gradient.addColorStop(0.5, `hsla(${this.fireflyHue}, 100%, 60%, 0.2)`);
                    gradient.addColorStop(1, `hsla(${this.fireflyHue}, 100%, 60%, 0)`);
                    context.fillStyle = gradient;
                    context.beginPath();
                    context.arc(0, 0, glowRadius, 0, Math.PI * 2);
                    context.fill();
                    context.fillStyle = `hsla(${this.fireflyHue}, 100%, 95%, 1)`;
                    context.beginPath();
                    context.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
                    context.fill();
                    context.restore();
                    return;
                }

                if (this.isMicro) {
                    context.save();
                    context.globalAlpha = this.fireflyGlow * this.opacity * 0.4;
                    const radius = this.size * (1 + this.fireflyGlow * 0.5);
                    context.fillStyle = 'hsla(160, 80%, 75%, 0.6)';
                    context.beginPath();
                    context.arc(0, 0, radius, 0, Math.PI * 2);
                    context.fill();
                    context.restore();
                    return;
                }

                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.rotation);
                context.beginPath();
                context.fillStyle = this.color;
                const size = this.size;
                context.moveTo(0, 0);
                context.bezierCurveTo(size * 0.4, -size * 0.2, size * 0.7, -size * 0.6, size * 0.35, -size);
                context.bezierCurveTo(size * 0.15, -size * 0.75, -size * 0.15, -size * 0.75, -size * 0.35, -size);
                context.bezierCurveTo(-size * 0.7, -size * 0.6, -size * 0.4, -size * 0.2, 0, 0);
                context.fill();
                context.restore();
            }
        }

        function initPetals() {
            const count = Math.min(Math.floor(window.innerWidth / 50) + 8, 30);
            petals = [];
            for (let index = 0; index < count; index++) {
                let layer;
                const random = Math.random();
                if (random < 0.5) layer = 0;
                else if (random < 0.8) layer = 1;
                else layer = 2;
                petals.push(new Petal(layer));
            }
        }

        function clear() {
            window.HazakuraCanvasClear?.clear(context, canvas);
        }

        function stop() {
            window.HazakuraAnimationFrames?.cancelAll(frameId);
            frameId = undefined;
        }

        function start() {
            stop();
            if (getPrefersReducedMotion()) return;
            startTime = Date.now();

            function animate() {
                if (getPrefersReducedMotion()) return;
                const time = (Date.now() - startTime) / 1000;
                context.clearRect(0, 0, canvas.width, canvas.height);
                const zone = getZone();
                petals.forEach((petal) => {
                    petal.update(time, zone);
                    petal.draw();
                });
                if (zone === 4) {
                    onMoonFrame(context, canvas);
                }
                frameId = requestAnimationFrame(animate);
            }

            animate();
        }

        function setPointer(x, y, movementX = 0) {
            pointerX = x;
            pointerY = y;
            targetWindX = movementX * 0.15;
        }

        function updateParticleEvolution(zone) {
            petals.forEach((petal) => {
                const isDeep = petal.layer >= 2;

                if (zone >= 3 && !petal.isFirefly && Math.random() < 0.01) {
                    if (isDeep && Math.random() < 0.4) {
                        petal.isFirefly = true;
                    } else if (petal.layer === 1 && Math.random() < 0.15) {
                        petal.isFirefly = true;
                    }
                }

                if (zone === 5) {
                    petal.isFirefly = false;
                    if (isDeep && Math.random() < 0.03) {
                        petal.isMicro = true;
                        petal.y = Math.random() * canvas.height;
                        petal.x = Math.random() * canvas.width;
                    } else if (Math.random() < 0.01 && petal.isMicro) {
                        petal.isMicro = false;
                    }
                    petal.isFirefly = false;
                }

                if (zone === 1) {
                    petal.isFirefly = false;
                    petal.isMicro = false;
                }
            });
        }

        return {
            clear,
            initPetals,
            setPointer,
            start,
            stop,
            updateParticleEvolution
        };
    }

    window.HazakuraSakuraPetals = { create };
})();
