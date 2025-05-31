
import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/index';
import Footer from './Footer';
import ReferralButton from './ReferralButton';
import StickyContactBar from './StickyContactBar';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
}

const Layout = ({ 
  children, 
  title = "BC Pressure Washing | #1 Pressure Washing in Surrey & White Rock", 
  description = "Trusted pressure washing, window & roof cleaning in Surrey & White Rock. ⭐ 5-Star Rated | ✅ Free Quotes | 🏠 Same-Day Service. Book now & save!",
  image = "/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png",
  canonicalUrl
}: LayoutProps) => {
  const location = useLocation();
  const baseUrl = "https://www.bcpressurewashing.ca";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={fullCanonicalUrl} />
        <link rel="icon" href="/lovable-uploads/9773afa1-26cf-4788-ade6-2da27716dd3d.png" type="image/png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={fullCanonicalUrl} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        
        {/* Indexing directives */}
        <meta name="robots" content="index, follow" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow w-full pb-20">
        {children}
      </main>
      <Footer />
      <StickyContactBar />
    </div>
  );
};

export default Layout;
