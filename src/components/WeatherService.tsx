
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, CloudRain, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeatherService = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeather] = useState({
    condition: 'clear',
    temperature: 18,
    location: 'White Rock, BC'
  });

  // Mock clear days for the month (in a real app, this would come from weather API)
  const clearDays = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 20, 22, 25, 27, 29, 31
  ];

  const isServiceAvailable = currentWeather.condition === 'clear';

  // Function to check if a date is a clear day
  const isDayClear = (date: Date) => {
    return clearDays.includes(date.getDate());
  };

  // Custom day renderer for calendar
  const modifiers = {
    clear: (date: Date) => isDayClear(date)
  };

  const modifiersStyles = {
    clear: {
      backgroundColor: '#22c55e',
      color: 'white',
      borderRadius: '50%'
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Weather & Service Availability</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check current weather conditions for window cleaning services in White Rock and Surrey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto">
          {/* Current Weather - Smaller Card */}
          <Card className="lg:w-1/3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sun className="text-yellow-500" size={20} />
                Current Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{currentWeather.temperature}°C</div>
                <div className="text-base font-medium mb-1">Clear Skies</div>
                <div className="text-sm text-gray-600 mb-3">{currentWeather.location}</div>
                
                {/* Service Availability Banner */}
                <div className={`p-2 rounded-lg mt-2 ${isServiceAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="font-medium text-sm">
                    {isServiceAvailable ? 'Perfect Conditions!' : 'Weather Advisory'}
                  </div>
                </div>
                
                {isServiceAvailable && (
                  <Button 
                    className="w-full mt-3 bg-bc-red hover:bg-red-700"
                    asChild
                  >
                    <Link to="/contact">Book Now</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar with Clear Days - Cleaner Look */}
          <Card className="lg:w-2/3">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CalendarClock size={20} />
                  Clear Days This Month
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  Green = Optimal Days
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className="rounded-md border mx-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Missing Badge import
const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
};

export default WeatherService;
