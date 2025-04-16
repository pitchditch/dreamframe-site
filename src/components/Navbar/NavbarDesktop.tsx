
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { ServicesDropdown } from './ServicesDropdown';
import { useTranslation } from '@/hooks/use-translation';

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarDesktop = ({ isOverVideo, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarDesktopProps) => {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex items-center gap-8 w-full">
      <NavLink to="/" isOverVideo={isOverVideo} className="text-lg">
        {t('Home')}
      </NavLink>
      
      <div 
        className="relative"
        onMouseEnter={() => setIsServicesMenuOpen(true)}
        onMouseLeave={() => setIsServicesMenuOpen(false)}
      >
        <NavLink to="/services" isOverVideo={isOverVideo} className="text-lg">
          {t('Services')}
        </NavLink>
        <ServicesDropdown isOpen={isServicesMenuOpen} />
      </div>
      
      <NavLink to="/testimonials" isOverVideo={isOverVideo} className="text-lg">
        {t('Testimonials')}
      </NavLink>
      
      <NavLink to="/blog" isOverVideo={isOverVideo} className="text-lg">
        {t('Blog')}
      </NavLink>
      
      <NavLink to="/about" isOverVideo={isOverVideo} className="text-lg">
        {t('About')}
      </NavLink>
      
      <NavLink to="/contact" isOverVideo={isOverVideo} className="text-lg">
        {t('Contact')}
      </NavLink>
    </nav>
  );
};
