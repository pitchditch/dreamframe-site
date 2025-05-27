
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const linkClass = `hover:text-bc-red transition-colors ${
    isOverVideo ? 'text-white hover:text-bc-red' : 'text-gray-700 hover:text-bc-red'
  }`;

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-6">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className={linkClass}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-transparent ${linkClass}`}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
              <div className="grid gap-3">
                <Link
                  to="/services/window-cleaning"
                  className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="font-medium">Window Cleaning</div>
                  <div className="text-sm text-gray-600">Crystal clear, streak-free windows</div>
                </Link>
                <Link
                  to="/services/pressure-washing"
                  className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="font-medium">Pressure Washing</div>
                  <div className="text-sm text-gray-600">Restore your home's exterior</div>
                </Link>
                <Link
                  to="/services/gutter-cleaning"
                  className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="font-medium">Gutter Cleaning</div>
                  <div className="text-sm text-gray-600">Protect your property from water damage</div>
                </Link>
                <Link
                  to="/services/roof-cleaning"
                  className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="font-medium">Roof Cleaning</div>
                  <div className="text-sm text-gray-600">Remove moss, algae & stains</div>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/calculator" className={linkClass}>
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-transparent ${linkClass}`}>
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48">
              <div className="grid gap-1">
                <Link
                  to="/equipment"
                  className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                >
                  Equipment
                </Link>
                <Link
                  to="/testimonials"
                  className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                >
                  Testimonials
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                >
                  Contact
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { NavbarDesktop };
