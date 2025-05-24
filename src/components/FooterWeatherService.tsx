
import React, { useState } from 'react';
import { Sun, CloudRain, CalendarClock } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const FooterWeatherService = () => {
  const [currentWeather] = useState({
    condition: 'clear',
    temperature: 18,
    location: 'White Rock, BC'
  });

  const isServiceAvailable = currentWeather.condition === 'clear';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Sun className="mr-2" size={20} /> Weather & Service
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">{currentWeather.temperature}°C</div>
          <div className="text-base font-medium mb-1">Clear Skies</div>
          <div className="text-sm text-gray-400 mb-3">{currentWeather.location}</div>
          
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
