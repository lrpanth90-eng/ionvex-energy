// Firebase v9 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔥 YOUR REAL FIREBASE CONFIG (IONVEX)
const firebaseConfig = {
  apiKey: "AIzaSyDvV77_17S233OHTDxxOHaEIeruo_IP-u8",
  authDomain: "ionvex-energy.firebaseapp.com",
  projectId: "ionvex-energy",
  storageBucket: "ionvex-energy.firebasestorage.app",
  messagingSenderId: "48652442204",
  appId: "1:48652442204:web:f23a353804282630c1e499",
  measurementId: "G-8R40WC76D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
