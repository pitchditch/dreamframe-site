
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
  beforeAfterImage?: string;
  profileImage?: string;
  gender?: 'male' | 'female';
}

const TestimonialCard = ({ 
  quote, 
  name, 
  location, 
  rating = 5, 
  beforeAfterImage,
  profileImage,
  gender 
}: TestimonialCardProps) => {
  // Get first letter of name for avatar fallback
  const initials = name?.charAt(0) || "?";

  return (
    <div className="testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all h-full flex flex-col">
      {beforeAfterImage && (
        <div className="mb-6 overflow-hidden rounded-md relative w-full aspect-[4/3]">
          <img 
            src={beforeAfterImage} 
            alt="Before and after transformation" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-bc-red text-white text-xs py-1 px-2 rounded">
            Before/After
          </div>
        </div>
      )}
      <div className="flex mb-4">
        <div className="text-4xl font-serif text-red-200 mr-2">❝</div>
      </div>
      <p className="italic text-gray-600 mb-6 flex-grow">{quote}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-gray-200">
            {profileImage ? (
              <AvatarImage src={profileImage} alt={name} />
            ) : (
              <AvatarFallback className="bg-bc-red text-white">{initials}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
