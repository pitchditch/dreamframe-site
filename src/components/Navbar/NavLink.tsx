
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
      className={`transition-all duration-200 px-3 py-1 rounded-md hover:scale-110 ${
        isOverVideo 
        ? 'text-white hover:text-bc-red hover:text-shadow-white text-shadow-sm hover:bg-white/90' 
        : `text-gray-700 hover:text-bc-red hover:text-shadow-dark hover:bg-gray-100 ${isActive ? 'font-medium text-bc-red' : ''}`
      }`}
    >
      {children}
    </Link>
  );
};
