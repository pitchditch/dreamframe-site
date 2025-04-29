
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const Logo = ({ isOverVideo, isScrolled }: LogoProps) => {
  const location = useLocation();
  
  // Use white logo when over hero section and not scrolled, otherwise use black logo
  // The black logo should be used when scrolled OR not over video
  const logoSrc = isScrolled || !isOverVideo
    ? "/lovable-uploads/e41bc027-fa90-4145-85ee-8a7c0c79f44b.png" // Black logo
    : "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png"; // White logo

  return (
    <Link to="/" className="flex items-center">
      <img
        src={logoSrc}
        alt="BC Pressure Washing Logo"
        className="h-48 w-auto object-contain" 
      />
    </Link>
  );
};

export default Logo;
