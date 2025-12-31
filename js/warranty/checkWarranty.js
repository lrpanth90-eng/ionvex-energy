import { getBatteryBySerial } from "../firebase/firestore.js";

window.check = async function () {
  const serial = document.getElementById("serial").value.trim();
  const result = document.getElementById("result");

  if (!serial) {
    result.innerHTML = "❌ Please enter serial number";
    return;
  }

  result.innerHTML = "⏳ Checking...";

  const battery = await getBatteryBySerial(serial);

  if (!battery) {
    result.innerHTML = "❌ Battery not found";
    return;
  }

  result.innerHTML = `
    ✅ <b>Warranty Active</b><br>
    Model: ${battery.model}<br>
    Warranty Till: ${battery.warrantyTill}
  `;
};
