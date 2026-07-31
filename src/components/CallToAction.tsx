import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const CallToAction = ({ title, subtitle, backgroundImage }: CallToActionProps) => {
  const resolvedBackground =
    backgroundImage ||
    (title.toLowerCase().includes('roof')
      ? '/lovable-uploads/180b21a6-5560-4b80-907a-78280186bc05.png'
      : undefined);

  return (
    <section className="relative min-h-[520px] bg-gray-950 flex items-center justify-center overflow-hidden">
      {resolvedBackground && (
        <img
          src={resolvedBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/70"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <Button
          asChild
          size="lg"
          variant="bc-red"
          className="min-h-12 text-lg px-8 hover:scale-105 transition-transform"
        >
          <Link to="/calculator">Get Your Free Quote Today</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
