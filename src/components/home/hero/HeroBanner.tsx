
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-8 py-4 rounded-lg ${isMobile ? 'mb-6 mt-8' : 'mb-6 md:mb-8 mt-12 md:mt-16'} animate-on-scroll`}>
      <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
