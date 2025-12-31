import { db } from "./app.js";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔢 Get battery by serial number
export async function getBatteryBySerial(serial) {
  const ref = doc(db, "batteries", serial);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// ➕ Add battery (Admin / Excel upload)
export async function addBattery(serial, data) {
  await setDoc(doc(db, "batteries", serial), data);
}
