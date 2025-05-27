
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
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">BC Pressure Washing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-bc-red transition-colors font-medium ${
                  location.pathname === item.href ? 'text-bc-red' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-bc-red transition-colors font-medium">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-white border border-gray-200 shadow-lg rounded-md"
                align="center"
                sideOffset={0}
              >
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Phone Number */}
            <a
              href="tel:7788087620"
              className="flex items-center bg-bc-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone size={16} className="mr-2" />
              (778) 808-7620
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-bc-red"
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
