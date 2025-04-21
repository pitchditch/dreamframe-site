import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ChatAssistant from './ChatAssistant';

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', icon: '💧', label: 'General Services' },
    { id: 'window', icon: '🪟', label: 'Window Cleaning' },
    { id: 'pressure', icon: '🌀', label: 'Pressure Washing' },
    { id: 'gutter', icon: '🍂', label: 'Gutter Cleaning' },
    { id: 'pricing', icon: '💸', label: 'Pricing & Booking' },
  ];

  return (
    <section className="py-section bg-navy relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
        
        <div className="flex gap-4 justify-center mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeCategory === category.id 
                ? 'bg-bc-red text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <span>{category.icon}</span>
              <span className="whitespace-nowrap">{category.label}</span>
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {/* General Services */}
            {activeCategory === 'general' && (
              <>
                <AccordionItem value="what-services" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">What services do you offer?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    We offer professional pressure washing, window cleaning (interior and exterior), gutter cleaning (inside and out), house washing, deck cleaning, and soft washing for more delicate surfaces.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="what-areas" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">What areas do you service?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    We serve Surrey, White Rock, South Surrey, Langley, Abbotsford, Vancouver, North Vancouver, Burnaby, New Westminster, Delta, Maple Ridge, Aldergrove, and Chilliwack.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="are-you-insured" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Are you insured?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    Yes—BC Pressure Washing is fully insured for both residential and commercial work.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="free-estimates" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Do you offer free estimates?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    Absolutely. You can get an instant online estimate through our calculator, or we'll provide a custom quote for more complex jobs.
                  </AccordionContent>
                </AccordionItem>
              </>
            )}

            {/* Window Cleaning */}
            {activeCategory === 'window' && (
              <>
                <AccordionItem value="clean-inside-outside" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Do you clean both inside and outside windows?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    Yes! We offer both interior and exterior window cleaning—you can choose one or both depending on your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="remove-hard-water-stains" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Do you remove hard water stains or paint overspray?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    We do! We use safe and effective techniques to remove hard water stains, mineral deposits, and light construction debris like paint overspray.
                  </AccordionContent>
                </AccordionItem>
              </>
            )}

            {/* Pressure Washing */}
            {activeCategory === 'pressure' && (
              <>
                <AccordionItem value="what-surfaces" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">What surfaces can you pressure wash?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    We clean driveways, sidewalks, patios, decks, siding, fences, and more. We adjust pressure based on surface type to prevent damage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="chemicals-or-water" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Do you use chemicals or just water?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    We mainly use water, but for tougher jobs like mold, algae, or oil stains, we apply eco-friendly cleaning solutions.
                  </AccordionContent>
                </AccordionItem>
              </>
            )}

            {/* Gutter Cleaning */}
            {activeCategory === 'gutter' && (
              <>
                <AccordionItem value="inside-or-outside" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Do you clean the inside or outside of gutters?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    Both! We clear out all debris from the inside and can also wash the exterior to remove staining or discoloration.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-often" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">How often should I get my gutters cleaned?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    At least once a year—ideally in spring or fall. If you have a lot of nearby trees, we recommend twice a year.
                  </AccordionContent>
                </AccordionItem>
              </>
            )}

            {/* Pricing & Booking */}
            {activeCategory === 'pricing' && (
              <>
                <AccordionItem value="how-much-cost" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">How much do your services cost?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    Prices depend on your home size and the service. You can get an instant estimate using our online price calculator—transparent and hassle-free.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-book" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">How do I book a service?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    You can book directly through our website or give us a call. Pick your service, your date, and we'll handle the rest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="need-to-be-home" className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-white hover:text-white/80">Do I need to be home during the service?</AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0 text-white/80">
                    Not for exterior work—as long as we have access, you're good. For interior window cleaning, someone needs to be home.
                  </AccordionContent>
                </AccordionItem>
              </>
            )}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/80 text-lg mb-4">Still have questions? We're here to help!</p>
          <button 
            onClick={() => {
              const chatButton = document.querySelector('.chat-button');
              if (chatButton instanceof HTMLElement) {
                chatButton.click();
              }
            }}
            className="bg-bc-red hover:bg-bc-red/90 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            Ask Us Anything 👋
          </button>
        </div>
      </div>
      {/* Add chatbot floating at right beside FAQ only on desktop */}
      <div className="hidden md:block absolute top-12 right-12 z-50">
        <ChatAssistant />
      </div>
    </section>
  );
};

export default FAQSection;
