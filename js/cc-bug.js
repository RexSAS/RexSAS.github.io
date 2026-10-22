/* CyberChallenge minigame "Spot the bug": five short snippets with one flawed line each.
   Click the line you think is the problem; the answer names the flaw, explains why it is
   dangerous and shows the fix. Lines are buttons, so it works with keyboard and touch too. */
(function () {
  var root = document.querySelector('.bug');
  if (!root) return;
  var codeEl = root.querySelector('.bug-code');
  var roundEl = root.querySelector('.bug-round');
  var langEl = root.querySelector('.bug-lang');
  var dotsEl = root.querySelector('.bug-dots');
  var askT = root.querySelector('.bug-ask-t');
  var ask = root.querySelector('.bug-ask');
  var answer = root.querySelector('.bug-answer');
  var body = root.querySelector('.bug-body');
  var bar = root.querySelector('.bug-bar');
  var end = root.querySelector('.bug-end');

  // `bug` is the 0-based index of the flawed line
  var SNIPPETS = [
    {
      lang: 'PHP', bug: 4,
      code: [
        '<?php',
        '$user = $_POST["user"];',
        '$pass = $_POST["pass"];',
        '$query = "SELECT * FROM users "',
        '       . "WHERE name = \'$user\' AND pass = \'$pass\'";',
        '$result = $db->query($query);',
        'if ($result->num_rows > 0) login($user);'
      ],
      fix: '$stmt = $db->prepare(\n  "SELECT * FROM users WHERE name = ? AND pass = ?");\n$stmt->bind_param("ss", $user, $pass);',
      en: { ask: 'A login form. Where does it go wrong?', name: 'SQL injection',
            why: 'User input is pasted straight into the SQL text, so the database can’t tell data from commands. Typed input can change the meaning of the query itself.' },
      it: { ask: 'Un form di login. Dove sbaglia?', name: 'SQL injection',
            why: 'L’input dell’utente viene incollato direttamente nel testo SQL, quindi il database non distingue i dati dai comandi. Quello che si scrive può cambiare il significato della query.' }
    },
    {
      lang: 'C', bug: 5,
      code: [
        '#include <stdio.h>',
        '#include <string.h>',
        '',
        'void greet(const char *name) {',
        '    char buf[32];',
        '    strcpy(buf, name);',
        '    printf("Hello %s\\n", buf);',
        '}'
      ],
      fix: 'snprintf(buf, sizeof buf, "%s", name);',
      en: { ask: 'A tiny greeting function. Which line is unsafe?', name: 'Buffer overflow',
            why: 'strcpy copies until the end of the input and never checks the 32-byte buffer. A longer name writes past it into the stack, where the program keeps its own control data.' },
      it: { ask: 'Una piccola funzione di saluto. Quale riga non è sicura?', name: 'Buffer overflow',
            why: 'strcpy copia fino alla fine dell’input senza controllare il buffer da 32 byte. Un nome più lungo scrive oltre, sullo stack, dove il programma tiene i propri dati di controllo.' }
    },
    {
      lang: 'Python', bug: 6,
      code: [
        'from flask import Flask, request, send_file',
        'app = Flask(__name__)',
        '',
        '@app.route("/download")',
        'def download():',
        '    name = request.args["file"]',
        '    return send_file("/srv/uploads/" + name)'
      ],
      fix: 'return send_from_directory("/srv/uploads", name)',
      en: { ask: 'A file download endpoint. What’s the problem?', name: 'Path traversal',
            why: 'The file name is glued onto a folder path without any check, so a name that climbs up the directory tree can reach files outside the uploads folder.' },
      it: { ask: 'Un endpoint per scaricare file. Qual è il problema?', name: 'Path traversal',
            why: 'Il nome del file viene attaccato al percorso della cartella senza controlli, quindi un nome che risale l’albero delle directory può arrivare a file fuori dagli upload.' }
    },
    {
      lang: 'Python', bug: 6,
      code: [
        'import os',
        'from flask import request',
        '',
        '@app.route("/ping")',
        'def ping():',
        '    host = request.args["host"]',
        '    os.system("ping -c 1 " + host)',
        '    return "done"'
      ],
      fix: 'subprocess.run(["ping", "-c", "1", host], check=False)',
      en: { ask: 'A network check tool. Spot the flaw.', name: 'Command injection',
            why: 'The input becomes part of a shell command line. The shell treats some characters as “and now run this too”, so the input can add commands of its own.' },
      it: { ask: 'Uno strumento per controllare la rete. Trova la falla.', name: 'Command injection',
            why: 'L’input diventa parte di una riga di comando della shell. La shell interpreta alcuni caratteri come “e ora esegui anche questo”, quindi l’input può aggiungere comandi suoi.' }
    },
    {
      lang: 'JavaScript', bug: 4,
      code: [
        'const params = new URLSearchParams(location.search);',
        'const name = params.get("name");',
        'const box = document.querySelector("#greeting");',
        '',
        'box.innerHTML = "Welcome back, " + name;',
        'box.classList.add("visible");'
      ],
      fix: 'box.textContent = "Welcome back, " + name;',
      en: { ask: 'A welcome message read from the URL. Where’s the hole?', name: 'Cross-site scripting (XSS)',
            why: 'Text from the URL is inserted as HTML, so markup in it is rendered by the browser instead of shown as text. Anyone sending a crafted link controls what runs on the page.' },
      it: { ask: 'Un messaggio di benvenuto preso dall’URL. Dov’è il buco?', name: 'Cross-site scripting (XSS)',
            why: 'Il testo dell’URL viene inserito come HTML, quindi il browser interpreta il markup invece di mostrarlo come testo. Chi manda un link costruito ad arte decide cosa gira sulla pagina.' }
    }
  ];

  var UI = {
    en: { round: function (i) { return 'Snippet ' + i + ' / 5'; }, ok: 'Found it', ko: 'Not quite: the flaw is here',
          next: 'Next snippet →', results: 'See results →',
          verdict: ['The attackers thank you. Have another go?', 'The attackers thank you. Have another go?', 'A start. Follow the input line by line.',
                    'Not bad: the checker would be nervous.', 'Sharp eyes. One more and you’d be on the team.', 'Clean sweep. Team 0xFE would take you to Turin.'] },
    it: { round: function (i) { return 'Snippet ' + i + ' / 5'; }, ok: 'Trovata', ko: 'Non proprio: la falla è qui',
          next: 'Prossimo snippet →', results: 'Vedi il risultato →',
          verdict: ['Gli attaccanti ringraziano. Riprovi?', 'Gli attaccanti ringraziano. Riprovi?', 'Un inizio. Segui l’input riga per riga.',
                    'Niente male: il checker sarebbe nervoso.', 'Occhio fino. Un’altra e saresti in squadra.', 'En plein. La squadra 0xFE ti porterebbe a Torino.'] }
  };

  var lang = document.documentElement.lang === 'it' ? 'it' : 'en';
  var order = [], i = 0, results = [], answered = false;

  /* Tiny highlighter: comments, strings, keywords, $variables and numbers */
  var KW = /^(def|return|import|from|if|else|for|while|const|let|var|new|function|void|char|int|include|true|false|null)$/;
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlight(line) {
    var re = /(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$[A-Za-z_]\w*)|(\b\d+\b)|([A-Za-z_]\w*)/g;
    var out = '', last = 0, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      var t = m[0], cls = null;
      if (m[1]) cls = 't-com';
      else if (m[2]) cls = 't-str';
      else if (m[3]) cls = 't-var';
      else if (m[4]) cls = 't-num';
      else if (KW.test(t)) cls = 't-kw';
      out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t);
      last = m.index + t.length;
    }
    return out + esc(line.slice(last));
  }

  function shuffle(a) {
    for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; }
    return a;
  }

  function dots() {
    dotsEl.textContent = '';
    for (var k = 0; k < SNIPPETS.length; k++) {
      var d = document.createElement('i');
      if (results[k] === true) d.className = 'ok';
      else if (results[k] === false) d.className = 'ko';
      else if (k === i) d.className = 'now';
      dotsEl.appendChild(d);
    }
  }

  function show() {
    var s = SNIPPETS[order[i]], T = UI[lang];
    roundEl.textContent = T.round(i + 1);
    langEl.textContent = s.lang;
    askT.textContent = s[lang].ask;
    ask.hidden = false; answer.hidden = true; answered = false;
    codeEl.textContent = '';
    s.code.forEach(function (line, n) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      // The snippets are fixed strings in this file, escaped by highlight()
      b.innerHTML = highlight(line) || ' ';
      b.addEventListener('click', function () { pick(n, b); });
      b.addEventListener('keydown', function (e) {
        var btns = codeEl.querySelectorAll('button');
        if (e.key === 'ArrowDown' && btns[n + 1]) { e.preventDefault(); btns[n + 1].focus(); }
        if (e.key === 'ArrowUp' && btns[n - 1]) { e.preventDefault(); btns[n - 1].focus(); }
      });
      li.appendChild(b);
      codeEl.appendChild(li);
    });
    dots();
  }

  function explain() {
    var s = SNIPPETS[order[i]], T = UI[lang], ok = results[i];
    var v = answer.querySelector('.bug-verdict');
    v.textContent = ok ? T.ok : T.ko;
    v.className = 'bug-verdict ' + (ok ? 'ok' : 'ko');
    answer.querySelector('.bug-name').textContent = s[lang].name;
    answer.querySelector('.bug-why').textContent = s[lang].why;
    answer.querySelector('.bug-fix').textContent = s.fix;
    answer.querySelector('.bug-next').textContent = i < SNIPPETS.length - 1 ? T.next : T.results;
  }

  function pick(n, btn) {
    if (answered) return;
    answered = true;
    var s = SNIPPETS[order[i]];
    var btns = codeEl.querySelectorAll('button');
    results[i] = n === s.bug;
    if (!results[i]) btn.classList.add('is-miss');
    btns[s.bug].classList.add('is-bug');
    btns.forEach(function (b) { b.disabled = true; });
    ask.hidden = true; answer.hidden = false;
    explain();
    dots();
    answer.querySelector('.bug-next').focus({ preventScroll: true });
  }

  function finish() {
    var score = results.filter(Boolean).length;
    body.hidden = true; bar.hidden = true; end.hidden = false;
    end.querySelector('.bug-end-score b').textContent = score;
    end.querySelector('.bug-end-verdict').textContent = UI[lang].verdict[score];
    end.querySelector('.bug-again').focus({ preventScroll: true });
  }

  function start() {
    order = shuffle(SNIPPETS.map(function (_, k) { return k; }));
    i = 0; results = [];
    body.hidden = false; bar.hidden = false; end.hidden = true;
    show();
  }

  answer.querySelector('.bug-next').addEventListener('click', function () {
    if (i < SNIPPETS.length - 1) { i++; show(); codeEl.querySelector('button').focus({ preventScroll: true }); }
    else finish();
  });
  end.querySelector('.bug-again').addEventListener('click', function () { start(); codeEl.querySelector('button').focus({ preventScroll: true }); });

  start();

  window.ccBug = {
    setLang: function (l) {
      lang = l === 'it' ? 'it' : 'en';
      if (!end.hidden) { end.querySelector('.bug-end-verdict').textContent = UI[lang].verdict[results.filter(Boolean).length]; return; }
      roundEl.textContent = UI[lang].round(i + 1);
      askT.textContent = SNIPPETS[order[i]][lang].ask;
      if (answered) explain();
    }
  };
})();
