// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-27d1b.firebaseapp.com",
  projectId: "mern-blog-27d1b",
  storageBucket: "mern-blog-27d1b.appspot.com",
  messagingSenderId: "1022458518940",
  appId: "1:1022458518940:web:a7ba4cbccdab0ed2bd7c59",
  measurementId: "G-BRKDF2HG3V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);