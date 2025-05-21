
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Shield, Award, Check, ThumbsUp } from 'lucide-react';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustBadges = () => {
  const { t } = useTranslation();
  
  const badges: TrustBadge[] = [
    {
      icon: <Shield className="h-10 w-10 text-bc-red" />,
      title: "Fully Insured",
      description: "Comprehensive liability insurance for your complete peace of mind"
    },
    {
      icon: <Award className="h-10 w-10 text-bc-red" />,
      title: "100% Satisfaction Guarantee",
      description: "If you're not completely satisfied, we'll make it right at no extra cost"
    },
    {
      icon: <Check className="h-10 w-10 text-bc-red" />,
      title: "WCB Covered",
      description: "All our team members are covered by Workers' Compensation"
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-bc-red" />,
      title: "5-Star Rated Service",
      description: "Consistently rated 5-stars by our satisfied customers"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-center mb-4">
            {badge.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{t(badge.title)}</h3>
          <p className="text-gray-600 text-sm">{t(badge.description)}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
