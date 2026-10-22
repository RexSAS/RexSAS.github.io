(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Dock: appears once the greeting is scrolled past */
  var dock = document.querySelector('.dock');
  var greet = document.querySelector('.greet');
  var menuBtn = dock.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  var menuOpen = false;
  function setMenu(open) {
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', open);
    menu.classList.toggle('open', open);
    menu.inert = !open;
  }
  function onScroll() {
    var show = window.scrollY > greet.offsetHeight * 0.5;
    dock.classList.toggle('show', show);
    if (!show) setMenu(false);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', function (e) { if (!dock.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) { setMenu(false); menuBtn.focus(); }
  });

  /* Menu: highlights the section currently on screen */
  var menuLinks = menu.querySelectorAll('.menu-list a');
  function spy() {
    var mid = window.innerHeight * 0.4, active = null;
    menuLinks.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target && target.getBoundingClientRect().top <= mid) active = a;
    });
    menuLinks.forEach(function (a) {
      if (a === active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* Language: English is in the HTML, Italian in js/i18n.js. Elements carry data-i18n
     (inner HTML), data-i18n-title, data-i18n-aria or data-i18n-alt; dynamic texts use t(). */
  var IT = window.I18N_IT || {};
  var EN = {
    'lang.label': 'Passa all’italiano',
    'meta.desc': 'Andrea Faveri, computer science student in Ferrara.',
    'trace.loading': 'Loading contributions…',
    'trace.total': 'public contributions in the last year',
    'trace.joke': 'imagine the private ones.',
    'trace.noGraph': 'Contributions are unavailable right now.',
    'trace.noRepos': 'Repositories are unavailable right now. See them on ',
    'trace.gridAria': 'GitHub contributions in the last year',
    'trace.cellOne': 'contribution on',
    'trace.cellMany': 'contributions on',
    'trace.cellNone': 'No',
    'ago.updated': 'updated',
    'ago.today': 'today',
    'ago.yesterday': 'yesterday',
    'ago.days': '{n} days ago',
    'ago.month': '1 month ago',
    'ago.months': '{n} months ago',
    'ago.year': '1 year ago',
    'ago.years': '{n} years ago',
    'trace.pinTag': 'pinned',
    'foot.copied': 'copied'
  };
  var langBtn = dock.querySelector('.lang');
  var lang = 'en';
  // English by default; once a visitor switches, the choice is remembered (localStorage)
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) {}
  if (lang !== 'it') lang = 'en';
  var langHooks = [];
  function t(key, n) {
    var s = (lang === 'it' && IT[key] != null) ? IT[key] : EN[key];
    return n != null ? String(s).replace('{n}', n) : s;
  }
  var ATTRS = [['data-i18n-title', 'title'], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function translate(root, animate) {
    root.querySelectorAll('[data-i18n]').forEach(function (n) {
      if (n._en == null) n._en = n.innerHTML;
      var html = lang === 'it' && IT[n.dataset.i18n] != null ? IT[n.dataset.i18n] : n._en;
      if (html === n.innerHTML) return;
      if (animate && n.classList.contains('head') && !reduced) {
        var tmp = document.createElement('div'); tmp.innerHTML = html;
        decrypt(n, tmp.textContent, 700);
      } else n.innerHTML = html;
    });
    ATTRS.forEach(function (pair) {
      root.querySelectorAll('[' + pair[0] + ']').forEach(function (n) {
        var store = '_en_' + pair[1];
        if (n[store] == null) n[store] = n.getAttribute(pair[1]);
        var key = n.getAttribute(pair[0]);
        n.setAttribute(pair[1], lang === 'it' && IT[key] != null ? IT[key] : n[store]);
      });
    });
  }
  function setLang(l, animate) {
    lang = l;
    document.documentElement.lang = l;
    langBtn.textContent = l === 'it' ? 'EN' : 'IT';
    langBtn.setAttribute('aria-label', t('lang.label'));
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));
    translate(document, animate);
    langHooks.forEach(function (fn) { fn(); });
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  langBtn.addEventListener('click', function () { setLang(lang === 'en' ? 'it' : 'en', true); });

  /* Decrypt: characters resolve one by one out of hex noise */
  var GLYPHS = '0123456789ABCDEF#%&*+<>/\\=?$';
  function decrypt(el, text, duration) {
    if (el._decrypt) cancelAnimationFrame(el._decrypt);
    if (reduced) { el.textContent = text; return; }
    duration = duration || 900;
    var start = performance.now();
    var chars = Array.from(text);
    var at = chars.map(function () { return Math.random() * 0.75 + 0.15; });
    function frame(now) {
      var p = Math.min(1, (now - start) / duration);
      var out = '';
      for (var i = 0; i < chars.length; i++) {
        var c = chars[i];
        if (c === ' ' || p >= at[i]) out += c;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._decrypt = requestAnimationFrame(frame);
      else el._decrypt = null;
    }
    el._decrypt = requestAnimationFrame(frame);
  }

  /* Greetings: decrypts in, then cycles through languages every 5 seconds */
  var GREETINGS = [
    ['en', 'Greetings'], ['it', 'Saluti'], ['fr', 'Salutations'], ['de', 'Grüße'],
    ['es', 'Saludos'], ['pt', 'Saudações'], ['nl', 'Groeten'], ['sv', 'Hälsningar'],
    ['pl', 'Pozdrowienia'], ['el', 'Χαιρετισμούς'], ['ru', 'Приветствия'], ['ja', 'ご挨拶']
  ];
  var word = document.querySelector('.greet-word span');
  var g = 0;
  function showGreeting(i) {
    word.lang = GREETINGS[i][0];
    decrypt(word, GREETINGS[i][1], 1100);
  }
  if (!reduced) {
    setTimeout(function () { showGreeting(0); }, 200);
    setInterval(function () {
      if (document.hidden || window.scrollY > greet.offsetHeight) return;
      g = (g + 1) % GREETINGS.length;
      showGreeting(g);
    }, 5000);
  }

  /* Scroll hint: fades in after 10 seconds without scrolling on the greeting */
  var hint = document.querySelector('.greet-hint');
  var hintTimer;
  function armHint() {
    hint.classList.remove('show');
    clearTimeout(hintTimer);
    if (window.scrollY > 10) return;
    hintTimer = setTimeout(function () { hint.classList.add('show'); }, 10000);
  }
  window.addEventListener('scroll', armHint, { passive: true });
  armHint();

  /* The road so far: the hovered row's photo fills that row's band, sliding from row
     to row and cross-fading between two layers */
  var road = document.querySelector('.road');
  var band = road.querySelector('.road-bg');
  var layers = band.querySelectorAll('span');
  var front = 0, current = null;
  var ratios = {};
  function placeBand(row, src, fit) {
    var r = row.getBoundingClientRect(), s = road.getBoundingClientRect();
    var logo = fit === 'logo';
    // Photos: 80% of the row's width, as tall as their own proportions, centred on it.
    // Logos stay inside the row.
    var w = logo ? r.width : r.width * 0.8;
    var h = logo || !ratios[src] ? r.height : w * ratios[src];
    band.classList.toggle('jump', !current);
    band.classList.toggle('is-logo', logo);
    band.style.left = (r.left - s.left + (r.width - w) / 2) + 'px';
    band.style.width = w + 'px';
    band.style.top = (r.top - s.top + (r.height - h) / 2) + 'px';
    band.style.height = h + 'px';
  }
  function showBg(src, fit, row) {
    if (row && src) placeBand(row, src, fit);
    if (src === current) return;
    current = src;
    if (!src) { layers.forEach(function (l) { l.classList.remove('on'); }); return; }
    front = 1 - front;
    layers[front].style.backgroundImage = 'url("' + src + '")';
    layers[front].classList.toggle('logo', fit === 'logo');
    layers[front].classList.add('on');
    layers[1 - front].classList.remove('on');
  }
  road.querySelectorAll('.road-row').forEach(function (row) {
    var src = row.dataset.img;
    if (src) {
      var im = new Image();
      im.onload = function () { if (im.naturalWidth) ratios[src] = im.naturalHeight / im.naturalWidth; };
      im.src = src;
    }
    function on() { showBg(row.dataset.img || null, row.dataset.fit, row); }
    row.addEventListener('mouseenter', on);
    row.addEventListener('focus', on);
  });
  road.querySelector('.road-list').addEventListener('mouseleave', function () { showBg(null); });
  road.addEventListener('focusout', function (e) { if (!road.contains(e.relatedTarget)) showBg(null); });

  /* Keep track of me: live data from GitHub, cached for an hour per visitor */
  var USER = 'RexSAS';
  var HIDDEN_REPOS = ['RexSAS.github.io-backup'];
  function cached(key, url, ttl) {
    ttl = ttl || 3600000;
    try {
      var hit = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (hit && Date.now() - hit.t < ttl) return Promise.resolve(hit.v);
    } catch (e) {}
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (v) {
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: v })); } catch (e) {}
      return v;
    });
  }
  function ago(iso) {
    var days = Math.floor((Date.now() - new Date(iso)) / 86400000);
    if (days < 1) return t('ago.today');
    if (days === 1) return t('ago.yesterday');
    if (days < 30) return t('ago.days', days);
    var months = Math.floor(days / 30);
    if (months < 12) return months === 1 ? t('ago.month') : t('ago.months', months);
    var years = Math.floor(days / 365);
    return years === 1 ? t('ago.year') : t('ago.years', years);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var grid = document.querySelector('.graph-grid');
  var total = document.querySelector('.graph-total');
  cached('gh-contrib', 'https://github-contributions-api.jogruber.de/v4/' + USER + '?y=last').then(function (d) {
    var days = d.contributions;
    var pad = new Date(days[0].date + 'T00:00:00').getDay();
    var frag = document.createDocumentFragment();
    for (var p = 0; p < pad; p++) frag.appendChild(el('i', 'pad'));
    var cells = days.map(function (day, i) {
      var c = el('i', 'l' + day.level);
      c.style.setProperty('--d', Math.floor((i + pad) / 7) * 14 + 'ms');
      frag.appendChild(c);
      return c;
    });
    grid.appendChild(frag);
    var n = d.total.lastYear;
    total.innerHTML = '';
    total.appendChild(el('strong', null, String(n)));
    total.appendChild(document.createTextNode(' '));
    var label = el('span', null, EN['trace.total']); label.dataset.i18n = 'trace.total';
    var joke = el('span', 'graph-joke', EN['trace.joke']); joke.dataset.i18n = 'trace.joke';
    total.appendChild(label); total.appendChild(joke);
    translate(total);
    function graphTexts() {
      var locale = lang === 'it' ? 'it-IT' : 'en-GB';
      cells.forEach(function (c, i) {
        var day = days[i];
        var when = new Date(day.date + 'T00:00:00').toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        c.title = (day.count || t('trace.cellNone')) + ' ' + t(day.count === 1 ? 'trace.cellOne' : 'trace.cellMany') + ' ' + when;
      });
      grid.setAttribute('aria-label', n + ' ' + t('trace.gridAria'));
    }
    graphTexts();
    langHooks.push(graphTexts);
    var scroll = grid.parentNode;
    scroll.scrollLeft = scroll.scrollWidth;
  }).catch(function () {
    total.innerHTML = '';
    var msg = el('span', null, EN['trace.noGraph']); msg.dataset.i18n = 'trace.noGraph';
    total.appendChild(msg); translate(total);
  });

  /* Follow button: live follower count */
  var followCount = document.querySelector('.follow-count');
  cached('gh-user', 'https://api.github.com/users/' + USER).then(function (u) {
    followCount.textContent = u.followers;
    followCount.hidden = false;
  }).catch(function () {});

  var repoList = document.querySelector('.repos');

  /* Pinned repos: GitHub's API only exposes them with a token, so a public service reads them
     from the profile page. Pin or unpin on GitHub and the site follows. Pinned repos also stay
     in the "recently updated" list below, tagged "pinned". */
  var pinnedNames = {};
  var pinnedBox = document.querySelector('.pinned');
  // The service sends max-age=14400 (4 h); a query string that changes every 5 minutes gets
  // past that cache and the CDN, so a new pin shows up within about 5 minutes.
  var FIVE_MIN = 300000;
  var bucket = Math.floor(Date.now() / FIVE_MIN);
  cached('gh-pinned', 'https://pinned.berrysauce.dev/get/' + USER + '?t=' + bucket, FIVE_MIN).then(function (pins) {
    if (!pins || !pins.length) return;
    var ul = pinnedBox.querySelector('.pins');
    pins.forEach(function (r, i) {
      pinnedNames[r.name] = true;
      var row = repoList.querySelector('[data-repo="' + r.name + '"]');
      if (row) row.classList.add('is-pinned');
      var li = el('li');
      li.style.setProperty('--d', i * 90 + 'ms');
      var a = el('a', 'pin');
      a.href = 'https://github.com/' + r.author + '/' + r.name; a.target = '_blank'; a.rel = 'noopener';
      var name = el('span', 'pin-name', r.name.replace(/[_-]/g, ' '));
      var go = el('span', 'road-go', '↗'); go.setAttribute('aria-hidden', 'true');
      name.appendChild(go);
      a.appendChild(name);
      a.appendChild(el('span', 'pin-desc', r.description || ''));
      var meta = el('span', 'pin-meta');
      if (r.language) {
        var lang = el('span', 'pin-lang', r.language);
        if (r.languageColor) lang.style.setProperty('--lc', r.languageColor);
        meta.appendChild(lang);
      }
      if (r.stars) meta.appendChild(el('span', null, '★ ' + r.stars));
      if (r.forks) meta.appendChild(el('span', null, 'Forks ' + r.forks));
      a.appendChild(meta);
      li.appendChild(a);
      ul.appendChild(li);
    });
    pinnedBox.hidden = false;
  }).catch(function () {});

  cached('gh-repos', 'https://api.github.com/users/' + USER + '/repos?sort=pushed&per_page=30').then(function (repos) {
    repos.filter(function (r) { return !r.fork && !r.archived && HIDDEN_REPOS.indexOf(r.name) < 0; })
      .slice(0, 6)
      .forEach(function (r, i) {
        var li = el('li');
        li.dataset.repo = r.name;
        if (pinnedNames[r.name]) li.classList.add('is-pinned');
        li.style.setProperty('--d', i * 90 + 'ms');
        var a = el('a', 'repo');
        a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener';
        var name = el('span', 'repo-name', r.name.replace(/[_-]/g, ' '));
        name.appendChild(el('span', 'road-go', '↗'));
        name.lastChild.setAttribute('aria-hidden', 'true');
        var tag = el('span', 'repo-pin', EN['trace.pinTag']); tag.dataset.i18n = 'trace.pinTag';
        name.appendChild(tag); translate(tag.parentNode);
        a.appendChild(name);
        a.appendChild(el('span', 'repo-desc', r.description || ''));
        var meta = el('span', 'repo-meta');
        if (r.language) { meta.appendChild(el('span', 'repo-lang', r.language)); meta.appendChild(document.createTextNode(' · ')); }
        var when = el('span', 'repo-ago'); when.dataset.pushed = r.pushed_at;
        when.textContent = t('ago.updated') + ' ' + ago(r.pushed_at);
        meta.appendChild(when);
        a.appendChild(meta);
        li.appendChild(a);
        repoList.appendChild(li);
      });
  }).catch(function () {
    var li = el('li', 'trace-note');
    var msg = el('span', null, EN['trace.noRepos']); msg.dataset.i18n = 'trace.noRepos';
    li.appendChild(msg); translate(li);
    var a = el('a', null, 'github.com/' + USER); a.href = 'https://github.com/' + USER;
    li.appendChild(a); li.appendChild(document.createTextNode('.'));
    repoList.appendChild(li);
  });

  langHooks.push(function () {
    repoList.querySelectorAll('.repo-ago').forEach(function (s) { s.textContent = t('ago.updated') + ' ' + ago(s.dataset.pushed); });
    document.querySelectorAll('[data-copy]').forEach(function (b) { b.dataset.copied = t('foot.copied'); });
  });
  setLang(lang, false);

  /* Footer: Discord has no profile link, so the button copies the username */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(btn.dataset.copy).then(function () {
        btn.classList.add('copied');
        setTimeout(function () { btn.classList.remove('copied'); }, 1600);
      });
    });
  });

  /* Section entrances */
  if (!('IntersectionObserver' in window) || reduced) {
    document.querySelectorAll('.reveal, .shelf').forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var groups = new Map();
  document.querySelectorAll('.reveal').forEach(function (el) {
    var section = el.closest('section') || document.body;
    var n = groups.get(section) || 0;
    el.style.setProperty('--d', (n * 120) + 'ms');
    groups.set(section, n + 1);
  });
  document.querySelectorAll('.spine').forEach(function (el, i) {
    el.style.setProperty('--d', (i * 28) + 'ms');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal, .shelf').forEach(function (el) { io.observe(el); });
})();
