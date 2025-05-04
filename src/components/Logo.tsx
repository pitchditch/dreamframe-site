
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const isMobile = useIsMobile();
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Add spin animation effect on page load for mobile
  useEffect(() => {
    if (isMobile) {
      // Set spinning animation after a short delay
      const timer = setTimeout(() => {
        setIsSpinning(true);
        
        // Reset spinning after animation completes
        const resetTimer = setTimeout(() => {
          setIsSpinning(false);
        }, 1500);
        
        return () => clearTimeout(resetTimer);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);
  
  const mobileLogoHeight = isMobile ? 'h-12 md:h-32' : 'h-36 md:h-40';
  const spinClass = isSpinning ? 'animate-spin duration-1000' : '';
  
  return (
    <Link to="/" className="flex items-center mr-auto">
      <div className={`relative ${mobileLogoHeight} flex items-center transition-all duration-300`}>
        {isOverVideo ? (
          // White logo for hero section with transparent background
          <img
            src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${mobileLogoHeight} w-auto object-contain max-w-[320px] md:max-w-[420px] transition-transform hover:scale-105 duration-300 ${spinClass}`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${mobileLogoHeight} w-auto object-contain max-w-[320px] md:max-w-[420px] transition-transform hover:scale-105 duration-300 ${spinClass}`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
