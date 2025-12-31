exports.autoLock = async (batteryId, condition) => {
  const db = admin.firestore();

  if (condition === "THEFT" || condition === "NON_PAYMENT") {
    await db.collection("commands").add({
      batteryId,
      command: "LOCK",
      createdAt: new Date()
    });
  }
};
