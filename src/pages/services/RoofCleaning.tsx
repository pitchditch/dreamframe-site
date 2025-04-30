
import { useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import RoofCleaningGallery from '../../components/services/RoofCleaningGallery';
import ServiceHeader from '@/components/ServiceHeader';
import ServiceBenefits from '@/components/ServiceBenefits';
import ChatAssistant from '@/components/ChatAssistant';
import { Badge } from '@/components/ui/badge';

// Image imports
const MOSS_REMOVAL_IMG = "/lovable-uploads/41660181-42c5-445c-83e3-23681140d569.png";
const BLACK_STAINS_IMG = "/lovable-uploads/0349dfb1-14e8-4659-bd93-89bc41c2fd53.png";
const HOUSE_WITH_ROOF_IMG = "/lovable-uploads/9fa4bf3e-6a32-47a0-aca1-6e202ab78527.png";
const BEFORE_AFTER_IMG = "/lovable-uploads/aa926c91-97fb-4f9f-bab5-77cb342a2b38.png";

const benefits = [
  {
    title: "Extends Roof Lifespan",
    description: "Prevents moss, algae, and lichen from breaking down your shingles, adding years to your roof.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Improves Energy Efficiency",
    description: "Clean roofs reflect heat better, keeping your home cooler in summer and reducing energy bills.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Enhances Curb Appeal",
    description: "Instantly transforms your home's appearance and increases property value.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Prevents Water Damage",
    description: "Eliminates organisms that trap moisture and can lead to costly roof leaks.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
];

const RoofCleaning = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set document title
    document.title = "Roof Cleaning & Moss Removal Services | BC Pressure Washing";

    // Add class to body for any video-specific styling
    document.body.classList.add('roof-cleaning-page');
    return () => {
      document.body.classList.remove('roof-cleaning-page');
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Professional Roof Cleaning & Moss Removal | BC Pressure Washing</title>
        <meta name="description" content="Professional roof cleaning and moss removal services in Surrey, White Rock, and South Surrey. Extend the life of your roof while improving curb appeal." />
      </Helmet>

      {/* HERO SECTION - Full width YouTube video with title overlay */}
      <div className="w-full h-screen relative bg-black overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/eQSgdx9ujcc?autoplay=1&mute=1&loop=1&playlist=eQSgdx9ujcc&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
            title="Roof Cleaning Process"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ 
              border: 'none',
              width: '100vw',
              height: '100vh',
              objectFit: 'cover'
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Professional Roof Cleaning & Moss Removal
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
                Safe, effective roof cleaning that extends the life of your roof while improving your home's appearance.
              </p>
              <Button 
                variant="bc-red" 
                size="lg" 
                className="text-lg font-medium px-8 py-6"
                asChild
              >
                <Link to="/calculator">Get Your Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <ServiceBenefits
        title="Why Clean Your Roof?"
        subtitle="More than just curb appeal - protect your investment"
        benefits={benefits}
      />

      {/* BEFORE & AFTER SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Before & After Transformation</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the dramatic difference our professional roof cleaning service makes. We remove unsightly moss, algae, and black streaks to restore your roof's appearance.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <img 
              src={BEFORE_AFTER_IMG} 
              alt="Roof Cleaning Before and After Comparison" 
              className="w-full rounded-lg shadow-xl"
            />
            <div className="mt-6 flex justify-between gap-4 text-center">
              <div className="flex-1">
                <p className="font-bold text-xl text-gray-800">Before</p>
                <p className="text-gray-600">Moss growth and black streaks</p>
              </div>
              <div className="flex-1">
                <p className="font-bold text-xl text-gray-800">After</p>
                <p className="text-gray-600">Clean and restored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY/TESTIMONIALS SECTION - Made full width for testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <RoofCleaningGallery />
        </div>
      </section>
      
      {/* PROCESS SECTION - How we clean roofs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Roof Cleaning Process</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-2xl mb-4 text-bc-red">1. Assessment & Protection</h3>
                <p className="text-gray-700 mb-3">
                  We start by inspecting your roof to determine the appropriate cleaning approach and protect surrounding plants and landscaping.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-2xl mb-4 text-bc-red">2. Treatment Application</h3>
                <p className="text-gray-700 mb-3">
                  We apply our eco-friendly cleaning solution to kill moss, algae, and bacteria while loosening debris.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-2xl mb-4 text-bc-red">3. Low-Pressure Cleaning</h3>
                <p className="text-gray-700 mb-3">
                  Using specialized equipment, we safely rinse away contaminants with low pressure to protect your shingles.
                </p>
              </div>
            </div>
            
            <div>
              <img 
                src={HOUSE_WITH_ROOF_IMG} 
                alt="Professional Roof Cleaning Process" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* WHAT WE REMOVE SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Remove From Your Roof</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Moss Removal */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
              <div className="h-64 overflow-hidden">
                <img 
                  src={MOSS_REMOVAL_IMG} 
                  alt="Moss on Roof" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-bold mb-3">Moss Growth</h3>
                <p className="text-gray-700">
                  Moss retains moisture against your shingles, leading to deterioration and costly damage. Our treatment eliminates moss at the root level and prevents regrowth.
                </p>
              </div>
            </div>
            
            {/* Black Streaks Removal */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
              <div className="h-64 overflow-hidden">
                <img 
                  src={BLACK_STAINS_IMG} 
                  alt="Black Streaks on Roof" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-bold mb-3">Black Streaks & Algae</h3>
                <p className="text-gray-700">
                  Those unsightly black streaks are actually algae feeding on limestone filler in shingles. Our cleaning solution eliminates this algae and restores your roof's appearance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CALL TO ACTION */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Clean, Beautiful Roof?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Our roof cleaning service is safe, effective, and guaranteed to transform your home's appearance.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-white text-bc-red hover:bg-gray-100 text-lg font-semibold px-8 py-6"
            asChild
          >
            <Link to="/calculator">Get Your Free Quote Today</Link>
          </Button>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Is roof cleaning necessary?</h3>
              <p className="text-gray-700">
                Yes! Regular roof cleaning extends the life of your roof by preventing damage from moss, algae, and debris. It also maintains your home's curb appeal and can prevent costly repairs.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">How often should I have my roof cleaned?</h3>
              <p className="text-gray-700">
                Most homes benefit from roof cleaning every 2-3 years, though this can vary based on your surroundings. Homes in shaded areas or under many trees may need more frequent cleaning.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Will roof cleaning damage my shingles?</h3>
              <p className="text-gray-700">
                Our low-pressure cleaning method is specifically designed to be safe for all roof types, including asphalt shingles. We never use pressure washing on shingle roofs, which can damage or dislodge shingles.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Are your cleaning solutions safe for plants and pets?</h3>
              <p className="text-gray-700">
                Yes. We use eco-friendly cleaning solutions and take care to protect surrounding landscaping, plants, and property during the cleaning process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA SECTION */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">We Serve All of Surrey, White Rock, South Surrey & Langley</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Surrey</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">White Rock</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">South Surrey</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Langley</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Cloverdale</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Ocean Park</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Crescent Beach</Badge>
          </div>
        </div>
      </section>
      
      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatAssistant />
      </div>
    </Layout>
  );
};

export default RoofCleaning;
