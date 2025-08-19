import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postalCode, setPostalCode] = useState('');
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
        }, 300);
      };
      
      // Fallback timer
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
        window.dispatchEvent(new CustomEvent('heroLoaded'));
        if (document.body.contains(videoPreloader)) {
          document.body.removeChild(videoPreloader);
        }
      }, 800);
    }
  }, [isMobile, isHomePage]);
  
  // Don't render hero section if not on home page
  if (!isHomePage) return null;

  const handleQuoteSubmit = () => {
    if (postalCode.trim()) {
      window.location.href = `/calculator?postal=${encodeURIComponent(postalCode.trim())}`;
    }
  };

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-30 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Background - Video or Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            <img 
              src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
              alt="House with palm tree and red BC Pressure Washing car"
              className={`absolute w-full h-full object-cover object-bottom transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
              fetchPriority="high"
              style={{ objectPosition: '50% 100%' }}
            />
          ) : (
            <>
              {/* Poster image for instant loading */}
              <img 
                src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
                alt="BC Pressure Washing Service"
                className={`absolute w-full h-full object-cover object-center transition-opacity duration-300 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                loading="eager"
                fetchPriority="high"
              />
              <iframe 
                id="hero-desktop-video"
                className={`absolute w-full h-full top-0 left-0 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  transform: window.innerWidth >= 768 && window.innerWidth <= 1024 ? 'scale(1.2)' : 'scale(1.5)',
                  transformOrigin: 'center center'
                }}
                src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=metadata"
                title="Pressure Washing Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
              ></iframe>
            </>
          )}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b ${isMobile ? 'from-black/80 via-black/60 to-black/80' : 'from-black/70 via-black/40 to-black/60'}`}></div>
      </div>
      
      {/* Hero Content - Quote Form Overlay */}
      <div className={`container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-auto text-center">
          {/* Instant Estimate Badge */}
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
            📋 Instant Estimate
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Your Free Quote in 30 Seconds
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            No obligation • Satisfied customers
          </p>
          
          {/* Postal Code Input */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-3">Enter Your Postal Code</p>
            <Input
              type="text"
              placeholder="e.g., V5K 2A1"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-4 text-lg text-center border-2 border-gray-200 rounded-lg focus:border-blue-500"
            />
          </div>
          
          {/* Get Quote Button */}
          <Button 
            onClick={handleQuoteSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 text-lg font-semibold rounded-lg mb-6"
          >
            Get My Free Quote →
          </Button>
          
          {/* Call Option */}
          <div className="mb-6">
            <p className="text-gray-600 mb-3">Or call now for instant pricing</p>
            <a 
              href="tel:778-808-7620" 
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Phone size={20} />
              (778) 808-7620
            </a>
          </div>
          
          {/* Personal Touch Section */}
          <div className="bg-green-50 rounded-lg p-4 mb-6 flex items-center gap-3">
            <img 
              src="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png" 
              alt="Jayden - Owner" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-green-800 font-semibold">Every job personally</p>
              <p className="text-green-800 font-semibold">checked by Jayden</p>
            </div>
            <div className="ml-auto text-green-600">✓</div>
          </div>
          
          {/* Trust Indicators */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>✓ Free estimates • ✓ Same-day service available</p>
            <p>✓ 100% satisfaction guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;