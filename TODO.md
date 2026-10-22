# To do

Things decided but not built yet. (The contacts footer was done on 2026-10-22 as one quiet line.) Kept off the website (excluded in `_config.yml`).

## Email

Checked 2026-10-22: rxsas.it uses Cloudflare Email Routing (MX + SPF in place) and
Cloudflare accepts mail for `andreafaveri@rxsas.it` (unknown addresses are rejected, so a
rule exists). Left: send one test email and confirm it lands in the forwarding inbox
(Cloudflare → rxsas.it → Email → Email Routing; destination must be "Verified").
