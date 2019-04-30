import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDAx5mziuMFsA7C8Gr4y2ePgfgnXdV_DJA",
  authDomain: "new-commute-buddy.firebaseapp.com",
  databaseURL: "https://new-commute-buddy.firebaseio.com",
  projectId: "new-commute-buddy",
  storageBucket: "new-commute-buddy.appspot.com",
  messagingSenderId: "421187596281"
};

const fire = firebase.initializeApp(config);

export default fire;
