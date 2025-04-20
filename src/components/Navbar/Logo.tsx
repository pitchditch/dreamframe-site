
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-16 md:h-20">
        <img 
          src="/lovable-uploads/eab83af5-0478-45a1-be34-6a506f875c71.png"
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};
