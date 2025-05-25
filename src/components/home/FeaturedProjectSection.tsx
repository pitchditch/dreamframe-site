
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const FeaturedProjectSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">{t("Featured Project")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-on-scroll">
            {t("See the transformation we achieved for this beautiful residential property in British Columbia")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-on-scroll relative">
            <img 
              src="/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png" 
              alt={t("Roof Cleaning in North Vancouver | Professional Moss Removal by BC Pressure Washing")}
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="text-sm font-bold">💰 SAVED $4,000</div>
              <div className="text-xs">in roof repairs!</div>
            </div>
          </div>
          
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold mb-4">{t("Professional Roof Cleaning Service")}</h3>
            <ul className="space-y-3 mb-6 text-gray-700">
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Complete moss and algae removal")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Safe soft-washing techniques")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Eco-friendly cleaning solutions")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Gutter cleaning and inspection")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Preventative maintenance approach")}</span>
              </li>
            </ul>
            <p className="mb-4 text-gray-600">
              {t("This North Vancouver home received our premium roof cleaning service, preventing costly roof repairs and extending the roof's lifespan significantly.")}
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-green-800 font-semibold">
                💰 This customer saved $4,000 in roof repairs through our professional cleaning service!
              </p>
              <Link to="/testimonials?highlight=15" className="text-green-700 underline text-sm">
                Read Elizabeth's full review →
              </Link>
            </div>
            <Link to="/services/roof-cleaning">
              <button className="btn-primary">
                {t("Learn About Roof Cleaning")} <ArrowRight className="ml-2 inline-block" size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;
