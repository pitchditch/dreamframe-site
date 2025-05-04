
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className="flex items-center mr-auto">
      <div className={`relative ${isMobile ? 'h-20 md:h-40' : 'h-36 md:h-40'} flex items-center transition-all duration-300`}>
        {isOverVideo ? (
          // White logo for hero section with transparent background
          <img
            src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? 'h-20 md:h-40' : 'h-36 md:h-40'} w-auto object-contain max-w-[420px] transition-transform hover:scale-105 duration-300`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`${isMobile ? 'h-20 md:h-40' : 'h-36 md:h-40'} w-auto object-contain max-w-[420px] transition-transform hover:scale-105 duration-300`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
