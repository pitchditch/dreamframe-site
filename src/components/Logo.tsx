
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center mr-auto">
      <div className="relative h-36 md:h-40 flex items-center transition-all duration-300">
        {isOverVideo ? (
          // White logo for hero section with transparent background
          <img
            src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-36 md:h-40 w-auto object-contain max-w-[420px] transition-transform hover:scale-105 duration-300"
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-36 md:h-40 w-auto object-contain max-w-[420px] transition-transform hover:scale-105 duration-300"
          />
        )}
      </div>
    </Link>
  );
};
