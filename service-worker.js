const CACHE_NAME = "videovortex-cache-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/manifest.json"
      ])
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.destination === "video") return;

  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});