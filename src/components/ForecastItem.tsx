import React from 'react';
import { ForecastItem as ForecastItemType } from '../types/weather';
import { 
  getTimeFromDateString, 
  getWeatherIconUrl, 
  formatTemperature 
} from '../utils/helper';

interface ForecastItemProps {
  data: ForecastItemType;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center p-3 bg-white rounded-lg">
      <p className="text-sm font-medium">{getTimeFromDateString(data.dt_txt)}</p>
      <img 
        src={getWeatherIconUrl(data.weather[0].icon)} 
        alt={data.weather[0].description}
        className="w-12 h-12 my-1"
      />
      <p className="font-bold">{formatTemperature(data.main.temp)}</p>
      <p className="text-xs text-gray-500 capitalize truncate w-full text-center">
        {data.weather[0].description}
      </p>
    </div>
  );
};

export default ForecastItem;