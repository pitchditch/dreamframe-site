
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const StickyContactBar = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bc-red text-white shadow-lg border-t-2 border-red-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-semibold">
              {t("Ready for a Free Quote?")}
            </div>
            <div className="hidden sm:block text-xs opacity-90">
              {t("Same-day service available in Surrey & White Rock")}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href="tel:778-808-7620"
              className="flex items-center gap-2 bg-white text-bc-red px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">{t("Call Now")}</span>
              <span className="sm:hidden">📞</span>
            </a>
            
            <Link
              to="/calculator"
              className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:bg-yellow-300 transition-colors"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">{t("Get Quote")}</span>
              <span className="sm:hidden">💬</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyContactBar;
