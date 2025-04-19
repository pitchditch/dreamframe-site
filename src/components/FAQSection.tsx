
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="w-full">
      <h4 className="text-xl font-semibold mb-6">Frequently Asked Questions</h4>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="general-1">
          <AccordionTrigger>What services do you offer?</AccordionTrigger>
          <AccordionContent>
            We specialize in residential and commercial pressure washing, window cleaning (inside and outside), gutter cleaning, and soft washing for siding and roofs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="general-2">
          <AccordionTrigger>What areas do you service?</AccordionTrigger>
          <AccordionContent>
            We serve Surrey, White Rock, South Surrey, Langley, Abbotsford, Vancouver, North Vancouver, New Westminster, Delta, Burnaby, Chilliwack, Maple Ridge, and Aldergrove.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="general-3">
          <AccordionTrigger>Are you insured?</AccordionTrigger>
          <AccordionContent>
            Yes, we're fully insured for residential and commercial work—so you're protected and worry-free.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="general-4">
          <AccordionTrigger>Do you offer free estimates?</AccordionTrigger>
          <AccordionContent>
            Yes! Use our instant online calculator, or contact us for an on-site quote for larger properties.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="window-1">
          <AccordionTrigger>Do you clean both inside and outside windows?</AccordionTrigger>
          <AccordionContent>
            Absolutely! You can choose interior, exterior, or both.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="window-2">
          <AccordionTrigger>Do you remove hard water stains or paint overspray?</AccordionTrigger>
          <AccordionContent>
            Yes, we handle hard water stains and minor construction debris like paint spots. Just let us know in advance.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pressure-1">
          <AccordionTrigger>What surfaces can you pressure wash?</AccordionTrigger>
          <AccordionContent>
            Driveways, sidewalks, patios, siding, decks, fences—you name it. We use the right pressure for each surface to avoid damage.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pressure-2">
          <AccordionTrigger>Do you use chemicals or just water?</AccordionTrigger>
          <AccordionContent>
            We use eco-friendly cleaning solutions when needed, especially for mold, algae, and tough stains.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gutter-1">
          <AccordionTrigger>Do you clean the inside or outside of gutters?</AccordionTrigger>
          <AccordionContent>
            Both. We remove all debris from inside and can wash the exterior too for a polished look.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gutter-2">
          <AccordionTrigger>How often should I get my gutters cleaned?</AccordionTrigger>
          <AccordionContent>
            At least once a year—twice if you have lots of nearby trees or regular debris buildup.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing-1">
          <AccordionTrigger>How much do your services cost?</AccordionTrigger>
          <AccordionContent>
            It depends on the size of your home and the service. Use our price calculator for a quick and transparent estimate.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="booking-1">
          <AccordionTrigger>How do I book a service?</AccordionTrigger>
          <AccordionContent>
            Book online or give us a call—just pick your service and date, and we'll handle the rest.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="booking-2">
          <AccordionTrigger>Do I need to be home during the service?</AccordionTrigger>
          <AccordionContent>
            Not for exterior work, as long as we have access. For interior window cleaning, someone does need to be present.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQSection;
