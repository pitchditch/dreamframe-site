
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const moreItems = [
    { name: 'Calculator', href: '/calculator' },
    { name: 'Equipment', href: '/equipment' },
    { name: 'Compare Prices', href: '/compare-prices' },
    { name: 'Compare Services', href: '/compare-services' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9773afa1-26cf-4788-ade6-2da27716dd3d.png" 
              alt="BC Pressure Washing Logo" 
              className="h-10 w-auto transition-transform duration-200 hover:scale-110"
            />
            <span className="text-xl font-bold text-gray-900">BC Pressure Washing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-bc-red transition-all duration-200 hover:scale-110 font-medium ${
                  location.pathname === item.href ? 'text-bc-red' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-bc-red transition-all duration-200 hover:scale-110 font-medium">
                More <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 hover:scale-110" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-white border border-gray-200 shadow-lg rounded-md w-80"
                align="center"
                sideOffset={0}
              >
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                
                {/* Review Links Section */}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="px-6 py-2">
                    <h4 className="font-medium text-gray-900 text-sm">Leave a Review</h4>
                    <div className="flex items-center space-x-3 mt-2">
                      <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/c7a06e2a-86f1-4622-81b0-513491105641.png" alt="Google" className="h-6 w-6 object-contain" />
                      </a>
                      <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/e8c22c20-e153-4bde-aeb8-f0ae12a4eae0.png" alt="Yelp" className="h-6 w-6 object-contain" />
                      </a>
                      <a href="https://trustedpros.ca/company/bc-pressure-washing-whiterock" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="https://trustedpros.ca/images/badge/logo-l-b.png" alt="TrustedPros" className="h-6 w-6 object-contain" />
                      </a>
                      <a href="https://www.bbb.org/ca/bc/white-rock/profile/window-cleaning/bc-pressure-washing-0037-2263134/customer-reviews" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="BBB" className="h-6 w-6 object-contain" />
                      </a>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Phone Number */}
            <a
              href="tel:7788087620"
              className="flex items-center bg-bc-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              <Phone size={16} className="mr-2 transition-transform duration-200 hover:scale-110" />
              (778) 808-7620
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-bc-red transition-transform duration-200 hover:scale-110"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {moreItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:7788087620"
                className="block px-3 py-2 text-bc-red font-medium"
                onClick={() => setIsOpen(false)}
              >
                Call (778) 808-7620
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
