# FreshResume

Free resume maker for Indian freshers. React + Tailwind (frontend), Node.js + Express (backend), SQLite (database), PDFKit (PDF).

## Run on your computer

You need Node.js 22.5 or newer.

```
npm install
npm run dev
```

Open http://localhost:3000

## Put it online (Render)

1. Push this folder to GitHub.
2. On render.com click **New > Web Service** and pick your repo. Render reads `render.yaml`.
3. Wait for the build. You get a link like `https://freshresume.onrender.com`.
4. In Render, open **Environment** and set `SITE_URL` to your real link.

Manual settings (if you do not use render.yaml):

| Setting | Value |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Environment variable | `NODE_VERSION` = `22` |

Notes:
- Render free plan sleeps after 15 minutes. The first visit is slow.
- On the free plan the database file is wiped on each deploy. Users still keep a copy in their browser.
- To keep data, use a paid plan with a disk and set `DB_PATH=/var/data/freshresume.db`.

## Before you charge money

`src/config.ts` has `PAYMENTS_LIVE = false`. While it is false, Pro is a free launch offer and no card or UPI box is shown.
Add Razorpay, check the payment on the server (see the TODO in `server.ts`), then set it to `true`.

## Folder map

```
server.ts        Express server, SQLite, /api routes, sitemap
pdf.ts           PDF drawing for the 3 templates
src/App.tsx      Page routing, page titles
src/pages/       Home, Builder, 3 SEO guides
src/components/  Form, templates, navbar, footer, pricing popup
src/config.ts    PAYMENTS_LIVE switch
render.yaml      Render settings
```
