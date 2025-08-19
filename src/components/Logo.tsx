
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  // Bigger logo sizes for hero section
  const mobileLogoHeight = isOverVideo ? 'h-24 w-auto' : 'h-24 w-auto'; 
  const desktopLogoHeight = isOverVideo ? 'h-40 md:h-44 w-auto' : 'h-36 md:h-40 w-auto';
  
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
          // White logo for hero section - using the existing white logo
          <img
            src="/lovable-uploads/93a40245-243c-48fb-8888-cb43c5bed511.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[380px] md:max-w-[500px] hover:scale-105 duration-300`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black logo for scrolled state with white background
          <img
            src="/lovable-uploads/bb66ae07-493a-41df-8f82-f988949e2a7a.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[380px] md:max-w-[500px] hover:scale-105 duration-300`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
