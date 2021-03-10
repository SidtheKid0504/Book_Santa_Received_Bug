import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBddOQV8BwcHSzaz7BaWEAdA-drFJCDnBM",
    authDomain: "book-santa-9559f.firebaseapp.com",
    projectId: "book-santa-9559f",
    storageBucket: "book-santa-9559f.appspot.com",
    messagingSenderId: "851737283876",
    appId: "1:851737283876:web:bf27da3e85c3525819b7b1"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();