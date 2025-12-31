import { db } from "../firebase/app.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export async function addDealer(uid, data) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    role: "dealer",
    active: true
  });
}// js/admin/dealerManager.js
