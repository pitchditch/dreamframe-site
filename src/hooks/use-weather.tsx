
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

  const getRealisticWeatherData = (locationData: LocationData): WeatherData => {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth();
    const day = now.getDate();
    
    // Vancouver/White Rock seasonal weather patterns
    const isWinter = month >= 11 || month <= 2; // Dec-Feb
    const isSpring = month >= 3 && month <= 5;  // Mar-May
    const isSummer = month >= 6 && month <= 8;  // Jun-Aug
    const isFall = month >= 9 && month <= 10;   // Sep-Nov
    
    let baseTemp = 12;
    let condition = 'Clear';
    let humidity = 65;
    let windSpeed = 8;
    
    // Seasonal adjustments
    if (isWinter) {
      baseTemp = Math.floor(Math.random() * 8 + 4); // 4-12°C
      condition = Math.random() > 0.4 ? 'Rain' : Math.random() > 0.6 ? 'Cloudy' : 'Clear';
      humidity = Math.floor(Math.random() * 20 + 70); // 70-90%
      windSpeed = Math.floor(Math.random() * 15 + 10); // 10-25 km/h
    } else if (isSpring) {
      baseTemp = Math.floor(Math.random() * 10 + 10); // 10-20°C
      condition = Math.random() > 0.6 ? 'Cloudy' : Math.random() > 0.8 ? 'Rain' : 'Clear';
      humidity = Math.floor(Math.random() * 25 + 60); // 60-85%
      windSpeed = Math.floor(Math.random() * 12 + 5); // 5-17 km/h
    } else if (isSummer) {
      baseTemp = Math.floor(Math.random() * 8 + 18); // 18-26°C
      condition = Math.random() > 0.8 ? 'Cloudy' : 'Clear';
      humidity = Math.floor(Math.random() * 20 + 50); // 50-70%
      windSpeed = Math.floor(Math.random() * 10 + 3); // 3-13 km/h
    } else { // Fall
      baseTemp = Math.floor(Math.random() * 8 + 8); // 8-16°C
      condition = Math.random() > 0.5 ? 'Rain' : Math.random() > 0.7 ? 'Cloudy' : 'Clear';
      humidity = Math.floor(Math.random() * 25 + 65); // 65-90%
      windSpeed = Math.floor(Math.random() * 18 + 8); // 8-26 km/h
    }
    
    // Time of day adjustments (cooler at night)
    if (hour < 6 || hour > 20) {
      baseTemp = Math.max(0, baseTemp - 3);
    }
    
    // Determine if conditions are optimal for cleaning
    const isOptimal = condition === 'Clear' && windSpeed < 15 && baseTemp > 5;
    
    // Get appropriate icon
    let icon = '01d';
    if (condition === 'Rain') icon = '10d';
    else if (condition === 'Cloudy') icon = '02d';
    else if (hour < 6 || hour > 18) icon = '01n';
    
    return {
      location: `${locationData.city}, ${locationData.region}`,
      temperature: baseTemp,
      condition,
      humidity,
      windSpeed,
      visibility: Math.floor(Math.random() * 5 + 8), // 8-13 km
      isOptimal,
      icon
    };
  };

  const fetchWeather = async (locationData: LocationData) => {
    try {
      // For demo, we'll use realistic simulated data
      const weatherData = getRealisticWeatherData(locationData);
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
