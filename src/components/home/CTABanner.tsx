
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const CTABanner = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-gradient-to-r from-bc-red to-red-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png')] bg-cover bg-center"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t("Ready to Transform Your Property?")}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t("Get professional exterior cleaning services that deliver exceptional results. Contact us today for your free quote!")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-bc-red hover:bg-gray-100 font-bold">
              <a href="tel:778-808-7620" className="flex items-center justify-center">
                <Phone className="mr-2" size={20} />
                {t("Call Now: (778) 808-7620")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bc-red font-bold">
              <Link to="/contact" className="flex items-center justify-center">
                <MessageSquare className="mr-2" size={20} />
                {t("Get Free Quote")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
