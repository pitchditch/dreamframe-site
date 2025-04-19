
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import LocationBanner from './LocationBanner';
import ChatAssistant from './ChatAssistant';
import CallButton from './CallButton';
import ReferralButton from './ReferralButton';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

const Layout = ({ 
  children, 
  title = "BC Pressure Washing | #1 Pressure Washing in Surrey & White Rock", 
  description = "Trusted pressure washing, window & roof cleaning in Surrey & White Rock. ⭐ 5-Star Rated | ✅ Free Quotes | 🏠 Same-Day Service. Book now & save!",
  image = "/open.png"
}: LayoutProps) => {
  const fullTitle = `${title} | BC Pressure Washing`;
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.bcpressurewashing.ca" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content="https://www.bcpressurewashing.ca" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <LocationBanner />
      <Footer />
      <CallButton />
      <ChatAssistant />
    </div>
  );
};

export default Layout;
