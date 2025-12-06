// utils/mapWeather.js

export const mapWeatherCondition = (apiCondition) => {
  if (!apiCondition) return "unknown";

  const condition = apiCondition.toLowerCase();

  // Sunny conditions
  if (
    condition.includes("sun") ||
    condition.includes("clear") ||
    condition.includes("sonnig")
  )
    return "sunny";

  // Cloudy conditions (including German "bewölkt")
  if (
    condition.includes("cloud") ||
    condition.includes("bewölkt") ||
    condition.includes("wolken")
  )
    return "cloudy";

  // Rainy conditions
  if (
    condition.includes("rain") ||
    condition.includes("shower") ||
    condition.includes("regen") ||
    condition.includes("niederschlag")
  )
    return "rainy";

  // Stormy conditions
  if (
    condition.includes("storm") ||
    condition.includes("sturm") ||
    condition.includes("gewitter")
  )
    return "stormy";

  return "unknown";
};
