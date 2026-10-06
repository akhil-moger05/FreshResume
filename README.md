# FreshResume

**Free ATS-friendly resume maker for Indian freshers.**
Fill a simple form, watch your resume update live, and download a clean PDF in minutes.

Live site: https://YOUR-SITE.onrender.com

<!-- Add a screenshot after your site is live:
![FreshResume builder](docs/screenshot-builder.png)
-->

---

## Why this project

Many freshers use fancy resume designs that Applicant Tracking Systems (ATS) cannot read.
FreshResume makes plain, parseable, one-page resumes that work for campus drives (TCS, Infosys, Wipro) and startups.

## Features

- **3 ATS-friendly templates:** Simple (black and white), Modern (two columns, blue), Clean (centered)
- **Live preview** that updates as you type
- **PDF download that matches the preview**, with real selectable text
- **Built for Indian freshers:** +91 phone, CGPA or percentage, projects, NPTEL and HackerRank certificates, quick-add skill chips
- **Auto-save** in the browser and on the server
- **Warnings** for missing sections
- **Fill example** button to see a full sample
- **Guide pages for SEO:** resume for freshers, BCA resume format, resume for IT freshers
- **Mobile friendly**, with an Edit and Preview switch on small screens

## Tech stack

| Part | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Backend | Node.js, Express |
| Database | SQLite (`node:sqlite`, no setup) |
| PDF | PDFKit |
| Hosting | Render |

## Run on your computer

You need **Node.js 22.5 or newer**.

```bash
git clone https://github.com/akhil-moger05/FreshResume.git
cd FreshResume
npm install
npm run dev
```

Open https://freshresume-3d6s.onrender.com

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start in development mode with live reload |
| `npm run build` | Build the website into `dist/` |
| `npm start` | Run the production server (run `build` first) |
| `npm run lint` | Check TypeScript for errors |

## Environment variables

Copy `.env.example` to `.env` for local use. Never push `.env` to GitHub.

| Variable | Use | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `SITE_URL` | Your real website link (sitemap and PDF footer) | `https://freshresume.in` |
| `DB_PATH` | Where the database file is kept | `./freshresume.db` |

## Deploy on Render

1. Push this repo to GitHub.
2. On [render.com](https://render.com) click **New > Web Service** and pick this repo.
3. Use these settings:

| Setting | Value |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/health` |
| Environment variable | `NODE_VERSION` = `22` |
| Environment variable | `SITE_URL` = your Render link |

The repo also has a `render.yaml` with these settings.

**Free plan notes**
- The site sleeps after 15 minutes. The first visit is slow.
- The database file is wiped on every deploy. Users still keep a copy in their browser.
- To keep data, use a paid plan with a disk and set `DB_PATH=/var/data/freshresume.db`.

## API

| Method | Path | What it does |
|---|---|---|
| `POST` | `/api/resume` | Save or update a resume |
| `GET` | `/api/resume/:id` | Load a saved resume |
| `POST` | `/api/download` | Build and download the PDF |
| `GET` | `/health` | Health check |
| `GET` | `/sitemap.xml` | Sitemap for Google |
| `GET` | `/robots.txt` | Robots file for Google |

## Folder structure

```
.
├── server.ts            Express server, SQLite, API routes, sitemap
├── pdf.ts               PDF drawing for the 3 templates
├── index.html           HTML entry with SEO tags and fonts
├── render.yaml          Render settings
├── src/
│   ├── App.tsx          Page routing, page titles
│   ├── config.ts        PAYMENTS_LIVE switch
│   ├── types/           Resume types, sample data, safe loading
│   ├── pages/           Home, Builder, SEO guide pages
│   └── components/
│       ├── Builder/     Resume form
│       ├── Templates/   Simple, Modern, Clean
│       └── ...          Navbar, Footer, Pricing popup, Ad box
└── package.json
```

## Payments (not live yet)

`src/config.ts` has `PAYMENTS_LIVE = false`. While it is `false`, Pro is a free launch offer and no card or UPI box is shown.

Before you charge money:
1. Add Razorpay checkout.
2. Check the payment **on the server** (see the TODO in `server.ts`).
3. Set `PAYMENTS_LIVE = true`.

## Roadmap

- [ ] Razorpay payment for the ₹49 Pro plan
- [ ] Keep saved resumes between deploys
- [ ] Real Google AdSense ad units
- [ ] More guide pages (MCA, B.Tech, internship resume)
- [ ] Cover letter maker
- [ ] Login with Google

## Author

**Akhil**, BCA student.
GitHub: [@akhil-moger05](https://github.com/akhil-moger05)

## License

Add a license file if you want others to reuse this code (for example MIT).
