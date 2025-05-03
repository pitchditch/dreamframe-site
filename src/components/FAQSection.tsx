
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  subtitle?: string;
  faqs: FAQ[];
  darkMode?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  description,
  subtitle,
  faqs = [],
  darkMode = false
}) => {
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const accentColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${textColor}`}>
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className={`text-lg text-center max-w-3xl mx-auto mb-6 ${accentColor}`}>
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className={`text-base text-center max-w-3xl mx-auto mb-10 ${accentColor}`}>
            {description}
          </p>
        )}
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="mb-4">
              {({ open }) => (
                <>
                  <Disclosure.Button 
                    className={`flex justify-between w-full px-6 py-4 text-left rounded-lg ${
                      open ? 'bg-bc-red text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                    } focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50 transition-all duration-200`}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`${
                        open ? 'transform rotate-180 text-white' : ''
                      } w-5 h-5 transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  
                  <Disclosure.Panel className="px-6 py-4 bg-white rounded-b-lg shadow-sm border border-t-0 border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
