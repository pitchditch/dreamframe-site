
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
        src={isOverVideo ? "/lovable-uploads/26e99db5-291b-4771-84dc-f47439bbdd65.png" : "/lovable-uploads/9542fa0e-7710-4d02-aa7c-08df9d78725b.png"}
        alt="BC Pressure Washing Logo"
        className="h-16 w-auto object-contain"
      />
    </Link>
  );
};
