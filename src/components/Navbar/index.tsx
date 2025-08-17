
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  // Pages with hero sections
  const heroPages = [
    '/', 
    '/why-us', 
    '/services/gutter-cleaning', 
    '/services/roof-cleaning',
    '/services/window-cleaning',
    '/services/pressure-washing',
    '/services/post-construction-window-cleaning',
    '/services/commercial-window-cleaning',
    '/services/commercial-pressure-washing',
    '/vancouver-window-cleaning',
    '/contact'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      
      // Check if we're in a hero section area
      const isInHeroArea = heroPages.includes(location.pathname) && currentScrollY < heroHeight;
      
      setIsOverVideo(isInHeroArea);
      setIsScrolled(currentScrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    
    // Set initial state for hero pages
    const isHeroPage = heroPages.includes(location.pathname);
    setIsOverVideo(isHeroPage);
  }, [location.pathname]);

useEffect(() => {
  const el = headerRef.current;
  if (!el) return;
  const setVar = () => {
    document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
  };
  setVar();
  const ro = new ResizeObserver(() => setVar());
  ro.observe(el);
  window.addEventListener('resize', setVar);
  window.addEventListener('orientationchange', setVar);
  return () => {
    ro.disconnect();
    window.removeEventListener('resize', setVar);
    window.removeEventListener('orientationchange', setVar);
  };
}, [isMenuOpen]);

const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if we're on gutter cleaning page for special blue background
  const isGutterCleaningPage = location.pathname === '/services/gutter-cleaning';

  return (
    <header ref={headerRef} className="site-header sticky top-0 w-full z-[1000] transition-all duration-300 bg-transparent min-h-[60px] md:min-h-[72px] h-auto">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Logo isOverVideo={isOverVideo} />
        <NavbarDesktop isOverVideo={isOverVideo} />
        {/* Show hamburger menu: mobile always, desktop only when not over video (after hero section) */}
        <div className={isOverVideo ? "md:hidden" : ""}>
          <MobileMenuButton isOverVideo={isOverVideo} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
      <NavbarMobile
        isMenuOpen={isMenuOpen}
        isServicesMenuOpen={isServicesMenuOpen}
        setIsServicesMenuOpen={setIsServicesMenuOpen}
        isOverVideo={isOverVideo}
      />
    </header>
  );
};

export default Navbar;
