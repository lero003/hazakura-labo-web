// ============================================================
// 叶桜ラボ — Script
// Sakura petals, mouse avoid, scroll, 5 layered zone performance
// ============================================================

(function () {
    'use strict';

    const motionPreferences = window.HazakuraMotionPreferences?.create();
    let prefersReducedMotion = motionPreferences?.matches || false;

    // ===== Sakura/Firefly Canvas =====
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let petals = [];
    let animationId;
    let mouseX = 0, mouseY = 0;
    let targetWindX = 0;
    let windX = 0;

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

    // ===== Aurora Canvas =====
    const auroraEngine = window.HazakuraAuroraCanvas?.create();

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
    const cardHoverFields = window.HazakuraCardHoverFields?.create();
    const bookTilt = window.HazakuraBookTilt?.create();

    function refreshHoverTargets() {
        cardHoverFields?.refresh();
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

    function formatExternalDestination(url) {
        if (!url) return '';
        try {
            return new URL(url, window.location.href).hostname.replace(/^www\./, '');
        } catch {
            return url;
        }
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
                ? (() => {
                    const source = item.paperSample.source;
                    const destination = source ? (source.destination || formatExternalDestination(source.url)) : '';
                    return `<div class="research-paper-sample" aria-label="${escapeHtml(item.paperSample.title || '論文メモサンプル')}">
                    <div class="research-paper-sample__copy">
                        <span>${escapeHtml(item.paperSample.eyebrow || 'Paper memo')}</span>
                        <strong>${escapeHtml(item.paperSample.title || '')}</strong>
                        <p>${escapeHtml(item.paperSample.text || '')}</p>
                        ${source ? `
                            <a class="research-paper-source" href="${escapeHtml(source.url || '#')}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml((source.title || source.label || '論文') + 'を開く')}">
                                <span class="research-paper-source__label">${escapeHtml(source.actionLabel || '外部')}</span>
                                <span class="research-paper-source__copy">
                                    <span class="research-paper-source__hint">${escapeHtml(source.actionHint || source.label || 'Source')}</span>
                                    <strong>${escapeHtml(source.title || '')}</strong>
                                    ${source.note ? `<em>${escapeHtml(source.note)}</em>` : ''}
                                    ${destination ? `<span class="research-paper-source__destination">${escapeHtml(destination)}</span>` : ''}
                                </span>
                                <span class="research-paper-source__icon" aria-hidden="true">↗</span>
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
                </div>`;
                })()
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
                ${renderVisionEntryHandoff(entry.handoff)}
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

    function renderVisionEntryHandoff(handoff) {
        if (!handoff) return '';
        return `
            <p class="vision-entry-question__handoff">
                <span>${escapeHtml(handoff.label || '預けたあと')}</span>
                ${escapeHtml(handoff.text || '')}
            </p>
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
        window.HazakuraQuotePrelude?.render(item);
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
        const cards = items.map((item) => {
            const actionType = getProjectActionType(item);
            const actionIcon = actionType === 'download' ? '↓' : (actionType === 'status' ? '・' : '↗');
            const actionLabel = item.actionLabel || (actionType === 'download' ? 'DL' : (actionType === 'status' ? '準備' : '外部'));
            const actionClass = `project-action project-action--${escapeHtml(actionType)}`;
            const actionText = escapeHtml(item.action || item.status || (actionType === 'download' ? 'Download' : 'Open'));
            const actionHintText = item.actionHint || (actionType === 'status' ? item.statusHint : '');
            const actionHint = actionHintText
                ? `<span class="project-action__hint">${escapeHtml(actionHintText)}</span>`
                : '';
            const actionDestination = formatProjectDestination(item);
            const actionDestinationText = actionDestination
                ? `<span class="project-action__destination">${escapeHtml(actionDestination)}</span>`
                : '';
            const actionAria = actionType === 'download'
                ? `${item.title}をダウンロードする`
                : (actionType === 'status' ? `${item.title}は${item.status || '準備中'}です` : `${item.title}を外部サイトで開く`);
            const thumb = item.image
                ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" class="project-img" loading="lazy" decoding="async">`
                : `<div class="project-thumb-placeholder" ${item.placeholderAlt ? `role="img" aria-label="${escapeHtml(item.placeholderAlt)}"` : 'aria-hidden="true"'}>
                    <span class="placeholder-icon">${escapeHtml(item.placeholderIcon || '🌸')}</span>
                    <span class="placeholder-text">${escapeHtml(item.placeholderText || item.title)}</span>
                </div>`;
            const live = item.href
                ? `<a href="${escapeHtml(item.href)}" class="${actionClass}" aria-label="${escapeHtml(actionAria)}" ${item.download ? 'download' : 'target="_blank" rel="noopener noreferrer"'}><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}${actionDestinationText}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></a>`
                : `<span class="${actionClass} project-action--inactive" role="status" aria-label="${escapeHtml(actionAria)}"><span class="project-action__label">${escapeHtml(actionLabel)}</span><span class="project-action__copy"><span class="project-action__text">${actionText}</span>${actionHint}</span><span class="project-action__icon" aria-hidden="true">${actionIcon}</span></span>`;
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
                <article class="${cardClass}" data-project-card data-lane="${escapeHtml(item.lane || '')}" data-action-type="${escapeHtml(actionType)}" data-tilt>
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
        root.innerHTML = `${laneGuide}${laneFilters}${laneStatus}${cards}`;
        initProjectLaneFilter(root, projectsGroup);
    }

    function initProjectLaneFilter(root, projectsGroup) {
        window.HazakuraProjectFilter?.init(root, projectsGroup);
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

    window.HazakuraPointerInput?.init({
        getDisabled: () => prefersReducedMotion,
        onMove(event) {
            cursorX = event.clientX;
            cursorY = event.clientY;
            targetWindX = (event.movementX || 0) * 0.15;

            cardHoverFields?.update(event);
            bookTilt?.update(event);
        }
    });

    // ===== 5-zone scroll theme: Day → Dusk → Night → Moon → Aurora =====
    let currentZone = 1;

    const zoneNameToIndex = { day: 1, dusk: 2, night: 3, moon: 4, aurora: 5 };
    const zoneIndexToName = ['', 'day', 'dusk', 'night', 'moon', 'aurora'];

    const zoneNav = window.HazakuraZoneNav?.create({
        zones: zoneIndexToName,
        onSelect(targetZone) {
            const zoneName = zoneIndexToName[targetZone];
            const target = document.querySelector(`section[data-zone="${zoneName}"]`);
            if (!target) return;
            const offset = 72;
            const y = target.getBoundingClientRect().top + window.scrollY - offset;
            setActiveZone(targetZone, true);
            updateBackgroundZones(targetZone, 0);
            updateSectionZones(targetZone);
            updateAtmosphereBlend(targetZone);
            window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
    });

    const zoneAtmosphere = window.HazakuraZoneAtmosphere?.create(zoneIndexToName);
    updateZoneIndicator();

    function setAtmosphereOpacity(zoneName, value) {
        if (!zoneAtmosphere) return;
        zoneAtmosphere.setOpacity(zoneName, value);
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
        window.HazakuraHeroAuroraOverlay?.create();
    }

    function updateZoneIndicator() {
        zoneNav?.setActive(currentZone);
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
        if (zone === 4) {
            auroraEngine?.setOpacity('0.15');
        } else if (zone === 5) {
            auroraEngine?.setOpacity('0.5');
        } else if (zone === 3) {
            auroraEngine?.setOpacity('0.3');
        } else {
            auroraEngine?.setOpacity('0');
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

    // ===== Initialization =====
    function init() {
        renderContent();
        motionPreferences?.syncBodyClass();
        window.HazakuraCanvasSize?.resize(canvas);
        initPetals();
        auroraEngine?.mount();
        auroraEngine?.resize();
        auroraEngine?.initWaves();
        createHeroAuroraOverlay();
        if (!prefersReducedMotion) {
            animatePetals();
            auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
            updateCursor();
        }
        window.HazakuraTextReveal?.prepare();
        const scrollAnimations = window.HazakuraScrollAnimations?.init({
            getPrefersReducedMotion: () => prefersReducedMotion
        });
        window.HazakuraSmoothScroll?.init({
            getPrefersReducedMotion: () => prefersReducedMotion
        });
        const scrollIndicators = window.HazakuraScrollIndicators?.create();
        const heroParallax = window.HazakuraHeroParallax?.create();
        scrollIndicators?.update();
        if (!prefersReducedMotion) heroParallax?.update();
        updateScrollZones();
        window.HazakuraCursorHover?.init();

        window.HazakuraScrollTicker?.init({
            onTick() {
                scrollIndicators?.update();
                if (!prefersReducedMotion) heroParallax?.update();
                updateScrollZones();
            }
        });

        window.HazakuraResizeListener?.init({
            onResize() {
                window.HazakuraCanvasSize?.resize(canvas);
                auroraEngine?.resize();
                initPetals();
                auroraEngine?.initWaves();
                if (shootingStars.length > 0) initShootingStars();
                if (!prefersReducedMotion) heroParallax?.update();
                scrollIndicators?.update();
                updateScrollZones();
            }
        });

        window.HazakuraVisibilityPlayback?.init({
            onHidden() {
                window.HazakuraAnimationFrames?.cancelAll(animationId);
                auroraEngine?.stop();
            },
            onVisible() {
                if (prefersReducedMotion) return;
                animatePetals();
                auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
            }
        });

        motionPreferences?.onChange((event) => {
            prefersReducedMotion = event.matches;
            motionPreferences.syncBodyClass();
            if (prefersReducedMotion) {
                window.HazakuraAnimationFrames?.cancelAll(animationId);
                auroraEngine?.stop();
                window.HazakuraCanvasClear?.clearAll(
                    { context: ctx, canvas }
                );
                auroraEngine?.clear();
                scrollAnimations?.setAllCounters();
            } else {
                animatePetals();
                auroraEngine?.start({ getPrefersReducedMotion: () => prefersReducedMotion });
                updateCursor();
            }
        });

        window.HazakuraHeroImageLoader?.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
