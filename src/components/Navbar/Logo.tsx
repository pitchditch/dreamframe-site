
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-16 md:h-20">
        <img 
          src="/lovable-uploads/1fefc311-9770-482d-8e09-8c0cc900175c.png"
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};
