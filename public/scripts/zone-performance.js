(function () {
    'use strict';

    const zoneNameToIndex = { day: 1, dusk: 2, night: 3, moon: 4, aurora: 5 };
    const zoneIndexToName = ['', 'day', 'dusk', 'night', 'moon', 'aurora'];
    const zoneCaps = { day: 0.08, dusk: 0.16, night: 0.2, moon: 0.18, aurora: 0.22 };
    const cursorColors = [
        '',
        'rgba(255,255,255,0.5)',
        'rgba(232,168,124,0.6)',
        'rgba(133,129,231,0.6)',
        'rgba(167,139,250,0.6)',
        'rgba(52,211,153,0.6)'
    ];
    const defaultBlobColors = [
        'radial-gradient(circle, var(--sakura-500), transparent 70%)',
        'radial-gradient(circle, var(--purple-400), transparent 70%)',
        'radial-gradient(circle, var(--green-400), transparent 70%)',
        'radial-gradient(circle, var(--sakura-300), transparent 70%)'
    ];

    function create(options = {}) {
        const {
            canvas,
            getPrefersReducedMotion = () => false,
            sakuraEngine,
            auroraEngine,
            shootingStars
        } = options;

        let currentZone = 1;

        const sections = Array.from(document.querySelectorAll('section[data-zone]'));
        const availableZoneNames = [...new Set(sections.map((s) => s.dataset.zone))];
        const availableZoneIndices = availableZoneNames.map((n) => zoneNameToIndex[n]).filter(Boolean).sort();
        const isSingleZone = availableZoneIndices.length <= 1;

        const zoneNav = isSingleZone
            ? null
            : window.HazakuraZoneNav?.create({
                zones: ['', ...availableZoneNames],
                onSelect: selectZone
            });
        const zoneAtmosphere = window.HazakuraZoneAtmosphere?.create(['', ...availableZoneNames]);

        function getCurrentZone() {
            return currentZone;
        }

        function selectZone(targetZone) {
            const zoneName = zoneIndexToName[targetZone];
            const target = document.querySelector(`section[data-zone="${zoneName}"]`);
            if (!target) return;
            setActiveZone(targetZone, true);
            updateBackgroundZones(targetZone);
            updateAtmosphereBlend(targetZone);
            window.HazakuraScrollTarget?.scrollTo(target, {
                getPrefersReducedMotion
            });
        }

        function setAtmosphereOpacity(zoneName, value) {
            zoneAtmosphere?.setOpacity(zoneName, value);
        }

        function updateAtmosphereBlend(zone) {
            if (!zoneAtmosphere) return;
            const activeName = zoneIndexToName[zone];
            const weights = { day: 0, dusk: 0, night: 0, moon: 0, aurora: 0 };
            weights[activeName] = 1;

            const activeSection = sections.find((section) => section.dataset.zone === activeName);
            if (activeSection && !isSingleZone) {
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

            Object.keys(weights).forEach((zoneName) => {
                setAtmosphereOpacity(zoneName, weights[zoneName] * zoneCaps[zoneName]);
            });
        }

        function updateZoneIndicator() {
            zoneNav?.setActive(currentZone);
        }

        function update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
            const zone = isSingleZone ? currentZone : getActiveZoneFromSections();

            setActiveZone(zone);
            updateCursorColor(zone);
            updateHeroContent(scrollTop, zone);
            sakuraEngine?.updateParticleEvolution(zone);
            updateAuroraVisibility(zone);
            updateShootingStars(zone);
            updateBackgroundZones(zone);
            updateAtmosphereBlend(zone);
        }

        function getActiveZoneFromSections() {
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

        function updateCursorColor(zone) {
            const cursorRing = document.getElementById('cursor-ring');
            if (cursorRing) {
                cursorRing.style.borderColor = cursorColors[zone] || cursorColors[1];
            }
        }

        function updateHeroContent(scrollTop, zone) {
            const heroContent = document.querySelector('.hero-content');
            if (!heroContent) return;
            if (zone >= 3) {
                heroContent.style.opacity = 1;
            } else {
                heroContent.style.opacity = Math.max(0, 1 - scrollTop / (window.innerHeight * 0.7));
            }
        }

        function updateAuroraVisibility(zone) {
            if (zone === 4) {
                auroraEngine?.setOpacity('0.15');
            } else if (zone === 5) {
                auroraEngine?.setOpacity('0.5');
            } else if (zone === 3) {
                auroraEngine?.setOpacity('0.3');
            } else {
                auroraEngine?.setOpacity('0');
            }
        }

        function updateShootingStars(zone) {
            if (zone === 4 && canvas) {
                shootingStars?.ensure(canvas.width, canvas.height);
            } else {
                shootingStars?.deactivate();
            }
        }

        function updateBackgroundZones(zone) {
            const hero = document.querySelector('.hero');
            if (!hero) return;

            const heroMesh = hero.querySelector('.hero-mesh');
            if (heroMesh) {
                switch (zone) {
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

            const heroOverlay = hero.querySelector('.hero-overlay');
            if (heroOverlay) {
                switch (zone) {
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
            blobs.forEach((blob, index) => {
                blob.style.background = defaultBlobColors[index] || '';
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

        if (isSingleZone && availableZoneIndices.length === 1) {
            currentZone = availableZoneIndices[0];
            setActiveZone(currentZone, true);
            updateAtmosphereBlend(currentZone);
        }

        updateZoneIndicator();

        return {
            getCurrentZone,
            update
        };
    }

    window.HazakuraZonePerformance = { create };
})();
