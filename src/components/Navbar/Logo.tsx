
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className={`relative h-28 md:h-40`}>
        <img 
          src="/lovable-uploads/399e6409-cd3a-4e06-b32b-2cc200af55dc.png"
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
};
