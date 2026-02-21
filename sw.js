const CACHE_NAME = 'cgc-repertoire-v2';

// Install: cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Use relative URLs based on service worker scope
                const scope = self.registration.scope;
                return cache.addAll([
                    scope,
                    scope + 'index.html',
                    scope + 'manifest.json',
                    scope + 'icon-192.png',
                    scope + 'icon-512.png'
                ]);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: cache-first for our assets, network-first for lyrics links
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // For our own assets, serve from cache first
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetch(event.request))
        );
    }
});
