import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  fetchWeather: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ fetchWeather, isLoading }) => {
  const [city, setCity] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center">
        <input type="text" value={city} disabled={isLoading} onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 rounded-lg shadow-sm font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 
          placeholder:text-gray-700 text-gray-700"
        />
        <button type="submit" disabled={isLoading || !city.trim()}
          className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
        >
          {isLoading ? 
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading
            </span> : 
            'Search'
          }
        </button>
      </div>
    </form>
  );
};

export default SearchBar;