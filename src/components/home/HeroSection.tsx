
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [postalCode, setPostalCode] = useState('');
  const [ghostText, setGhostText] = useState('Enter your postal code...');

  useEffect(() => {
    // Get ghost text from CitiesCarousel
    const updateGhostText = () => {
      const ghostElement = document.getElementById('postal-ghost-text');
      if (ghostElement) {
        setGhostText(ghostElement.textContent || 'Enter your postal code...');
      }
    };

    updateGhostText();
    const interval = setInterval(updateGhostText, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGetQuote = () => {
    if (postalCode.trim()) {
      sessionStorage.setItem('postalCode', postalCode);
    }
    // Navigate to calculator
    window.location.href = '/calculator';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
        >
          <source src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="mb-6">
          <h1 className={`font-bold leading-tight mb-4 ${
            isMobile ? 'text-3xl' : 'text-5xl md:text-6xl'
          }`}>
            {t("White Rock's #1")}
            <br />
            <span className="text-blue-400">{t("Window & Pressure")}</span>
            <br />
            {t("Washing Experts")}
          </h1>
          
          {/* Larger subtitle text */}
          <p className={`text-gray-200 mb-8 leading-relaxed ${
            isMobile ? 'text-lg' : 'text-xl md:text-2xl'
          }`}>
            <span className="block mb-2 font-semibold text-blue-300 text-xl md:text-3xl">
              Professional Pressure Washing Services
            </span>
            {t("Licensed • Insured • 5-Star Rated")}
            <br />
            {t("Same-Day Quotes • Satisfaction Guaranteed")}
          </p>
        </div>

        {/* Trust Badges */}
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-wrap justify-center gap-4'} mb-8`}>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">✅ Fully Insured & Licensed</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">⭐ 5-Star Rated Service</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">🏠 Locally Owned</span>
          </div>
        </div>

        {/* Quick Quote Form */}
        <div className={`bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-md mx-auto ${
          isMobile ? 'text-sm' : 'text-base'
        }`}>
          <h3 className="text-gray-900 font-bold text-xl mb-4">Get Your Free Quote</h3>
          
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder={ghostText}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="text-gray-900 border-gray-300 focus:border-blue-500"
              />
            </div>
            
            <Button 
              onClick={handleGetQuote}
              className="w-full bg-bc-red hover:bg-red-700 text-white font-bold py-3 text-lg"
              size="lg"
            >
              Get Instant Pricing →
            </Button>
          </div>
          
          <p className="text-gray-600 text-sm mt-3 text-center">
            Response within 1 business day
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className={`${isMobile ? 'space-y-3' : 'flex gap-4 justify-center'} mt-8`}>
          <Button 
            asChild
            variant="outline" 
            className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
            size="lg"
          >
            <a href="tel:7788087620">📞 Call Us Now</a>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
            size="lg"
          >
            <Link to="/contact">💬 Chat With Us</Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-8">
          <p className="text-gray-300 text-sm">
            📧 Save Our Contact Info
          </p>
          <Button 
            asChild
            variant="link" 
            className="text-blue-300 hover:text-blue-200 underline mt-2"
          >
            <a href="/contact" download>
              Download Contact Info
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
