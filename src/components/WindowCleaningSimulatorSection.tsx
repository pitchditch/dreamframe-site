
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
            {t("Try Our Window Cleaning Simulator")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Experience our interactive window cleaning demonstration - see how our professional techniques transform dirty windows!")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {t("Interactive Window Cleaning Demo")}
            </h3>
            <p className="text-gray-600 text-center mb-6 text-sm">
              {t("Move your mouse or finger across the dirty window to reveal the clean surface below")}
            </p>
            <div className="flex justify-center mb-6">
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
