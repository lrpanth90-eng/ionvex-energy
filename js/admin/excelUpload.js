import { addBattery } from "../firebase/firestore.js";

document.getElementById("excel").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const data = await file.text();
  const rows = data.split("\n");

  for (let i = 1; i < rows.length; i++) {
    const [serial, model, till] = rows[i].split(",");
    if (!serial) continue;

    await addBattery(serial.trim(), {
      model,
      warrantyTill: till,
      status: "inactive"
    });
  }

  alert("Upload complete");
});
