
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import ReferralButton from './ReferralButton';
import PhoneButton from './PhoneButton';

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
  image = "/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png" // Updated to use the provided OG image
}: LayoutProps) => {
  const canonicalUrl = "https://www.bcpressurewashing.ca";
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/lovable-uploads/0f3cf5d7-e92d-4732-b333-37048173634a.png" type="image/png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonicalUrl} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
      <ChatAssistant />
      <ReferralButton />
      <PhoneButton />
    </div>
  );
};

export default Layout;
