
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQ[];
  darkMode?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, subtitle, faqs, darkMode = false }) => {
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const subtitleClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <section data-section="faq" className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-lg ${subtitleClass} max-w-2xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`border rounded-lg px-6 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
              >
                <AccordionTrigger className={`text-left ${textClass} hover:no-underline`}>
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
