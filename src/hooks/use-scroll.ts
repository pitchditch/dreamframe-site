
import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    
    // Initialize values
    updateScrollPosition();

    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);

  return { scrollY, isScrolled };
}
