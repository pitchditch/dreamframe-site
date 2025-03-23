
import { useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';

const locations = [
  "Vancouver",
  "Burnaby",
  "Richmond",
  "Surrey",
  "White Rock",
  "Delta",
  "Langley",
  "Coquitlam",
  "Port Coquitlam",
  "New Westminster",
  "West Vancouver",
  "North Vancouver",
  "Abbotsford",
  "Maple Ridge",
  "Mission",
  "Chilliwack",
  "Pitt Meadows",
  "Port Moody"
];

const LocationBanner = () => {
  const { t, language } = useTranslation();
  
  // Create duplicate array for seamless scrolling
  const duplicatedLocations = [...locations, ...locations];
  
  return (
    <div className="bg-bc-red py-3 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="text-lg font-medium mr-4 whitespace-nowrap">
            {t("We Proudly Serve the following cities")}:
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="flex whitespace-nowrap animate-[slide_30s_linear_infinite] space-x-8">
              {duplicatedLocations.map((location, index) => (
                <span key={index} className="text-lg font-medium italic">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
