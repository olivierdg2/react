import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBChg4mZR3UrUtEye-iG9vuYO7SISkazsc",
  authDomain: "mobile-c9a87.firebaseapp.com",
  projectId: "mobile-c9a87",
  storageBucket: "mobile-c9a87.appspot.com",
  messagingSenderId: "724091928311",
  appId: "1:724091928311:web:85f2a4009027f4ef445df2",
  measurementId: "G-645SDNMPFF"

});

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;