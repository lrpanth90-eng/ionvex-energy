const { warrantyEngine } = require("./warranty-engine");
const { autoLock } = require("./lock-engine");

exports.onBatteryData = async (req, res) => {
  const { batteryId, data } = req.body;

  await warrantyEngine(batteryId, data);

  if (data.theftDetected) {
    await autoLock(batteryId, "THEFT");
  }

  res.send("Processed");
};
