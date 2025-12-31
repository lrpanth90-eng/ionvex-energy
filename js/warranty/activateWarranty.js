import { db } from "../firebase/app.js";
import {
  doc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export async function activateWarranty(serial, dealerId) {
  await updateDoc(doc(db, "batteries", serial), {
    activated: true,
    activatedBy: dealerId,
    activatedAt: serverTimestamp(),
    status: "active"
  });
}
