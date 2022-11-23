// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFy8KcxKTSGaHgdHrA5NpFIwPLJA_2twE",
  authDomain: "react-demos-c0d36.firebaseapp.com",
  projectId: "react-demos-c0d36",
  storageBucket: "react-demos-c0d36.appspot.com",
  messagingSenderId: "610042057689",
  appId: "1:610042057689:web:88805696bfaa9304c0ffc8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB =getFirestore(FirebaseApp);