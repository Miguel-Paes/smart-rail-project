// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKMyPm--wMr-LKvY3D5uoBsVzY2EwGN3k",
  authDomain: "smart-rail-s4pr4ap.firebaseapp.com",
  projectId: "smart-rail-s4pr4ap",
  storageBucket: "smart-rail-s4pr4ap.firebasestorage.app",
  messagingSenderId: "75343175233",
  appId: "1:75343175233:web:9369f097480238306b70c0",
  measurementId: "G-62NSSN9HKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);