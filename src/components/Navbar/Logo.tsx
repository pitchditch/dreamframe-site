
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div
        className="relative h-36 md:h-56 flex items-center"
        style={{
          minWidth: '210px',
          maxWidth: '410px',
        }}
      >
        <img
          src="/lovable-uploads/0349dfb1-14e8-4659-bd93-89bc41c2fd53.png"
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
