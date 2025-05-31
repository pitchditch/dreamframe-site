
import React, { useState, useEffect } from 'react';

interface WindowCleaningStickyNavProps {
  activeSection: string;
}

const WindowCleaningStickyNav = ({ activeSection }: WindowCleaningStickyNavProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const shouldBeVisible = window.scrollY > heroHeight - 100;
      
      setIsVisible(shouldBeVisible);
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to hide during scroll
      const newTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      setScrollTimeout(newTimeout);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'get-quote', label: 'Get a Quote' }
  ];

  if (!isVisible) return null;

  return (
    <nav className={`fixed top-16 left-0 right-0 bg-white shadow-md z-40 border-b transition-transform duration-300 ${
      isScrolling ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 py-3 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === item.id
                  ? 'bg-bc-red text-white'
                  : 'text-gray-600 hover:text-bc-red hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default WindowCleaningStickyNav;
