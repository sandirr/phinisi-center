/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCGP2HiH6U8cmoHxOMSruXaTi2crrrYSIs',
  authDomain: 'phinisi-center.firebaseapp.com',
  databaseURL: 'https://phinisi-center-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'phinisi-center',
  storageBucket: 'phinisi-center.appspot.com',
  messagingSenderId: '787369725252',
  appId: '1:787369725252:web:d226989f6b2539fad59b11',
});

const messaging = firebase.messaging();

// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });

messaging.onBackgroundMessage((payload = {}) => {
  // eslint-disable-next-line no-console
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  const { notification = {} } = payload;
  // Customize notification here
  const notificationTitle = notification.title || 'Phinisi Center';
  const notificationOptions = {
    body: notification.body || '',
    icon: notification.image || 'https://phinisicenter.id/logo64.png',
    vibrate: [300, 100, 300],
    data: {
      url: 'https://phinisicenter.id',
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener('notificationclick', (event) => {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn't close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
      clients.matchAll({
        type: 'window',
      })
        .then((clientList) => {
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url == '/' && 'focus' in client) { return client.focus(); }
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }

          return null;
        }),
    );
  });
});
