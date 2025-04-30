
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
          icon={<User2 className="w-5 h-5" />}
        >
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
                      <img src="/lovable-uploads/5b73077f-b551-44dc-9605-1b642b923e9c.png" alt="Window Cleaning Icon" className="w-5 h-5 text-bc-red" />
                      <span>{t('Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/3fd5954c-6554-42f2-8036-c459f4258728.png" alt="House Washing Icon" className="w-5 h-5 text-bc-red" />
                      <span>{t('House Washing')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/gutter-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/79b11aec-2ca6-4d2a-8cb8-a4c8c4cba7f3.png" alt="Gutter Cleaning Icon" className="w-5 h-5 text-bc-red" />
                      <span>{t('Gutter Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/roof-cleaning" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/cb1c7081-e0a4-46fa-97c9-c9c56bc7610c.png" alt="Roof Cleaning Icon" className="w-5 h-5 text-bc-red" />
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
                      <img src="/lovable-uploads/5b73077f-b551-44dc-9605-1b642b923e9c.png" alt="Window Cleaning Icon" className="w-5 h-5 text-bc-red" />
                      <span>{t('Commercial Window Cleaning')}</span>
                    </div>
                  </NavLink>
                  <NavLink to="/services/commercial-pressure-washing" isOverVideo={false}>
                    <div className="flex items-center gap-2">
                      <img src="/lovable-uploads/3fd5954c-6554-42f2-8036-c459f4258728.png" alt="House Washing Icon" className="w-5 h-5 text-bc-red" />
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
