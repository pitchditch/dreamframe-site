
import React, { useState, useEffect } from 'react';
import { Sparkles, Home, Building } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const StatsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection Observer for satisfaction rate animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const timer = setTimeout(() => {
            const interval = setInterval(() => {
              setSatisfactionRate(prev => {
                if (prev >= 100) {
                  clearInterval(interval);
                  return 100;
                }
                return prev + 2;
              });
            }, 30);
            return () => clearInterval(interval);
          }, 500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    const statsElement = document.querySelector('[data-stats-section]');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div className={`${isMobile ? 'mt-8' : 'mt-12'} grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-3 gap-8'} text-center`} data-stats-section>
      <div className="flex flex-col items-center">
        <Sparkles className="w-8 h-8 text-bc-red mb-2" />
        <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>6</div>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Service Types")}</p>
      </div>
      <div className="flex flex-col items-center">
        <Home className="w-8 h-8 text-bc-red mb-2" />
        <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>5+</div>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Years Experience")}</p>
      </div>
      {!isMobile && (
        <div className="flex flex-col items-center">
          <Building className="w-8 h-8 text-bc-red mb-2" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{satisfactionRate}%</div>
          <p className="text-base text-gray-600">{t("Satisfaction Rate")}</p>
        </div>
      )}
    </div>
  );
};

export default StatsSection;
