// utils/weatherApi.js
// Use native fetch (Node.js 18+) or node-fetch as fallback
import nodeFetch from "node-fetch";

// Use native fetch if available (Node.js 18+), otherwise use node-fetch
const fetch = globalThis.fetch || nodeFetch;

export const getWeatherFromAPI = async (lat, lon, apiKey = null) => {
  // Get API key from parameter, environment variable, or throw error
  const API_KEY = apiKey || process.env.WEATHER_API_KEY;

  if (!API_KEY) {
    throw new Error(
      "WEATHER_API_KEY is not set. Please set it in .env file or pass it via x-api-key header"
    );
  }

  const url = `https://forecast.meteonomiqs.com/nowcast/weather/${lat}/${lon}`;

  console.log(`🌤️  Fetching weather for lat: ${lat}, lon: ${lon}`);
  console.log(`🔗 API URL: ${url}`);
  console.log(
    `🔑 Using API Key: ${
      API_KEY ? API_KEY.substring(0, 10) + "..." : "NOT SET"
    }`
  );

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`Weather API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Weather API response received");
    console.log("📦 Response structure:", {
      hasRealtimeWeather: !!data.realtimeWeather,
      hasPrecipitationRisk: !!data.precipitationRisk,
      hasStation: !!data.station,
      firstItemTemp: data.realtimeWeather?.items?.[0]?.temperature?.avg,
      firstItemWeather: data.realtimeWeather?.items?.[0]?.weather?.shortText,
    });
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Weather API request timed out after 15 seconds");
    }
    console.error("❌ Weather API Error:", error.message);
    throw error;
  }
};
