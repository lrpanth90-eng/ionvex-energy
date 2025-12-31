import { auth, db } from "../firebase/app.js";

import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.activateWarranty = async function () {
  const serial = document.getElementById("serial").value.trim();
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const msg = document.getElementById("msg");

  if (!serial || !name || !phone) {
    msg.innerText = "All fields required";
    return;
  }

  try {
    const user = auth.currentUser;
    if (!user) {
      msg.innerText = "Login required";
      return;
    }

    // 🔹 get dealer info
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const dealerId = userDoc.data().dealerId;

    // 🔹 get battery
    const batteryRef = doc(db, "batteries", serial);
    const batterySnap = await getDoc(batteryRef);

    if (!batterySnap.exists()) {
      msg.innerText = "Invalid serial number";
      return;
    }

    if (batterySnap.data().status === "active") {
      msg.innerText = "Warranty already activated";
      return;
    }

    const years = batterySnap.data().warrantyYears;
    const today = new Date();
    const till = new Date(today);
    till.setFullYear(today.getFullYear() + years);

    // 🔥 Update battery
    await updateDoc(batteryRef, {
      status: "active",
      activatedDate: today.toISOString().split("T")[0],
      warrantyTill: till.toISOString().split("T")[0],
      dealerId: dealerId
    });

    // 🔥 Save activation history
    await addDoc(collection(db, "warranty_activations"), {
      serial: serial,
      dealerId: dealerId,
      customerName: name,
      customerPhone: phone,
      activatedAt: serverTimestamp(),
      warrantyTill: till.toISOString().split("T")[0]
    });

    msg.innerText = "✅ Warranty Activated Successfully";

  } catch (err) {
    msg.innerText = err.message;
  }
};
