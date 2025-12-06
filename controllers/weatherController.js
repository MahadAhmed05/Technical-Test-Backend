// controllers/weatherController.js

import { getWeatherFromAPI } from "../utils/weatherApi.js";
import { mapWeatherCondition } from "../utils/mapWeather.js";
import { getDecision } from "../utils/decisionLogic.js";
import { MONTHLY_THRESHOLDS } from "../data/thresholds.js";

export const getWeatherDecision = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    console.log(`📥 Received request - lat: ${lat}, lon: ${lon}`);

    if (!lat || !lon) {
      return res.status(400).json({
        error: "Latitude and Longitude are required",
        message: "Please provide both 'lat' and 'lon' query parameters",
      });
    }

    // Validate lat/lon are numbers
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      return res.status(400).json({
        error: "Invalid coordinates",
        message: "Latitude and Longitude must be valid numbers",
      });
    }

    // Get API key from request header (x-api-key) or use environment variable
    const apiKeyFromHeader =
      req.headers["x-api-key"] || req.headers["X-Api-Key"];

    // Fetch data from external API
    console.log("🔄 Calling weather API...");
    const apiData = await getWeatherFromAPI(lat, lon, apiKeyFromHeader);

    if (!apiData) {
      throw new Error("No data received from weather API");
    }

    // Parse the actual API response structure
    // Temperature is in realtimeWeather.items[0].temperature.avg
    // Weather condition is in realtimeWeather.items[0].weather.shortText
    const firstItem = apiData?.realtimeWeather?.items?.[0];

    if (!firstItem) {
      throw new Error("No weather data found in API response");
    }

    const temperature = firstItem?.temperature?.avg ?? null;
    const rawCondition =
      firstItem?.weather?.shortText ??
      firstItem?.weather?.longText ??
      "Unknown";

    console.log(
      `📊 Extracted data - Temp: ${temperature}°C, Condition: ${rawCondition}`
    );

    const simplifiedCondition = mapWeatherCondition(rawCondition);

    // Get current month's threshold
    const month = new Date().getMonth() + 1; // 1–12
    const threshold = MONTHLY_THRESHOLDS[month];

    const decision = getDecision(temperature, threshold, simplifiedCondition);

    console.log(
      `✅ Decision made: ${decision} (temp: ${temperature}°C, condition: ${simplifiedCondition})`
    );

    const response = {
      temperature,
      rawCondition,
      simplifiedCondition,
      month,
      threshold,
      decision,
      // Include additional data for debugging
      apiResponse:
        process.env.NODE_ENV === "development"
          ? {
              hasRealtimeWeather: !!apiData.realtimeWeather,
              hasPrecipitationRisk: !!apiData.precipitationRisk,
              itemsCount: apiData.realtimeWeather?.items?.length || 0,
            }
          : undefined,
    };

    res.json(response);
  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    console.error("Error stack:", error.stack);

    // Return more detailed error information
    const statusCode =
      error.message.includes("required") || error.message.includes("Invalid")
        ? 400
        : 500;
    res.status(statusCode).json({
      error: error.message || "Weather fetch failed",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
