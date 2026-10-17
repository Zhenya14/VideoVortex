
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBkPYP3bnDy61NFjRSboRZrfTVNTdIMWbY",
  authDomain: "videovortex-235cd.firebaseapp.com",
  projectId: "videovortex-235cd",
  storageBucket: "videovortex-235cd.appspot.com",
  messagingSenderId: "681594250269",
  appId: "1:681594250269:web:1176b21fcc8fe2a7d052f4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const notification = payload.notification || {};

  const title = notification.title || data.title || "VideoVortex";
  const options = {
    body: notification.body || data.body || "У вас нове сповіщення",
    icon: notification.icon || "/VideoVortex/VideoVortex_logo.ico",
    data: {
      url: data.url || "/"
    },
    tag: data.tag || undefined
  };

  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "/",
    self.location.origin
  );

  // Не дозволяємо переходити на сторонні сайти.
  if (targetUrl.origin !== self.location.origin) return;

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.startsWith(self.location.origin) && "focus" in client) {
          return client.navigate(targetUrl.href).then(() => client.focus());
        }
      }

      return clients.openWindow(targetUrl.href);
    })
  );
});
