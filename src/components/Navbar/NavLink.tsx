
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  isOverVideo: boolean;
  children: React.ReactNode;
}

export const NavLink = ({ to, isOverVideo, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`transition-all duration-300 hover:scale-110 ${
        isOverVideo 
        ? 'text-white hover:text-bc-red hover:text-shadow-white text-shadow-sm' 
        : `text-gray-700 hover:text-bc-red hover:text-shadow-dark ${isActive ? 'font-medium text-bc-red' : ''}`
      }`}
    >
      {children}
    </Link>
  );
};

// Add a default export that simply re-exports the named export
export default NavLink;
