
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  isOverVideo: boolean;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ to, isOverVideo, children, className = '' }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`relative font-medium transition-all duration-300 hover:scale-110 ${
        isOverVideo 
        ? 'text-white hover:text-bc-red text-shadow-lg font-semibold' // Enhanced text shadow for better visibility over video
        : `text-black hover:text-bc-red ${isActive ? 'font-semibold text-bc-red' : ''}`
      } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-bc-red after:left-0 after:bottom-0 after:transition-all hover:after:w-full ${className}`}
    >
      {children}
    </Link>
  );
};

// Add a default export that simply re-exports the named export
export default NavLink;
