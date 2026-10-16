// Meathead service worker — offline shell. Bump VERSION on every deploy that changes assets.
const VERSION = 'meathead-v4';
const ASSETS = ['/', '/index.html', '/manifest.webmanifest', '/favicon.ico', '/favicon.svg',
  '/apple-touch-icon.png', '/icons/icon-192.png', '/icons/icon-512.png',
  '/icons/icon-maskable-192.png', '/icons/icon-maskable-512.png', '/icons/icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Pages: network first (fresh deploys), cache fallback (offline at the gym).
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('/', copy)); return r; })
      .catch(() => caches.match('/')));
    return;
  }
  // Static assets: cache first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
