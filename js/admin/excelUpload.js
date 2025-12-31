import { db } from "../firebase/app.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.upload = async () => {
  const file = document.getElementById("file").files[0];
  const text = await file.text();
  const rows = text.split("\n").slice(1);

  for (let r of rows) {
    const [serial, model, years] = r.split(",");
    if (!serial) continue;

    await setDoc(doc(db, "batteries", serial.trim()), {
      serial: serial.trim(),
      model,
      warrantyYears: Number(years),
      activated: false,
      status: "Not Sold"
    });
  }

  document.getElementById("status").innerText = "✅ Upload Complete";
};
