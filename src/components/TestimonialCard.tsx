
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
  beforeAfterImage?: string;
  className?: string;
}

const TestimonialCard = ({ quote, name, location, rating = 5, beforeAfterImage, className }: TestimonialCardProps) => {
  return (
    <div className={cn("testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all h-full flex flex-col", className)}>
      {beforeAfterImage && (
        <div className="mb-6 relative w-full">
          <img 
            src={beforeAfterImage} 
            alt="Before and after transformation" 
            className="w-full h-auto max-h-[400px] object-contain rounded-md"
          />
        </div>
      )}
      <div className="flex mb-4">
        <div className="text-4xl font-serif text-red-200 mr-2">❝</div>
      </div>
      <p className="italic text-gray-600 mb-6 flex-grow text-lg">{quote}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
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
