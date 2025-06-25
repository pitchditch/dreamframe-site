
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What makes post construction window cleaning different from regular cleaning?",
      answer: "Post construction cleaning requires specialized tools and techniques to remove stubborn construction debris like paint, adhesives, and concrete splatter that regular cleaning can't handle. We use professional-grade scrapers, solvents, and equipment designed specifically for construction cleanup."
    },
    {
      question: "How long does post construction window cleaning take?",
      answer: "The time varies depending on the size of the property and amount of debris. A typical residential home takes 2-4 hours, while larger commercial properties may take a full day or more. We provide time estimates during your consultation."
    },
    {
      question: "Do you clean both interior and exterior windows?",
      answer: "Yes, we provide complete interior and exterior window cleaning as part of our post construction service. This ensures your windows are spotless inside and out for move-in day."
    },
    {
      question: "Will you remove construction stickers and labels?",
      answer: "Absolutely! We specialize in removing all types of construction stickers, labels, and adhesive residue without damaging the glass or window frames."
    },
    {
      question: "Is post construction cleaning safe for new windows?",
      answer: "Yes, our technicians are trained in safe cleaning methods that won't damage or scratch your new windows. We use appropriate tools and techniques for different window types and materials."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Common questions about our post construction window cleaning services
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
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
