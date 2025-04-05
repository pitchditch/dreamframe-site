
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABanner from './home/CTABanner';
import PriceBanner from './PriceBanner';
import LocationBanner from './LocationBanner';
import ChatAssistant from './ChatAssistant';
import ReferralButton from './ReferralButton';
import CallToAction from './CallToAction';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

const Layout = ({ 
  children, 
  title = "BC Pressure Washing - #1 Pressure Washing & Window Cleaning Services", 
  description = "Professional pressure washing, window cleaning, roof cleaning and gutter cleaning services in Surrey, White Rock and Metro Vancouver.",
  image = "/lovable-uploads/9fd8e651-7601-4cbe-8e73-c48efe84a1fa.png"
}: LayoutProps) => {
  const fullTitle = `${title} | BC Pressure Washing`;
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet>
      
      <Navbar />
      <PriceBanner />
      <main className="flex-grow w-full">
        {children}
      </main>
      <LocationBanner />
      
      {/* Move CallToAction component right above footer */}
      <CallToAction 
        title="Premium Clean Solutions for Your Property"
        subtitle="Trust our experienced team to restore and maintain your property's appearance with our comprehensive cleaning services."
        primaryButtonText="Get a Free Quote"
        secondaryButtonText="Learn More"
      />
      
      <Footer />
      <ChatAssistant />
      <ReferralButton />
    </div>
  );
};

export default Layout;
