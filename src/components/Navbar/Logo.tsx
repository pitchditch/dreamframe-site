
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className={`relative h-28 md:h-40`}>
        <img 
          src="/lovable-uploads/fb4d1442-537b-41bb-b0d6-670724269f41.png"
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
};
