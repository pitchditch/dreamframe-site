
import { Helmet } from "react-helmet-async";

interface SEOContentProps {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
}

const SEOContent = ({ faqItems }: SEOContentProps) => {
  // City-specific SEO data
  const cityKeywords = [
    "White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Richmond", 
    "Vancouver", "Burnaby", "Coquitlam", "Port Moody", "New Westminster",
    "North Vancouver", "West Vancouver", "Tsawwassen", "Ladner"
  ];

  const serviceKeywords = [
    "pressure washing", "window cleaning", "house washing", "roof cleaning", 
    "gutter cleaning", "exterior cleaning", "power washing", "soft washing"
  ];

  // Generate comprehensive keywords for SEO
  const generateSEOKeywords = () => {
    const combinations = [];
    cityKeywords.forEach(city => {
      serviceKeywords.forEach(service => {
        combinations.push(`${service} ${city}`);
        combinations.push(`${city} ${service}`);
      });
    });
    return combinations.join(', ');
  };

  const metaKeywords = generateSEOKeywords();

  return (
    <Helmet>
      {/* Enhanced city-specific keywords */}
      <meta 
        name="keywords" 
        content={metaKeywords}
      />
      
      {/* Additional location-specific meta tags */}
      <meta name="geo.region" content="CA-BC" />
      <meta name="geo.placename" content="White Rock, Surrey, Metro Vancouver" />
      <meta name="ICBM" content="49.0158, -122.8058" />
      
      {/* Enhanced LocalBusiness schema with comprehensive city coverage */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "BC Pressure Washing",
          "description": "Professional exterior cleaning services including pressure washing, window cleaning, house washing, roof & gutter cleaning serving White Rock, Surrey, Langley, Delta, Richmond, Vancouver, Burnaby, Coquitlam and all Metro Vancouver communities.",
          "url": "https://bcpressurewashing.ca",
          "telephone": "(778) 808-7620",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1-15501 Marine Drive",
            "addressLocality": "White Rock",
            "addressRegion": "BC",
            "postalCode": "V4B 1C9",
            "addressCountry": "CA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "49.0158",
            "longitude": "-122.8058"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "White Rock",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City", 
              "name": "Surrey",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "South Surrey", 
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Langley",
              "addressRegion": "BC", 
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Delta",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Richmond",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Vancouver",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Burnaby",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Coquitlam",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            {
              "@type": "City",
              "name": "Port Moody",
              "addressRegion": "BC",
              "addressCountry": "CA"
            }
          ],
          "image": [
            "https://bcpressurewashing.ca/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png",
            "https://bcpressurewashing.ca/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png"
          ],
          "serviceType": [
            "Pressure Washing White Rock",
            "Window Cleaning Surrey", 
            "House Washing Langley",
            "Roof Cleaning Delta",
            "Gutter Cleaning Richmond",
            "Exterior Cleaning Vancouver"
          ],
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "100+"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Exterior Cleaning Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pressure Washing",
                  "description": "Professional pressure washing for driveways, decks, and exterior surfaces"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Window Cleaning",
                  "description": "Interior and exterior window cleaning for residential and commercial properties"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service", 
                  "name": "House Washing",
                  "description": "Soft washing and pressure washing for home exteriors"
                }
              }
            ]
          }
        })}} 
      />

      {/* FAQ Schema for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}}
      />
    </Helmet>
  );
};

export default SEOContent;
