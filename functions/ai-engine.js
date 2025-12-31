exports.predictHealth = (cycles, tempAvg) => {
  let health = 100;
  health -= cycles * 0.03;
  health -= (tempAvg - 30) * 0.5;

  return Math.max(health, 40);
};
