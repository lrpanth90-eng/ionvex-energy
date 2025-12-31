import { db } from "../firebase/app.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const serial = params.get("serial");

const box = document.getElementById("data");

if (!serial) {
  box.innerText = "❌ Invalid QR";
} else {
  const ref = doc(db, "batteries", serial);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    box.innerText = "❌ Battery not found";
  } else {
    const d = snap.data();
    box.innerHTML = `
      🔋 Model: ${d.model}<br>
      🧾 Serial: ${d.serial}<br>
      🧑 Customer: ${d.customerName || "—"}<br>
      📅 Warranty Till: ${d.warrantyTill || "Not Activated"}<br>
      📌 Status: ${d.status}
    `;
  }
}
