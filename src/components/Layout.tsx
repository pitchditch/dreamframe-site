
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABanner from './home/CTABanner';
import PriceBanner from './PriceBanner';
import LocationBanner from './LocationBanner';
import ChatAssistant from './ChatAssistant';

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
      <CTABanner />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Layout;
