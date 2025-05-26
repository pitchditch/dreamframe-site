
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import PressureWashingSimulator from './PressureWashingSimulator';

const PressureWashingSimulatorSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("Experience Our Professional Pressure Washing")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Try our interactive simulator - click and drag to see the power of our professional pressure washing equipment!")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {t("Pressure Washing Simulator")}
            </h3>
            <p className="text-gray-600 text-center mb-4 text-sm">
              {t("Experience our high-pressure cleaning power")}
            </p>
            <div className="flex justify-center mb-4">
              <PressureWashingSimulator />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">{t("Professional Features")}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t("High-pressure cleaning")}</li>
                <li>• {t("Removes stubborn stains")}</li>
                <li>• {t("Professional equipment")}</li>
                <li>• {t("Surface restoration")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-gray-800">
            {t("See the dramatic difference professional equipment makes for your property!")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PressureWashingSimulatorSection;
