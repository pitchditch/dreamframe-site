
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      
      {/* General Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red flex items-center">
          <span className="mr-2">💧</span> General Services
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="general-1" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">What services do you offer?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              We specialize in residential and commercial pressure washing, window cleaning (inside and outside), gutter cleaning, and soft washing for siding and roofs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-2" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">What areas do you service?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              We serve Surrey, White Rock, South Surrey, Langley, Abbotsford, Vancouver, North Vancouver, New Westminster, Delta, Burnaby, Chilliwack, Maple Ridge, and Aldergrove.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-3" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Are you insured?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Yes, we're fully insured for residential and commercial work—so you're protected and worry-free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-4" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Do you offer free estimates?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Yes! Use our instant online calculator, or contact us for an on-site quote for larger properties.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Window Cleaning */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red flex items-center">
          <span className="mr-2">🪟</span> Window Cleaning
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="window-1" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Do you clean both inside and outside windows?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Absolutely! You can choose interior, exterior, or both.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="window-2" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Do you remove hard water stains or paint overspray?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Yes, we handle hard water stains and minor construction debris like paint spots. Just let us know in advance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Pressure Washing */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red flex items-center">
          <span className="mr-2">🌀</span> Pressure Washing
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="pressure-1" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">What surfaces can you pressure wash?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Driveways, sidewalks, patios, siding, decks, fences—you name it. We use the right pressure for each surface to avoid damage.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pressure-2" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Do you use chemicals or just water?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              We use eco-friendly cleaning solutions when needed, especially for mold, algae, and tough stains.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Gutter Cleaning */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red flex items-center">
          <span className="mr-2">🍂</span> Gutter Cleaning
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="gutter-1" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Do you clean the inside or outside of gutters?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Both. We remove all debris from inside and can wash the exterior too for a polished look.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gutter-2" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">How often should I get my gutters cleaned?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              At least once a year—twice if you have lots of nearby trees or regular debris buildup.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Pricing & Booking */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-bc-red flex items-center">
          <span className="mr-2">💸</span> Pricing & Booking
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="pricing-1" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">How much do your services cost?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              It depends on the size of your home and the service. Use our price calculator for a quick and transparent estimate.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="booking-1" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">How do I book a service?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Book online or give us a call—just pick your service and date, and we'll handle the rest.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="booking-2" className="border border-gray-200 rounded-md overflow-hidden bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">Do I need to be home during the service?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              Not for exterior work, as long as we have access. For interior window cleaning, someone does need to be present.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
