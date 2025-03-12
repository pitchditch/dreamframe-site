
import { Star } from 'lucide-react';

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
    <div className="testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
      {beforeAfterImage && (
        <div className="mb-6 overflow-hidden rounded-md">
          <img 
            src={beforeAfterImage} 
            alt="Before and after gutter cleaning" 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      <div className="flex mb-4">
        <div className="text-4xl font-serif text-red-200 mr-2">❝</div>
      </div>
      <p className="italic text-gray-600 mb-6">{quote}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
              <span className="text-gray-500">{name.charAt(0)}</span>
            </div>
          )}
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
