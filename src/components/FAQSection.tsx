
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
          {description && <p className="text-gray-600 max-w-3xl mx-auto mb-6">{description}</p>}
          {subtitle && <p className="text-lg font-medium text-bc-red">{subtitle}</p>}
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="mb-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-5 py-4 text-left bg-white rounded-lg shadow hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-bc-red/50">
                    <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                    <ChevronDown 
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-bc-red transition-transform duration-300`} 
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-5 py-4 mt-1 bg-white rounded-lg shadow">
                    <p className="text-gray-700">{faq.answer}</p>
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
