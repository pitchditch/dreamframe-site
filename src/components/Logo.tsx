
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
  
  // Same size for both logos
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
          // White logo for hero section
          <img
            src="/lovable-uploads/3161ca6e-9a0c-4915-87c6-e21f8d3282e4.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[400px] md:max-w-[500px] hover:scale-105 duration-300`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black logo for after hero section
          <img
            src="/lovable-uploads/1b56d472-a76b-4691-b0ef-4513152966ae.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? mobileLogoHeight : desktopLogoHeight} object-contain max-w-[400px] md:max-w-[500px] hover:scale-105 duration-300`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
