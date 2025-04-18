
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
            {t('Residential')}
          </NavLink>
          <ServicesDropdown isOpen={isServicesMenuOpen} />
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsServicesMenuOpen(true)}
          onMouseLeave={() => setIsServicesMenuOpen(false)}
        >
          <NavLink to="/services/commercial" isOverVideo={isOverVideo} className="text-xl">
            {t('Commercial')}
          </NavLink>
          <ServicesDropdown isOpen={isServicesMenuOpen} />
        </div>
      </div>

      <div className="ml-auto">
        <PriceCalculatorOverlay 
          buttonText="Get a Free Quote" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg font-medium" 
        />
      </div>
    </nav>
  );
};
