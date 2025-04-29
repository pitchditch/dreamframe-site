
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/use-translation';

interface Props {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  background?: string;
  className?: string;
  buttonText?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "bc-red";
}

const CallToAction: React.FC<Props> = ({ 
  title, 
  subtitle, 
  primaryButtonText, 
  primaryButtonLink = '/contact',
  secondaryButtonText,
  secondaryButtonLink,
  background,
  className,
  buttonText, // Support for the legacy prop
  variant = "default" // Support for the legacy prop
}) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('Ready to Transform Your Property?');
  const defaultSubtitle = t('Contact us today for a free, no-obligation quote on our professional cleaning services.');
  const defaultPrimaryButtonText = buttonText || t('Get a Free Quote');
  
  return (
    <section className={`py-16 ${background || 'bg-gray-100'} ${className || ''}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{title || defaultTitle}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{subtitle || defaultSubtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant={variant === "default" ? "bc-red" : variant}>
            <Link to={primaryButtonLink}>{primaryButtonText || defaultPrimaryButtonText}</Link>
          </Button>
          {secondaryButtonText && (
            <Button asChild variant="outline">
              <Link to={secondaryButtonLink || '#'}>{secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
