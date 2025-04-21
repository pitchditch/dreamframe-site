
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
  beforeAfterImage?: string;
  badge?: boolean;
}

const DEFAULT_IMG = "/lovable-uploads/fb14922e-1128-4357-a370-288f9e7ce777.png";
const BADGE_IMG = "/lovable-uploads/0dc60043-05c1-4bfe-9891-c766cdec0bca.png";

const TestimonialCard = ({
  quote,
  name,
  location,
  rating = 5,
  beforeAfterImage,
  badge = false,
}: TestimonialCardProps) => {
  return (
    <div className="testimonial-card bg-white p-6 rounded-lg shadow-md relative min-h-[370px] flex flex-col">
      <div className="mb-6 overflow-hidden rounded-md relative">
        <img 
          src={beforeAfterImage || DEFAULT_IMG} 
          alt="Before and after transformation" 
          className="w-full h-40 object-cover object-top"
        />
        {badge && (
          <img src={BADGE_IMG} alt="Badge" className="absolute top-2 right-2 w-10 h-10 rounded-full border-2 border-bc-red shadow" />
        )}
      </div>
      <div className="flex mb-4">
        <div className="text-4xl font-serif text-red-200 mr-2">❝</div>
      </div>
      <p className="italic text-gray-600 mb-4 flex-1">{quote}</p>
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
