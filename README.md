# Sambhav

**Sambhav** ("possible") is a student-led initiative that removes the small barriers stopping
students from thriving, starting with the basics every child deserves. Sambhav is **not yet a
registered 501(c)(3)**, and it grows through **high-school chapters**. The site is built around
**Start a Chapter** as its primary action and **Donate** (GoFundMe) as the secondary one.

## Learning Kits

Learning Kits is Sambhav's running campaign: it buys school supplies wholesale and **in person** in
Andhra Pradesh and delivers them **directly** to students in under-resourced government schools, with
a written teacher request, a receipt, and a letter from each school. On the June 2026 run, buying at a
local wholesale shop brought the cost to about **$3.50** a kit.

The first run reached **12 schools** and **over 1,200 students** across Narasaraopet (Palnadu district)
and Ammanabrolu (Prakasam district), on 23 and 24 June 2026. Those three figures are separate counts
and are never combined. Every number on the site traces to `Sambhav Proof Of Concept.docx.pdf`.

(`Project Vidya` was the name in an abandoned early draft. It is not used anywhere.)

## Local development

```bash
npm install
npm run dev      # Vite dev server on http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Tech: React 18 + Vite 5, React Router v6, GSAP + Three.js (the EQUIP/ENABLE/SUSTAIN scroll scene,
code-split into its own chunk), `react-simple-maps` (only used by the superseded `IndiaMap`).
The impact map is hand-rolled SVG over committed OpenStreetMap GeoJSON, with no map library.

Images are generated ahead of time into `public/media/` (avif + webp + jpg at 480/960/1440/2000) by a
Python/Pillow script. That is a build-time tool, **not** an npm dependency: `package.json` is unchanged.

## Routes

| Route | Page | Nav |
|---|---|---|
| `/` | Home — hero carousel, promo film, impact counters, mission teaser, LearningHero, get-involved | — |
| `/campaigns/learning-kits` | The running campaign, in full | **Campaigns ▾** |
| `/campaigns` | → redirects to `/campaigns/learning-kits` | — |
| `/mission` | Our mission + how the drive works | **Mission** |
| `/impact` | Impact counters + the two act impact map | **Impact** |
| `/about` | Founder story + values | **About** |
| `/partnerships` | Partner schools / orgs / chapters | **Partnerships** |
| `/start` | **Start a Chapter** — application form | **[Start a Chapter]** (CTA) |
| `/start-a-chapter` | → redirects to `/start` | — |
| `/donate` | Donate (GoFundMe) | **[Donate]** (CTA) |
| `/contact` | Contact form | footer |
| `*` | 404 Not Found | — |

Header: `Campaigns ▾ · Mission · Impact · About · Partnerships` + `[Donate]` + `[Start a Chapter]`.
Contact is in the footer. **Campaigns** is a keyboard-operable dropdown: Learning Kits is a link,
Teaching and Access are marked "Planned", are `aria-disabled`, and are not focusable.

GoFundMe holds the funds. There is no 501(c)(3) and no fiscal sponsor, so **no page may describe a
gift as tax deductible.**

## Design & architecture notes

This is a **structure/framework** layer over the existing single-page design — **the visual design is
unchanged.** New pages are composed from existing styles only:
- `src/index.css` — design tokens + global classes
- `src/pages/Home.css` — canonical section styles (reused across pages via `import './Home.css'`)
- `src/pages/Contact.css` — token-based form styles (Start a Chapter, Contact)

Do not author new visual design or edit `src/index.css` tokens. See `CLAUDE.md` for the full design
source-of-truth and the history guardrail (the old Jun-3 multi-page drafts were abandoned and removed —
do not resurrect them).

Per-route `<title>`/meta are set at runtime via `src/hooks/useDocumentTitle.js` as
`Page name | Sambhav` (the homepage is just `Sambhav`). This fixes titles for users and history but
**not** for crawlers, which need static prerendering: a build-pipeline change left as a future
decision. `public/` now has `robots.txt`, `og-image.jpg`, `favicon.ico`, `apple-touch-icon.png`,
`icon-192/512.png` and `site.webmanifest`. `sitemap.xml` is still missing (`robots.txt` references it).

### Motion and reduced motion
`prefers-reduced-motion: reduce` has a real fallback everywhere it matters, not a disabled animation:
the hero shows one static frame, the wordmark does not animate, the counters show final values
immediately, and the impact map renders a completely separate two-card static component. That static
map is also what every viewport under 768px gets, because pinned scroll sequences fight mobile browser
chrome.

The Stripe `DonationForm` is preserved (unmounted) in `src/components/_reserved/DonationForm/` for a
future on-site giving flow. See `CLAUDE.md` for `[CONFIG]` items to complete before launch.
