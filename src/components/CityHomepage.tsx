
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Droplets, Sparkles, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityData } from '@/data/cities';

interface CityHomepageProps {
  cityData: CityData;
}

const CityHomepage = ({ cityData }: CityHomepageProps) => {
  const { name, slug, postalCodePrefix, nearbyAreas, testimonials } = cityData;

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <>
      <Helmet>
        <title>{name} Pressure Washing & Window Cleaning | BC Pressure Washing</title>
        <meta 
          name="description" 
          content={`BC Pressure Washing offers top-rated pressure washing & window cleaning in ${name}, BC. Call (778) 555-1234 for a free quote!`} 
        />
        <meta name="keywords" content={`pressure washing ${name}, window cleaning ${name}, exterior cleaning ${name}, BC pressure washing`} />
        <link rel="canonical" href={`https://www.bcpressurewashing.ca/${slug}`} />
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
            Restore Your Home's Curb Appeal in {name}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional pressure washing and window cleaning services for {name} homeowners. Transform your property with our expert exterior cleaning solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="bc-red" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
              <Link to={`/calculator?city=${slug}`}>Get a Free Quote</Link>
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

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our {name} Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pressure Washing Card */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pressure Washing</h3>
              <ul className="text-left space-y-2 mb-6">
                <li>• Driveways & walkways</li>
                <li>• Decks & patios</li>
                <li>• House siding & exteriors</li>
                <li>• Fences & gates</li>
                <li>• Commercial surfaces</li>
              </ul>
              <Button asChild className="w-full">
                <Link to={`/services/pressure-washing-${slug}`}>Learn More</Link>
              </Button>
            </div>

            {/* Window Cleaning Card */}
            <div className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-bc-red p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Window Cleaning</h3>
              <ul className="text-left space-y-2 mb-6">
                <li>• Interior & exterior windows</li>
                <li>• Screen cleaning & repair</li>
                <li>• Commercial buildings</li>
                <li>• Post-construction cleanup</li>
                <li>• High-rise window access</li>
              </ul>
              <Button asChild className="w-full">
                <Link to={`/services/window-cleaning-${slug}`}>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why {name} Homeowners Trust Us
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">Fully licensed and insured for your complete peace of mind.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="font-bold mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-gray-600">We're not satisfied until you are completely happy.</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-bc-red" />
              </div>
              <h3 className="font-bold mb-2">Locally Owned in {name}</h3>
              <p className="text-gray-600">Your neighbors providing trusted local service.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-bold mb-2">Eco-Friendly Solutions</h3>
              <p className="text-gray-600">Safe for your family, pets, and the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What {name} Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <footer className="font-semibold text-gray-900">
                  – {testimonial.author}
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Serving {name} & Surrounding Areas</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {nearbyAreas.map((area, index) => (
              <span 
                key={index}
                className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="mt-6 text-gray-600">
            Postal codes: {postalCodePrefix}
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Get Your Free {name} Quote
          </h2>
          
          <div className="max-w-md mx-auto bg-white rounded-lg p-6 text-gray-900">
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
                placeholder={`${name} Address & Postal Code*`}
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-red focus:border-transparent"
              />
              <select 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bc-red focus:border-transparent"
              >
                <option value="">Service of Interest*</option>
                <option value="pressure-washing">Pressure Washing</option>
                <option value="window-cleaning">Window Cleaning</option>
                <option value="both">Both Services</option>
              </select>
              <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-white py-3">
                Get Free Quote
              </Button>
            </form>
          </div>
          
          <div className="mt-8">
            <a 
              href="tel:778-555-1234" 
              className="inline-flex items-center text-white text-xl font-bold hover:text-gray-200 transition-colors"
            >
              <Phone className="mr-2" size={24} />
              Call Now: (778) 555-1234
            </a>
            <p className="mt-2 text-white/90">We respond within 2 hours!</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CityHomepage;
