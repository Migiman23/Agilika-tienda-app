import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCRe-xmA0hTqRK3IrSsseLfGC8cOnswUO0",
    authDomain: "api-udemy-1.firebaseapp.com",
    databaseURL: "https://api-udemy-1-default-rtdb.firebaseio.com",
    projectId: "api-udemy-1",
    storageBucket: "api-udemy-1.appspot.com",
    messagingSenderId: "813965972093",
    appId: "1:813965972093:web:cb811679d3b52f68bdd714"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {firebase, db, auth, storage}