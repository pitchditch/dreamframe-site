import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
const CTABanner = () => {
  const {
    t,
    language
  } = useTranslation();

  // Language-specific classes for font adjustments
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };
  return <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        
        
      </div>
      
      
    </section>;
};
export default CTABanner;