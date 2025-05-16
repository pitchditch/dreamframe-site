
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { MapPin, Phone, Star, Award, Check, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhiteRockTestimonials from '@/components/locations/WhiteRockTestimonials';
import ServiceGrid from '@/components/locations/ServiceGrid';
import CTABanner from '@/components/home/CTABanner';
import { useTranslation } from '@/hooks/use-translation';
import { useState } from 'react';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const WhiteRock = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState('');
  
  // Form setup for the quote section
  const form = useForm({
    defaultValues: {
      postalCode: '',
      houseSize: 'medium'
    }
  });

  const onSubmit = (data: any) => {
    // Save the data to session storage
    sessionStorage.setItem('postalCode', data.postalCode);
    sessionStorage.setItem('houseSize', data.houseSize);
    
    // Navigate to the calculator page
    navigate('/calculator');
  };
  
  useEffect(() => {
    // Update page metadata for SEO
    document.title = "White Rock Pressure Washing Services | BC Pressure Washing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional pressure washing services in White Rock, BC. House washing, window cleaning, roof cleaning and more. Local, trusted White Rock pressure washing experts serving Marine Drive to Semiahmoo.');
    }
    
    window.scrollTo(0, 0);
  }, []);

  // Service data for the grid
  const services = [
    {
      icon: "house",
      title: "House Washing",
      description: "Professional washing for White Rock homes to remove dirt, grime, and salt residue."
    },
    {
      icon: "window-cleaning",
      title: "Window Cleaning",
      description: "Crystal clear windows for your White Rock home or business, enhancing your ocean views."
    },
    {
      icon: "driveway-cleaning",
      title: "Driveway & Sidewalk Cleaning",
      description: "Restore your concrete surfaces to their original color and condition."
    },
    {
      icon: "house-plus",
      title: "Soft Wash for Siding",
      description: "Gentle but effective cleaning for all types of White Rock home exteriors."
    },
    {
      icon: "gutter-cleaning",
      title: "Gutter Cleaning",
      description: "Keep your gutters flowing freely, preventing water damage to your White Rock property."
    },
    {
      icon: "roof-cleaning",
      title: "Roof Moss & Algae Treatment",
      description: "Remove harmful moss and algae that damages White Rock roofs in our coastal climate."
    }
  ];

  // White Rock neighborhoods
  const neighborhoods = [
    "Marine Drive", 
    "East Beach", 
    "West Beach", 
    "Five Corners", 
    "Semiahmoo Secondary area", 
    "North Bluff", 
    "Uptown White Rock", 
    "Hillside"
  ];

  return (
    <Layout>
      {/* SECTION 1: Hero Banner */}
      <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/9044bb24-865d-4974-8d4a-8807df54ea8c.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container relative z-10 mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            🧼 Pressure Washing in White Rock, BC
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your local pros for house washing, window cleaning, roof cleaning, and more. Serving Marine Drive to Semiahmoo — fast, reliable, affordable.
          </p>
          <Button asChild size="lg" variant="bc-red" className="text-white text-lg font-medium px-8 py-6">
            <Link to="/calculator">
              Check Prices & Availability
            </Link>
          </Button>
        </div>
      </section>

      {/* SECTION 2: Services We Offer in White Rock */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Services We Offer in White Rock</h2>
          <p className="text-gray-600 text-center mb-12">
            Professional exterior cleaning services for White Rock homes and businesses
          </p>
          
          <ServiceGrid services={services} />
        </div>
      </section>

      {/* SECTION 3: Why White Rock Residents Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Locally Trusted Pressure Washing in White Rock
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-bc-red rounded-full mx-auto mb-4">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Locally Owned & Operated</h3>
              <p className="text-gray-600">
                Based in White Rock, we know the unique challenges of coastal properties.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-bc-red rounded-full mx-auto mb-4">
                <Calendar size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Quotes & Weekend Availability</h3>
              <p className="text-gray-600">
                Quick response times and flexible scheduling to work around your busy life.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-bc-red rounded-full mx-auto mb-4">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Spotted Our Red Car?</h3>
              <p className="text-gray-600">
                Mention seeing our red car around White Rock for 10% off your service!
              </p>
            </div>
          </div>
          
          {/* Optional video section */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=0&mute=1&controls=1"
                title="White Rock Pressure Washing Services" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Before & After Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Before & After Transformations</h2>
          <p className="text-gray-600 text-center mb-12">
            See the dramatic difference our pressure washing services make
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/4da7d34a-a303-4274-ad91-8aeb980fa657.png" 
                alt="Driveway Transformation" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Driveway Transformation</h3>
                <p className="text-gray-600">White Rock home with severe concrete staining, restored to like-new condition</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/0c2175e3-0c77-4b8a-8670-db9aa6ff6e63.png" 
                alt="Soft Wash Roof Cleaning" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Soft Wash Roof Cleaning</h3>
                <p className="text-gray-600">Removing harmful moss and algae from a White Rock hillside home</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/73ff1153-6589-4537-996a-1ff5f512cbea.png" 
                alt="Window Cleaning" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Crystal Clear Windows</h3>
                <p className="text-gray-600">Restoring perfect ocean views for a Marine Drive condo</p>
              </div>
            </div>
          </div>
          
          <p className="text-center mt-6 text-gray-600 italic">
            Real results from real jobs right here in White Rock.
          </p>
        </div>
      </section>

      {/* SECTION 5: Where We Work in White Rock */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                From the Pier to the Five Corners — We've Got You Covered
              </h2>
              <p className="text-gray-600 mb-6">
                We proudly serve all White Rock neighborhoods with our premium pressure washing services. No matter where you're located in White Rock, our team can reach you quickly.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="flex items-center">
                    <MapPin size={18} className="text-bc-red mr-2" />
                    <span>{neighborhood}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <Phone className="text-bc-red mr-2" size={20} />
                  <span className="font-medium">Call your local White Rock team today: 778-808-7620</span>
                </div>
                <Button asChild variant="bc-red" size="lg" className="mt-2">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">White Rock Service Map</h3>
              <div className="aspect-w-16 aspect-h-12 rounded-md overflow-hidden">
                <iframe
                  title="White Rock, BC Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21076.419231886!2d-122.83878804053716!3d49.02418069356082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485c376522111b1%3A0x5986d9c32dc891ee!2sWhite%20Rock%2C%20BC!5e0!3m2!1sen!2sca!4v1685458324810!5m2!1sen!2sca"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-4 text-gray-600 text-sm">
                <p>We serve all of White Rock and surrounding South Surrey areas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials from White Rock Clients */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">What Our White Rock Clients Say</h2>
          <p className="text-gray-600 text-center mb-12">
            Hear from your neighbors about our pressure washing services
          </p>
          
          <WhiteRockTestimonials />
        </div>
      </section>

      {/* SECTION 7: Book or Get a Quote */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to clean up your home's exterior?
            </h2>
            <p className="text-xl mb-8">
              Enter your postal code to check prices and availability in your White Rock neighborhood.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Postal Code (e.g. V4B)"
                            className="bg-white h-12 text-black"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="houseSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="bg-white h-12 text-black">
                              <SelectValue placeholder="House Size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small (< 1500 sq ft)</SelectItem>
                              <SelectItem value="medium">Medium (1500-2500 sq ft)</SelectItem>
                              <SelectItem value="large">Large (2500+ sq ft)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="mt-4 bg-white text-bc-red hover:bg-gray-100 w-full h-12 text-lg font-bold">
                  Check Prices Now
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* SECTION 8: Footer Links & Internal Navigation */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-bc-red">Home</Link></li>
                <li><Link to="/contact" className="hover:text-bc-red">Contact</Link></li>
                <li><Link to="/locations/surrey" className="hover:text-bc-red">Surrey Pressure Washing</Link></li>
                <li><Link to="/services/gutter-cleaning" className="hover:text-bc-red">Gutter Cleaning</Link></li>
                <li><Link to="/faq" className="hover:text-bc-red">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li><Link to="/services/pressure-washing" className="hover:text-bc-red">Pressure Washing</Link></li>
                <li><Link to="/services/window-cleaning" className="hover:text-bc-red">Window Cleaning</Link></li>
                <li><Link to="/services/gutter-cleaning" className="hover:text-bc-red">Gutter Cleaning</Link></li>
                <li><Link to="/services/roof-cleaning" className="hover:text-bc-red">Roof Cleaning</Link></li>
                <li><Link to="/services/commercial-pressure-washing" className="hover:text-bc-red">Commercial Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Service Areas</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">White Rock</span></li>
                <li><Link to="/locations/surrey" className="hover:text-bc-red">Surrey</Link></li>
                <li><Link to="/locations/langley" className="hover:text-bc-red">Langley</Link></li>
                <li><Link to="/locations/delta" className="hover:text-bc-red">Delta</Link></li>
                <li><Link to="/locations" className="hover:text-bc-red">All Locations</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <p className="flex items-center">
                  <Phone size={18} className="mr-2 text-bc-red" />
                  <a href="tel:7788087620" className="hover:text-bc-red">778-808-7620</a>
                </p>
                <div>
                  <p className="font-medium">Hours:</p>
                  <p>Mon–Fri: 8am–6pm</p>
                  <p>Sat: 9am–5pm</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </Layout>
  );
};

export default WhiteRock;
