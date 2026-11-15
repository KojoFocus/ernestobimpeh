# Ernest Obimpeh research portfolio

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things are

- `lib/site.ts`: your name, role, email, links, supervisor and Elementa session counts. A link left empty hides its button.
- `public/ernest-obimpeh-cv.pdf`: the CV behind the "CV (PDF)" button. To update it, replace this file with the new PDF (keep the same name) and redeploy.
- `app/opengraph-image.tsx`: the preview card shown when the link is shared. `app/icon.svg` is the browser-tab icon.
- `app/page.tsx`: all page copy and sections, told as one story in order: how it started, what I've built, the question it raised, where I'm heading.
- `components/PathLine.tsx`: the line of milestones under the name. Its stops come from `path` and `now` in `lib/site.ts`; add a stop there when something new happens.
- `components/SequenceTrace.tsx`: the animated hero figure (two students' action sequences). Edit the `lanes` array to change steps or notes.
- `components/SessionsChart.tsx`: bar chart of sessions per practical.
- `components/ElementaShots.tsx` and `public/elementa/`: the Elementa screenshots. To add or swap one, put the image in `public/elementa/` and add an entry (with its pixel size, caption and alt text) to the `shots` list.
- `components/Disclosure.tsx`: the expandable "Research details".
- `app/globals.css`: colour tokens (paper, ink, burette blue, endpoint pink) and the notebook grid.

Motion respects the visitor's reduced-motion setting.

## Deploy

Push to GitHub and import the repo on Vercel. No environment variables needed.
