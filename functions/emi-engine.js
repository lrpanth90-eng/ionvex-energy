exports.emiCheck = async (batteryId, emiData) => {
  const db = admin.firestore();

  if (emiData.missed >= 2) {
    await db.collection("commands").add({
      batteryId,
      command: "LOCK",
      reason: "EMI_DEFAULT",
      createdAt: new Date()
    });

    await db.collection("batteries").doc(batteryId).update({
      status: "LOCKED",
      lockReason: "EMI default"
    });
  }
};
