
import { Link } from 'react-router-dom';

// Enhanced with county/region information and service keywords for better SEO
const locations = [
  { name: "White Rock", url: "/locations/white-rock", featured: true, services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Surrey", region: "BC", services: ["Window Cleaning"] },
  { name: "Vancouver", region: "BC", services: ["Window Cleaning"] },
  { name: "Burnaby", region: "BC", services: ["Window Cleaning"] },
  { name: "Richmond", region: "BC", services: ["Window Cleaning"] },
  { name: "Delta", region: "BC", services: ["Window Cleaning"] },
  { name: "Langley", region: "BC", services: ["Window Cleaning"] },
  { name: "Coquitlam", region: "BC", services: ["Window Cleaning"] },
  { name: "Port Coquitlam", region: "BC", services: ["Window Cleaning"] },
  { name: "New Westminster", region: "BC", services: ["Window Cleaning"] },
  { name: "West Vancouver", region: "BC", services: ["Window Cleaning"] },
  { name: "North Vancouver", region: "BC", services: ["Window Cleaning"] },
  { name: "Abbotsford", region: "BC", services: ["Window Cleaning"] },
  { name: "Maple Ridge", region: "BC", services: ["Window Cleaning"] },
  { name: "Mission", region: "BC", services: ["Window Cleaning"] },
  { name: "Chilliwack", region: "BC", services: ["Window Cleaning"] },
  { name: "Pitt Meadows", region: "BC", services: ["Window Cleaning"] },
  { name: "Port Moody", region: "BC", services: ["Window Cleaning"] }
];

const LocationBanner = () => {
  // Create duplicate array for seamless scrolling
  const duplicatedLocations = [...locations, ...locations];
  
  return (
    <section className="bg-bc-red py-3 text-white overflow-hidden" aria-label="Service Areas">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="text-lg font-medium mr-4 whitespace-nowrap">
            Professional Window Cleaning in:
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="flex whitespace-nowrap animate-[slide_30s_linear_infinite] space-x-8">
              {duplicatedLocations.map((location, index) => (
                location.featured ? (
                  <Link 
                    key={index}
                    to={location.url}
                    className="text-lg font-bold italic underline hover:text-white/80 transition-colors"
                    title={`Window Cleaning & Pressure Washing Services in ${location.name}, BC`}
                  >
                    {location.name}
                  </Link>
                ) : (
                  <span key={index} className="text-lg font-medium italic" title={`Window Cleaning Services in ${location.name}, ${location.region}`}>
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
        <h2>Window Cleaning Services Throughout British Columbia</h2>
        <p>We provide professional window cleaning and pressure washing services throughout British Columbia, with specialized expertise in White Rock, Surrey, Vancouver, Burnaby, and all surrounding areas.</p>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {location.featured ? (
                <Link to={location.url}>
                  Professional Window Cleaning in {location.name}, {location.region || 'BC'} - 
                  {location.services && location.services.join(", ")} Services
                </Link>
              ) : (
                `Window Cleaning Services in ${location.name}, ${location.region || 'BC'}`
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LocationBanner;
