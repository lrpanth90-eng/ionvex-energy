import { addBattery } from "../firebase/firestore.js";

export async function addNewBattery(serial, model) {
  await addBattery(serial, {
    model,
    warrantyTill: "2028-12-31",
    status: "inactive"
  });
}// js/admin/batteryManager.js
