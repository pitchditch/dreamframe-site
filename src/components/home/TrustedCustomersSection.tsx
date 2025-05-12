
import React from 'react';

const TrustedCustomersSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by Local Homeowners</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            See why so many homeowners in White Rock, Surrey, and across Metro Vancouver choose us for all their exterior cleaning needs.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {/* Google Logo with Link */}
          <a 
            href="https://www.google.com/search?q=bc+pressure+washing&oq=bc+pressure+washing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center transition-transform hover:scale-105 group"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" 
              alt="Google Reviews" 
              className="h-12 object-contain"
            />
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">5.0 (50+ reviews)</span>
            </div>
            <span className="mt-1 text-sm text-bc-red group-hover:underline">View Reviews</span>
          </a>
          
          {/* Yelp Logo with Link */}
          <a 
            href="https://www.yelp.com/biz/bc-pressure-washing-white-rock" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center transition-transform hover:scale-105 group"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/2560px-Yelp_Logo.svg.png" 
              alt="Yelp Reviews" 
              className="h-12 object-contain"
            />
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">5.0 (15+ reviews)</span>
            </div>
            <span className="mt-1 text-sm text-bc-red group-hover:underline">View Reviews</span>
          </a>
          
          {/* HomeStars Logo with Link */}
          <a 
            href="https://homestars.com/companies/2938191-bc-pressure-washing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center transition-transform hover:scale-105 group"
          >
            <img 
              src="https://seeklogo.com/images/H/homestars-logo-3EE2CFCE80-seeklogo.com.png" 
              alt="HomeStars Reviews" 
              className="h-12 object-contain"
            />
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">10.0 (20+ reviews)</span>
            </div>
            <span className="mt-1 text-sm text-bc-red group-hover:underline">View Reviews</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustedCustomersSection;
