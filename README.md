# Meathead

Adaptive dumbbell / kettlebell circuit trainer. Static site, no build step. Data stays on the device (localStorage).

## Deploy (GitHub → Vercel)
1. Push this folder to a GitHub repo (files at the repo root).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Other**. No build command, output directory: root.
3. Deploy. HTTPS is automatic — required for install and the service worker.

## Install on a phone (no Chrome badge)
- **Android / Chrome:** open the site → menu → **Install app** (or Settings → *Install Meathead app*). Because the manifest is installable (standalone display, 192/512 + maskable icons, service worker), Chrome installs a real WebAPK, so the home-screen icon carries **no Chrome badge**. A badge only appears if the site is added as a plain shortcut — i.e. if installability fails (check DevTools → Application → Manifest).
- **iPhone / Safari:** Share → **Add to Home Screen**. Uses `apple-touch-icon.png`.
- **Desktop Chrome/Edge:** install icon in the address bar → opens in its own window with the Meathead icon.

## Updating
When you change any asset, bump `VERSION` in `sw.js` so installed copies pick up the new files.

## Files
- `index.html` — the app
- `manifest.webmanifest`, `sw.js` — PWA install + offline
- `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icons/` — logo/icon set (`icons/mark.svg` is the transparent logo mark)
- `vercel.json` — headers for the service worker and manifest
