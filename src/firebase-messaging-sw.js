import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { getMessaging as getSWMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: 'AIzaSyCGP2HiH6U8cmoHxOMSruXaTi2crrrYSIs',
  authDomain: 'phinisi-center.firebaseapp.com',
  databaseURL: 'https://phinisi-center-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'phinisi-center',
  storageBucket: 'phinisi-center.appspot.com',
  messagingSenderId: '787369725252',
  appId: '1:787369725252:web:d226989f6b2539fad59b11',
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const swMessaging = getSWMessaging(app);

onMessage(messaging, (payload) => {
  console.log(payload);
});

onBackgroundMessage(swMessaging, (payload) => {
  console.log(payload);
});
