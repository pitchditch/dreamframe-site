
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';

interface RoofBeforeAfterItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  customerName: string;
  location: string;
  rating: number;
  review: string;
}

const roofBeforeAfterItems: RoofBeforeAfterItem[] = [
  {
    id: 1,
    beforeImage: "/lovable-uploads/f61a788b-f650-4bf5-9624-815645b80594.png",
    afterImage: "/lovable-uploads/f61a788b-f650-4bf5-9624-815645b80594.png",
    customerName: "Emily Johnson",
    location: "White Rock, BC",
    rating: 5,
    review: "I didn't realize how dirty my roof had gotten until these guys came out! They were quick, careful, and did a great job removing all the moss and stains. My roof looks brand new!"
  },
  {
    id: 2,
    beforeImage: "/lovable-uploads/50c4275b-52cd-4dfc-b2a9-9f3aa7f0a1b5.png",
    afterImage: "/lovable-uploads/50c4275b-52cd-4dfc-b2a9-9f3aa7f0a1b5.png",
    customerName: "David Wilson",
    location: "Surrey, BC",
    rating: 5,
    review: "The transformation of my roof is amazing! It had so many dark streaks and moss patches before. Their team worked efficiently and now it looks fantastic. Highly recommend!"
  },
  {
    id: 3,
    beforeImage: "/lovable-uploads/617a7b77-f103-468e-ab95-2fbfa2477757.png",
    afterImage: "/lovable-uploads/617a7b77-f103-468e-ab95-2fbfa2477757.png",
    customerName: "Sarah Thompson",
    location: "Richmond, BC",
    rating: 5,
    review: "Our roof had years of dirt and moss buildup. The cleaning service was exceptional - they took their time and did a thorough job. The difference is night and day!"
  },
  {
    id: 4,
    beforeImage: "/lovable-uploads/291d3d9f-36a6-4d6f-80be-4393ce05d26f.png",
    afterImage: "/lovable-uploads/291d3d9f-36a6-4d6f-80be-4393ce05d26f.png",
    customerName: "Michael Brown",
    location: "Langley, BC",
    rating: 5,
    review: "The cleaning team was professional and efficient. They explained the entire process and took care of my roof. Very impressed with the before and after results!"
  },
  {
    id: 5,
    beforeImage: "/lovable-uploads/7db2c88e-e8ca-4586-9814-0a270653125e.png",
    afterImage: "/lovable-uploads/7db2c88e-e8ca-4586-9814-0a270653125e.png",
    customerName: "Jennifer Davis",
    location: "Burnaby, BC",
    rating: 5,
    review: "My roof had gotten so dirty and discolored over the years. The team did an amazing job cleaning it - looks like we installed a new roof! Worth every penny."
  },
  {
    id: 6,
    beforeImage: "/lovable-uploads/70889d45-c9f2-4eeb-a2a2-25c84ce16194.png",
    afterImage: "/lovable-uploads/70889d45-c9f2-4eeb-a2a2-25c84ce16194.png",
    customerName: "Robert Anderson",
    location: "Coquitlam, BC",
    rating: 5,
    review: "The difference in our tile roof before and after cleaning is incredible! All the moss and accumulated grime is gone, and the natural color is restored. Fantastic job!"
  }
];

const RoofCleaningGallery = () => {
  const [isViewingAfter, setIsViewingAfter] = useState<boolean[]>(roofBeforeAfterItems.map(() => true));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [api, setApi] = useState<any>(null);

  // Handle automatic rotation through slides
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  const toggleBeforeAfter = (index: number) => {
    setIsViewingAfter(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    setIsPaused(true);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="mt-16 mb-12">
      <h3 className="text-2xl font-bold mb-6 text-center">Our Roof Cleaning Transformations</h3>
      
      <div 
        className="relative" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel 
          className="w-full"
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {roofBeforeAfterItems.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="p-1 md:p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Section */}
                    <div className="relative rounded-lg overflow-hidden cursor-pointer shadow-lg" 
                      onClick={() => toggleBeforeAfter(index)}
                    >
                      <img 
                        src={isViewingAfter[index] ? item.afterImage : item.beforeImage} 
                        alt={isViewingAfter[index] ? "After roof cleaning" : "Before roof cleaning"} 
                        className="w-full aspect-video object-cover"
                      />
                      
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {isViewingAfter[index] ? "AFTER" : "BEFORE"}
                      </div>
                      
                      <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        Tap to see {isViewingAfter[index] ? "before" : "after"}
                      </div>
                    </div>
                    
                    {/* Review Section - Google-like styling */}
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
                        <p className="text-sm text-gray-500 mb-4">Service: <span className="font-medium">Roof Cleaning</span></p>
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
          {roofBeforeAfterItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-bc-red w-4" : "bg-gray-300"
              }`}
              onClick={() => {
                if (api) {
                  api.scrollTo(index);
                  setCurrentSlide(index);
                  setIsPaused(true);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoofCleaningGallery;
