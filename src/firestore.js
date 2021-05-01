// /src/firestore.js

import firebase from 'firebase'

//import 'firebase/firestore'

  
  var config = {//slectjs
    apiKey: "AIzaSyBJrnm93z4mK4Kkvc9oW7XCEZsVYmdUznE",
    authDomain: "selectjs-d7d68.firebaseapp.com",
    projectId: "selectjs-d7d68",
    storageBucket: "selectjs-d7d68.appspot.com",
    messagingSenderId: "142039365499",
    appId: "1:142039365499:web:85622fcedda083e017efde",
    measurementId: "G-K5H2Z6MFT9"
  };   

firebase.initializeApp(config);
//firebase.initializeApp(config2,"secondary");
   const db = firebase.firestore();



export {firebase,db};