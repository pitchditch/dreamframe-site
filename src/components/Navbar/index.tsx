import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

// Standalone pages with dark/image hero sections.
const heroPages = [
  '/',
  '/about',
  '/why-us',
  '/vancouver-window-cleaning',
  '/contact',
  '/maintenance-memberships'
];

const pageHasHero = (pathname: string) => {
  return (
    heroPages.includes(pathname) ||
    pathname.startsWith('/services/') ||
    pathname.startsWith('/locations/') ||
    /-(window-cleaning|pressure-washing)\/?$/.test(pathname)
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(() => pageHasHero(location.pathname));

  useEffect(() => {
    const hasHero = pageHasHero(location.pathname);

    // Use the transparent navbar immediately on hero pages so there is no
    // white-navbar flash before the first scroll measurement completes.
    setIsOverVideo(hasHero);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const explicitHero = document.querySelector('[data-navbar-hero="true"]') as HTMLElement | null;
      const firstMainSection = document.querySelector('main > :first-child') as HTMLElement | null;
      const heroElement = explicitHero ?? firstMainSection;
      const headerElement = document.querySelector('header') as HTMLElement | null;
      const headerHeight = headerElement?.offsetHeight ?? 112;

      const heroBottom = heroElement
        ? heroElement.getBoundingClientRect().bottom + currentScrollY
        : window.innerHeight * 0.8;

      const isInHeroArea =
        hasHero &&
        currentScrollY + headerHeight < heroBottom;

      setIsOverVideo(isInHeroArea);
    };

    const animationFrame = window.requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if we're on gutter cleaning page for special blue background
  const isGutterCleaningPage = location.pathname === '/services/gutter-cleaning';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isOverVideo
        ? isGutterCleaningPage
          ? 'bg-gradient-to-br from-blue-900 to-gray-900 h-28 md:h-36'
          : 'bg-transparent h-28 md:h-36'
        : 'bg-white/95 backdrop-blur-sm h-28 md:h-32'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Logo isOverVideo={isOverVideo} />
        <NavbarDesktop isOverVideo={isOverVideo} />
        <div className="md:hidden">
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
