
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  // Use new logo image everywhere for navbar (ignore isOverVideo)
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
          src="/lovable-uploads/6cea99ac-8a33-4733-aecc-6a92b14a0d7a.png"
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
