export interface WeatherData {
  name: string;
  dt: number; 
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}
  
export interface ForecastData {
  list: ForecastItem[];
  city: {
      name: string;
      country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
      temp: number;
      feels_like: number;
      humidity: number;
  };
  weather: [
      {
      main: string;
      description: string;
      icon: string;
      }
  ];
  dt_txt: string;
}

export interface WeatherError {
  message: string;
  isError: boolean;
}

export interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: WeatherError | null;
  fetchWeather: (city: string) => Promise<void>;
}