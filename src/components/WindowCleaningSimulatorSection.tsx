
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import WindowCleaningSimulator from './home/WindowCleaningSimulator';

const WindowCleaningSimulatorSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("Experience Our Professional Window Cleaning")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Try our interactive simulator - click and drag to see the difference our professional water-fed pole system makes!")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {t("Window Cleaning Simulator")}
            </h3>
            <p className="text-gray-600 text-center mb-4 text-sm">
              {t("Try our water-fed pole system with squeegee technique")}
            </p>
            <div className="flex justify-center mb-4">
              <WindowCleaningSimulator />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">{t("Professional Features")}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t("Pure water technology")}</li>
                <li>• {t("Streak-free results")}</li>
                <li>• {t("Professional squeegee technique")}</li>
                <li>• {t("Up to 5 stories high")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-gray-800">
            {t("See the dramatic difference professional equipment makes for your windows!")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WindowCleaningSimulatorSection;
