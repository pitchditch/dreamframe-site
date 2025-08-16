
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  // Logo sizes made 40% bigger and consistent between white and black logos
  const mobileLogoHeight = 'h-16 w-auto'; 
  const desktopLogoHeight = 'h-20 md:h-24 w-auto';
  
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
            src="/lovable-uploads/71491691-40a3-4703-a36b-ada0c116ed1e.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[285px] md:max-w-[375px] hover:scale-105 duration-300`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/1f0b984c-dbbe-4783-a61a-1fd251917fda.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[285px] md:max-w-[375px] hover:scale-105 duration-300`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
