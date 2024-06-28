const CURRENT_CACHE = '1.0';

const CACHE_ROUTES = ['/', '/hiragana', '/katakana', '/practice', '/settings', '/help'];

self.addEventListener('install', (ev) => {
    console.log('service worker installed');
    ev.waitUntil(caches.open(CURRENT_CACHE).then((cache) => cache.addAll(CACHE_ROUTES)));
});

// cleanup on activate: delete all caches that aren't named in CURRENT_CACHE
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CURRENT_CACHE) {
                        return caches.delete(cacheName);
                    }
                }),
            ),
        ),
    );
});

const cacheClone = async (e) => {
    const res = await fetch(e.request);

    if (res.status === 200) {
        const cache = await caches.open(CURRENT_CACHE);
        const resClone = res.clone();
        await cache.put(e.request, resClone);
    }

    return res;
};

self.addEventListener('fetch', (e) => {
    e.respondWith(
        cacheClone(e)
            .catch(() => caches.match(e.request))
            .then((res) => res),
    );
});
