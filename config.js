  import firebase from 'firebase'
  require('@firebase/firestore')
  
  var firebaseConfig = {
    apiKey: "AIzaSyAp9OLWuTSjmePbcSK4lGmlqfBU0aNKzZk",
    authDomain: "imatter-ae50f.firebaseapp.com",
    projectId: "imatter-ae50f",
    storageBucket: "imatter-ae50f.appspot.com",
    messagingSenderId: "85715816014",
    appId: "1:85715816014:web:be0b3c04875569ad243d1f"
  };

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

  export default firebase.firestore();