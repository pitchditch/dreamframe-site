
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Home, Building, Droplets, Window } from "lucide-react";
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
      <DropdownMenuContent align="start" className="w-72 bg-white">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("Residential")}</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to="/services/window-cleaning" className="cursor-pointer flex items-center">
              <Window className="mr-2 h-4 w-4 text-bc-red" />
              {t("Window Cleaning")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/pressure-washing" className="cursor-pointer flex items-center">
              <Droplets className="mr-2 h-4 w-4 text-bc-red" />
              {t("Pressure Washing")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/gutter-cleaning" className="cursor-pointer flex items-center">
              <Home className="mr-2 h-4 w-4 text-bc-red" />
              {t("Gutter Cleaning")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/roof-cleaning" className="cursor-pointer flex items-center">
              <Home className="mr-2 h-4 w-4 text-bc-red rotate-180" />
              {t("Roof Cleaning")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("Commercial")}</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to="/services/commercial-window-cleaning" className="cursor-pointer flex items-center">
              <Building className="mr-2 h-4 w-4 text-bc-red" />
              {t("Commercial Window Cleaning")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/commercial-pressure-washing" className="cursor-pointer flex items-center">
              <Building className="mr-2 h-4 w-4 text-bc-red" />
              {t("Commercial Pressure Washing")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/post-construction-window-cleaning" className="cursor-pointer flex items-center">
              <Building className="mr-2 h-4 w-4 text-bc-red" />
              {t("Post-Construction Window Cleaning")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
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
