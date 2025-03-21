
import { Star, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
  avatar?: string;
  beforeAfterImage?: string;
}

const TestimonialCard = ({ quote, name, location, rating = 5, avatar, beforeAfterImage }: TestimonialCardProps) => {
  return (
    <div className="testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100">
      {/* Google-like header */}
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
              <span className="text-gray-500 font-medium">{name.charAt(0)}</span>
            </div>
          )}
          <div>
            <h4 className="font-medium text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
      </div>
      
      {/* Star rating */}
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      
      {/* Before/After image if provided */}
      {beforeAfterImage && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img 
            src={beforeAfterImage} 
            alt="Before and after transformation" 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      {/* Review text */}
      <p className="text-gray-600 mb-4 text-sm">{quote}</p>
      
      {/* Google icon/attribution */}
      <div className="flex justify-end items-center text-xs text-gray-400">
        <span>Posted on</span>
        <div className="flex items-center ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#4285F4">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span className="ml-1">Google Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
