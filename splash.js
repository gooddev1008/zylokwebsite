/**
 * Zylok — splash.js
 * Reusable: Custom cursor, noise overlay, scroll reveal animations
 * Usage: <script src="/splash.js"></script>
 */

(function () {

  // ─── Inject CSS ───────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Custom cursor */
    body { cursor: none; }
    .zylok-cursor {
      position: fixed;
      width: 8px; height: 8px;
      background: #c9a84c;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    }
    .zylok-cursor-ring {
      position: fixed;
      width: 32px; height: 32px;
      border: 1px solid rgba(201,168,76,0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: all 0.15s ease;
    }

    /* Noise overlay */
    .zylok-noise {
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1000;
      opacity: 0.4;
    }

    /* Scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Page fade in */
    .zylok-page-enter {
      animation: zylokFadeIn 0.6s ease both;
    }
    @keyframes zylokFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* Disable cursor on mobile */
    @media (max-width: 900px) {
      body { cursor: auto; }
      .zylok-cursor, .zylok-cursor-ring { display: none; }
    }
  `;
  document.head.appendChild(style);

  // ─── Run after DOM is ready ───────────────────────────
  function init() {

    // Page fade in
    document.body.classList.add('zylok-page-enter');

    // Noise overlay
    const noise = document.createElement('div');
    noise.className = 'zylok-noise';
    document.body.appendChild(noise);

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'zylok-cursor';
    document.body.appendChild(cursor);

    const ring = document.createElement('div');
    ring.className = 'zylok-cursor-ring';
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect on interactive elements
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform    = 'translate(-50%, -50%) scale(1.8)';
        ring.style.borderColor  = 'rgba(201,168,76,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform    = 'translate(-50%, -50%) scale(1)';
        ring.style.borderColor  = 'rgba(201,168,76,0.5)';
      });
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();