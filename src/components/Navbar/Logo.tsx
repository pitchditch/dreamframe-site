
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
        src={isScrolled ? "/lovable-uploads/671f3038-2112-4a56-8ad8-a1c0941ff53a.png" : (isOverVideo ? "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png" : "/lovable-uploads/671f3038-2112-4a56-8ad8-a1c0941ff53a.png")}
        alt="BC Pressure Washing Logo"
        className="h-20 w-auto object-contain"
      />
    </Link>
  );
};
