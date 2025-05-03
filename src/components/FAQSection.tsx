
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
        )}
        
        {subtitle && (
          <p className="text-lg text-gray-600 text-center mx-auto max-w-3xl mb-10">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">{description}</p>
        )}
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-xl">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="py-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center text-left">
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-gray-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2 text-gray-600">
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
