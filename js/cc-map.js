/* CyberChallenge map: an Obsidian-style graph drawn on a canvas, no libraries.
   CyberChallenge.IT sits in the middle with its subjects around it. Hovering a subject opens
   it (its languages, tools, techniques and concepts spring out of it), clicking keeps it open,
   and any dot can be dragged. Nodes shared by several subjects link to all of them. */
(function () {
  var section = document.querySelector('.cc-map');
  if (!section) return;
  var wrap = section.querySelector('.cc-graph');
  var canvas = section.querySelector('.cc-graph-canvas');
  var ctx = canvas.getContext('2d');
  var card = section.querySelector('.cc-graph-card');
  var chips = section.querySelector('.cc-subjects');
  var list = section.querySelector('.cc-graph-list');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Data ---------- */

  var SUBJECTS = [
    { id: 'crypto', en: 'Cryptography', it: 'Crittografia',
      den: 'Symmetric and asymmetric ciphers, and the techniques for breaking them when they are used badly.',
      dit: 'Cifrari simmetrici e asimmetrici, e le tecniche per romperli quando vengono usati male.' },
    { id: 'net', en: 'Network security', it: 'Sicurezza delle reti',
      den: 'Reading traffic packet by packet, and building isolated environments with Docker to attack and defend.',
      dit: 'Leggere il traffico pacchetto per pacchetto e costruire ambienti isolati con Docker per attaccare e difendere.' },
    { id: 'web', en: 'Web security', it: 'Sicurezza web',
      den: 'JavaScript fundamentals and the attacks of the web: injections of every kind, XSS, CSRF, path traversal.',
      dit: 'Le basi di JavaScript e gli attacchi del web: injection di ogni tipo, XSS, CSRF, path traversal.' },
    { id: 'soft', en: 'Software security', it: 'Sicurezza del software',
      den: 'How executables are built, reverse engineering, and debugging binaries you have no source for.',
      dit: 'Come sono fatti gli eseguibili, il reverse engineering e il debug di binari senza sorgente.' },
    { id: 'access', en: 'Access control', it: 'Controllo degli accessi',
      den: 'Working confidently in Linux: how users, permissions and the system fit together, and how they break.',
      dit: 'Muoversi con sicurezza in Linux: come si incastrano utenti, permessi e sistema, e come si rompono.' },
    { id: 'hw', en: 'Hardware security', it: 'Sicurezza hardware',
      den: 'A first look at physical attacks against devices.',
      dit: 'Un primo sguardo agli attacchi fisici contro i dispositivi.' },
    { id: 'ad', en: 'Attack/Defence', it: 'Attacco/Difesa',
      den: 'The format of the final: every team gets the same vulnerable services, patches its own and exploits everyone else’s.',
      dit: 'Il formato della finale: ogni squadra ha gli stessi servizi vulnerabili, corregge i propri e attacca quelli degli altri.' }
  ];

  // type: lang | tool | attack | concept. `of` lists the subjects a node belongs to.
  var ITEMS = [
    { id: 'python', en: 'Python', type: 'lang', of: ['crypto', 'net', 'web', 'soft', 'ad'] },
    { id: 'c', en: 'C', type: 'lang', of: ['soft'] },
    { id: 'asm', en: 'Assembly', type: 'lang', of: ['soft'] },
    { id: 'js', en: 'JavaScript', type: 'lang', of: ['web'] },
    { id: 'php', en: 'PHP', type: 'lang', of: ['web'] },
    { id: 'sql', en: 'SQL', type: 'lang', of: ['web'] },
    { id: 'bash', en: 'Bash', type: 'lang', of: ['access', 'ad'] },

    { id: 'wireshark', en: 'Wireshark', type: 'tool', of: ['net', 'ad'] },
    { id: 'tcpdump', en: 'tcpdump', type: 'tool', of: ['net'] },
    { id: 'nmap', en: 'nmap', type: 'tool', of: ['net'] },
    { id: 'scapy', en: 'Scapy', type: 'tool', of: ['net'] },
    { id: 'docker', en: 'Docker', type: 'tool', of: ['net', 'ad'] },
    { id: 'burp', en: 'Burp Suite', type: 'tool', of: ['web'] },
    { id: 'devtools', en: 'Browser DevTools', it: 'DevTools del browser', type: 'tool', of: ['web'] },
    { id: 'sqlmap', en: 'sqlmap', type: 'tool', of: ['web'] },
    { id: 'ghidra', en: 'Ghidra', type: 'tool', of: ['soft'] },
    { id: 'r2', en: 'radare2', type: 'tool', of: ['soft'] },
    { id: 'gdb', en: 'gdb', type: 'tool', of: ['soft'] },
    { id: 'pwntools', en: 'pwntools', type: 'tool', of: ['soft', 'ad'] },
    { id: 'cyberchef', en: 'CyberChef', type: 'tool', of: ['crypto'] },
    { id: 'sage', en: 'SageMath', type: 'tool', of: ['crypto'] },
    { id: 'linux', en: 'Linux', type: 'tool', of: ['access', 'net'] },
    { id: 'git', en: 'Git', type: 'tool', of: ['ad'] },

    { id: 'mitm', en: 'MITM', type: 'attack', of: ['net'] },
    { id: 'arp', en: 'ARP spoofing', type: 'attack', of: ['net'] },
    { id: 'dns', en: 'DNS spoofing', type: 'attack', of: ['net'] },
    { id: 'scan', en: 'Port scanning', type: 'attack', of: ['net'] },
    { id: 'sqli', en: 'SQL injection', type: 'attack', of: ['web'] },
    { id: 'xss', en: 'XSS', type: 'attack', of: ['web'] },
    { id: 'csrf', en: 'CSRF', type: 'attack', of: ['web'] },
    { id: 'ssrf', en: 'SSRF', type: 'attack', of: ['web'] },
    { id: 'traversal', en: 'Path traversal', type: 'attack', of: ['web'] },
    { id: 'cmdi', en: 'Command injection', type: 'attack', of: ['web', 'ad'] },
    { id: 'codei', en: 'Code injection', type: 'attack', of: ['web'] },
    { id: 'bof', en: 'Buffer overflow', type: 'attack', of: ['soft', 'ad'] },
    { id: 'fmt', en: 'Format string', type: 'attack', of: ['soft'] },
    { id: 'rop', en: 'ROP', type: 'attack', of: ['soft'] },
    { id: 'shellcode', en: 'Shellcode', type: 'attack', of: ['soft'] },
    { id: 'freq', en: 'Frequency analysis', it: 'Analisi delle frequenze', type: 'attack', of: ['crypto'] },
    { id: 'kpa', en: 'Known-plaintext', it: 'Testo in chiaro noto', type: 'attack', of: ['crypto'] },
    { id: 'padding', en: 'Padding oracle', type: 'attack', of: ['crypto'] },
    { id: 'weakrsa', en: 'Weak RSA keys', it: 'Chiavi RSA deboli', type: 'attack', of: ['crypto'] },
    { id: 'privesc', en: 'Privilege escalation', type: 'attack', of: ['access'] },
    { id: 'suid', en: 'SUID abuse', it: 'Abuso di SUID', type: 'attack', of: ['access'] },
    { id: 'side', en: 'Side-channel', type: 'attack', of: ['hw', 'crypto'] },
    { id: 'fault', en: 'Fault injection', type: 'attack', of: ['hw'] },
    { id: 'autoexp', en: 'Exploit automation', it: 'Exploit automatizzati', type: 'attack', of: ['ad'] },

    { id: 'sym', en: 'Symmetric ciphers', it: 'Cifrari simmetrici', type: 'concept', of: ['crypto'] },
    { id: 'asym', en: 'Asymmetric ciphers', it: 'Cifrari asimmetrici', type: 'concept', of: ['crypto'] },
    { id: 'hash', en: 'Hash functions', it: 'Funzioni hash', type: 'concept', of: ['crypto'] },
    { id: 'tcpip', en: 'TCP/IP', type: 'concept', of: ['net'] },
    { id: 'packets', en: 'Packet analysis', it: 'Analisi dei pacchetti', type: 'concept', of: ['net', 'ad'] },
    { id: 'http', en: 'HTTP', type: 'concept', of: ['web'] },
    { id: 'elf', en: 'ELF executables', it: 'Eseguibili ELF', type: 'concept', of: ['soft'] },
    { id: 're', en: 'Reverse engineering', type: 'concept', of: ['soft'] },
    { id: 'perms', en: 'Users & permissions', it: 'Utenti e permessi', type: 'concept', of: ['access'] },
    { id: 'physical', en: 'Physical access', it: 'Accesso fisico', type: 'concept', of: ['hw'] },
    { id: 'patching', en: 'Patching', type: 'concept', of: ['ad'] },
    { id: 'flags', en: 'Flag submission', it: 'Invio delle flag', type: 'concept', of: ['ad'] }
  ];

  var TEXT = {
    en: { center: 'CyberChallenge.IT', lang: 'Language', tool: 'Tool', attack: 'Technique', concept: 'Concept',
          subject: 'Subject', count: function (n) { return n + ' connected'; },
          listIntro: 'What I learned, by subject:' },
    it: { center: 'CyberChallenge.IT', lang: 'Linguaggio', tool: 'Strumento', attack: 'Tecnica', concept: 'Concetto',
          subject: 'Materia', count: function (n) { return n + ' collegamenti'; },
          listIntro: 'Cosa ho imparato, per materia:' }
  };

  /* ---------- Model ---------- */

  var lang = document.documentElement.lang === 'it' ? 'it' : 'en';
  var nodes = {}, order = [];
  function add(n) { n.x = 0; n.y = 0; n.vx = 0; n.vy = 0; n.a = 0; nodes[n.id] = n; order.push(n); return n; }
  var center = add({ id: 'center', type: 'center', en: 'CyberChallenge.IT' });
  SUBJECTS.forEach(function (s) { s.type = 'subject'; s.items = []; add(s); });
  ITEMS.forEach(function (it) {
    add(it);
    it.of.forEach(function (sid) { nodes[sid].items.push(it); });
  });

  var pinned = {};      // subject id -> true when opened by click
  var hoverOpen = null; // subject opened by hovering
  var hovered = null;   // node under the pointer
  var dragging = null;
  var focus = null;     // subject shown in the card

  function isOpen(s) { return pinned[s.id] || hoverOpen === s; }
  function visible(n) {
    if (n.type === 'center' || n.type === 'subject') return true;
    for (var i = 0; i < n.of.length; i++) if (isOpen(nodes[n.of[i]])) return true;
    return false;
  }
  function label(n) {
    if (n.type === 'center') return TEXT[lang].center;
    return (lang === 'it' && n.it) ? n.it : n.en;
  }

  /* ---------- Layout and physics ---------- */

  var W = 0, H = 0, DPR = 1, scale = 1;
  function resize() {
    var r = wrap.getBoundingClientRect();
    W = r.width; H = r.height;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    scale = Math.max(0.55, Math.min(1.15, Math.min(W, H) / 760));
  }
  function seed() {
    center.x = W / 2; center.y = H / 2; center.a = 1;
    SUBJECTS.forEach(function (s, i) {
      var ang = -Math.PI / 2 + i / SUBJECTS.length * Math.PI * 2;
      var rad = 210 * scale;
      s.x = W / 2 + Math.cos(ang) * rad * Math.max(1, Math.min(1.9, W / H));
      s.y = H / 2 + Math.sin(ang) * rad;
      s.a = 1;
    });
  }
  function spawn(it) {
    // A newly shown node springs out of the open subject it belongs to
    var from = null;
    for (var i = 0; i < it.of.length; i++) if (isOpen(nodes[it.of[i]])) { from = nodes[it.of[i]]; break; }
    from = from || center;
    var ang = Math.random() * Math.PI * 2;
    it.x = from.x + Math.cos(ang) * 6; it.y = from.y + Math.sin(ang) * 6;
    it.vx = Math.cos(ang) * 3; it.vy = Math.sin(ang) * 3;
  }

  var energy = 1;
  function step() {
    var vis = order.filter(function (n) { return n.a > 0.01 || visible(n); });
    var i, j, a, b, dx, dy, d2, d, f;
    // Repulsion between every pair of shown nodes
    for (i = 0; i < vis.length; i++) {
      a = vis[i];
      for (j = i + 1; j < vis.length; j++) {
        b = vis[j];
        dx = b.x - a.x; dy = b.y - a.y; d2 = dx * dx + dy * dy + 0.01;
        var k = (a.type === 'subject' && b.type === 'subject') ? 10000 : (a.type === 'center' || b.type === 'center' ? 5500 : 2300);
        f = k * scale * scale / d2;
        d = Math.sqrt(d2);
        dx /= d; dy /= d;
        var w = Math.min(a.a, b.a) || 0.2;
        a.vx -= dx * f * w; a.vy -= dy * f * w;
        b.vx += dx * f * w; b.vy += dy * f * w;
      }
    }
    // Springs: centre to subjects, subjects to their shown items
    function spring(p, q, rest, k) {
      dx = q.x - p.x; dy = q.y - p.y; d = Math.sqrt(dx * dx + dy * dy) || 1;
      f = (d - rest) * k;
      dx /= d; dy /= d;
      p.vx += dx * f; p.vy += dy * f;
      q.vx -= dx * f; q.vy -= dy * f;
    }
    // On wide screens the ring stretches sideways: the rest length grows with the horizontal angle
    var stretch = Math.max(1, Math.min(1.9, W / H));
    SUBJECTS.forEach(function (s) {
      var ang = Math.atan2(s.y - center.y, s.x - center.x);
      spring(center, s, 230 * scale * (1 + (stretch - 1) * Math.abs(Math.cos(ang))), 0.012);
      s.items.forEach(function (it) {
        if (visible(it)) spring(s, it, (isOpen(s) ? 112 : 160) * scale, isOpen(s) ? 0.028 : 0.006);
      });
    });
    // Gentle pull to the middle, damping, bounds
    var cx = W / 2, cy = H / 2, pad = 24;
    energy = 0;
    vis.forEach(function (n) {
      n.vx += (cx - n.x) * 0.0009; n.vy += (cy - n.y) * 0.0009;
      if (n === center || n === dragging || (n === hovered && n.type !== 'center')) { n.vx = 0; n.vy = 0; return; }
      n.vx *= 0.82; n.vy *= 0.82;
      var max = 14; n.vx = Math.max(-max, Math.min(max, n.vx)); n.vy = Math.max(-max, Math.min(max, n.vy));
      n.x += n.vx; n.y += n.vy;
      // Keep the whole label inside the canvas, not just the dot
      var px = Math.max(pad, (n.lw || 0) / 2 + 8);
      n.x = Math.max(px, Math.min(W - px, n.x)); n.y = Math.max(pad, Math.min(H - pad - 18, n.y));
      energy += Math.abs(n.vx) + Math.abs(n.vy);
    });
    center.x += (cx - center.x) * 0.1; center.y += (cy - center.y) * 0.1;
    // Fade nodes in and out
    order.forEach(function (n) {
      var target = visible(n) ? 1 : 0;
      if (target && n.a === 0 && n.type !== 'center' && n.type !== 'subject') spawn(n);
      n.a += (target - n.a) * (reduced ? 1 : 0.14);
      if (n.a < 0.01 && !target) n.a = 0;
    });
  }

  /* ---------- Drawing ---------- */

  var css = getComputedStyle(document.documentElement);
  function v(name, fallback) { return (css.getPropertyValue(name) || fallback).trim(); }
  var COLOR = {
    ink: v('--ink', '#f2f1ed'), bg: v('--bg', '#0f0e12'),
    lang: v('--bone', '#ecebe7'), tool: v('--sand', '#dcc47e'), attack: v('--accent', '#e2492a'), concept: v('--sky', '#93b7cc')
  };
  function rgba(hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function radius(n) {
    if (n.type === 'center') return 12 * scale + 4;
    if (n.type === 'subject') return 8 * scale + 3.5;
    return 5 * scale + 2.5;
  }
  function neighbours(n) {
    var set = {}; set[n.id] = true;
    if (n.type === 'center') SUBJECTS.forEach(function (s) { set[s.id] = true; });
    else if (n.type === 'subject') { set.center = true; n.items.forEach(function (it) { if (visible(it)) set[it.id] = true; }); }
    else n.of.forEach(function (sid) { set[sid] = true; });
    return set;
  }

  function draw(time) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var hi = hovered ? neighbours(hovered) : null;
    function lit(n) { return !hi || hi[n.id]; }

    // Lines
    ctx.lineWidth = 1;
    SUBJECTS.forEach(function (s) {
      var on = !hi || (hi[s.id] && hi.center);
      ctx.strokeStyle = rgba(COLOR.ink, on ? (hi ? 0.55 : 0.22) : 0.06);
      ctx.beginPath(); ctx.moveTo(center.x, center.y); ctx.lineTo(s.x, s.y); ctx.stroke();
      s.items.forEach(function (it) {
        if (it.a <= 0.01) return;
        var lineOn = !hi || (hi[s.id] && hi[it.id]);
        var base = isOpen(s) ? 0.3 : 0.1;
        ctx.strokeStyle = rgba(COLOR[it.type], it.a * (lineOn ? (hi ? 0.75 : base) : 0.04));
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(it.x, it.y); ctx.stroke();
      });
    });

    // Dots
    order.forEach(function (n) {
      if (n.a <= 0.01) return;
      var r = radius(n), on = lit(n), alpha = n.a * (on ? 1 : 0.18);
      if (n === hovered || (n.type === 'subject' && isOpen(n)) || n === center) {
        ctx.shadowColor = n.type === 'center' || n.type === 'subject' ? rgba(COLOR.ink, 0.6) : COLOR[n.type];
        ctx.shadowBlur = n === hovered ? 22 : 14;
      }
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      if (n.type === 'subject') {
        ctx.fillStyle = rgba(COLOR.bg, 1); ctx.fill();
        ctx.lineWidth = 1.6; ctx.strokeStyle = rgba(COLOR.ink, alpha); ctx.stroke();
        if (isOpen(n)) { ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.45, 0, Math.PI * 2); ctx.fillStyle = rgba(COLOR.ink, alpha); ctx.fill(); }
      } else if (n.type === 'center') {
        var pulse = reduced ? 0 : (Math.sin(time / 900) + 1) / 2;
        ctx.fillStyle = rgba(COLOR.ink, alpha); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 6 + pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(COLOR.ink, 0.12 + (1 - pulse) * 0.1); ctx.lineWidth = 1; ctx.stroke();
      } else {
        ctx.fillStyle = rgba(COLOR[n.type], alpha); ctx.fill();
      }
      ctx.shadowBlur = 0;
    });

    // Labels
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    order.forEach(function (n) {
      if (n.a <= 0.3) return;
      var on = lit(n), r = radius(n), size, weight = 300;
      if (n.type === 'center') { size = 17 * Math.max(scale, 0.85); weight = 400; }
      else if (n.type === 'subject') { size = 15 * Math.max(scale, 0.9); weight = 400; }
      else size = 13 * Math.max(scale, 0.92);
      ctx.font = weight + ' ' + size + 'px Manrope, system-ui, sans-serif';
      var a = n.a * (on ? (n.type === 'center' || n.type === 'subject' || hi ? 0.95 : 0.82) : 0.15);
      ctx.fillStyle = rgba(COLOR.ink, a);
      var text = label(n);
      n.lw = ctx.measureText(text).width;
      ctx.fillText(text, n.x, n.y + r + 7);
    });
  }

  /* ---------- Interaction ---------- */

  function hit(x, y) {
    var best = null, bestD = Infinity;
    order.forEach(function (n) {
      if (n.a < 0.5) return;
      var dx = n.x - x, dy = n.y - y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < radius(n) + 10 && d < bestD) { best = n; bestD = d; }
    });
    return best;
  }
  function point(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }

  var leaveTimer = null;
  function setHovered(n) {
    if (n === hovered) return;
    hovered = n;
    canvas.classList.toggle('is-pointer', !!n);
    clearTimeout(leaveTimer);
    if (n && n.type === 'subject') { hoverOpen = n; showCard(n); }
    // Moving from a subject onto empty space closes its preview after a short grace period,
    // so the pointer can travel to one of its dots without it collapsing
    else if (!n) leaveTimer = setTimeout(function () { hoverOpen = null; showCard(lastPinned()); wake(); }, 700);
    wake();
  }
  function lastPinned() {
    var ids = Object.keys(pinned);
    return ids.length ? nodes[ids[ids.length - 1]] : null;
  }
  function toggle(s) {
    if (pinned[s.id]) delete pinned[s.id]; else pinned[s.id] = true;
    showCard(pinned[s.id] ? s : lastPinned());
    syncChips(); wake();
  }

  var down = null;
  canvas.addEventListener('pointerdown', function (e) {
    var p = point(e), n = hit(p.x, p.y);
    down = { x: p.x, y: p.y, n: n, moved: false };
    if (n && n.type !== 'center') { dragging = n; canvas.setPointerCapture(e.pointerId); }
  });
  canvas.addEventListener('pointermove', function (e) {
    var p = point(e);
    if (down && dragging) {
      if (Math.abs(p.x - down.x) + Math.abs(p.y - down.y) > 4) { down.moved = true; canvas.classList.add('is-dragging'); }
      dragging.x = p.x; dragging.y = p.y; wake();
      return;
    }
    if (e.pointerType !== 'touch') setHovered(hit(p.x, p.y));
  });
  function release(e) {
    if (!down) return;
    var p = point(e);
    if (!down.moved && Math.abs(p.x - down.x) + Math.abs(p.y - down.y) < 6) {
      var n = down.n;
      if (n && n.type === 'subject') toggle(n);
      else if (n && n.type === 'center') { pinned = {}; hoverOpen = null; showCard(null); syncChips(); wake(); }
      else if (n && e.pointerType === 'touch') { hovered = n; wake(); }
    }
    dragging = null; down = null;
    canvas.classList.remove('is-dragging');
  }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', function (e) { if (!dragging && e.pointerType !== 'touch') setHovered(null); });

  /* ---------- Card, chips and accessible list ---------- */

  function showCard(s) {
    focus = s;
    if (!s) { card.hidden = true; return; }
    var T = TEXT[lang];
    card.querySelector('.cc-graph-card-k').textContent = T.subject + ' · ' + T.count(s.items.length);
    card.querySelector('.cc-graph-card-t').textContent = label(s);
    card.querySelector('.cc-graph-card-d').textContent = lang === 'it' ? s.dit : s.den;
    if (card.hidden) { card.hidden = false; card.style.animation = 'none'; void card.offsetWidth; card.style.animation = ''; }
  }
  function buildChips() {
    chips.innerHTML = '';
    SUBJECTS.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button'; b.dataset.id = s.id; b.textContent = label(s);
      b.setAttribute('aria-pressed', pinned[s.id] ? 'true' : 'false');
      b.addEventListener('click', function () { toggle(s); });
      b.addEventListener('mouseenter', function () { hoverOpen = s; showCard(s); wake(); });
      b.addEventListener('mouseleave', function () { if (!pinned[s.id]) { hoverOpen = null; showCard(lastPinned()); wake(); } });
      chips.appendChild(b);
    });
  }
  function syncChips() {
    chips.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', pinned[b.dataset.id] ? 'true' : 'false'); });
  }
  function buildList() {
    var T = TEXT[lang], html = '<p>' + T.listIntro + '</p><ul>';
    SUBJECTS.forEach(function (s) {
      html += '<li>' + label(s) + ': ' + (lang === 'it' ? s.dit : s.den) + ' ' +
        s.items.map(function (it) { return label(it) + ' (' + T[it.type].toLowerCase() + ')'; }).join(', ') + '.</li>';
    });
    list.innerHTML = html + '</ul>';
  }

  /* ---------- Loop ---------- */

  var running = false, onScreen = true;
  function frame(t) {
    if (!onScreen) { running = false; return; }
    step();
    draw(t);
    // With reduced motion, stop once everything has settled; otherwise keep the centre pulsing
    if (reduced && energy < 0.5) { running = false; return; }
    requestAnimationFrame(frame);
  }
  function wake() { if (!running && onScreen) { running = true; requestAnimationFrame(frame); } }

  function start() {
    resize(); seed();
    buildChips(); buildList();
    // Let the layout settle before the first frame so it doesn't explode on screen
    for (var i = 0; i < 120; i++) step();
    wake();
  }
  if ('ResizeObserver' in window) {
    var first = true;
    new ResizeObserver(function () { if (first) { first = false; return; } resize(); wake(); }).observe(wrap);
  } else window.addEventListener('resize', function () { resize(); wake(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; if (onScreen) wake(); }).observe(wrap);
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);

  /* Language: called by cc.js when the EN/IT switch changes */
  window.ccMap = {
    // Read-only view of the nodes, handy for testing from the console
    nodes: function () { return order.map(function (n) { return { id: n.id, x: n.x, y: n.y, shown: n.a > 0.5 }; }); },
    setLang: function (l) {
      lang = l === 'it' ? 'it' : 'en';
      if (!chips.children.length) return;
      chips.querySelectorAll('button').forEach(function (b) { b.textContent = label(nodes[b.dataset.id]); });
      buildList(); showCard(focus); wake();
    }
  };
})();
