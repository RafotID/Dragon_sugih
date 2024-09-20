import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDvYesKFEEwLZHO_nlxh83te-JRe1iYxU",
  authDomain: "data-game-eb86a.firebaseapp.com",
  projectId: "data-game-eb86a",
  storageBucket: "data-game-eb86a.appspot.com",
  messagingSenderId: "845150852827",
  appId: "1:845150852827:web:a59625e5d420df7ffe1efe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail};