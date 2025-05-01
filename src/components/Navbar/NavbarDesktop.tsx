
import { NavLink } from './NavLink';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';
import { Phone, User2 } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const NavbarDesktop = ({ isOverVideo }: { isOverVideo: boolean }) => {
  const { t } = useTranslation();

  // Color classes based on background
  const textColor = isOverVideo ? 'text-white' : 'text-gray-800';
  const hoverColor = 'hover:text-bc-red';

  return (
    <nav className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <NavLink
          to="/why-us"
          isOverVideo={isOverVideo}
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
                      <img src="/lovable-uploads/0889ee32-e298-45b5-91f8-825360447c0b.png" alt="Window Cleaning" className="w-5 h-5" />
                      <span>{t('Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/d5c534e2-91b3-494d-87ca-c141819f0cb5.png" alt="House Washing" className="w-5 h-5" />
                      <span>{t('House Washing')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/gutter-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/7b5d444c-eda2-4e31-91fd-29752d396c29.png" alt="Gutter Cleaning" className="w-5 h-5" />
                      <span>{t('Gutter Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/roof-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/d861c00d-16fc-44e9-9b22-1c7eb64c325a.png" alt="Roof Cleaning" className="w-5 h-5" />
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
                      <img src="/lovable-uploads/0889ee32-e298-45b5-91f8-825360447c0b.png" alt="Commercial Window Cleaning" className="w-5 h-5" />
                      <span>{t('Commercial Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/commercial-pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/d5c534e2-91b3-494d-87ca-c141819f0cb5.png" alt="Commercial Pressure Washing" className="w-5 h-5" />
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
            isOverVideo={isOverVideo}
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
