
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
          minWidth: '240px', // Increased size (3x bigger)
          maxWidth: '540px', // Increased size (3x bigger)
        }}
      >
        {isOverVideo ? (
          <img
            src="/lovable-uploads/1e4637e9-3c44-48a5-8e0b-42c5bd2bbf2e.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain"
            style={{
              maxWidth: '540px', // Increased size (3x bigger)
              minHeight: '100px', // Increased size
            }}
          />
        ) : (
          <img
            src="/lovable-uploads/b397daa3-36b7-4209-88be-65da124668fa.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className="h-full w-auto object-contain"
            style={{
              maxWidth: '540px', // Increased size (3x bigger)
              minHeight: '100px', // Increased size
            }}
          />
        )}
      </div>
    </Link>
  );
};
