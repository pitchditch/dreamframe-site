
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const CallToAction = ({ title, subtitle, backgroundImage }: CallToActionProps) => {
  // Use the new roof image if no specific background is provided and title contains "Roof"
  const defaultRoofBackground = title.toLowerCase().includes('roof') 
    ? '/lovable-uploads/180b21a6-5560-4b80-907a-78280186bc05.png'
    : backgroundImage;

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with full coverage */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('${defaultRoofBackground || backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <Button asChild size="lg" variant="bc-red" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
          <Link to="/calculator">Get Your Free Quote Today</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
