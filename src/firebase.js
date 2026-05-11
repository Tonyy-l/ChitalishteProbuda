<<<<<<< HEAD
// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-vOWxjTdD9u2x3yrNE2q-L6uPK5cYJTY",
  authDomain: "chitalishte-probuda.firebaseapp.com",
  projectId: "chitalishte-probuda",
  storageBucket: "chitalishte-probuda.firebasestorage.app",
  messagingSenderId: "394341715963",
  appId: "1:394341715963:web:c42f9a27211cb82fe8c55e",
  measurementId: "G-P9GMSY9Y7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/


import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Hardcoded Firebase config so the app works without .env.
// Note: These values are not secret, but they do identify your Firebase project.
const firebaseConfig = {
  apiKey: 'AIzaSyB-vOWxjTdD9u2x3yrNE2q-L6uPK5cYJTY',
  authDomain: 'chitalishte-probuda.firebaseapp.com',
  projectId: 'chitalishte-probuda',
  storageBucket: 'chitalishte-probuda.firebasestorage.app',
  messagingSenderId: '394341715963',
  appId: '1:394341715963:web:c34313f69d62abaae8c55e',
}

export const isFirebaseConfigured = true
export const firebaseProjectId = firebaseConfig.projectId

// Firestore default database is "(default)". In the JS SDK you use getFirestore(app)
// (without a databaseId) to target it.
export const firebaseDatabaseId = '(default)'

// The Firestore collection path that contains the PDF docs.
export const firestoreDocumentsPath = 'Declarations'

// Optional filter (set to '' to disable).
export const firestoreFilenameFilter = ''

// Firebase Storage folder (case-sensitive).
export const storageDocumentsFolder = 'Documents'

// If true, the UI will fall back to listing files from Storage when Firestore is empty.
export const useStorageFallback = false

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
=======
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null

export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
