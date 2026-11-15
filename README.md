# Ernest Obimpeh

Personal, professional and research site. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## How the page is organised

One story, in order. Each section has a short menu word above its heading and a heading that follows on from the one before:

1. **Background**: Where I started
2. **Work**: What I've been building (newest first)
3. **Research**: What I'm trying to understand
4. **Contact**: Where I'm heading

Every section uses the same two-column row: when and what on the left, the story on the right. To add something new (a project, a paper, a talk), add a `Row` to the section it belongs to. Add a new section only when it has its first entry, and add it to `nav` in `app/page.tsx` at the same time.

## Where things are

- `lib/site.ts`: name, email, links, supervisor, the `updated` date, the milestone line (`path`, `now`), Elementa numbers and the screenshot lists. A link left empty hides it.
- `app/page.tsx`: all page copy and sections.
- `components/PathLine.tsx`: the milestone line under the name. Stops with an `href` jump to that part of the story. Keep it to about nine stops.
- `components/Header.tsx`: the menu. It hides while you scroll down, comes back when you scroll up, and underlines the current section.
- `components/Shots.tsx`: screenshot thumbnails that open larger on the page. Images live in `public/elementa/` and `public/pinn/`; add an entry (pixel size, caption, alt text) to `shots` in `lib/site.ts`.
- `components/SequenceTrace.tsx`: the two-students figure. It draws itself when it scrolls into view. Edit `lanes` to change steps or notes.
- `components/SessionsChart.tsx`: sessions per practical.
- `components/CopyEmail.tsx`: the Copy button next to the email address.
- `public/ernest-obimpeh-cv.pdf`: the CV. To update it, replace the file (same name) and redeploy.
- `app/opengraph-image.tsx`: the preview card shown when the link is shared. `app/icon.svg` is the browser-tab icon.
- `app/globals.css`: colour tokens, the notebook grid and the milestone-line animations.

Everything is readable before any script loads, and all motion respects the visitor's reduced-motion setting.

## Deploy

Pushing to `main` on GitHub deploys to Vercel automatically. No environment variables needed.
