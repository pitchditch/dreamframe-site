
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  // Increased logo sizes by 40% from previous size (20% more than last increase)
  const mobileLogoHeight = isOverVideo ? 'h-16 w-auto' : 'h-16 w-auto'; 
  const desktopLogoHeight = isOverVideo ? 'h-24 md:h-28 w-auto' : 'h-24 md:h-28 w-auto';
  
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
          // White logo for hero section - using the uploaded white logo
          <img
            src="/lovable-uploads/d25c20f5-2fcf-4567-b063-eed5c674e3bd.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[340px] md:max-w-[450px] hover:scale-105 duration-300`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[340px] md:max-w-[450px] hover:scale-105 duration-300`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
