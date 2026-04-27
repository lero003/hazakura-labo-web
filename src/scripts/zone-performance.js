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

        const zoneNav = window.HazakuraZoneNav?.create({
            zones: zoneIndexToName,
            onSelect: selectZone
        });
        const zoneAtmosphere = window.HazakuraZoneAtmosphere?.create(zoneIndexToName);

        function getCurrentZone() {
            return currentZone;
        }

        function selectZone(targetZone) {
            const zoneName = zoneIndexToName[targetZone];
            const target = document.querySelector(`section[data-zone="${zoneName}"]`);
            if (!target) return;
            const scrollOffset = window.HazakuraScrollOffset?.get(72) || 72;
            const y = target.getBoundingClientRect().top + window.scrollY - scrollOffset;
            setActiveZone(targetZone, true);
            updateBackgroundZones(targetZone);
            updateSectionZones(targetZone);
            updateAtmosphereBlend(targetZone);
            window.scrollTo({
                top: Math.max(0, y),
                behavior: getPrefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        function setAtmosphereOpacity(zoneName, value) {
            zoneAtmosphere?.setOpacity(zoneName, value);
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

            Object.keys(weights).forEach((zoneName) => {
                setAtmosphereOpacity(zoneName, weights[zoneName] * zoneCaps[zoneName]);
            });
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

        function update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
            const zone = getActiveZoneFromSections();

            setActiveZone(zone);
            updateCursorColor(zone);
            updateHeroContent(scrollTop, zone);
            sakuraEngine?.updateParticleEvolution(zone);
            updateAuroraVisibility(zone);
            updateShootingStars(zone);
            updateBackgroundZones(zone);
            updateSectionZones(zone);
            updateAtmosphereBlend(zone);
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

        function updateSectionZones(zone) {
            const philosophy = document.querySelector('.section-philosophy');
            if (philosophy) {
                switch (zone) {
                    case 2: philosophy.style.background = 'linear-gradient(180deg, var(--warm-50) 0%, #fdf2e0 40%, #fce8d0 60%, var(--warm-50) 100%)'; break;
                    default: philosophy.style.background = ''; break;
                }
            }
            const library = document.querySelector('.section-library');
            if (library) {
                switch (zone) {
                    case 2:
                        library.style.background = 'linear-gradient(180deg, var(--warm-50) 0%, #fdf0dd 40%, #fce2cc 60%, var(--warm-50) 100%)';
                        break;
                    default:
                        library.style.background = '';
                        break;
                }
            }
        }

        updateZoneIndicator();

        return {
            getCurrentZone,
            update
        };
    }

    window.HazakuraZonePerformance = { create };
})();
