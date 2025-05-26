
import { Helmet } from "react-helmet-async";
import Layout from '../../components/Layout';
import SeasonalMaintenanceGuide from '../../components/home/SeasonalMaintenanceGuide';
import { useTranslation } from '@/hooks/use-translation';

const SeasonalMaintenanceGuidePage = () => {
  const { t } = useTranslation();

  return (
    <Layout 
      title={t("Seasonal Maintenance Guide | BC Pressure Washing")}
      description={t("Complete seasonal maintenance guide for your property. Learn when to schedule window cleaning, pressure washing, gutter cleaning, and roof cleaning throughout the year.")}
      canonicalUrl="/blog/seasonal-maintenance-guide"
    >
      <Helmet>
        <title>{t("Seasonal Property Maintenance Guide | BC Pressure Washing")}</title>
        <meta name="description" content={t("Expert seasonal maintenance guide for BC homeowners. Learn optimal timing for exterior cleaning services throughout the year.")} />
        <meta name="keywords" content="seasonal maintenance, property care, window cleaning schedule, pressure washing timing, gutter cleaning seasons, roof maintenance" />
      </Helmet>

      <div className="pt-20">
        <div className="bg-gradient-to-br from-bc-red to-red-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("Seasonal Maintenance Guide")}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t("Your complete guide to year-round property maintenance in British Columbia")}
            </p>
          </div>
        </div>
        
        <SeasonalMaintenanceGuide />
      </div>
    </Layout>
  );
};

export default SeasonalMaintenanceGuidePage;
