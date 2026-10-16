# Personal site: session notes

Handoff notes so work can resume in a new session. Last updated 2026-10-17.
This file is saved in the repo (public on GitHub) but excluded from the website by `_config.yml`.

## Where things are

| What | Where |
| --- | --- |
| Project folder (this folder) | `/home/rexsas/git/project/site` |
| Live site | https://rexsas.github.io |
| Repo for the live site | `RexSAS/RexSAS.github.io` (this folder, branch `main`) |
| Old 2024 site | `RexSAS/RexSAS.github.io-backup` (tag `old-site-2024`) |
| Original CV | `/home/rexsas/Downloads/Andrea_Faveri_CV.pdf` |
| New personal photos | `/home/rexsas/Pictures/mie` |

**To publish a change:** edit the files, then run `git add -A && git commit -m "..." && git push`.
GitHub Pages updates within about a minute. Git and `gh` are logged in as RexSAS.

**Careful:** the old repo was renamed to `-backup`, and GitHub redirects the old name to it.
Always push from this folder, whose remote is the new `RexSAS.github.io`.

## What we built

Plain HTML, CSS and JavaScript, with no build step and no framework.
- **Languages:** English and Italian, with an IT/EN button. English is written in the HTML; the Italian strings are in `js/i18n.js` under the same keys.
- **Colour themes:** light and dark, following the system setting, with a toggle.
- **Design:** modern and minimal.
  - Libre Franklin for headings, Source Serif 4 for text.
  - White and black, with orange for buttons and the hero, and sage, acid yellow and black blocks for chapters.
  - No shadows or gradients.
  - The hero shows the name cut by the line between a white field and an orange one, as a nod to attack and defence.

### Pages
- **`index.html`** (home):
  - Hero
  - About: photo, facts, bio, education and tools
  - Full-width photo of Andrea in the lab
  - Journey timeline, from 2016 to now, with a hover picture on each row
  - Skills poster
  - CyberChallenge summary, with a live Vigenère cipher
  - Results and roles table
  - Ferrara walls photo
  - Contact: email, GitHub, Instagram
  - Footer
- **`cyberchallenge.html`:**
  - The programme
  - What I learned (six areas)
  - The national final, with the attack/defence round
  - Tools
  - Tutor year (2024)
  - UniFe news links
- **`school.html`:** AriostOrienta 2022 and 2023 (games in C, then the "Fuga dall'Ariosto" escape room), and Lab2Go (Arduino sensors to an online database).
- **`4S/`, `5S/`:** old school code kept because the School projects page links to it: `tris.c`, `hangman.c`, and the escape-room site.

### Content sources
- **CV:** Europass, mid-2024.
- **Old site:** rexsas.github.io from 2024, now in the `-backup` repo.
- **UniFe news articles about CyberChallenge 2023:**
  - [Team article](https://www.unife.it/it/notizie/2023/vita-universitaria/squadra-unife-cyber-challenge-2023)
  - [Final article](https://www.unife.it/it/notizie/2023/vita-universitaria/finale-cyber-challenge-2023)
- **Public GitHub repos.**

Key facts used:
- Liceo Scientifico L. Ariosto, Applied Sciences, 2019 to 2024.
- Now studying Computer Science at UniFe. Assumed start: autumn 2024.
- CyberChallenge 2023:
  - 75 hours of training.
  - Local round: 8 hours, individual, 31 May 2023. 4th of 20.
  - Team 0xFE: six members, four still in high school.
  - National final: Turin, ITC-ILO campus, 29 June 2023. Eight hours of attack/defence, 22nd of 42 teams, over 26,500 points.
- Tutor at CyberChallenge 2024: network security, software security, attack/defence.
- AriostOrienta: speaker in 2022; escape-room site in 2023.
- Lab2Go, 2023.
- BLSD certificate, adults and children (Italian Red Cross, 2023), and a workplace safety course (basic and medium level).
- Self-taught: HTML and CSS from age 11, C and C++, Java (Spigot Minecraft plugins), Python (hand tracking with MediaPipe), Dart and Flutter (a notes app used daily).

### Images (`assets/`)
- **Own photos:** `andrea.jpg` (portrait cropped from `Pictures/mie`), `lab.jpg`, `cc-demo.jpg`, `cc-nazionale.jpg` and `cc-squadra.jpg` (from the old site).
- **University of Ferrara photo:** `cc-gara-locale.jpg`, credited in the footer.
- **Screenshots of Andrea's own escape-room site:** `escape-start.jpg`, `escape-riddle.jpg`.
- **Wikimedia Commons, credited in the footers:** `walls.jpg`, `map-1747.jpg`, `enigma.jpg`, `ariosto.jpg`, `arduino.jpg`. Sources and licences are in `assets/credits.json`.

## Decisions and preferences (keep these)
- **No CV download.** Andrea is editing the CV.
- **No GitHub projects section.** Removed on purpose, to come back when there are better projects.
- **Not published:** home address, phone number and date of birth.
- **Not linked:** `progetti_informatica` (the old school exercises), which is left out of the new repo.
- **Personal photos:** other people in them are cropped out. Only use photos where Andrea is alone, or group photos from public events.
- **Facts:** don't invent anything. Anything not in the CV, the old site or UniFe articles gets asked about first.

## To do next
1. **Instagram photos (@rex_sas).** Instagram can't be accessed directly; there's no connection, and it requires a login.
   - Plan: request the data download in Instagram (Settings → Accounts Center → Your information and permissions → Download your information → Some of your information → Media, high quality). Put the zip somewhere, e.g. `~/Pictures/instagram.zip`.
   - Then pick the best photos, crop and place them.
2. **Confirm the lab photo caption.** `lab.jpg` is captioned "In the lab, CyberChallenge training at the University of Ferrara". Is that right?
3. **Confirm the university start year.** It's assumed to be autumn 2024.
4. **"Side quests".** Andrea mentioned other activities. Ask what they are; they might deserve a section or page.
5. **Optional:**
   - New projects section, when cooler projects exist.
   - More detail pages, e.g. a university page.
   - Remove `progetti_informatica` from the `-backup` repo if wanted.
6. **Re-check the design after any big change.** Run the design skill's inspector, with headless Chromium launched with `--no-sandbox` through a wrapper script:
   - `node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs index.html`
   - `CHROME_PATH` must point to a wrapper that runs `~/.cache/ms-playwright/chromium-1247/chrome-linux64/chrome --no-sandbox "$@"`.
   - Current state: all three pages pass with 0 failures. The only warning is "no video", which is accepted because no honest clip exists.

## How to resume
Open Claude Code in `/home/rexsas/git/project/site` and say something like:
"Read SESSION-NOTES.md and let's continue."
