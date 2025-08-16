
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroHeading = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-1 mt-0' : 'mb-2 mt-1'}`}>
      {/* Main heading - Made 5 sizes bigger */}
      <h1 className={`${isMobile ? 'text-8xl leading-tight' : 'text-8xl sm:text-9xl md:text-9xl lg:text-[10rem] leading-[1.1]'} font-bold ${isMobile ? 'mb-2' : 'mb-2'} animate-on-scroll`}>
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
      
      {/* Subtitle - Made bigger to match */}
      <p className={`${isMobile ? 'text-2xl leading-relaxed mb-2 font-semibold' : 'text-3xl sm:text-4xl md:text-4xl mb-2'} animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
        {isMobile 
          ? t("Fast, insured service in White Rock & Surrey. We make your property sparkle!")
          : t("Fast, fully insured service backed by a satisfaction guarantee. We'll make your property sparkle!")
        }
      </p>
    </div>
  );
};

export default HeroHeading;
