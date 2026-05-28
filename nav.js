/**
 * Zylok — nav.js
 * Injects the Zylok nav into any page automatically.
 * Usage: <script src="/nav.js"></script>
 * Optional: <script>ZYLOK_NAV_ACTIVE = 'features';</script> before nav.js to highlight active link
 */

(function () {

  const style = document.createElement('style');
  style.textContent = `
    .zylok-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 60px;
      background: linear-gradient(to bottom, rgba(10,9,5,0.95), transparent);
      transition: background 0.3s;
    }
    .zylok-nav.scrolled {
      background: rgba(10,9,5,0.97);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(201,168,76,0.08);
    }
    .zylok-nav-logo {
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    .zylok-nav-logo-wrap {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      border-radius: 3px;
    }
    .zylok-nav-logo-wrap::after {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(120deg, transparent 0%, rgba(255,220,120,0.0) 30%, rgba(255,220,120,0.55) 50%, rgba(255,220,120,0.0) 70%, transparent 100%);
      pointer-events: none;
    }
    .zylok-nav-logo-wrap:hover::after {
      animation: zylokNavShimmer 2.2s ease forwards;
    }
    @keyframes zylokNavShimmer {
      0%   { left: -100%; }
      100% { left: 160%; }
    }
    .zylok-nav-logo-wrap:hover img {
      filter: drop-shadow(0 0 6px rgba(201,168,76,0.7));
      transition: filter 0.5s ease;
    }
    .zylok-nav-logo img { height: 44px; width: auto; }
    .zylok-nav-links {
      display: flex;
      gap: 40px;
      list-style: none;
      margin: 0; padding: 0;
    }
    .zylok-nav-links a {
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(245,240,232,0.65);
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      transition: color 0.3s;
    }
    .zylok-nav-links a:hover,
    .zylok-nav-links a.active { color: #c9a84c; }
    .zylok-nav-cta {
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #0a0905;
      background: #c9a84c;
      padding: 12px 28px;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      transition: background 0.3s;
    }
    .zylok-nav-cta:hover { background: #e2c97e; }

    @media (max-width: 900px) {
      .zylok-nav { padding: 20px 24px; }
      .zylok-nav-links { display: none; }
    }
  `;
  document.head.appendChild(style);

  function inject() {
    // Determine active page
    const path = window.location.pathname;

    const links = [
      { label: 'Features',      href: '/#features',       key: 'features'  },
      { label: 'Nearby Salons', href: '/nearby-salons',   key: 'nearby'    },
      { label: 'Stories',       href: '/#testimonials',   key: 'stories'   },
      { label: 'List Your Salon', href: '/salon-signup',  key: 'signup'    },
    ];

    const linksHTML = links.map(l => {
      const isActive = path.includes(l.href.replace('/#', '/').replace('/', '')) ? 'active' : '';
      return `<li><a href="${l.href}" class="${isActive}">${l.label}</a></li>`;
    }).join('');

    const nav = document.createElement('nav');
    nav.className = 'zylok-nav';
    nav.innerHTML = `
      <a href="/" class="zylok-nav-logo">
        <div class="zylok-nav-logo-wrap">
          <img src="/logo.svg" height="44" alt="Zylok" />
        </div>
      </a>
      <ul class="zylok-nav-links">
        ${linksHTML}
      </ul>
      <a href="/salon-signup" class="zylok-nav-cta">Get Early Access</a>
    `;

    document.body.prepend(nav);

    // Scroll effect — solid bg on scroll
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();