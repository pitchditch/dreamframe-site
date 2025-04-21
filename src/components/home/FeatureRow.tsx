
import { Shield, CircleCheck, Wrench, Star } from "lucide-react";
import React from "react";

const badgeImg = "/lovable-uploads/0dc60043-05c1-4bfe-9891-c766cdec0bca.png";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-bc-red" />,
    label: "Licensed & Insured",
  },
  {
    icon: <CircleCheck className="w-6 h-6 text-bc-red" />,
    label: "100% Satisfaction Guarantee",
  },
  {
    icon: <Wrench className="w-6 h-6 text-bc-red" />,
    label: "Professional Grade Equipment",
  },
  {
    icon: <img src={badgeImg} alt="Award Badge" className="w-6 h-6" />,
    label: "Award-Winning Service",
  },
];

const FeatureRow = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 max-w-4xl mx-auto">
    {features.map((f, i) => (
      <div
        key={i}
        className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4 border border-gray-100"
      >
        <div>{f.icon}</div>
        <div className="mt-2 text-sm font-semibold">{f.label}</div>
      </div>
    ))}
  </div>
);

export default FeatureRow;
