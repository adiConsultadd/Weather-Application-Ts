export const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
};
  
export const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
};
  
export const getWeatherIconUrl = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
  
export const formatTemperature = (temp: number): string => {
    return `${Math.round(temp)}°C`;
};
  
export const getTimeFromDateString = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
};
  
export const groupForecastByDay = (list: any[]) => {
    return list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
      
      if (!acc[date]) {
        acc[date] = [];
      }
      
      acc[date].push(item);
      return acc;
    }, {});
};