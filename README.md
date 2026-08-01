# Sugar — Artisan Bakery Website

A fully static, dependency-free website for **Sugar**, an artisan bakery. Built with plain HTML5, CSS3, and vanilla JavaScript — no build step, no framework, no npm required. Open `index.html` directly or deploy straight to GitHub Pages.

---

## 1. Project Overview

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, intro, featured products, why-choose-us, chef spotlight, Instagram preview, CTA |
| About | `about.html` | Bakery story, chef introduction, philosophy, signature specialties |
| Gallery | `gallery.html` | Filterable image gallery with lightbox (cakes, celebration cakes, cookies, sourdough, pastries, cupcakes) |
| Contact | `contact.html` | Address, phone, email, hours, map placeholder, WhatsApp/Instagram buttons, contact form |
| 404 | `404.html` | Custom not-found page (also used by GitHub Pages automatically) |

## 2. Folder Structure

```
/
├── index.html
├── about.html
├── gallery.html
├── contact.html
├── 404.html
├── css/
│   ├── style.css          → design tokens, layout, components
│   └── responsive.css     → breakpoints (1024px / 768px / 480px)
├── js/
│   └── script.js          → nav, scroll reveal, gallery filter, lightbox, form
├── images/
│   ├── hero/               → homepage hero image
│   ├── gallery/             → gallery grid + Instagram preview images
│   ├── chef/                 → chef & interior photos
│   ├── products/            → featured product photography
│   └── logo/                 → optional raster logo, if you replace the inline SVG mark
├── assets/
│   └── favicon.ico
├── README.md
└── .nojekyll               → tells GitHub Pages to skip Jekyll processing
```

## 3. Important — Read Before Publishing

This project ships with **placeholder business details** (address, phone, email, map, opening hours, and the JSON-LD structured data on `index.html`) so the layout can be reviewed immediately. None of it is real. If you publish this site before replacing those values:

- Search engines may index the fake address/phone/hours as fact.
- The **contact form is front-end only** — it shows a success message but does not send anywhere. Wire it up (see §7) before relying on it for real orders.
- The **map is a placeholder block**, not a live embed.

Search-and-replace the placeholders below before going live.

## 4. How to Customize Text

All copy lives directly in the HTML files — there is no CMS or templating layer.

1. Open the page you want to edit (`index.html`, `about.html`, etc.) in any text editor.
2. Text is organized in clearly commented `<section>` blocks (e.g. `<!-- HERO -->`, `<!-- FEATURED PRODUCTS -->`).
3. Edit the text inside `<h1>`, `<h2>`, `<p>` tags directly — no build step is required, just save and refresh.
4. The header/nav and footer are repeated on every page (there's no shared include system in a build-free static site), so if you change nav links or footer content, update it in **all five HTML files**.

**Business details to update everywhere** (search for these strings across all files):
- `128 Ashwood Lane` / `Your City, State` — address
- `+1-555-010-2030` / `+15550102030` — phone (used in `tel:` and `wa.me` links, keep digits only for `wa.me`)
- `hello@sugarbakery.example` — email
- Business hours in `contact.html` (`.hours-table`) and the JSON-LD block in `index.html`
- `https://www.instagram.com/sugar_leaven` — replace with your actual handle if different

## 5. How to Replace Images

Every `<img>` tag points to a path inside `/images/`, e.g.:

```html
<img src="images/hero/hero.jpg" alt="...">
```

To replace an image:

1. Drop your photo into the matching subfolder (`images/hero/`, `images/gallery/`, `images/chef/`, `images/products/`).
2. Name it exactly what the `src` attribute expects, **or** update the `src` path to match your filename.
3. Keep the `alt` text accurate and descriptive — it's used for accessibility and SEO. Don't leave it blank.
4. Recommended sizes for sharpness without bloating load time:
   - Hero: 1600×1000px (or wider, landscape)
   - Product/gallery cards: 800×1000px (portrait)
   - Chef portrait: 1000×1200px (portrait)
5. Compress images before uploading (TinyPNG, Squoosh, or similar) — nothing here compresses them for you.
6. The favicon at `assets/favicon.ico` is an empty placeholder file. Replace it with a real `.ico` (or update the `<link rel="icon">` tag to point to a `.png`).

## 6. How to Deploy to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push this entire folder's contents to the repository root (or to a `/docs` folder — see step 4).
3. In your repo: **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Choose your branch (e.g. `main`) and the folder (`/root` or `/docs`, matching where you pushed the files).
6. Save. GitHub will give you a URL like `https://yourusername.github.io/your-repo/` within a minute or two.
7. The included `.nojekyll` file tells GitHub Pages to skip Jekyll processing — keep it in the repo root; without it, folders starting with an underscore (if you ever add any) would be ignored.

## 7. Connecting the Contact Form

`contact.html` includes a working front-end form (validation, focus states, success message) but **no backend**. To make it actually deliver messages, pick one:

- **Formspree / Getform / Basin** (no server needed): change the `<form class="contact-form" novalidate>` tag to point `action` at your form endpoint and remove/adjust the `e.preventDefault()` in `js/script.js`'s submit handler, or follow your provider's snippet.
- **Your own backend**: point the form at your API endpoint and adjust `script.js` accordingly.

## 8. Connecting a Custom Domain

1. Buy a domain from any registrar.
2. In the registrar's DNS settings, add:
   - An `A` record pointing your root domain to GitHub Pages' IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), **or**
   - A `CNAME` record pointing a subdomain (e.g. `www`) to `yourusername.github.io`.
3. In your repo: **Settings → Pages → Custom domain**, enter your domain, and save. GitHub will create a `CNAME` file in your repo automatically.
4. Wait for DNS propagation (up to 24–48 hours), then enable **Enforce HTTPS** once available.

## 9. Replacing the Map Placeholder

`contact.html` contains a placeholder `<div class="map-placeholder">` where a real map should go:

1. Go to Google Maps, search your address, click **Share → Embed a map**.
2. Copy the provided `<iframe>` code.
3. Replace the `.map-placeholder` div with that `<iframe>`, keeping the parent `.map-embed` wrapper for styling.

## 10. SEO Tips

- Update `<title>` and `<meta name="description">` on every page — they're currently written for this demo bakery.
- Update `og:image` / `twitter:image` paths once real photography is in place; use a 1200×630px image for best link-preview results.
- Update `<link rel="canonical">` on each page to your real domain.
- Fill in the JSON-LD structured data block in `index.html` (`@type: "Bakery"`) with your real address, phone, and hours — this powers rich results in Google Search.
- Compress and correctly size every image (see §5) — page speed is a ranking factor.
- Add real alt text to every image; don't leave any generic or empty.
- Once live, submit your sitemap/URL to Google Search Console and verify ownership.
- Keep heading hierarchy intact (`<h1>` once per page, `<h2>` for section titles) — already structured this way throughout.

## 11. Accessibility & Performance Notes

- Images below the fold use `loading="lazy"`.
- Focus states are visible on all interactive elements (`:focus-visible`).
- Reduced-motion is respected via `prefers-reduced-motion`.
- All interactive icons/buttons carry `aria-label`s; verify these read correctly if you add new ones.

---

Questions or issues while customizing? Everything is contained in these four files, so a plain-text search across the project (e.g. "Find in Files" in VS Code) is the fastest way to locate anything that needs updating.
