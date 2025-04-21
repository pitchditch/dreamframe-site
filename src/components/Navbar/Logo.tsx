
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  // Always use original logo for navbar, as before
  return (
    <Link to="/" className="flex items-center">
      <div
        className="relative h-24 md:h-32 flex items-center"
        style={{
          minWidth: '180px',
          maxWidth: '320px',
        }}
      >
        <img
          src="/lovable-uploads/0349dfb1-14e8-4659-bd93-89bc41c2fd53.png"
          alt="BC Pressure Washing Logo"
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

