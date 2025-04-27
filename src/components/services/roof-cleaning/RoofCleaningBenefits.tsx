
import React from 'react';
import ServiceBenefits from '@/components/ServiceBenefits';
import { Star } from 'lucide-react';

const benefits = [
  {
    title: "Extends Roof Lifespan",
    description: "Prevents moss, algae, and lichen from breaking down your shingles, adding years to your roof.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Improves Energy Efficiency",
    description: "Clean roofs reflect heat better, keeping your home cooler in summer and reducing energy bills.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Enhances Curb Appeal",
    description: "Instantly transforms your home's appearance and increases property value.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Prevents Water Damage",
    description: "Eliminates organisms that trap moisture and can lead to costly roof leaks.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
  },
];

const RoofCleaningBenefits = () => {
  return (
    <div className="relative z-10 -mt-32 pt-32 bg-white">
      <ServiceBenefits
        title="Why Clean Your Roof?"
        subtitle="More than just curb appeal - protect your investment"
        benefits={benefits}
      />
    </div>
  );
};

export default RoofCleaningBenefits;
