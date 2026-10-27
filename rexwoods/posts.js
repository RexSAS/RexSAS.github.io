/* Rex Woods journal. Posts live in posts.json (newest first) and their photos in
   posts/<YYYY-MM-name>/. Add them from the browser (click "Andrea Faveri" in the footer, see
   admin.js) or by hand: an entry is
   { "date": "2026-10-27", "dir": "posts/2026-10-cutting-board/", "photos": ["1.jpg", "2.jpg"],
     "title": { "en": "…", "it": "…" }, "wood": { "en": "…", "it": "…" }, "text": { "en": "…", "it": "…" } }
   The first photo is the big one; `wood` and the `it` texts are optional. */
(function () {
  var it = false;
  try { it = localStorage.getItem('lang') === 'it'; } catch (e) {}
  var lang = it ? 'it' : 'en';
  var pick = function (v) { return v && typeof v === 'object' ? (v[lang] || v.en) : v; };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  var journal = document.getElementById('journal');

  function render(posts) {
    journal.textContent = '';
    if (!posts.length) {
      journal.appendChild(el('p', 'post-empty', it ? 'Il primo lavoro arriva presto.' : 'The first work is coming soon.'));
      return;
    }
    posts.forEach(function (p) {
      var post = el('article', 'post');
      var meta = el('p', 'post-meta', new Date(p.date + 'T12:00').toLocaleDateString(it ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
      if (pick(p.wood)) meta.textContent += ' · ' + pick(p.wood);
      post.appendChild(meta);
      post.appendChild(el('h3', 'post-title', pick(p.title)));

      var photos = el('div', 'post-photos');
      p.photos.forEach(function (src, i) {
        var a = el('a');
        a.href = p.dir + src;
        a.target = '_blank';
        var img = el('img');
        img.src = p.dir + src;
        img.alt = pick(p.title) + (p.photos.length > 1 ? ' (' + (i + 1) + '/' + p.photos.length + ')' : '');
        img.loading = i ? 'lazy' : 'eager';
        a.appendChild(img);
        photos.appendChild(a);
      });
      post.appendChild(photos);

      if (pick(p.text)) post.appendChild(el('p', 'post-text', pick(p.text)));
      journal.appendChild(post);
    });
  }

  window.renderPosts = render;
  fetch('posts.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { render([]); });
})();
