
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-16 md:h-20">
        <img 
          src="/lovable-uploads/876a175e-9455-4fa7-b10f-4b33777000e5.png"
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
};
