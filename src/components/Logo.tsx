
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  console.log('🏢 Logo rendering, isOverVideo:', isOverVideo);
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  // Much bigger logo sizes for better visibility
  const mobileLogoHeight = 'h-20 w-auto'; 
  const desktopLogoHeight = 'h-28 md:h-32 w-auto';
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Link to="/" className="flex items-center mr-auto z-20">
      <div className="relative flex items-center transition-all duration-300 pt-2">
        {isOverVideo ? (
          // White logo for hero section - using the new white logo
          <img
            src="/lovable-uploads/0982cdd6-c37b-41b9-972a-20552b7afc63.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[500px] md:max-w-[600px] hover:scale-105 duration-300`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/e5143f6d-bcbe-4457-9c44-4ec4be942d89.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[500px] md:max-w-[600px] hover:scale-105 duration-300`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
