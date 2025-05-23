
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import { Star, Box, Wrench } from 'lucide-react';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const mainNavLinkClassName = `transition-colors transition-transform duration-200 font-medium px-4 py-2 rounded-md text-lg whitespace-nowrap hover:scale-110 ${
    isOverVideo ? 'text-white hover:text-bc-red hover:bg-white/10' : 'text-gray-800 hover:text-bc-red hover:bg-gray-100'
  }`;

  return (
    <div className="hidden lg:flex items-center justify-between w-full">
      <div className="w-1/5"></div>
      
      <NavigationMenu className="flex justify-center">
        <NavigationMenuList className="space-x-8">
          <NavigationMenuItem>
            <Link to="/" className={mainNavLinkClassName}>Home</Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/why-us" className={mainNavLinkClassName}>Why Us</Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className={isOverVideo ? 'text-white text-lg font-medium hover:text-bc-red hover:scale-110 transition-transform duration-200' : 'text-gray-800 text-lg font-medium hover:text-bc-red hover:scale-110 transition-transform duration-200'}>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] bg-white p-4 rounded-lg shadow-lg">
                <div className="mb-2 pb-2 border-b border-gray-200">
                  <h3 className="font-medium text-gray-600 mb-1 uppercase text-xs">Residential Services</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/services/window-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png" alt="Window Cleaning Icon" className="w-10 h-10 object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Window Cleaning</h4>
                        <p className="text-sm text-gray-600">Professional cleaning for crystal-clear windows</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/services/pressure-washing" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/5ac75bee-3951-47f2-9a3c-871acaf8f01b.png" alt="House Washing Icon" className="w-10 h-10 object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">House Washing</h4>
                        <p className="text-sm text-gray-600">Restore your property's curb appeal</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" alt="Gutter Cleaning Icon" className="w-10 h-10 object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Gutter Cleaning</h4>
                        <p className="text-sm text-gray-600">Keep your gutters flowing freely</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/services/roof-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png" alt="Roof Cleaning Icon" className="w-10 h-10 object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Roof Cleaning</h4>
                        <p className="text-sm text-gray-600">Remove moss and debris from your roof</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-4 mb-2 pb-2 border-b border-gray-200">
                  <h3 className="font-medium text-gray-600 mb-1 uppercase text-xs">Commercial Services</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/services/commercial-window-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/fe9ad8bf-d5d6-415e-9db8-ebbf40ad6fc5.png" alt="Commercial Window Cleaning Icon" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Commercial Window Cleaning</h4>
                        <p className="text-sm text-gray-600">Professional cleaning for business properties</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/b4303ec4-9120-49a2-8553-835158e0ddea.png" alt="Commercial Pressure Washing Icon" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Commercial Pressure Washing</h4>
                        <p className="text-sm text-gray-600">Exterior cleaning for commercial buildings</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/services/post-construction-window-cleaning" className="group block p-3 rounded-lg hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex items-center justify-center w-12 h-12">
                        <img src="/lovable-uploads/9aaa04e0-6635-47e9-9412-f86e8c9190ce.png" alt="Post-Construction Cleaning Icon" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Post-Construction Cleaning</h4>
                        <p className="text-sm text-gray-600">Cleanup after construction projects</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/services" className="group block p-3 rounded-lg hover:bg-gray-100 bg-gray-50 border border-dashed border-gray-300">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <h4 className="font-medium text-bc-red mb-1">See All Services</h4>
                        <p className="text-sm text-gray-600">View our complete service catalog</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                  <Link to="/compare-prices" className="inline-flex items-center text-bc-red font-medium hover:underline">
                    <Box className="mr-1 h-4 w-4" />
                    Compare Service Packages & Pricing
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className={isOverVideo ? 'text-white text-lg font-medium hover:text-bc-red hover:scale-110 transition-transform duration-200' : 'text-gray-800 text-lg font-medium hover:text-bc-red hover:scale-110 transition-transform duration-200'}>More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[280px] bg-white p-4 rounded-lg shadow-lg">
                <Link to="/testimonials" className="group flex items-center p-3 rounded-lg hover:bg-gray-100">
                  <Star className="h-5 w-5 mr-3 text-bc-red" />
                  <div>
                    <h4 className="font-medium text-gray-900">Testimonials</h4>
                    <p className="text-sm text-gray-600">What our customers say</p>
                  </div>
                </Link>
                <Link to="/equipment" className="group flex items-center p-3 rounded-lg hover:bg-gray-100">
                  <Wrench className="h-5 w-5 mr-3 text-bc-red" />
                  <div>
                    <h4 className="font-medium text-gray-900">Our Equipment</h4>
                    <p className="text-sm text-gray-600">Professional tools we use</p>
                  </div>
                </Link>
                <Link to="/why-us" className="group flex items-center p-3 rounded-lg hover:bg-gray-100">
                  <Box className="h-5 w-5 mr-3 text-bc-red" />
                  <div>
                    <h4 className="font-medium text-gray-900">Why Choose Us</h4>
                    <p className="text-sm text-gray-600">Our quality difference</p>
                  </div>
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 mb-2">Leave a Review</h4>
                  <div className="flex space-x-3">
                    <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                      <img src="/lovable-uploads/c7a06e2a-86f1-4622-81b0-513491105641.png" alt="Google" className="h-6 w-6 object-contain" />
                    </a>
                    <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                      <img src="/lovable-uploads/e8c22c20-e153-4bde-aeb8-f0ae12a4eae0.png" alt="Yelp" className="h-6 w-6 object-contain" />
                    </a>
                    <a href="https://www.bbb.org/ca/bc/white-rock/profile/window-cleaning/bc-pressure-washing-0037-2263134/customer-reviews" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                      <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="BBB" className="h-6 w-6 object-contain" />
                    </a>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/contact" className={mainNavLinkClassName}>Contact</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex justify-end w-1/5">
        <a 
          href="tel:7788087620" 
          className={`px-5 py-3 rounded-lg transition-all font-semibold whitespace-nowrap ${
            isOverVideo 
              ? 'bg-bc-red hover:bg-red-700 text-white' 
              : 'bg-bc-red hover:bg-red-700 text-white'
          }`}
        >
          Call: 778-808-7620
        </a>
      </div>
    </div>
  );
};

export default NavbarDesktop;
