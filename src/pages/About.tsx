import { useEffect } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, ThumbsUp, Star, Clock } from 'lucide-react';
import ServicesSection from '@/components/home/ServicesSection';

const About = () => {
  useEffect(() => {
    // Animation for elements when they enter viewport
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      // Clean up
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>About BC Pressure Washing | White Rock's Premier Cleaning Service</title>
        <meta name="description" content="Learn about BC Pressure Washing, White Rock's top-rated window cleaning and pressure washing service. Family-owned, fully insured, and committed to excellence." />
        <meta name="keywords" content="window cleaning White Rock, pressure washing Surrey, about BC Pressure Washing, exterior cleaning services" />
        <link rel="canonical" href="https://bcpressurewashing.ca/about" />
        <meta property="og:title" content="About BC Pressure Washing | White Rock's Premier Cleaning Service" />
        <meta property="og:description" content="Family-owned exterior cleaning company serving White Rock, Surrey and Metro Vancouver with premium window cleaning and pressure washing services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bcpressurewashing.ca/about" />
        <meta property="og:image" content="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/lovable-uploads/fa3b438e-d980-439e-9d0f-e829e376fcf7.png')` }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BC Pressure Washing</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We're a family-owned business dedicated to providing exceptional exterior cleaning services throughout the Greater Vancouver area.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                BC Pressure Washing was founded with a simple mission: to provide the highest quality exterior cleaning services with unmatched customer service. What started as a small, one-person operation has grown into a trusted name in residential and commercial cleaning throughout the Greater Vancouver area.
              </p>
              <p className="text-gray-600 mb-6">
                Our founder's background in construction and property maintenance gave him unique insights into the importance of proper exterior cleaning and maintenance. This expertise forms the foundation of our approach to every job, ensuring that we not only clean effectively but also protect and preserve your property's surfaces.
              </p>
              <p className="text-gray-600">
                Today, we continue to grow through word-of-mouth referrals from our satisfied customers, which we believe is the greatest testament to the quality of our work and our commitment to excellence.
              </p>
            </div>
            <div className="md:w-1/2 animate-on-scroll">
              <img 
                src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" 
                alt="BC Pressure Washing Team" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We believe in honest pricing, transparent communication, and doing what we say we'll do. No hidden fees, no cutting corners.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We're committed to delivering exceptional results on every job, using the best equipment and techniques in the industry.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-on-scroll">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen to your needs, respect your property, and work to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">Why Choose BC Pressure Washing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start animate-on-scroll">
              <div className="mr-4 text-bc-red">
                <ThumbsUp size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">
                  We stand behind our work with a 100% satisfaction guarantee. If you're not happy, we'll make it right.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-on-scroll">
              <div className="mr-4 text-bc-red">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fully Insured</h3>
                <p className="text-gray-600">
                  We carry comprehensive insurance coverage, giving you peace of mind while we work on your property.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-on-scroll">
              <div className="mr-4 text-bc-red">
                <Star size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">5-Star Rated</h3>
                <p className="text-gray-600">
                  We maintain an excellent reputation with consistent 5-star reviews across Google and other platforms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-on-scroll">
              <div className="mr-4 text-bc-red">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Prompt & Reliable</h3>
                <p className="text-gray-600">
                  We respect your time with punctual service and clear communication throughout the process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-on-scroll">
              <div className="mr-4 text-bc-red">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Professional Equipment</h3>
                <p className="text-gray-600">
                  We invest in commercial-grade equipment and eco-friendly cleaning solutions for optimal results.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-on-scroll">
              <div className="mr-4 text-bc-red">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Experienced Team</h3>
                <p className="text-gray-600">
                  Our technicians are trained, experienced, and committed to delivering exceptional service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 animate-on-scroll">Areas We Serve</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 animate-on-scroll">
            We provide our premium exterior cleaning services throughout the Greater Vancouver area, including:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-on-scroll">
            <Link to="/locations/white-rock" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">White Rock</h3>
            </Link>
            <Link to="/locations/surrey" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">Surrey</h3>
            </Link>
            <Link to="/locations/langley" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">Langley</h3>
            </Link>
            <Link to="/locations/delta" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">Delta</h3>
            </Link>
            <Link to="/locations/south-surrey" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">South Surrey</h3>
            </Link>
            <Link to="/locations/richmond" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">Richmond</h3>
            </Link>
            <Link to="/locations/burnaby" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">Burnaby</h3>
            </Link>
            <Link to="/locations/coquitlam" className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
              <h3 className="font-bold">Coquitlam</h3>
            </Link>
          </div>
          
          <p className="text-center text-gray-600 mt-8 animate-on-scroll">
            Don't see your area listed? <Link to="/contact" className="text-bc-red hover:underline">Contact us</Link> to check if we service your location.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-on-scroll">Ready to Experience the BC Pressure Washing Difference?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 animate-on-scroll">
            Whether you need window cleaning, pressure washing, or any of our other services, we're here to help you maintain and enhance your property's appearance and value.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
            <Link to="/calculator">
              <button className="btn-primary">Get a Free Quote</button>
            </Link>
            <Link to="/contact">
              <button className="btn-secondary">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Add ServicesSection before any final CTAs */}
      <ServicesSection />
    </Layout>
  );
};

export default About;
