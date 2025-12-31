// js/warranty.js
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.checkWarranty = async function () {
  const serial = document.getElementById("serialInput").value.trim();
  const result = document.getElementById("result");

  if (!serial) {
    result.innerText = "❌ Enter serial number";
    return;
  }

  try {
    const ref = doc(db, "batteries", serial);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      result.innerHTML = `
        ✅ Model: ${data.model}<br>
        🔋 Warranty Till: ${data.warrantyTill}
      `;
    } else {
      result.innerText = "❌ Serial not found";
    }
  } catch (e) {
    result.innerText = "⚠ Error checking warranty";
  }
};
