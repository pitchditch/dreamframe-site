
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from '@/hooks/use-translation';

const ServicesDropdown = () => {
  const { t } = useTranslation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-none hover:bg-transparent">
          {t("Services")} <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white">
        <DropdownMenuItem asChild>
          <Link to="/services/window-cleaning" className="cursor-pointer">
            {t("Window Cleaning")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/services/pressure-washing" className="cursor-pointer">
            {t("Pressure Washing")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/services/gutter-cleaning" className="cursor-pointer">
            {t("Gutter Cleaning")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/services/roof-cleaning" className="cursor-pointer">
            {t("Roof Cleaning")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/services/commercial-window-cleaning" className="cursor-pointer">
            {t("Commercial Window Cleaning")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/services/commercial-pressure-washing" className="cursor-pointer">
            {t("Commercial Pressure Washing")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/services/post-construction-window-cleaning" className="cursor-pointer">
            {t("Post-Construction Window Cleaning")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/service-comparison" className="cursor-pointer font-semibold text-bc-red">
            {t("Compare Services")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServicesDropdown;
