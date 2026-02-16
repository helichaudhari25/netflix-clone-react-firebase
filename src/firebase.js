
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj6AZUYAFpXm9WAM8Ke_bCEnEpRI0zQ-s",
  authDomain: "netflix-clone-ab735.firebaseapp.com",
  projectId: "netflix-clone-ab735",
  storageBucket: "netflix-clone-ab735.firebasestorage.app",
  messagingSenderId: "174109357192",
  appId: "1:174109357192:web:2ac3f448b2b38f3a24db3d",
  measurementId: "G-135SQ4YM18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();