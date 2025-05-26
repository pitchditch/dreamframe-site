
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const CTABanner = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-to-r from-bc-red via-red-600 to-bc-red text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
          {t("Ready to Transform Your Property?")}
        </h2>
        <p className="text-xl mb-8 text-white/95 drop-shadow-md max-w-2xl mx-auto">
          {t("Get a quote free online and see why we're the #1 choice for exterior cleaning in Metro Vancouver")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/calculator">
            <Button size="lg" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 font-bold text-lg px-8 py-4">
              <MessageSquare className="mr-2" size={20} />
              {t("Get Free Quote Online")}
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-bc-red font-bold text-lg px-8 py-4">
              <Phone className="mr-2" size={20} />
              {t("Call Now: 778-808-7620")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
