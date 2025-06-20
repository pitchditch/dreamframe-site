
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-6 py-3 rounded-lg ${isMobile ? 'mb-6 mt-12' : 'mb-6 md:mb-8 mt-16 md:mt-20'} animate-on-scroll`}>
      <span className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
