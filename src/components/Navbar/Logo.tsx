
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className={`relative h-20 md:h-24 ${isOverVideo ? 'drop-shadow-lg' : ''}`}>
        <img 
          src="/lovable-uploads/dcb2a9fb-bf21-4abb-a08d-49a6e1969711.png" 
          alt="BC Pressure Washing Logo" 
          className={`h-full w-auto ${
            isOverVideo 
              ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
              : 'filter drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]'
          }`}
        />
        {isOverVideo && (
          <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm -z-10"></div>
        )}
      </div>
    </Link>
  );
};
