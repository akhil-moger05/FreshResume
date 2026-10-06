// Builds the resume PDF. Layout follows the 3 website templates (simple, modern, clean).
export type TemplateName = 'simple' | 'modern' | 'clean';

// ---------- Text clean up ----------
// PDF standard fonts only know basic Latin letters. Clean text so no broken boxes show up.
export function safe(v: unknown, max = 2000): string {
  if (typeof v !== 'string') return '';
  return v
    .replace(/₹/g, 'Rs. ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/[^\n\r\t\x20-\x7E\xA0-\xFF\u2022]/g, '')
    .trim()
    .slice(0, max);
}

function list(v: unknown, max = 20): any[] {
  return Array.isArray(v) ? v.slice(0, max) : [];
}

export function asUrl(v: string): string {
  if (!v) return '';
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

// ---------- Clean data ----------
export interface CleanResume {
  name: string;
  email: string;
  phone: string;
  city: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  summary: string;
  education: { degree: string; institution: string; location: string; endYear: string; score: string }[];
  skills: string[];
  projects: { title: string; techStack: string; description: string; link: string }[];
  certs: { name: string; issuer: string; year: string; link: string }[];
}

export function cleanResume(resume: any): CleanResume {
  const p = resume?.personalInfo ?? {};
  return {
    name: safe(p.fullName, 80),
    email: safe(p.email, 120),
    phone: safe(p.phone, 40),
    city: safe(p.city, 80),
    linkedIn: safe(p.linkedIn, 200),
    github: safe(p.github, 200),
    portfolio: safe(p.portfolio, 200),
    summary: safe(resume?.summary, 1500),
    education: list(resume?.education)
      .map((e) => ({
        degree: safe(e?.degree, 150),
        institution: safe(e?.institution, 150),
        location: safe(e?.location, 80),
        endYear: safe(e?.endYear, 20),
        score: safe(e?.score, 40),
      }))
      .filter((e) => e.degree || e.institution),
    skills: list(resume?.skills, 60)
      .map((s) => safe(s, 40))
      .filter(Boolean),
    projects: list(resume?.projects)
      .map((x) => ({
        title: safe(x?.title, 120),
        techStack: safe(x?.techStack, 200),
        description: safe(x?.description, 1200),
        link: safe(x?.link, 200),
      }))
      .filter((x) => x.title),
    certs: list(resume?.certifications)
      .map((c) => ({
        name: safe(c?.name, 150),
        issuer: safe(c?.issuer, 100),
        year: safe(c?.year, 20),
        link: safe(c?.link, 200),
      }))
      .filter((c) => c.name),
  };
}

// ---------- Drawing ----------
interface Options {
  template: TemplateName;
  isPremium: boolean;
  siteUrl: string;
}

export function renderResumePdf(doc: PDFKit.PDFDocument, r: CleanResume, opts: Options) {
  const { template, isPremium, siteUrl } = opts;

  const L = doc.page.margins.left;
  const TOP = doc.page.margins.top;
  const R = doc.page.width - doc.page.margins.right;
  const W = R - L;
  const BOTTOM = doc.page.height - doc.page.margins.bottom;

  // Current column (modern template uses two columns)
  let colX = L;
  let colW = W;
  let onOverflow: () => void = () => {
    doc.addPage();
    doc.y = TOP;
  };

  const ensure = (need: number) => {
    if (doc.y + need + 1 > BOTTOM) onOverflow();
  };

  const pageIndex = (): number => (doc as any)._pageBuffer.indexOf(doc.page);
  const nextPageOrAdd = () => {
    const idx = pageIndex();
    if (idx + 1 < doc.bufferedPageRange().count) doc.switchToPage(idx + 1);
    else doc.addPage();
    doc.y = TOP;
  };

  // Write a block of text inside the current column.
  const text = (
    str: string,
    font: string,
    size: number,
    color: string,
    o: { x?: number; width?: number; align?: 'left' | 'center' | 'right' | 'justify'; lineGap?: number; link?: string; underline?: boolean; spacing?: number } = {}
  ) => {
    if (!str) return;
    const x = o.x ?? colX;
    const opt: any = { width: o.width ?? colW, lineGap: o.lineGap ?? 0 };
    if (o.align) opt.align = o.align;
    if (o.link) opt.link = o.link;
    if (o.underline) opt.underline = true;
    if (o.spacing) opt.characterSpacing = o.spacing;
    doc.font(font).fontSize(size);
    ensure(doc.heightOfString(str, opt));
    doc.fillColor(color).text(str, x, doc.y, opt);
    doc.x = colX;
  };

  // Cut long text so it fits in a width
  const fit = (str: string, font: string, size: number, width: number): string => {
    doc.font(font).fontSize(size);
    if (doc.widthOfString(str) <= width) return str;
    let s = str;
    while (s.length > 4 && doc.widthOfString(s + '...') > width) s = s.slice(0, -1);
    return s + '...';
  };

  // Write one line on the right side at height y. Cursor does not move.
  const rightText = (str: string, y: number, width: number, font: string, size: number, color: string, link?: string) => {
    if (!str) return;
    const savedY = doc.y;
    const shown = fit(str, font, size, width);
    const opt: any = { width, align: 'right', lineBreak: false };
    if (link) {
      opt.link = link;
      opt.underline = true;
    }
    doc.font(font).fontSize(size).fillColor(color).text(shown, colX + colW - width, y, opt);
    doc.x = colX;
    doc.y = savedY;
  };

  const rule = (color: string, weight: number, x1 = colX, x2 = colX + colW) => {
    doc.strokeColor(color).lineWidth(weight).moveTo(x1, doc.y).lineTo(x2, doc.y).stroke();
  };

  const gap = (n: number) => {
    doc.y += n;
  };

  const linkOf = (v: string) => (v ? asUrl(v) : undefined);

  // ---------- Section headings ----------
  const heading = (title: string) => {
    const t = title.toUpperCase();
    ensure(46);
    if (template === 'clean') {
      const y = doc.y;
      doc.font('Helvetica-Bold').fontSize(9.5);
      const tw = doc.widthOfString(t, { characterSpacing: 0.8 });
      doc.fillColor('#374151').text(t, colX, y, { characterSpacing: 0.8, lineBreak: false });
      doc
        .strokeColor('#E5E7EB')
        .lineWidth(0.75)
        .moveTo(colX + tw + 8, y + 5)
        .lineTo(colX + colW, y + 5)
        .stroke();
      doc.x = colX;
      doc.y = y + 16;
    } else if (template === 'modern') {
      text(t, 'Helvetica-Bold', 9.5, '#1E3A8A', { spacing: 0.8 });
      gap(2);
      rule('#BFDBFE', 0.75);
      gap(6);
    } else {
      text(t, 'Helvetica-Bold', 9.5, '#111827', { spacing: 0.8 });
      gap(2);
      rule('#9CA3AF', 0.75);
      gap(6);
    }
  };

  // ---------- Header ----------
  const nameText = (r.name || 'YOUR FULL NAME').toUpperCase();

  if (template === 'clean') {
    const parts = [r.email, r.phone, r.city, r.linkedIn, r.github, r.portfolio].filter(Boolean);
    text(nameText, 'Helvetica-Bold', 22, '#111827', { align: 'center' });
    gap(3);
    text(parts.join('  |  '), 'Helvetica', 9, '#4B5563', { align: 'center' });
    gap(8);
    rule('#E5E7EB', 1);
    gap(12);
  } else if (template === 'modern') {
    const parts = [r.email, r.phone, r.city, r.linkedIn, r.github, r.portfolio].filter(Boolean);
    text(nameText, 'Helvetica-Bold', 22, '#1E3A8A');
    gap(4);
    text(parts.join('   •   '), 'Helvetica', 9, '#475569');
    gap(8);
    rule('#2563EB', 1.5);
    gap(12);
  } else {
    const parts = [r.email, r.phone, r.city, r.linkedIn, r.github, r.portfolio].filter(Boolean);
    text(nameText, 'Helvetica-Bold', 22, '#111827');
    gap(4);
    text(parts.join('  •  '), 'Helvetica', 9, '#374151');
    gap(8);
    rule('#111827', 1.5);
    gap(12);
  }

  // =====================================================
  // TEMPLATE: SIMPLE
  // =====================================================
  const drawSimple = () => {
    if (r.summary) {
      heading('Professional Summary');
      text(r.summary, 'Helvetica', 9.5, '#1F2937', { align: 'justify', lineGap: 1.5 });
      gap(10);
    }

    if (r.education.length) {
      heading('Education');
      r.education.forEach((e) => {
        ensure(34);
        const y = doc.y;
        text(e.degree || 'Degree Program', 'Helvetica-Bold', 10, '#111827', { width: W - 160 });
        text([e.institution, e.location].filter(Boolean).join(', '), 'Helvetica', 9, '#4B5563', { width: W - 160 });
        const endY = doc.y;
        if (e.endYear) rightText(e.endYear, y, 150, 'Helvetica-Bold', 9, '#111827');
        if (e.score) rightText(e.score, y + (e.endYear ? 11 : 0), 150, 'Helvetica', 9, '#374151');
        doc.y = endY + 6;
      });
      gap(4);
    }

    if (r.skills.length) {
      heading('Technical Skills');
      text(r.skills.join('  •  '), 'Helvetica', 9.5, '#1F2937', { lineGap: 2 });
      gap(10);
    }

    if (r.projects.length) {
      heading('Academic & Personal Projects');
      r.projects.forEach((p) => {
        const linkW = p.link ? 180 : 0;
        const titleW = W - (p.link ? linkW + 8 : 0);
        doc.font('Helvetica-Bold').fontSize(10);
        const titleH = doc.heightOfString(p.title + (p.techStack ? ' | Tech: ' + p.techStack : ''), { width: titleW });
        ensure(titleH + 16);
        const y = doc.y;
        doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text(p.title, colX, y, { width: titleW, continued: !!p.techStack });
        if (p.techStack) {
          doc.font('Helvetica-Oblique').fontSize(9).fillColor('#4B5563').text(' | Tech: ' + p.techStack, { width: titleW, continued: false });
        }
        const endY = doc.y;
        if (p.link) rightText(p.link, y + 1, linkW, 'Helvetica', 8, '#374151', linkOf(p.link));
        doc.x = colX;
        doc.y = endY + 1;
        text(p.description, 'Helvetica', 9, '#1F2937', { lineGap: 1.5 });
        gap(7);
      });
      gap(3);
    }

    if (r.certs.length) {
      heading('Certifications & Achievements');
      r.certs.forEach((c) => {
        ensure(26);
        const y = doc.y;
        const nameStr = c.name + (c.issuer ? ` (${c.issuer})` : '');
        text(nameStr, 'Helvetica-Bold', 9.5, '#111827', { width: W - 60 });
        const endY = doc.y;
        if (c.year) rightText(c.year, y, 50, 'Helvetica', 9, '#374151');
        doc.y = endY;
        if (c.link) text(fit(c.link, 'Helvetica', 8, W), 'Helvetica', 8, '#4B5563', { link: linkOf(c.link), underline: true });
        gap(5);
      });
    }
  };

  // =====================================================
  // TEMPLATE: CLEAN
  // =====================================================
  const drawClean = () => {
    if (r.summary) {
      heading('Profile Summary');
      text(r.summary, 'Helvetica', 9.5, '#374151', { align: 'justify', lineGap: 1.5 });
      gap(10);
    }

    if (r.education.length) {
      heading('Education');
      r.education.forEach((e) => {
        const right = [e.endYear, e.score].filter(Boolean).join('    ');
        const rightW = right ? 170 : 0;
        const left = e.degree + (e.institution || e.location ? ' - ' + [e.institution, e.location].filter(Boolean).join(', ') : '');
        doc.font('Helvetica-Bold').fontSize(10);
        ensure(doc.heightOfString(left, { width: W - rightW - 8 }) + 4);
        const y = doc.y;
        doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text(e.degree, colX, y, {
          width: W - rightW - 8,
          continued: !!(e.institution || e.location),
        });
        if (e.institution || e.location) {
          doc
            .font('Helvetica')
            .fontSize(9)
            .fillColor('#4B5563')
            .text(' - ' + [e.institution, e.location].filter(Boolean).join(', '), { width: W - rightW - 8, continued: false });
        }
        const endY = doc.y;
        if (right) rightText(right, y + 1, rightW, 'Helvetica', 9, '#374151');
        doc.x = colX;
        doc.y = endY + 5;
      });
      gap(5);
    }

    if (r.skills.length) {
      heading('Technical Competencies');
      doc.font('Helvetica-Bold').fontSize(9.5);
      ensure(doc.heightOfString('Technologies: ' + r.skills.join(', '), { width: W }));
      doc.fillColor('#111827').text('Technologies: ', colX, doc.y, { width: W, continued: true });
      doc.font('Helvetica').fillColor('#1F2937').text(r.skills.join(', '), { width: W, continued: false });
      doc.x = colX;
      gap(10);
    }

    if (r.projects.length) {
      heading('Key Projects');
      r.projects.forEach((p) => {
        const linkW = p.link ? 180 : 0;
        const titleW = W - (p.link ? linkW + 8 : 0);
        doc.font('Helvetica-Bold').fontSize(10);
        ensure(doc.heightOfString(p.title + (p.techStack ? '  [' + p.techStack + ']' : ''), { width: titleW }) + 16);
        const y = doc.y;
        doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text(p.title, colX, y, { width: titleW, continued: !!p.techStack });
        if (p.techStack) {
          doc.font('Helvetica').fontSize(9).fillColor('#6B7280').text('  [' + p.techStack + ']', { width: titleW, continued: false });
        }
        const endY = doc.y;
        if (p.link) rightText(p.link, y + 1, linkW, 'Helvetica', 8, '#4B5563', linkOf(p.link));
        doc.x = colX;
        doc.y = endY + 1;
        text(p.description, 'Helvetica', 9, '#374151', { lineGap: 1.5 });
        gap(7);
      });
      gap(3);
    }

    if (r.certs.length) {
      heading('Certifications');
      r.certs.forEach((c) => {
        ensure(16);
        const y = doc.y;
        doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#111827').text(c.name, colX, y, { width: W - 60, continued: !!c.issuer });
        if (c.issuer) doc.font('Helvetica').fontSize(9).fillColor('#4B5563').text('  |  ' + c.issuer, { width: W - 60, continued: false });
        const endY = doc.y;
        if (c.year) rightText(c.year, y, 50, 'Helvetica', 9, '#4B5563');
        doc.x = colX;
        doc.y = endY + 4;
      });
    }
  };

  // =====================================================
  // TEMPLATE: MODERN (two columns)
  // =====================================================
  const drawModern = () => {
    const GAP = 20;
    const leftW = ((W - GAP) * 5) / 12;
    const rightW = ((W - GAP) * 7) / 12;

    const startIdx = pageIndex();
    const startY = doc.y;
    onOverflow = nextPageOrAdd;

    // ----- Left column: skills, education, certificates -----
    colX = L;
    colW = leftW;
    doc.x = colX;

    if (r.skills.length) {
      heading('Core Skills');
      const fs = 8.5;
      const padX = 5;
      const padY = 2.5;
      const chipH = fs + padY * 2;
      const rowH = chipH + 4;
      ensure(rowH);
      let cx = colX;
      let cy = doc.y;
      doc.lineWidth(0.5);
      r.skills.forEach((s0) => {
        const s = fit(s0, 'Helvetica', fs, colW - padX * 2);
        doc.font('Helvetica').fontSize(fs);
        const cw = doc.widthOfString(s) + padX * 2;
        if (cx + cw > colX + colW && cx > colX) {
          cx = colX;
          doc.y = cy + rowH;
          ensure(rowH);
          cy = doc.y;
        }
        doc.roundedRect(cx, cy, cw, chipH, 2).fillAndStroke('#EFF6FF', '#DBEAFE');
        doc.fillColor('#1E40AF').font('Helvetica').fontSize(fs).text(s, cx + padX, cy + padY, { lineBreak: false });
        cx += cw + 4;
      });
      doc.x = colX;
      doc.y = cy + rowH + 8;
    }

    if (r.education.length) {
      heading('Education');
      const ix = colX + 8;
      const iw = colW - 8;
      r.education.forEach((e) => {
        ensure(50);
        const y0 = doc.y;
        text(e.degree, 'Helvetica-Bold', 9.5, '#0F172A', { x: ix, width: iw });
        text(e.institution, 'Helvetica', 9, '#334155', { x: ix, width: iw });
        if (e.location || e.endYear) {
          const ly = doc.y;
          if (e.location) text(e.location, 'Helvetica', 8.5, '#64748B', { x: ix, width: iw - 40 });
          else gap(10.5);
          if (e.endYear) rightText(e.endYear, ly, 40, 'Helvetica-Bold', 8.5, '#334155');
        }
        if (e.score) text('Score: ' + e.score, 'Helvetica-Bold', 8.5, '#1D4ED8', { x: ix, width: iw });
        const y1 = doc.y;
        doc.strokeColor('#93C5FD').lineWidth(1.5).moveTo(colX + 1, y0).lineTo(colX + 1, y1).stroke();
        doc.y = y1 + 8;
      });
      gap(4);
    }

    if (r.certs.length) {
      heading('Certificates');
      r.certs.forEach((c) => {
        ensure(28);
        text(c.name, 'Helvetica-Bold', 9, '#0F172A');
        if (c.issuer || c.year) {
          const ly = doc.y;
          if (c.issuer) text(c.issuer, 'Helvetica', 8.5, '#475569', { width: colW - 40 });
          else gap(10);
          if (c.year) rightText(c.year, ly, 40, 'Helvetica', 8.5, '#475569');
        }
        gap(6);
      });
    }

    // ----- Right column: about me, projects -----
    doc.switchToPage(startIdx);
    doc.y = startY;
    colX = L + leftW + GAP;
    colW = rightW;
    doc.x = colX;

    if (r.summary) {
      heading('About Me');
      text(r.summary, 'Helvetica', 9.5, '#334155', { lineGap: 1.5 });
      gap(10);
    }

    if (r.projects.length) {
      heading('Key Projects');
      const pad = 7;
      const iw = colW - pad * 2;
      r.projects.forEach((p) => {
        const meas = (str: string, font: string, size: number, lineGap = 0) => {
          if (!str) return 0;
          doc.font(font).fontSize(size);
          return doc.heightOfString(str, { width: iw, lineGap });
        };
        const linkShown = p.link ? fit(p.link, 'Helvetica', 8, iw) : '';
        const tech = p.techStack ? 'Tech: ' + p.techStack : '';
        const hT = meas(p.title, 'Helvetica-Bold', 10);
        const hTech = meas(tech, 'Helvetica-Bold', 8.5);
        const hD = meas(p.description, 'Helvetica', 9, 1.5);
        const hL = meas(linkShown, 'Helvetica', 8);
        const total = pad * 2 + hT + (hTech ? 2 + hTech : 0) + (hD ? 4 + hD : 0) + (hL ? 3 + hL : 0);
        ensure(total + 2);
        const y = doc.y;
        doc.lineWidth(0.5).roundedRect(colX, y, colW, total, 3).fillAndStroke('#F8FAFC', '#E2E8F0');
        doc.y = y + pad;
        text(p.title, 'Helvetica-Bold', 10, '#0F172A', { x: colX + pad, width: iw });
        if (tech) {
          gap(2);
          text(tech, 'Helvetica-Bold', 8.5, '#1D4ED8', { x: colX + pad, width: iw });
        }
        if (p.description) {
          gap(4);
          text(p.description, 'Helvetica', 9, '#334155', { x: colX + pad, width: iw, lineGap: 1.5 });
        }
        if (linkShown) {
          gap(3);
          text(linkShown, 'Helvetica', 8, '#2563EB', { x: colX + pad, width: iw, link: linkOf(p.link), underline: true });
        }
        doc.x = colX;
        doc.y = y + total + 9;
      });
    }
  };

  if (template === 'modern') drawModern();
  else if (template === 'clean') drawClean();
  else drawSimple();

  // ---------- Watermark on every page (free plan) ----------
  if (!isPremium) {
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(range.start + i);
      const oldBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0; // stop PDFKit from adding a new page
      doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor('#94A3B8')
        .text(`Created with FreshResume • Free Resume Maker for Indian Freshers • ${siteUrl}`, L, doc.page.height - 26, {
          width: W,
          align: 'center',
          lineBreak: false,
        });
      doc.page.margins.bottom = oldBottom;
    }
  }
}
