
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-24 md:h-28">
        <img 
          src={isOverVideo ? "/lovable-uploads/5f4428cc-f150-42a3-bae4-b9b1c624724b.png" : "/lovable-uploads/5f4428cc-f150-42a3-bae4-b9b1c624724b.png"}
          alt="BC Pressure Washing Logo" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};
