
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-24 md:h-28 flex items-center transition-all duration-300">
        {isOverVideo ? (
          // White logo for hero section with transparent background
          <img
            src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-20 md:h-24 w-auto object-contain max-w-[350px] transition-transform hover:scale-105 duration-300"
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-20 md:h-24 w-auto object-contain max-w-[350px] transition-transform hover:scale-105 duration-300"
          />
        )}
      </div>
    </Link>
  );
};
