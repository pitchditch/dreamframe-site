
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { cn } from '../../lib/utils';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const mainNavLinkClassName = `transition-colors font-medium px-3 py-2 rounded-md text-lg ${
    isOverVideo ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
  }`;

  return (
    <nav className="hidden lg:flex items-center space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className={mainNavLinkClassName}>Home</Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className={isOverVideo ? 'text-white text-lg font-medium' : 'text-gray-800 text-lg font-medium'}>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] bg-white p-4 rounded-lg shadow-lg grid grid-cols-2 gap-3">
                <Link to="/services/window-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Window Cleaning</h4>
                      <p className="text-sm text-gray-600">Professional cleaning for crystal-clear windows</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/pressure-washing" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Pressure Washing</h4>
                      <p className="text-sm text-gray-600">Restore your property's curb appeal</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/gutter-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-100 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Gutter Cleaning</h4>
                      <p className="text-sm text-gray-600">Keep your gutters flowing freely</p>
                    </div>
                  </div>
                </Link>
                <Link to="/services/roof-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-100 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
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
            <Link to="/calculator" className={mainNavLinkClassName}>Get a Quote</Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/about" className={mainNavLinkClassName}>About</Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/contact" className={mainNavLinkClassName}>Contact</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-4">
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
