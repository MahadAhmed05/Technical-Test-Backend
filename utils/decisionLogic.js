// utils/decisionLogic.js

export const getDecision = (temperature, threshold, condition) => {
  if (temperature == null) return "bad";

  // Simple rule: temperature must be >= threshold AND weather not rainy/stormy
  if (temperature >= threshold && condition !== "rainy" && condition !== "stormy") {
    return "good";
  }

  return "bad";
};
