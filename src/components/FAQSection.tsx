import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h2>
      
      {/* General Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red">General Services</h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="general-1" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">What services do you offer?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              We offer professional pressure washing, window cleaning (interior and exterior), gutter cleaning (inside and out), house washing, deck cleaning, and soft washing for more delicate surfaces.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-2" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">What areas do you service?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              We serve Surrey, White Rock, South Surrey, Langley, Abbotsford, Vancouver, North Vancouver, Burnaby, New Westminster, Delta, Maple Ridge, Aldergrove, and Chilliwack.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-3" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Are you insured?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              Yes—BC Pressure Washing is fully insured for both residential and commercial work.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-4" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Do you offer free estimates?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              Absolutely. You can get an instant online estimate through our calculator, or we’ll provide a custom quote for more complex jobs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Window Cleaning */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red">🪟 Window Cleaning</h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="window-1" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Do you clean both inside and outside windows?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              Yes! We offer both interior and exterior window cleaning—you can choose one or both depending on your needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="window-2" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Do you remove hard water stains or paint overspray?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              We do! We use safe and effective techniques to remove hard water stains, mineral deposits, and light construction debris like paint overspray.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Pressure Washing */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red">🌀 Pressure Washing</h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="pressure-1" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">What surfaces can you pressure wash?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              We clean driveways, sidewalks, patios, decks, siding, fences, and more. We adjust pressure based on surface type to prevent damage.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pressure-2" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Do you use chemicals or just water?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              We mainly use water, but for tougher jobs like mold, algae, or oil stains, we apply eco-friendly cleaning solutions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Gutter Cleaning */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-bc-red">🍂 Gutter Cleaning</h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="gutter-1" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Do you clean the inside or outside of gutters?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              Both! We clear out all debris from the inside and can also wash the exterior to remove staining or discoloration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gutter-2" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">How often should I get my gutters cleaned?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              At least once a year—ideally in spring or fall. If you have a lot of nearby trees, we recommend twice a year.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Pricing & Booking */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-bc-red">💸 Pricing & Booking</h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="pricing-1" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">How much do your services cost?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              Prices depend on your home size and the service. You can get an instant estimate using our online price calculator—transparent and hassle-free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="booking-1" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">How do I book a service?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              You can book directly through our website or give us a call. Pick your service, your date, and we’ll handle the rest.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="booking-2" className="border border-gray-700 rounded-md overflow-hidden bg-gray-800">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-700 text-white">Do I need to be home during the service?</AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0 text-gray-300">
              Not for exterior work—as long as we have access, you're good. For interior window cleaning, someone needs to be home.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
