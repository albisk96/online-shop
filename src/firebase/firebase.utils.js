import firebase from 'firebase/app';
import 'firebase/firestore'; //database
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDkWQnDFx2G3nnC0Uggl--OuHnlb2DqFE0",
    authDomain: "eshop-db-bd99d.firebaseapp.com",
    databaseURL: "https://eshop-db-bd99d.firebaseio.com",
    projectId: "eshop-db-bd99d",
    storageBucket: "eshop-db-bd99d.appspot.com",
    messagingSenderId: "790020876865",
    appId: "1:790020876865:web:b7426a4275545776fb74c0",
    measurementId: "G-Y24WXL3TMK"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;