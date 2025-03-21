import { useState } from 'react';
import Layout from '@/components/Layout';
import TestimonialCard from '@/components/TestimonialCard';
import ReviewOverlay from '@/components/ReviewOverlay';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropletIcon, Home, Landmark, Wind, ExternalLink } from 'lucide-react';

// Define the testimonial data structure
interface Testimonial {
  id: number;
  service: 'gutter-cleaning' | 'window-cleaning' | 'pressure-washing' | 'roof-cleaning';
  rating: number;
  quote: string;
  name: string;
  location: string;
  beforeAfterImage?: string;
}

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isReviewOverlayOpen, setIsReviewOverlayOpen] = useState(false);

  const handleReviewClick = () => {
    setIsReviewOverlayOpen(true);
  };

  const handleReviewClose = () => {
    setIsReviewOverlayOpen(false);
  };

  const handleReviewContinue = () => {
    // Close the overlay
    setIsReviewOverlayOpen(false);
    
    // Open Google review page in a new tab
    window.open('https://g.page/r/CW3IUt-QOQc1EBM/review', '_blank');
  };
  
  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      service: 'pressure-washing',
      rating: 5,
      quote: "I was amazed by how clean my house looks now! The pressure washing service was incredible. The team was professional and thorough, and the results speak for themselves.",
      name: "Michael Johnson",
      location: "Surrey, BC",
      beforeAfterImage: "/lovable-uploads/ef45fd36-a81d-41a3-8184-d3a91694f5ca.png"
    },
    {
      id: 2,
      service: 'pressure-washing',
      rating: 5,
      quote: "Outstanding pressure washing service! My siding was covered in dirt and grime, but now it looks brand new. Highly recommend their services!",
      name: "Sarah Thompson",
      location: "Langley, BC",
      beforeAfterImage: "/lovable-uploads/148003bb-352d-4ff8-af0b-2637eabaf9eb.png"
    },
    {
      id: 3,
      service: 'pressure-washing',
      rating: 5,
      quote: "The transformation of my house exterior is incredible! The pressure washing team did an amazing job. Very satisfied with the results.",
      name: "David Wilson",
      location: "Richmond, BC",
      beforeAfterImage: "/lovable-uploads/6485c6c5-3c65-46de-b9f2-c054c708124b.png"
    },
    {
      id: 4,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I didn't realize how dirty my roof had gotten until these guys came out! They were quick, careful, and did a great job removing moss and debris. My roof looks so much better now. I'm really happy with the results.",
      name: "Emily Johnson",
      location: "White Rock, BC"
    },
    {
      id: 5,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "Had my gutters cleaned today, and I couldn't be happier with the service. They showed up on time, cleaned everything thoroughly, and even pointed out some things I should keep an eye on. Very professional!",
      name: "David Miller",
      location: "Coquitlam, BC",
      beforeAfterImage: "/lovable-uploads/a5671627-3791-4cbe-8df1-e571b18508d5.png"
    },
    {
      id: 6,
      service: 'window-cleaning',
      rating: 5,
      quote: "I'm so happy with how my windows turned out! They were a little streaky before, but now they're spotless. The crew was really friendly, and they took care not to make a mess inside. Will definitely call again!",
      name: "Jennifer Davis",
      location: "Burnaby, BC"
    },
    {
      id: 7,
      service: 'pressure-washing',
      rating: 5,
      quote: "I thought my deck was beyond saving, but these guys proved me wrong. After pressure washing, it looks amazing—like new! They worked quickly, but didn't rush, and made sure to get every corner. So glad I found them!",
      name: "Robert Anderson",
      location: "North Vancouver, BC"
    },
    {
      id: 8,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I was worried about the condition of my roof, and they came through! The team cleaned it up, removed moss, and left it looking like new. They were professional, polite, and got the job done right.",
      name: "Lisa Martinez",
      location: "Richmond, BC"
    },
    {
      id: 9,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "Great service! My gutters were overflowing, and these guys came in and cleaned them out quickly. They also took care of the mess and left everything spotless. Highly recommend!",
      name: "Thomas Clark",
      location: "Delta, BC",
      beforeAfterImage: "/lovable-uploads/80ecf163-0140-4688-86f4-213a4bfaa5bd.png"
    },
    {
      id: 10,
      service: 'window-cleaning',
      rating: 5,
      quote: "Wow, what a difference! My windows have never been this clean. They showed up on time, were super polite, and the job was done right. My whole house looks brighter. I'll definitely hire them again.",
      name: "Amanda White",
      location: "Maple Ridge, BC"
    },
    {
      id: 11,
      service: 'pressure-washing',
      rating: 5,
      quote: "These guys pressure washed my house, and it looks amazing! The exterior was covered in dirt and mold, and now it's sparkling clean. They were on time, respectful, and got the job done quickly. So happy with the results.",
      name: "Daniel Lewis",
      location: "Port Coquitlam, BC"
    },
    {
      id: 12,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I had a lot of moss buildup on my roof, and these professionals came out and cleaned it all off. They were careful with the process and made sure everything was spotless. My roof looks so much better now!",
      name: "Karen Walker",
      location: "New Westminster, BC"
    },
    {
      id: 13,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "I'm so relieved to have my gutters cleaned before the rain hits! The team showed up right on time, cleaned everything efficiently, and didn't leave a mess. Very happy with the service!",
      name: "Jason Brown",
      location: "Langley, BC",
      beforeAfterImage: "/lovable-uploads/8e7a598a-83f9-4c2b-bfaa-21091b96ffcf.png"
    },
    {
      id: 14,
      service: 'window-cleaning',
      rating: 5,
      quote: "I've had a few window cleaning services before, but none were as thorough as this one. They really took their time and cleaned every corner. I can see out of my windows perfectly now, and my house looks amazing!",
      name: "Stephanie Scott",
      location: "Surrey, BC"
    },
    {
      id: 15,
      service: 'pressure-washing',
      rating: 5,
      quote: "I'm beyond impressed with the pressure washing on my driveway and sidewalks. It was covered in dirt and stains, but now it looks brand new. The team was super friendly, and the results were definitely worth it.",
      name: "Eric Turner",
      location: "Abbotsford, BC"
    },
    {
      id: 16,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I had no idea my roof was in such bad shape until these guys cleaned it! They did an excellent job removing moss and debris. My roof looks so much better, and I feel much more confident about it now.",
      name: "Michelle Taylor",
      location: "White Rock, BC"
    },
    {
      id: 17,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "These guys were awesome. I called them when I noticed my gutters were clogged, and they came out right away. They did a great job cleaning everything and even gave me tips on keeping them clear. Will definitely use them again!",
      name: "Peter Harris",
      location: "Coquitlam, BC",
      beforeAfterImage: "/lovable-uploads/aa926c91-97fb-4f9f-bab5-77cb342a2b38.png"
    },
    {
      id: 18,
      service: 'window-cleaning',
      rating: 5,
      quote: "My windows look incredible! They were very dirty and streaky before, but now they're spotless. The team was quick, polite, and made sure to take care around my furniture. I highly recommend this service!",
      name: "Olivia Robinson",
      location: "Burnaby, BC"
    },
    {
      id: 19,
      service: 'pressure-washing',
      rating: 5,
      quote: "I had my fence and patio pressure washed, and the difference is night and day. They removed years of dirt and stains in no time. The crew was polite and efficient. I'll be calling them again for future cleanings.",
      name: "Christopher Lee",
      location: "North Vancouver, BC"
    },
    {
      id: 20,
      service: 'roof-cleaning',
      rating: 5,
      quote: "My roof looks so much better now after they cleaned it! They took their time, worked carefully, and made sure everything was perfect. Super happy with the results and will definitely hire them again.",
      name: "Jessica Martin",
      location: "Richmond, BC"
    },
    {
      id: 21,
      service: 'pressure-washing',
      rating: 5,
      quote: "My vinyl siding was covered in green mold and dirt. After their pressure washing service, it looks like a completely different house! Neighbors have been asking who did the work. Excellent service!",
      name: "Richard Brooks",
      location: "Surrey, BC",
      beforeAfterImage: "/lovable-uploads/43002110-e9f7-4e22-826e-a90e5dc6687e.png"
    },
    {
      id: 22,
      service: 'pressure-washing',
      rating: 5,
      quote: "The green mildew on my house siding was embarrassing. Their team came in and completely transformed it! Amazing how much brighter and cleaner the whole house looks now. Worth every penny.",
      name: "Patricia Chen",
      location: "Langley, BC",
      beforeAfterImage: "/lovable-uploads/55261385-ad80-4322-9551-dbc3392a881c.png"
    },
    {
      id: 23,
      service: 'pressure-washing',
      rating: 5,
      quote: "I couldn't believe the difference in my house siding after their pressure washing service. The before and after is incredible! It looks like we painted the house, but it's just clean now. Highly recommended!",
      name: "James Peterson",
      location: "Surrey, BC",
      beforeAfterImage: "/lovable-uploads/0ed0aa87-882b-4618-8a15-18d4ed7e4838.png"
    },
    {
      id: 24,
      service: 'pressure-washing',
      rating: 5,
      quote: "My house had years of dirt and mildew buildup on the siding. These guys did an amazing job restoring it to like-new condition. Their attention to detail around windows and fixtures was impressive!",
      name: "Emma Rodriguez",
      location: "Langley, BC",
      beforeAfterImage: "/lovable-uploads/3dd77762-89a1-4273-ae3e-1c6fbc9894aa.png"
    },
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.service === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-black text-white mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/lovable-uploads/fa3b438e-d980-439e-9d0f-e829e376fcf7.png')` }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Customers Say</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Real feedback from our valued clients across the Greater Vancouver area.
          </p>
          
          <Button 
            onClick={handleReviewClick}
            className="mt-8 bg-white text-gray-800 hover:bg-gray-100 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#4285F4" className="mr-1">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Leave a Google Review <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-12 mb-16">
        <div className="mb-12 text-center">
          <h2 className="section-title">Customer Testimonials</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our customers have to say about our services.
          </p>

          {/* Filter Tabs */}
          <Tabs 
            defaultValue="all"
            className="max-w-3xl mx-auto mt-8"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-transparent">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                All Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="gutter-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Wind className="w-4 h-4 mr-2" />
                Gutter Cleaning
              </TabsTrigger>
              <TabsTrigger 
                value="window-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <DropletIcon className="w-4 h-4 mr-2" />
                Window Cleaning
              </TabsTrigger>
              <TabsTrigger 
                value="pressure-washing" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Pressure Washing
              </TabsTrigger>
              <TabsTrigger 
                value="roof-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Landmark className="w-4 h-4 mr-2" />
                Roof Cleaning
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              rating={testimonial.rating}
              beforeAfterImage={testimonial.beforeAfterImage}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section bg-bc-black mb-16">
        <div 
          className="relative bg-cover bg-center py-16"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/1a1f8b2e-bcc7-4d88-ae7c-ed4024c70ae4.png')`,
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Experience Our Quality Service?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our satisfied customers and see the difference our professional services can make for your home.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild className="bg-bc-red hover:bg-red-700 text-white px-6 py-6 h-auto text-lg">
                <a href="/contact">Get a Free Quote</a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-6 py-6 h-auto text-lg">
                <a href="/services">Explore Our Services</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ReviewOverlay 
        isOpen={isReviewOverlayOpen}
        onClose={handleReviewClose}
        onContinue={handleReviewContinue}
      />
    </Layout>
  );
};

export default Testimonials;
