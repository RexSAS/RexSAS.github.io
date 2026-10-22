/* CyberChallenge "The final": one attack/defence round as a loop. A dot travels the ring
   through the three steps; the gold arc fills as the round progresses and the counter goes up
   at every lap. It cycles by itself; clicking a step jumps there and pauses for a while. */
(function () {
  var root = document.querySelector('.round');
  if (!root) return;
  var svg = root.querySelector('.round-ring');
  var arc = svg.querySelector('.round-arc');
  var dot = svg.querySelector('.round-dot');
  var counter = svg.querySelector('.round-n');
  var buttons = root.querySelectorAll('.round-steps button');
  var textT = root.querySelector('.round-text-t');
  var textD = root.querySelector('.round-text-d');
  var textBox = root.querySelector('.round-text');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var STEPS = [
    { en: ['Find the flaw', 'Read the service, its source or its binary, until the vulnerability shows itself. Watching the traffic helps: other teams’ attacks often point straight at it.'],
      it: ['Trova la falla', 'Leggi il servizio, il sorgente o il binario, finché la vulnerabilità non salta fuori. Guardare il traffico aiuta: spesso sono gli attacchi delle altre squadre a indicarla.'] },
    { en: ['Write the patch', 'Close it in your own service without breaking what it does. A checker keeps testing every service, so a patch that breaks it costs points too.'],
      it: ['Scrivi la patch', 'Chiudila nel tuo servizio senza rompere quello che fa. Un checker continua a testare ogni servizio, quindi anche una patch che lo rompe costa punti.'] },
    { en: ['Build the exploit', 'Turn the same flaw against every team that hasn’t closed it yet, steal their flags and submit them, round after round, automatically.'],
      it: ['Scrivi l’exploit', 'Usa la stessa falla contro ogni squadra che non l’ha ancora chiusa, ruba le sue flag e inviale, round dopo round, in automatico.'] }
  ];
  var lang = document.documentElement.lang === 'it' ? 'it' : 'en';

  // Geometry: steps at 12, 4 and 8 o'clock, going clockwise
  var CX = 200, CY = 200, R = 150;
  var ANGLES = [-90, 30, 150];
  function pos(deg, r) { var a = deg * Math.PI / 180; return [CX + Math.cos(a) * (r || R), CY + Math.sin(a) * (r || R)]; }
  var NS = 'http://www.w3.org/2000/svg';
  var stops = [], labels = [];
  ANGLES.forEach(function (deg, i) {
    var p = pos(deg), c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'round-stop'); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); c.setAttribute('r', 9);
    svg.insertBefore(c, dot); stops.push(c);
    var lp = pos(deg, R + 32), t = document.createElementNS(NS, 'text');
    t.setAttribute('class', 'round-label'); t.setAttribute('x', lp[0]); t.setAttribute('y', lp[1] + 4);
    t.setAttribute('text-anchor', i === 0 ? 'middle' : (i === 1 ? 'start' : 'end'));
    if (i === 1 || i === 2) t.setAttribute('x', lp[0] + (i === 1 ? -6 : 6));
    svg.appendChild(t); labels.push(t);
  });

  function arcPath(from, to) {
    // Clockwise arc from angle `from` to `to` (degrees, to >= from)
    if (to - from < 0.5) return '';
    var a = pos(from), b = pos(to), large = (to - from) > 180 ? 1 : 0;
    return 'M' + a[0] + ' ' + a[1] + ' A' + R + ' ' + R + ' 0 ' + large + ' 1 ' + b[0] + ' ' + b[1];
  }

  // State: `angle` grows forever; a lap is 360 degrees starting at step 1 (-90)
  var angle = -90, target = -90, active = 0, round = 1;
  var DWELL = 3200, pausedUntil = 0, dwellStart = performance.now();

  function render() {
    var lapStart = -90 + Math.floor((angle + 90) / 360) * 360;
    var p = pos(angle);
    dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]);
    arc.setAttribute('d', arcPath(lapStart, Math.min(angle, lapStart + 359.9)));
    var lap = Math.floor((angle + 90) / 360) + 1;
    if (lap !== round) { round = lap; counter.textContent = round; }
    stops.forEach(function (s, i) { s.classList.toggle('on', i === active); });
    labels.forEach(function (l, i) { l.classList.toggle('on', i === active); });
  }
  function setText(animate) {
    var st = STEPS[active][lang];
    textT.textContent = (active + 1 < 10 ? '0' : '') + (active + 1) + ' · ' + st[0];
    textD.textContent = st[1];
    buttons.forEach(function (b, i) { if (i === active) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    if (animate) { textBox.classList.remove('swap'); void textBox.offsetWidth; textBox.classList.add('swap'); }
  }
  function labelsText() {
    labels.forEach(function (l, i) { l.textContent = STEPS[i][lang][0]; });
  }
  function go(i, manual) {
    // Always move forward (clockwise) to the chosen step
    var base = ANGLES[i];
    var next = base;
    while (next <= target + (manual && i === active ? -1 : 0.01)) next += 360;
    if (manual && i === active) return;
    target = next; active = i;
    if (reduced) angle = target;
    setText(true);
    dwellStart = performance.now();
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      pausedUntil = performance.now() + 12000;
      go(+b.dataset.step, true);
      wake();
    });
  });

  var running = false, onScreen = false;
  function frame(now) {
    if (!onScreen) { running = false; return; }
    if (angle < target) {
      angle += Math.max(0.6, (target - angle) * 0.08);
      if (angle > target) angle = target;
      dwellStart = now;
    } else if (now > pausedUntil && now - dwellStart > DWELL) {
      go((active + 1) % 3, false);
    }
    render();
    if (reduced && angle >= target && now <= pausedUntil) { running = false; return; }
    requestAnimationFrame(frame);
  }
  function wake() { if (!running && onScreen) { running = true; requestAnimationFrame(frame); } }

  labelsText(); setText(false); render();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; if (onScreen) wake(); }, { threshold: 0.25 }).observe(root);
  } else { onScreen = true; wake(); }

  window.ccFinal = {
    setLang: function (l) { lang = l === 'it' ? 'it' : 'en'; labelsText(); setText(false); }
  };
})();
