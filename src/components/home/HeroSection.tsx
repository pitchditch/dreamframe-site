import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, MapPin, Star, Shield, CheckCircle } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Only load video on home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  useEffect(() => {
    if (!isHomePage) return;
    
    if (isMobile) {
      // Preload mobile background image immediately
      const img = new Image();
      img.src = "/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png";
      img.onload = () => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
      };
      // Start loading immediately
      img.loading = 'eager';
    } else {
      // For desktop, preload the video with aggressive settings
      const videoPreloader = document.createElement('iframe');
      videoPreloader.src = "https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=metadata";
      videoPreloader.style.position = 'absolute';
      videoPreloader.style.opacity = '0';
      videoPreloader.style.pointerEvents = 'none';
      document.body.appendChild(videoPreloader);
      
      videoPreloader.onload = () => {
        setTimeout(() => {
          setVideoLoaded(true);
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent('heroLoaded'));
          document.body.removeChild(videoPreloader);
        }, 300); // Reduced delay for faster loading
      };
      
      // Fallback timer - much faster
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
        if (document.body.contains(videoPreloader)) {
          document.body.removeChild(videoPreloader);
        }
      }, 800); // Reduced from 1500ms
    }
  }, [isMobile, isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      <HeroBackground videoLoaded={videoLoaded} isLoading={isLoading} />
      
      {/* Hero Content */}
      <div className={`container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        
        {/* Main Hero Title */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            BC's <span className="text-blue-400">#1 Rated</span>
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            Pressure Washing
          </h2>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">500+ Satisfied Customers</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Fully Insured</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold">100% Satisfaction</span>
          </div>
        </div>

        {/* Quote Form Card */}
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl">
          {/* Instant Estimate Badge */}
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-center font-semibold mb-6 inline-block">
            📊 Instant Estimate
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Get Your Free Quote in 30 Seconds
          </h3>
          
          <p className="text-gray-600 mb-6">
            No obligation • Satisfied customers
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Enter Your Postal Code
              </label>
              <Input 
                type="text" 
                placeholder="e.g., V5K 2A1"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg">
              Get My Free Quote →
            </Button>
            
            <div className="text-center text-gray-600">
              Or call now for instant pricing
            </div>
            
            <Button variant="outline" className="w-full border-2 border-blue-500 text-blue-500 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              (778) 808-7620
            </Button>
            
            {/* Personal Touch */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Every job personally checked by Jayden
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Online now</span>
                </div>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-2 text-center text-gray-600">
              <p>✓ Free estimates • ✓ Same-day service available</p>
              <p>✓ 100% satisfaction guaranteed</p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Text */}
        <div className="text-center text-white mt-8">
          <p className="text-lg md:text-xl">
            Trusted by <span className="text-yellow-400 font-bold">500+ Satisfied Customers</span> in Metro Vancouver
          </p>
          <p className="text-sm md:text-base mt-2 opacity-90">
            Fast Quotes • Same-day service available
          </p>
        </div>

        {/* Service Area */}
        <div className="flex items-center gap-2 text-white mt-4">
          <MapPin className="w-5 h-5" />
          <span>Serving White Rock, Metro Vancouver & Beyond</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
