import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import ServicePageHeader from './ServicePageHeader';
import StickyContactBar from './StickyContactBar';

interface ServiceLayoutProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  children: ReactNode;
}

export const ServiceLayout = ({ 
  title = "BC Pressure Washing", 
  description = "Professional pressure washing and exterior cleaning services", 
  canonicalUrl,
  children 
}: ServiceLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>
      
      <div className="min-h-screen">
        <ServicePageHeader />
        <main>
          {children}
        </main>
        <StickyContactBar />
      </div>
    </>
  );
};

export default ServiceLayout;