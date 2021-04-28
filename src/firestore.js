// /src/firestore.js

import firebase from 'firebase'

//import 'firebase/firestore'

   var config2 = {
       apiKey: "AIzaSyB2_f_o-GHw57VQ_Sd1brVBt7vqfOUu9ko",
    authDomain: "auth-transporaphobia.firebaseapp.com",
    projectId: "auth-transporaphobia",
    storageBucket: "auth-transporaphobia.appspot.com",
    messagingSenderId: "36492725008",
    appId: "1:36492725008:web:af7ceee183884faf863395",
    measurementId: "G-1P6RLH8HX9"
  };
   firebase.initializeApp(config2);
//firebase.initializeApp(config2,"secondary");
   const db = firebase.firestore();



export {firebase,db};