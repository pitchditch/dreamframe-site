
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div
        className="relative h-36 md:h-56"
        style={{
          minWidth: '210px',
          maxWidth: '410px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="/lovable-uploads/18bd9fc6-ffb1-4c17-8c5e-0a8a15939ae4.png"
          alt="BC Pressure Washing Logo"
          className="h-full w-auto object-contain drop-shadow-2xl"
          style={{
            maxWidth: '410px',
            minHeight: '90px',
          }}
        />
      </div>
    </Link>
  );
};
