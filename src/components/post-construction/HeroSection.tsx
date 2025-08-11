
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full">
      <img 
        src="/lovable-uploads/598eb62a-290d-41ec-8c69-abae60a5a757.png"
        alt="Post Construction Window Cleaning"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Post Construction Window Cleaning
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Professional window cleaning services to remove construction debris, 
          stickers, paint, and restore crystal clear windows
        </p>
        <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
          <Link to="/calculator">Get Your Free Quote</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
