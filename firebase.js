// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD6iOHapZaps8AXeQEd0BK8TTwcrxwLME4',
    authDomain: 'flashcardsaas-32e34.firebaseapp.com',
    projectId: 'flashcardsaas-32e34',
    storageBucket: 'flashcardsaas-32e34.appspot.com',
    messagingSenderId: '572080266128',
    appId: '1:572080266128:web:455d30f1be7666d82d3115',
    measurementId: 'G-4LN038XQ5M'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics only on the client-side
let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    }).catch((error) => {
        console.error('Error initializing Analytics:', error);
    });
}

export { db, analytics };
