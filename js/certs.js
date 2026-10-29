/* Certificates page. To add a certificate: put its PDF in assets/certificates/<dir>/,
   render the preview with `pdftoppm -jpeg -jpegopt quality=85 -scale-to 1600 -singlefile <file>.pdf <file>`
   and add an entry to CERTS (newest first). `desc`, `verify` and `courses` are optional; `courses`
   is for programmes made of several courses. `title` and `by` can be a string or { en, it }. */
var CERTS = [
  {
    title: 'Google AI Professional Certificate',
    by: 'Google · Coursera',
    date: '2026-10',
    dir: 'assets/certificates/google-ai/',
    file: 'professional-certificate',
    verify: 'https://coursera.org/verify/professional-cert/YU6WPWJGI16I',
    desc: {
      en: 'Eight courses on using AI in real work: brainstorming, research, writing, content creation and data analysis, ending with building and deploying an app. More than 20 hands-on projects along the way.',
      it: 'Otto corsi sull’uso dell’AI nel lavoro vero: brainstorming, ricerca, scrittura, creazione di contenuti e analisi dei dati, fino a costruire e pubblicare un’app. Più di 20 progetti pratici lungo il percorso.'
    },
    courses: [
      { title: 'AI Fundamentals', file: 'ai-fundamentals', verify: 'https://coursera.org/verify/72Y9CB4349KO' },
      { title: 'AI for Brainstorming and Planning', file: 'ai-for-brainstorming-and-planning', verify: 'https://coursera.org/verify/2EMZG1J7JOOO' },
      { title: 'AI for Research and Insights', file: 'ai-for-research-and-insights', verify: 'https://coursera.org/verify/2HDW90BMND7Z' },
      { title: 'AI for Writing and Communicating', file: 'ai-for-writing-and-communicating', verify: 'https://coursera.org/verify/ITWOOXC62LBF' },
      { title: 'AI for Content Creation', file: 'ai-for-content-creation', verify: 'https://coursera.org/verify/LUQFYE6N2Q9A' },
      { title: 'AI for Data Analysis', file: 'ai-for-data-analysis', verify: 'https://coursera.org/verify/EW0C0DQ75NFH' },
      { title: 'AI for App Building', file: 'ai-for-app-building', verify: 'https://coursera.org/verify/PEOLNNR47RI7' },
      { title: 'AI for App Deployment', file: 'ai-for-app-deployment', verify: 'https://coursera.org/verify/S3PPO91C8VUH' }
    ]
  },
  {
    title: { en: 'BLSD · CPR and defibrillation, adults and children', it: 'BLSD · Rianimazione e defibrillazione, adulti e bambini' },
    by: { en: 'Italian Red Cross · Ferrara', it: 'Croce Rossa Italiana · Ferrara' },
    date: '2023-10',
    dir: 'assets/certificates/blsd/',
    file: 'blsd-full-d',
    desc: {
      en: 'Basic life support with a defibrillator for adults and children (“Full D”), following the European Resuscitation Council guidelines. Passed.',
      it: 'Rianimazione cardiopolmonare e defibrillazione per adulti e bambini (“Full D”), secondo le linee guida dell’European Resuscitation Council. Superato con esito positivo.'
    }
  },
  {
    title: { en: 'CyberChallenge.IT 2023 · Certificate of participation', it: 'CyberChallenge.IT 2023 · Attestato di partecipazione' },
    by: { en: 'CINI Cybersecurity National Lab · University of Ferrara', it: 'Cybersecurity National Lab del CINI · Università di Ferrara' },
    date: '2023-06',
    dir: 'assets/certificates/cyberchallenge/',
    file: 'cyberchallenge-2023',
    desc: {
      en: 'The security training programme in Ferrara, the local competition on 31 May and the national attack/defence final on 29 June 2023.',
      it: 'Il programma di formazione sulla sicurezza a Ferrara, la gara locale del 31 maggio e la finale nazionale attacco/difesa del 29 giugno 2023.'
    }
  }
];

