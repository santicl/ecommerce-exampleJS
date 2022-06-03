// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCErVbLPGAxCqhMbCZF3YqT7f7awYXrexo",
  authDomain: "api-v1-cart.firebaseapp.com",
  databaseURL: "https://api-v1-cart-default-rtdb.firebaseio.com",
  projectId: "api-v1-cart",
  storageBucket: "api-v1-cart.appspot.com",
  messagingSenderId: "523026407590",
  appId: "1:523026407590:web:83afc8cce7700708479467",
  measurementId: "G-FY38HGSNXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);  