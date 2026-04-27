// ============================================================
// 叶桜ラボ — Script
// Sakura petals, mouse avoid, scroll, 5 layered zone performance
// ============================================================

(function () {
    'use strict';

    const reducedMotionQuery = window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : { matches: false, addEventListener() {} };
    let prefersReducedMotion = reducedMotionQuery.matches;

    // ===== Sakura/Firefly Canvas =====
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let petals = [];
    let animationId;
    let mouseX = 0, mouseY = 0;
    let targetWindX = 0;
    let windX = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Petal {
        constructor(layer) {
            this.layer = layer || (Math.random() < 0.4 ? 0 : (Math.random() < 0.65 ? 1 : 2));
            this.reset();
            this.y = Math.random() * canvas.height;
            // Firefly morph
            this.isFirefly = false;
            this.fireflyGlow = 0;
            this.fireflyGlowDir = 1;
            this.fireflyHue = 60 + Math.random() * 30;
            this.fireflyPhase = Math.random() * Math.PI * 2;
            // Aurora micro-particle
            this.isMicro = false;
            this.microAlpha = 0;
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20 - Math.random() * 50;
            this.size = 4 + Math.random() * 8 + this.layer * 2;
            this.speedY = 0.3 + Math.random() * 0.6 + this.layer * 0.15;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.swing = 0.5 + Math.random() * 2;
            this.swingSpeed = 0.003 + Math.random() * 0.008;
            this.swingOffset = Math.random() * Math.PI * 2;
            this.opacity = 0.2 + Math.random() * 0.5 + this.layer * 0.1;
            this.depth = 0.5 + this.layer * 0.3;
            // PERFECT pink sakura
            const hue = 340 + Math.random() * 30;
            const sat = 50 + Math.random() * 40;
            const light = 75 + Math.random() * 20;
            this.color = `hsla(${hue}, ${sat}%, ${light}%, ${this.opacity})`;
            this.hue = hue;
            this.sat = sat;
            this.light = light;
            this.targetHue = hue;
            this.targetSat = sat;
            this.targetLight = light;
            this.targetOpacity = this.opacity;
            this.targetSize = this.size;
        }
        update(time, zone) {
            // Riverion mode
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

            // Micro mode (aura zone)
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

            // Normal sakura
            this.y += this.speedY;
            windX += (targetWindX - windX) * 0.02;
            this.x += this.speedX + windX * this.depth +
                Math.sin(time * this.swingSpeed + this.swingOffset) * this.swing * 0.3;

            // Mouse repulsion
            const dx = this.x - cursorX;
            const dy = this.y - cursorY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0 && dist < 120) {
                const force = (120 - dist) / 120;
                this.x += (dx / dist) * force * 6;
                this.y += (dy / dist) * force * 6;
            }
            this.rotation += this.rotationSpeed;

            // Color morph based on zone
            this.applyZoneColors(zone);

            if (this.y > canvas.height + 30) this.reset();
            if (this.x < -30) this.x = canvas.width + 30;
            if (this.x > canvas.width + 30) this.x = -30;
        }
        applyZoneColors(zone) {
            let targetH, targetS, targetL, targetO;

            if (this.layer <= 1) {
                // Layer 1-2: Always sakura petals, just color changes
                switch(zone) {
                    case 1: // Day = white pink
                        targetH = 345;
                        targetS = 65;
                        targetL = 85;
                        targetO = this.opacity;
                        break;
                    case 2: // Dusk = orange pink
                        targetH = 15;
                        targetS = 70;
                        targetL = 70;
                        targetO = this.opacity * 0.9;
                        break;
                    case 3: // Night = deep blue silver
                        targetH = 210;
                        targetS = 30;
                        targetL = 65;
                        targetO = this.opacity * 0.6;
                        break;
                    case 4: // Moon = muted purple silver
                        targetH = 260;
                        targetS = 20;
                        targetL = 60;
                        targetO = this.opacity * 0.4;
                        break;
                    case 5: // Aurora = ghost white
                        targetH = 345;
                        targetS = 50;
                        targetL = 80;
                        targetO = this.opacity;
                        break;
                    default:
                        targetH = 350;
                        targetS = 70;
                        targetL = 85;
                        targetO = this.opacity;
                }
            } else {
                // Layer 2+: Morphs through crystal/fire/micro
                switch(zone) {
                    case 1: // Normal sakura
                        targetH = 340 + this.layer * 5;
                        targetS = 55 + this.layer * 5;
                        targetL = 80 + this.layer * 5;
                        targetO = this.opacity;
                        break;
                    case 2: // Dusk = ice/copper
                        targetH = -5 + this.layer * 15;
                        targetS = 60 + this.layer * 10;
                        targetL = 55 + this.layer * 10;
                        targetO = this.opacity * 0.85;
                        break;
                    case 3: // Night = ice crystal
                        targetH = 200;
                        targetS = 40;
                        targetL = 75;
                        targetO = this.opacity * 0.7;
                        break;
                    case 4: // Moon = firefly blend
                        targetH = 270 + this.layer * 10;
                        targetS = 25;
                        targetL = 70;
                        targetO = this.opacity * 0.5;
                        break;
                    case 5: // Aurora = micro-green
                        targetH = 160;
                        targetS = 70;
                        targetL = 70;
                        targetO = this.opacity * 0.9;
                        break;
                    default:
                        targetH = 350;
                        targetS = 70;
                        targetL = 85;
                        targetO = this.opacity;
                }
            }

            // Smooth interpolation
            const lerp = 0.08;
            this.targetHue += (targetH - this.targetHue) * lerp;
            this.targetSat += (targetS - this.targetSat) * lerp;
            this.targetLight += (targetL - this.targetLight) * lerp;
            this.targetOpacity += (targetO - this.targetOpacity) * lerp;

            this.color = `hsla(${this.targetHue|0}, ${this.targetSat|0}%, ${this.targetLight|0}%, ${this.targetOpacity})`;
        }
        draw() {
            if (this.isFirefly) {
                // Firefly
                ctx.save();
                ctx.globalAlpha = this.fireflyGlow * this.opacity * 0.8;
                const glowRadius = this.size * 3;
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
                gradient.addColorStop(0, `hsla(${this.fireflyHue}, 100%, 85%, 1)`);
                gradient.addColorStop(0.2, `hsla(${this.fireflyHue}, 100%, 70%, 0.6)`);
                gradient.addColorStop(0.5, `hsla(${this.fireflyHue}, 100%, 60%, 0.2)`);
                gradient.addColorStop(1, `hsla(${this.fireflyHue}, 100%, 60%, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = `hsla(${this.fireflyHue}, 100%, 95%, 1)`;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            if (this.isMicro) {
                // Aurora micro-particle
                ctx.save();
                ctx.globalAlpha = this.fireflyGlow * this.opacity * 0.4;
                const r = this.size * (1 + this.fireflyGlow * 0.5);
                ctx.fillStyle = `hsla(160, 80%, 75%, 0.6)`;
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            // Sakura petal draw
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.fillStyle = this.color;
            const s = this.size;
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(s * 0.5, -s * 0.3, s, -s * 0.5, s * 0.5, -s);
            ctx.bezierCurveTo(s * 0.2, -s * 0.7, -s * 0.2, -s * 0.7, -s * 0.5, -s);
            ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.5, -s * 0.3, 0, 0);
            ctx.fill();
            ctx.restore();
        }
    }

    function initPetals() {
        const count = Math.min(Math.floor(window.innerWidth / 25) + 20, 80);
        petals = [];
        for (let i = 0; i < count; i++) {
            let layer;
            // 50% shallow petals, 30% mid layer, 20% deep layer
            const r = Math.random();
            if (r < 0.5) layer = 0;
            else if (r < 0.8) layer = 1;
            else layer = 2;
            petals.push(new Petal(layer));
        }
    }

    let startTime = Date.now();

    function animatePetals() {
        if (prefersReducedMotion) return;
        const time = (Date.now() - startTime) / 1000;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => { petal.update(time, currentZone); petal.draw(); });
        if (currentZone === 4) {
            if (shootingStars.length === 0) initShootingStars();
            updateShootingStars();
        }
        animationId = requestAnimationFrame(animatePetals);
    }

    // ===== Aurora Canvas (单独的 for aurora effect) =====
    let auroraCanvas, auroraCtx, auroraId;
    let auroraWaves = [];

    function createAuroraCanvas() {
        auroraCanvas = document.createElement('canvas');
        auroraCanvas.id = 'aurora-canvas';
        auroraCanvas.style.cssText = 'position:fixed;inset:0;z-index:9995;pointer-events:none;opacity:0;transition:opacity 3s ease;';
        document.body.appendChild(auroraCanvas);
        auroraCtx = auroraCanvas.getContext('2d');
    }

    function resizeAuroraCanvas() {
        if (!auroraCanvas) return;
        auroraCanvas.width = window.innerWidth;
        auroraCanvas.height = window.innerHeight;
    }

    class AuroraWave {
        constructor(index, total) {
            this.index = index;
            this.total = total;
        }
        update(time) {
            this.phase += this.speed;
        }
        draw(ctx, w, h, time) {
            const layerIndex = this.index;
            const baseY = h * 0.35 + (layerIndex / Math.max(this.total - 1, 1)) * h * 0.35;
            const timeFactor = Math.sin(time * 0.0007 + layerIndex * 1.5) * 0.5 + 0.5;

            const colors = [
                [52, 181, 153],   // green
                [59, 213, 209],   // teal
                [56, 189, 248],   // blue
                [134, 239, 172],  // light green
                [167, 139, 250],  // purple
                [236, 72, 153],   // pink
            ];
            const cIdx = layerIndex % colors.length;
            const cNext = (layerIndex + 1) % colors.length;
            const [r1, g1, b1] = colors[cIdx];
            const [r2, g2, b2] = colors[cNext];
            const r = r1 + (r2 - r1) * timeFactor;
            const g = g1 + (g2 - g1) * timeFactor;
            const b = b1 + (b2 - b1) * timeFactor;

            const amp = this.amplitude * (0.7 + timeFactor * 0.3);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(-10, h);
            ctx.lineTo(-10, baseY);

            for (let x = -10; x <= w + 10; x += 4) {
                const wy = baseY
                    + Math.sin(x * this.freq + this.phase) * amp
                    + Math.sin(x * this.freq2 + this.phase * 1.7) * amp * 0.4
                    + Math.cos(x * this.freq3 - this.phase * 0.5) * amp * 0.2;
                ctx.lineTo(x, wy);
            }

            ctx.lineTo(w + 10, h);
            ctx.closePath();

            const bandH = this.bandHeight;
            const grad = ctx.createLinearGradient(0, baseY - bandH, 0, baseY + bandH + 80);
            const alpha = this.baseAlpha * (0.4 + timeFactor * 0.6);
            grad.addColorStop(0, `rgba(${r|0},${g|0},${b|0},0)`);
            grad.addColorStop(0.15, `rgba(${r|0},${g|0},${b|0},${alpha * 0.3})`);
            grad.addColorStop(0.4, `rgba(${r|0},${g|0},${b|0},${alpha})`);
            grad.addColorStop(0.6, `rgba(${r|0},${g|0},${b|0},${alpha * 0.5})`);
            grad.addColorStop(1, `rgba(${r|0},${g|0},${b|0},0)`);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
        }
    }

    function initAuroraWaves() {
        if (!auroraCanvas) return;
        auroraWaves = [];
        for (let i = 0; i < 10; i++) {
            const wave = new AuroraWave(i, 10);
            wave.freq = 0.0008 + Math.random() * 0.0015;
            wave.freq2 = 0.0015 + Math.random() * 0.002;
            wave.freq3 = 0.002 + Math.random() * 0.003;
            wave.amplitude = 30 + Math.random() * 80;
            wave.speed = 0.003 + Math.random() * 0.006;
            wave.phase = Math.random() * Math.PI * 2;
            wave.bandHeight = 25 + Math.random() * 40;
            wave.baseAlpha = 0.08 + Math.random() * 0.12;
            auroraWaves.push(wave);
        }
    }

    function animateAurora() {
        if (prefersReducedMotion) return;
        if (!auroraCanvas || !auroraCtx) return;
        const time = Date.now();
        auroraCtx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);
        auroraWaves.forEach(wave => {
            wave.update(time);
            wave.draw(auroraCtx, auroraCanvas.width, auroraCanvas.height, time);
        });
        auroraId = requestAnimationFrame(animateAurora);
    }

    // ===== Shooting stars (zone 4 moon) =====
    let shootingStars = [];

    class ShootingStar {
        constructor(w, h) {
            this.w = w; this.h = h;
            this.reset();
        }
        reset() {
            this.x = Math.random() * this.w;
            this.y = Math.random() * this.h * 0.4;
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
        draw(ctx) {
            if (!this.active) return;
            ctx.save();
            ctx.globalAlpha = this.opacity;
            const tailX = this.x - Math.cos(this.angle) * this.length;
            const tailY = this.y - Math.sin(this.angle) * this.length;
            const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(0.7, 'rgba(200,200,255,0.4)');
            grad.addColorStop(1, 'rgba(255,255,255,0.9)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();

            // Head glow
            ctx.globalAlpha = this.opacity * 0.6;
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // ===== Custom Cursor =====
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    function updateCursor() {
        if (prefersReducedMotion) return;
        ringX += (cursorX - ringX) * 0.12;
        ringY += (cursorY - ringY) * 0.12;
        if (cursorDot) cursorDot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        if (cursorRing) cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
        requestAnimationFrame(updateCursor);
    }

    // ===== Mouse tracking =====
    let hoverTargets = [];
    const book3dEl = document.getElementById('book-3d');
    const bookGlareEl = document.querySelector('.book-glare');

    function refreshHoverTargets() {
        hoverTargets = Array.from(document.querySelectorAll('.vision-card, .philosophy-card, .layer-card, .project-card, .research-log-card, .cycle-bridge-card, .quote-prelude-card'));
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[char]);
    }

    function renderPhilosophy(items) {
        const root = document.querySelector('[data-render="philosophy"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => `
            <article class="philosophy-card" data-tilt>
                <div class="card-icon-wrap">
                    <span class="card-icon">${escapeHtml(item.icon)}</span>
                </div>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-subtitle">${escapeHtml(item.subtitle)}</p>
                <p class="card-text">${escapeHtml(item.text)}</p>
                <div class="card-flutter"><span>❋</span></div>
            </article>
        `).join('');
    }

    function renderExperienceLayers(items) {
        const root = document.querySelector('[data-render="experienceLayers"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item, index) => `
            <article class="layer-card" data-tilt style="--layer-index: ${index + 1}">
                <span class="layer-sequence" aria-hidden="true">
                    <span class="layer-sequence__dot"></span>
                    <span class="layer-sequence__beam"></span>
                </span>
                <span class="layer-label">${escapeHtml(item.label)}</span>
                ${item.cadence ? `<span class="layer-cadence">${escapeHtml(item.cadence)}</span>` : ''}
                ${item.phase ? `<span class="layer-phase"><strong>${escapeHtml(item.phase)}</strong>${item.phaseNote ? `<em>${escapeHtml(item.phaseNote)}</em>` : ''}</span>` : ''}
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
            </article>
        `).join('');
    }

    function renderStats(items) {
        const root = document.querySelector('[data-render="stats"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => `
            <div class="stat-item">
                <div class="stat-number-wrap">
                    <span class="stat-number" data-target="${escapeHtml(item.target)}" data-suffix="${escapeHtml(item.suffix)}">0</span>
                </div>
                <p class="stat-label">${escapeHtml(item.label)}</p>
                <p class="stat-sub">${escapeHtml(item.sub)}</p>
            </div>
        `).join('');
    }

    function renderProcess(items) {
        const root = document.querySelector('[data-render="process"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item, index) => `
            ${index > 0 ? '<div class="process-connector"></div>' : ''}
            <div class="process-step">
                <div class="process-icon">${escapeHtml(item.icon)}</div>
                <span class="process-label">${escapeHtml(item.label)}</span>
            </div>
        `).join('');
    }

    function renderResearchLogs(items) {
        const root = document.querySelector('[data-render="researchLogs"]');
        if (!root || !items) return;
        root.innerHTML = items.map((item) => {
            const cardId = item.id ? ` id="${escapeHtml(item.id)}"` : '';
            const wisdomTrail = Array.isArray(item.wisdomTrail) && item.wisdomTrail.length
                ? `<dl class="research-wisdom-trail" aria-label="${escapeHtml(item.title)}の知恵断片">
                    ${item.wisdomTrail.map((trail) => `
                        <div>
                            <dt>${escapeHtml(trail.label || '')}</dt>
                            <dd>${escapeHtml(trail.text || '')}</dd>
                        </div>
                    `).join('')}
                </dl>`
                : '';
            const sourceProject = item.sourceProject
                ? `<p class="research-source">
                    <span>${escapeHtml(item.sourceProject.label || 'Source')}</span>
                    <strong>${escapeHtml(item.sourceProject.title || '')}</strong>
                    ${escapeHtml(item.sourceProject.text || '')}
                </p>`
                : '';
            const paperSample = item.paperSample
                ? `<div class="research-paper-sample" aria-label="${escapeHtml(item.paperSample.title || '論文メモサンプル')}">
                    <div class="research-paper-sample__copy">
                        <span>${escapeHtml(item.paperSample.eyebrow || 'Paper memo')}</span>
                        <strong>${escapeHtml(item.paperSample.title || '')}</strong>
                        <p>${escapeHtml(item.paperSample.text || '')}</p>
                        ${item.paperSample.source ? `
                            <a class="research-paper-source" href="${escapeHtml(item.paperSample.source.url || '#')}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml((item.paperSample.source.title || item.paperSample.source.label || '論文') + 'を開く')}">
                                <span>${escapeHtml(item.paperSample.source.label || 'Source')}</span>
                                <strong>${escapeHtml(item.paperSample.source.title || '')}</strong>
                                ${item.paperSample.source.note ? `<em>${escapeHtml(item.paperSample.source.note)}</em>` : ''}
                            </a>
                        ` : ''}
                    </div>
                    ${Array.isArray(item.paperSample.notes) && item.paperSample.notes.length ? `
                        <dl class="research-paper-sample__notes">
                            ${item.paperSample.notes.map((note) => `
                                <div>
                                    <dt>${escapeHtml(note.label || '')}</dt>
                                    <dd>${escapeHtml(note.text || '')}</dd>
                                </div>
                            `).join('')}
                        </dl>
                    ` : ''}
                </div>`
                : '';
            return `
            <article class="research-log-card"${cardId} data-tilt>
                <div class="research-log-meta">
                    <p class="research-log-eyebrow">${escapeHtml(item.eyebrow)}</p>
                    ${item.theme ? `<span class="research-log-theme">${escapeHtml(item.theme)}</span>` : ''}
                </div>
                <h3 class="research-log-title">${escapeHtml(item.title)}</h3>
                <dl class="research-log-cycle">
                    <div>
                        <dt>問い</dt>
                        <dd>${escapeHtml(item.question)}</dd>
                    </div>
                    <div>
                        <dt>実験</dt>
                        <dd>${escapeHtml(item.experiment)}</dd>
                    </div>
                    <div>
                        <dt>発見</dt>
                        <dd>${escapeHtml(item.finding)}</dd>
                    </div>
                </dl>
                ${wisdomTrail}
                ${sourceProject}
                ${paperSample}
            </article>
        `;
        }).join('');
    }

    function renderVisions(visionsGroup) {
        const root = document.querySelector('[data-render="visions"]');
        if (!root || !visionsGroup) return;
        const items = Array.isArray(visionsGroup) ? visionsGroup : visionsGroup.items;
        if (!items) return;
        const entryGuide = !Array.isArray(visionsGroup) && visionsGroup.entryGuide
            ? renderVisionEntryGuide(visionsGroup.entryGuide, items)
            : '';
        const entryKinds = !Array.isArray(visionsGroup) && visionsGroup.entryGuide
            ? getVisionEntryKinds(visionsGroup.entryGuide)
            : {};
        const cards = items.map((item) => {
            const entryKind = getVisionEntryKind(item);
            const entryKindAttribute = entryKind ? ` data-entry-kind="${escapeHtml(entryKind)}"` : '';
            const entryKindBadge = entryKind ? renderVisionEntryKindBadge(entryKind, entryKinds[entryKind]) : '';
            return `
            <article class="vision-card"${entryKindAttribute} data-tilt>
                <div class="vision-icon">${escapeHtml(item.icon)}</div>
                ${entryKindBadge}
                <h3>${escapeHtml(item.title)}</h3>
                <p class="vision-jp">${escapeHtml(item.jp)}</p>
                <p class="vision-text">${escapeHtml(item.text)}</p>
                ${renderVisionEntry(item.entry || item.entryQuestion)}
                ${item.tag ? `<span class="vision-tag">${escapeHtml(item.tag)}</span>` : ''}
            </article>
        `;
        }).join('');
        root.innerHTML = `${entryGuide}${cards}`;
    }

    function getVisionEntryKinds(guide) {
        const kinds = Array.isArray(guide.kinds) ? guide.kinds : [];
        return kinds.reduce((map, item) => {
            if (item.kind) map[item.kind] = item;
            return map;
        }, {});
    }

    function getVisionEntryKind(item) {
        const entry = item && item.entry;
        return entry && typeof entry === 'object' && entry.kind ? entry.kind : '';
    }

    function renderVisionEntryGuide(guide, visionItems) {
        const kinds = Array.isArray(guide.kinds) ? guide.kinds : [];
        const kindCounts = Array.isArray(visionItems)
            ? visionItems.reduce((counts, item) => {
                const kind = item.entry && item.entry.kind;
                if (kind) counts[kind] = (counts[kind] || 0) + 1;
                return counts;
            }, {})
            : {};
        return `
            <article class="vision-entry-guide" aria-label="${escapeHtml(guide.title || 'コミュニティ入力種別')}">
                <div class="vision-entry-guide__copy">
                    <p class="vision-entry-guide__eyebrow">${escapeHtml(guide.eyebrow || 'Community interface')}</p>
                    <h3>${escapeHtml(guide.title || '')}</h3>
                    <p>${escapeHtml(guide.text || '')}</p>
                </div>
                ${kinds.length ? `
                    <div class="vision-entry-guide__kinds">
                        ${kinds.map((item) => `
                            <div class="vision-entry-guide__kind" data-entry-kind="${escapeHtml(item.kind || 'seed')}">
                                <span>${escapeHtml(item.label || item.kind || '種')}</span>
                                <p>${escapeHtml(item.text || '')}</p>
                                <small>
                                    <span>${escapeHtml(String(kindCounts[item.kind] || 0))}件の入口</span>
                                    ${item.target ? `<span>${escapeHtml(item.target)}へ接続</span>` : ''}
                                </small>
                                ${item.flow ? `<span class="vision-entry-guide__flow">${escapeHtml(item.flow)}</span>` : ''}
                                ${renderVisionEntryFields(item.fields)}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </article>
        `;
    }

    function renderVisionEntryFields(fields) {
        if (!Array.isArray(fields) || !fields.length) return '';
        return `
            <ul class="vision-entry-guide__fields" aria-label="受付メモ">
                ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}
            </ul>
        `;
    }

    function renderVisionEntryKindBadge(kind, detail) {
        const label = detail && detail.label ? detail.label : kind;
        const target = detail && detail.target ? detail.target : '';
        return `
            <span class="vision-entry-kind-badge" data-entry-kind="${escapeHtml(kind)}">
                <span>${escapeHtml(label)}の入口</span>
                ${target ? `<small>${escapeHtml(target)}</small>` : ''}
            </span>
        `;
    }

    function renderVisionEntry(entry) {
        if (!entry) return '';
        if (typeof entry === 'string') return `<p class="vision-entry-question">${escapeHtml(entry)}</p>`;
        return `
            <div class="vision-entry-question" data-entry-kind="${escapeHtml(entry.kind || 'seed')}">
                <span class="vision-entry-question__label">${escapeHtml(entry.label || 'まず預けたいこと')}</span>
                <span class="vision-entry-question__prompt">${escapeHtml(entry.prompt || '')}</span>
                ${renderVisionEntryQuestionFields(entry.fields)}
            </div>
        `;
    }

    function renderVisionEntryQuestionFields(fields) {
        if (!Array.isArray(fields) || !fields.length) return '';
        return `
            <ul class="vision-entry-question__fields" aria-label="受付メモ">
                ${fields.map((field) => `<li>${escapeHtml(field)}</li>`).join('')}
            </ul>
        `;
    }

    function renderCycleBridge(item) {
        const root = document.querySelector('[data-render="cycleBridge"]');
        if (!root || !item) return;
        root.innerHTML = `
            <article class="cycle-bridge-card" data-tilt>
                <p class="cycle-bridge-eyebrow">${escapeHtml(item.eyebrow)}</p>
                <h3 class="cycle-bridge-title">${escapeHtml(item.title)}</h3>
                <p class="cycle-bridge-text">${escapeHtml(item.text)}</p>
            </article>
        `;
    }

    function renderResearchGroup(researchGroup) {
        if (!researchGroup) return;
        renderResearchLogs(researchGroup.logs);
        renderCycleBridge(researchGroup.cycleBridge);
    }

    function renderQuotePrelude(item) {
        const root = document.querySelector('[data-render="quotePrelude"]');
        if (!root || !item) return;
        const steps = Array.isArray(item.steps) && item.steps.length
            ? `<ol class="quote-prelude-steps">
                ${item.steps.map((step) => `
                    <li>
                        <span>${escapeHtml(step.label || '')}</span>
                        ${escapeHtml(step.text || '')}
                    </li>
                `).join('')}
            </ol>`
            : '';
        root.innerHTML = `
            <article class="quote-prelude-card" data-tilt>
                <p class="quote-prelude-eyebrow">${escapeHtml(item.eyebrow || 'Circulation note')}</p>
                <h3 class="quote-prelude-title">${escapeHtml(item.title || '')}</h3>
                <p class="quote-prelude-text">${escapeHtml(item.text || '')}</p>
                ${steps}
            </article>
        `;
    }

    function renderProjects(projectsGroup) {
        const root = document.querySelector('[data-render="projects"]');
        if (!root || !projectsGroup) return;
        const items = Array.isArray(projectsGroup.items) ? projectsGroup.items : [];
        const projectLanes = projectsGroup.lanes || [];
        const getProjectActionType = (item) => {
            if (!item.href) return 'status';
            return item.actionType || (item.download ? 'download' : 'external');
        };
        const formatProjectDestination = (item) => {
            if (!item.href) return '';
            if (item.actionDestination) return item.actionDestination;
            if (item.download) return item.href.split('/').pop() || item.href;
            try {
                return new URL(item.href, window.location.href).hostname || item.href;
            } catch (error) {
                return item.href;
            }
        };
        const laneCounts = items.reduce((counts, item) => {
            if (item.lane) counts[item.lane] = (counts[item.lane] || 0) + 1;
            return counts;
        }, {});
        const actionTypeCounts = items.reduce((counts, item) => {
            const actionType = getProjectActionType(item);
            counts[actionType] = (counts[actionType] || 0) + 1;
            return counts;
        }, {});
        const laneFilters = projectLanes.length
            ? `<div class="project-lane-filter" aria-label="制作物の棚で絞り込む">
                <button class="project-lane-filter__button is-active" type="button" data-lane-filter="all" aria-pressed="true">
                    <span>すべて</span>
                    <strong>${escapeHtml(String(items.length))}</strong>
                </button>
                ${projectLanes.map((lane) => `
                    <button class="project-lane-filter__button" type="button" data-lane-filter="${escapeHtml(lane.label)}" aria-pressed="false">
                        <span>${escapeHtml(lane.jp)}</span>
                        <strong>${escapeHtml(String(laneCounts[lane.label] || 0))}</strong>
                    </button>
                `).join('')}
            </div>`
            : '';
        const laneGuide = projectLanes.length
            ? `<div class="project-lane-guide" aria-label="制作物の棚">
                ${projectLanes.map((lane) => `
                    <div class="project-lane-guide__item" data-lane-guide="${escapeHtml(lane.label)}">
                        <span class="project-lane-guide__label">${escapeHtml(lane.label)}</span>
                        <span class="project-lane-guide__count">${escapeHtml(String(laneCounts[lane.label] || 0))}</span>
                        <strong>${escapeHtml(lane.jp)}</strong>
                        <p>${escapeHtml(lane.text)}</p>
                    </div>
                `).join('')}
            </div>`
            : '';
        const laneStatus = projectLanes.length
            ? `<p class="project-lane-status" data-project-lane-status aria-live="polite">${escapeHtml(projectsGroup.overview || '制作物を棚ごとに眺められます。')}</p>`
            : '';
        const actionGuide = Array.isArray(projectsGroup.actionGuide) && projectsGroup.actionGuide.length
            ? `<div class="project-action-guide" aria-label="制作物リンクの種類">
                ${projectsGroup.actionGuide.map((guide) => `
                    <span class="project-action-guide__item project-action-guide__item--${escapeHtml(guide.type || 'info')}">
                        ${guide.icon ? `<span class="project-action-guide__icon" aria-hidden="true">${escapeHtml(guide.icon)}</span>` : ''}
                        <strong>${escapeHtml(guide.label)}</strong>
                        <em>${escapeHtml(String(actionTypeCounts[guide.type] || 0))}件</em>
                        <span>${escapeHtml(guide.text)}</span>
                    </span>
                `).join('')}
            </div>`
            : '';
        const cards = items.map((item) => {
            const actionType = getProjectActionType(item);
            const actionIcon = actionType === 'download' ? '↓' : '↗';
            const actionLabel = item.actionLabel || (actionType === 'download' ? 'DL' : '外部');
            const actionClass = `project-action project-action--${escapeHtml(actionType)}`;
            const actionText = escapeHtml(item.action || (actionType === 'download' ? 'Download' : 'Open'));
            const actionHint = item.actionHint
                ? `<span class="project-action__hint">${escapeHtml(item.actionHint)}</span>`
                : '';
            const actionDestination = formatProjectDestination(item);
            const actionDestinationText = actionDestination
                ? `<span class="project-action__destination">${escapeHtml(actionDestination)}</span>`
                : '';
            const actionAria = actionType === 'download'
                ? `${item.title}をダウンロードする`
                : `${item.title}を外部サイトで開く`;
            const thumb = item.image
                ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" class="project-img" loading="lazy" decoding="async">`
                : `<div class="project-thumb-placeholder" ${item.placeholderAlt ? `role="img" aria-label="${escapeHtml(item.placeholderAlt)}"` : 'aria-hidden="true"'}>
                    <span class="placeholder-icon">${escapeHtml(item.placeholderIcon || '🌸')}</span>
                    <span class="placeholder-text">${escapeHtml(item.placeholderText || item.title)}</span>
                </div>`;
            const live = item.href
                ? `<a href="${escapeHtml(item.href)}" class="${actionClass}" aria-label="${escapeHtml(actionAria)}" ${item.download ? 'download' : 'target="_blank" rel="noopener noreferrer"'}><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}${actionDestinationText}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></a>`
                : `<span class="project-live__badge">${escapeHtml(item.status || 'Concept')}</span>`;
            const lane = item.lane
                ? `<span class="project-lane">${escapeHtml(item.lane)}</span>`
                : '';
            const why = item.why
                ? `<p class="project-note project-why"><span>Why</span>${escapeHtml(item.why)}</p>`
                : '';
            const origin = item.origin
                ? `<p class="project-note project-origin"><span>Origin</span>${escapeHtml(item.origin)}</p>`
                : '';
            const surprise = item.surprise
                ? `<p class="project-note project-surprise"><span>Surprise</span>${escapeHtml(item.surprise)}</p>`
                : '';
            const nextStep = item.nextStep
                ? `<p class="project-note project-next"><span>Next</span>${escapeHtml(item.nextStep)}</p>`
                : '';
            const actionNote = item.actionNote
                ? `<p class="project-action-note"><span>${escapeHtml(item.actionNote.label || 'Note')}</span>${escapeHtml(item.actionNote.text || '')}</p>`
                : '';
            const returnLink = item.returnLink
                ? `<a class="project-return-link" href="${escapeHtml(item.returnLink.href || '#')}">
                    <span>${escapeHtml(item.returnLink.label || 'Research Log')}</span>
                    ${escapeHtml(item.returnLink.text || '')}
                </a>`
                : '';
            const cycle = item.cycle ? `
                <dl class="project-cycle" aria-label="${escapeHtml(item.title)}の問い、実験、発見">
                    ${[
                        ['問い', item.cycle.question],
                        ['実験', item.cycle.experiment],
                        ['発見', item.cycle.finding]
                    ].filter(([, value]) => value).map(([label, value]) => `
                        <div>
                            <dt>${escapeHtml(label)}</dt>
                            <dd>${escapeHtml(value)}</dd>
                        </div>
                    `).join('')}
                </dl>
            ` : '';
            const cardClass = item.image ? 'project-card' : 'project-card project-card--placeholder';
            return `
                <article class="${cardClass}" data-project-card data-lane="${escapeHtml(item.lane || '')}" data-tilt>
                    <div class="project-thumb">${thumb}</div>
                    <div class="project-info">
                        <div class="project-meta-row">
                            ${lane}
                            <span class="project-type">${escapeHtml(item.type)}</span>
                            <span class="project-live">${live}</span>
                        </div>
                        <h3 class="project-title">${escapeHtml(item.title)}</h3>
                        <p class="project-desc">${escapeHtml(item.text)}</p>
                        ${why}
                        ${origin}
                        ${surprise}
                        ${nextStep}
                        ${actionNote}
                        ${returnLink}
                        ${cycle}
                        <div class="project-tags">
                            ${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                        </div>
                    </div>
                </article>
            `;
        }).join('');
        root.innerHTML = `${laneGuide}${laneFilters}${laneStatus}${actionGuide}${cards}`;
        initProjectLaneFilter(root, projectsGroup);
    }

    function initProjectLaneFilter(root, projectsGroup) {
        const buttons = Array.from(root.querySelectorAll('[data-lane-filter]'));
        const cards = Array.from(root.querySelectorAll('[data-project-card]'));
        const laneGuides = Array.from(root.querySelectorAll('[data-lane-guide]'));
        const status = root.querySelector('[data-project-lane-status]');
        if (!buttons.length || !cards.length) return;
        const projectLanes = projectsGroup.lanes || [];
        const laneCopy = projectLanes.reduce((copy, lane) => {
            copy[lane.label] = lane.filterText || lane.text || '';
            return copy;
        }, {});
        const overview = projectsGroup.overview || '制作物を棚ごとに眺められます。';

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedLane = button.dataset.laneFilter;
                buttons.forEach((filterButton) => {
                    const isActive = filterButton === button;
                    filterButton.classList.toggle('is-active', isActive);
                    filterButton.setAttribute('aria-pressed', String(isActive));
                });
                cards.forEach((card) => {
                    const shouldShow = selectedLane === 'all' || card.dataset.lane === selectedLane;
                    card.hidden = !shouldShow;
                });
                laneGuides.forEach((guide) => {
                    const isSelected = selectedLane !== 'all' && guide.dataset.laneGuide === selectedLane;
                    guide.classList.toggle('is-selected', isSelected);
                    guide.classList.toggle('is-muted', selectedLane !== 'all' && !isSelected);
                });
                if (status) status.textContent = selectedLane === 'all' ? overview : laneCopy[selectedLane] || overview;
            });
        });
    }

    function renderContent() {
        const content = window.HAZAKURA_CONTENT;
        if (!content) return;
        renderPhilosophy(content.philosophy);
        renderExperienceLayers(content.experienceLayers);
        renderStats(content.stats);
        renderProcess(content.process);
        renderResearchGroup(content.researchGroup);
        renderVisions(content.visionsGroup || content.visions);
        renderProjects(content.projectsGroup);
        renderQuotePrelude(content.quotePrelude);
        refreshHoverTargets();
    }

    document.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion) return;
        cursorX = e.clientX;
        cursorY = e.clientY;
        targetWindX = (e.movementX || 0) * 0.15;

        // Card hover — elementFromPoint (no layout thrashing)
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const hoverCard = el?.closest('.vision-card, .philosophy-card, .layer-card, .project-card, .research-log-card, .cycle-bridge-card, .quote-prelude-card');
        for (const card of hoverTargets) {
            if (card === hoverCard) {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            } else {
                card.style.removeProperty('--mouse-x');
                card.style.removeProperty('--mouse-y');
            }
        }

        // Book 3D
        if (book3dEl) {
            const rect = book3dEl.getBoundingClientRect();
            if (e.clientX >= rect.left - 50 && e.clientX <= rect.right + 50 &&
                e.clientY >= rect.top - 50 && e.clientY <= rect.bottom + 50) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rx = ((y - cy) / cy) * -12;
                const ry = ((x - cx) / cx) * 12;
                book3dEl.style.transform = `rotateY(${ry - 10}deg) rotateX(${rx}deg) scale(1.05)`;
                if (bookGlareEl) bookGlareEl.style.transform = `translateX(${(x / rect.width) * 120 - 100}%)`;
            } else {
                book3dEl.style.transform = `rotateY(-20deg) rotateX(5deg)`;
                if (bookGlareEl) bookGlareEl.style.transform = `translateX(-150%)`;
            }
        }
    });

    // ===== Cursor hover =====
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, input, textarea, [data-tilt]')) {
            cursorRing && cursorRing.classList.add('hovering');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, input, textarea, [data-tilt]')) {
            cursorRing && cursorRing.classList.remove('hovering');
        }
    });

    // ===== Scroll handlers =====
    function handleNavScroll() {
        const nav = document.getElementById('nav-main');
        if (nav) {
            if (window.scrollY > 80) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    }

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        const bar = document.getElementById('scroll-progress');
        if (bar) bar.style.width = progress + '%';
    }

    function handleParallax() {
        const scrollY = window.scrollY;
        const heroDepth = document.querySelector('.hero-depth-layer');
        const heroContent = document.querySelector('.hero-content');
        if (heroDepth) {
            heroDepth.style.transform = `scale(1.1) translateY(${scrollY * 0.2}px)`;
        }
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
        }
    }

    // ===== Text reveal =====
    function prepareTextReveal() {
        document.querySelectorAll('.section-title, .title-accent-line').forEach(title => {
            const text = title.textContent.trim();
            title.textContent = '';
            const wrapper = document.createElement('span');
            wrapper.className = 'reveal-text';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const span = document.createElement('span');
                span.className = 'reveal-item';
                if (char === ' ') span.innerHTML = '&nbsp;';
                else span.textContent = char;
                span.style.transitionDelay = `${i * 0.05}s`;
                wrapper.appendChild(span);
            }
            title.appendChild(wrapper);
        });
    }

    // ===== Scroll animations =====
    function initScrollAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.philosophy-card, .vision-card, .layer-card, .research-log-card, .cycle-bridge-card, .quote-prelude-card, .section-title, .project-card, .book-showcase, .quote-block').forEach(el => el.classList.add('visible'));
            document.querySelectorAll('.process-step, .process-connector, .stat-item').forEach(el => el.classList.add('visible'));
            document.querySelectorAll('.stat-number').forEach(setCounterValue);
            return;
        }

        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -30px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                if (el.classList.contains('section-title')) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                } else if (el.classList.contains('philosophy-card') || el.classList.contains('vision-card') || el.classList.contains('layer-card') || el.classList.contains('research-log-card')) {
                    const parent = el.parentElement;
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(el);
                    setTimeout(() => { el.classList.add('visible'); }, index * 120);
                } else if (el.id === 'stats-grid') {
                    el.querySelectorAll('.stat-item').forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                            animateCounter(item.querySelector('.stat-number'));
                        }, i * 120);
                    });
                } else if (el.id === 'process-flow') {
                    el.querySelectorAll('.process-step').forEach((step, i) => {
                        setTimeout(() => { step.classList.add('visible'); }, i * 200);
                    });
                    el.querySelectorAll('.process-connector').forEach((conn, i) => {
                        setTimeout(() => { conn.classList.add('visible'); }, i * 200 + 100);
                    });
                } else {
                    el.classList.add('visible');
                }
                observer.unobserve(el);
            });
        }, observerOptions);

        document.querySelectorAll('.philosophy-card, .vision-card, .layer-card, .research-log-card, .cycle-bridge-card, .quote-prelude-card, .section-title, .project-card').forEach(el => observer.observe(el));
        document.querySelectorAll('.book-showcase, .quote-block').forEach(el => observer.observe(el));
        document.querySelectorAll('.stats-grid').forEach(el => observer.observe(el));
        document.querySelectorAll('.process-flow').forEach(el => observer.observe(el));
    }

    // ===== 5-zone scroll theme: Day → Dusk → Night → Moon → Aurora =====
    let currentZone = 1;

    const zoneNameToIndex = { day: 1, dusk: 2, night: 3, moon: 4, aurora: 5 };
    const zoneIndexToName = ['', 'day', 'dusk', 'night', 'moon', 'aurora'];

    // Zone nav buttons
    const zoneNav = document.createElement('div');
    zoneNav.className = 'zone-nav';
    zoneNav.innerHTML = `
        <div class="zone-btn zone-btn-1" data-zone="1" title="Day — 桜">🌸</div>
        <div class="zone-btn zone-btn-2" data-zone="2" title="Dusk — 夕景">🌅</div>
        <div class="zone-btn zone-btn-3" data-zone="3" title="Night — 夜">🌙</div>
        <div class="zone-btn zone-btn-4" data-zone="4" title="Moon — 月明">⭐</div>
        <div class="zone-btn zone-btn-5" data-zone="5" title="Aurora — 瑠璃">🌌</div>
    `;
    document.body.appendChild(zoneNav);

    const zoneAtmosphere = createZoneAtmosphere();

    zoneNav.querySelectorAll('.zone-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetZone = parseInt(btn.dataset.zone);
            const zoneName = zoneIndexToName[targetZone];
            const target = document.querySelector(`section[data-zone="${zoneName}"]`);
            if (target) {
                const offset = 72;
                const y = target.getBoundingClientRect().top + window.scrollY - offset;
                setActiveZone(targetZone, true);
                updateBackgroundZones(targetZone, 0);
                updateSectionZones(targetZone);
                updateAtmosphereBlend(targetZone);
                window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
        });
    });
    updateZoneIndicator();

    function createZoneAtmosphere() {
        const atmosphere = document.createElement('div');
        atmosphere.className = 'zone-atmosphere';
        atmosphere.setAttribute('aria-hidden', 'true');
        atmosphere.innerHTML = zoneIndexToName.slice(1).map((zoneName) => (
            `<span class="zone-atmosphere__pane zone-atmosphere__pane--${zoneName}"></span>`
        )).join('');
        document.body.appendChild(atmosphere);
        return atmosphere;
    }

    function setAtmosphereOpacity(zoneName, value) {
        if (!zoneAtmosphere) return;
        zoneAtmosphere.style.setProperty(`--zone-atmosphere-${zoneName}`, value.toFixed(3));
    }

    function updateAtmosphereBlend(zone) {
        if (!zoneAtmosphere) return;
        const activeName = zoneIndexToName[zone];
        const sections = Array.from(document.querySelectorAll('section[data-zone]'));
        const activeSection = sections.find((section) => section.dataset.zone === activeName);
        const weights = { day: 0, dusk: 0, night: 0, moon: 0, aurora: 0 };
        weights[activeName] = 1;

        if (activeSection) {
            const rect = activeSection.getBoundingClientRect();
            const probeY = window.innerHeight * 0.42;
            const softness = Math.min(420, Math.max(220, window.innerHeight * 0.28));
            const activeIndex = sections.indexOf(activeSection);
            const previous = sections[activeIndex - 1];
            const next = sections[activeIndex + 1];
            const previousBlend = previous
                ? Math.max(0, Math.min(1, (softness - (probeY - rect.top)) / softness))
                : 0;
            const nextBlend = next
                ? Math.max(0, Math.min(1, (softness - (rect.bottom - probeY)) / softness))
                : 0;

            if (previousBlend > 0) {
                weights[previous.dataset.zone] = previousBlend;
                weights[activeName] = Math.max(weights[activeName] - previousBlend * 0.35, 0.45);
            }
            if (nextBlend > 0) {
                weights[next.dataset.zone] = Math.max(weights[next.dataset.zone], nextBlend);
                weights[activeName] = Math.max(weights[activeName] - nextBlend * 0.35, 0.45);
            }
        }

        const zoneCaps = { day: 0.08, dusk: 0.16, night: 0.2, moon: 0.18, aurora: 0.22 };
        Object.keys(weights).forEach((zoneName) => {
            setAtmosphereOpacity(zoneName, weights[zoneName] * zoneCaps[zoneName]);
        });
    }

    function createHeroAuroraOverlay() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        if (hero.querySelector('.hero-aurora-overlay')) return;
        const overlay = document.createElement('div');
        overlay.className = 'hero-aurora-overlay';
        hero.querySelector('.hero-overlay').insertAdjacentElement('afterend', overlay);
    }

    function updateZoneIndicator() {
        zoneNav.querySelectorAll('.zone-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.zone) === currentZone);
        });
    }

    function updateZoneBorders(progress) {
        const duskNightBorder = document.querySelector('.zone-border--dusk-night');
        const nightMoonBorder = document.querySelector('.zone-border--night-moon');

        const duskNightProgress = Math.abs(progress * 5 - 3);
        const duskNightOpacity = Math.max(0, 0.6 - duskNightProgress * 0.3);
        if (duskNightBorder) {
            duskNightBorder.style.opacity = duskNightOpacity;
            const posOffset = Math.min(progress * 1000, window.innerHeight);
            duskNightBorder.style.setProperty('--zone-border-offset', posOffset + 'px');
        }

        const nightMoonProgress = Math.abs(progress * 5 - 4);
        const nightMoonOpacity = Math.max(0, 0.5 - nightMoonProgress * 0.25);
        if (nightMoonBorder) {
            nightMoonBorder.style.opacity = nightMoonOpacity;
            const posOffset = Math.min(progress * 1200, window.innerHeight);
            nightMoonBorder.style.setProperty('--zone-border-offset', posOffset + 'px');
        }
    }

    // ===== Particle layer management =====
    const defaultBlobColors = [
        'radial-gradient(circle, var(--sakura-500), transparent 70%)',
        'radial-gradient(circle, var(--purple-400), transparent 70%)',
        'radial-gradient(circle, var(--green-400), transparent 70%)',
        'radial-gradient(circle, var(--sakura-300), transparent 70%)'
    ];

    function updateParticleEvolution(zone) {
        petals.forEach((petal) => {
            const isDeep = petal.layer >= 2;

            // Handle transitions to special modes
            if (zone >= 3 && !petal.isFirefly && Math.random() < 0.01) {
                // Night: shallow petals stay as petals, mid+deep fireflies
                if (isDeep && Math.random() < 0.4) {
                    petal.isFirefly = true;
                } else if (petal.layer === 1 && Math.random() < 0.15) {
                    petal.isFirefly = true;
                }
            }

            if (zone === 5) {
                // Aurora zone: deep petals become aurora micro-particles
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

    function updateScrollZones() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
        const zone = getActiveZoneFromSections();
        const zoneProgress = getZoneProgress(zone);

        setActiveZone(zone);

        // Cursor color
        const cursorRing = document.getElementById('cursor-ring');
        if (cursorRing) {
            const colors = [
                '',
                'rgba(255,255,255,0.5)',
                'rgba(232,168,124,0.6)',
                'rgba(133,129,231,0.6)',
                'rgba(167,139,250,0.6)',
                'rgba(52,211,153,0.6)'
            ];
            cursorRing.style.borderColor = colors[zone] || colors[1];
        }

        // Hero content reappears at night
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            if (zone >= 3) {
                heroContent.style.opacity = 1;
            } else {
                heroContent.style.opacity = Math.max(0, 1 - scrollTop / (window.innerHeight * 0.7));
            }
        }

        // Particle layer evolution
        updateParticleEvolution(zone);

        // Aurora canvas visibility
        if (auroraCanvas) {
            if (zone === 4) {
                auroraCanvas.style.opacity = '0.15';
            } else if (zone === 5) {
                auroraCanvas.style.opacity = '0.5';
            } else if (zone === 3) {
                auroraCanvas.style.opacity = '0.3';
            } else {
                auroraCanvas.style.opacity = '0';
            }
        }

        // Shooting stars at moon zone
        if (zone === 4 && shootingStars.length === 0) {
            initShootingStars();
        }
        if (zone !== 4) {
            shootingStars.forEach(s => s.active = false);
        }

        // Background gradient transitions
        updateBackgroundZones(zone, zoneProgress);

        // Section background per zone
        updateSectionZones(zone);

        // Crossfade the atmosphere near section boundaries.
        updateAtmosphereBlend(zone);

        // Zone borders
        updateZoneBorders(progress);
    }

    function getActiveZoneFromSections() {
        const sections = Array.from(document.querySelectorAll('section[data-zone]'));
        if (sections.length === 0) return currentZone;
        const probeY = window.innerHeight * 0.42;
        let active = sections[0];
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= probeY) active = section;
            else break;
        }
        return zoneNameToIndex[active.dataset.zone] || 1;
    }

    function setActiveZone(zone, force = false) {
        if (!force && zone === currentZone) return;
        currentZone = zone;
        const bodyEl = document.body;
        bodyEl.classList.remove('zone-dusk', 'zone-night', 'zone-moon', 'zone-aurora', 'theme-night');
        switch (zone) {
            case 2: bodyEl.classList.add('zone-dusk'); break;
            case 3: bodyEl.classList.add('theme-night', 'zone-night'); break;
            case 4: bodyEl.classList.add('theme-night', 'zone-moon'); break;
            case 5: bodyEl.classList.add('theme-night', 'zone-aurora'); break;
        }
        updateZoneIndicator();
    }

    function getZoneProgress(zone) {
        const zoneName = zoneIndexToName[zone];
        const section = document.querySelector(`section[data-zone="${zoneName}"]`);
        if (!section) return 0;
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, rect.height + window.innerHeight);
        return Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
    }

    // ===== Dynamic background changes per zone =====
    function updateBackgroundZones(zone, zoneProgress) {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const heroMesh = hero.querySelector('.hero-mesh');
        if (heroMesh) {
            switch(zone) {
                case 1:
                    heroMesh.style.filter = '';
                    revertBlobColors();
                    break;
                case 2:
                    heroMesh.style.filter = 'saturate(1.3) brightness(0.85)';
                    setDuskBlobs();
                    break;
                case 3:
                    heroMesh.style.filter = 'saturate(0.5) brightness(0.5)';
                    break;
                case 4:
                    heroMesh.style.filter = 'saturate(0.3) brightness(0.4) hue-rotate(60deg)';
                    break;
                case 5:
                    heroMesh.style.filter = 'saturate(1.2) brightness(0.6) hue-rotate(120deg)';
                    break;
            }
        }

        // Hero overlay
        const heroOverlay = hero.querySelector('.hero-overlay');
        if (heroOverlay) {
            switch(zone) {
                case 1:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(26,26,46,0.1) 0%, rgba(26,26,46,0.2) 40%, rgba(254,252,250,0.3) 70%, var(--warm-50) 100%)';
                    break;
                case 2:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(120,40,20,0.2) 0%, rgba(232,100,50,0.15) 35%, rgba(240,180,100,0.2) 60%, var(--warm-50) 100%)';
                    break;
                case 3:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(10,10,30,0.8) 0%, rgba(26,26,46,0.6) 40%, rgba(10,10,30,0.3) 70%, #0b0c10 100%)';
                    break;
                case 4:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(30,20,60,0.7) 0%, rgba(50,30,80,0.5) 40%, rgba(20,15,50,0.3) 70%, #141028 100%)';
                    break;
                case 5:
                    heroOverlay.style.background = 'linear-gradient(180deg, rgba(10,40,30,0.6) 0%, rgba(20,60,50,0.4) 40%, rgba(30,50,80,0.3) 70%, #0b1a1a 100%)';
                    break;
            }
        }
    }

    function revertBlobColors() {
        const heroMesh = document.querySelector('.hero-mesh');
        if (!heroMesh) return;
        const blobs = heroMesh.querySelectorAll('.mesh-blob');
        blobs.forEach((blob, i) => {
            blob.style.background = defaultBlobColors[i] || '';
        });
    }

    function setDuskBlobs() {
        const heroMesh = document.querySelector('.hero-mesh');
        if (!heroMesh) return;
        const blobs = heroMesh.querySelectorAll('.mesh-blob');
        if (blobs[0]) blobs[0].style.background = 'radial-gradient(circle, #e8583a, transparent 70%)';
        if (blobs[1]) blobs[1].style.background = 'radial-gradient(circle, #f7a87c, transparent 70%)';
        if (blobs[2]) blobs[2].style.background = 'radial-gradient(circle, #d44a5a, transparent 70%)';
        if (blobs[3]) blobs[3].style.background = 'radial-gradient(circle, #e8a87c, transparent 70%)';
    }

    function updateSectionZones(zone) {
        const philosophy = document.querySelector('.section-philosophy');
        if (philosophy) {
            switch(zone) {
                case 2: philosophy.style.background = 'linear-gradient(180deg, var(--warm-50) 0%, #fdf2e0 40%, #fce8d0 60%, var(--warm-50) 100%)'; break;
                default: philosophy.style.background = ''; break;
            }
        }
        const library = document.querySelector('.section-library');
        if (library) {
            switch(zone) {
                case 2:
                    library.style.background = 'linear-gradient(180deg, var(--warm-50) 0%, #fdf0dd 40%, #fce2cc 60%, var(--warm-50) 100%)';
                    break;
                default:
                    library.style.background = '';
                    break;
            }
        }
    }

    // ===== Shooting stars =====
    function initShootingStars() {
        shootingStars = [];
        const w = window.innerWidth;
        const h = window.innerHeight;
        for (let i = 0; i < 5; i++) {
            shootingStars.push(new ShootingStar(w, h));
        }
    }

    function updateShootingStars() {
        if (shootingStars.length === 0) return;
        shootingStars.forEach(s => {
            if (!s.active && Math.random() < 0.008) {
                s.activate();
            }
            s.update();
        });
        shootingStars.forEach(s => s.draw(ctx));
    }

    // ===== Counter animation =====
    function animateCounter(el) {
        if (!el) return;
        const targetEl = el.classList && el.classList.contains('stat-number') ? el : el.querySelector('.stat-number');
        if (!targetEl) return;
        if (prefersReducedMotion) {
            setCounterValue(targetEl);
            return;
        }

        const target = parseInt(targetEl.dataset.target);
        const suffix = targetEl.dataset.suffix || '';
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * target);
            targetEl.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    function setCounterValue(el) {
        if (!el) return;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        el.textContent = target.toLocaleString() + suffix;
    }

    // ===== Smooth scroll =====
    function initSmoothScroll() {
        document.querySelectorAll('.nav-links a[href^="#"], .footer-nav a[href^="#"], .hero-cta[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    const offset = 72;
                    const y = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
            });
        });
    }

    // ===== Initialization =====
    function init() {
        renderContent();
        document.body.classList.toggle('motion-reduced', prefersReducedMotion);
        resizeCanvas();
        initPetals();
        createAuroraCanvas();
        resizeAuroraCanvas();
        initAuroraWaves();
        createHeroAuroraOverlay();
        if (!prefersReducedMotion) {
            animatePetals();
            animateAurora();
            updateCursor();
        }
        prepareTextReveal();
        initScrollAnimations();
        initSmoothScroll();
        handleNavScroll();
        updateScrollProgress();
        if (!prefersReducedMotion) handleParallax();
        updateScrollZones();

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleNavScroll();
                    updateScrollProgress();
                    if (!prefersReducedMotion) handleParallax();
                    updateScrollZones();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeCanvas();
                resizeAuroraCanvas();
                initPetals();
                initAuroraWaves();
                if (shootingStars.length > 0) initShootingStars();
                if (!prefersReducedMotion) handleParallax();
                updateScrollZones();
            }, 150);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
                cancelAnimationFrame(auroraId);
            } else if (!prefersReducedMotion) {
                animatePetals();
                animateAurora();
            }
        });

        reducedMotionQuery.addEventListener('change', (event) => {
            prefersReducedMotion = event.matches;
            document.body.classList.toggle('motion-reduced', prefersReducedMotion);
            if (prefersReducedMotion) {
                cancelAnimationFrame(animationId);
                cancelAnimationFrame(auroraId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (auroraCtx && auroraCanvas) auroraCtx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);
                document.querySelectorAll('.stat-number').forEach(setCounterValue);
            } else {
                animatePetals();
                animateAurora();
                updateCursor();
            }
        });

        const heroImg = document.getElementById('hero-image');
        if (heroImg && heroImg.complete) heroImg.classList.add('loaded');
        else if (heroImg) heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
