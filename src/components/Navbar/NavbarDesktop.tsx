
import { NavLink } from './NavLink';
import { ServicesDropdown } from './ServicesDropdown';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';
import { Phone } from 'lucide-react';

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
        <NavLink to="/services" isOverVideo={isOverVideo} className="text-xl">
          {t('Residential')}
        </NavLink>
        
        <NavLink to="/services/commercial" isOverVideo={isOverVideo} className="text-xl">
          {t('Commercial')}
        </NavLink>

        <NavLink to="/why-us" isOverVideo={isOverVideo} className="text-xl">
          {t('Why Us')}
        </NavLink>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <a 
          href="tel:7788087620" 
          className={`flex items-center gap-2 ${isOverVideo ? 'text-white' : 'text-black'} hover:text-bc-red transition-colors`}
        >
          <Phone className="w-5 h-5" />
          <span className="font-medium">778-808-7620</span>
        </a>
        <PriceCalculatorOverlay 
          buttonText="Get a Free Quote in 30 Seconds" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg font-medium" 
        />
      </div>
    </nav>
  );
};
