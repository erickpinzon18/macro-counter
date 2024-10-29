import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5w3MykurxsXrpXxSqHa5Pc61CV5Lg9Hs",
    authDomain: "macro-counter-db29d.firebaseapp.com",
    projectId: "macro-counter-db29d",
    storageBucket: "macro-counter-db29d.appspot.com",
    messagingSenderId: "791826944662",
    appId: "1:791826944662:web:964de4581a789c4d23e8b7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };