
import { NavLink } from './NavLink';
import { ServicesDropdown } from './ServicesDropdown';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarDesktop = ({ isOverVideo, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarDesktopProps) => {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex items-center gap-8 w-full">
      <div className="flex items-center gap-8">
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
        
        <NavLink to="/why-us" isOverVideo={isOverVideo} className="text-xl">
          {t('Why Us')}
        </NavLink>
        
        <NavLink to="/contact" isOverVideo={isOverVideo} className="text-xl">
          {t('Contact')}
        </NavLink>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <span className={`text-lg ${isOverVideo ? 'text-white' : 'text-black'}`}>778 808 7620</span>
        <PriceCalculatorOverlay 
          buttonText="Get a Free Quote" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium" 
        />
      </div>
    </nav>
  );
};
