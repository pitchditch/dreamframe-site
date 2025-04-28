
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const location = useLocation();
  const isWindowCleaningPage = location.pathname === '/services/window-cleaning';

  if (isWindowCleaningPage && isOverVideo) {
    return null;
  }

  return (
    <Link to="/" className="flex items-center">
      <img
        src="/lovable-uploads/90d03469-fbd4-46a3-aed4-6884bf32c994.png"
        alt="BC Pressure Washing Logo"
        className="h-16 w-auto"
      />
    </Link>
  );
};
