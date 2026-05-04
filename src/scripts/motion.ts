/**
 * Single entry point for all client-side motion. Imported once from BaseLayout.
 * Honors prefers-reduced-motion: when reduced, all enhancements no-op.
 */

import { animate } from 'motion';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const html = document.documentElement;

// 1. Mark JS as ready so .reveal can hide for animation.
//    Without this class, .reveal stays visible (no-JS fallback).
if (!reduceMotion) html.classList.add('js-ready');

// ─── 2. Hero H1 line-mask reveal (each word rises from below a clip mask)
function setupWordStagger() {
  const h1 = document.querySelector('.hero-h1');
  if (!h1 || reduceMotion) return;
  const text = h1.textContent ?? '';
  const words = text.trim().split(/\s+/);
  h1.innerHTML = words
    .map(
      (w, i) =>
        `<span class="word-mask"><span class="word-inner" style="--word-i:${i}">${w}</span></span>`
    )
    .join(' ');
}

// ─── 3. Scroll reveals via IntersectionObserver ───────────────────────────
function setupReveals() {
  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ─── 4. Header scrolled state (shadow appears once page scrolled) ─────────
function setupHeaderScrollState() {
  let last = false;
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    if (scrolled !== last) {
      html.classList.toggle('scrolled', scrolled);
      last = scrolled;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── 5. Stat counters (Hero stats animate from 0 to target) ───────────────
function setupStatCounters() {
  if (reduceMotion) return;
  const counters = document.querySelectorAll<HTMLElement>('.stat-num');
  if (!counters.length) return;

  // Capture target from HTML immediately, then reset to 0 so initial paint
  // shows 0 before animation kicks off.
  counters.forEach((el) => {
    const target = parseInt(el.textContent || '0', 10);
    if (Number.isNaN(target)) return;
    el.dataset.target = String(target);
    el.textContent = '0';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.target || 0);
        if (!target) return;
        animate(0, target, {
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest: number) => {
            el.textContent = String(Math.round(latest));
          },
          onComplete: () => {
            // Coral pulse on completion — small visual reward
            el.classList.add('counter-done');
            setTimeout(() => el.classList.remove('counter-done'), 600);
          },
        });
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

// ─── 8. H2 coral underline draw-in (per-section editorial accent) ─────────
function setupH2Underlines() {
  const h2s = document.querySelectorAll<HTMLHeadingElement>('h2');
  h2s.forEach((h2) => {
    if (h2.querySelector('.h2-line')) return;
    const line = document.createElement('span');
    line.className = 'h2-line';
    h2.appendChild(line);
  });
  if (reduceMotion) {
    document.querySelectorAll('.h2-line').forEach((l) => l.classList.add('drawn'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const line = entry.target.querySelector('.h2-line');
        if (line) line.classList.add('drawn');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  h2s.forEach((h2) => observer.observe(h2));
}

// ─── 6. Hero image parallax (subtle translateY on scroll) ─────────────────
function setupHeroParallax() {
  if (reduceMotion) return;
  const img = document.querySelector<HTMLElement>('.hero-img');
  const heroSection = document.querySelector<HTMLElement>('.hero');
  if (!img || !heroSection) return;

  let ticking = false;
  const update = () => {
    const rect = heroSection.getBoundingClientRect();
    // Only animate while hero is roughly in viewport
    if (rect.bottom < -100 || rect.top > window.innerHeight) {
      ticking = false;
      return;
    }
    const offset = window.scrollY * 0.06;
    img.style.transform = `translate3d(0, ${-offset}px, 0)`;
    ticking = false;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── 7. Hero image cursor-aware tilt (subtle 3D rotate on mousemove) ──────
function setupHeroCursorTilt() {
  if (reduceMotion) return;
  if (window.matchMedia('(hover: none)').matches) return; // skip touch devices
  const wrap = document.querySelector<HTMLElement>('.hero-image-wrap');
  if (!wrap) return;

  let raf = 0;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  const tick = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    wrap.style.transform = `perspective(1200px) rotateX(${currentY * -1.5}deg) rotateY(${currentX * 1.5}deg)`;
    if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };
  const ensureTick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    targetX = (e.clientX - rect.left) / rect.width - 0.5;
    targetY = (e.clientY - rect.top) / rect.height - 0.5;
    ensureTick();
  });
  wrap.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    ensureTick();
  });
}

// ─── Bootstrap ────────────────────────────────────────────────────────────
function init() {
  setupWordStagger();
  setupReveals();
  setupHeaderScrollState();
  setupStatCounters();
  setupHeroParallax();
  setupHeroCursorTilt();
  setupH2Underlines();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
