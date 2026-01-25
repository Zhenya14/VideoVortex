const CACHE_NAME = "videovortex-cache-v3";

const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "manifest.json",
  "VideoVortex_logo_192x192.png",
  "VideoVortex_logo_512x512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Додаємо файли по одному, щоб один битий файл не зупинив увесь процес
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.error("Помилка кешування:", err));
    })
  );
});

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

self.addEventListener("fetch", event => {
  if (event.request.destination === "video") return;

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match("index.html"))
  );
});
