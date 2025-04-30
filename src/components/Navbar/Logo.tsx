
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  // Use white logo for hero sections, black logo elsewhere
  const logoSrc = isOverVideo 
    ? "/lovable-uploads/6cea99ac-8a33-4733-aecc-6a92b14a0d7a.png" 
    : "/lovable-uploads/96ea7343-bc1f-4e90-bf79-830e4591c216.png";
  
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
          src={logoSrc}
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
