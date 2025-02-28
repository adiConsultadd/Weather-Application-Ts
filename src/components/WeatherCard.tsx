import React from 'react';
import CurrentWeather from './CurrentWeather';
import { WeatherData, ForecastData, WeatherError } from '../types/weather';
import { formatDate } from '../utils/helper';

interface WeatherCardProps {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: WeatherError | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({weather, forecast, loading, error}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && error.isError) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="text-center text-gray-500 p-4">
          Search for a city to see weather information
        </div>
      </div>
    );
  }

  // Extract only one forecast entry per day (typically noon or midday)
  const dailyForecasts = forecast?.list ? getDailyForecasts(forecast.list) : [];
  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return "bg-gradient-to-br from-red-500 to-amber-800";
    if (temp >= 20) return "bg-gradient-to-br from-amber-0 to-amber-400";
    if (temp >= 0) return "bg-gradient-to-br from-blue-0 to-blue-600";
  };

  return (
    <div className="bg-gradient-to-tl from-blue-50 to-blue-700 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <CurrentWeather data={weather} />
      </div>
      
      {dailyForecasts.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-4">

          <h2 className="text-xl font-bold mb-4">5-Day Forecast</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {dailyForecasts.map((item) => (
              <div key={item.dt} className={"bg-blue-50 rounded-lg p-3 " + getTemperatureColor(item.main.temp)}>
                <div className="font-medium text-sm">{formatDate(item.dt)}</div>
                <img 
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                  alt={item.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
                <div className="text-sm font-bold">{Math.round(item.main.temp)}°</div>
                <div className="text-xs text-gray-600 capitalize">{item.weather[0].description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Function to extract one forecast entry per day (preferably around noon)
const getDailyForecasts = (forecastList: any[]) => {
  const dailyForecasts: any[] = [];
  const daysMap: {[key: string]: boolean} = {};
  
  forecastList.forEach(forecast => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const hour = new Date(forecast.dt * 1000).getHours();
    
    if (!daysMap[date] && (hour >= 12 && hour <= 15)) {
      dailyForecasts.push(forecast);
      daysMap[date] = true;
    } else if (!daysMap[date] && dailyForecasts.length < 5) {
      dailyForecasts.push(forecast);
      daysMap[date] = true;
    }
  });
  
  return dailyForecasts.slice(0, 5);
};

export default WeatherCard;