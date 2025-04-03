
import { ReactNode } from 'react';
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
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
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
