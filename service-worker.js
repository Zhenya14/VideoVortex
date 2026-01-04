const CACHE_NAME = "videovortex-cache-v2";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/VideoVortex_logo_192x192.png",
  "/VideoVortex_logo_512x512.png"
];

// Встановлення
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Активація + очищення старих кешів
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Перехоплення запитів
self.addEventListener("fetch", event => {
  // Відео не кешуємо
  if (event.request.destination === "video") return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => caches.match("/index.html"))
  );
});