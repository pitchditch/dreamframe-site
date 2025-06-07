
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  // Force logo to show based on state
  const logoSrc = isOverVideo 
    ? "/lovable-uploads/00f3f3d9-15e1-46f2-99c3-535d8e667e35.png"
    : "/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png";

  return (
    <Link to="/" className="flex items-center space-x-3">
      <img 
        src={logoSrc}
        alt="BC Pressure Washing Logo" 
        className="h-16 md:h-20 w-auto transition-all duration-300 hover:scale-105"
        style={{ filter: isOverVideo ? 'brightness(1.1)' : 'none' }}
      />
    </Link>
  );
};

export default Logo;
