
import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';

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
  const canonicalUrl = "https://www.bcpressurewashing.ca";

  // Mark the first child with hero-section class if it doesn't already have it
  useEffect(() => {
    // Mark the first child as hero-section for navbar transparency
    const firstChild = document.querySelector('main > div:first-child, main > section:first-child');
    if (firstChild && !firstChild.classList.contains('hero-section')) {
      firstChild.classList.add('hero-section');
    }
    
    // Add style for navbar transparency
    const style = document.createElement('style');
    style.textContent = `
      .hero-section {
        min-height: 100vh;
      }
      
      .text-shadow {
        text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
      }
      
      .text-shadow-sm {
        text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      }
      
      /* Force the navbar logo to update properly */
      .nav-logo-transition {
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    // Force recalculation of navbar scroll position on page load
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
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
    </div>
  );
};

export default Layout;
