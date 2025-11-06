
const CACHE_NAME = "videovortex-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/script.js",
  "/VideoVortex_logo_192x192.png",
  "/VideoVortex_logo_512x512.png"
];

// Встановлення SW та кешування
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Обробка запитів
self.addEventListener("fetch", event => {
  // Не кешуємо відео
  if (event.request.url.endsWith(".mp4")) return;

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});