
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
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const accentColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>{title}</h2>
            {subtitle && <p className={`text-lg ${accentColor}`}>{subtitle}</p>}
            {description && <p className={`mt-4 ${accentColor}`}>{description}</p>}
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="border rounded-lg overflow-hidden">
                    <Disclosure.Button className={`flex justify-between items-center w-full px-6 py-4 text-left ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} ${textColor} font-medium`}>
                      <span className="text-lg">{faq.question}</span>
                      <ChevronDown 
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 ${accentColor}`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className={`px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${accentColor}`}>
                      <p>{faq.answer}</p>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
