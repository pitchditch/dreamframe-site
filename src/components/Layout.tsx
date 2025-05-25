
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import ReferralButton from './ReferralButton';

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
  image = "/lovable-uploads/0bf0a978-d845-42ec-bca3-110e16dd54bf.png",
  canonicalUrl
}: LayoutProps) => {
  const baseUrl = "https://www.bcpressurewashing.ca";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  
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
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Layout;
