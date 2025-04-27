
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
      <div
        className="relative h-20 flex items-center"
        style={{
          minWidth: '180px',
          maxWidth: '320px',
        }}
      >
        <img
          src="/lovable-uploads/9e37448c-3cbc-4d0b-ad81-5d95e973c4f5.png"
          alt="BC Pressure Washing Property Maintenance logo"
          className="h-full w-auto object-contain"
          style={{
            maxWidth: '320px',
            minHeight: '70px',
          }}
        />
      </div>
    </Link>
  );
};
