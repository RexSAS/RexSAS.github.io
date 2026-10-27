# rxsas.it · logbook

Andrea Faveri's personal site. A static site (HTML, CSS, vanilla JS) published on GitHub Pages
from the `main` branch of `RexSAS/RexSAS.github.io`. It's served at https://rxsas.it through the
`CNAME` file, so don't delete `CNAME` or the domain stops working.

This is the project's logbook: it's updated after every change. The presentation of the
repo is in `README.md`.

## Current state (2026-10-22)

**Status:** live. The minimal rebuild was committed (`21d563c`) and pushed to `main` on
2026-10-22, replacing the previous site; GitHub Pages built it and https://rxsas.it serves it.
The previous local draft ("dark room") is archived outside the repo in
`../site-drafts/2026-10-19-dark-room/`.

**Verified:** headless Chromium screenshots at 1440 px and 390 px, with no overflow.

### Design
- **Colours:** soft dark grey ground `#0f0e12` (a faint violet tint), off-white text `#f2f1ed`. Colour only appears in the
  highlighted keywords and the toolbox: bone `#ecebe7`, sand `#dcc47e`, sky `#93b7cc` and red
  `#e2492a`.
- **Type:** Manrope Light (300) for "Greetings", every section title (large, tight letter
  spacing) and the trait phrases; Instrument Sans for text. No serif any more.
  Instrument Serif for section headings, Instrument Sans for text.
- **Motion:** "Greetings" fades in from a blur, with a thin line under it hinting to scroll.
  Sections rise in when they come into view, and the toolbox spines come up one by one. With
  `prefers-reduced-motion` on, nothing animates.
- **Language:** full English and Italian. English is in the HTML; Italian in `js/i18n.js`,
  keyed by `data-i18n` (inner HTML), `data-i18n-title`, `data-i18n-aria` and `data-i18n-alt`.
  Dynamic GitHub texts use `t()` and re-render through `langHooks` in `main.js`. English is the default; once a visitor switches, the
  choice is remembered across visits (`localStorage`); titles decrypt into the new language when switching.
  `cyberchallenge.html` follows the saved choice with a tiny inline script.

### Page sections (`index.html`)
0. **Dock:** in the top right, no background: a language button and a three-line menu icon.
   It fades in once half the greeting is scrolled past. The language button works like the old
   live site: it shows the *other* language (`IT` while in English, `EN` while in Italian),
   remembers the choice in `localStorage` and sets `<html lang>`; there are no Italian texts
   yet. The menu icon turns into an X and opens a glass dropdown with links to About and
   Toolbox (closes on link click, outside click or Esc).
1. **Greetings:** a full-screen dark page with "Greetings" in the middle. The word "decrypts"
   in out of hex noise (the effect from the old draft), then every 5 seconds decrypts into the
   next language: English, Italian, French, German, Spanish, Portuguese, Dutch, Swedish,
   Polish, Greek, Russian, Japanese (the `GREETINGS` list in `js/main.js`). It pauses while the
   tab is hidden or the greeting is scrolled away, and stays on "Greetings" with reduced motion.
   After 10 seconds at the top without scrolling, a faint "SCROLL DOWN" fades in above the
   white line (22% opacity, close to the background); any scroll hides it and restarts the timer.
2. **About:** the layout from the live site (portrait and facts on the left, a large paragraph on
   the right), with the coloured-keyword style. The text is a first, deliberately generic version (curiosity, IT, studies, gym).
   Highlight colours match the workbench groups exactly: code (bone, languages), building apps
   (sky), networks (sand, infrastructure), security (red). Nothing else gets a colour block. Passions and strong points use a second style,
   `.trait`: Manrope Light with a thin underline that draws in when the paragraph appears
   (understanding how things work, patient with problems, quick to pick up, never stop
   rebuilding, rabbit holes).
   Under the text, **Interesting things I did**: a small label and thin links to pages about
   them. For now only "CyberChallenge.IT" → `cyberchallenge.html`, an "Under construction"
   placeholder (`noindex`) with a link back. Add more links to `.did-list` as pages get written.
