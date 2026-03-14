Brand Catalogue (static site)

This is a minimal static website that lists brands and lets visitors download each brand's PDF catalogue.

What you should do now

1. Upload each brand PDF to a place that provides a direct-download link (Google Drive, Dropbox, or your own host).
2. Edit `script.js` and replace each `REPLACE_WITH_DIRECT_LINK_*` value with the direct-download URL for that brand.

Helpful link conversions

- Google Drive share link -> direct link:
  - Shared link: https://drive.google.com/file/d/FILEID/view?usp=sharing
  - Direct download: https://drive.google.com/uc?export=download&id=FILEID

- Dropbox shared link:
  - Shared: https://www.dropbox.com/s/XXXXX/yourfile.pdf?dl=0
  - Direct:  https://www.dropbox.com/s/XXXXX/yourfile.pdf?dl=1

Files created

- `index.html` — main page
- `styles.css` — basic styles
- `script.js` — brand data and download logic
- `netlify.toml` — Netlify publish config

Push to GitHub (PowerShell)

Replace <username> and <repo> below with your GitHub username and repo name.

```powershell
git init
git add .
git commit -m "Initial commit — brand catalogue site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Deploy to Netlify

Option A — Netlify UI (recommended):
- Go to https://app.netlify.com
- Choose "New site from Git" and connect your GitHub account
- Select your repo and set build command to empty, publish directory to `/` (or `.`)

Option B — Netlify CLI (one-off deploy):

```powershell
# Install netlify cli if you don't have it
npm install -g netlify-cli
# Login once
netlify login
# From repo root
netlify deploy --prod --dir=.
```

Notes & troubleshooting

- Some hosting providers or browsers may not honor the `download` attribute for cross-origin files. If the PDF opens in a new tab instead of downloading, the direct link still works.
- If Google Drive direct-download still prompts a preview or virus scan page for large files, consider hosting on a proper static file host (S3, Cloudflare, or your web host).

Next steps / enhancements

- Add search/filtering if you have many brands.
- Add analytics to track downloads (Netlify Analytics, Google Analytics, or server-side logging).
- Add brand logos (place files in `assets/` and update `script.js`).
