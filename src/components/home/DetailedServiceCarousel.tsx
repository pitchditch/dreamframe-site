
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useTranslation } from '@/hooks/use-translation';
import { MapPin, CheckCircle } from 'lucide-react';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';

const services = [
  {
    id: 'window-cleaning',
    title: 'Window Cleaning – Streak-Free Shine for Your Home & Business',
    locations: ['White Rock', 'South Surrey', 'Surrey'],
    description: 'Our expert window cleaning services ensure crystal-clear, streak-free windows for residential and commercial properties. Using professional techniques, we remove dirt, grime, and hard water stains, improving your view and enhancing your home\'s curb appeal. Whether it\'s interior or exterior window cleaning, we guarantee a spotless finish.',
    features: [
      'Interior & exterior window washing',
      'Screen & frame cleaning',
      'Hard water stain removal',
      'High-rise & storefront window cleaning'
    ],
    cta: 'Get your windows sparkling today!',
    image: '/lovable-uploads/931d71f9-6756-4b2d-aeed-7004b3fcdcdb.png',
    imageAlt: 'Window Cleaning in White Rock | Professional Streak-Free Window Washing by BC Pressure Washing',
    path: '/services/window-cleaning'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning – Extend the Life of Your Roof',
    locations: ['Surrey', 'South Surrey', 'White Rock'],
    description: 'Over time, roofs collect moss, algae, and debris, which can cause damage and premature aging. Our roof cleaning services help extend the life of your roof by safely removing organic growth, black streaks, and built-up dirt. We use gentle soft-wash techniques to prevent damage to your shingles.',
    features: [
      'Soft-wash roof cleaning',
      'Moss & algae removal',
      'Gutter and downspout clearing',
      'Asphalt, tile, and metal roof cleaning'
    ],
    cta: 'Protect your roof and home today!',
    image: '/lovable-uploads/ca94e1e6-7640-44e9-bc41-2389ccf948c1.png',
    imageAlt: 'Roof Cleaning in Surrey | Professional Moss Removal & Roof Maintenance by BC Pressure Washing',
    path: '/services/roof-cleaning'
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning – Keep Your Gutters Flowing Freely',
    locations: ['Burnaby', 'Delta', 'Vancouver'],
    description: 'Clogged gutters can lead to water damage, roof leaks, and foundation issues. Our professional gutter cleaning services ensure that your gutters are free of debris and functioning properly, directing water away from your home. We also inspect your gutters for any damage.',
    features: [
      'Removal of leaves, dirt & debris',
      'Downspout flushing',
      'Gutter whitening & brightening',
      'Preventative maintenance'
    ],
    cta: 'Book your gutter cleaning service now!',
    image: '/lovable-uploads/ca44edd3-e620-4298-96b2-32f6f8332cae.png',
    imageAlt: 'Gutter Cleaning in Burnaby | Rain Gutter Maintenance & Clog Removal by BC Pressure Washing',
    path: '/services/gutter-cleaning'
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing – Restore the Beauty of Your Property',
    locations: ['Maple Ridge', 'North Vancouver', 'Abbotsford'],
    description: 'Dirt, grime, and mold can make your home\'s exterior look dull and worn. Our pressure washing services bring back the original beauty of your surfaces, whether it\'s a driveway, patio, deck, or siding. We use high-pressure and soft-wash techniques to remove years of buildup without causing damage.',
    features: [
      'House exterior washing',
      'Driveway & sidewalk cleaning',
      'Deck & fence pressure washing',
      'Commercial building washing'
    ],
    cta: 'Refresh your property with professional pressure washing!',
    image: '/lovable-uploads/a8d9837b-5c66-4e74-a9a9-34e018c71a02.png',
    imageAlt: 'Pressure Washing in Maple Ridge | Professional Exterior Cleaning by BC Pressure Washing',
    path: '/services/pressure-washing'
  }
];

const DetailedServiceCarousel = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    
    // Setup autoplay with longer duration for reading
    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 10000); // 10 seconds per slide

    return () => {
      clearInterval(autoplay);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="badge-pill mx-auto w-fit mb-4">{t("Our Professional Services")}</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Premium Cleaning Solutions for Every Surface")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.")}
          </p>
        </div>
        
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={service.id} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={18} className="text-bc-red mr-2" />
                      <span>Serving: {service.locations.join(', ')}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3">✅ Services Include:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle size={18} className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="font-semibold text-lg mb-6">{service.cta}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <PriceCalculatorOverlay 
                        buttonText="Get a Free Quote" 
                        className="bg-bc-red hover:bg-red-700 text-white py-3 px-6 rounded-lg text-sm md:text-base font-medium"
                        initialService={service.id}
                      />
                      <Link to={service.path}>
                        <button className="border-2 border-gray-300 hover:border-gray-400 py-3 px-6 rounded-lg text-sm md:text-base font-medium transition-colors">
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="order-1 md:order-2">
                    <div className="relative overflow-hidden rounded-lg shadow-xl aspect-square">
                      <img 
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static relative transform-none" />
            <div className="flex items-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index ? "bg-bc-red scale-125" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <CarouselNext className="static relative transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default DetailedServiceCarousel;
