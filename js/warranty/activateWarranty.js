import { db } from "../firebase/app.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.activate = async () => {
  const serial = document.getElementById("serial").value.trim();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("msg");

  if (!serial || !name || !phone) {
    msg.innerText = "❌ All fields required";
    return;
  }

  const today = new Date();
  const till = new Date();
  till.setFullYear(today.getFullYear() + 3);

  try {
    await updateDoc(doc(db, "batteries", serial), {
      customerName: name,
      customerPhone: phone,
      soldDate: today.toISOString().slice(0,10),
      warrantyTill: till.toISOString().slice(0,10),
      activated: true,
      status: "Active"
    });

    msg.innerText = "✅ Warranty Activated";
  } catch (e) {
    msg.innerText = "❌ Error activating warranty";
  }
};
