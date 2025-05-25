
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { ServicesDropdown } from './ServicesDropdown';
import { Button } from '../ui/button';
import { useTranslation } from '@/hooks/use-translation';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      {/* Center Navigation */}
      <div className="flex items-center justify-center flex-1 space-x-8">
        <NavLink to="/" isOverVideo={isOverVideo}>{t("Home")}</NavLink>
        <NavLink to="/why-us" isOverVideo={isOverVideo}>{t("Why Us")}</NavLink>
        <ServicesDropdown isOverVideo={isOverVideo} />
        <NavLink to="/contact" isOverVideo={isOverVideo}>{t("More")}</NavLink>
      </div>
      
      {/* Right side CTA */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="bc-red" size="sm" className="rounded-full px-6">
          <Link to="/calculator">{t("Get Quote")}</Link>
        </Button>
      </div>
    </div>
  );
};
