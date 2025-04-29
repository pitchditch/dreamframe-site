
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
  const triggerColor = isScrolled ? 'bg-white' : (isOverVideo ? 'bg-transparent' : 'bg-white');

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
                className={`text-xl ${textColor} ${hoverColor} ${triggerColor}`}
              >
                {t('Residential')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-white">
                  <NavLink to="/services/window-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/793fb1e6-0b4c-47c1-943e-c9d030105d51.png"
                        alt="Window Cleaning Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/77f10df6-6f51-4587-8315-7bb702183f0a.png"
                        alt="House Washing Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('House Washing')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/gutter-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/72e900ed-395f-4bce-ac6d-497e2b58eaf9.png"
                        alt="Gutter Cleaning Icon"
                        className="w-12 h-12"
                      />
                      <span>{t('Gutter Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/roof-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/lovable-uploads/da1ceab7-b248-4f75-9a08-09f4ed6a1bf7.png"
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
                className={`text-xl ${textColor} ${hoverColor} ${triggerColor}`}
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
