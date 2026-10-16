// Andrea Faveri — site script: language, theme, header colour, reveals, ledger preview, cipher.
(() => {
  const root = document.documentElement;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- language ---------- */
  const IT = window.I18N_IT || {};
  const textNodes = [...document.querySelectorAll('[data-i18n]')];
  const valueNodes = [...document.querySelectorAll('[data-i18n-value]')];
  textNodes.forEach((el) => { el.dataset.en = el.innerHTML; });
  valueNodes.forEach((el) => { el.dataset.en = el.value; });
  const langBtn = document.querySelector('[data-lang-toggle]');

  function setLang(lang) {
    const it = lang === 'it';
    root.lang = it ? 'it' : 'en';
    textNodes.forEach((el) => { const k = el.dataset.i18n; el.innerHTML = it && IT[k] ? IT[k] : el.dataset.en; });
    valueNodes.forEach((el) => { const k = el.dataset.i18nValue; el.value = it && IT[k] ? IT[k] : el.dataset.en; });
    if (langBtn) {
      langBtn.textContent = it ? 'EN' : 'IT';
      langBtn.setAttribute('aria-label', it ? 'Switch to English' : 'Passa all’italiano');
    }
    store.set('lang', root.lang);
    document.dispatchEvent(new Event('langchange'));
  }
  const param = new URLSearchParams(location.search).get('lang');
  const initial = param || store.get('lang') || ((navigator.language || '').toLowerCase().startsWith('it') ? 'it' : 'en');
  if (initial === 'it') setLang('it');
  langBtn?.addEventListener('click', () => setLang(root.lang === 'it' ? 'en' : 'it'));

  /* ---------- theme ---------- */
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark());
  function syncThemeIcon() { if (!root.dataset.theme) root.dataset.theme = isDark() ? 'dark' : 'light'; }
  syncThemeIcon();
  themeBtn?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
    if (!store.get('theme')) root.dataset.theme = systemDark() ? 'dark' : 'light';
  });

  /* ---------- phone menu ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.addEventListener('click', (e) => {
    if (e.target.closest('a')) { nav.classList.remove('is-open'); menuBtn?.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- header takes the field of the chapter under it ---------- */
  const header = document.querySelector('.site-header');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  function updateHeader() {
    if (!header) return;
    const line = header.offsetHeight / 2;
    let current = 'ground';
    for (const el of chapters) {
      const r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = el.dataset.chapter;
    }
    // the hero is split: below its seam the header sits on the orange field
    const hero = document.querySelector('.hero');
    if (hero) {
      const seam = hero.getBoundingClientRect().top + window.innerHeight * (window.innerWidth <= 640 ? 0.46 : 0.5);
      const r = hero.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = seam <= line ? 'accent' : 'ground';
    }
    if (header.dataset.on !== current) header.dataset.on = current;
  }

  /* ---------- slow drift on full-bleed pictures ---------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const drifters = [...document.querySelectorAll('[data-drift]')];
  function updateDrift() {
    if (reduce) return;
    for (const img of drifters) {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      const p = (innerHeight - r.top) / (innerHeight + r.height); // 0 → 1 while it crosses the screen
      img.style.setProperty('--drift', `${(-14 + p * 14).toFixed(2)}%`);
    }
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateHeader(); updateDrift(); ticking = false; });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- reveal once on entry ---------- */
  const targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach((el) => io.observe(el));
    addEventListener('load', () => setTimeout(() => {
      targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
    }, 2500));
  } else {
    targets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- journey ledger: picture beside the hovered row ---------- */
  const ledger = document.querySelector('[data-ledger]');
  const preview = ledger?.querySelector('[data-preview]');
  if (ledger && preview) {
    const show = (row) => {
      const src = row.dataset.img;
      if (!src) { preview.classList.remove('is-on'); return; }
      if (!preview.src.endsWith(src)) preview.src = src;
      const top = row.getBoundingClientRect().top - ledger.getBoundingClientRect().top;
      preview.style.setProperty('--py', `${Math.max(0, top - 40)}px`);
      preview.classList.add('is-on');
    };
    ledger.querySelectorAll('.ledger__row').forEach((row) => {
      row.addEventListener('mouseenter', () => show(row));
      row.addEventListener('focus', () => show(row));
    });
    ledger.querySelector('.ledger__list').addEventListener('mouseleave', () => preview.classList.remove('is-on'));
    ledger.addEventListener('focusout', (e) => { if (!ledger.contains(e.relatedTarget)) preview.classList.remove('is-on'); });
  }

  /* ---------- Vigenère cipher ---------- */
  const form = document.querySelector('[data-cipher]');
  if (form) {
    const msg = form.querySelector('#c-msg');
    const key = form.querySelector('#c-key');
    const out = form.querySelector('output');
    const modes = form.querySelectorAll('[data-mode]');
    let mode = 'enc';
    const vigenere = (text, k, decrypt) => {
      const shifts = k.toUpperCase().replace(/[^A-Z]/g, '').split('').map((c) => c.charCodeAt(0) - 65);
      if (!shifts.length) return text;
      let j = 0;
      return text.replace(/[a-z]/gi, (c) => {
        const base = c <= 'Z' ? 65 : 97;
        const s = shifts[j++ % shifts.length];
        return String.fromCharCode(((c.charCodeAt(0) - base + (decrypt ? 26 - s : s)) % 26) + base);
      });
    };
    const run = () => { out.textContent = vigenere(msg.value, key.value, mode === 'dec') || '…'; };
    modes.forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.mode === mode) return;
      mode = b.dataset.mode;
      modes.forEach((m) => m.setAttribute('aria-pressed', String(m === b)));
      // flip: the result becomes the new input, so you can watch it come back
      msg.value = out.textContent;
      run();
    }));
    msg.addEventListener('input', run);
    key.addEventListener('input', run);
    document.addEventListener('langchange', () => {
      mode = 'enc';
      modes.forEach((m) => m.setAttribute('aria-pressed', String(m.dataset.mode === 'enc')));
      run();
    });
    run();
  }
})();
