// UnrugGuard Service Worker — Offline Support
const CACHE = 'unrugguard-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/app.js',
  '/js/network.js',
  '/js/emergency-numbers.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network first for API calls, cache first for assets
  if (e.request.url.includes('dexscreener') || e.request.url.includes('supabase') || e.request.url.includes('ipapi')) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('{"error":"offline"}', {headers:{'Content-Type':'application/json'}}))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
