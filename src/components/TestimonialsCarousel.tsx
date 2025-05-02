import { useEffect, useState, useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TestimonialCard from './TestimonialCard';

interface TestimonialWithProfile {
  id: number;
  quote: string;
  name: string;
  location?: string;
  rating: number;
  profileImage?: string;
  beforeAfterImage?: string;
  service?: "gutter-cleaning" | "window-cleaning" | "pressure-washing" | "roof-cleaning";
}

// New profile images that match gender
const maleProfiles = [
  "/lovable-uploads/a5373f95-44d4-486f-a8f8-e8dbb2cc96f5.png",  // Male 1
  "/lovable-uploads/8c201ea9-6ef3-4cd8-abb3-61a2642caedb.png",  // Male 2
  "/lovable-uploads/b1e317f5-52f0-4b02-b318-f1c3d031da1c.png",  // Male 3
  "/lovable-uploads/fe37717f-5fc0-4f4d-9b7c-943b7d4c734f.png",  // Indian male
];

const femaleProfiles = [
  "/lovable-uploads/a7de1495-427b-4980-b122-2f98d9de4b8c.png",  // Female 1
  "/lovable-uploads/68b26599-033b-41d5-9d74-a05003cfc58b.png",  // Female 2
  "/lovable-uploads/d5ea79b9-1682-46ab-bb09-b99bdc77aa80.png",  // Female 3
  "/lovable-uploads/6e5a36e2-9605-46d4-aaf6-7cb45fe59f86.png",  // Female 4
  "/lovable-uploads/0eb823af-344d-45d9-b223-df94e56e386f.png",  // Female 5
  "/lovable-uploads/a8798a73-d615-4288-8eb7-dfcc1e070d07.png",  // Female 6
  "/lovable-uploads/9c5e6f5f-cc13-408c-af83-ca211626f285.png",  // Female 7
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allTestimonials, setAllTestimonials] = useState<TestimonialWithProfile[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Update testimonials with matched gender profile pictures
  useEffect(() => {
    // Gender-matched names mapping
    const nameGender: {[key: string]: 'male' | 'female'} = {
      // Male names
      "Michael Johnson": "male",
      "David Wilson": "male",
      "David Miller": "male",
      "Robert Anderson": "male",
      "Thomas Clark": "male",
      "James Peterson": "male",
      "Richard Brooks": "male",
      
      // Female names
      "Sarah Thompson": "female",
      "Jennifer Davis": "female",
      "Lisa Martinez": "female",
      "Amanda White": "female",
      "Karen Walker": "female",
      "Stephanie Scott": "female",
      "Michelle Taylor": "female",
      "Jessica Martin": "female",
      "Patricia Chen": "female",
      "Emma Rodriguez": "female",
      "Olivia Robinson": "female",
      "Rebecca Anderson": "female",
      "Tina Clark": "female"
    };
    
    // Generate updated testimonials with appropriate profile pictures
    const updatedTestimonials = testimonials.map((testimonial) => {
      // Male Indian name for David Wilson
      if (testimonial.name === "David Wilson") {
        return {
          ...testimonial,
          name: "Vikram Singh",
          profileImage: maleProfiles[3] // Indian male profile
        };
      }
      
      // Update Robert Anderson to Rebecca Anderson
      if (testimonial.name === "Robert Anderson") {
        return {
          ...testimonial,
          name: "Rebecca Anderson",
          profileImage: femaleProfiles[0]
        };
      }
      
      // Update Thomas Clark to Tina Clark
      if (testimonial.name === "Thomas Clark") {
        return {
          ...testimonial,
          name: "Tina Clark",
          profileImage: femaleProfiles[1]
        };
      }
      
      // Skip adding profile pictures for deleted profiles
      if (
        ["Emily Johnson", "Christopher Lee", "Daniel Lewis", 
        "Peter Harris", "Eric Turner", "Jason Brown"].includes(testimonial.name)
      ) {
        return null;
      }

      // Assign profile pictures based on gender
      const gender = nameGender[testimonial.name];
      if (gender === "male") {
        // Get a random male profile
        const randomIndex = Math.floor(Math.random() * 3); // First 3 are male
        return {
          ...testimonial,
          profileImage: maleProfiles[randomIndex]
        };
      } else if (gender === "female") {
        // Get a random female profile
        const randomIndex = Math.floor(Math.random() * femaleProfiles.length);
        return {
          ...testimonial,
          profileImage: femaleProfiles[randomIndex]
        };
      }

      // Default case (keep name but no profile picture)
      return {
        ...testimonial,
        profileImage: undefined
      };
    }).filter(Boolean) as TestimonialWithProfile[]; // Filter out null values
    
    // Remove any duplicates (by name)
    const uniqueTestimonials = updatedTestimonials.filter(
      (testimonial, index, self) => 
        index === self.findIndex(t => t.name === testimonial.name)
    );
    
    setAllTestimonials(uniqueTestimonials);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (allTestimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allTestimonials.length);
      
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.clientWidth;
        carouselRef.current.scrollTo({
          left: scrollAmount * ((currentIndex + 1) % allTestimonials.length),
          behavior: 'smooth'
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allTestimonials.length, currentIndex]);

  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
        
        <div className="relative max-w-6xl mx-auto mb-12">
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {allTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="min-w-full snap-center px-4"
              >
                <div className="max-w-4xl mx-auto">
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    location={testimonial.location}
                    rating={testimonial.rating}
                    profileImage={testimonial.profileImage}
                    beforeAfterImage={testimonial.beforeAfterImage}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            {allTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  if (carouselRef.current) {
                    const scrollAmount = carouselRef.current.clientWidth;
                    carouselRef.current.scrollTo({
                      left: scrollAmount * index,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild variant="bc-red">
            <Link to="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
