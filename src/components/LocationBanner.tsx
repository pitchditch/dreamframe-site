
import { useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Link } from 'react-router-dom';

// Enhanced with county/region information for better SEO
const locations = [
  { name: "White Rock", url: "/locations/white-rock", featured: true },
  { name: "Surrey", region: "BC" },
  { name: "Vancouver", region: "BC" },
  { name: "Burnaby", region: "BC" },
  { name: "Richmond", region: "BC" },
  { name: "Delta", region: "BC" },
  { name: "Langley", region: "BC" },
  { name: "Coquitlam", region: "BC" },
  { name: "Port Coquitlam", region: "BC" },
  { name: "New Westminster", region: "BC" },
  { name: "West Vancouver", region: "BC" },
  { name: "North Vancouver", region: "BC" },
  { name: "Abbotsford", region: "BC" },
  { name: "Maple Ridge", region: "BC" },
  { name: "Mission", region: "BC" },
  { name: "Chilliwack", region: "BC" },
  { name: "Pitt Meadows", region: "BC" },
  { name: "Port Moody", region: "BC" }
];

const LocationBanner = () => {
  const { t, language } = useTranslation();
  
  // Create duplicate array for seamless scrolling
  const duplicatedLocations = [...locations, ...locations];
  
  return (
    <section className="bg-bc-red py-3 text-white overflow-hidden" aria-label="Service Areas">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="text-lg font-medium mr-4 whitespace-nowrap">
            {t("We Proudly Serve the following cities")}:
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="flex whitespace-nowrap animate-[slide_30s_linear_infinite] space-x-8">
              {duplicatedLocations.map((location, index) => (
                location.featured ? (
                  <Link 
                    key={index}
                    to={location.url}
                    className="text-lg font-bold italic underline hover:text-white/80 transition-colors"
                    title={`Pressure Washing Services in ${location.name}, BC`}
                  >
                    {location.name}
                  </Link>
                ) : (
                  <span key={index} className="text-lg font-medium italic" title={`Service Area: ${location.name}, ${location.region}`}>
                    {location.name}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden SEO-optimized content for search engines */}
      <div className="sr-only">
        <h2>BC Pressure Washing Service Areas</h2>
        <p>We provide professional pressure washing services throughout British Columbia, including White Rock, Surrey, Vancouver, Burnaby, and all surrounding areas.</p>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {location.featured ? (
                <Link to={location.url}>Professional Pressure Washing in {location.name}, {location.region || 'BC'}</Link>
              ) : (
                `Pressure Washing Services in ${location.name}, ${location.region || 'BC'}`
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LocationBanner;
