
import { useState, useEffect } from 'react';
import { 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from '../ui/dialog';
import { Button } from '../ui/button';
import { MessageSquare, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface ReferralContentProps {
  referralImages: string[];
}

const ReferralContent = ({ referralImages }: ReferralContentProps) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % referralImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [referralImages.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % referralImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + referralImages.length) % referralImages.length);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-bc-red">
          {t("Refer a Friend & Save 50%")}
        </DialogTitle>
        <DialogDescription className="text-base">
          {t("Get your windows cleaned at 50% off when you recommend a friend!")}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {/* Slideshow */}
            <div className="relative rounded-lg shadow-md overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                <button 
                  onClick={prevSlide}
                  className="bg-white/60 hover:bg-white/80 rounded-full p-1"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="bg-white/60 hover:bg-white/80 rounded-full p-1"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="w-full h-[300px] relative">
                {referralImages.map((src, idx) => (
                  <img 
                    key={idx}
                    src={src} 
                    alt={`BC Pressure Washing referral program ${idx + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              
              {/* Slide indicator dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {referralImages.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-bc-red' : 'bg-white/70'}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">{t("How It Works:")}</h3>
            <ol className="list-decimal ml-5 space-y-2">
              <li>{t("Recommend our services to a friend, family member, or neighbor")}</li>
              <li>{t("When they book a service, have them mention your name")}</li>
              <li>{t("Receive 50% off your next window cleaning service")}</li>
              <li>{t("Your friend gets the highest quality service in the area")}</li>
            </ol>
            
            <div className="mt-6 flex flex-col gap-3">
              <Button className="flex items-center gap-2">
                <Phone size={16} />
                {t("Call to Refer a Friend")}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare size={16} />
                {t("Contact Us About a Referral")}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            {t("*Terms and conditions apply. Offer valid for existing customers only. The 50% discount applies to window cleaning services only and cannot be combined with other offers. Your friend must complete their first service before the discount can be applied to your next service.")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReferralContent;
