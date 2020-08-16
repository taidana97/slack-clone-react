import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDOIE5KROSt1QMepYaRSno_YAAEmM4ynrc",
  authDomain: "slack-clone-react-8eb5a.firebaseapp.com",
  databaseURL: "https://slack-clone-react-8eb5a.firebaseio.com",
  projectId: "slack-clone-react-8eb5a",
  storageBucket: "slack-clone-react-8eb5a.appspot.com",
  messagingSenderId: "410750425291",
  appId: "1:410750425291:web:c3aca26ac3b245765c634e",
  measurementId: "G-GV19ZEDM60",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

// auth Google
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
