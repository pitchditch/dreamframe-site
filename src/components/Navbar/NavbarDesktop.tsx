
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

export const NavbarDesktop = ({ isOverVideo, isScrolled }: { isOverVideo: boolean, isScrolled: boolean }) => {
  const { t } = useTranslation();

  // Color classes based on background
  const textColor = isScrolled ? 'text-gray-800' : (isOverVideo ? 'text-white' : 'text-gray-800');
  const hoverColor = 'hover:text-bc-red';

  return (
    <nav className="hidden md:flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-8">
        <NavLink
          to="/why-us"
          isOverVideo={isOverVideo && !isScrolled}
          className={`text-xl flex items-center gap-2 ${textColor} ${hoverColor}`}
        >
          <User2 className="w-5 h-5" />
          {t('Why Us')}
        </NavLink>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`text-xl ${textColor} ${hoverColor} bg-transparent`}
              >
                {t('Residential')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-white">
                  <NavLink to="/services/window-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/29d21ccd-b0c0-4f29-bc30-5cd60ee028d6.png"
                        alt="Window Cleaning Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/0a2c675b-c5a7-45d4-9c19-c39aa35dc1ab.png"
                        alt="House Washing Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('House Washing')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/gutter-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/2ef683f4-6d18-42c5-b492-a548de62e076.png"
                        alt="Gutter Cleaning Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('Gutter Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/roof-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/fc2201df-4a6c-4643-94f1-45d2ef36f407.png"
                        alt="Roof Cleaning Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('Roof Cleaning')}</span>
                    </div>
                  </NavLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`text-xl ${textColor} ${hoverColor} bg-transparent`}
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

      <div className="flex flex-col gap-2 items-end">
        <div className="flex items-center gap-6">
          <NavLink
            to="/contact"
            isOverVideo={isOverVideo && !isScrolled}
            className={`text-xl ${textColor} ${hoverColor}`}
          >
            {t('Contact')}
          </NavLink>
          <PriceCalculatorOverlay
            buttonText={t("Get a Free Quote")}
            className="bg-bc-red hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition-all"
            showCallJaydenNow
          />
        </div>
      </div>
    </nav>
  );
};
