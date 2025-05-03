
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div
        className="relative h-28 flex items-center"
      >
        {isOverVideo ? (
          // White logo for transparent navbar (over video)
          <img
            src="/lovable-uploads/94f816d8-61b2-46e9-8e78-2d7b905d6e62.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain max-w-[280px] min-h-[100px]"
          />
        ) : (
          // Black/red logo for white background
          <img
            src="/lovable-uploads/5ea3206f-5ea1-43fe-a3e5-3714298f4811.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain max-w-[280px] min-h-[100px]"
          />
        )}
      </div>
    </Link>
  );
};
