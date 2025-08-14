import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroContent = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="text-white">
      {/* Main heading */}
      <h1 className={`${isMobile ? 'text-3xl mb-4' : 'text-4xl lg:text-5xl mb-6'} font-bold leading-tight`}>
        BC's <span className="text-blue-400">#1 Rated</span><br />
        Exterior Cleaning<br />
        Team
      </h1>
      
      {/* Subtitle */}
      <p className={`${isMobile ? 'text-lg mb-6' : 'text-xl mb-8'} text-yellow-300 font-semibold`}>
        Trusted by <span className="font-bold">500+ Satisfied Customers</span> in Metro Vancouver
      </p>
      
      <p className={`${isMobile ? 'text-base mb-6' : 'text-lg mb-8'} font-medium`}>
        Fast Quotes • Same-day service available
      </p>
      
      {/* Trust badges */}
      {!isMobile && (
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="font-bold text-lg">500+</div>
            <div className="text-sm">Satisfied Customers</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="font-bold text-lg">Fully</div>
            <div className="text-sm">Insured</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="font-bold text-lg">100%</div>
            <div className="text-sm">Satisfaction</div>
          </div>
        </div>
      )}
      
      {/* Location */}
      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-white/80`}>
        📍 Serving White Rock, Metro Vancouver & Beyond
      </p>
    </div>
  );
};

export default HeroContent;