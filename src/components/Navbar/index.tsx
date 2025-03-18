
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
        setIsOverVideo(true); // Make it transparent when scrolling down
      } else {
        setIsScrolled(false);
        setIsOverVideo(false); // Make it visible when at the top
      }
    };

    // Initialize on mount - set to visible by default
    setIsOverVideo(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Check for video header when route changes
  useEffect(() => {
    setIsOverVideo(false); // Always start with visible navbar
  }, [location.pathname]);

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isOverVideo 
        ? 'bg-transparent backdrop-blur-sm' 
        : isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo isOverVideo={isOverVideo} />

        <NavbarDesktop 
          isOverVideo={isOverVideo}
          isServicesMenuOpen={isServicesMenuOpen}
          setIsServicesMenuOpen={setIsServicesMenuOpen}
        />
        
        <MobileMenuButton 
          isOverVideo={isOverVideo}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>

      <NavbarMobile 
        isMenuOpen={isMenuOpen}
        isServicesMenuOpen={isServicesMenuOpen}
        setIsServicesMenuOpen={setIsServicesMenuOpen}
      />
    </header>
  );
};

export default Navbar;
