
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
      className={`transition-colors hover:text-bc-red ${
        isOverVideo 
        ? 'text-white hover:text-bc-red hover:text-shadow-white text-shadow-sm' 
        : `text-gray-700 hover:text-bc-red hover:text-shadow-dark ${isActive ? 'font-medium text-bc-red' : ''}`
      }`}
    >
      {children}
    </Link>
  );
};
