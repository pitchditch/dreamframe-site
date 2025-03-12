
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${isOverVideo ? 'text-white' : ''}`}>
      <span className="text-2xl font-bold text-bc-red">BC</span>
      <span className={`text-lg font-medium ${isOverVideo ? 'text-white' : ''}`}>Pressure Washing</span>
    </Link>
  );
};
