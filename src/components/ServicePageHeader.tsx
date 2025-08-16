import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface ServicePageHeaderProps {
  isOverVideo?: boolean;
}

export const ServicePageHeader = ({ isOverVideo = true }: ServicePageHeaderProps) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Show white logo when over video and not scrolled, black logo otherwise
  const showWhiteLogo = isOverVideo && !scrolled;

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between p-4">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={showWhiteLogo ? "/lovable-uploads/0e524165-9056-4613-8af0-bbb88f7a28d0.png" : "/lovable-uploads/9a07ca7b-91d5-4fe4-b0e8-33448270aa23.png"}
          alt="BC Pressure Washing Property Maintenance logo"
          className="h-16 w-auto object-contain hover:scale-105 duration-300"
          style={showWhiteLogo ? { filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' } : {}}
        />
      </Link>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate('/')}
          variant={showWhiteLogo ? "outline" : "secondary"}
          size="sm"
          className={`transition-all duration-300 hover:scale-105 font-semibold ${
            showWhiteLogo
              ? 'border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        
        <Button
          onClick={handleBackClick}
          variant={showWhiteLogo ? "outline" : "secondary"}
          size="sm"
          className={`transition-all duration-300 hover:scale-105 font-semibold ${
            showWhiteLogo
              ? 'border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default ServicePageHeader;