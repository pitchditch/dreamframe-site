
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
    <section className={`${bgColor} py-16`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {title && <h2 className={`section-title ${textColor}`}>{title}</h2>}
            {subtitle && <p className={`section-subtitle ${accentColor} mt-2`}>{subtitle}</p>}
            {description && <p className={`mt-4 ${accentColor}`}>{description}</p>}
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure as="div" key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left font-medium text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-bc-red transition-transform`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 py-4 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
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
