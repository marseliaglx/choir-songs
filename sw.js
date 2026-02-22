const CACHE_NAME = 'cgc-repertoire-v4';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                const scope = self.registration.scope;
                return cache.addAll([
                    scope,
                    scope + 'index.html',
                    scope + 'manifest.json',
                    scope + 'icon-192.png',
                    scope + 'icon-512.png',
                    scope + 'lyrics/carry-me.html',
                    scope + 'lyrics/under-the-olive-tree.html',
                    scope + 'lyrics/siyahamba.html'
                ]);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetch(event.request))
        );
    }
});