3. **The workbench** (was "The toolbox"): coloured book spines in four groups, built from
   what Andrea actually uses (checked against GitHub, `~/git` and the installed tools on
   2026-10-21). Each spine has a `title` tooltip saying where it's used.
   - Languages (bone): Python, C, Java, Kotlin, Bash, SQL, PHP, HTML/CSS/JS
   - Building apps (sky): Jetpack Compose, Android SDK, Flutter, Git, Neovim, VS Code
   - Security (red): Wireshark, nmap, gdb, Ghidra, radare2, Burp Suite, Cryptography
   - Infrastructure (sand): Linux, Docker, docker-compose, WireGuard, OpenWrt, Raspberry Pi,
     Cloudflare, Jellyfin, Sonarr · Radarr · Prowlarr, Watchtower
   They become wrapping tags below 1024 px.
4. **The road so far:** a list of rows (year, name, detail) with hairlines between them,
   newest first. Hovering a row dims the others and fades its photo in behind that row:
   80% of the row width, as tall as the photo's own proportions, centred on the row,
   with soft fades on all four edges (it slides from row to row as the pointer moves), darkened (`brightness(0.32)`) so the photo stays readable, cross-fading between two layers. Rows with a
   GitHub link get a small ↗. Entries: CS degree (Now), Karvo (2026),
   CyberChallenge.IT tutor (since 2024), The Oregon Thoughts CTF challenge (2024), high school diploma (2024),
   national final in Turin (2023), local round 4th of 20 (2023), started writing code (2016). Left out on purpose: Lab2Go,
   the escape-room site, the AriostOrienta talks, the BLSD certificate, Minecraft.
   Every row has a photo. Own photos: `cc-demo.jpg`, `cc-nazionale.jpg`, `cc-squadra.jpg`.
   `unife-dmi.jpg` is the Department of Mathematics and Computer Science building, taken
   from dmi.unife.it at Andrea's request (UniFE's photo, credited in the line under the list).
   Karvo shows `karvo-github.jpg`, a dark-mode screenshot of the Karvo README header on
   GitHub (logo, title, tagline, badges). The `data-fit="logo"` option (`.road-bg span.logo`)
   is still supported but unused.
   From Wikimedia Commons: `liceo-ariosto.jpg`
   (CC BY-SA 2.5, Lungoleno), `apple-iie.jpg` (Apple IIe, the machine The Oregon Trail ran on, CC0, stiefkind),
   `source-code.jpg` (CC0, Markus Spiske). The CC BY-SA photo (Liceo Ariosto) is credited in a small
   line under the list; keep it if they stay. On phones there's no hover, so it's a plain list.

