
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-4 py-2 rounded-lg ${isMobile ? 'mb-2 mt-2' : 'mb-3 mt-3'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-2xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
