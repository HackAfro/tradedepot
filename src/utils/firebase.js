import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCdoik5uCbEY-Faty-kl97uH1H4DGpEVVI',
  authDomain: 'trade-depot.firebaseapp.com',
  databaseURL: 'https://trade-depot.firebaseio.com',
  projectId: 'trade-depot',
  storageBucket: 'trade-depot.appspot.com',
  messagingSenderId: '929258569361',
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, firebase, provider };
