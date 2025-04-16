
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className={`relative h-20 md:h-24 ${isOverVideo ? 'drop-shadow-lg' : ''}`}>
        <img 
          src="/lovable-uploads/8394dd9e-fddc-4ab9-bf15-b4bd364b8c71.png" 
          alt="BC Pressure Washing Logo" 
          className={`h-full w-auto ${
            isOverVideo 
              ? 'filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' 
              : 'filter drop-shadow-[0_0_3px_rgba(0,0,0,0.2)]'
          }`}
        />
        {isOverVideo && (
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm -z-10"></div>
        )}
      </div>
    </Link>
  );
};
