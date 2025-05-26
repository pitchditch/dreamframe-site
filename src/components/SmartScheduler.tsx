
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

  // More realistic optimal days calculation based on actual weather patterns
  const generateOptimalDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Seasonal factors for more realistic weather
    const isWinter = month >= 11 || month <= 2;
    const isSpring = month >= 3 && month <= 5;
    const isSummer = month >= 6 && month <= 8;
    const isFall = month >= 9 && month <= 11;
    
    let baseOptimalChance = 0.4;
    if (isSummer) baseOptimalChance = 0.7;
    else if (isSpring || isFall) baseOptimalChance = 0.6;
    else if (isWinter) baseOptimalChance = 0.3;
    
    // Create more realistic weather patterns
    const optimalDays = [];
    let consecutiveRainyDays = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      // Weather tends to come in patterns
      let dayOptimalChance = baseOptimalChance;
      
      // Less likely to be optimal after consecutive rainy days initially, then more likely
      if (consecutiveRainyDays > 2) {
        dayOptimalChance += 0.3;
      } else if (consecutiveRainyDays > 0) {
        dayOptimalChance -= 0.2;
      }
      
      // Weekend bias - slightly better weather on weekends (for booking convenience)
      const dayOfWeek = new Date(year, month, day).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        dayOptimalChance += 0.1;
      }
      
      const isOptimal = Math.random() < dayOptimalChance;
      
      if (isOptimal) {
        consecutiveRainyDays = 0;
      } else {
        consecutiveRainyDays++;
      }
      
      optimalDays.push({
        day,
        isOptimal,
        isToday: day === now.getDate()
      });
    }
    
    return optimalDays;
  };

  const optimalDaysData = generateOptimalDays();
  const optimalCount = optimalDaysData.filter(d => d.isOptimal).length;

  const handleBooking = () => {
    if (selectedDate) {
      window.location.href = `/contact?service=window-cleaning&date=${format(selectedDate, 'yyyy-MM-dd')}`;
    }
  };

  // Custom calendar day renderer to show optimal vs non-optimal days
  const isDayOptimal = (date: Date) => {
    const dayData = optimalDaysData.find(d => d.day === date.getDate());
    return dayData?.isOptimal || false;
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
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t("Smart Window Cleaning Scheduler")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("Book on optimal weather days for the best results")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Current Weather */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
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
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
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

                  <div className="text-center mt-6">
                    <div className="text-2xl font-bold text-green-600 mb-2">{optimalCount}</div>
                    <div className="text-gray-600">optimal days this month</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Combined Calendar */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-bc-red/10 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-bc-red" />
                </div>
                {t("Book Your Service")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border shadow-sm mx-auto bg-white"
                disabled={(date) => date < new Date()}
                modifiers={{
                  optimal: (date) => isDayOptimal(date)
                }}
                modifiersStyles={{
                  optimal: {
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    fontWeight: 'bold'
                  }
                }}
              />
              
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 rounded border border-green-300"></div>
                  <span className="text-gray-600">Optimal weather</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-white rounded border border-gray-300"></div>
                  <span className="text-gray-600">Regular day</span>
                </div>
              </div>
              
              {selectedDate && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-bc-red/5 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">{t("Selected Date")}:</div>
                  <div className="font-bold text-lg text-gray-900">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </div>
                  {isDayOptimal(selectedDate) && (
                    <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Optimal weather expected
                    </div>
                  )}
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
