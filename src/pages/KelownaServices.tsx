
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Droplets, Sparkles, Phone, MapPin, Home, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';

const KelownaServices = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <Layout
      title="Kelowna Window Cleaning & Pressure Washing Services | BC Pressure Washing"
      description="Professional window cleaning, pressure washing, gutter cleaning & soft wash services in Kelowna, BC. Serving Glenmore, Rutland, Mission & surrounding areas. Call (778) 555-1234!"
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl="/kelowna"
    >
      <Helmet>
        <meta name="keywords" content="window cleaning Kelowna, pressure washing Kelowna, gutter cleaning Kelowna, soft wash Kelowna, exterior cleaning Kelowna BC" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Kelowna's Premier Exterior Cleaning Services
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional window cleaning, pressure washing, gutter cleaning & soft wash services for Kelowna homes and businesses. Serving the entire Okanagan Valley.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="bc-red" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
              <a href="#contact">Get Free Quote</a>
            </Button>
            <a 
              href="tel:778-555-1234" 
              className="flex items-center text-white text-lg font-semibold hover:text-bc-red transition-colors"
            >
              <Phone className="mr-2" size={20} />
              Call Now: (778) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <MapPin className="w-6 h-6 text-bc-red mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">
              Proudly Serving Kelowna & the Okanagan Valley
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-gray-700 mb-4">
                We're your local exterior cleaning experts in Kelowna, BC, serving postal codes V1V, V1W, V1X, V1Y, V1Z, V4T, V4V and the entire Okanagan region.
              </p>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Areas We Service:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm">Glenmore</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm">Rutland</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm">Mission</span>
                  <span className="text-sm text-gray-600">+4 more areas</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">Local Trust</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm">5.0 stars (50+ local Kelowna reviews)</span>
                </div>
                <div className="flex items-center">
                  <Home className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm">200+ jobs completed in Kelowna</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Also serving: West Kelowna, Peachland, Summerland, Penticton
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Kelowna Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Window Cleaning */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Window Cleaning</h3>
              <ul className="text-left text-sm space-y-1 mb-4">
                <li>• Interior & exterior windows</li>
                <li>• Screen cleaning & repair</li>
                <li>• Commercial buildings</li>
                <li>• Post-construction cleanup</li>
              </ul>
            </div>

            {/* Pressure Washing */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pressure Washing</h3>
              <ul className="text-left text-sm space-y-1 mb-4">
                <li>• Driveways & walkways</li>
                <li>• Decks & patios</li>
                <li>• House siding</li>
                <li>• Commercial surfaces</li>
              </ul>
            </div>

            {/* Gutter Cleaning */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gutter Cleaning</h3>
              <ul className="text-left text-sm space-y-1 mb-4">
                <li>• Complete gutter cleaning</li>
                <li>• Downspout clearing</li>
                <li>• Gutter repairs</li>
                <li>• Preventive maintenance</li>
              </ul>
            </div>

            {/* Soft Wash */}
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Soft Wash</h3>
              <ul className="text-left text-sm space-y-1 mb-4">
                <li>• Gentle roof cleaning</li>
                <li>• Siding soft wash</li>
                <li>• Moss & algae removal</li>
                <li>• Eco-friendly solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Kelowna Homeowners Trust Us
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600 text-sm">Fully licensed and insured for your complete peace of mind.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="font-bold mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-gray-600 text-sm">We're not satisfied until you are completely happy.</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-bc-red" />
              </div>
              <h3 className="font-bold mb-2">Local Kelowna Experts</h3>
              <p className="text-gray-600 text-sm">Your neighbors providing trusted local service in the Okanagan.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-bold mb-2">Eco-Friendly Solutions</h3>
              <p className="text-gray-600 text-sm">Safe for your family, pets, and the beautiful Okanagan environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Kelowna Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {renderStars(5)}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Outstanding pressure washing service! Our Kelowna home's driveway and deck look brand new after their thorough cleaning."
              </blockquote>
              <footer className="font-semibold text-gray-900">
                – Jennifer M., Glenmore
              </footer>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {renderStars(5)}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Professional window cleaning team with amazing results. Our lake view windows are crystal clear - the view is spectacular!"
              </blockquote>
              <footer className="font-semibold text-gray-900">
                – Michael K., Mission
              </footer>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                {renderStars(5)}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Excellent gutter cleaning and soft wash service. Our Rutland home looks pristine and well-maintained year-round."
              </blockquote>
              <footer className="font-semibold text-gray-900">
                – Sarah P., Rutland
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Serving Kelowna & Surrounding Areas</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">West Kelowna</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">Peachland</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">Summerland</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">Penticton</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">Rutland</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">Glenmore</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium">Mission</span>
          </div>
          <p className="mt-6 text-gray-600">
            Postal codes: V1V, V1W, V1X, V1Y, V1Z, V4T, V4V
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Get Your Free Kelowna Quote Today
          </h2>
          
          <div className="max-w-md mx-auto bg-white rounded-lg p-6 text-gray-900 mb-8">
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name*" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-red focus:border-transparent"
              />
              <input 
                type="tel" 
                placeholder="Phone Number*" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-red focus:border-transparent"
              />
              <input 
                type="text" 
                placeholder="Kelowna Address & Postal Code*"
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-red focus:border-transparent"
              />
              <select 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-red focus:border-transparent"
              >
                <option value="">Service of Interest*</option>
                <option value="window-cleaning">Window Cleaning</option>
                <option value="pressure-washing">Pressure Washing</option>
                <option value="gutter-cleaning">Gutter Cleaning</option>
                <option value="soft-wash">Soft Wash</option>
                <option value="multiple">Multiple Services</option>
              </select>
              <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-white py-3">
                Get Free Quote
              </Button>
            </form>
          </div>
          
          <div>
            <a 
              href="tel:778-555-1234" 
              className="inline-flex items-center text-white text-xl font-bold hover:text-gray-200 transition-colors"
            >
              <Phone className="mr-2" size={24} />
              Call Now: (778) 555-1234
            </a>
            <p className="mt-2 text-white/90">Serving Kelowna & the Okanagan Valley - We respond within 2 hours!</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KelownaServices;
