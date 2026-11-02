# Cipher terminal portfolio

Live site: https://mingchenli.github.io/portfolio/

A static, zero-dependency personal site for a privacy engineer. No build step, no frameworks, no fonts or scripts from third parties, so the "0 trackers" footer is actually true.

```
cipher-portfolio/
├── index.html          page skeleton + Content-Security-Policy
└── assets/
    ├── content.js      ALL your content — edit this
    ├── main.js         renders content, name animation, email reveal, keyboard nav
    └── style.css       colors, type, layout (tokens at the top)
```

## Edit content

Everything lives in `assets/content.js`:

- `tagline`, `about`, `status`, `location`, `fingerprint`: hero section. Empty strings are hidden.
- `focus_areas`: the cards under "focus areas"; `cases` lists the case IDs each one links to.
- `cases`: one object per project. Optional `context` (a short paragraph), `metrics` (key numbers) and `deep` (extra detail) show when a case is opened. `status` is one of `ACTIVE`, `PUBLISHED`, `PREPRINT`, `SHIPPED`, `ARCHIVED` (sets the badge color). `threat` / `result` show on the card; `details` show when opened.
- `log`: publications, talks, essays. `type` is a free-text tag; `url` may be empty.
- `stack`: rendered as `stack.yaml`; add or rename keys freely.
- `contact`: email is split into `emailUser` + `emailDomain` and only assembled when a visitor clicks to reveal it.

Also update the `<title>` and `<meta name="description">` in `index.html`.

## Run locally

The Content-Security-Policy blocks scripts on `file://`, so serve it over HTTP:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Any static host works. GitHub Pages:

1. Push this folder to a repo named `<username>.github.io` (or any repo, then enable Pages).
2. Settings → Pages → Deploy from branch → `main` / root.

Cloudflare Pages / Netlify: point at the repo, no build command, output directory `/`.

## Customize

- Colors: CSS variables at the top of `style.css` (`--teal` is the accent, `--amber` marks active/confidential).
- Fonts: uses system fonts on purpose. To use JetBrains Mono / Inter, download the `.woff2` files into `assets/fonts/` and add `@font-face` rules. Don't link Google Fonts, that's a third-party request.
- Keyboard: `1`–`6` jump to sections; edit `order` in `main.js` if you add sections.
- Motion: the name scramble and cursor turn off for visitors with `prefers-reduced-motion`.
- Deploy: GitHub Pages builds from `main` (root). Any push to `main` republishes the site.
