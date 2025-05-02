
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

const defaultFaqs = [
  {
    question: "How often should I have my windows cleaned?",
    answer: "For residential properties, we recommend professional window cleaning 2-4 times per year. Commercial properties typically benefit from more frequent cleaning, often on a monthly or quarterly basis depending on location and environmental factors."
  },
  {
    question: "Is pressure washing safe for all surfaces?",
    answer: "No, pressure washing isn't suitable for all surfaces. While it's excellent for concrete, brick, and many siding types, some materials can be damaged. Our technicians are trained to evaluate your surfaces and use appropriate pressure levels or alternative soft washing methods when needed."
  },
  {
    question: "How long does roof cleaning take?",
    answer: "The time required depends on the size and condition of your roof. A typical residential roof cleaning takes 3-5 hours. Larger homes or those with severe moss/algae growth may require additional time. We'll provide an estimate before starting the work."
  },
  {
    question: "Will you damage my plants when cleaning my gutters?",
    answer: "No, we take great care to protect your landscaping. We place tarps to catch debris and use specialized equipment designed to minimize impact on your plants and garden beds. Our eco-friendly cleaning solutions are also safe for plants when used as directed."
  },
  {
    question: "Do you offer recurring service plans?",
    answer: "Yes, we offer maintenance plans for all our services. These can be scheduled quarterly, bi-annually, or annually depending on your needs. Recurring service customers receive priority scheduling and preferred pricing."
  }
];

const FAQSection = ({ title = "Frequently Asked Questions", subtitle, faqs = defaultFaqs }: FAQSectionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
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
