
import { NavLink } from './NavLink';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';
import { Phone, Store, Building, HardHat, User2 } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <NavLink 
          to="/why-us" 
          isOverVideo={isOverVideo}
          className={`text-xl flex items-center gap-2 ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red`}
        >
          <User2 className="w-5 h-5" />
          {t('Why Us')}
        </NavLink>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`text-xl ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red bg-transparent`}
              >
                {t('Residential')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-white">
                  <NavLink to="/services/window-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-bc-red" />
                      <span>{t('Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-bc-red" />
                      <span>{t('House Washing')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/gutter-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <HardHat className="w-5 h-5 text-bc-red" />
                      <span>{t('Gutter Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/roof-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-bc-red" />
                      <span>{t('Roof Cleaning')}</span>
                    </div>
                  </NavLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`text-xl ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red bg-transparent`}
              >
                {t('Commercial')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-white">
                  <NavLink to="/services/commercial-window-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-bc-red" />
                      <span>{t('Commercial Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/commercial-pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-bc-red" />
                      <span>{t('Commercial Pressure Washing')}</span>
                    </div>
                  </NavLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-6">
        <NavLink 
          to="/contact" 
          isOverVideo={isOverVideo}
          className={`text-xl ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red`}
        >
          {t('Contact')}
        </NavLink>

        <a 
          href="tel:7788087620" 
          className={`flex items-center gap-3 ${
            isOverVideo ? 'text-white' : 'text-gray-800'
          } hover:text-bc-red transition-colors`}
        >
          <Phone className="w-7 h-7" />
          <span className="font-mono text-2xl font-semibold">778-808-7620</span>
        </a>

        <PriceCalculatorOverlay 
          buttonText={t("Get a Free Quote")} 
          className="bg-bc-red hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition-all" 
        />
      </div>
    </nav>
  );
};
