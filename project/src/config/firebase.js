// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBvEFnJtRirOUghAJ8Sgji6HZXH8B1Weo4",
  authDomain: "crime-a116a.firebaseapp.com",
  projectId: "crime-a116a",
  storageBucket: "crime-a116a.appspot.com",
  messagingSenderId: "945029823521",
  appId: "1:945029823521:web:848dc69b2f86dc43bab760",
  measurementId: "G-8V54BKJBFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
