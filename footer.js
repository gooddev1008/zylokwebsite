/**
 * Zylok — footer.js
 * Injects the Zylok footer into any page automatically.
 * Usage: <script src="/footer.js"></script>
 */

(function () {

  const style = document.createElement('style');
  style.textContent = `
    .zylok-footer {
      border-top: 1px solid rgba(201,168,76,0.1);
      padding: 50px 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      background: #0a0905;
    }
    .zylok-footer-logo img {
      height: 36px;
      width: auto;
      opacity: 0.85;
      transition: opacity 0.3s;
    }
    .zylok-footer-logo img:hover { opacity: 1; }
    .zylok-footer-copy {
      font-size: 11px;
      letter-spacing: 0.1em;
      color: rgba(245,240,232,0.25);
      font-family: 'DM Sans', sans-serif;
    }
    .zylok-footer-links {
      display: flex;
      gap: 32px;
      list-style: none;
      margin: 0; padding: 0;
      flex-wrap: wrap;
    }
    .zylok-footer-links a {
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(245,240,232,0.35);
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      transition: color 0.3s;
    }
    .zylok-footer-links a:hover { color: #c9a84c; }

    @media (max-width: 900px) {
      .zylok-footer {
        padding: 40px 24px;
        flex-direction: column;
        text-align: center;
      }
      .zylok-footer-links { justify-content: center; }
    }
  `;
  document.head.appendChild(style);

  function inject() {
    const footer = document.createElement('footer');
    footer.className = 'zylok-footer';
    footer.innerHTML = `
      <div class="zylok-footer-logo">
        <a href="/" class="zylok-nav-logo">
            <div class="zylok-nav-logo-wrap">
                <img src="/logo.svg" height="36" alt="Zylok" />
             </div>
         </a>
       </div>
      <p class="zylok-footer-copy">© 2025 Zylok · zylok.in · All rights reserved.</p>
      <ul class="zylok-footer-links">
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="mailto:contact@zylok.in">contact@zylok.in</a></li>
        <li><a href="tel:+919026377643">+91 90263 77643</a></li>
      </ul>
    `;

    document.body.appendChild(footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();