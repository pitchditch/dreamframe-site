
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
        {title && (
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${textColor}`}>{title}</h2>
        )}
        
        {subtitle && (
          <p className={`text-lg ${accentColor} text-center mx-auto max-w-3xl mb-10`}>
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className={`${accentColor} mb-12 max-w-3xl mx-auto text-center`}>{description}</p>
        )}
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-xl">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="py-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className={`flex w-full justify-between items-center text-left ${textColor}`}>
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 ${accentColor}`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className={`pt-4 pb-2 ${accentColor}`}>
                    {faq.answer}
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
