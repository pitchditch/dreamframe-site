
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PortfolioItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  customerName: string;
  location: string;
  rating: number;
  review: string;
  service: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    beforeImage: "/lovable-uploads/5ce68d1d-9eea-40e1-a0f3-601e03026a58.png",
    afterImage: "/lovable-uploads/5ce68d1d-9eea-40e1-a0f3-601e03026a58.png",
    customerName: "John Peterson",
    location: "Surrey, BC",
    rating: 5,
    review: "They did an amazing job cleaning our house siding. It looks like new again!",
    service: "Pressure Washing"
  },
  {
    id: 2,
    beforeImage: "/lovable-uploads/024da61b-8e9f-4726-ba3b-be8c1009eed8.png",
    afterImage: "/lovable-uploads/024da61b-8e9f-4726-ba3b-be8c1009eed8.png",
    customerName: "Sarah Williams",
    location: "Richmond, BC",
    rating: 5,
    review: "Our roof looks brand new after their cleaning. Very professional service!",
    service: "Roof Cleaning"
  },
  {
    id: 3,
    beforeImage: "/lovable-uploads/15bdc989-e291-46cc-81a3-e247a2586a8c.png",
    afterImage: "/lovable-uploads/15bdc989-e291-46cc-81a3-e247a2586a8c.png",
    customerName: "Michael Thompson",
    location: "Langley, BC",
    rating: 5,
    review: "The difference in our roof before and after cleaning is night and day. Highly recommend!",
    service: "Roof Cleaning"
  },
  {
    id: 4,
    beforeImage: "/lovable-uploads/411541f2-7925-4d0d-bc86-bdee19a6f015.png",
    afterImage: "/lovable-uploads/411541f2-7925-4d0d-bc86-bdee19a6f015.png",
    customerName: "Jennifer Davis",
    location: "White Rock, BC",
    rating: 5,
    review: "Our roof had so much moss and algae. Now it looks fantastic! Great service.",
    service: "Roof Cleaning"
  },
  {
    id: 5,
    beforeImage: "/lovable-uploads/2b198c70-ffe7-4b7c-ad60-2c954e912027.png",
    afterImage: "/lovable-uploads/2b198c70-ffe7-4b7c-ad60-2c954e912027.png",
    customerName: "Robert Wilson",
    location: "Surrey, BC",
    rating: 5,
    review: "The black stains on our roof are completely gone. Amazing transformation!",
    service: "Roof Cleaning"
  }
];

const PortfolioGallery = () => {
  const [isViewingAfter, setIsViewingAfter] = useState<boolean[]>(portfolioItems.map(() => true));
  const [isPaused, setIsPaused] = useState(false);

  const toggleBeforeAfter = (index: number) => {
    setIsViewingAfter(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mt-8">
      <Carousel className="w-full">
        <CarouselContent>
          {portfolioItems.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className="p-1 md:p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Section */}
                  <div className="relative rounded-lg overflow-hidden cursor-pointer shadow-lg" 
                    onClick={() => toggleBeforeAfter(index)}
                  >
                    <img 
                      src={isViewingAfter[index] ? item.afterImage : item.beforeImage} 
                      alt={isViewingAfter[index] ? "After cleaning" : "Before cleaning"} 
                      className="w-full aspect-video object-cover"
                    />
                    
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {isViewingAfter[index] ? "AFTER" : "BEFORE"}
                    </div>
                    
                    <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      Tap to see {isViewingAfter[index] ? "before" : "after"}
                    </div>
                  </div>
                  
                  {/* Review Section */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{item.customerName.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{item.customerName}</h4>
                          <p className="text-sm text-gray-500">{item.location}</p>
                        </div>
                      </div>
                      
                      {/* Star Rating */}
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{item.review}</p>
                      <p className="text-sm text-gray-500 mb-4">Service: <span className="font-medium">{item.service}</span></p>
                    </div>
                    
                    <Link 
                      to="/testimonials" 
                      className="bg-bc-red text-white px-4 py-2 rounded self-end flex items-center hover:bg-red-700 transition-colors"
                    >
                      Read More Reviews <ExternalLink className="ml-2" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
        <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
      </Carousel>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === 0 ? "bg-bc-red w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioGallery;
