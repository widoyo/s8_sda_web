import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        hourly: "temperature_2m,relative_humidity_2m,cloudcover,windspeed_10m",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
