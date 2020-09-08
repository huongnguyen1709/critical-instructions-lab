import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBzgWLIrtxnjRdiTn_7SIfoKTCi6pKkzmE",
    authDomain: "critical-instructions-lab.firebaseapp.com",
    databaseURL: "https://critical-instructions-lab.firebaseio.com",
    projectId: "critical-instructions-lab",
    storageBucket: "critical-instructions-lab.appspot.com",
    messagingSenderId: "121402491624",
    appId: "1:121402491624:web:a18042474c049be805ff5d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export {
    storage, firebase as default
}