import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(true);
  const location = useLocation();

  // Update transparent navbar logic to include dark overlay pages
  useEffect(() => {
    const isTransparentPage = location.pathname === '/' || 
                           location.pathname === '/why-us' || 
                           location.pathname === '/services/roof-cleaning' ||
                           location.pathname === '/services/gutter-cleaning';
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsOverVideo(isTransparentPage && currentScrollY < 60);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isOverVideo ? 'bg-transparent' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-4 flex items-center">
        <Logo isOverVideo={isOverVideo} />
        <div className="flex items-center justify-between flex-1 ml-8">
          <NavbarDesktop isOverVideo={isOverVideo} />
          <MobileMenuButton isOverVideo={isOverVideo} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
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
