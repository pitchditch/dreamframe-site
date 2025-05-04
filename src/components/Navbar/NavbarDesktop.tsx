
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const mainNavLinkClassName = `transition-colors font-medium px-3 py-2 rounded-md text-lg ${
    isOverVideo ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
  }`;

  return (
    <nav className="hidden lg:flex items-center w-full justify-between">
      <div className="flex-1"></div>
      <NavigationMenu className="flex-1 flex justify-center">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem>
            <Link to="/why-us" className={mainNavLinkClassName}>Why Us</Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className={isOverVideo ? 'text-white text-lg font-medium' : 'text-gray-800 text-lg font-medium'}>Residential Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] bg-white p-4 rounded-lg shadow-lg grid grid-cols-2 gap-3">
                <Link to="/services/window-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/7fa0104e-36e2-445b-8e02-acb214231c27.png" alt="Window Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Window Cleaning</h4>
                      <p className="text-sm text-gray-600">Professional cleaning for crystal-clear windows</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/pressure-washing" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/4f5100f2-42bb-471b-aad7-f0700e9a1cab.png" alt="House Washing Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">House Washing</h4>
                      <p className="text-sm text-gray-600">Restore your property's curb appeal</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/gutter-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/fe37717f-5fc0-4f4d-9b7c-943b7d4c734f.png" alt="Gutter Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Gutter Cleaning</h4>
                      <p className="text-sm text-gray-600">Keep your gutters flowing freely</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/roof-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/a8be056c-8537-4e17-9559-6514a98817f0.png" alt="Roof Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Roof Cleaning</h4>
                      <p className="text-sm text-gray-600">Remove moss and debris from your roof</p>
                    </div>
                  </div>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className={isOverVideo ? 'text-white text-lg font-medium' : 'text-gray-800 text-lg font-medium'}>Commercial Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg">
                <Link to="/services/commercial-window-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/6d229797-2f4e-4913-b90f-6ee2a95ca9f4.png" alt="Commercial Window Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Commercial Window Cleaning</h4>
                      <p className="text-sm text-gray-600">Professional cleaning for business properties</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/commercial-pressure-washing" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/abc92e05-fffa-4cad-bb3c-94b74a37bfde.png" alt="Commercial Pressure Washing Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Commercial Pressure Washing</h4>
                      <p className="text-sm text-gray-600">Exterior cleaning for commercial buildings</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/post-construction-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-amber-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                      <img src="/lovable-uploads/6d229797-2f4e-4913-b90f-6ee2a95ca9f4.png" alt="Post-Construction Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Post-Construction Cleaning</h4>
                      <p className="text-sm text-gray-600">Cleanup after construction projects</p>
                    </div>
                  </div>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/contact" className={mainNavLinkClassName}>Contact</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex-1 flex justify-end">
        <a 
          href="tel:7788087620" 
          className={`px-5 py-3 rounded-lg transition-all font-semibold ${
            isOverVideo 
              ? 'bg-bc-red hover:bg-red-700 text-white' 
              : 'bg-bc-red hover:bg-red-700 text-white'
          }`}
        >
          Call: 778-808-7620
        </a>
      </div>
    </nav>
  );
};
