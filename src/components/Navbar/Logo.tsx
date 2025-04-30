
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const Logo = ({ isOverVideo, isScrolled }: LogoProps) => {
  // Use white logo when over video and not scrolled, otherwise use black logo
  const logoSrc = isScrolled 
    ? "/lovable-uploads/20f8128e-13a1-4d4e-8b25-a6a9bd50a2d9.png" 
    : (isOverVideo 
        ? "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png" 
        : "/lovable-uploads/20f8128e-13a1-4d4e-8b25-a6a9bd50a2d9.png");

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
