
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className={`relative h-24 md:h-32 ${isOverVideo ? 'drop-shadow-lg' : ''}`}>
        <img 
          src={isOverVideo ? "/lovable-uploads/c02ae0be-ba68-4c25-b007-25d7b47908a7.png" : "/lovable-uploads/f2cc59aa-8bdd-4a96-9139-c8bbdc2eccf6.png"}
          alt="BC Pressure Washing Logo" 
          className={`h-full w-auto ${
            isOverVideo 
              ? 'filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' 
              : ''
          }`}
        />
      </div>
    </Link>
  );
};
