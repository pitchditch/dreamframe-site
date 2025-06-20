
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQ[];
  darkMode?: boolean;
  fullWidth?: boolean;
  largeButtons?: boolean;
}

const FAQSection = ({ title, subtitle, faqs, darkMode = false, fullWidth = false, largeButtons = false }: FAQSectionProps) => {
  const containerClasses = fullWidth 
    ? "w-full" 
    : "container mx-auto px-4";
    
  const contentClasses = fullWidth 
    ? "w-full px-4 md:px-8 lg:px-12" 
    : "max-w-4xl mx-auto";

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} ${fullWidth ? 'w-full' : ''}`}>
      <div className={containerClasses}>
        <div className={contentClasses}>
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className={`${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg shadow-sm px-6 ${largeButtons ? 'py-2' : ''}`}
              >
                <AccordionTrigger className={`${darkMode ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'} text-left font-semibold ${largeButtons ? 'text-lg py-6' : 'text-base py-4'} hover:no-underline`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} ${largeButtons ? 'text-base pb-6' : 'text-sm pb-4'} leading-relaxed`}>
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
