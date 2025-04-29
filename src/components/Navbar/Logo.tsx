
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const Logo = ({ isOverVideo, isScrolled }: LogoProps) => {
  // Use white logo when over video and not scrolled, otherwise use black logo
  const logoSrc = isScrolled 
    ? "/lovable-uploads/f41b065c-ac9d-4456-a73a-9cd6e30232da.png" 
    : (isOverVideo 
        ? "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png" 
        : "/lovable-uploads/f41b065c-ac9d-4456-a73a-9cd6e30232da.png");

  return (
    <Link to="/" className="flex items-center">
      <img
        src={logoSrc}
        alt="BC Pressure Washing Logo"
        className="h-40 w-auto object-contain" 
      />
    </Link>
  );
};
