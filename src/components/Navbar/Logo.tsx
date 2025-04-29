
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const Logo = ({ isOverVideo, isScrolled }: LogoProps) => {
  const location = useLocation();
  const isWindowCleaningPage = location.pathname === '/services/window-cleaning';

  // Hide logo when over video and not scrolled on window cleaning page
  if (isWindowCleaningPage && isOverVideo && !isScrolled) {
    return null;
  }

  // Use white logo when over video and not scrolled, otherwise use black logo
  const logoSrc = isScrolled || !isOverVideo
    ? "/lovable-uploads/f41b065c-ac9d-4456-a73a-9cd6e30232da.png" // black logo
    : "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png"; // white logo

  return (
    <Link to="/" className="flex items-center">
      <img
        src={logoSrc}
        alt="BC Pressure Washing Logo"
        className="h-32 w-auto object-contain"
      />
    </Link>
  );
};
