import { auth } from "./app.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { db } from "./app.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function getUserRole(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export function protectPage(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      location.href = "/login.html";
    } else {
      const data = await getUserRole(user.uid);
      callback(data);
    }
  });
}
