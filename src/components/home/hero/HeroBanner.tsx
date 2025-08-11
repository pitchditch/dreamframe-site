
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-6 py-3 rounded-lg ${isMobile ? 'mb-4 mt-4' : 'mb-6 md:mb-8 mt-8 md:mt-12'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
