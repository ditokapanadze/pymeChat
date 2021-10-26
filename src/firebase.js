import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbzxtyCuntQDSoUTbd4xAOmdVrb_zBmSc",
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUEID,
};

// const app = initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// const storage = firebase.storage();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export { auth };
export default db;

// apiKey: "AIzaSyCbzxtyCuntQDSoUTbd4xAOmdVrb_zBmSc",
// authDomain: "pymechatapp.firebaseapp.com",
// projectId: "pymechatapp",
// storageBucket: "pymechatapp.appspot.com",
// messagingSenderId: "1008993111387",
// appId: "1:1008993111387:web:2b3ab2d6faf101d1ce1e7e",
// measurementId: "G-TZYM9TW6WE",
