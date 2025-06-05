
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const FloatingContact = () => {
  const scrollToContact = () => {
    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      <Button
        onClick={scrollToContact}
        className="bg-bc-red hover:bg-red-700 text-white rounded-full w-14 h-14 shadow-lg"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <Button
        asChild
        className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg"
        size="sm"
      >
        <a href="tel:7788087620">
          <Phone className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
};

export default FloatingContact;
