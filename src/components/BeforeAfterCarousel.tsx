
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

interface BeforeAfterItem {
  id: number;
  beforeImage: string;
  afterImage: string;
  customerName: string;
  location: string;
  testimonialId: number;
}

// Example before/after images with customer testimonials
const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: 1,
    beforeImage: "/lovable-uploads/ff4fb258-bc33-4114-83e8-05d0d9f02770.png",
    afterImage: "/lovable-uploads/0e9565e9-5c55-469b-9373-28abcec11dcb.png",
    customerName: "Emily Johnson",
    location: "White Rock, BC",
    testimonialId: 4,
  },
  {
    id: 2,
    beforeImage: "/lovable-uploads/5dc10f3c-9463-4153-94b3-4b99d908580a.png",
    afterImage: "/lovable-uploads/97ab1ee0-b864-4d9e-b37b-9a526229a18f.png",
    customerName: "Lisa Martinez",
    location: "Richmond, BC",
    testimonialId: 8,
  },
  {
    id: 3,
    beforeImage: "/lovable-uploads/760a47b6-0ed1-4cac-bcb0-b915374332a7.png",
    afterImage: "/lovable-uploads/35c992fa-e658-4504-9244-560758af2df7.png",
    customerName: "Karen Walker",
    location: "New Westminster, BC",
    testimonialId: 12,
  },
  {
    id: 4,
    beforeImage: "/lovable-uploads/302cbdcc-ad2e-496b-bb73-502eb77f353a.png",
    afterImage: "/lovable-uploads/52002e8d-2bde-48cb-b8c6-c80c92e54a10.png",
    customerName: "Michelle Taylor",
    location: "White Rock, BC",
    testimonialId: 16,
  },
  {
    id: 5,
    beforeImage: "/lovable-uploads/8456f0a6-f534-4cc6-96ec-3c56bec589c2.png",
    afterImage: "/lovable-uploads/5b73077f-b551-44dc-9605-1b642b923e9c.png",
    customerName: "Jessica Martin",
    location: "Richmond, BC",
    testimonialId: 20,
  }
];

const BeforeAfterCarousel = () => {
  const [isViewingAfter, setIsViewingAfter] = useState<boolean[]>(beforeAfterItems.map(() => false));
  const [currentAutoplayIndex, setCurrentAutoplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Handle automatic rotation through slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentAutoplayIndex((prevIndex) => (prevIndex + 1) % beforeAfterItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

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
      <h3 className="text-2xl font-bold mb-6 text-center">Before & After Transformations</h3>
      
      <div 
        className="relative" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel className="w-full">
          <CarouselContent>
            {beforeAfterItems.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="p-1">
                  <div className="relative rounded-lg overflow-hidden cursor-pointer shadow-lg" 
                    onClick={() => toggleBeforeAfter(index)}
                  >
                    <img 
                      src={isViewingAfter[index] ? item.afterImage : item.beforeImage} 
                      alt={isViewingAfter[index] ? "After cleaning" : "Before cleaning"} 
                      className="w-full aspect-video object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="font-bold">{item.customerName}</p>
                          <p className="text-sm">{item.location}</p>
                        </div>
                        <Link 
                          to="/testimonials" 
                          className="text-xs bg-bc-red px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Review
                        </Link>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {isViewingAfter[index] ? "AFTER" : "BEFORE"}
                    </div>
                    
                    <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      Tap to see {isViewingAfter[index] ? "before" : "after"}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>
        
        <div className="flex justify-center mt-4 gap-2">
          {beforeAfterItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentAutoplayIndex === index ? "bg-bc-red w-4" : "bg-gray-300"
              }`}
              onClick={() => {
                setCurrentAutoplayIndex(index);
                setIsPaused(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterCarousel;
