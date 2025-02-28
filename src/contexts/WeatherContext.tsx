import React, { createContext, ReactNode, useState } from 'react';
import { WeatherData, ForecastData, WeatherError, WeatherContextType} from '../types/weather';
import { getCurrentWeather, getForecast } from '../api/weatherApi';

// Create the context
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Provider component
interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherError | null>(null);

  const fetchWeather = async (city: string) => {
    try{
      setLoading(true);
      setError(null);
      
      //Getting the weather information for the 'city'
      const weatherData = await getCurrentWeather(city);
      setWeather(weatherData);
      
      //Getting the weather forecast for the next 5 days
      const forecastData = await getForecast(city);
      setForecast(forecastData);
      
      setLoading(false);
    }catch(err){
      setLoading(false);
      setError({
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        isError: true
      });
    }
  };

  const contextValue: WeatherContextType = {weather, forecast, loading, error, fetchWeather};

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};