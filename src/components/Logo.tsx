
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  
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
            src="/lovable-uploads/1edc739e-5915-4a90-b1f6-24953254b50a.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-12 md:h-16 w-auto object-contain hover:scale-105 duration-300"
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black logo for scrolled state with white background
          <img
            src="/lovable-uploads/0fae907b-f9d4-4c1e-8d10-5cd41df6cda7.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-12 md:h-16 w-auto object-contain hover:scale-105 duration-300"
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
