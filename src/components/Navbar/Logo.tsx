
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/105fbc2d-b1cc-452e-bf1d-636a23a1bbe8.png" 
        alt="BC Pressure Washing Logo" 
        className={`h-16 md:h-20 ${isOverVideo ? 'drop-shadow-md' : ''}`}
      />
    </Link>
  );
};
