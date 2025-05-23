
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, CloudRain, AlertTriangle, CheckCircle } from 'lucide-react';

const WeatherService = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeather, setCurrentWeather] = useState({
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
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Weather & Service Availability</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Perfect weather conditions for professional cleaning services in White Rock and Surrey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Current Weather */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="text-yellow-500" size={24} />
                Current Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{currentWeather.temperature}°C</div>
                <div className="text-lg font-medium mb-2">Clear Skies</div>
                <div className="text-gray-600 mb-4">{currentWeather.location}</div>
                
                {/* Service Availability Alert */}
                <div className={`p-3 rounded-lg ${isServiceAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isServiceAvailable ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertTriangle size={20} />
                    )}
                    <span className="font-medium">
                      {isServiceAvailable ? 'Services Available' : 'Weather Advisory'}
                    </span>
                  </div>
                  <p className="text-sm">
                    {isServiceAvailable 
                      ? 'Perfect conditions for all cleaning services!'
                      : 'Poor weather conditions. Services may be delayed.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar with Clear Days */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Clear Days This Month</CardTitle>
              <p className="text-sm text-gray-600">Green dots indicate optimal days for cleaning services</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Clear Weather Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span>Regular Days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeatherService;
