// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB9NmATlgK1K38ODe8txWtGB3UeZ9ySgaw",
  authDomain: "shanmukh-resume.firebaseapp.com",
  projectId: "shanmukh-resume",
  storageBucket: "shanmukh-resume.firebasestorage.app",
  messagingSenderId: "521866278602",
  appId: "1:521866278602:web:7db6eb4c3fd4b32fe2a633",
  measurementId: "G-C1B94E9LP3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
