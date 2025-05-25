
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Cloud, CloudRain, Wind, Thermometer } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

// Mock weather data - in a real app, this would come from an API
const mockWeatherData = {
  location: "White Rock, BC",
  temperature: 18,
  condition: "Clear",
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  isOptimal: true
};

const WeatherService = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(mockWeatherData);
  const [optimalDays, setOptimalDays] = useState(22);

  useEffect(() => {
    // Simulate fetching weather data
    const fetchWeather = () => {
      // In a real app, you'd fetch from an API like OpenWeatherMap
      setWeather(mockWeatherData);
      
      // Calculate optimal days for this month (mock calculation)
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const randomOptimalDays = Math.floor(Math.random() * 10) + 15; // 15-25 optimal days
      setOptimalDays(Math.min(randomOptimalDays, daysInMonth));
    };

    fetchWeather();
    // Update every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getConditionColor = (isOptimal: boolean) => {
    return isOptimal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Generate calendar grid for current month
  const generateCalendarDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isOptimalDay = Math.random() > 0.3; // 70% chance of optimal day
      const isToday = day === now.getDate();
      
      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
            isToday 
              ? 'bg-bc-red text-white font-bold' 
              : isOptimalDay 
                ? 'bg-green-200 text-green-800' 
                : 'bg-red-200 text-red-800'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <section className="py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t("Weather & Service Availability")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("Check current weather conditions for window cleaning services in White Rock and Surrey")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Current Weather Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-bc-red" />
                {t("Current Weather")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(weather.condition)}
                    <span className="text-2xl font-bold">{weather.temperature}°C</span>
                  </div>
                  <p className="text-lg font-semibold">{t("Clear Skies")}</p>
                  <p className="text-sm text-gray-600">{t("White Rock, BC")}</p>
                </div>
                <Badge className={getConditionColor(weather.isOptimal)}>
                  {weather.isOptimal ? t("Perfect Conditions!") : "Not Optimal"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span>Wind: {weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-gray-500" />
                  <span>Humidity: {weather.humidity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Optimal Days Calendar */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-bc-red" />
                {t("Clear Days This Month")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-green-600">{optimalDays}</span>
                <span className="text-lg text-gray-600"> / {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}</span>
                <p className="text-sm text-gray-600 mt-1">{t("Green = Optimal Days")}</p>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-xs font-semibold text-gray-500 pb-1">
                    {day}
                  </div>
                ))}
                {generateCalendarDays()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeatherService;
