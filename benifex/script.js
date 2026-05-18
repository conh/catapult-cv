/* ============================================
   HORIZONTAL BAR CHART
============================================ */
function initBarChart() {
    const canvas = document.getElementById('barChart');
    if (!canvas) return;

    new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: [
                'GTM Strategy and Planning',
                'Positioning and Messaging',
                'Function Building and Transformation',
                'Cross-Functional Leadership',
                'Sales Enablement',
                'Segmentation and ICP'
            ],
            datasets: [{
                data: [95, 93, 91, 90, 88, 87],
                backgroundColor: [
                    'rgba(0,168,120,0.85)',
                    'rgba(0,168,120,0.75)',
                    'rgba(0,168,120,0.70)',
                    'rgba(0,201,143,0.75)',
                    'rgba(0,201,143,0.65)',
                    'rgba(0,201,143,0.60)',
                ],
                borderColor: 'transparent',
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: '#00c98f',
                    bodyColor: '#c4cde0',
                    borderColor: 'rgba(0,168,120,0.3)',
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => '  ' + ctx.raw + ' / 99'
                    }
                }
            },
            scales: {
                x: {
                    min: 60,
                    max: 99,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: {
                        color: '#7888a8',
                        font: { family: "'Inter', sans-serif", size: 11 },
                        stepSize: 10
                    },
                    border: { color: 'rgba(255,255,255,0.07)' }
                },
                y: {
                    grid: { display: false },
                    ticks: {
                        color: '#c4cde0',
                        font: { family: "'Inter', sans-serif", size: 12, weight: '500' }
                    },
                    border: { display: false }
                }
            }
        }
    });
}

/* ============================================
   ATTRIBUTE BAR ANIMATIONS
============================================ */
function initAttrBars() {
    const bars = document.querySelectorAll('.attr-fill');
    if (!bars.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const fill = entry.target;
            const row = fill.closest('.attr-row');
            const val = parseInt(row.dataset.value, 10);
            setTimeout(() => {
                fill.style.width = (val / 99 * 100).toFixed(1) + '%';
            }, 80);
            obs.unobserve(fill);
        });
    }, { threshold: 0.3 });

    bars.forEach(b => obs.observe(b));
}

/* ============================================
   COUNTER ANIMATIONS
============================================ */
function animateCount(el, target, duration) {
    const start = performance.now();
    function tick(now) {
        const pct = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - pct, 3);
        el.textContent = Math.floor(ease * target);
        if (pct < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    }
    requestAnimationFrame(tick);
}

function initCounters() {
    const cards = document.querySelectorAll('.stat-card[data-target]');
    if (!cards.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const target = parseInt(card.dataset.target, 10);
            const cval = card.querySelector('.cval');
            if (cval) animateCount(cval, target, 1800);
            obs.unobserve(card);
        });
    }, { threshold: 0.5 });

    cards.forEach(c => obs.observe(c));
}

/* ============================================
   SCROLL FADE-IN ANIMATIONS
============================================ */
function initScrollFade() {
    const els = document.querySelectorAll('.tl-item, .hl-card, .fb-card, .stat-card');

    const obs = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        visible
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((entry, i) => {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 55);
                obs.unobserve(entry.target);
            });
    }, { threshold: 0.08 });

    els.forEach(el => obs.observe(el));
}

/* ============================================
   INIT
============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initBarChart();
    initAttrBars();
    initCounters();
    initScrollFade();
});