(function () {
  var it = false;
  try { it = localStorage.getItem('lang') === 'it'; } catch (e) {}
  var T = it ? {
    label: 'Certificati', title: 'Quello che ho studiato da solo', home: 'Torna alla home',
    verify: 'Verifica ↗', download: 'Scarica PDF ↓', courses: function (n) { return 'Vedi ' + n + ' corsi'; },
    open: 'Apri il certificato: ', close: 'Chiudi', copied: 'copiato',
    copyTitle: 'Copia il nome utente Discord', copyAria: 'Discord: copia il nome utente rexsas'
  } : {
    verify: 'Verify ↗', download: 'Download PDF ↓', courses: function (n) { return 'See the ' + n + ' courses'; },
    open: 'Open certificate: ', close: 'Close'
  };
  var locale = it ? 'it-IT' : 'en-GB';
  if (it) {
    document.documentElement.lang = 'it';
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = T[n.dataset.i18n]; });
  }

  function tx(v) { return typeof v === 'string' ? v : (it ? v.it : v.en); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function link(cls, href, text) {
    var a = el('a', cls, text);
    a.href = href;
    return a;
  }
  // Verify + download links for one certificate (dir is the parent entry's folder)
  function actions(c, dir) {
    var box = el('div', 'cert-actions');
    if (c.verify) {
      var v = link('cert-verify', c.verify, T.verify);
      v.target = '_blank'; v.rel = 'noopener';
      box.appendChild(v);
    }
    var d = link('cv-dl', dir + c.file + '.pdf', T.download);
    d.download = c.file + '.pdf';
    box.appendChild(d);
    return box;
  }

  var view = document.querySelector('.cert-view');
  var viewImg = view.querySelector('img');
  view.querySelector('.cert-close').setAttribute('aria-label', T.close);
  function show(c, dir) {
    viewImg.src = dir + c.file + '.jpg';
    viewImg.alt = tx(c.title);
    view.querySelector('.cert-name').textContent = tx(c.title);
    view.querySelector('.cert-actions').replaceWith(actions(c, dir));
    view.setAttribute('aria-label', tx(c.title));
    view.showModal();
  }
  view.querySelector('.cert-close').addEventListener('click', function () { view.close(); });
  // A click on the backdrop lands on the dialog itself
  view.addEventListener('click', function (e) { if (e.target === view) view.close(); });

  var list = document.querySelector('.cert-list');
  CERTS.forEach(function (c) {
    var art = el('article', 'cert');
    var big = el('button', 'cert-shot');
    big.type = 'button';
    big.setAttribute('aria-label', T.open + tx(c.title));
    var img = el('img');
    img.src = c.dir + c.file + '.jpg'; img.alt = ''; img.width = 1600; img.height = 1237;
    big.appendChild(img);
    big.addEventListener('click', function () { show(c, c.dir); });

    var info = el('div', 'cert-info');
    info.appendChild(el('h2', 'cert-name', tx(c.title)));
    var when = new Date(c.date + '-01T00:00:00').toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    info.appendChild(el('p', 'cert-by', tx(c.by) + ' · ' + when));
    if (c.desc) info.appendChild(el('p', 'cert-desc', it ? c.desc.it : c.desc.en));
    info.appendChild(actions(c, c.dir));
    art.appendChild(info);
    art.appendChild(big);

    if (c.courses && c.courses.length) {
      var more = el('details', 'cert-courses');
      more.appendChild(el('summary', null, T.courses(c.courses.length)));
      var grid = el('ul', 'cert-grid');
      c.courses.forEach(function (k) {
        var li = el('li');
        var b = el('button', null);
        b.type = 'button';
        var thumb = el('img');
        thumb.src = c.dir + k.file + '.jpg'; thumb.alt = ''; thumb.loading = 'lazy'; thumb.width = 1600; thumb.height = 1237;
        b.appendChild(thumb);
        b.appendChild(el('span', null, k.title));
        b.addEventListener('click', function () { show(k, c.dir); });
        li.appendChild(b);
        grid.appendChild(li);
      });
      more.appendChild(grid);
      art.appendChild(more);
    }
    list.appendChild(art);
  });

  /* Firefox opens PDFs in its viewer even with `download`; a generic blob always gets saved.
     If the fetch fails the plain link still works */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[download]');
    // blob: is our own re-dispatched click below
    if (!a || a.protocol === 'blob:' || !window.fetch || !URL.createObjectURL) return;
    e.preventDefault();
    fetch(a.href).then(function (r) {
      if (!r.ok) throw r;
      return r.blob();
    }).then(function (b) {
      var tmp = document.createElement('a');
      tmp.href = URL.createObjectURL(new Blob([b], { type: 'application/octet-stream' }));
      tmp.download = a.download;
      document.body.appendChild(tmp);
      tmp.click();
      tmp.remove();
      setTimeout(function () { URL.revokeObjectURL(tmp.href); }, 1000);
    }).catch(function () { location.href = a.href; });
  });

  /* Footer: Discord has no profile link, so the button copies the username */
  var discord = document.querySelector('[data-copy]');
  if (it) {
    discord.title = T.copyTitle;
    discord.setAttribute('aria-label', T.copyAria);
    discord.dataset.copied = T.copied;
  }
  discord.addEventListener('click', function () {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(discord.dataset.copy).then(function () {
      discord.classList.add('copied');
      setTimeout(function () { discord.classList.remove('copied'); }, 1600);
    });
  });
})();
