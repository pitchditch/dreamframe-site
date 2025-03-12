
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
      className={`transition-colors ${
        isOverVideo 
        ? 'text-white hover:text-gray-200 text-shadow-sm' 
        : `text-gray-700 hover:text-bc-red ${isActive ? 'font-medium text-bc-red' : ''}`
      }`}
    >
      {children}
    </Link>
  );
};
