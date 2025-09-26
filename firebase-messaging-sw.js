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

// Обробка фонових повідомлень
messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Повідомлення у фоні:', payload);
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: '/icon.png'  // або своя іконка
  };
  return self.registration.showNotification(title, options);
});
