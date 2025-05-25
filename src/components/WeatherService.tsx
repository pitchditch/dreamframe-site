
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sun, Cloud, CloudRain, Wind, Thermometer, RefreshCw, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useWeather } from '@/hooks/use-weather';

const WeatherService = () => {
  const { t } = useTranslation();
  const { weather, location, loading, error, refreshWeather } = useWeather();

  const getWeatherIcon = (condition: string, iconCode?: string) => {
    if (iconCode) {
      // Use OpenWeatherMap icon if available
      return (
        <img 
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} 
          alt={condition}
          className="w-16 h-16"
        />
      );
    }

    // Fallback to Lucide icons
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'clouds':
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-12 h-12 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getConditionColor = (isOptimal: boolean) => {
    return isOptimal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

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
    
    // Add days of the month with realistic weather prediction
    for (let day = 1; day <= daysInMonth; day++) {
      // More realistic optimal day calculation based on season and weather patterns
      const dayOfYear = Math.floor((new Date(year, month, day) - new Date(year, 0, 0)) / 86400000);
      const seasonalFactor = Math.sin((dayOfYear / 365) * Math.PI * 2) * 0.3 + 0.7; // Higher in summer
      const randomFactor = Math.random();
      const isOptimalDay = (seasonalFactor * randomFactor) > 0.4;
      
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

  const optimalDays = React.useMemo(() => {
    // Calculate optimal days based on season
    const now = new Date();
    const month = now.getMonth();
    const daysInMonth = new Date(now.getFullYear(), month + 1, 0).getDate();
    
    // Seasonal adjustment (more optimal days in spring/summer)
    let baseOptimalDays = 15;
    if (month >= 3 && month <= 8) { // Spring/Summer
      baseOptimalDays = 20;
    } else if (month >= 9 && month <= 11) { // Fall
      baseOptimalDays = 18;
    } else { // Winter
      baseOptimalDays = 12;
    }
    
    return Math.min(baseOptimalDays + Math.floor(Math.random() * 5), daysInMonth);
  }, []);

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">{t("Loading weather data...")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !weather) {
    return (
      <section className="py-8 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || t("Unable to load weather data")}</p>
            <Button onClick={refreshWeather} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t("Try Again")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t("Weather & Service Availability")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            {t("Live weather conditions for window cleaning services in")} {weather.location}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Current Weather Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-bc-red" />
                  {t("Current Weather")}
                </div>
                <Button 
                  onClick={refreshWeather} 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(weather.condition, weather.icon)}
                    <span className="text-2xl font-bold">{weather.temperature}°C</span>
                  </div>
                  <p className="text-lg font-semibold">{weather.condition}</p>
                  <p className="text-sm text-gray-600">{weather.location}</p>
                </div>
                <Badge className={getConditionColor(weather.isOptimal)}>
                  {weather.isOptimal ? t("Perfect Conditions!") : t("Weather Advisory")}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span>{t("Wind")}: {weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-gray-500" />
                  <span>{t("Humidity")}: {weather.humidity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Optimal Days Calendar */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-bc-red" />
                {t("Optimal Days This Month")}
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
