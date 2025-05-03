
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-24 flex items-center transition-all duration-300">
        {isOverVideo ? (
          // White logo for hero section with transparent background
          <div className="relative">
            <div className="absolute -inset-1 bg-white/10 rounded-2xl blur-sm"></div>
            <img
              src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png"
              alt="BC Pressure Washing Property Maintenance logo"
              className="h-full w-auto object-contain max-w-[320px] min-h-[100px] relative z-10"
            />
          </div>
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain max-w-[320px] min-h-[100px] transition-transform hover:scale-105 duration-300"
          />
        )}
      </div>
    </Link>
  );
};
