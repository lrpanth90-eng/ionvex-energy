exports.lockBattery = onCall(async (data) => {
  await db.collection("batteries")
    .doc(data.serial)
    .update({ locked: true });
});
