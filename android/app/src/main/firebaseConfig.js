
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD7pwbnKwp8kQrUpGF81WoU_b5taYHHp8Y",
    authDomain: "cloudcompass-8f389.firebaseapp.com",
    databaseURL: "https://cloudcompass-8f389-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cloudcompass-8f389",
    storageBucket: "cloudcompass-8f389.appspot.com",
    messagingSenderId: "169262912747",
    appId: "1:169262912747:web:d343d17031df845157daae",
    measurementId: "G-PPHB05SBE1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
