
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
        <div className="text-center mb-12">
          {subtitle && (
            <div className={`inline-block ${darkMode ? 'bg-white/10' : 'bg-bc-red/10'} ${darkMode ? 'text-white' : 'text-bc-red'} px-4 py-1 rounded-full text-sm font-medium mb-4`}>
              {subtitle}
            </div>
          )}
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
            {title}
          </h2>
          {description && (
            <p className={`${accentColor} max-w-2xl mx-auto`}>
              {description}
            </p>
          )}
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="mb-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className={`w-full flex justify-between items-center px-6 py-4 text-left rounded-lg ${
                    darkMode 
                      ? open ? 'bg-gray-800' : 'bg-gray-800/50 hover:bg-gray-800/80' 
                      : open ? 'bg-white shadow-md' : 'bg-white hover:bg-gray-50 shadow-sm'
                  } transition-all duration-200 ${textColor}`}>
                    <span className="font-medium text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className={`px-6 pt-4 pb-6 rounded-b-lg mb-3 ${
                    darkMode ? 'bg-gray-800' : 'bg-white shadow-md'
                  }`}>
                    <p className={accentColor}>{faq.answer}</p>
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
