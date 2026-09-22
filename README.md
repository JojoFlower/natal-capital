# Natal Capital Pro. — Website

Bilingual (FR / EN) marketing site for **Natal Capital Pro.**, built with
**Next.js (Pages Router)** and deployable on **Vercel**.

## Stack

- Next.js 16 (Pages Router) + React 19
- No database, no backend — a fully static, prerendered page
- Language toggle (FR/EN) with the choice remembered in `localStorage`
- Financing form that opens the visitor's email client (`mailto:`) pre-filled

## Project structure

```
pages/
  _app.js          Global CSS import
  _document.js     <html lang>, Google Fonts
  index.js         The single page (renders the active language)
lib/
  content.js       ALL copy, FR + EN — edit text here
styles/
  globals.css      Styles (carried over 1:1 from the original design)
public/
  logo.png         Logo (header + footer)
  marc-nguesson.jpg  Portrait for the About section
resources/         Original source files (reference only, not used by the app)
```

## Editing content

All wording lives in `lib/content.js`, split into `fr` and `en`. To change a
label, a service, a program, etc., edit both languages in that one file.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build check:

```bash
npm run build && npm run start
```

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, **New Project → Import** the repository.
3. Framework preset is detected automatically as **Next.js** — no settings to
   change. Build command `next build`, output handled by Vercel.
4. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## Notes / to do

- **"Market expansion" service** (`services.feature` in `lib/content.js`) is a
  placeholder flagged *"in development"*, per the brief — swap in the final copy
  when it's ready.
- The About bio uses the collective "we/our" voice (was first-person singular).
- The financing form sends via `mailto:natcapro@gmail.com`; document attachments
  are added by the visitor in their email client before sending. If a
  server-side submission (with real file upload) is wanted later, it can be
  added as a Next.js API route.
