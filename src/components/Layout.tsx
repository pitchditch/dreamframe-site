
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title || 'BC Pressure Washing - Professional Cleaning Services'}</title>
        <meta name="description" content={description || 'Professional pressure washing and window cleaning services in Surrey, White Rock & Metro Vancouver. Free quotes available.'} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
