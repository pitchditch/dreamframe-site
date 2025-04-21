
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-28 md:h-36" /* Increased height for bigger logo */>
        <img 
          src={isOverVideo ? "/lovable-uploads/5e03eec6-7937-4b27-a84d-0fc9bc66ed91.png" : "/lovable-uploads/5e03eec6-7937-4b27-a84d-0fc9bc66ed91.png"}
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto object-contain drop-shadow-lg"
          style={{ maxWidth: '280px', minHeight: '75px' }}
        />
      </div>
    </Link>
  );
};

