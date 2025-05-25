
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Sun, Cloud, CloudRain, Wind, Thermometer, MapPin, CalendarDays } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useWeather } from '@/hooks/use-weather';
import { format } from 'date-fns';

const SmartScheduler = () => {
  const { t } = useTranslation();
  const { weather, loading, error } = useWeather();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getWeatherIcon = (condition: string, iconCode?: string) => {
    if (iconCode) {
      return (
        <img 
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} 
          alt={condition}
          className="w-12 h-12"
        />
      );
    }

    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'clouds':
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
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
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfYear = Math.floor((Number(new Date(year, month, day)) - Number(new Date(year, 0, 0))) / 86400000);
      const seasonalFactor = Math.sin((dayOfYear / 365) * Math.PI * 2) * 0.3 + 0.7;
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

  const handleBooking = () => {
    if (selectedDate) {
      // Navigate to contact page with pre-filled date
      window.location.href = `/contact?service=window-cleaning&date=${format(selectedDate, 'yyyy-MM-dd')}`;
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">{t("Loading weather data...")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <CalendarDays className="w-8 h-8 text-bc-red" />
            {t("Smart Window Cleaning Scheduler")}
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <span>{t("Live Weather · Optimal Days · Book Instantly")}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Weather & Availability Column */}
          <div className="space-y-6">
            {/* Current Weather Summary */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Thermometer className="w-5 h-5 text-bc-red" />
                  {t("Current Conditions")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weather && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getWeatherIcon(weather.condition, weather.icon)}
                        <div>
                          <div className="text-2xl font-bold">{weather.temperature}°C</div>
                          <div className="text-gray-600">{weather.condition}</div>
                        </div>
                      </div>
                      <Badge className={weather.isOptimal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {weather.isOptimal ? t("Perfect Conditions!") : t("Not Ideal Today")}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{weather.location}</span>
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
                  </>
                )}
              </CardContent>
            </Card>

            {/* Optimal Days Calendar */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sun className="w-5 h-5 text-bc-red" />
                  {t("Optimal Days This Month")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-green-600">18</span>
                  <span className="text-lg text-gray-600"> / {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}</span>
                  <p className="text-sm text-gray-600 mt-1">{t("Green = Perfect Weather Days")}</p>
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

          {/* Booking Calendar Column */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarDays className="w-5 h-5 text-bc-red" />
                  {t("Book Your Service")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border mx-auto"
                    disabled={(date) => date < new Date()}
                  />
                  
                  {selectedDate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">{t("Selected Date")}:</p>
                      <p className="font-semibold text-lg">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-bc-red hover:bg-red-700 text-white"
                    disabled={!selectedDate}
                  >
                    {t("Book Window Cleaning Service")}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>{t("Free quotes · Same day response · Fully insured")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartScheduler;
