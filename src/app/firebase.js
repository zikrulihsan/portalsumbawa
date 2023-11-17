import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA-VAxZBZY1-x4r_QU2ssQk4b2A0vBknQ",
  authDomain: "portalsumbawa-30e8f.firebaseapp.com",
  projectId: "portalsumbawa-30e8f",
  storageBucket: "portalsumbawa-30e8f.appspot.com",
  messagingSenderId: "980532256745",
  appId: "1:980532256745:web:e8c3c2132e6689d0e9f578",
  measurementId: "G-5VYYZ05KPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export default db;