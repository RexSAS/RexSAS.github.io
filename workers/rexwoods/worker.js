// Serves rexwoods.rxsas.it from rxsas.it/rexwoods/ (the files stay in the main site repo).
// Deploy from this folder with `npx wrangler deploy`.
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = 'https://rxsas.it/rexwoods' + url.pathname + url.search;
    const res = await fetch(new Request(target, request), { redirect: 'manual' });

    // GitHub Pages redirects e.g. /rexwoods/posts → /rexwoods/posts/; keep the visitor on the subdomain
    const loc = res.headers.get('location');
    if (!loc) return res;
    const headers = new Headers(res.headers);
    headers.set('location', loc.replace(/^(https?:\/\/rxsas\.it)?\/rexwoods/, 'https://rexwoods.rxsas.it'));
    return new Response(res.body, { status: res.status, headers });
  }
};
