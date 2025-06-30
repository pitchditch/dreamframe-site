
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-6 py-3 rounded-lg ${isMobile ? 'mb-4 mt-24' : 'mb-6 md:mb-8 mt-48 md:mt-56'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
