
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroHeading = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-6' : 'mb-6 md:mb-8'}`}>
      {/* Main heading */}
      <h1 className={`${isMobile ? 'text-3xl leading-tight' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-bold ${isMobile ? 'mb-4' : 'mb-4 md:mb-6'} animate-on-scroll`} style={{ lineHeight: isMobile ? '1.2' : '1.1' }}>
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
      <p className={`${isMobile ? 'text-sm leading-relaxed mb-4 font-semibold' : 'text-lg sm:text-xl md:text-2xl mb-4 md:mb-6'} animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)', lineHeight: '1.6' }}>
        {isMobile 
          ? t("Fast, insured service in White Rock & Surrey. We make your property sparkle!")
          : t("Fast, fully insured service backed by a satisfaction guarantee. We'll make your property sparkle!")
        }
      </p>
    </div>
  );
};

export default HeroHeading;
