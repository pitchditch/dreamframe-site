
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-20 md:h-24">
        <img 
          src={isOverVideo ? "/lovable-uploads/eab83af5-0478-45a1-be34-6a506f875c71.png" : "/lovable-uploads/1fefc311-9770-482d-8e09-8c0cc900175c.png"}
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};
