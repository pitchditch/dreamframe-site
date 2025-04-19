
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-16 md:h-20">
        <img 
          src="/lovable-uploads/fbcf9fa3-ba8c-4f34-8f45-6b9b5b4ef906.png"
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
};
