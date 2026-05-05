/* ============================================
   COUNTER ANIMATIONS
============================================ */
function initCounters() {
    const cards = document.querySelectorAll('.stat-card[data-target]');
    if (!cards.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const target = parseInt(card.dataset.target, 10);
            const cval = card.querySelector('.cval');
            if (!cval) return;
            let start = null;
            const duration = 1800;
            function tick(now) {
                if (!start) start = now;
                const pct = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - pct, 3);
                cval.textContent = Math.floor(ease * target);
                if (pct < 1) requestAnimationFrame(tick);
                else cval.textContent = target;
            }
            requestAnimationFrame(tick);
            obs.unobserve(card);
        });
    }, { threshold: 0.5 });
    cards.forEach(c => obs.observe(c));
}

/* ============================================
   SCORECARD BAR ANIMATIONS
============================================ */
function initScorecardBars() {
    const bars = document.querySelectorAll('.sc-bar-fill');
    if (!bars.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            const w = target.style.cssText.match(/--w:\s*([^;]+)/)?.[1] || '80%';
            setTimeout(() => { target.style.width = w; }, 50);
            obs.unobserve(target);
        });
    }, { threshold: 0.3 });
    bars.forEach(b => { b.style.width = '0%'; obs.observe(b); });
}

/* ============================================
   SCROLL FADE-IN
============================================ */
function initScrollFade() {
    const els = document.querySelectorAll('.tl-item, .hl-card, .fb-card, .stat-card');
    const obs = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((entry, i) => {
                setTimeout(() => entry.target.classList.add('visible'), i * 55);
                obs.unobserve(entry.target);
            });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initScorecardBars();
    initScrollFade();
});
