import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCA1nHySiFkyqjx9ePbfObHkHfuTqnpXyo",
    authDomain: "primer-crud-d6b5e.firebaseapp.com",
    projectId: "primer-crud-d6b5e",
    storageBucket: "primer-crud-d6b5e.appspot.com",
    messagingSenderId: "495991015463",
    appId: "1:495991015463:web:059660bbf896176aaa6602",
    measurementId: "G-5GL0ED5HSP"
  };

  firebase.initializeApp(firebaseConfig)

  export{firebase}