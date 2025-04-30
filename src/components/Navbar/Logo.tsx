
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const Logo = ({ isOverVideo, isScrolled }: LogoProps) => {
  // Use white logo when over video and not scrolled, otherwise use black logo
  const logoSrc = isScrolled 
    ? "/lovable-uploads/de410af0-fb0a-4e0f-8443-e62fb8ab5095.png" 
    : (isOverVideo 
        ? "/lovable-uploads/c9a98dc4-52bc-424c-83d5-05456902d442.png" 
        : "/lovable-uploads/de410af0-fb0a-4e0f-8443-e62fb8ab5095.png");

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
