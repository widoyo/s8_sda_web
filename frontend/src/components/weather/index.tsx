import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "../../services/weather";

interface HourlyWeather {
  temperature_2m: number[];
  relative_humidity_2m: number[];
  cloudcover: number[];
  windspeed_10m: number[];
}

interface WeatherData {
  hourly: HourlyWeather;
}

const WeatherForecast: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const latitude = -2.9909; // Replace with the desired latitude
    const longitude = 104.7567; // Replace with the desired longitude
    fetchWeatherData(latitude, longitude).then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    <div className=" flex items-center text-center justify-center">
      {weatherData ? (
        <div className="flex gap-4 justify-end items-center">
          <div className="flex justify-center items-center mx-1">
            <p className="text-xl font-medium text-gray-700 tracking-wider mr-2">
              {weatherData.hourly.temperature_2m[0]}°C
            </p>
          </div>
          {/* <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-700 font-medium">
              Kecepatan Angin: {weatherData.hourly.windspeed_10m[0]} km/jam
            </p>
            <p className="text-sm text-gray-700 font-medium">
              Kelembaban: {weatherData.hourly.relative_humidity_2m[0]}%
            </p>
          </div> */}
        </div>
      ) : (
        <p className="text-gray-500">Memuat data cuaca...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
