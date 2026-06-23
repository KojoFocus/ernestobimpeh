# ernestobimpeh.com

Personal site for Ernest Obimpeh — developer, poet, beekeeper, teacher, builder.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind — intentional, keeps styles co-located)
- **Google Fonts** — Playfair Display + DM Sans + DM Mono

## Structure

```
src/
  app/
    page.tsx          → Hub homepage (the front door)
    layout.tsx        → Root layout + metadata
    poetry/           → Writing world (poems, essays, about)
    honey/            → Focus Honey (shop + nature writing)
    build/            → Dev work + Amdeli Web Solutions
    teach/            → Teaching (web dev, maths, chemistry, physics + booking)
    t21/              → Talk2Someone mental wellness initiative
  components/
    SiteNav.tsx       → Shared back-nav for all sub-pages
    Reveal.tsx        → Scroll-reveal wrapper (IntersectionObserver)
  styles/
    globals.css       → Base reset + shared utilities
```

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

```bash
npm run build
```

Or connect the repo to Vercel — it auto-detects Next.js. Set the domain to `ernestobimpeh.com` in the Vercel dashboard.

## Key external links wired in

- **Honey shop** → [focushoney.com](https://focushoney.com)
- **Dev portfolio** → [amdeli-web-solutions.vercel.app](https://amdeli-web-solutions.vercel.app)
- **Fiverr** → [fiverr.com/ernestobimpeh](https://fiverr.com/ernestobimpeh)
- **Folio** → [folio-1cvo.vercel.app](https://folio-1cvo.vercel.app)
- **Enfoni** → [enfoni-mocha.vercel.app](https://enfoni-mocha.vercel.app)

## Pages to update with real content

- `poetry/PoetryTabs.tsx` → swap in real poems and essays as you write them
- `teach/TeachClient.tsx` → wire the booking form to an email API (Resend, Mailgun, etc.)
- `t21/T21Form.tsx` → wire the reach-out form to a backend or form service
