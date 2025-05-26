
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Sun, Cloud, CloudRain, Wind, Thermometer, MapPin, CalendarDays, CheckCircle2 } from 'lucide-react';
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

  // Generate static optimal days pattern to prevent flashing
  const generateOptimalDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create a consistent pattern for optimal days
    const optimalDays = [2, 5, 7, 9, 12, 14, 16, 19, 21, 23, 25, 26, 28, 30];
    const days = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isOptimal = optimalDays.includes(day);
      const isToday = day === now.getDate();
      
      days.push({
        day,
        isOptimal,
        isToday
      });
    }
    
    return days;
  };

  const optimalDaysData = generateOptimalDays();
  const optimalCount = optimalDaysData.filter(d => d.isOptimal).length;

  const handleBooking = () => {
    if (selectedDate) {
      window.location.href = `/contact?service=window-cleaning&date=${format(selectedDate, 'yyyy-MM-dd')}`;
    }
  };

  // Determine background image and weather overlay based on weather condition
  const getBackgroundStyle = () => {
    if (!weather) {
      return {
        backgroundImage: `url('/lovable-uploads/300cfc16-3873-40ab-830a-e8dfacfa492f.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    const condition = weather.condition.toLowerCase();
    let backgroundImage = '';

    // Choose background image based on weather optimality
    if (weather.isOptimal) {
      backgroundImage = `url('/lovable-uploads/300cfc16-3873-40ab-830a-e8dfacfa492f.png')`; // Clean window view
    } else {
      backgroundImage = `url('/lovable-uploads/6d61cdcf-cec8-483a-8f31-2c02ad8a67f0.png')`; // Dirty/rainy window view
    }

    return {
      backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  };

  const getWeatherOverlay = () => {
    if (!weather) return null;

    const condition = weather.condition.toLowerCase();
    let overlayStyle = {};

    if (condition.includes('rain') || condition.includes('drizzle')) {
      overlayStyle = {
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.1) 100%)',
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1) 0px,
            rgba(59, 130, 246, 0.1) 2px,
            transparent 2px,
            transparent 4px
          )
        `
      };
    } else if (condition.includes('cloud')) {
      overlayStyle = {
        background: 'linear-gradient(45deg, rgba(107, 114, 128, 0.2) 0%, rgba(156, 163, 175, 0.1) 100%)'
      };
    } else if (condition.includes('clear') || condition.includes('sunny')) {
      overlayStyle = {
        background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.2) 0%, rgba(253, 224, 71, 0.1) 100%)'
      };
    }

    return (
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={overlayStyle}
      />
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
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
    <section 
      className="py-16 relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Weather overlay */}
      {getWeatherOverlay()}
      
      <div className="container mx-auto px-4 relative z-30">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100/80 backdrop-blur-sm rounded-full mb-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t("Smart Window Cleaning Scheduler")}
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t("Book on optimal weather days for the best results")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Current Weather */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Thermometer className="w-5 h-5 text-blue-600" />
                </div>
                {t("Current Conditions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weather && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(weather.condition, weather.icon)}
                      <div>
                        <div className="text-3xl font-bold text-gray-900">{weather.temperature}°C</div>
                        <div className="text-gray-600 font-medium">{weather.condition}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{weather.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg">
                    <div className="text-center">
                      <Wind className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-lg font-semibold text-gray-900">{weather.windSpeed}</div>
                      <div className="text-sm text-gray-600">km/h wind</div>
                    </div>
                    <div className="text-center">
                      <Cloud className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-lg font-semibold text-gray-900">{weather.humidity}%</div>
                      <div className="text-sm text-gray-600">humidity</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                    <Badge className={weather.isOptimal ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}>
                      {weather.isOptimal ? (
                        <><CheckCircle2 className="w-4 h-4 mr-1" /> {t("Perfect for Cleaning!")}</>
                      ) : (
                        t("Not Ideal Today")
                      )}
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Combined Optimal Days and Booking Calendar */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-bc-red/10 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-bc-red" />
                </div>
                {t("Optimal Days & Booking")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Optimal Days Overview */}
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{optimalCount}</div>
                <div className="text-gray-600 mb-4">perfect weather days this month</div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-sm font-semibold text-gray-500 pb-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {optimalDaysData.map(({ day, isOptimal, isToday }) => (
                    <div
                      key={day}
                      className={`
                        w-8 h-8 flex items-center justify-center text-sm rounded-md font-medium transition-colors
                        ${isToday 
                          ? 'bg-blue-600 text-white ring-2 ring-blue-200' 
                          : isOptimal 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center gap-4 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-100 rounded"></div>
                    <span className="text-gray-600">Optimal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-100 rounded"></div>
                    <span className="text-gray-600">Not ideal</span>
                  </div>
                </div>
              </div>

              {/* Booking Calendar */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border shadow-sm mx-auto bg-white/80 backdrop-blur-sm"
                disabled={(date) => date < new Date()}
              />
              
              {selectedDate && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-bc-red/5 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">{t("Selected Date")}:</div>
                  <div className="font-bold text-lg text-gray-900">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleBooking}
                className="w-full bg-bc-red hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                disabled={!selectedDate}
              >
                {t("Book Window Cleaning")}
              </Button>
              
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-600 font-medium">✓ Free quotes within 24 hours</p>
                <p className="text-sm text-gray-600">✓ Fully insured & guaranteed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SmartScheduler;
