
import ServiceBenefits from '../ServiceBenefits';

export interface BenefitItem {
  title: string;
  description: string;
}

interface CleaningBenefitsProps {
  benefits: BenefitItem[];
}

const CleaningBenefits = ({ benefits }: CleaningBenefitsProps) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Benefits of Professional Commercial Window Cleaning</h2>
        <p className="section-subtitle">
          Regular window maintenance provides numerous advantages for your business property
        </p>
        <ServiceBenefits benefits={benefits} />
      </div>
    </section>
  );
};

export default CleaningBenefits;
