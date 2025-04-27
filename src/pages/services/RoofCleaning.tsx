import { useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import RoofCleaningGallery from '../../components/services/RoofCleaningGallery';
import CallToAction from '../../components/CallToAction';
import { Shield, Check, ThumbsUp, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import { Badge } from '@/components/ui/badge';

const RoofCleaning = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const benefits = [
    {
      title: "Prevents Premature Roof Aging",
      description: "Regular cleaning removes moss and algae that trap moisture and deteriorate shingles, extending your roof's lifespan."
    },
    {
      title: "Enhances Curb Appeal",
      description: "Transform your home's appearance by eliminating unsightly black streaks and organic growth."
    },
    {
      title: "Reduces Energy Costs",
      description: "Black algae absorbs heat, making your home warmer. Removing it can help lower cooling costs."
    },
    {
      title: "Prevents Water Damage",
      description: "Moss can lift shingles and create paths for water to enter your home, causing expensive repairs."
    },
    {
      title: "Maintains Warranty Coverage",
      description: "Many manufacturers require regular roof maintenance to keep warranty protection valid."
    },
    {
      title: "Eliminates Health Hazards",
      description: "Removes mold, mildew and algae that can affect indoor air quality and trigger allergies."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('has-video-header');

    // Scroll effect for the hero section
    const handleScroll = () => {
      if (overlayRef.current) {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
          const opacity = Math.min(0.9, scrollPosition / window.innerHeight * 1.5);
          overlayRef.current.style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.classList.remove('has-video-header');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Roof Cleaning in Surrey &amp; White Rock | Safe Soft Wash Experts</title>
        <meta name="description" content="Professional roof cleaning using low-pressure soft wash. Prevent moss, algae, and roof damage. Trusted in Surrey, White Rock, and Greater Vancouver." />
        <meta name="keywords" content="roof cleaning Surrey, soft wash White Rock, moss removal, roof maintenance, algae removal" />
      </Helmet>
      
      <div className="parallax-hero">
        <div className="relative h-screen">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/eQSgdx9ujcc?autoplay=1&mute=1&loop=1&playlist=eQSgdx9ujcc&controls=0&showinfo=0&rel=0"
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg" style={{ textShadow: "0 4px 24px #000, 0 1px #222" }}>
                Gentle on Shingles. Tough on Moss.
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8">
                Safe, effective roof cleaning with soft wash technology – no damage, all results.
              </p>
            </div>
          </div>
        </div>
        <div ref={overlayRef} className="scroll-overlay"></div>
      </div>

      <div className="content-overlay pt-[100vh]">
        {/* TRUST SECTION */}
        <section className="py-8 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Shield className="mb-2 text-bc-red h-8 w-8" />
                <p className="font-medium">Fully Insured &amp; Locally Trusted</p>
              </div>
              <div className="flex flex-col items-center">
                <Check className="mb-2 text-bc-red h-8 w-8" />
                <p className="font-medium">Safe for All Roofing Materials</p>
              </div>
              <div className="flex flex-col items-center">
                <ThumbsUp className="mb-2 text-bc-red h-8 w-8" />
                <p className="font-medium">Premium Quality Service</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="mb-2 text-bc-red h-8 w-8" />
                <p className="font-medium">Free Estimates &amp; Transparent Service</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE CLEAN ROOFS SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Soft Wash Roof Cleaning System</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-bc-red bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-bc-red font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">Low-Pressure Application</h3>
                </div>
                <p className="text-gray-700">Our biodegradable sodium hypochlorite blend is applied with specialty low-pressure equipment to ensure no damage to your roofing materials.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-bc-red bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-bc-red font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Eliminates Organic Growth</h3>
                </div>
                <p className="text-gray-700">Our solution effectively removes moss, algae, lichen, and black streaks by breaking down their cellular structure at the source.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-bc-red bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-bc-red font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">No Pressure Damage</h3>
                </div>
                <p className="text-gray-700">Unlike traditional pressure washing, our soft wash method preserves the integrity of shingles, tiles, and other roofing materials.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-bc-red bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-bc-red font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-semibold">Long-Lasting Results</h3>
                </div>
                <p className="text-gray-700">Our chemical treatment continues working after application, providing results that last up to 4x longer than high-pressure methods.</p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg mt-10 max-w-3xl mx-auto text-center">
              <p className="text-lg font-medium">
                "We use the same type of solution trusted by roofing manufacturers to maintain your warranty."
              </p>
            </div>
          </div>
        </section>

        {/* WHY ROOF CLEANING MATTERS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Regular Roof Cleaning is Critical</h2>
            <ServiceBenefits benefits={benefits} />
          </div>
        </section>
        
        {/* BEFORE & AFTER GALLERY */}
        <RoofCleaningGallery />

        {/* OPTIONAL ADD-ONS SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Need More Than Just a Roof Wash?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Link to="/services/gutter-cleaning" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Gutter Cleaning</h3>
                <p className="text-gray-700 mb-4">Complete gutter cleaning and leaf guard installation services.</p>
                <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
              </Link>
              <Link to="/services/pressure-washing" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">House Washing</h3>
                <p className="text-gray-700 mb-4">Soft wash house cleaning for siding, stucco, and more.</p>
                <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
              </Link>
              <Link to="/services/pressure-washing" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Driveway Cleaning</h3>
                <p className="text-gray-700 mb-4">Professional concrete and paver cleaning services.</p>
                <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
              </Link>
              <Link to="/services/window-cleaning" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Window Cleaning</h3>
                <p className="text-gray-700 mb-4">Crystal-clear results for residential and commercial properties.</p>
                <Button variant="outline" size="sm" className="mt-2">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICE AREA BANNER WITH MAP */}
        <section className="py-10 bg-gray-800 text-white mt-0">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center mb-4 justify-center w-full">
                <MapPin className="mr-2 text-bc-red" />
                <span className="text-xl font-semibold">
                  We clean roofs across Surrey, White Rock, South Surrey, and surrounding areas.
                </span>
              </div>
              <Badge className="mb-4 bg-yellow-500 text-black hover:bg-yellow-600">Fully Insured & Licensed</Badge>
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-5xl md:max-w-6xl">
                  <ServiceAreaMap />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <CallToAction 
          backgroundImage="/lovable-uploads/8db03111-81c6-47d5-80b5-a1b597f5a4b1.png"
          title="Ready for a Clean Roof Without the Damage?"
          subtitle="Professional roof cleaning with guaranteed results."
          primaryButtonText="Request Your Free Quote"
          secondaryButtonText="Contact Us"
          primaryButtonLink="/calculator"
          secondaryButtonLink="/contact"
        />
      </div>

      <style>{`
        .parallax-hero {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
        }
        .content-overlay {
          position: relative;
          z-index: 10;
          background-color: white;
        }
        .scroll-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: #fff;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.1s ease;
        }
      `}</style>
    </Layout>
  );
};

export default RoofCleaning;
