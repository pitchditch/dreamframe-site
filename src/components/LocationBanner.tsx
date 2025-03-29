
import { Link } from 'react-router-dom';

// Enhanced with county/region information and service keywords for better SEO
const locations = [
  { name: "White Rock", url: "/locations/white-rock", featured: true, services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Surrey", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Vancouver", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Burnaby", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Richmond", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Delta", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Langley", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Coquitlam", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Port Coquitlam", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "New Westminster", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "West Vancouver", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "North Vancouver", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Abbotsford", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Maple Ridge", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Mission", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Chilliwack", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Pitt Meadows", region: "BC", services: ["Window Cleaning", "Pressure Washing"] },
  { name: "Port Moody", region: "BC", services: ["Window Cleaning", "Pressure Washing"] }
];

const LocationBanner = () => {
  // Create duplicate array for seamless scrolling
  const duplicatedLocations = [...locations, ...locations];
  
  return (
    <section className="bg-bc-red py-3 text-white overflow-hidden" aria-label="Service Areas">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="text-lg font-medium mr-4 whitespace-nowrap">
            Window Cleaning & Pressure Washing in:
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="flex whitespace-nowrap animate-[slide_30s_linear_infinite] space-x-8">
              {duplicatedLocations.map((location, index) => (
                location.featured ? (
                  <Link 
                    key={index}
                    to={location.url}
                    className="text-lg font-bold italic underline hover:text-white/80 transition-colors"
                    title={`${location.services?.join(" & ")} Services in ${location.name}, BC`}
                  >
                    {location.name}
                  </Link>
                ) : (
                  <span 
                    key={index} 
                    className="text-lg font-medium italic" 
                    title={`${location.services?.join(" & ")} Services in ${location.name}, ${location.region}`}
                  >
                    {location.name}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced SEO-optimized content for search engines */}
      <div className="sr-only">
        <h2>Professional Pressure Washing & Window Cleaning Services Throughout British Columbia</h2>
        <p>We provide expert pressure washing, window cleaning, roof cleaning, and gutter cleaning services throughout British Columbia, with specialized expertise in White Rock, Surrey, Vancouver, Burnaby, and all surrounding areas.</p>
        <ul itemScope itemType="http://schema.org/ItemList">
          {locations.map((location, index) => (
            <li key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <meta itemProp="position" content={`${index + 1}`} />
              {location.featured ? (
                <Link to={location.url} itemProp="url">
                  <span itemProp="name">
                    Professional {location.services && location.services.join(" & ")} in {location.name}, {location.region || 'BC'}
                  </span>
                </Link>
              ) : (
                <span itemProp="name">
                  {location.services && location.services.join(" & ")} Services in {location.name}, {location.region || 'BC'}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LocationBanner;
