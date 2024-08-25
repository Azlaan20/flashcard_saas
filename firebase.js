// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6iOHapZaps8AXeQEd0BK8TTwcrxwLME4",
  authDomain: "flashcardsaas-32e34.firebaseapp.com",
  projectId: "flashcardsaas-32e34",
  storageBucket: "flashcardsaas-32e34.appspot.com",
  messagingSenderId: "572080266128",
  appId: "1:572080266128:web:455d30f1be7666d82d3115",
  measurementId: "G-4LN038XQ5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app);

export {db}