
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroHeading = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-4' : 'mb-4 md:mb-6'}`}>
      {/* Main heading - Customer-focused and local */}
      <h1 className={`${isMobile ? 'text-3xl leading-tight' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'} font-bold ${isMobile ? 'mb-3' : 'mb-3 md:mb-4'} animate-on-scroll leading-tight`}>
        <span className="text-white">
          {isMobile ? (
            <>
              Restore Your Home's<br />
              <span className="text-bc-red drop-shadow-lg animate-pulse" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>
                Curb Appeal
              </span><br />
              <span className="text-lg font-medium">in White Rock, BC</span>
            </>
          ) : (
            <>
              Restore Your Home's<br />
              <span className="text-bc-red drop-shadow-lg animate-pulse" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>
                Curb Appeal
              </span><br />
              <span className="text-2xl md:text-3xl font-medium">in White Rock, BC</span>
            </>
          )}
        </span>
      </h1>
      
      {/* Subtitle - Benefit statement with guarantee */}
      <p className={`${isMobile ? 'text-sm leading-relaxed mb-3 font-medium' : 'text-lg sm:text-xl md:text-2xl mb-3 md:mb-4'} animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        {isMobile 
          ? "Professional pressure washing & window cleaning that makes homes shine again. 100% Satisfaction Guaranteed."
          : "Professional, licensed pressure washing & window cleaning that makes your home look new again. Every team member is fully trained, licensed, and insured."
        }
      </p>
      
      {/* Service area */}
      <p className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} animate-on-scroll delay-200 text-white/90 font-medium`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        Serving White Rock, South Surrey & Metro Vancouver
      </p>
    </div>
  );
};

export default HeroHeading;
