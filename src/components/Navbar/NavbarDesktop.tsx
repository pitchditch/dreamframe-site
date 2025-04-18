
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
    <nav className="hidden md:flex items-center justify-between w-full">
      <div className="flex-1" />
      <div className="flex items-center gap-32 justify-start flex-1 ml-12">
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

      <div className="flex items-center gap-6 flex-1 justify-end">
        <a 
          href="tel:7788087620" 
          className={`flex items-center gap-2 ${isOverVideo ? 'text-white' : 'text-black'} hover:text-bc-red transition-colors whitespace-nowrap text-2xl md:text-3xl`}
        >
          <Phone className="w-6 h-6" />
          778-808-7620
        </a>
        <PriceCalculatorOverlay 
          buttonText="Contact Us" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg font-medium" 
        />
      </div>
    </nav>
  );
};
