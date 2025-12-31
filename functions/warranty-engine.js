const admin = require("firebase-admin");
admin.initializeApp();

exports.warrantyEngine = async (batteryId, data) => {
  const db = admin.firestore();

  // RULE 1: Over temperature
  if (data.temp > 60) {
    await db.collection("batteries").doc(batteryId).update({
      warrantyStatus: "VOID",
      reason: "Overheat misuse"
    });
  }

  // RULE 2: Deep discharge abuse
  if (data.minVoltage < 2.5) {
    await db.collection("batteries").doc(batteryId).update({
      warrantyStatus: "VOID",
      reason: "Cell deep discharge"
    });
  }
};
