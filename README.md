# Andrea Faveri — personal site

Plain HTML, CSS and JavaScript. No build step.

## Preview locally
    python3 -m http.server 8000     # then open http://localhost:8000

## Files
- `index.html` — home page (English text lives here)
- `cyberchallenge.html` — detail page
- `js/i18n.js` — Italian translations, same keys as the `data-i18n` attributes in the HTML
- `js/main.js` — language and theme switch, header colour, reveals, journey previews, the cipher
- `css/style.css` — all styles; colours and sizes are tokens at the top
- `assets/` — pictures; `assets/credits.json` lists source and licence of each found picture

## Adding a detail page
Copy `cyberchallenge.html`, change its content and `data-i18n` keys, add the Italian strings to
`js/i18n.js`, and link it from a row in the Journey ledger on `index.html`.

## Publishing on GitHub Pages
This folder is the repository `RexSAS/RexSAS.github.io`; pushing to `main` publishes it at https://rexsas.github.io.
`.taste-skill/` is a design working folder and is ignored.
