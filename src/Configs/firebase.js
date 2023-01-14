import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

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
const functions = getFunctions(app, 'asia-southeast1');
const callFunc = (funcName) => httpsCallable(functions, funcName);

const storage = getStorage();

export {
  callFunc,
  functions,
  storage,
};
