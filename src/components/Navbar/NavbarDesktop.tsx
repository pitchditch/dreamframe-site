
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
      <div 
        className="relative"
        onMouseEnter={() => setIsServicesMenuOpen(true)}
        onMouseLeave={() => setIsServicesMenuOpen(false)}
      >
        <NavLink to="/services" isOverVideo={isOverVideo} className="text-xl">
          {t('Services')}
        </NavLink>
        <ServicesDropdown isOpen={isServicesMenuOpen} />
      </div>
      
      <NavLink to="/testimonials" isOverVideo={isOverVideo} className="text-xl">
        {t('Testimonials')}
      </NavLink>
      
      <NavLink to="/about" isOverVideo={isOverVideo} className="text-xl">
        {t('About')}
      </NavLink>
      
      <NavLink to="/contact" isOverVideo={isOverVideo} className="text-xl">
        {t('Contact')}
      </NavLink>
    </nav>
  );
};
