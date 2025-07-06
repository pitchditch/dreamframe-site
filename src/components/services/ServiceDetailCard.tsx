
import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceDetailCardProps {
  title: string;
  description: string;
  benefits: string[];
  caseStudy: {
    customer: string;
    location: string;
    problem: string;
    solution: string;
    result: string;
    beforeImage: string;
    afterImage: string;
  };
  pricing: string;
  ctaText: string;
}

const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({
  title,
  description,
  benefits,
  caseStudy,
  pricing,
  ctaText
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-bc-red to-red-700 text-white">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-white/90">{description}</p>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Benefits */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Why Choose Our Service:</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            Customer Success Story
          </h3>
          
          <div className="mb-3">
            <div className="font-semibold">{caseStudy.customer} - {caseStudy.location}</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <img 
                src={caseStudy.beforeImage} 
                alt="Before cleaning"
                className="w-full h-32 object-cover rounded border-2 border-red-200"
              />
              <div className="text-center text-sm font-medium mt-1 text-red-600">Before</div>
            </div>
            <div>
              <img 
                src={caseStudy.afterImage} 
                alt="After cleaning"
                className="w-full h-32 object-cover rounded border-2 border-green-200"
              />
              <div className="text-center text-sm font-medium mt-1 text-green-600">After</div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Challenge:</span> {caseStudy.problem}</div>
            <div><span className="font-medium">Solution:</span> {caseStudy.solution}</div>
            <div><span className="font-medium">Result:</span> {caseStudy.result}</div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6 p-4 bg-bc-red/10 rounded-lg text-center">
          <div className="text-2xl font-bold text-bc-red mb-1">{pricing}</div>
          <div className="text-sm text-gray-600">*Exact quote provided after assessment</div>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Button asChild className="flex-1" variant="bc-red">
            <Link to="/calculator" className="flex items-center justify-center">
              {ctaText} <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href="tel:7788087620">Call Now</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceDetailCard;