5. **Keep track of me** (`#trace`): live GitHub activity, fetched in the visitor's browser
   and cached for an hour in `sessionStorage`.
   - A **Follow** pill next to the title (person-plus icon, live follower count from the
     GitHub API); it links to github.com/RexSAS, where the visitor clicks Follow. On hover it
     turns sand-gold and the plus turns.
   - **Pinned** repos as cards (name ↗, description, language with GitHub's colour, stars,
     forks), read live from the GitHub profile through `pinned.berrysauce.dev` (GitHub's API
     needs a token for pins). Pin or unpin on GitHub and the site follows within about 5 minutes (the
     request carries a `?t=` that changes every 5 minutes, to get past the service's 4-hour
     cache).
     Pinned repos also appear in "Recently updated", with a small gold "pinned" tag. The block stays hidden if the
     service fails or nothing is pinned.
   - **Activity:** contribution grid for the last year (from `github-contributions-api.jogruber.de`, since
     GitHub's own API needs a token for it), in sand tones, cells popping in column by column;
     each cell has a tooltip. On phones the grid scrolls sideways, starting at today.
   - **Recently updated:** the 6 most recently pushed public repos (GitHub REST API, no forks, archived or
     `RexSAS.github.io-backup`): name ↗, description, language and "updated N ago".
   - A pulsing green dot with "Live from GitHub, @RexSAS". If either request fails, a short
     message and a link to GitHub replace it.
   - Only **public** contributions count. To include private ones, turn on "Include private
     contributions on my profile" in GitHub's profile settings.

6. **Footer** (`#contact`): a small closing block under a hairline, lighter than a section.
   Left: "Say hi" (Manrope Light, ~2.5rem) and the email (grey, underline on hover). Right:
   GitHub, Instagram, Discord (copies `rexsas`, shows "copied") and Telegram, each a tiny
   grey label over the handle. Bottom line: © 2026 Andrea Faveri and "Top ↑".

### Files
- `index.html`: the page.
- `rexwoods/`: Rex Woods sub-site, separate design from the main site. `index.html` is still the "Under construction" placeholder (`noindex`); logos and photos go in `rexwoods/images/`
- `certificates.html` + `js/certs.js`: certificates page, built from the `CERTS` list at the top of
  `js/certs.js`; files in `assets/certificates/<name>/` (PDF + JPG preview per certificate)
- `cv.html`: CV shown as an image (`assets/cv-2026.png`) + download button for `assets/Andrea_Faveri_CV_2026.pdf`
  linked from "Interesting things I did".
- `cyberchallenge.html`: the CyberChallenge.IT page, built section by section (styles under
  "CyberChallenge page" in `style.css`, script and Italian texts in `js/cc.js`). Complete; indexable.
- `js/cc-map.js`: the interactive "What I learned" graph on that page (canvas, own physics,
  no libraries). Subjects and their items (languages, tools, techniques, concepts) are the
  `SUBJECTS` and `ITEMS` arrays at the top; an item's `of` lists every subject it links to.
- `js/cc-final.js`: the animated attack/defence round in "The final" on that page.
- `js/cc-bug.js`: the "Spot the bug" minigame on that page. The five snippets are the
  `SNIPPETS` array (code lines, index of the flawed line, the fix, EN/IT texts).
- `js/cc.js`: that page's title decrypt, count-up numbers, entrances and EN/IT switch.
- `css/style.css`: all styles (tokens on `:root`).
- `js/i18n.js`: the Italian dictionary (`window.I18N_IT`).
- `js/main.js`: the dock (show on scroll, menu, language choice), the decrypt effect and
  rotating greeting, and the scroll-in animations.
- `assets/andrea-portrait.jpg`: the portrait (shown 50% greyscale, full colour on hover, with a layered drop shadow). The other
  photos in `assets/` aren't used yet.
- `favicon.svg`: four book spines (bone, sky, red, sand) on the dark ground, echoing the
  workbench.
- `CNAME`, `_config.yml` (keeps README, Questions.txt and .taste-skill off the
  site).

### Content rules
- No phone number, home address or private or personal life details on the site.
- The CV is downloadable from `cv.html`. To update it, replace `assets/Andrea_Faveri_CV_2026.pdf` and re-render the image:
  `pdftoppm -png -r 220 -singlefile assets/Andrea_Faveri_CV_2026.pdf assets/cv-2026`
- No blog, no per-project pages and no "uses" page for now.
- No woodworking: it may get its own site later.
- No old school projects (`4S/`, `5S/`) and no childish stuff (escape room, middle-school talks).
- NFC/RFID is only an interest (nothing practical), so it isn't listed as a skill.
- No Minecraft server: Andrea asked for it to be removed.
- Tone: Andrea isn't job hunting. Copy is about curiosity and side projects, with as few
  CV/job references as possible.
- The summer restaurant kitchen job is left off. It's in `Questions.txt` if wanted later.

### Open points
- **About text:** first generic version is in; refine it with Andrea when wanted.
- **Workbench:** Ghidra, radare2, Burp Suite and Flutter come from the CV, not from this
  machine; confirm they're still true. Removed: Binary Ninja, OWASP, qBittorrent, Dart.

## Roadmap

### Now
- [x] First about text (generic) (2026-10-21)
- [ ] Decide the next sections, one step at a time (contact/footer, projects, record...)

### Next
- [ ] Write the Rex Woods sub-site (`rexwoods/`; first design sketch done, needs photos)
- [x] Push the finished CyberChallenge.IT page (2026-10-22)
- [ ] Send a test email to `andreafaveri@rxsas.it` (Cloudflare Email Routing accepts it; confirm it
      reaches the forwarding inbox)
- [x] First commit and push to `RexSAS/RexSAS.github.io` (2026-10-22). Check the repo name with
      `gh api repos/RexSAS/RexSAS.github.io --jq .full_name` before pushing; the old site
      lives in the `-backup` repo.
- [ ] Social/OpenGraph preview image and meta tags

### Later
- [ ] Performance pass: image sizes (WebP/AVIF), font loading, Lighthouse

### Done
- [x] Minimal rebuild, step 1: Greetings, About (placeholder text) and Toolbox (2026-10-21)

## Changelog
- **2026-10-27, step 27:** Rex Woods becomes its own sub-site folder: `rxwoods.html` moved to
  `rexwoods/index.html` (served at `/rexwoods/`), with `rexwoods/images/` for logos and photos. The
  home link now points to `rexwoods/` and reads "Rex Woods".
- **2026-10-27, step 28:** First Rex Woods design sketch, its own look and `rexwoods/style.css`:
  warm paper `#f3eee5`, ink `#1c1a17`, walnut `#6b4a2f` labels, Cormorant Garamond + Work Sans.
  Sections: top bar (RW mark, ← rxsas.it), hero with the full logo and a line, "From the bench"
  grid with 3 placeholder pieces, "Why wood" text placeholder, small footer. Logos cleaned into
  transparent `rw-mark-*` and `rexwoods-logo-*` PNGs (dark/light); the Gemini JPEG originals
  are kept outside the repo in `../site-drafts/rexwoods-logo-originals/`. Italian via `data-it`,
  following the saved `lang`. Checked at 1440 px and 390 px. Favicon `images/favicon.png`: the
  black RW mark on a rounded paper square (180 px), so it reads on light and dark tabs.
- **2026-10-28, step 29:** Rex Woods becomes a journal: the 3 placeholder frames are replaced by
  posts rendered from `POSTS` in `rexwoods/posts.js` (newest first): date · wood, title, first
  photo full width with the rest in a 2-column row (each opens full size), and the description
  (line breaks kept). EN/IT per post. Photos live in `rexwoods/posts/<YYYY-MM-name>/`; the how-to is
  at the top of `posts.js`. Empty list shows "The first work is coming soon." Tested with sample
  posts at 1440 px and 390 px.
- **2026-10-28, step 30:** Rex Woods editor in the browser. Posts moved from a JS list to
  `rexwoods/posts.json` (read by `posts.js`). Clicking "Andrea Faveri" in the footer asks for the
  password (only its SHA-256 is in `admin.js`; it hides the editor, it is not security) and opens a
  form: title, wood, date, description (EN/IT), photos. Publish shrinks photos to 1600 px JPEG in
  the browser and makes ONE commit on `main` via the GitHub API (photos + updated posts.json); Pages
  is live about a minute later. Publishing needs a fine-grained GitHub token (only this repo,
  Contents read/write), pasted once and kept in that browser's localStorage (`rexwoods-token`).
  **Since posts are committed from the browser, run `git pull` before working locally.** Tested
  end to end with a mocked GitHub API (password gate, commit contents, 401 failure path).
- **2026-10-28, step 31:** First real post published from the browser editor ("A Little Spoon",
  commit `08a88ef`). Photos were too big (a portrait photo filled the 860 px column, ~1150 px tall):
  the first photo now keeps its shape with `max-height: 70svh`, extra photos are square thumbnails,
  3 per row. Asset links now carry `?v=2026-10-28` (bump on change) because Cloudflare caches CSS/JS
  for 4 hours.
- **2026-10-28, step 32:** Removed the "Why wood" section (and its divider and CSS) from Rex Woods:
  no text for it yet; the journal now runs straight into the footer.
- **2026-10-28, step 33:** Rex Woods journal layout: posts sorted by their own `date` (newest first)
  on every render; on wide screens each post is photos | text, swapping sides on even posts;
  stacked on phones; less space between posts. Photos share one height (`min(65svh, 560px)`) and,
  when there are several, scroll sideways with snap plus ‹ 1 / n › controls. Top bar is sticky
  (blurred paper) and has the EN/IT button like the main site: shows the other language, switches
  live (posts re-render on `langchange`), shared with rxsas.it through `localStorage.lang`. Tested
  with sample posts at 1440 and 390 px.
- **2026-10-28, step 33:** Rex Woods journal layout: posts sorted by their own `date` (newest first)
  on every render; on wide screens each post is photos | text, swapping sides on even posts;
  stacked on phones; less space between posts. Photos share one height (`min(65svh, 560px)`) and,
  when there are several, scroll sideways with snap plus ‹ 1 / n › controls. Top bar is sticky
  (blurred paper) and has the EN/IT button like the main site: shows the other language, switches
  live (posts re-render on `langchange`), shared with rxsas.it through `localStorage.lang`. In the
  editor, "Forget token" moved to the left of the buttons. Tested with sample posts at 1440 and 390 px.
- **2026-10-24, step 26:** Certificates page: the Google AI Professional Certificate (Google ·
  Coursera) shown large with Verify ↗ and Download PDF; "See the 8 courses" opens a grid of the
  single-course certificates, each opening in a full-size viewer with its own verify/download.
  Driven by the `CERTS` list in `js/certs.js` so new certificates are one entry each. EN/IT, same
  footer as the other pages. PDFs renamed from Coursera IDs to readable slugs. Layout: on wide
  screens title, description (optional `desc` {en, it}) and buttons on the left, certificate on
  the right, courses underneath (4 per row); on phones the certificate goes on top.
- **2026-10-22, step 25:** contribution grid: low levels brightened (l1 0.35→0.55, l2 0.6→0.72,
  l3 0.85→0.88) so 1-contribution days are visible like on GitHub.
- **2026-10-22, step 24:** CV page: `cv.html` shows the 2026 CV as an image of the page (no PDF
  viewer chrome, works on phones) with a "Download PDF" button (EN/IT) and the same footer as
  the CyberChallenge page (back to home + socials, Discord copies the username). The download
  button fetches the PDF as a generic blob, so Firefox saves it instead of opening its viewer.
- **2026-10-22, step 23:** README rewritten as a presentation of the repo (logo, screenshots in
  `docs/`, what's inside, how it's built, structure, run locally, credits); the logbook moved to
  `LOGBOOK.md`. Both, `docs/` and `TODO.md` are excluded from the site. Pushed together with
  the 2×2 links, the three placeholder pages, the pulse, the tutor photo and the tablet fix.
- **2026-10-22, responsive check:** all pages at 360/390/768/1024 px, no horizontal overflow. Fix:
  "The final" round stacks (ring above the steps) up to 920 px, so tablets don't squeeze it.
- **2026-10-22, step 22c:** pulse on the CyberChallenge.IT dot tuned to a middle ground: 2.2 s, 9px
  ring, slight swell, faint glow.
- **2026-10-22, step 22b:** the four "Interesting things I did" links sit in a 2×2 grid.
- **2026-10-22, step 22:** "Interesting things I did" now lists CyberChallenge.IT (red, pulsing),
  RxWoods (sand), Certificates (sky) and "I also did a CV!" (white); the last three open
  "Under construction" pages. Each link's colour comes from `--c`. EN/IT.
- **2026-10-22, published:** the CyberChallenge.IT page and the home-page link changes went live.
- **2026-10-22, step 20b:** tutoring photo on the CyberChallenge page at 60% greyscale, 35% on hover.
- **2026-10-22, step 13e:** tried a red vertical line by "Interesting things I did", removed again.
- **2026-10-22, step 13d:** CyberChallenge.IT link a little bigger (22px) and further below the about
  text.
- **2026-10-22, step 13c:** the CyberChallenge.IT link on the home page carries the security red:
  a pulsing red dot, a 2px red underline, a red ↗; the text turns red on hover.
- **2026-10-22, step 21b:** CyberChallenge footer: "Back to home" is now plain text with a gold
  arrow that slides left and a gold underline that draws in on hover (no pill outline).
- **2026-10-22, step 21:** simple footer on the CyberChallenge page: a "← Back to home" pill and
  the socials (email, GitHub, Instagram, Discord copy, Telegram) on one line; the separate
  back link at the end of the tutoring section was removed.
- **2026-10-22, step 20:** CyberChallenge page, last section "A year later, as a tutor": photo,
  the story of going back in 2024, what I taught (network security, software security,
  attack/defence play), a big 6 (students from my class at the national final), a note on
  helping later classes, the two UniFE articles, and "← Back to the home page". The page is
  complete, so `noindex` was removed. Not pushed yet.
- **2026-10-22, step 19b:** less space between sections on the CyberChallenge page (its own
  `--section`: `clamp(96px, 11vw, 190px)`, about half the home page's).
- **2026-10-22, step 19:** CyberChallenge page, fourth section "Spot the bug": a minigame with
  five shuffled snippets (PHP SQL injection, C buffer overflow, Python path traversal, Python
  command injection, JavaScript XSS). Click the flawed line; the answer names the flaw,
  explains why it's dangerous and shows the fix; score dots, a results screen with a verdict,
  Play again. Keyboard: Tab/arrows and Enter. EN/IT. Not pushed yet.
- **2026-10-22, step 18:** CyberChallenge page, third section "The final" (29 June 2023, Turin):
  intro to attack/defence, an animated round (a dot travels a ring through Find the flaw →
  Write the patch → Build the exploit, the gold arc fills, the round counter goes up each lap;
  clicking a step jumps there and pauses), count-up figures (42 teams, ~234 competitors,
  410,000+ flags, 800 GB) and 0xFE's result with a link to the official ranking. EN/IT.
- **2026-10-22, step 17b:** CyberChallenge page balance pass: elements appear with a short stagger
  per section (the subject buttons no longer lag); smaller titles on that page (section titles,
  hero title, numbers); bigger dots and 13–15px labels in the graph with more room between
  them; graph area a little shorter.
- **2026-10-22, step 17:** CyberChallenge page, second section "What I learned": an Obsidian-style
  graph (canvas, hand-written physics). CyberChallenge.IT in the middle, 7 subjects around it;
  hovering a subject springs out its languages, tools, techniques and concepts (colour-coded),
  clicking keeps it open, dots can be dragged, shared items (e.g. Python) link to every subject
  they belong to and light up together on hover. Glass card with what I learned in the subject,
  legend, subject buttons for keyboard/touch, hidden text list for screen readers, EN/IT.
  Top bar on that page gets a soft background fade. Not pushed yet.
- **2026-10-22, step 16b:** CyberChallenge title smaller (`clamp(2rem, 6.4vw, 6rem)`, was up to 10rem).
- **2026-10-22, step 16:** CyberChallenge.IT page, first section: full-screen hero over the
  national-final photo (darkened), "2023 → 2024 · Ferrara, Turin", the title decrypting in,
  a one-line summary and four count-up numbers (75 h, 4th of 20, 22nd of 42, 8 h); slim top
  bar with ← Andrea Faveri and EN/IT. Not pushed yet.
- **2026-10-22:** checked email: Cloudflare Email Routing is set up and accepts
  `andreafaveri@rxsas.it`; only a delivery test is left.
- **2026-10-22, published:** committed and pushed the rebuild to `main`; it replaced the old
  site on rxsas.it.
- **2026-10-22, step 11g:** pinned repos are no longer hidden from "Recently updated"; they get a
  small gold "pinned" tag there instead.
- **2026-10-22, step 15d:** menu panel restyled as dark glass (see-through smoked tint, strong
  darkening blur, top sheen and bright rim).
- **2026-10-22, step 15c:** back to remembering the language choice across visits (English stays
  the default for anyone who never switched).
- **2026-10-22, step 15b:** English is always the default; the IT choice is kept only for the
  current visit (sessionStorage instead of localStorage).
- **2026-10-22, step 15:** EN/IT switch works across the whole page (incl. live GitHub texts and
  tooltips); new menu: glass panel that unfolds from the corner, numbered items sliding in, hover
  arrow, gold marker on the section on screen, "Say hi" entry and the email at the bottom.
- **2026-10-22, step 11f:** pinned repos refresh within ~5 minutes (cache-busting query and a
  5-minute local cache) instead of up to ~5 hours.
- **2026-10-22, step 14c:** footer as a small block between the two earlier attempts: "Say hi" +
  email on the left, labelled socials on the right, © and "Top ↑" below.
- **2026-10-22, step 14b:** lighter footer: no divider, no ©, smaller and fainter text, plus a
  "Top ↑" link.
- **2026-10-22, step 14:** footer as a single small line (© + email, GitHub, Instagram, Discord
  copy, Telegram), replacing the rejected section-like version.
- **2026-10-22, step 13b:** "Interesting things I did" links made smaller (body text size).
- **2026-10-22, step 13:** "Interesting things I did" under the about text, with a link to a new
  `cyberchallenge.html` placeholder page.
- **2026-10-22, step 11e:** "· imagine the private ones." after the contribution count.
- **2026-10-22, step 12b:** even more space between sections (`--section` now
  `clamp(160px, 24vw, 400px)`).
- **2026-10-22, step 12:** removed the lighter workbench band; all section titles in Manrope
  Light (Instrument Serif dropped entirely); more space between sections (`--section` now
  `clamp(120px, 17vw, 280px)`).
- **2026-10-22, step 11d:** the Star button became a Follow button for @RexSAS with the live
  follower count.
- **2026-10-22, step 11c:** Star button with live count next to the "Keep track of me" title,
  linking to the site's repo.
- **2026-10-22, step 11b:** pinned repos as cards above the activity grid, live from the profile;
  small uppercase labels (Pinned, Activity, Recently updated).
- **2026-10-22, step 11:** new "Keep track of me" section: live contribution grid and the latest
  public repos from GitHub; added to the menu.
- **2026-10-22, step 10b:** footer removed (Andrea didn't like it); contacts and notes saved in
  `TODO.md` for later.
- **2026-10-22, step 10:** footer with contacts (email, GitHub, Instagram, Discord copy button,
  Telegram) and a Contact link in the menu.
- **2026-10-21, step 9q:** hover images on the top rows are no longer cut off at the road's top
  edge; they extend over the workbench band and fade out on their own.
- **2026-10-21, step 9p:** workbench band lighter (`#1b1a20` → `#2a2830`) so it clearly stands out.
- **2026-10-21, step 9o:** the workbench sits on a lighter band (`--bg-raised: #2a2830`) that
  fades into the page above and below.
- **2026-10-21, step 9n:** halved the gap between the workbench and the road (the road heading
  no longer adds its own section padding on top of the workbench's).
- **2026-10-21, step 9m:** hover images fade out on the left and right edges too.
- **2026-10-21, step 9l:** hover images 20% smaller (80% of the row width), still centred.
- **2026-10-21, step 9k:** Karvo row shows a screenshot of its GitHub README header instead of
  the bare logo.
- **2026-10-21, step 9j:** hover photos are row-width with their natural height, centred on the
  hovered row (not cropped to the row's height); the image may extend past the section edges.
- **2026-10-21, step 9i:** hover images now fill only the hovered row's band, sliding between
  rows, instead of the whole section; the Karvo logo is sized to the row.
- **2026-10-21, step 9h:** degree row uses the DMI building photo from dmi.unife.it; Karvo row
  shows the app logo centred at half the section height instead of a photo.
- **2026-10-21, step 9g:** new photos: UniFE rectorate entrance for the degree, Italian ski
  slopes for Karvo (replacing the campus photo and the app screenshot).
- **2026-10-21, step 9f:** The Oregon Thoughts row now shows an Apple IIe (CC0) instead of the
  Bierstadt painting.
- **2026-10-21, step 9e:** road background lighter (brightness 0.13 → 0.32, saturation 0.5 → 0.75)
  so the photo is visible.
- **2026-10-21, step 9d:** photos for every road row from Wikimedia Commons (UniFE campus, Liceo
  Ariosto, Bierstadt's Oregon Trail, source code), with a credit line; the 1747 map was dropped.
- **2026-10-21, step 9c:** road rows added: high school diploma (2024, Liceo Ariosto) and
  "Started writing code" (2016).
- **2026-10-21, step 9b:** removed the OpenWrt repeater row (its repo, OpenWRT-Backup, is
  private) and made the Raspberry Pi tooltip generic. Only public repos are linked.
- **2026-10-21, step 9:** new "The road so far" section, rebuilt from the old live site without
  the school-level entries; hovering a row turns its photo into a very dark section background.
  Added to the menu.
- **2026-10-21, step 8b:** workbench legend aligned to the right of the heading (left again
  on phones).
- **2026-10-21, step 8:** new favicon: four coloured spines on a dark rounded square (was a red
  square with "af").
- **2026-10-21, step 7b:** about-text colours aligned with the workbench groups: added
  "building apps" (sky), removed the colour from IT, computer science and Ferrara.
- **2026-10-21, step 7:** toolbox rebuilt as "The workbench": four groups (languages, building
  apps, security, infrastructure), Kotlin/Compose/Android SDK/PHP/Bash/nmap/gdb/Raspberry Pi
  added from Andrea's repos and machine, tooltips on every spine, *arr tools merged into one.
- **2026-10-21, step 6c:** removed the homelab mention from the about text ("whatever I
  build, I never stop rebuilding").
- **2026-10-21, step 6b:** greeting and trait phrases switched to Manrope Light, a thinner,
  more linear sans (traits were serif italic, the greeting was Instrument Sans).
- **2026-10-21, step 6:** second highlight style for passions and strong points (`.trait`,
  serif italic with a drawn underline), and two strong points added to the about text.
- **2026-10-21, step 5:** replaced the about placeholder with a first, generic text about
  Andrea (enjoys understanding how things work, IT, computer science in Ferrara, homelab, gym).
- **2026-10-21, step 4:** faint "Scroll down" hint above the white line after 10 seconds idle
  on the greeting.
- **2026-10-21, step 3:** the greeting decrypts in from hex noise and cycles through 12
  languages every 5 seconds with the same effect.
- **2026-10-21, step 2b:** dock without the glass pill: just the language button (live-site
  style, shows the other language) and a three-line menu icon.
- **2026-10-21, step 2:** added the dock: a glass pill in the top right with the EN/IT toggle
  and a menu icon, shown after scrolling past the greeting.
- **2026-10-21, step 1e:** layered shadow on the portrait (deep dark drop plus a faint light halo, so it reads on the dark ground).
- **2026-10-21, step 1d:** background darkened again to `#0f0e12`; the portrait is now 50% greyscale instead of fully grey.
- **2026-10-21, step 1c:** background darkened to `#131216`.
- **2026-10-21, step 1b:** "Greetings" is now a small, plain sans (was a huge serif), and
  the background is a soft dark grey `#1d1c21` instead of pure black.
- **2026-10-21, minimal rebuild, step 1:**
  - Started over: a black page with "Greetings" in the middle, then the about section, then the
    toolbox.
  - Removed the boot log, terminal, homelab, now, record, footer, film grain, drifting bands,
    the decrypt effect and the IT/EN switch (`js/i18n.js` deleted).
  - The previous draft is archived in `../site-drafts/2026-10-19-dark-room/`.
- **2026-10-19, fourth pass ("more aura"):**
  - Darker background.
  - Film grain over the whole page.
  - Graded portrait with a reveal and colour on hover.
  - Blinking cursor at the end of the boot log.
  - Hero scroll parallax.
  - Drifting italic text bands.
  - The terminal section moved from the light background to near-black.
- **2026-10-19, third pass:**
  - New hero: boot log, the name decrypting, a casual line and the portrait on the right.
  - Journey photos are now inline images in the lines, instead of following the pointer.
  - Removed every Minecraft server reference.
  - `neofetch` prints the real Tux ASCII logo with coloured keys and colour blocks.
  - The about text is left-aligned with no hyphenation, so lines break only between words.
  - All copy rewritten to sound personal instead of job-oriented ("Say hi", "For the record",
    a new Now list).
- **2026-10-19, second pass (answers from `Questions.txt`):**
  - Removed the "In the room" photo section and the XOR "Find the key" puzzle.
  - Added the fake terminal, the Homelab section and the Now section with live GitHub activity.
  - The journey has a Minecraft server line and photos on hover. The hero, about and record now
    mention third year and tutoring.
  - Email is now `andreafaveri@rxsas.it`, and a LinkedIn link is in the footer.
  - Toolbox: removed reverse proxy, NFC/smart cards, Arduino and old electronics; added
    Cloudflare, Watchtower and qBittorrent.
- **2026-10-19:**
  - `Questions.txt` added to `.gitignore`, so it stays local and is never pushed.
  - Removed the Ferrara walls photo and its credit.
  - Added `README.md`, `Questions.txt` and `_config.yml`.
  - Rebuilt the site from scratch: dark, Instrument Serif, decrypt headings, XOR key puzzle,
    EN/IT.
  - Removed the old `cyberchallenge.html`, `school.html`, `4S/` and `5S/`.
