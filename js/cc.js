/* CyberChallenge page: title decrypt, number count-up, scroll entrances and the EN/IT switch
   (same remembered choice as the home page). */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var IT = {
    'cc.back': '← Andrea Faveri',
    'cc.kicker': '2023 → 2024 · Ferrara, Torino',
    'cc.lede': 'Quattro mesi di formazione sulla sicurezza all’Università di Ferrara, otto ore di attacco e difesa a Torino e, un anno dopo, di nuovo lì <em class="trait">dall’altra parte della cattedra</em>.',
    'cc.s1': 'ore di formazione',
    'cc.s2': 'su 20 nella selezione locale',
    'cc.s2sup': '°',
    'cc.s3': 'su 42 squadre alla finale nazionale',
    'cc.s3sup': 'ª',
    'cc.s4': 'ore di attacco/difesa',
    'map.kicker': 'Il programma, in mappa',
    'map.title': 'Cosa ho imparato',
    'map.hint': 'Passa su una materia per aprirla, clicca per tenerla aperta, trascina i punti.',
    'map.lgSubject': 'Materia',
    'map.lgLang': 'Linguaggio',
    'map.lgTool': 'Strumento',
    'map.lgAttack': 'Tecnica',
    'map.lgConcept': 'Concetto',
    'map.subjects': 'Materie',
    'fin.kicker': '29 giugno 2023 · Torino',
    'fin.title': 'La finale',
    'fin.lede': 'Al Centro Internazionale di Formazione dell’ILO di Torino, 42 squadre hanno giocato <em class="trait">otto ore di attacco/difesa</em>. Ogni squadra riceve gli stessi servizi vulnerabili e deve tenere in piedi i propri mentre attacca quelli degli altri. Un round funziona così:',
    'fin.round': 'Round',
    'fin.s1': 'Trova la falla',
    'fin.s2': 'Scrivi la patch',
    'fin.s3': 'Scrivi l’exploit',
    'fin.n1': 'squadre',
    'fin.n2': 'partecipanti',
    'fin.n3': 'flag rubate',
    'fin.n4': 'di traffico di rete',
    'fin.result': 'La squadra 0xFE ha chiuso <strong>22ª su 42</strong> con oltre <strong>26.500 punti</strong>.',
    'fin.ranking': 'Vedi la classifica completa ↗',
    'bug.kicker': 'Tocca a te',
    'bug.title': 'Trova il bug',
    'bug.lede': 'Cinque snippet, una falla ciascuno, il tipo di cosa che cerchi nei primi minuti di un round di attacco/difesa. <em class="trait">Clicca la riga che un attaccante prenderebbe di mira.</em>',
    'bug.askK': 'Trova la falla',
    'bug.fix': 'La correzione',
    'bug.endK': 'Revisione completata',
    'bug.again': 'Gioca ancora',
    'tut.kicker': 'Dal 2024 · Università di Ferrara',
    'tut.title': 'Un anno dopo, da tutor',
    'tut.alt': 'Andrea mostra una demo agli studenti di CyberChallenge in un laboratorio universitario',
    'tut.p1': 'Grazie al mio piazzamento a Ferrara, nel 2024 sono tornato a CyberChallenge.IT <em class="trait">dall’altra parte della cattedra</em>. Ho seguito i nuovi studenti nei laboratori dell’università e li ho aiutati a prepararsi per la gara nazionale, perché la loro squadra arrivasse più lontano di noi.',
    'tut.taught': 'Cosa ho insegnato',
    'tut.t1': 'Sicurezza delle reti',
    'tut.t2': 'Sicurezza del software',
    'tut.t3': 'Gioco di attacco/difesa',
    'tut.stat': 'studenti della mia classe sono arrivati alla finale nazionale.',
    'tut.note': 'Ufficialmente è stato il 2024, ma ho continuato a dare una mano anche alle classi successive.',
    'tut.press': 'L’Università di Ferrara ne ha scritto:',
    'tut.l1': 'la squadra UniFE ↗',
    'tut.l2': 'la finale 2023 ↗',
    'foot.home': 'Torna alla home',
    'foot.copyTitle': 'Copia il nome utente Discord',
    'foot.copyAria': 'Discord: copia il nome utente rexsas',
    'meta.desc': 'Andrea Faveri a CyberChallenge.IT: la formazione a Ferrara, la finale nazionale attacco/difesa a Torino e il tutoraggio della classe successiva.'
  };

  /* Language */
  var langBtn = document.querySelector('.lang');
  var lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) {}
  var desc = document.querySelector('meta[name="description"]');
  var descEn = desc.getAttribute('content');
  function setLang(l) {
    lang = l === 'it' ? 'it' : 'en';
    document.documentElement.lang = lang;
    langBtn.textContent = lang === 'it' ? 'EN' : 'IT';
    langBtn.setAttribute('aria-label', lang === 'it' ? 'Switch to English' : 'Passa all’italiano');
    desc.setAttribute('content', lang === 'it' ? IT['meta.desc'] : descEn);
    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      if (n._en == null) n._en = n.innerHTML;
      n.innerHTML = lang === 'it' && IT[n.dataset.i18n] != null ? IT[n.dataset.i18n] : n._en;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (n) {
      if (n._enAria == null) n._enAria = n.getAttribute('aria-label');
      var k = n.dataset.i18nAria;
      n.setAttribute('aria-label', lang === 'it' && IT[k] != null ? IT[k] : n._enAria);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (n) {
      if (n._enAlt == null) n._enAlt = n.getAttribute('alt');
      var k = n.dataset.i18nAlt;
      n.setAttribute('alt', lang === 'it' && IT[k] != null ? IT[k] : n._enAlt);
    });
    document.querySelectorAll('[data-copy]').forEach(function (b) {
      if (b._enTitle == null) { b._enTitle = b.title; b._enAria = b.getAttribute('aria-label'); }
      b.title = lang === 'it' ? IT['foot.copyTitle'] : b._enTitle;
      b.setAttribute('aria-label', lang === 'it' ? IT['foot.copyAria'] : b._enAria);
      b.dataset.copied = lang === 'it' ? 'copiato' : 'copied';
    });
    if (window.ccMap) window.ccMap.setLang(lang);
    if (window.ccFinal) window.ccFinal.setLang(lang);
    if (window.ccBug) window.ccBug.setLang(lang);
    document.querySelectorAll('.count').forEach(function (n) { if (n.dataset.done) n.textContent = fmt(+n.dataset.to); });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  setLang(lang);
  langBtn.addEventListener('click', function () { setLang(lang === 'en' ? 'it' : 'en'); });

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

  /* Title: characters resolve out of hex noise, like the home page greeting */
  var GLYPHS = '0123456789ABCDEF#%&*+<>/\\=?$';
  var title = document.querySelector('.cc-title span');
  if (!reduced) {
    var text = title.textContent, chars = Array.from(text), start = null;
    var at = chars.map(function () { return Math.random() * 0.75 + 0.15; });
    title.textContent = chars.map(function () { return ' '; }).join('');
    requestAnimationFrame(function frame(now) {
      if (start == null) start = now;
      var p = Math.min(1, (now - start - 250) / 1300), out = '';
      for (var i = 0; i < chars.length; i++) {
        out += p >= at[i] ? chars[i] : (p < 0 ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]);
      }
      title.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
    });
  }

  /* Numbers count up when they come into view */
  function fmt(v) { return v.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB'); }
  function countUp(n) {
    var to = +n.dataset.to, t0 = null, dur = 1400;
    requestAnimationFrame(function frame(now) {
      if (t0 == null) t0 = now;
      var p = Math.min(1, (now - t0) / dur);
      n.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(frame); else n.dataset.done = '1';
    });
  }

  /* Entrances */
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduced) {
    reveals.forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('.count').forEach(function (n) { n.textContent = fmt(+n.dataset.to); n.dataset.done = '1'; });
    return;
  }
  // Short stagger, restarting in every section, so nothing waits on what came before it
  var groups = new Map();
  reveals.forEach(function (el) {
    var sec = el.closest('section') || document.body;
    var n = groups.get(sec) || 0;
    el.style.setProperty('--d', (sec.classList.contains('cc-hero') ? 200 : 0) + n * 70 + 'ms');
    groups.set(sec, n + 1);
  });
  document.querySelectorAll('.count').forEach(function (n) { n.textContent = '0'; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.count').forEach(function (n) {
        setTimeout(function () { countUp(n); }, 300 + parseFloat(getComputedStyle(e.target).getPropertyValue('--d')) || 0);
      });
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px 0px 0px' });
  reveals.forEach(function (el) { io.observe(el); });
})();
