/* Rex Woods journal. Posts live in posts.json and their photos in posts/<YYYY-MM-name>/. Add them
   from the browser (click "Andrea Faveri" in the footer, see admin.js) or by hand: an entry is
   { "date": "2026-10-27", "dir": "posts/2026-10-cutting-board/", "photos": ["1.jpg", "2.jpg"],
     "title": { "en": "…", "it": "…" }, "wood": { "en": "…", "it": "…" }, "text": { "en": "…", "it": "…" } }
   Posts show newest first by `date`; `wood` and the `it` texts are optional. The language comes
   from <html lang>, set by the EN/IT button in index.html, which fires `langchange`. */
(function () {
  var journal = document.getElementById('journal');
  var last = [];
  var isIt = function () { return document.documentElement.lang === 'it'; };
  var pick = function (v) { return v && typeof v === 'object' ? (v[isIt() ? 'it' : 'en'] || v.en) : v; };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  function render(posts) {
    last = posts;
    var it = isIt();
    journal.textContent = '';
    if (!posts.length) {
      journal.appendChild(el('p', 'post-empty', it ? 'Il primo lavoro arriva presto.' : 'The first work is coming soon.'));
      return;
    }
    // Newest first by the post's own date, whatever order posts.json is in
    posts.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).forEach(function (p) {
      var post = el('article', 'post');
      var media = el('div', 'post-media');
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
      media.appendChild(photos);
      if (p.photos.length > 1) media.appendChild(slider(photos, p.photos.length, it));
      post.appendChild(media);

      var body = el('div', 'post-body');
      var meta = el('p', 'post-meta', new Date(p.date + 'T12:00').toLocaleDateString(it ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
      if (pick(p.wood)) meta.textContent += ' · ' + pick(p.wood);
      body.appendChild(meta);
      body.appendChild(el('h3', 'post-title', pick(p.title)));
      if (pick(p.text)) body.appendChild(el('p', 'post-text', pick(p.text)));
      post.appendChild(body);
      journal.appendChild(post);
    });
  }

  // ‹ 1 / n › under a photo strip; swiping and trackpad scrolling work on their own
  function slider(strip, n, it) {
    var bar = el('div', 'post-slider');
    var prev = el('button', '', '‹'), next = el('button', '', '›'), count = el('span', 'post-count');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', it ? 'Foto precedente' : 'Previous photo');
    next.setAttribute('aria-label', it ? 'Foto successiva' : 'Next photo');
    var left = function (i) { return strip.children[i].offsetLeft - strip.offsetLeft; };
    var current = function () {
      // At the far end the last photo may not reach the left edge, so count it as current
      if (strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2) return n - 1;
      var best = 0;
      for (var i = 1; i < n; i++) if (Math.abs(left(i) - strip.scrollLeft) < Math.abs(left(best) - strip.scrollLeft)) best = i;
      return best;
    };
    var go = function (i) { strip.scrollTo({ left: left(Math.max(0, Math.min(n - 1, i))), behavior: 'smooth' }); };
    var update = function () {
      var i = current();
      count.textContent = (i + 1) + ' / ' + n;
      prev.disabled = i === 0;
      next.disabled = i === n - 1;
    };
    prev.onclick = function () { go(current() - 1); };
    next.onclick = function () { go(current() + 1); };
    strip.addEventListener('scroll', update, { passive: true });
    strip.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', update); });
    update();
    bar.appendChild(prev); bar.appendChild(count); bar.appendChild(next);
    return bar;
  }

  window.renderPosts = render;
  document.addEventListener('langchange', function () { render(last); });
  fetch('posts.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { render([]); });
})();
