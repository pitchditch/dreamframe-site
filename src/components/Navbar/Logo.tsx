
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
              src="/lovable-uploads/a7e4e4a3-8c7e-43c5-b390-5380515b0cfc.png"
              alt="BC Pressure Washing Property Maintenance logo"
              className="h-full w-auto object-contain max-w-[280px] min-h-[90px] relative z-10"
            />
          </div>
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/f0892337-225e-42c2-ac7d-a256e73b2d5a.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain max-w-[280px] min-h-[90px] transition-transform hover:scale-105 duration-300"
          />
        )}
      </div>
    </Link>
  );
};
