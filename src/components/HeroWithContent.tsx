
import { useState, useEffect } from 'react';
import HeroSection from './home/HeroSection';

interface HeroWithContentProps {
  children: React.ReactNode;
}

const HeroWithContent = ({ children }: HeroWithContentProps) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [overlapActive, setOverlapActive] = useState(false);

  useEffect(() => {
    // Wait for hero to load before showing content
    const heroLoadTimer = setTimeout(() => {
      setHeroLoaded(true);
      // Small delay to ensure smooth transition
      setTimeout(() => setContentVisible(true), 300);
    }, 1000);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && contentVisible) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Only observe elements after content is visible
    if (contentVisible) {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));
    }

    return () => {
      clearTimeout(heroLoadTimer);
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, [contentVisible]);

  useEffect(() => {
    const onScroll = () => {
      setOverlapActive(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <HeroSection />
      
      {/* Loading overlay */}
      {!heroLoaded && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
      
      {/* Content below hero with slide-up animation (no negative margins) */}
      <div 
        className={`relative z-30 transition-opacity duration-500 transform transition-transform ${contentVisible ? 'opacity-100' : 'opacity-0'} ${overlapActive ? 'translate-y-0' : 'translate-y-6 md:translate-y-8'}`}
      >
        <div className={`bg-white rounded-t-3xl shadow-2xl min-h-screen relative z-20`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default HeroWithContent;
