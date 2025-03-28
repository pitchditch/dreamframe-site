
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { ServicesDropdown } from './ServicesDropdown';
import { useTranslation } from '@/hooks/use-translation';

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarDesktop = ({
  isOverVideo,
  isServicesMenuOpen, 
  setIsServicesMenuOpen
}: NavbarDesktopProps) => {
  const { t, language } = useTranslation();
  
  // Get language-specific classes for Punjabi and Hindi
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };
  
  return (
    <>
      <nav className={`hidden md:flex items-center space-x-8 ${getLanguageClass()}`}>
        <NavLink to="/" isOverVideo={isOverVideo}>
          {t('Home')}
        </NavLink>
        <ServicesDropdown 
          isOverVideo={isOverVideo} 
          isServicesMenuOpen={isServicesMenuOpen}
          setIsServicesMenuOpen={setIsServicesMenuOpen}
        />
        <NavLink to="/about" isOverVideo={isOverVideo}>
          {t('About')}
        </NavLink>
        <NavLink to="/testimonials" isOverVideo={isOverVideo}>
          {t('Testimonials')}
        </NavLink>
        <NavLink to="/contact" isOverVideo={isOverVideo}>
          {t('Contact')}
        </NavLink>
        <NavLink to="/calculator" isOverVideo={isOverVideo}>
          {t('Price Calculator')}
        </NavLink>
      </nav>
      
      <Link to="/contact" className="hidden md:block">
        <button className={`btn-primary ${getLanguageClass()}`}>{t('Get a Quote')}</button>
      </Link>
    </>
  );
};
