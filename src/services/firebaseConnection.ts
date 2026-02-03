
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { keys } from "../keys";
const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId: keys.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };