import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import crypto from 'crypto';
import { cleanResume, renderResumePdf } from './pdf.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const SITE_URL = (process.env.SITE_URL || 'https://freshresume.in').replace(/\/$/, '');
const SITE_NAME = SITE_URL.replace(/^https?:\/\//, '');

// ---------- Database ----------
// On Render free plan files are wiped on redeploy. Use DB_PATH with a disk to keep data.
const dbPath = process.env.DB_PATH || path.join(__dirname, 'freshresume.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS resumes (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    template TEXT NOT NULL DEFAULT 'simple',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

// ---------- Types ----------
type TemplateName = 'simple' | 'modern' | 'clean';
const TEMPLATES: TemplateName[] = ['simple', 'modern', 'clean'];
const ID_RE = /^[A-Za-z0-9_-]{6,64}$/;

interface ResumeData {
  id?: string;
  template?: TemplateName;
  personalInfo: Record<string, any>;
  summary?: string;
  education?: any[];
  skills?: any[];
  projects?: any[];
  certifications?: any[];
}

// ---------- Small helpers ----------
function pickTemplate(v: unknown): TemplateName {
  return TEMPLATES.includes(v as TemplateName) ? (v as TemplateName) : 'simple';
}

// ---------- Health, robots, sitemap ----------
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (_req, res) => {
  const pages = ['/', '/resume-for-freshers', '/bca-resume-format', '/resume-for-it-freshers'];
  const urls = pages.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n');
  res
    .type('application/xml')
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

// ---------- API: Save resume ----------
app.post('/api/resume', (req: Request, res: Response) => {
  try {
    const resume = req.body as ResumeData;
    if (!resume || typeof resume !== 'object' || typeof resume.personalInfo !== 'object') {
      return res.status(400).json({ success: false, error: 'Valid resume data required' });
    }

    let id = typeof resume.id === 'string' && ID_RE.test(resume.id) ? resume.id : '';
    if (!id) id = 'res_' + crypto.randomBytes(8).toString('hex');

    const template = pickTemplate(resume.template);
    const jsonStr = JSON.stringify({ ...resume, id, template });

    db.prepare(
      `INSERT INTO resumes (id, data, template) VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         data = excluded.data,
         template = excluded.template,
         updated_at = CURRENT_TIMESTAMP`
    ).run(id, jsonStr, template);

    return res.json({ success: true, id, message: 'Resume saved successfully' });
  } catch (error: any) {
    console.error('Error saving resume:', error);
    return res.status(500).json({ success: false, error: 'Could not save resume' });
  }
});

// ---------- API: Load resume ----------
app.get('/api/resume/:id', (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    if (!ID_RE.test(id)) {
      return res.status(400).json({ success: false, error: 'Bad id' });
    }
    const row = db.prepare('SELECT data FROM resumes WHERE id = ?').get(id) as { data: string } | undefined;
    if (!row) {
      return res.status(404).json({ success: false, error: 'Resume not found' });
    }
    return res.json({ success: true, resume: JSON.parse(row.data) });
  } catch (error: any) {
    console.error('Error fetching resume:', error);
    return res.status(500).json({ success: false, error: 'Could not load resume' });
  }
});

// ---------- API: Download PDF ----------
app.post('/api/download', (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const resume = body.resume as ResumeData | undefined;
    const template = pickTemplate(body.template ?? resume?.template);
    // TODO: when real payment (Razorpay) is added, check payment on the server here.
    // Right now the browser says if the user is Pro.
    const isPremium = body.isPremium === true;

    if (!resume || typeof resume.personalInfo !== 'object') {
      return res.status(400).json({ success: false, error: 'Valid resume data is required' });
    }

    const data = cleanResume(resume);

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 36, bottom: 36, left: 40, right: 40 },
      bufferPages: true,
      info: {
        Title: `${data.name || 'Fresher'} Resume`,
        Author: `FreshResume (${SITE_NAME})`,
      },
    });

    const filename = `${(data.name || 'Fresher').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    renderResumePdf(doc, data, { template, isPremium, siteUrl: SITE_URL });

    doc.end();
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'PDF generation failed' });
    } else {
      res.end();
    }
  }
});

// Unknown /api paths should give JSON 404, not the website page
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

// ---------- Start server ----------
async function startServer() {
  if (!isProd) {
    // Development: Vite gives hot reload
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve the built website from /dist
    const distPath = path.join(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
      console.error('dist folder not found. Run "npm run build" first.');
      process.exit(1);
    }
    app.use(
      express.static(distPath, {
        maxAge: '7d',
        setHeaders: (resp, filePath) => {
          if (filePath.endsWith('.html')) resp.setHeader('Cache-Control', 'no-cache');
        },
      })
    );
    // Same page list as the website. Unknown address gets a real 404 status (good for Google).
    const PAGES = new Set(['/', '/builder', '/resume-for-freshers', '/bca-resume-format', '/resume-for-it-freshers']);
    app.get('*', (req, resp) => {
      const clean = req.path.replace(/\/+$/, '') || '/';
      resp.status(PAGES.has(clean) ? 200 : 404).sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FreshResume running on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
