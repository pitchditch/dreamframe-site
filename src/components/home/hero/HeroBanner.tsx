
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-8 py-4 rounded-xl ${isMobile ? 'mb-6 mt-32' : 'mb-8 md:mb-10 mt-64 md:mt-72'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
