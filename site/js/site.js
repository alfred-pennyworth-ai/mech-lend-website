// Mech Lend site: theme toggle (Night default, Studio optional) and one quiet reveal for the LTV meter.
(function () {
  var root = document.documentElement;
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function apply(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#f4f4f2' : '#0a0a0a');
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      // The button names the theme it switches to.
      var other = theme === 'light' ? 'Night' : 'Studio';
      toggle.textContent = other;
      toggle.setAttribute('aria-label', 'Switch to ' + other + ' theme');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    var toggle = document.querySelector('.theme-toggle');
    if (toggle) toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('ml-theme', next); } catch (e) {}
    });

    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    // Fill the illustrative unit's meter when it scrolls into view.
    var unit = document.querySelector('.unit');
    if (!unit) return;
    if (!('IntersectionObserver' in window)) { unit.classList.add('is-visible'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { unit.classList.add('is-visible'); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(unit);
  });
})();
