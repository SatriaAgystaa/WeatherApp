import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [city, setCity] = useState(''); // Start with an empty string
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgClass, setBgClass] = useState('bg-day');
  const [localTime, setLocalTime] = useState('');
  const [timezone, setTimezone] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const fetchWeather = async () => {
    if (!city) return; // Prevent fetching if city is empty
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      if (res.ok) {
        setWeatherData(data);
        setTimezone(data.timezone); // Get timezone from the weather data
        updateLocalTime(data.timezone); // Start updating the local time
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  const updateLocalTime = (timezone) => {
    const updateTime = () => {
      const localDate = new Date();
      const utcOffset = localDate.getTimezoneOffset() * 60; // Convert minutes to seconds
      const localUnixTime = (localDate.getTime() / 1000) + timezone + utcOffset; // Adjust for timezone
      const hours = new Date(localUnixTime * 1000).getHours(); // Get hours for background update
      setLocalTime(new Date(localUnixTime * 1000).toLocaleTimeString([], { timeStyle: 'short' }));

      // Update background class based on hours
      const newBgClass = 
        hours >= 6 && hours < 12 ? 'bg-morning' :
        hours >= 12 && hours < 17 ? 'bg-day' :
        hours >= 17 && hours < 20 ? 'bg-evening' : 'bg-night';

      setBgClass(newBgClass);
    };

    // Clear previous interval if it exists
    if (intervalId) clearInterval(intervalId);
    
    // Update time initially
    updateTime();
    
    // Set new interval
    const id = setInterval(updateTime, 1000); // Update every second
    setIntervalId(id); // Store the interval ID
  };

  useEffect(() => {
    fetchWeather();
    // Cleanup interval on component unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [city]); // Run effect when city changes

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-700 flex flex-col`}>
      <header className="flex justify-between items-center p-4 bg-opacity-70 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl font-bold text-white">Weather App</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter city"
            className="p-2 text-base rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 w-48 bg-white text-gray-800 shadow-md placeholder-gray-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-base rounded-full hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-105 duration-300"
          >
            Get Weather
          </button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        {loading ? (
          <p className="text-white mt-4">Loading...</p>
        ) : (
          weatherData && (
            <WeatherCard
              weather={weatherData}
              localTime={localTime} // Pass local time to WeatherCard
              bgClass={bgClass}
            />
          )
        )}
      </main>
    </div>
  );
}
