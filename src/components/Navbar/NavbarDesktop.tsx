
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
      <NavLink to="/" isOverVideo={isOverVideo}>
        {t('Home')}
      </NavLink>
      
      <div 
        className="relative"
        onMouseEnter={() => setIsServicesMenuOpen(true)}
        onMouseLeave={() => setIsServicesMenuOpen(false)}
      >
        <NavLink 
          to="/services" 
          isOverVideo={isOverVideo}
        >
          {t('Services')}
        </NavLink>
        <ServicesDropdown 
          isOpen={isServicesMenuOpen}
        />
      </div>
      
      <NavLink to="/blog" isOverVideo={isOverVideo}>
        {t('Blog')}
      </NavLink>
      
      <NavLink to="/testimonials" isOverVideo={isOverVideo}>
        {t('Testimonials')}
      </NavLink>
      
      <NavLink to="/about" isOverVideo={isOverVideo}>
        {t('About')}
      </NavLink>
      
      <NavLink to="/contact" isOverVideo={isOverVideo}>
        {t('Contact')}
      </NavLink>
    </nav>
  );
};
