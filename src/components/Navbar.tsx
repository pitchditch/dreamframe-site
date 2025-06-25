
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import ServicesDropdown from './Navbar/ServicesDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Determine if we're over video content (for color changes)
  const isOverVideo = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const textColor = isOverVideo && !isScrolled ? 'text-white' : 'text-gray-700';
  const hoverColor = isOverVideo && !isScrolled ? 'hover:text-bc-red' : 'hover:text-bc-red';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : isOverVideo ? 'bg-transparent' : 'bg-white'
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
            <span className={`text-xl font-bold ${textColor}`}>BC Pressure Washing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium ${
                  location.pathname === item.href ? 'text-bc-red' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <ServicesDropdown isOverVideo={isOverVideo && !isScrolled} />

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
            className={`md:hidden ${textColor} ${hoverColor} transition-transform duration-200 hover:scale-110`}
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
              
              {/* Mobile Services Links */}
              <div className="border-t pt-2 mt-2">
                <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Services</div>
                <Link to="/services/window-cleaning" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Window Cleaning</Link>
                <Link to="/services/gutter-cleaning" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Gutter Cleaning</Link>
                <Link to="/services/house-soft-wash" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>House Soft Wash</Link>
                <Link to="/services/roof-cleaning" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Roof Cleaning</Link>
                <Link to="/services/pressure-washing" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Pressure Washing</Link>
                <Link to="/services/fence-washing" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Fence Washing</Link>
                <Link to="/services/deck-cleaning" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Deck Cleaning</Link>
                <Link to="/services/driveway-cleaning" className="block px-3 py-2 text-gray-700 hover:text-bc-red transition-colors" onClick={() => setIsOpen(false)}>Driveway Cleaning</Link>
                <Link to="/services" className="block px-3 py-2 text-bc-red font-medium" onClick={() => setIsOpen(false)}>View All Services</Link>
              </div>
              
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
