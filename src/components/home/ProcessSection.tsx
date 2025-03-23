
import ProcessStep from '../ProcessStep';
import { Clipboard, PencilRuler, DropletIcon, Droplets } from 'lucide-react';

const ProcessSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">Our Process</div>
        <h2 className="section-title animate-on-scroll">How We Deliver Excellence</h2>
        <p className="section-subtitle animate-on-scroll">
          Our systematic approach ensures that every cleaning project is completed with precision and care.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-[95%] mx-auto">
          <div className="animate-on-scroll">
            <ProcessStep
              number={1}
              title="Free Assessment"
              description="We start with a thorough assessment of your property to understand your specific cleaning needs."
              icon={<Clipboard size={48} />}
            />
          </div>
          <div className="animate-on-scroll">
            <ProcessStep
              number={2}
              title="Custom Quote"
              description="Based on the assessment, we provide a detailed quote with transparent pricing and no hidden fees."
              icon={<PencilRuler size={48} />}
            />
          </div>
          <div className="animate-on-scroll">
            <ProcessStep
              number={3}
              title="Professional Cleaning"
              description="Our trained technicians use advanced equipment and eco-friendly solutions to clean your property."
              icon={<DropletIcon size={48} />}
            />
          </div>
          <div className="animate-on-scroll">
            <ProcessStep
              number={4}
              title="Final Inspection"
              description="We conduct a final walkthrough to ensure everything meets our high standards of cleanliness."
              icon={<Droplets size={48} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
