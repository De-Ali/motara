/* Motara Auto · Service Worker (basePath-aware) */
const VERSION = 'motara-v2';
const SCOPE = self.registration ? new URL(self.registration.scope).pathname : '/';
const url = (p) => `${SCOPE.replace(/\/$/, '')}${p}`;
const SHELL = [url('/'), url('/cars/'), url('/favorites/'), url('/offline/')];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => Promise.all(
      SHELL.map((u) => c.add(u).catch(() => {}))
    ))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const reqUrl = new URL(req.url);

  // Network-first for HTML navigations, with offline fallback
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match(url('/offline/'))))
    );
    return;
  }

  // Stale-while-revalidate for same-origin assets and Unsplash images
  if (reqUrl.origin === self.location.origin || reqUrl.hostname.includes('unsplash.com')) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
});
