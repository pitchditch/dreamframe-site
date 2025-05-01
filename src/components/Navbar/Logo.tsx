
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div
        className="relative h-20 flex items-center"
        style={{
          minWidth: '180px',
          maxWidth: '320px',
        }}
      >
        {isOverVideo ? (
          <img
            src="/lovable-uploads/228f6edc-1fa8-49ea-a238-7834839e9829.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain"
            style={{
              maxWidth: '320px',
              minHeight: '70px',
            }}
          />
        ) : (
          <img
            src="/lovable-uploads/11de9343-a9b0-48b8-b747-d18318f16d86.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain"
            style={{
              maxWidth: '320px',
              minHeight: '70px',
            }}
          />
        )}
      </div>
    </Link>
  );
};
