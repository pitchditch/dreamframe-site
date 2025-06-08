
import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TestimonialCardProps {
  quote: string;
  name: string;
  location?: string;
  rating?: number;
  beforeAfterImage?: string;
  profileImage?: string;
}

const TestimonialCard = ({ 
  quote, 
  name, 
  location, 
  rating = 5,
  beforeAfterImage,
  profileImage 
}: TestimonialCardProps) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-bc-red/10 rounded-full z-0"></div>
      
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        <div className="flex flex-col justify-center">
          {/* Quote */}
          <div className="mb-6">
            <svg className="w-12 h-12 text-bc-red" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8v6c0 3.314-2.686 6-6 6H4v2c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6v-8c0-3.314-2.686-6-6-6h-2zm16 0v6c0 3.314-2.686 6-6 6h0v2c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6v-8c0-3.314-2.686-6-6-6h-2z" />
            </svg>
          </div>
          <p className="text-gray-700 italic mb-8 text-xl leading-relaxed">{quote}</p>
          
          {/* Profile */}
          <div className="flex items-center">
            {profileImage ? (
              <div className="mr-6">
                <Avatar className="h-20 w-20 border-2 border-gray-200">
                  <AvatarImage src={profileImage} alt={`${name}'s portrait`} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="mr-6">
                <Avatar className="h-20 w-20 bg-bc-red/20 text-bc-red border-2 border-gray-200">
                  <AvatarFallback className="text-xl">{name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-xl">{name}</h4>
              {location && <p className="text-gray-500 text-lg">{location}</p>}
              
              {/* Rating stars */}
              <div className="flex mt-2">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <Star key={i + rating} className="w-5 h-5 text-gray-300" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Before/After Image */}
        {beforeAfterImage && (
          <div className="h-80 md:h-full rounded-lg overflow-hidden">
            <img 
              src={beforeAfterImage} 
              alt="Before and after cleaning" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
