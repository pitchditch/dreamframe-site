
import React, { useState, useEffect } from 'react';
import HeroSection from './home/HeroSection';

interface HeroWithContentProps {
  children: React.ReactNode;
}

const HeroWithContent = ({ children }: HeroWithContentProps) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

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

  return (
    <div className="relative">
      {/* Hero Section with Video + Price Calculator */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
        <HeroSection />
      </div>
      
      {/* Loading overlay */}
      {!heroLoaded && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
      
      {/* Content that slides over the hero */}
      <div 
        className={`relative z-40 transition-opacity duration-500 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{ marginTop: '100vh' }}
      >
        {/* Property Types Section - Fixed background like hero */}
        <div className="fixed top-0 left-0 w-full h-screen z-30 overflow-hidden">
          <div className="relative h-full">
            {React.Children.toArray(children).find((child: any) => 
              child?.type?.name === 'PropertyTypesSection'
            )}
          </div>
        </div>
        
        {/* Rest of content that slides over */}
        <div 
          className="bg-white rounded-t-3xl shadow-2xl -mt-24 md:-mt-32 min-h-screen relative z-50"
          style={{ marginTop: '200vh' }}
        >
          {React.Children.toArray(children).filter((child: any) => 
            child?.type?.name !== 'PropertyTypesSection'
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroWithContent;
