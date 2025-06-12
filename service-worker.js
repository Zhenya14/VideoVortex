self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('vv-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        // додай сюди інші ресурси, які хочеш кешувати
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
