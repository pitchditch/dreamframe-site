
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-bc-red">BC</span>
          <span className="text-lg font-medium">Pressure Washing</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-gray-700 hover:text-bc-red transition-colors ${isActive('/') ? 'font-medium text-bc-red' : ''}`}
          >
            Home
          </Link>
          <div className="relative group">
            <button 
              className={`flex items-center text-gray-700 hover:text-bc-red transition-colors ${
                isActive('/services') || location.pathname.includes('/services/') ? 'font-medium text-bc-red' : ''
              }`}
              onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            <div 
              className={`service-menu absolute z-10 left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden ${
                isServicesMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <div className="py-2">
                <div className="px-4 py-2 text-sm font-medium text-gray-500">Residential</div>
                <Link to="/services/window-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Window Cleaning</Link>
                <Link to="/services/gutter-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gutter Cleaning</Link>
                <Link to="/services/house-washing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">House Washing</Link>
                <Link to="/services/roof-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Roof Cleaning</Link>
                
                <div className="px-4 py-2 text-sm font-medium text-gray-500 mt-2">Commercial</div>
                <Link to="/services/commercial-window-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Commercial Window Cleaning</Link>
                <Link to="/services/parking-lot-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Parking Lot Cleaning</Link>
              </div>
            </div>
          </div>
          <Link 
            to="/about" 
            className={`text-gray-700 hover:text-bc-red transition-colors ${isActive('/about') ? 'font-medium text-bc-red' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/testimonials" 
            className={`text-gray-700 hover:text-bc-red transition-colors ${isActive('/testimonials') ? 'font-medium text-bc-red' : ''}`}
          >
            Testimonials
          </Link>
          <Link 
            to="/contact" 
            className={`text-gray-700 hover:text-bc-red transition-colors ${isActive('/contact') ? 'font-medium text-bc-red' : ''}`}
          >
            Contact
          </Link>
        </nav>
        
        <Link to="/contact" className="hidden md:block">
          <button className="btn-primary">Get a Quote</button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-gray-700 hover:text-bc-red"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <button 
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${
                isActive('/services') || location.pathname.includes('/services/') 
                  ? 'bg-bc-red text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isServicesMenuOpen && (
              <div className="pl-4">
                <div className="py-2 text-sm font-medium text-gray-500">Residential</div>
                <Link to="/services/window-cleaning" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Window Cleaning</Link>
                <Link to="/services/gutter-cleaning" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Gutter Cleaning</Link>
                <Link to="/services/house-washing" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">House Washing</Link>
                <Link to="/services/roof-cleaning" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Roof Cleaning</Link>
                
                <div className="py-2 text-sm font-medium text-gray-500 mt-2">Commercial</div>
                <Link to="/services/commercial-window-cleaning" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Commercial Window Cleaning</Link>
                <Link to="/services/parking-lot-cleaning" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Parking Lot Cleaning</Link>
              </div>
            )}
            
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/about') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            <Link 
              to="/testimonials" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/testimonials') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Testimonials
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/contact') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-3"
            >
              <button className="btn-primary w-full">Get a Quote</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
