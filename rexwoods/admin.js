/* Rex Woods editor. Click "Andrea Faveri" in the footer, type the password, and add a post from the
   browser: photos are shrunk here and committed with the updated posts.json straight to main through
   the GitHub API, then Pages republishes in about a minute.
   The password only hides the editor (anyone can read this file). What actually allows publishing is
   the GitHub token, pasted once and kept only in this browser's localStorage. Make it at
   github.com/settings/personal-access-tokens: fine-grained, only RexSAS/RexSAS.github.io,
   permission "Contents: Read and write". */
(function () {
  var REPO = 'RexSAS/RexSAS.github.io';
  var BRANCH = 'main';
  var BASE = 'rexwoods/';
  var PASS_SHA256 = 'e8438b9abc58833501d434f66c7b1c95b8e1d7bd1a90a584b5ec3f8a5da0cfa5';
  var TOKEN_KEY = 'rexwoods-token';

  var store = {
    get: function () { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? localStorage.setItem(TOKEN_KEY, v) : localStorage.removeItem(TOKEN_KEY); } catch (e) {} }
  };

  async function sha256(text) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  document.getElementById('admin-open').addEventListener('click', async function () {
    var pass = prompt('Password');
    if (pass === null) return;
    if (await sha256(pass) !== PASS_SHA256) { alert('Wrong password.'); return; }
    open();
  });

  var dialog;
  function open() {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'editor';
      dialog.innerHTML =
        '<form>' +
        '<h2>New post</h2>' +
        '<label>Title (EN)<input name="title_en" required></label>' +
        '<label>Title (IT)<input name="title_it"></label>' +
        '<div class="editor-row"><label>Wood (EN)<input name="wood_en"></label><label>Wood (IT)<input name="wood_it"></label></div>' +
        '<label>Date<input name="date" type="date" required></label>' +
        '<label>Description (EN)<textarea name="text_en" rows="5"></textarea></label>' +
        '<label>Description (IT)<textarea name="text_it" rows="5"></textarea></label>' +
        '<label>Photos (the first one is the big one)<input name="photos" type="file" accept="image/*" multiple required></label>' +
        '<label class="editor-token">GitHub token<input name="token" type="password" autocomplete="off"></label>' +
        '<p class="editor-status" role="status"></p>' +
        '<div class="editor-actions"><button type="button" class="editor-forget">Forget token</button>' +
        '<button type="button" class="editor-close">Close</button><button type="submit">Publish</button></div>' +
        '</form>';
      document.body.appendChild(dialog);
      var f = dialog.querySelector('form');
      f.querySelector('.editor-close').onclick = function () { dialog.close(); };
      f.querySelector('.editor-forget').onclick = function () { store.set(''); refreshToken(); status('Token forgotten on this browser.'); };
      f.addEventListener('submit', function (e) { e.preventDefault(); publish(f); });
    }
    var form = dialog.querySelector('form');
    form.date.value = new Date().toISOString().slice(0, 10);
    refreshToken();
    status('');
    dialog.showModal();
  }

  function refreshToken() {
    var has = !!store.get();
    dialog.querySelector('.editor-token').hidden = has;
    dialog.querySelector('.editor-forget').hidden = !has;
  }
  function status(msg) { dialog.querySelector('.editor-status').textContent = msg; }

  function slugify(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'post';
  }

  // Shrinks a photo to at most 1600 px and returns it as base64 JPEG (without the data: prefix)
  function shrink(file) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var k = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * k);
        c.height = Math.round(img.naturalHeight * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        resolve(c.toDataURL('image/jpeg', 0.82).split(',')[1]);
      };
      img.onerror = function () { reject(new Error('Could not read ' + file.name + '.')); };
      img.src = URL.createObjectURL(file);
    });
  }

  function b64utf8(text) {
    var bin = '';
    new TextEncoder().encode(text).forEach(function (b) { bin += String.fromCharCode(b); });
    return btoa(bin);
  }

  async function publish(form) {
    var token = store.get() || form.token.value.trim();
    if (!token) { status('Paste your GitHub token first.'); return; }
    var btn = form.querySelector('[type=submit]');
    btn.disabled = true;

    async function gh(path, opts) {
      opts = opts || {};
      var r = await fetch('https://api.github.com/repos/' + REPO + path, {
        method: opts.method || 'GET',
        headers: { Authorization: 'Bearer ' + token, Accept: opts.raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json' },
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        cache: 'no-store'
      });
      if (r.status === 401) throw new Error('GitHub refused the token (expired or wrong?).');
      if (!r.ok) throw new Error('GitHub error ' + r.status + ' on ' + path + '.');
      return opts.raw ? r.text() : r.json();
    }

    try {
      var files = Array.from(form.photos.files);
      var v = function (n) { return form[n].value.trim(); };
      var pair = function (n) { return v(n + '_en') ? (v(n + '_it') ? { en: v(n + '_en'), it: v(n + '_it') } : { en: v(n + '_en') }) : undefined; };
      var dir = 'posts/' + v('date').slice(0, 7) + '-' + slugify(v('title_en')) + '/';

      status('Reading the current posts…');
      var head = await gh('/git/ref/heads/' + BRANCH);
      var commit = await gh('/git/commits/' + head.object.sha);
      var posts = JSON.parse(await gh('/contents/' + BASE + 'posts.json?ref=' + head.object.sha, { raw: true }));
      if (posts.some(function (p) { return p.dir === dir; })) dir = dir.slice(0, -1) + '-' + Date.now().toString(36) + '/';

      var tree = [];
      for (var i = 0; i < files.length; i++) {
        status('Uploading photo ' + (i + 1) + ' of ' + files.length + '…');
        var blob = await gh('/git/blobs', { method: 'POST', body: { content: await shrink(files[i]), encoding: 'base64' } });
        tree.push({ path: BASE + dir + (i + 1) + '.jpg', mode: '100644', type: 'blob', sha: blob.sha });
      }

      var post = { date: v('date'), dir: dir, photos: files.map(function (f, i) { return (i + 1) + '.jpg'; }), title: pair('title') };
      if (pair('wood')) post.wood = pair('wood');
      if (pair('text')) post.text = pair('text');
      posts.unshift(post);
      posts.sort(function (a, b) { return b.date.localeCompare(a.date); });
      var json = await gh('/git/blobs', { method: 'POST', body: { content: b64utf8(JSON.stringify(posts, null, 2) + '\n'), encoding: 'base64' } });
      tree.push({ path: BASE + 'posts.json', mode: '100644', type: 'blob', sha: json.sha });

      // Nothing is visible until this last step moves main, so a failure above leaves the site untouched
      status('Publishing…');
      var newTree = await gh('/git/trees', { method: 'POST', body: { base_tree: commit.tree.sha, tree: tree } });
      var newCommit = await gh('/git/commits', { method: 'POST', body: { message: 'Rex Woods: add "' + post.title.en + '"', tree: newTree.sha, parents: [head.object.sha] } });
      await gh('/git/refs/heads/' + BRANCH, { method: 'PATCH', body: { sha: newCommit.sha } });

      store.set(token);
      refreshToken();
      // The photos reach the live site only after Pages rebuilds, so show the new post with local previews now
      var preview = posts.map(function (p) { return p === post ? Object.assign({}, p, { dir: '', photos: files.map(function (f) { return URL.createObjectURL(f); }) }) : p; });
      window.renderPosts(preview);
      form.reset();
      form.date.value = new Date().toISOString().slice(0, 10);
      status('Published. It will be live for everyone in about a minute.');
    } catch (err) {
      status(err.message + ' Nothing was published.');
    } finally {
      btn.disabled = false;
    }
  }
})();
