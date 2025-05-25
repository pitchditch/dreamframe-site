
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import EnhancedWindowCleaningSimulator from './home/EnhancedWindowCleaningSimulator';
import PressureWashingSimulator from './PressureWashingSimulator';

const CombinedSimulatorsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("Experience Our Professional Cleaning")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Click and drag your mouse to see the difference our professional equipment makes!")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Enhanced Window Cleaning Simulator */}
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {t("Window Cleaning Simulator")}
              </h3>
              <p className="text-gray-600 text-center mb-4 text-sm">
                {t("Try our water-fed pole system with squeegee technique")}
              </p>
              <div className="flex justify-center mb-4">
                <EnhancedWindowCleaningSimulator />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">{t("Window Cleaning Features")}</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t("Pure water technology")}</li>
                  <li>• {t("Streak-free results")}</li>
                  <li>• {t("Professional squeegee technique")}</li>
                  <li>• {t("Up to 5 stories high")}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pressure Washing Simulator */}
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
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
                <h4 className="font-semibold text-gray-800">{t("Pressure Washing Features")}</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t("High-pressure cleaning")}</li>
                  <li>• {t("Removes stubborn stains")}</li>
                  <li>• {t("Professional equipment")}</li>
                  <li>• {t("Surface restoration")}</li>
                </ul>
              </div>
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

export default CombinedSimulatorsSection;
