import React from 'react';
import { WeatherData} from '../types/weather';
import { formatDate, formatTime, getWeatherIconUrl, formatTemperature} from '../utils/helper';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data}) => {
  if (!data) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{data.name}, {data.sys.country}</h2>
            <p className="text-sm">{formatDate(data.dt)}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{formatTemperature(data.main.temp)}</p>
            <p className="text-sm">Feels like: {formatTemperature(data.main.feels_like)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={getWeatherIconUrl(data.weather[0].icon)} 
            alt={data.weather[0].description}
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="font-medium text-lg capitalize">{data.weather[0].description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                <path d="M12 6.5V12"></path>
              </svg>
              <p className="text-sm text-gray-500">Humidity</p>
            </div>
            <p className="font-medium ml-7">{data.main.humidity}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
              </svg>
              <p className="text-sm text-gray-500">Wind Speed</p>
            </div>
            <p className="font-medium ml-7">{data.wind.speed} m/s</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-500">Sunrise</p>
            </div>
            <p className="font-medium ml-7">{formatTime(data.sys.sunrise)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <p className="text-sm text-gray-500">Sunset</p>
            </div>
            <p className="font-medium ml-7">{formatTime(data.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;