const CACHE = 'todays-plan-v3';

// On install: cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([
        './',
        './manifest.json',
        './icons/icon-192.png',
        './icons/icon-512.png',
      ]).catch(() => {})
    )
  );
  self.skipWaiting();
});

// On activate: remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for navigation, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // Navigation: network first, fall back to cached shell
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('./').then((r) => r || caches.match(request))
      )
    );
    return;
  }

  // Static assets: cache first
  if (request.destination === 'image' || request.destination === 'style' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }
});
