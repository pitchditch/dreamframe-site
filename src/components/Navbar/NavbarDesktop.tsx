
import { Link } from "react-router-dom";
import ServicesDropdown from "./ServicesDropdown";
import { Button } from '@/components/ui/button';
import { Logo } from '../Logo';
import { NavLink } from "./NavLink";
import { useTranslation } from '@/hooks/use-translation';
import { CalendarCheck, Users, Star } from 'lucide-react';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto hidden lg:flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <nav className="ml-4">
          <ul className="flex items-center space-x-8">
            <li><NavLink isOverVideo={isOverVideo} to="/">{t("Home")}</NavLink></li>
            <li><ServicesDropdown /></li>
            <li><NavLink isOverVideo={isOverVideo} to="/why-us">{t("Why Us")}</NavLink></li>
            <li><NavLink isOverVideo={isOverVideo} to="/blog">{t("Blog")}</NavLink></li>
            <li>
              <div className="group relative">
                <NavLink isOverVideo={isOverVideo} to="#" className="flex items-center">
                  {t("More")} <span className="ml-1">▾</span>
                </NavLink>
                <div className="absolute left-0 top-full z-50 hidden w-48 rounded-md bg-white shadow-lg group-hover:block">
                  <div className="p-1">
                    <Link 
                      to="/online-booking" 
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <CalendarCheck className="w-4 h-4 mr-2 text-bc-red" />
                      {t("Online Booking")}
                    </Link>
                    <Link 
                      to="/success-stories" 
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <Users className="w-4 h-4 mr-2 text-bc-red" />
                      {t("Success Stories")}
                    </Link>
                    <Link 
                      to="/testimonials" 
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <Star className="w-4 h-4 mr-2 text-bc-red" />
                      {t("Testimonials")}
                    </Link>
                    <Link 
                      to="/referrals" 
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      <span className="w-4 h-4 mr-2 text-bc-red font-bold">$</span>
                      {t("Referral Program")}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li><NavLink isOverVideo={isOverVideo} to="/contact">{t("Contact")}</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button asChild className="rounded-lg" variant="bc-red">
          <a href="tel:7788087620">{t("Call Us: 778-808-7620")}</a>
        </Button>
      </div>
    </div>
  );
};

export default NavbarDesktop;
