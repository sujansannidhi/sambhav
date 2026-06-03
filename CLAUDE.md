# Sambhav Website

React + Vite nonprofit site. Multi-page with React Router v6.

## Dev
```bash
npm run dev    # starts on :5173
npm run build  # production build to dist/
```

## Structure
- `src/pages/` — one file per route: Home, ProjectVidya, About, Impact, Contact
- `src/components/` — Header, Footer, PSAModal, DonationForm, Accordion, JaliDivider, ScrollReveal
- `src/index.css` — all CSS custom properties (design tokens)

## Key [CONFIG] items before launch
1. `src/components/PSAModal/PSAModal.jsx` line 3 — `PSA_VIDEO_ID` → YouTube video ID
2. `src/pages/ProjectVidya.jsx` line 10 — same `PSA_VIDEO_ID`
3. `src/components/DonationForm/DonationForm.jsx` ~line 40 — swap mock `fetch` with Stripe Checkout call
4. `src/pages/Contact.jsx` ~line 43 — swap mock with Formspree/Netlify Forms endpoint
5. `index.html` — replace `[CONFIG]` org email, OG image, analytics

## Design tokens
All in `src/index.css` under `:root`. Colors: `--cream`, `--indigo`, `--saffron`, `--terra`.
Fonts: Fraunces (display, `--font-display`) + Mukta (body, `--font-body`).

## PSA Modal logic
- First visit: auto-opens modal, sets `localStorage.vidya_psa_seen = 'true'` on close
- Return visits: shows hero video embed instead; manual replay button always present
- `prefers-reduced-motion`: skips autoplay, shows poster + play button
