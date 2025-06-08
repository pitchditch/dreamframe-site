import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, CalendarClock, Cloud, CloudSnow } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface WeatherData {
  condition: string;
  temperature: number;
  location: string;
  description: string;
}

const FooterWeatherService = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    condition: 'clear',
    temperature: 18,
    location: 'White Rock, BC',
    description: 'Clear Skies'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using OpenWeatherMap API for White Rock, BC
        const API_KEY = '8b2a6a7c4b7b1f5a9e9b8c3d2e1f4a5b'; // You'll need to get a real API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=White Rock,BC,CA&appid=${API_KEY}&units=metric`
        );
        
        if (response.ok) {
          const data = await response.json();
          setCurrentWeather({
            condition: data.weather[0].main.toLowerCase(),
            temperature: Math.round(data.main.temp),
            location: 'White Rock, BC',
            description: data.weather[0].description
          });
        }
      } catch (error) {
        console.log('Weather API not available, using default values');
        // Keep default values if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (currentWeather.condition) {
      case 'rain':
      case 'drizzle':
        return <CloudRain className="text-blue-500" size={20} />;
      case 'snow':
        return <CloudSnow className="text-blue-300" size={20} />;
      case 'clouds':
        return <Cloud className="text-gray-500" size={20} />;
      default:
        return <Sun className="text-yellow-500" size={20} />;
    }
  };

  const isServiceAvailable = !['rain', 'snow', 'thunderstorm'].includes(currentWeather.condition);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-600 rounded mb-4"></div>
            <div className="h-8 bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
          {getWeatherIcon()}
          <span className="ml-2">Weather & Service</span>
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">{currentWeather.temperature}°C</div>
          <div className="text-base font-medium mb-1 capitalize">{currentWeather.description}</div>
          <div className="text-sm text-gray-400 mb-3">{currentWeather.location}</div>
          
          {/* Service Availability Banner */}
          <div className={`p-2 rounded-lg mt-2 ${isServiceAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="font-medium text-sm">
              {isServiceAvailable ? 'Perfect Conditions!' : 'Weather Advisory'}
            </div>
          </div>
          
          {isServiceAvailable ? (
            <Button 
              className="w-full mt-3 bg-bc-red hover:bg-red-700"
              asChild
            >
              <Link to="/contact">Book Now</Link>
            </Button>
          ) : (
            <div className="mt-3 text-sm text-gray-400">
              We'll resume outdoor services when weather improves
            </div>
          )}
          
          <div className="text-center mt-3">
            <Button 
              variant="outline" 
              className="bg-transparent hover:bg-gray-800 text-white border-gray-600 w-full"
              asChild
            >
              <Link to="/contact">View All Contact Options</Link>
            </Button>
          </div>
          
          <div className="mt-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-yellow-300 text-sm text-center">
              Mention you've seen our car on Marine Drive for 10% off!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterWeatherService;
