import React, {useEffect} from 'react';
import { WeatherProvider } from '@contexts/WeatherContext';
import { useWeather } from '@hooks/useWeather';
import SearchBar from '@components/SearchBar';
import WeatherCard from '@components/WeatherCard';

const WeatherApp: React.FC = () => {
  const { weather, forecast, loading, error, fetchWeather} = useWeather();

  //For the first reload just fetch the weather of the Pune and display it
  useEffect(() => {
    fetchWeather('Pune');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-800 py-8 px-4">
      <div className="container mx-auto">
        
        <header className="text-center mb-2">
          <h1 className="text-3xl font-bold mb-2 text-black">Weather Forecast</h1>
        </header>
        
        <SearchBar fetchWeather={fetchWeather} isLoading={loading} />
        
        <WeatherCard weather={weather} forecast={forecast} loading={loading} error={error}/>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
};

export default App;