
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const DrivewayCleaning = () => {
  const { t } = useTranslation();
  
  return (
    <section className="container mx-auto px-4 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">{t("Driveway Pressure Washing")}</h2>
      <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
        <div className="md:w-1/2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img 
                src="/lovable-uploads/04bd3905-2c86-4062-9cec-ddbddead79ab.png" 
                alt="Driveway pressure washing" 
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/2">
          <div className="flex items-center mb-4">
            <Navigation className="text-bc-red mr-3" size={28} />
            <h3 className="text-2xl font-bold">{t("Driveway Restoration")}</h3>
          </div>
          <p className="text-gray-600 mb-4">
            {t("Over time, driveways accumulate oil stains, tire marks, mold, mildew, and embedded dirt. Our high-pressure cleaning services effectively remove these tough stains, revealing the clean concrete or pavers underneath.")}
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-bc-red mr-2">✓</span>
              <span>{t("Removes stubborn oil and grease stains")}</span>
            </li>
            <li className="flex items-start">
              <span className="text-bc-red mr-2">✓</span>
              <span>{t("Eliminates slippery moss and algae")}</span>
            </li>
            <li className="flex items-start">
              <span className="text-bc-red mr-2">✓</span>
              <span>{t("Prevents concrete deterioration")}</span>
            </li>
            <li className="flex items-start">
              <span className="text-bc-red mr-2">✓</span>
              <span>{t("Optional sealing services available")}</span>
            </li>
          </ul>
          <Button asChild>
            <Link to="/contact">
              {t("Request Driveway Cleaning")} <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DrivewayCleaning;
