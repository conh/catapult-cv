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
    initAttrBars();
    initCounters();
    initScrollFade();
});
