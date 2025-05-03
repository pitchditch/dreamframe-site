
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FAQSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  darkMode?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, description, subtitle, faqs, darkMode = false }) => {
  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
          {subtitle && <p className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
          {description && <p className={`max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className={`mb-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <AccordionTrigger className={`text-left text-lg font-medium py-4 px-5 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-t-lg`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`p-5 text-base ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} rounded-b-lg`}>
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
