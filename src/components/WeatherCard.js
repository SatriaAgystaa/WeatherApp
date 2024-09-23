import React from 'react';

const getWeatherIconByWeather = (temp, weatherDescription) => {
  const description = weatherDescription.toLowerCase();

  if (description.includes('thunderstorm')) return 'cerah-berpetir';
  if (description.includes('drizzle') || description.includes('rain') || description.includes('shower')) return 'hujan';
  if (description.includes('snow')) return 'salju';
  if (description.includes('clear')) return temp >= 30 ? 'cerah' : 'cerah-berawan';
  if (description.includes('clouds')) return 'berawan';
  if (description.includes('mist') || description.includes('fog') || description.includes('haze')) return 'kabut';
  if (description.includes('wind')) return 'berangin';
  if (description.includes('smoke')) return 'kabut';
  if (description.includes('sand') || description.includes('dust')) return 'kabut';

  return 'badai';
};

const WeatherCard = ({ weather, localTime, bgClass }) => {
  const temperature = weather.main.temp;
  const weatherDescription = weather.weather[0].description;
  const icon = getWeatherIconByWeather(temperature, weatherDescription);
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const feelsLike = weather.main.feels_like;
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className={`flex flex-col items-center w-full max-w-lg h-auto p-6 ${bgClass} rounded-lg shadow-lg relative`}>
      <div className="relative z-10 text-center text-white">
        <h2 className="text-4xl font-bold mb-2">{weather.name}</h2>
        <img src={`/asset/${icon}.png`} alt="weather-icon" className="w-24 h-24 mx-auto my-4" />
        <p className="text-6xl font-bold">{weather.main.temp}°C</p>
        <p className="text-lg capitalize">{weather.weather[0].description}</p>
        <p className="text-md mt-1">Feels like: {feelsLike}°C</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p className="text-md">Max: {weather.main.temp_max}°C</p>
          <p className="text-md">Min: {weather.main.temp_min}°C</p>
          <p className="text-md">Humidity: {humidity}%</p>
          <p className="text-md">Wind: {windSpeed} m/s</p>
        </div>
        <div className="mt-4">
          <p className="text-md">Sunrise: {sunrise}</p>
          <p className="text-md">Sunset: {sunset}</p>
        </div>
      </div>
      <div className="flex-shrink-0 w-full bg-white bg-opacity-40 backdrop-blur-md rounded-xl p-4 mt-6 shadow-lg">
        <div className="flex justify-between items-center text-lg text-white mb-4">
          <span>Today</span>
          <span>{localTime}</span>
        </div>
        <div className="flex justify-around">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={`/asset/${icon}.png`} alt="forecast-icon" className="w-10 h-10" />
              <p className="text-md">{15 + index}:00</p>
              <p className="text-md">{temperature - index}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
