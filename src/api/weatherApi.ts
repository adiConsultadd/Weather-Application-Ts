import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

// Create axios instance with base configuration
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

// Fetching the API_KEY from the .env
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Intercept requests to add API key
weatherApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: API_KEY,
    units: 'metric',
  };
  return config;
});

//Gets the current weather for the mentioned city
export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get<WeatherData>('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
    throw new Error('An unexpected error occurred');
  }
};

//Gets the forecast of the next 5 days for the mentioned city
export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await weatherApi.get<ForecastData>('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
    throw new Error('An unexpected error occurred');
  }
};