import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Home, DropletIcon, Building } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';

// Define service data with SEO-friendly details
const services = [
  {
    id: 'window-cleaning',
    title: 'Window Cleaning – Streak-Free Shine for Your Home & Business',
    icon: <Droplets size={24} />,
    description: `Our expert window cleaning services ensure crystal-clear, streak-free windows for residential and commercial properties. Using professional techniques, we remove dirt, grime, and hard water stains, improving your view and enhancing your home's curb appeal. Whether it's interior or exterior window cleaning, we guarantee a spotless finish.`,
    location: 'White Rock',
    altLocations: ['South Surrey', 'Surrey', 'Langley', 'Vancouver', 'Abbotsford', 'Mission'],
    includes: [
      'Interior & exterior window washing',
      'Screen & frame cleaning',
      'Hard water stain removal',
      'High-rise & storefront window cleaning'
    ],
    cta: 'Get your windows sparkling today!',
    link: '/services/window-cleaning',
    squareImage: '/lovable-uploads/778caebd-6aa4-4699-9475-6090b08b7d12.png',
    fullWidthImage: '/lovable-uploads/778caebd-6aa4-4699-9475-6090b08b7d12.png',
    keywords: 'Window cleaning, streak-free windows, professional window washing, exterior glass cleaning, house window maintenance'
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning – Keep Your Gutters Flowing Freely',
    icon: <Home size={24} />,
    description: `Clogged gutters can lead to water damage, roof leaks, and foundation issues. Our professional gutter cleaning services ensure that your gutters are free of debris and functioning properly, directing water away from your home. We also inspect your gutters for any damage.`,
    location: 'Surrey',
    altLocations: ['White Rock', 'South Surrey', 'Langley', 'Vancouver', 'Burnaby', 'Delta'],
    includes: [
      'Removal of leaves, dirt & debris',
      'Downspout flushing',
      'Gutter whitening & brightening',
      'Preventative maintenance'
    ],
    cta: 'Book your gutter cleaning service now!',
    link: '/services/gutter-cleaning',
    squareImage: '/lovable-uploads/ca44edd3-e620-4298-96b2-32f6f8332cae.png',
    fullWidthImage: '/lovable-uploads/fb88ad63-4e80-4234-9ba4-f648453c2655.png',
    keywords: 'Gutter cleaning, rain gutter maintenance, clogged gutters, downspout cleaning, professional gutter service'
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing – Restore the Beauty of Your Property',
    icon: <DropletIcon size={24} />,
    description: `Dirt, grime, and mold can make your home's exterior look dull and worn. Our pressure washing services bring back the original beauty of your surfaces, whether it's a driveway, patio, deck, or siding. We use high-pressure and soft-wash techniques to remove years of buildup without causing damage.`,
    location: 'South Surrey',
    altLocations: ['White Rock', 'Langley', 'Surrey', 'Vancouver', 'North Vancouver', 'Maple Ridge'],
    includes: [
      'House exterior washing',
      'Driveway & sidewalk cleaning',
      'Deck & fence pressure washing',
      'Commercial building washing'
    ],
    cta: 'Refresh your property with professional pressure washing!',
    link: '/services/pressure-washing',
    squareImage: '/lovable-uploads/a8d9837b-5c66-4e74-a9a9-34e018c71a02.png',
    fullWidthImage: '/lovable-uploads/df1d5443-a527-44af-b261-a7bfde6064f7.png',
    keywords: 'Pressure washing, driveway cleaning, exterior power washing, house washing, deep clean, siding cleaning, BC Pressure Washing'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning – Extend the Life of Your Roof',
    icon: <Building size={24} />,
    description: `Over time, roofs collect moss, algae, and debris, which can cause damage and premature aging. Our roof cleaning services help extend the life of your roof by safely removing organic growth, black streaks, and built-up dirt. We use gentle soft-wash techniques to prevent damage to your shingles.`,
    location: 'White Rock',
    altLocations: ['South Surrey', 'Surrey', 'Langley', 'Vancouver', 'Abbotsford', 'Mission'],
    includes: [
      'Soft-wash roof cleaning',
      'Moss & algae removal',
      'Gutter and downspout clearing',
      'Asphalt, tile, and metal roof cleaning'
    ],
    cta: 'Protect your roof and home today!',
    link: '/services/roof-cleaning',
    squareImage: '/lovable-uploads/ca94e1e6-7640-44e9-bc41-2389ccf948c1.png',
    fullWidthImage: '/lovable-uploads/213a6c8e-3ff9-45fd-8a16-20b91f45d9aa.png',
    keywords: 'Roof cleaning, moss removal, soft washing, roof maintenance, roof algae removal, professional roof care'
  }
];

// Double the services array to alternate between service info and full-width images
const allCarouselItems = [];
services.forEach(service => {
  // Add service description with square image
  allCarouselItems.push({
    type: 'serviceInfo',
    service: service
  });
  
  // Add full-width image
  allCarouselItems.push({
    type: 'fullWidthImage',
    service: service
  });
});

