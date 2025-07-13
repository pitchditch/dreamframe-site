
import { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  isOptimal: boolean;
  icon: string;
}

interface LocationData {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async (): Promise<LocationData> => {
    // Try to get user's location via geolocation API
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Use a reverse geocoding service to get city name
              const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=demo`
              );
              
              if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                  resolve({
                    city: data[0].name,
                    region: data[0].state || data[0].country,
                    country: data[0].country,
                    lat: latitude,
                    lon: longitude
                  });
                  return;
                }
              }
              
              // Fallback to IP-based location
              resolve(await getLocationByIP());
            } catch (err) {
              resolve(await getLocationByIP());
            }
          },
          async () => {
            // User denied location access, fallback to IP
            resolve(await getLocationByIP());
          }
        );
      });
    } else {
      // Geolocation not supported, fallback to IP
      return getLocationByIP();
    }
  };

  const getLocationByIP = async (): Promise<LocationData> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        city: data.city || 'White Rock',
        region: data.region || 'BC',
        country: data.country_code || 'CA',
        lat: data.latitude || 49.0259,
        lon: data.longitude || -122.8034
      };
    } catch (err) {
      // Ultimate fallback to White Rock, BC
      return {
        city: 'White Rock',
        region: 'BC', 
        country: 'CA',
        lat: 49.0259,
        lon: -122.8034
      };
    }
  };

  const fetchWeather = async (locationData: LocationData) => {
    try {
      // Using OpenWeatherMap API (you would need to replace with a real API key)
      // For demo purposes, we'll simulate based on current conditions
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=demo&units=metric`
      );

      let weatherData: WeatherData;

      if (response.ok) {
        const data = await response.json();
        const isOptimal = ['Clear', 'Sunny'].includes(data.weather[0].main) && data.wind.speed < 15;
        
        weatherData = {
          location: `${locationData.city}, ${locationData.region}`,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
          isOptimal,
          icon: data.weather[0].icon
        };
      } else {
        // Fallback to simulated data based on current time and season
        const now = new Date();
        const hour = now.getHours();
        const month = now.getMonth();
        
        // Simulate seasonal and daily patterns
        const isWinter = month >= 11 || month <= 2;
        const isDaytime = hour >= 6 && hour <= 18;
        
        let condition = 'Clear';
        let temperature = 18;
        
        if (isWinter) {
          temperature = Math.random() > 0.3 ? Math.floor(Math.random() * 10 + 2) : Math.floor(Math.random() * 8 + 8);
          condition = Math.random() > 0.6 ? 'Cloudy' : Math.random() > 0.8 ? 'Rain' : 'Clear';
        } else {
          temperature = Math.random() > 0.2 ? Math.floor(Math.random() * 15 + 15) : Math.floor(Math.random() * 10 + 10);
          condition = Math.random() > 0.7 ? 'Cloudy' : 'Clear';
        }

        const windSpeed = Math.floor(Math.random() * 20 + 5);
        const isOptimal = condition === 'Clear' && windSpeed < 15;

        weatherData = {
          location: `${locationData.city}, ${locationData.region}`,
          temperature,
          condition,
          humidity: Math.floor(Math.random() * 30 + 50),
          windSpeed,
          visibility: Math.floor(Math.random() * 5 + 8),
          isOptimal,
          icon: condition === 'Clear' ? '01d' : condition === 'Cloudy' ? '02d' : '10d'
        };
      }

      setWeather(weatherData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeWeather = async () => {
      try {
        const locationData = await getLocation();
        setLocation(locationData);
        await fetchWeather(locationData);
      } catch (err) {
        setError('Failed to get location');
        setLoading(false);
      }
    };

    initializeWeather();

    // Update weather every 10 minutes
    const interval = setInterval(() => {
      if (location) {
        fetchWeather(location);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const refreshWeather = async () => {
    if (location) {
      setLoading(true);
      await fetchWeather(location);
    }
  };

  return {
    weather,
    location,
    loading,
    error,
    refreshWeather
  };
};
