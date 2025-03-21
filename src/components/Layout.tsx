
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABanner from './home/CTABanner';
import PriceBanner from './PriceBanner';

interface LayoutProps {
  children: ReactNode;
  hidePriceBanner?: boolean;
}

const Layout = ({ children, hidePriceBanner = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {!hidePriceBanner && <PriceBanner />}
      <main className="flex-grow">
        {children}
      </main>
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Layout;
