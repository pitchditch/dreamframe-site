
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
        src={isScrolled ? "/lovable-uploads/91a0791c-9a57-45d1-bfae-2bced2dcc76f.png" : (isOverVideo ? "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png" : "/lovable-uploads/91a0791c-9a57-45d1-bfae-2bced2dcc76f.png")}
        alt="BC Pressure Washing Logo"
        className="h-24 w-auto object-contain" // Increased height from h-20 to h-24
      />
    </Link>
  );
};
