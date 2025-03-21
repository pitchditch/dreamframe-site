
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABanner from './home/CTABanner';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Layout;
