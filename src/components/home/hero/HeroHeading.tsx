
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroHeading = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-4' : 'mb-4 md:mb-6'}`}>
      {/* Main heading */}
      <h1 className={`${isMobile ? 'text-4xl leading-tight' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'} font-bold ${isMobile ? 'mb-3' : 'mb-3 md:mb-4'} animate-on-scroll leading-tight`}>
        <span className="text-white">
          {isMobile ? (
            <>
              {t("Make Your Home")}<br />
              <span className="text-bc-red drop-shadow-lg animate-pulse" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>{t("Shine Instantly")}</span>
            </>
          ) : (
            <>
              {t("Make Your Home")}<br />
              <span className="text-bc-red drop-shadow-lg animate-pulse" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>{t("Shine Instantly")}</span>
            </>
          )}
        </span>
      </h1>
      
      {/* Subtitle - Better for mobile */}
      <p className={`${isMobile ? 'text-base leading-relaxed mb-3 font-semibold' : 'text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4'} animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        {isMobile 
          ? t("Fast, insured service in White Rock & Surrey. We make your property sparkle!")
          : t("Fast, fully insured service backed by a satisfaction guarantee. We'll make your property sparkle!")
        }
      </p>
    </div>
  );
};

export default HeroHeading;
