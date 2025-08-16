
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroHeading = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-2 mt-1' : 'mb-3 mt-2'}`}>
      {/* Main heading */}
      <h1 className={`${isMobile ? 'text-3xl leading-tight' : 'text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-[1.1]'} font-bold ${isMobile ? 'mb-2' : 'mb-2'} animate-on-scroll`}>
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
      <p className={`${isMobile ? 'text-lg leading-relaxed mb-2 font-semibold' : 'text-lg sm:text-xl md:text-xl mb-2'} animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        {isMobile 
          ? t("Fast, insured service in White Rock & Surrey. We make your property sparkle!")
          : t("Fast, fully insured service backed by a satisfaction guarantee. We'll make your property sparkle!")
        }
      </p>
    </div>
  );
};

export default HeroHeading;
