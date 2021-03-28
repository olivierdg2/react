import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config()

firebase.initializeApp({
  apiKey: "AIzaSyBChg4mZR3UrUtEye-iG9vuYO7SISkazsc",
  authDomain: "mobile-c9a87.firebaseapp.com",
  projectId: "mobile-c9a87",
  storageBucket: "mobile-c9a87.appspot.com",
  messagingSenderId: "724091928311",
  appId: "1:724091928311:web:85f2a4009027f4ef445df2",
  measurementId: "G-645SDNMPFF"

});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    // user object
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}
export const logOut = () => {
  auth.signOut().then(()=> {
    console.log('logged out');
  }).catch((error) => {
    console.log(error.message);
  })
}