
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const Logo = ({ isOverVideo, isScrolled }: LogoProps) => {
  const location = useLocation();
  const isWindowCleaningPage = location.pathname === '/services/window-cleaning';

  if (isWindowCleaningPage && isOverVideo && !isScrolled) {
    return null;
  }

  return (
    <Link to="/" className="flex items-center">
      <img
        src={isScrolled ? "/lovable-uploads/f41b065c-ac9d-4456-a73a-9cd6e30232da.png" : (isOverVideo ? "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png" : "/lovable-uploads/f41b065c-ac9d-4456-a73a-9cd6e30232da.png")}
        alt="BC Pressure Washing Logo"
        className="h-32 w-auto object-contain" // Increased size from h-28 to h-32
      />
    </Link>
  );
};
