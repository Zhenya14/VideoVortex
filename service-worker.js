// ==========================
// Firebase v8
// ==========================
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBkPYP3bnDy61NFjRSboRZrfTVNTdIMWbY",
  authDomain: "videovortex-235cd.firebaseapp.com",
  databaseURL: "https://videovortex-235cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "videovortex-235cd",
  storageBucket: "videovortex-235cd.appspot.com",
  messagingSenderId: "681594250269",
  appId: "1:681594250269:web:1176b21fcc8fe2a7d052f4"
});

const messaging = firebase.messaging();

// ==========================
// Фонові push повідомлення
// ==========================
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Фонове повідомлення:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, { body, icon: icon || "/VideoVortex_logo.ico" });
});

// ==========================
// Кешування сайту
// ==========================
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