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

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()


  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async  (
  collectionKey, 
  objectsToAdd
  ) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  
  return await batch.commit();
};

export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollection = collections.docs.map(
    doc => {
      const { title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {})
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;