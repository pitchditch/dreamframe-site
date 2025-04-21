
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div
        className="relative h-32 md:h-48" // Increased both mobile/desktop heights for bigger logo
        style={{ minWidth: '160px', maxWidth: '360px' }}
      >
        <img 
          src={isOverVideo ? "/lovable-uploads/5e03eec6-7937-4b27-a84d-0fc9bc66ed91.png" : "/lovable-uploads/5e03eec6-7937-4b27-a84d-0fc9bc66ed91.png"}
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto object-contain drop-shadow-2xl"
          style={{
            maxWidth: '360px',
            minHeight: '80px',
          }}
        />
      </div>
    </Link>
  );
};
