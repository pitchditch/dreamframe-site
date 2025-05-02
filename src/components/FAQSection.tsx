
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
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  description,
  subtitle,
  faqs = []
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{title}</h2>}
        {subtitle && <p className="text-lg text-gray-600 text-center mb-6 max-w-3xl mx-auto">{subtitle}</p>}
        {description && <p className="text-md text-gray-500 text-center mb-12 max-w-2xl mx-auto">{description}</p>}

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="bg-white rounded-lg shadow-md overflow-hidden">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-6 py-5 text-left text-lg font-medium text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-bc-red focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-bc-red transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
