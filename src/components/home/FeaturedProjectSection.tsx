
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
          <div className="animate-on-scroll">
            <img 
              src="/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png" 
              alt={t("House Washing in White Rock | Complete Exterior Cleaning by BC Pressure Washing")}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold mb-4">{t("Complete House Washing Service")}</h3>
            
            {/* Cost Savings Highlight */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-green-600 font-bold text-lg">💰 Customer Saved $4,000</span>
              </div>
              <p className="text-green-700 mt-2">
                Our thorough exterior cleaning helped this homeowner avoid costly roof repairs. 
                <Link 
                  to="/testimonials?highlight=roof-savings" 
                  className="text-green-600 hover:text-green-800 underline ml-1 font-medium"
                >
                  Read their full review →
                </Link>
              </p>
            </div>

            <ul className="space-y-3 mb-6 text-gray-700">
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Full exterior siding cleaning")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Safe low-pressure washing techniques")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Eco-friendly cleaning solutions")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Removal of dirt, mold, and algae")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>{t("Protection of landscaping and surroundings")}</span>
              </li>
            </ul>
            <p className="mb-6 text-gray-600">
              {t("This North Vancouver home received our premium house washing service, resulting in a spotless exterior that enhances curb appeal and protects the property value.")}
            </p>
            <Link to="/services/house-washing">
              <button className="btn-primary">
                {t("Learn About House Washing")} <ArrowRight className="ml-2 inline-block" size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;
