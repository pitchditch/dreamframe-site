
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className={`relative h-24 md:h-32 ${isOverVideo ? 'drop-shadow-lg' : ''}`}>
        <img 
          src="/lovable-uploads/549a6a71-3c58-4926-bf40-a42ae6a38946.png" 
          alt="BC Pressure Washing Logo" 
          className={`h-full w-auto ${
            isOverVideo 
              ? 'filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' 
              : 'filter drop-shadow-[0_0_3px_rgba(0,0,0,0.2)]'
          }`}
        />
      </div>
    </Link>
  );
};
