
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

export interface FAQSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  faqs: {
    question: string;
    answer: string;
    category?: string;
  }[];
  darkMode?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, description, subtitle, faqs, darkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isMobile = useIsMobile();

  // Get unique categories from FAQs
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)))];

  // Filter FAQs based on search term and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className={`${isMobile ? 'py-12' : 'py-16'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`${isMobile ? 'text-lg mb-3' : 'text-xl mb-4'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={`max-w-3xl mx-auto ${isMobile ? 'text-sm' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              {description}
            </p>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className={`max-w-4xl mx-auto ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <div className={`flex flex-col ${isMobile ? 'gap-3 mb-4' : 'md:flex-row gap-4 mb-6'}`}>
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${isMobile ? 'h-12 text-base' : ''} ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
              <div className={`flex flex-wrap ${isMobile ? 'gap-2' : 'gap-2'}`}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2 text-sm'} rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-bc-red text-white'
                        : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'All Questions' : category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className={`${isMobile ? 'text-sm mb-4' : 'text-sm mb-6'} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className={`w-full ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
              {filteredFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className={`border rounded-lg overflow-hidden ${
                    darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                  } shadow-sm hover:shadow-md transition-shadow`}
                >
                  <AccordionTrigger 
                    className={`text-left ${isMobile ? 'text-base py-4 px-4' : 'text-lg py-6 px-6'} font-semibold hover:no-underline ${
                      darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'
                    } transition-colors group`}
                  >
                    <div className={`flex items-start justify-between w-full ${isMobile ? 'pr-2' : 'pr-4'}`}>
                      <span className="flex-1 leading-relaxed">{faq.question}</span>
                      {faq.category && (
                        <span className={`${isMobile ? 'text-xs px-2 py-0.5 ml-2' : 'text-xs px-2 py-1 ml-4'} rounded-full flex-shrink-0 ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent 
                    className={`${isMobile ? 'px-4 pb-4 text-sm' : 'px-6 pb-6 text-base'} leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <div className={`${isMobile ? 'pt-2 border-t' : 'pt-2 border-t'} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className={`text-center ${isMobile ? 'py-8' : 'py-12'} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Search className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-2`}>No questions found</h3>
              <p className={isMobile ? 'text-sm' : ''}>Try adjusting your search terms or browse all categories.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className={`text-center ${isMobile ? 'mt-8' : 'mt-12'}`}>
          <div className={`max-w-2xl mx-auto ${isMobile ? 'p-6' : 'p-8'} rounded-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Still have questions?
            </h3>
            <p className={`${isMobile ? 'mb-4 text-sm' : 'mb-6'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our team is here to help! Get in touch for personalized answers and expert advice.
            </p>
            <div className={`flex flex-col ${isMobile ? 'gap-3' : 'sm:flex-row gap-4'} justify-center`}>
              <a
                href="tel:778-808-7620"
                className={`inline-flex items-center justify-center ${isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-3'} bg-bc-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors`}
              >
                Call (778) 808-7620
              </a>
              <a
                href="/calculator"
                className={`inline-flex items-center justify-center ${isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-3'} font-semibold rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
