
import React from 'react';
import { MapPin, Star, Users } from 'lucide-react';

interface LocationContentProps {
  cityName: string;
  postalCode?: string;
  nearbyAreas?: string[];
  localStats?: {
    reviewCount: number;
    avgRating: number;
    jobsCompleted: number;
  };
}

export const LocationAwareContent: React.FC<LocationContentProps> = ({
  cityName,
  postalCode,
  nearbyAreas = [],
  localStats
}) => {
  const getLocalLandmarks = (city: string): string[] => {
    const landmarks: Record<string, string[]> = {
      'Vancouver': ['Granville Island', 'Stanley Park', 'Coal Harbour', 'Yaletown'],
      'Surrey': ['Guildford Town Centre', 'White Rock Beach', 'Green Timbers Park'],
      'White Rock': ['White Rock Pier', 'Marine Drive', 'Centennial Beach'],
      'Richmond': ['Richmond Centre', 'Terra Nova Park', 'Steveston Village'],
      'Burnaby': ['Metrotown', 'Burnaby Mountain', 'Deer Lake Park'],
      'Coquitlam': ['Town Centre', 'Lafarge Lake', 'Colony Farm Regional Park']
    };
    
    return landmarks[city] || [];
  };

  const landmarks = getLocalLandmarks(cityName);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
      <div className="flex items-center mb-4">
        <MapPin className="w-6 h-6 text-bc-red mr-2" />
        <h3 className="text-xl font-bold text-gray-900">
          Proudly Serving {cityName}
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700 mb-4">
            We're your local exterior cleaning experts in {cityName}, BC. 
            {postalCode && ` Serving postal code ${postalCode} and surrounding areas.`}
          </p>
          
          {landmarks.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Areas We Service:</h4>
              <div className="flex flex-wrap gap-2">
                {landmarks.slice(0, 3).map((landmark, index) => (
                  <span 
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm"
                  >
                    {landmark}
                  </span>
                ))}
                {landmarks.length > 3 && (
                  <span className="text-sm text-gray-600">
                    +{landmarks.length - 3} more areas
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {localStats && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Local Trust</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm">
                  {localStats.avgRating} stars ({localStats.reviewCount} local reviews)
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm">
                  {localStats.jobsCompleted}+ jobs completed in {cityName}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {nearbyAreas.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Also serving: {nearbyAreas.slice(0, 4).join(', ')}
            {nearbyAreas.length > 4 && ` and ${nearbyAreas.length - 4} more areas`}
          </p>
        </div>
      )}
    </div>
  );
};
