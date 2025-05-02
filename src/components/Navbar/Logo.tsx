
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
          minWidth: '340px',
          maxWidth: '640px',
        }}
      >
        {isOverVideo ? (
          <img
            src="/lovable-uploads/1e4637e9-3c44-48a5-8e0b-42c5bd2bbf2e.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain"
            style={{
              maxWidth: '640px',
              minHeight: '120px',
            }}
          />
        ) : (
          <img
            src="/lovable-uploads/3a3f177c-eaa1-4fad-b228-ae757491ab83.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain"
            style={{
              maxWidth: '640px',
              minHeight: '120px',
            }}
          />
        )}
      </div>
    </Link>
  );
};
