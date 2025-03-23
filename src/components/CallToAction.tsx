
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  hideImage?: boolean;
}

const CallToAction = ({
  title = "Ready to Transform Your Property?",
  subtitle = "Contact us today to schedule a service or request a free, no-obligation quote.",
  primaryButtonText = "Get a Free Quote",
  secondaryButtonText = "Contact Us",
  primaryButtonLink = "/contact",
  secondaryButtonLink = "/contact",
  backgroundImage = "/lovable-uploads/1d7d3c0f-21a5-4ae2-80c7-7f156797449f.png",
  hideImage = true
}: CallToActionProps) => {
  const { t } = useTranslation();
  
  return (
    <section className="relative py-16">
      {/* Background Color instead of image */}
      <div className="absolute inset-0 bg-gray-900"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-white">{t(title)}</h2>
        <p className="text-gray-300 mb-8">{t(subtitle)}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={primaryButtonLink}>
            <button className="btn-primary w-full sm:w-auto">{t(primaryButtonText)}</button>
          </Link>
          <Link to={secondaryButtonLink}>
            <button className="btn-secondary w-full sm:w-auto">{t(secondaryButtonText)}</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