// Function to create SEO-friendly alt text
const createAltText = (service, location, keyword) => {
  if (service.id === 'window-cleaning') {
    return `Window Cleaning in ${location} | Streak-Free Window Washing by BC Pressure Washing`;
  } else if (service.id === 'gutter-cleaning') {
    return `Gutter Cleaning in ${location} | Rain Gutter Maintenance & Clog Removal by BC Pressure Washing`;
  } else if (service.id === 'pressure-washing') {
    return `Pressure Washing in ${location} | Professional Exterior Cleaning by BC Pressure Washing`;
  } else if (service.id === 'roof-cleaning') {
    return `Roof Cleaning in ${location} | Moss Removal & Roof Maintenance by BC Pressure Washing`;
  }
  return `${keyword} in ${location} | Professional Exterior Cleaning by BC Pressure Washing`;
};

// Function to generate a random location with White Rock having higher probability
const getRandomLocation = (service) => {
  const rand = Math.random();
  
  // White Rock has 40% chance, others share the remaining 60%
  if (rand < 0.4) {
    return "White Rock";
  } else {
    // Pick randomly from altLocations
    const randomIndex = Math.floor(Math.random() * service.altLocations.length);
    return service.altLocations[randomIndex];
  }
};

const DetailedServiceCarousel = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locations, setLocations] = useState(services.map(service => getRandomLocation(service)));

  useEffect(() => {
    if (!api) return;

    // Update active index when slide changes
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    
    // Setup autoplay with 6-second interval (slightly faster to make experience more dynamic)
    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => {
      clearInterval(autoplay);
      api.off("select", onSelect);
    };
  }, [api]);

  // Regenerate locations when active index changes
  useEffect(() => {
    setLocations(services.map(service => getRandomLocation(service)));
  }, [activeIndex]);

  return (
    <section className="bg-bc-gray py-16">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">{t("Our Professional Services")}</div>
        <h2 className="section-title animate-on-scroll">{t("Premium Cleaning Solutions for Every Surface")}</h2>
        <p className="section-subtitle animate-on-scroll max-w-3xl mx-auto">
          {t("We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.")}
        </p>

        <div className="mt-12">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
            orientation="horizontal"
            setApi={setApi}
          >
            <CarouselContent>
              {allCarouselItems.map((item, index) => {
                const serviceIndex = Math.floor(index / 2);
                const service = item.service;
                const location = locations[serviceIndex % locations.length];
                
                return (
                  <CarouselItem key={index} className="w-full">
                    {item.type === 'serviceInfo' ? (
                      // Service card with square image
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-lg shadow-lg mb-8">
                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="flex items-center mb-4">
                              <div className="bg-bc-red p-2 rounded-full mr-3 text-white">
                                {service.icon}
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                            </div>
                            
                            <div className="mb-4">
                              <span className="inline-flex items-center text-sm bg-slate-100 px-3 py-1 rounded-full mb-4">
                                <span className="font-semibold">📍 Serving:</span>&nbsp;{location}, {service.altLocations.slice(0, 2).join(', ')}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-6">{service.description}</p>
                            
                            <div className="mb-6">
                              <h4 className="font-bold mb-2">✅ Services Include:</h4>
                              <ul>
                                {service.includes.map((item, idx) => (
                                  <li key={idx} className="flex items-start mb-1">
                                    <span className="text-bc-red mr-2">✔</span> {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-bold text-bc-red mb-4">{service.cta}</p>
                            <Link to={service.link}>
                              <Button className="w-full sm:w-auto">
                                Learn More <ArrowRight className="ml-2" size={16} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        <div className="order-first md:order-last">
                          <img 
                            src={service.squareImage} 
                            alt={createAltText(service, location, service.title.split('–')[0].trim())}
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    ) : (
                      // Full-width image
                      <div className="w-full overflow-hidden rounded-lg shadow-lg mb-4">
                        <img 
                          src={service.fullWidthImage} 
                          alt={createAltText(service, 
                            service.altLocations[Math.floor(Math.random() * service.altLocations.length)], 
                            service.title.split('–')[0].trim())}
                          className="w-full h-auto object-cover"
                        />
                        <div className="bg-white/80 backdrop-blur-sm p-4 absolute bottom-0 left-0 right-0">
                          <h3 className="font-bold">{service.title.split('–')[0].trim()}</h3>
                          <Link to={service.link} className="text-bc-red flex items-center text-sm">
                            Learn More <ArrowRight className="ml-1" size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mx-2 bg-white/80" />
              <CarouselNext className="relative static mx-2 bg-white/80" />
            </div>
          </Carousel>
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link to="/services">
            <button className="btn-primary">
              {t("View All Services")} <ArrowRight className="ml-2 inline-block" size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DetailedServiceCarousel;
